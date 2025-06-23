// src/api/fetchNews.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchNews = async ({ q = 'India', category = 'general', page = 1 }) => {
  try {
    const response = await axios.get(`${API_BASE}/news`, {
      params: { q, category, page },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('❌ Error fetching news:', error.message);
    return [];
  }
};
