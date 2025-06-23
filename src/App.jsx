import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import AdCard from './components/AdCard';
import AdBanner from './components/AdBanner';



const API_KEY = '7d16d643bacf43728e3eaba10a2398db';
const PAGE_SIZE = 30;

const categories = [
  'general', 'business', 'entertainment', 'health',
  'science', 'sports', 'technology', 'iran-israel'
];

const categoryLabels = {
  general: 'GENERAL',
  business: 'BUSINESS',
  entertainment: 'ENTERTAINMENT',
  health: 'HEALTH',
  science: 'SCIENCE',
  sports: 'SPORTS',
  technology: 'TECHNOLOGY',
  'iran-israel': 'IRAN–ISRAEL'
};

function App() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('in'); // Default to India
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastArticleRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [searchTerm, category, country]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      console.log('🚀 Fetching news...');

      let url = '';
      let params = {
        apiKey: API_KEY,
        page,
        pageSize: PAGE_SIZE
      };

      if (category === 'iran-israel') {
        url = 'https://newsapi.org/v2/everything';
        params.q = 'iran israel';
      } else if (country === 'in') {
        url = 'https://newsapi.org/v2/everything';
        const baseQuery = searchTerm ? searchTerm : 'India';
        params.q = `${baseQuery} ${category}`;
      } else if (searchTerm) {
        url = 'https://newsapi.org/v2/everything';
        params.q = searchTerm;
      } else {
        url = 'https://newsapi.org/v2/top-headlines';
        params.country = country;
        params.category = category;
      }

      try {
        const response = await axios.get(url, { params });

        if (page === 1) {
          setArticles(response.data.articles);
        } else {
          setArticles(prev => [...prev, ...response.data.articles]);
        }

        setHasMore(response.data.articles.length === PAGE_SIZE);
      } catch (err) {
        console.error('❌ Error fetching news:', err);
      }

      setLoading(false);
    };

    fetchNews();
  }, [searchTerm, category, country, page]);

  return (
    <div className="container">
      <h1>📰 News Feed</h1>

      <div className="toolbar">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="country-selector">
          <option value="in">🇮🇳 India</option>
          <option value="us">🇺🇸 USA</option>
        </select>

        <input
          type="text"
          placeholder="Search news..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${cat === category ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="articles">
        {articles.map((article, index) => {
  const isLast = index === articles.length - 1;
  const elements = [];

  // Push the article card
  elements.push(
    <div
      className="card"
      key={`article-${index}`}
      ref={isLast ? lastArticleRef : null}
    >
      {article.urlToImage && <img src={article.urlToImage} alt="" className="thumb" />}
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more →</a>
    </div>
  );
  // 💡 Insert AdBanner after every 4 articles
  if ((index + 1) % 4 === 0) {
    return (
      <React.Fragment key={index}>
        <div
          className="card"
          ref={isLast ? lastArticleRef : null}
        >
          {article.urlToImage && <img src={article.urlToImage} alt="" className="thumb" />}
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more →</a>
        </div>
        <AdBanner /> {/* ✅ Injected here */}
      </React.Fragment>
    );
  }
  // 💡 Insert AdBanner after every 4 articles
  if ((index + 1) % 4 === 0) {
    return (
      <React.Fragment key={index}>
        <div
          className="card"
          ref={isLast ? lastArticleRef : null}
        >
          {article.urlToImage && <img src={article.urlToImage} alt="" className="thumb" />}
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more →</a>
        </div>
        <AdBanner /> {/* ✅ Injected here */}
      </React.Fragment>
    );
  }

  // Insert an AdCard after every 4 articles
  if ((index + 1) % 4 === 0) {
    elements.push(
      <div key={`ad-${index}`}>
        <AdCard />
      </div>
    );
  }

  return elements;
        })}
      </div>

      {loading && <p>Loading more news...</p>}
      {!loading && articles.length === 0 && <p>No news found.</p>}
    </div>
  );
}

export default App;
