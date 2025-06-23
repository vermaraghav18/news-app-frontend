// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchNews } from './api/fetchNews';
import './App.css';

const categories = [
  { label: 'Top', value: 'general' },
  { label: 'Business', value: 'business' },
  { label: 'Technology', value: 'technology' },
  { label: 'Health', value: 'health' },
  { label: 'Science', value: 'science' },
  { label: 'Sports', value: 'sports' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Israel-Iran', value: 'israel iran' } // 👈 this is a keyword, not a category
];

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews({ q: 'India', category: selectedCategory });
      setArticles(data);
    };
    loadNews();
  }, [selectedCategory]);

  return (
    <div className="app-container">
      <header>
        <img src="/news-icon.png" alt="News Icon" className="icon" />
        <h1>News</h1>
      </header>

      <div className="category-buttons">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={selectedCategory === cat.value ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

     <ul className="news-list">
  {articles.length === 0 && <p>Loading...</p>}

  {articles.map((article, i) => (
    <React.Fragment key={i}>
      <li>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt="news"
              className="article-image"
            />
          )}
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </a>
      </li>

      {/* 👇 Inject ad card after every 4 articles */}
      {(i + 1) % 4 === 0 && (
        <li className="ad-card">
          {/* You can replace this with an image or real ad */}
          <div className="ad-banner">
            🔥 Your Ad Here – Promote your brand or service
          </div>
        </li>
      )}
    </React.Fragment>
  ))}
</ul>


    </div>
  );
}

export default App;
