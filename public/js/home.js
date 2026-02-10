// Home Page Script

document.addEventListener('DOMContentLoaded', async () => {
    await loadPopularAnime();
    await loadSeasonalAnime();
});

// Load Popular Anime
async function loadPopularAnime() {
    const container = document.getElementById('popularAnime');
    
    try {
        utils.showLoading(container);
        const result = await api.getPopularAnime(1);
        
        if (result.success && result.data.length > 0) {
            // Show only first 10 items on home page
            const animeCards = result.data.slice(0, 10).map(anime => utils.createAnimeCard(anime)).join('');
            container.innerHTML = animeCards;
        } else {
            utils.showError(container, 'No popular anime found');
        }
    } catch (error) {
        console.error('Error loading popular anime:', error);
        utils.showError(container, 'Failed to load popular anime. Please try again later.');
    }
}

// Load Seasonal Anime
async function loadSeasonalAnime() {
    const container = document.getElementById('seasonalAnime');
    
    try {
        utils.showLoading(container);
        const result = await api.getSeasonalAnime();
        
        if (result.success && result.data.length > 0) {
            // Show only first 10 items on home page
            const animeCards = result.data.slice(0, 10).map(anime => utils.createAnimeCard(anime)).join('');
            container.innerHTML = animeCards;
        } else {
            utils.showError(container, 'No seasonal anime found');
        }
    } catch (error) {
        console.error('Error loading seasonal anime:', error);
        utils.showError(container, 'Failed to load seasonal anime. Please try again later.');
    }
          }
