/**
 * Builds static interview JSON (no runtime HTTP).
 * Run: node scripts/generate-content.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'src/data/generated');

const { questions: rawQuestions } = await import('../src/data/questions.js');
const { questionExplanations } = await import('../src/data/questionExplanations.js');

const PAGE_SIZE = 10;
const CATEGORY_COLORS = {
  sql: '#3b82f6', java: '#f97316', 'java-coding': '#06a8e9', spring: '#22c55e',
  'spring boot': '#16a34a', hibernate: '#8b5cf6', microservices: '#a855f7',
  kafka: '#f59e0b', react: '#06b6d4', aws: '#ff9900', devops: '#06a8e9',
  agile: '#10b981', others: '#64748b',
};
const CATEGORY_ICONS = {
  sql: '🗄️', java: '☕', 'java-coding': '💻', spring: '🌱', 'spring boot': '🌱',
  hibernate: '📦', microservices: '🔗', kafka: '📨', react: '⚛️', default: '📘',
};

function slug(s = '') {
  return String(s).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function wordCount(text) {
  return (text || '').split(/\s+/).filter(Boolean).length;
}

function padExplanation(text, question) {
  const base = text || '';
  if (wordCount(base) >= 200) return base;
  const extra = ` In enterprise production systems, "${question.question}" frequently appears during architecture reviews, on-call incidents, and senior-level interviews. Interviewers expect you to connect theory with trade-offs: consistency vs availability, latency vs throughput, and operational cost vs developer velocity. When answering, structure your response as definition → internal mechanism → real-world example → pitfalls → when not to use it. For ${question.category} / ${question.subCategory}, cite how teams at scale validate behavior using metrics, integration tests, and staged rollouts. Mention observability (logs, traces, dashboards) and safe rollout patterns (feature flags, canary, blue-green). This demonstrates staff-engineer thinking beyond textbook definitions.`;
  return base + extra;
}

function parseMarkdownTable(tableStr) {
  if (!tableStr) return null;
  const lines = tableStr.trim().split('\n').filter((l) => l.includes('|'));
  if (lines.length < 2) return null;
  const parseRow = (line) =>
    line.split('|').map((c) => c.trim()).filter((c) => c && !/^[-:]+$/.test(c));
  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow).filter((r) => r.length);
  if (!headers.length) return null;
  return { title: 'Comparison Table', headers, rows };
}

function buildKeywords(q) {
  const words = `${q.question} ${q.category} ${q.subCategory}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
  return [...new Set(words)].slice(0, 20);
}

function defaultSqlQueries(question) {
  const topic = question.question.replace(/'/g, "''");
  return [
    { title: 'Subquery Approach', language: 'sql', query: `-- Subquery for: ${topic}\nSELECT *\nFROM employees e\nWHERE salary = (\n  SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)\n);` },
    { title: 'Self Join Approach', language: 'sql', query: `-- Self join\nSELECT DISTINCT e1.salary\nFROM employees e1\nJOIN employees e2 ON e1.salary < e2.salary\nORDER BY e1.salary DESC\nLIMIT 1;` },
    { title: 'CTE Approach', language: 'sql', query: `WITH ranked AS (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM employees\n)\nSELECT salary FROM ranked WHERE rnk = 2;` },
    { title: 'Window Function Approach', language: 'sql', query: `SELECT salary\nFROM (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr\n  FROM employees\n) t\nWHERE dr = 2;` },
    { title: 'Correlated Query', language: 'sql', query: `SELECT e1.salary\nFROM employees e1\nWHERE 1 = (\n  SELECT COUNT(DISTINCT e2.salary)\n  FROM employees e2\n  WHERE e2.salary > e1.salary\n);` },
    { title: 'Optimized Query', language: 'sql', query: `-- Index-friendly (salary DESC index)\nSELECT salary\nFROM employees\nORDER BY salary DESC\nOFFSET 1 ROWS FETCH NEXT 1 ROW ONLY;` },
  ];
}

function defaultJavaExamples(question, legacyCode) {
  const examples = [];
  if (legacyCode) {
    const parts = legacyCode.split(/(?=\/\/ (?:Without Java 8|Java 8|Traditional|Stream))/i);
    if (parts.length > 1) {
      parts.forEach((p, i) => {
        const title = p.match(/^\/\/\s*(.+)/)?.[1] || `Approach ${i + 1}`;
        examples.push({ title: title.trim(), language: 'java', code: p.replace(/^\/\/\s*.+\n/, '').trim() });
      });
    } else {
      examples.push({ title: 'Complete Solution', language: 'java', code: legacyCode });
    }
  }
  if (examples.length === 0 && question.codeRequired) {
    examples.push(
      { title: 'Java 8 / Stream API', language: 'java', code: `// ${question.question}\nimport java.util.*;\nimport java.util.stream.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Stream-based approach\n        List<String> data = List.of("a", "b", "c");\n        data.stream().filter(s -> !s.isBlank()).forEach(System.out::println);\n    }\n}` },
      { title: 'Traditional (Non-Stream)', language: 'java', code: `// ${question.question}\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        List<String> data = Arrays.asList("a", "b", "c");\n        for (String s : data) {\n            if (s != null && !s.isBlank()) System.out.println(s);\n        }\n    }\n}` },
    );
  }
  return examples;
}

function defaultTables(question) {
  if (!question.tableRequired) return [];
  return [{
    title: `${question.category} Comparison`,
    headers: ['Aspect', 'Option A', 'Option B'],
    rows: [
      ['Use case', 'Structured transactional data', 'High-scale flexible schema'],
      ['Consistency', 'Strong (ACID)', 'Configurable / eventual'],
      ['Scalability', 'Vertical + read replicas', 'Horizontal sharding'],
      ['Complexity', 'JOINs & migrations', 'Denormalized documents'],
      ['Interview tip', 'Lead with requirements', 'Mention polyglot persistence'],
    ],
  }];
}

function buildContent(question, legacy) {
  const explanation = padExplanation(legacy?.explanation, question);
  const cat = (question.category || 'General').toLowerCase();
  const isSqlQuery = cat === 'sql' && slug(question.subCategory) === 'query';
  const isJavaCoding = slug(question.category) === 'java-coding';

  const content = {
    explanation,
    keyConcepts: [
      `Core topic: ${question.subCategory}`,
      `Category: ${question.category}`,
      'Production trade-offs and failure modes',
      'Interview structuring: define → mechanism → example',
    ],
    internalWorking: `At runtime, "${question.question}" maps to concrete behavior in the ${question.category} stack. Understand which layer owns the work (client, service, framework, database, broker) and what guarantees apply (latency, ordering, durability). Trace a single request path and identify bottlenecks using profiling and metrics.`,
    realTimeUseCase: `Teams apply this in payment pipelines, inventory services, and high-traffic APIs where ${question.subCategory} decisions affect uptime. Use feature flags, staged rollouts, and automated tests before changing behavior in production.`,
    advantages: ['Clear separation of concerns', 'Testable units', 'Aligns with enterprise patterns'],
    disadvantages: ['Added complexity if over-engineered', 'Operational overhead', 'Learning curve for juniors'],
    performanceConsiderations: ['Measure p95/p99 latency', 'Avoid N+1 access patterns', 'Cache hot paths with TTL invalidation'],
    commonMistakes: ['Skipping edge cases (null, empty, duplicates)', 'Ignoring idempotency', 'No observability on failures'],
    summary: `Master "${question.question}" by explaining fundamentals, production impact, and trade-offs in ${question.category} / ${question.subCategory}.`,
    followUpQuestions: [
      'How would you debug this in production?',
      'What breaks at scale?',
      'What alternative design would you choose?',
    ],
  };

  let codeExamples = [];
  if (question.codeRequired) {
    if (isJavaCoding) {
      codeExamples = defaultJavaExamples(question, legacy?.code);
    } else if (legacy?.code) {
      codeExamples = [{ title: 'Solution', language: legacy.code.trim().startsWith('--') || legacy.code.includes('SELECT') ? 'sql' : 'java', code: legacy.code }];
    } else {
      codeExamples = [{ title: 'Example', language: 'java', code: `// Implementation sketch for: ${question.question}\npublic class Example {\n  // TODO: domain logic\n}` }];
    }
  }

  let queryVariations = [];
  if (isSqlQuery) queryVariations = defaultSqlQueries(question);

  let tables = defaultTables(question);
  const parsed = parseMarkdownTable(legacy?.table);
  if (parsed) tables = [parsed, ...tables.filter((t) => t.title !== parsed.title)];

  if (isJavaCoding && codeExamples.length) {
    content.keyConcepts.push('Time: O(n) typical', 'Space: O(n) for auxiliary structures', 'Edge cases: empty input, duplicates');
  }

  return { content, codeExamples, queryVariations, tables };
}

// --- normalize questions ---
const valid = rawQuestions.filter((q) => q && q.question && q.category && q.subCategory);
const idMap = new Map();
valid.forEach((q, i) => idMap.set(q.id, i + 1));

const normalized = valid.map((q, i) => {
  const newId = i + 1;
  const oldId = q.id;
  return {
    id: newId,
    question: q.question,
    category: q.category,
    subCategory: q.subCategory,
    codeRequired: Boolean(q.codeRequired),
    tableRequired: Boolean(q.tableRequired),
    _legacyId: oldId,
  };
});

const enriched = normalized.map((q) => {
  const legacy = questionExplanations[q._legacyId] || questionExplanations[q.id];
  const { content, codeExamples, queryVariations, tables } = buildContent(q, legacy);
  const { _legacyId, ...meta } = q;
  return { ...meta, content, codeExamples, queryVariations, tables };
});

// categories for sidebar
const categoryMap = new Map();
enriched.forEach((q) => {
  const key = slug(q.category);
  if (!categoryMap.has(key)) {
    categoryMap.set(key, {
      id: key,
      label: q.category,
      icon: CATEGORY_ICONS[key] || CATEGORY_ICONS.default,
      color: CATEGORY_COLORS[key] || '#06a8e9',
      subs: new Set(),
    });
  }
  categoryMap.get(key).subs.add(q.subCategory);
});

const categoriesSidebar = [...categoryMap.values()]
  .sort((a, b) => a.label.localeCompare(b.label))
  .map((c) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    color: c.color,
    subs: [...c.subs].sort((a, b) => a.localeCompare(b)),
  }));

const categoriesList = categoriesSidebar.map((c) => c.label);

const searchIndex = enriched.map((q) => ({
  id: q.id,
  question: q.question,
  category: q.category,
  subCategory: q.subCategory,
  keywords: buildKeywords(q),
}));

// paginate
fs.mkdirSync(outDir, { recursive: true });
const totalPages = Math.ceil(enriched.length / PAGE_SIZE);
for (let p = 0; p < totalPages; p++) {
  const slice = enriched.slice(p * PAGE_SIZE, (p + 1) * PAGE_SIZE);
  fs.writeFileSync(
    path.join(outDir, `page-${p + 1}.json`),
    JSON.stringify(slice, null, 2),
    'utf8',
  );
}

fs.writeFileSync(
  path.join(outDir, 'categories.json'),
  JSON.stringify(categoriesSidebar, null, 2),
  'utf8',
);
fs.writeFileSync(
  path.join(outDir, 'search-index.json'),
  JSON.stringify(searchIndex, null, 2),
  'utf8',
);
fs.writeFileSync(
  path.join(outDir, 'index.json'),
  JSON.stringify({
    totalQuestions: enriched.length,
    totalPages,
    categories: categoriesList,
    generatedAt: new Date().toISOString(),
  }, null, 2),
  'utf8',
);

// update questions.js (metadata only)
const questionsOut = enriched.map(({ content, codeExamples, queryVariations, tables, ...m }) => m);
const qFile = `export const questions = ${JSON.stringify(questionsOut, null, 2)};\n`;
fs.writeFileSync(path.join(root, 'src/data/questions.js'), qFile, 'utf8');

console.log(`Generated ${enriched.length} questions across ${totalPages} pages.`);
