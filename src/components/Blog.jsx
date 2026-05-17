import React from 'react';
import '../styles/TopicPage.css';

export default function Blog() {
  return (
    <div className="main">
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #0b6dffdd, #0b6dff99)' }}>
        <div className="page-header-icon">📝</div>
        <div className="page-header-content">
          <h2>Blog</h2>
          <p>Read the latest articles, tutorials, and interview prep tips.</p>
        </div>
      </div>

      <div className="blog-intro">
        <p>
          Welcome to the blog section. This space can be used to share technical deep-dives,
          interview strategies, or new updates about the platform.
        </p>
        <p>
          For now, this page is a starting point for blog content. You can replace it with
          your own posts or connect to an external blog feed.
        </p>
      </div>
    </div>
  );
}
