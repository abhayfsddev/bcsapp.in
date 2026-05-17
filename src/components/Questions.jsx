import React from 'react';
import '../styles/Questions.css';

export default function Questions() {
  return (
    <div className="main questions-page">
      <header className="questions-header">
        <div>
          <p className="page-label">UI Question Bank</p>
          <h1>Angular, React, JavaScript & Frontend Architecture Questions</h1>
          <p className="page-description">
            A curated list of UI and frontend questions for interview preparation. No answers are included here — just clean, readable questions.
          </p>
        </div>
      </header>

      <div className="question-section">
        <h2>Angular Questions</h2>
        <ol className="question-list">
          <li>Explain component and directive in Angular.</li>
          <li>What is lazy loading and how to implement in Angular?</li>
          <li>Let’s say I have 5 APIs. I want to hit all APIs and get combined result in Angular.</li>
          <li>Difference between debouncing and throttling.</li>
          <li>Leading vs trailing throttling.</li>
          <li>Difference between debounceTime and distinctUntilChanged.</li>
          <li>Debounce vs setTimeout.</li>
          <li>Performance optimization in Angular.</li>
          <li>Standalone components.</li>
          <li>How to share data between components.</li>
          <li>Why we use signals.</li>
          <li>What are the benefits of using signals? Before signals how were we managing?</li>
          <li>Explain ngModels.</li>
          <li>How are signals and ngModels different?</li>
          <li>How many ways can we create forms in Angular?</li>
          <li>How many types of directives are available in Angular?</li>
          <li>Explain databinding in Angular.</li>
          <li>Explain pipes in Angular.</li>
          <li>Steps to improve Angular application.</li>
          <li>How to prevent cross-site scripting in Angular.</li>
          <li>HostBinding and HostListener in Angular.</li>
          <li>Promises vs Observable in Angular.</li>
          <li>Explain Angular CLI and how it helps developers.</li>
          <li>How to design error handling and retry logic on frontend?</li>
          <li>How do you handle 401 and 403 errors in UI?</li>
          <li>How do you cancel in-flight requests?</li>
          <li>How do you prevent duplicate submissions?</li>
          <li>How do you design performant, testable and accessible forms?</li>
          <li>How to ensure effective collaboration between backend (Spring) and frontend (Angular/React)?</li>
        </ol>
      </div>

      <div className="question-section">
        <h2>React Questions</h2>
        <ol className="question-list">
          <li>Create custom hooks in React.</li>
          <li>Virtual DOM in React.</li>
          <li>Performance optimization in React application.</li>
          <li>Explain Controlled Component in React and how they are useful.</li>
          <li>How to create dependent dropdown in React.</li>
          <li>Explain useState and useEffect.</li>
          <li>React component lifecycle. How to achieve lifecycle in functional component.</li>
          <li>Explain react component lifecycle methods with purpose and how they integrate with react application.</li>
          <li>Explain state management in React.</li>
          <li>Explain one feature in React build database to user side end to end.</li>
          <li>How to ensure effective collaboration between backend (Spring) and frontend (Angular/React)?</li>
          <li>How to design error handling and retry logic on frontend?</li>
          <li>How do you handle 401 and 403 errors in UI?</li>
          <li>How do you cancel in-flight requests?</li>
          <li>How do you prevent duplicate submissions?</li>
          <li>How do you design performant, testable and accessible forms?</li>
          <li>How to improve performance in React application.</li>
        </ol>
      </div>

      <div className="question-section">
        <h2>JavaScript Questions</h2>
        <ol className="question-list">
          <li>Difference between debouncing and throttling.</li>
          <li>Leading vs trailing throttling.</li>
          <li>Debounce vs setTimeout.</li>
          <li>Difference between debounceTime and distinctUntilChanged.</li>
          <li>Observable vs Promise.</li>
          <li>Find 2nd highest number from array without predefined functions.</li>
          <li>Write code to give pair of brackets.</li>
          <li>Write code to find strings are isomorphic or not.</li>
          <li>Explain hoisting in JavaScript.</li>
          <li>Explain JavaScript execution context and call stack internally.</li>
          <li>Explain event loop, microtask queue, macrotask queue with examples.</li>
          <li>Difference between == and === with internal type coercion behavior.</li>
          <li>Explain closures with real production use cases.</li>
          <li>How does JavaScript memory management and garbage collection work?</li>
          <li>Explain prototypal inheritance and prototype chain internally.</li>
          <li>Difference between call(), apply(), and bind().</li>
          <li>Explain this keyword in different execution contexts.</li>
          <li>What are higher-order functions? Explain functional programming concepts in JavaScript.</li>
          <li>Difference between synchronous, asynchronous, blocking, and non-blocking execution.</li>
          <li>Explain Promises internally and how Promise chaining works.</li>
          <li>Difference between Promise, async/await, Observable, and callback.</li>
          <li>Explain debounce and throttle with implementation and real-world use cases.</li>
          <li>How does async/await work internally over Promises?</li>
          <li>Explain deep copy vs shallow copy and different cloning approaches.</li>
          <li>Explain currying, memoization, and function composition.</li>
          <li>What are generators and iterators in JavaScript?</li>
          <li>Explain module systems in JavaScript (CommonJS, ES Modules).</li>
          <li>How does browser rendering work and how JavaScript affects rendering performance?</li>
          <li>Explain JavaScript engine internals (V8 engine, JIT compilation, hidden classes, optimization).</li>
          <li>Explain output of the following:
            <pre><code>{`console.log(0123);    //83
console.log(1<3<5);      //true
console.log([] == false);  //true
console.log([]+{});
console.log([]+[]);
console.log([]+());`}</code></pre>
          </li>
        </ol>
      </div>

      <div className="question-section">
        <h2>UI / Frontend Architecture & Design Questions</h2>
        <ol className="question-list">
          <li>How to choose between Angular and React.</li>
          <li>How to design High-throughput API from frontend perspective.</li>
          <li>How to expose contracts to customers when application has 100 REST APIs.</li>
          <li>How to design frontend for huge traffic systems.</li>
          <li>How to manage API latency in frontend applications.</li>
          <li>How to handle if backend service is down in frontend applications.</li>
          <li>How to identify which microservice/API is failing from UI side.</li>
          <li>How to prevent duplicate API calls from frontend.</li>
          <li>How to optimize bundle size in Angular/React applications.</li>
          <li>How to secure frontend applications.</li>
          <li>How to implement retry mechanism in frontend applications.</li>
          <li>How to implement role-based authorization in frontend.</li>
          <li>How to manage state in large frontend applications.</li>
          <li>How to implement API versioning handling in frontend.</li>
          <li>How to handle long-running APIs in frontend UI.</li>
          <li>How to implement loading indicators and skeleton screens.</li>
          <li>How to handle websocket or real-time updates in UI.</li>
          <li>How to design reusable component architecture.</li>
          <li>How to manage environment configurations in Angular/React applications.</li>
          <li>How to implement frontend caching strategies.</li>
          <li>How to monitor frontend application performance in production.</li>
          <li>How to debug memory leaks in Angular/React applications.</li>
        </ol>
      </div>
    </div>
  );
}
