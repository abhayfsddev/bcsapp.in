export const topics = [
  {
    id: 'java',
    label: 'Java',
    icon: '☕',
    color: '#f97316',
    subs: ['JVM', 'Memory Management', 'Array', 'String', 'Collection', 'Stream', 'Exceptions', 'OOPS', 'Concurrency', 'Serialization', 'Others'],
  },
  {
    id: 'java-coding',
    label: 'Java Coding',
    icon: '💻',
    color: '#06a8e9',
    subs: ['Arrays', 'String', 'Stream', 'Data Structure'],
  },
  {
    id: 'spring',
    label: 'Spring',
    icon: '🌱',
    color: '#22c55e',
    subs: ['Spring Core', 'Spring Boot Basic', 'JPA', 'Spring Advance', 'Spring Security'],
  },
  {
    id: 'microservices',
    label: 'Microservices',
    icon: '🔗',
    color: '#a855f7',
    subs: ['Basics', 'Service Discovery', 'API Gateway', 'Circuit Breaker', 'Config Server', 'Docker', 'Kubernetes', 'Communication', 'Deployment'],
  },
  {
    id: 'sql',
    label: 'SQL',
    icon: '🗄️',
    color: '#3b82f6',
    subs: ['Basic Queries', 'Joins', 'Indexes', 'Normalization', 'Stored Procedures', 'Optimization'],
  },
  {
    id: 'git',
    label: 'Git',
    icon: '🔀',
    color: '#ef4444',
    subs: ['Git Basics', 'Branching', 'Merging', 'Rebase', 'GitHub Workflow'],
  },
  {
    id: 'kafka',
    label: 'Kafka',
    icon: '📨',
    color: '#f59e0b',
    subs: ['Kafka Basics', 'Producer', 'Consumer', 'Broker', 'Partition', 'Offset', 'Kafka Streams'],
  },
  {
    id: 'design-pattern',
    label: 'Design Pattern',
    icon: '🧩',
    color: '#ec4899',
    subs: ['Singleton', 'Factory', 'Builder', 'Strategy', 'Observer', 'MVC'],
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: '📜',
    color: '#eab308',
    subs: ['Basics', 'ES6', 'Closures', 'Promises', 'Async Await', 'Event Loop'],
  },
  {
    id: 'react',
    label: 'React',
    icon: '⚛️',
    color: '#06b6d4',
    subs: ['Components', 'Hooks', 'Context API', 'Redux', 'Routing', 'Performance'],
  },
  {
    id: 'angular',
    label: 'Angular',
    icon: '🔺',
    color: '#ef4444',
    subs: ['Components', 'Services', 'RxJS', 'Routing', 'State Management'],
  },
  {
    id: 'gen-ai',
    label: 'Gen AI',
    icon: '🤖',
    color: '#8b5cf6',
    subs: ['Prompt Engineering', 'LLM Basics', 'AI Tools', 'OpenAI', 'LangChain'],
  },
  {
    id: 'agile',
    label: 'Agile',
    icon: '⚡',
    color: '#10b981',
    subs: ['Scrum', 'Sprint', 'Jira', 'User Stories'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: '🐳',
    color: '#06a8e9',
    subs: ['CI/CD', 'Jenkins', 'Docker', 'Kubernetes', 'AWS', 'Monitoring'],
  },
];

export const questionsData = {
  'java-jvm': [
    {
      q: 'What is JVM and how does it work?',
      a: 'JVM (Java Virtual Machine) converts Java bytecode to machine code. It includes ClassLoader, Bytecode Verifier, JIT Compiler, and Execution Engine.',
      d: 'Basic',
      code: `public class JVMDemo {
  public static void main(String[] args) {
    Runtime rt = Runtime.getRuntime();
    System.out.println("Max Memory: " + rt.maxMemory()/1024/1024 + " MB");
    System.out.println("Total Memory: " + rt.totalMemory()/1024/1024 + " MB");
  }
}`,
    },
    {
      q: 'What are the different memory areas in JVM?',
      a: 'JVM has: Heap (objects), Stack (method frames), Method Area/Metaspace (class metadata), PC Register, Native Method Stack.',
      d: 'Intermediate',
      code: `// -Xms256m  → initial heap size
// -Xmx1g    → max heap size
// -XX:MetaspaceSize=128m
java -Xms256m -Xmx1g MyApp`,
    },
    {
      q: 'What is JIT compiler?',
      a: 'JIT (Just-In-Time) compiler converts frequently executed bytecode into native machine code at runtime, improving performance over pure interpretation.',
      d: 'Intermediate',
      code: null,
    },
  ],
  'java-oops': [
    {
      q: 'What are the four pillars of OOP?',
      a: '1) Encapsulation - hide state, 2) Abstraction - hide complexity, 3) Inheritance - reuse via parent-child, 4) Polymorphism - many forms.',
      d: 'Basic',
      code: `class BankAccount {
  private double balance;
  public void deposit(double amt) { balance += amt; }
}

class SavingsAccount extends BankAccount {
  // Inheritance + Polymorphism
  @Override
  public void deposit(double amt) { super.deposit(amt * 1.01); }
}`,
    },
    {
      q: 'Explain polymorphism with an example.',
      a: 'Polymorphism = "many forms". Method Overloading (compile-time) and Method Overriding (runtime) are two types. Runtime polymorphism is achieved via inheritance.',
      d: 'Basic',
      code: `// Runtime Polymorphism
Animal animal = new Dog();
animal.sound(); // outputs "Woof" not "Generic sound"

// Compile-time (overloading)
int add(int a, int b) { return a+b; }
double add(double a, double b) { return a+b; }`,
    },
  ],
  'java-stream': [
    {
      q: 'What are Java Streams?',
      a: 'Java Streams (Java 8+) enable functional-style operations on collections. Operations: Intermediate (filter, map, sorted) and Terminal (collect, count, reduce).',
      d: 'Intermediate',
      code: `List<Integer> nums = Arrays.asList(1,2,3,4,5,6,7,8,9,10);

// Filter + Map + Collect
List<Integer> evenSq = nums.stream()
  .filter(n -> n % 2 == 0)
  .map(n -> n * n)
  .collect(Collectors.toList());
// [4, 16, 36, 64, 100]

int sum = nums.stream().reduce(0, Integer::sum); // 55`,
    },
  ],
  'spring-spring-boot-basic': [
    {
      q: 'What is Spring Boot?',
      a: 'Spring Boot is an opinionated Spring framework that simplifies configuration via auto-configuration, embedded server (Tomcat), starter dependencies, and Actuator.',
      d: 'Basic',
      code: `@SpringBootApplication
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }
}

@RestController
@RequestMapping("/api")
class UserController {
  @GetMapping("/users")
  public List<User> getUsers() { return userService.findAll(); }

  @PostMapping("/users")
  public ResponseEntity<User> create(@RequestBody User u) {
    return ResponseEntity.status(201).body(userService.save(u));
  }
}`,
    },
  ],
  'microservices-basics': [
    {
      q: 'What are Microservices vs Monolithic?',
      a: 'Microservices splits an app into small, independently deployable services. Each handles a specific business function and communicates via APIs. Monolithic = all in one.',
      d: 'Basic',
      code: `// Monolithic: Single WAR with all modules

// Microservices:
// user-service:8081
// order-service:8082  
// payment-service:8083

@Service
public class OrderService {
  public UserDto getUser(Long userId) {
    return restTemplate.getForObject(
      "http://user-service/api/users/" + userId, UserDto.class);
  }
}`,
    },
  ],
  'react-hooks': [
    {
      q: 'useState vs useReducer - when to use which?',
      a: 'useState: simple state. useReducer: complex state with multiple sub-values or when next state depends on complex logic. Think of useReducer as component-level Redux.',
      d: 'Intermediate',
      code: `// useReducer
const reducer = (state, action) => {
  switch(action.type) {
    case 'INC': return {...state, count: state.count + state.step};
    case 'SET_STEP': return {...state, step: action.payload};
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, {count:0, step:1});
<button onClick={() => dispatch({type:'INC'})}>+</button>`,
    },
    {
      q: 'What is useEffect and when does it run?',
      a: 'useEffect runs side effects after render. Deps array controls when: empty [] = once on mount, [dep] = on dep change, no array = every render. Return cleanup fn.',
      d: 'Intermediate',
      code: `useEffect(() => {
  const sub = api.subscribe(onData);
  return () => sub.unsubscribe(); // cleanup
}, [userId]); // runs when userId changes`,
    },
  ],
  'kafka-kafka-basics': [
    {
      q: 'What is Apache Kafka?',
      a: 'Kafka is a distributed event streaming platform solving: high-throughput messaging, decoupling producers/consumers, fault tolerance, event replayability, and real-time pipelines.',
      d: 'Basic',
      code: `// Producer
@Service class OrderProducer {
  @Autowired KafkaTemplate<String,OrderEvent> kafka;
  public void publish(OrderEvent e) {
    kafka.send("order-events", e.getId(), e);
  }
}

// Consumer
@KafkaListener(topics="order-events", groupId="inventory-grp")
public void handle(OrderEvent e) {
  inventoryService.process(e);
}`,
    },
  ],
};

export const roles = [
  'Full Stack Java Developer',
  'Spring Boot Expert',
  'Microservices Architect',
  'Angular & React Developer',
  'Team Lead @ Innova Solutions',
  'SENIOR TECHNICAL LEAD @ Cogorge'
];

export const experience = [
  {
    role: 'SENIOR TECHNICAL LEAD',
    co: 'Cogorge',
    period: 'May 2026 – Present',
    tech: ['Spring Boot', 'Angular 14', 'Microservices', 'Redis'],
    pts: [
      'Senior technical lead at Trinet Project',
      'Handling technical decisions and mentoring team members',
      'Architected microservices and APIs, managed Jira stories',
      'Ensured code quality and best practices',
      'Collaborated with cross-functional teams to deliver high-quality solutions',
    ],
  },
  {
    role: 'Lead / Full Stack Developer',
    co: 'ACS Global Tech Solutions',
    period: 'Apr 2021 – May 2026',
    tech: ['Spring Boot', 'Angular 17', 'Microservices', 'Redis'],
    pts: [
      'Led Verizon B360 e-commerce platform development',
      'Built 6 sub-projects: My Solution, Guided Promo, National Offers, Manual Discount, Incipio, View Together',
      'Architected microservices and APIs, managed Jira stories',
    ],
  },
  {
    role: 'Software Developer',
    co: 'Neovation Life Sciences India Pvt. Ltd.',
    period: 'Mar 2019 – Apr 2021',
    tech: ['Spring Boot', 'MySQL', 'JSP', 'Angular'],
    pts: [
      'Developed MAPS system for Sainnocare LLC, New Jersey',
      'Built and consumed REST APIs using Spring Boot',
      'Achieved faster cycles using Agile/Scrum',
    ],
  },
  {
    role: 'Software Developer',
    co: 'Eagle Software',
    period: 'Jan 2018 – Mar 2019',
    tech: ['Java', 'Spring', 'MySQL'],
    pts: [
      'Developed custom software for diverse clients',
      'Participated in field testing and performance verification',
    ],
  },
];

export const education = [
  { deg: 'M.C.A', inst: 'A.N.C Patna', yr: '2015', gpa: '72%' },
  { deg: 'B.C.A', inst: 'T.P.S Patna', yr: '2012', gpa: '79%' },
  { deg: 'Intermediate', inst: 'B.S.E.B Patna', yr: '2009', gpa: '64%' },
];

export const contactInfo = [
  { ico: '📧', lbl: 'Email', val: 'abhay.fsd.dev@gmail.com' },
  { ico: '📞', lbl: 'Phone', val: '+91 6200329955' },
  { ico: '📍', lbl: 'Location', val: 'Hyderabad, India 500055' },
  { ico: '💼', lbl: 'LinkedIn', val: 'linkedin.com/in/abhay-kumar' },
];

export const getQuestions = (topicId, subtopic) => {
  const key = topicId + '-' + subtopic.toLowerCase().replace(/\s+/g, '-');
  return questionsData[key] || [
    {
      q: `What are the core concepts of ${subtopic}?`,
      a: `${subtopic} is fundamental in ${topicId}. Key principles include understanding the basics, best practices, and real-world applications in enterprise Java systems.`,
      d: 'Basic',
      code: null,
    },
    {
      q: `What are best practices for ${subtopic}?`,
      a: `Follow SOLID principles, keep code modular and testable, handle edge cases, write documentation, and ensure proper error handling.`,
      d: 'Intermediate',
      code: null,
    },
    {
      q: `How does ${subtopic} work in a microservices context?`,
      a: `In microservices, ${subtopic} ensures services remain decoupled, scalable, and maintainable. Proper use improves resilience and system reliability.`,
      d: 'Advanced',
      code: null,
    },
  ];
};
