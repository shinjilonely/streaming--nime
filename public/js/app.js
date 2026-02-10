// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Utility Functions
const utils = {
    // Format date
    formatDate: (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    },

    // Truncate text
    truncate: (text, length = 150) => {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    },

    // Get query parameter
    getQueryParam: (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Show loading
    showLoading: (element) => {
        element.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading...</p>
            </div>
        `;
    },

    // Show error
    showError: (element, message) => {
        element.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 3rem;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <p style="font-size: 1.2rem;">${message}</p>
            </div>
        `;
    },

    // Create anime card
    createAnimeCard: (anime) => {
        return `
            <div class="anime-card" onclick="window.location.href='detail.html?id=${anime.id}'">
                <img src="${anime.image}" alt="${anime.title}" onerror="this.src='https://via.placeholder.com/220x300?text=No+Image'">
                <div class="anime-card-info">
                    <h3 title="${anime.title}">${anime.title}</h3>
                    <div class="anime-meta">
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            ${anime.score || 'N/A'}
                        </span>
                        ${anime.episodes ? `<span class="badge">${anime.episodes} Eps</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
};

// API Functions
const api = {
    // Fetch popular anime
    getPopularAnime: async (page = 1) => {
        try {
            const response = await fetch(`${API_BASE_URL}/anime/popular?page=${page}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching popular anime:', error);
            throw error;
        }
    },

    // Search anime
    searchAnime: async (query) => {
        try {
            const response = await fetch(`${API_BASE_URL}/anime/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching anime:', error);
            throw error;
        }
    },

    // Get anime details
    getAnimeDetails: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/anime/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching anime details:', error);
            throw error;
        }
    },

    // Get anime episodes
    getAnimeEpisodes: async (id, page = 1) => {
        try {
            const response = await fetch(`${API_BASE_URL}/anime/${id}/episodes?page=${page}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching episodes:', error);
            throw error;
        }
    },

    // Get streaming link
    getStreamingLink: async (animeId, episodeId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/anime/${animeId}/episode/${episodeId}/stream`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching stream:', error);
            throw error;
        }
    },

    // Get seasonal anime
    getSeasonalAnime: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/anime/season/now`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching seasonal anime:', error);
            throw error;
        }
    }
};

// Search functionality (global)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // Seasonal link
    const seasonalLink = document.getElementById('seasonalLink');
    if (seasonalLink) {
        seasonalLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'catalog.html?seasonal=true';
        });
    }

    const viewSeasonalAll = document.getElementById('viewSeasonalAll');
    if (viewSeasonalAll) {
        viewSeasonalAll.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'catalog.html?seasonal=true';
        });
    }
});
          
