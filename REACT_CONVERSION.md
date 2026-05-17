# FSMaster.in - React Conversion

A fully converted React application of the FSMaster.in portfolio and learning platform for Abhay Kumar - a Full Stack Java Developer.

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Top navigation bar
│   ├── Sidebar.jsx         # Topic sidebar navigation
│   ├── Home.jsx            # Home page with hero section
│   ├── About.jsx           # About/Resume page
│   ├── Contact.jsx         # Contact form page
│   └── TopicPage.jsx       # Questions and answers page
├── data/
│   └── topicsData.js       # Topics, questions, and profile data
├── App.jsx                 # Main App component
├── main.jsx                # Entry point
├── index.css               # Global styles
└── assets/                 # Static assets

```

## Features

- **Multi-page Application**: Home, About, Contact, and Topic Pages
- **Dark Mode**: Toggle between light and dark themes
- **Topic Navigation**: 14+ topics with subtopics
- **Interactive Q&A**: Search, filter by difficulty, and expand questions
- **Code Examples**: Copy-to-clipboard functionality for code snippets
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Smooth Animations**: Typing effect, floating images, pulse effects

## Available Pages

1. **Home** - Hero section with typing effect, stats, and topics grid
2. **Topics** - Browse and search questions by topic with code examples
3. **About** - Resume with experience, education, and skills
4. **Contact** - Contact form and information

## Technologies Used

- **React 19.2.6** - UI library
- **Vite 8.0.12** - Build tool
- **CSS3** - Styling with CSS variables for theming
- **JavaScript ES6+** - Modern JavaScript

## Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Component Details

### Navigation
- Logo with gradient icon
- Page navigation links (Home, About, Contact)
- Dark mode toggle button

### Sidebar
- Topic list with icons
- Subtopic navigation
- Active state indicators
- Collapsible topic groups

### Home
- Hero section with profile picture
- Typing animation for roles
- Stats row (Topics, Questions, Examples, Projects)
- Topic cards grid with preview

### TopicPage
- Question list with search
- Difficulty filters (Basic, Intermediate, Advanced)
- Expandable Q&A cards
- Code block with copy button
- Related topics quick navigation

### About
- Profile header with gradient background
- Technical skills by category
- Work experience timeline
- Education section

### Contact
- Contact information display
- Contact form with validation
- Success message feedback

## Theming

The application uses CSS custom properties for theming:

```css
:root {
  --brand: #06a8e9;
  --brand-dark: #026aa1;
  --accent: #f97316;
  --bg: #f8fafc;
  --text: #0f172a;
  /* ... more variables */
}

.dark-mode {
  --bg: #0a0f1e;
  --text: #f1f5f9;
  /* ... dark mode overrides */
}
```

## Data Structure

### Topics
- Contains 14+ topics (Java, Spring, React, etc.)
- Each topic has subtopics and an icon/color
- Questions are organized by topic and subtopic

### Questions
- Q&A pairs organized in nested object by topic-subtopic
- Difficulty levels: Basic, Intermediate, Advanced
- Optional code examples with syntax highlighting

## Responsive Breakpoints

- **1200px and below**: 3-column topic grid
- **768px and below**: 2-column grid, sidebar resize, hero vertical
- **640px and below**: 1-column layout, reduced padding

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Future Enhancements

- Add database integration for dynamic Q&A
- Implement user authentication
- Add bookmark/favorite questions feature
- Create discussion/comment section
- Add code execution capability
- Performance metrics and progress tracking

## License

© 2026 Abhay Kumar. All rights reserved.
