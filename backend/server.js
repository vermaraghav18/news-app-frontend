const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 10000;

app.use(cors());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get('/news', async (req, res) => {
  const { q = 'India', category = 'general', page = 1 } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: `${q} ${category}`,
        page,
        apiKey: NEWS_API_KEY,
        pageSize: 30,
      },
    });

    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error('❌ Error fetching news from NewsAPI:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
