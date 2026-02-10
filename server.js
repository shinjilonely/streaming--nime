const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Base URL untuk scraping (contoh menggunakan MyAnimeList atau sumber lain)
// CATATAN: Pastikan Anda mematuhi ToS website yang di-scrape
const ANIME_API_BASE = 'https://www.sankavollerei.com/anime'; // Jikan API sebagai contoh legal

// Routes

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get popular anime
app.get('/api/anime/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(`${ANIME_API_BASE}/top/anime?page=${page}&limit=70`);
    
    const animeList = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      year: anime.year,
      synopsis: anime.synopsis
    }));

    res.json({
      success: true,
      data: animeList,
      pagination: response.data.pagination
    });
  } catch (error) {
    console.error('Error fetching popular anime:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch anime' });
  }
});

// Search anime
app.get('/api/anime/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter required' });
    }

    const response = await axios.get(`${ANIME_API_BASE}/anime?q=${encodeURIComponent(query)}&limit=20`);
    
    const animeList = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      year: anime.year,
      synopsis: anime.synopsis
    }));

    res.json({
      success: true,
      data: animeList
    });
  } catch (error) {
    console.error('Error searching anime:', error.message);
    res.status(500).json({ success: false, message: 'Failed to search anime' });
  }
});

// Get anime details
app.get('/api/anime/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${ANIME_API_BASE}/anime/${id}/full`);
    
    const anime = response.data.data;
    
    const animeDetails = {
      id: anime.mal_id,
      title: anime.title,
      titleEnglish: anime.title_english,
      titleJapanese: anime.title_japanese,
      image: anime.images.jpg.large_image_url,
      trailer: anime.trailer?.url,
      score: anime.score,
      episodes: anime.episodes,
      status: anime.status,
      aired: anime.aired,
      season: anime.season,
      year: anime.year,
      studios: anime.studios,
      genres: anime.genres,
      synopsis: anime.synopsis,
      background: anime.background
    };

    res.json({
      success: true,
      data: animeDetails
    });
  } catch (error) {
    console.error('Error fetching anime details:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch anime details' });
  }
});

// Get anime episodes
app.get('/api/anime/:id/episodes', async (req, res) => {
  try {
    const { id } = req.params;
    const page = req.query.page || 1;
    const response = await axios.get(`${ANIME_API_BASE}/anime/${id}/episodes?page=${page}`);
    
    const episodes = response.data.data.map(episode => ({
      id: episode.mal_id,
      number: episode.mal_id,
      title: episode.title,
      titleJapanese: episode.title_japanese,
      aired: episode.aired,
      filler: episode.filler,
      recap: episode.recap
    }));

    res.json({
      success: true,
      data: episodes,
      pagination: response.data.pagination
    });
  } catch (error) {
    console.error('Error fetching episodes:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch episodes' });
  }
});

// Get streaming link (mock - dalam implementasi nyata, ini perlu sumber video legal)
app.get('/api/anime/:id/episode/:episodeId/stream', async (req, res) => {
  try {
    const { id, episodeId } = req.params;
    
    // PENTING: Ini adalah mock data
    // Dalam implementasi nyata, Anda perlu:
    // 1. Menggunakan API legal seperti Crunchyroll API
    // 2. Memiliki lisensi yang tepat
    // 3. Atau mengarahkan ke platform streaming legal
    
    res.json({
      success: true,
      data: {
        animeId: id,
        episodeId: episodeId,
        streamUrl: `https://example.com/stream/${id}/${episodeId}`, // Mock URL
        quality: ['720p', '1080p'],
        subtitles: ['English', 'Indonesian'],
        note: 'This is a demo. Please use legal streaming services.'
      }
    });
  } catch (error) {
    console.error('Error fetching stream:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch stream' });
  }
});

// Get seasonal anime
app.get('/api/anime/season/:year/:season', async (req, res) => {
  try {
    const { year, season } = req.params;
    const response = await axios.get(`${ANIME_API_BASE}/seasons/${year}/${season}`);
    
    const animeList = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      synopsis: anime.synopsis
    }));

    res.json({
      success: true,
      data: animeList
    });
  } catch (error) {
    console.error('Error fetching seasonal anime:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch seasonal anime' });
  }
});

// Get current season
app.get('/api/anime/season/now', async (req, res) => {
  try {
    const response = await axios.get(`${ANIME_API_BASE}/seasons/now`);
    
    const animeList = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      synopsis: anime.synopsis
    }));

    res.json({
      success: true,
      data: animeList
    });
  } catch (error) {
    console.error('Error fetching current season:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch current season' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📺 Anime streaming website is ready!`);
});
                  
