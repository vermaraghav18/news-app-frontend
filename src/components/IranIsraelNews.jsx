import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IranIsraelNews.css';

const API_KEY = '7d16d643bacf43728e3eaba10a2398db';

function IranIsraelNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchConflictNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything',
          {
            params: {
              q: 'iran israel',
              sortBy: 'publishedAt',
              pageSize: 5,
              apiKey: API_KEY
            }
          }
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching Iran-Israel news:', error);
      }
    };

    fetchConflictNews();
  }, []);

  return (
    <div className="conflict-section">
      <h2>🗞 Iran–Israel Conflict: Latest News</h2>
      <div className="conflict-articles">
        {articles.map((article, index) => (
          <div className="conflict-card" key={index}>
            {article.urlToImage && <img src={article.urlToImage} alt="" />}
            <div>
              <h4>{article.title}</h4>
              <p>{new Date(article.publishedAt).toLocaleString()}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IranIsraelNews;
