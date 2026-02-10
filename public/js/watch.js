// Watch Page Script

let animeId = null;
let episodeNumber = null;
let allEpisodes = [];
let animeData = null;

document.addEventListener('DOMContentLoaded', () => {
    animeId = utils.getQueryParam('id');
    episodeNumber = parseInt(utils.getQueryParam('episode'));
    
    if (!animeId || !episodeNumber) {
        window.location.href = 'catalog.html';
        return;
    }
    
    loadAnimeInfo();
    loadStreamingData();
    loadAllEpisodes();
});

// Load Anime Info
async function loadAnimeInfo() {
    try {
        const result = await api.getAnimeDetails(animeId);
        
        if (result.success && result.data) {
            animeData = result.data;
            document.getElementById('animeTitle').textContent = animeData.title;
            document.getElementById('episodeTitle').textContent = `Episode ${episodeNumber}`;
            document.title = `${animeData.title} - Episode ${episodeNumber} - AnimeStream`;
        }
    } catch (error) {
        console.error('Error loading anime info:', error);
    }
}

// Load Streaming Data
async function loadStreamingData() {
    try {
        const result = await api.getStreamingLink(animeId, episodeNumber);
        
        if (result.success) {
            console.log('Streaming data:', result.data);
            // In a real implementation, you would initialize the video player here
            // For demo purposes, we just show the notice
        }
    } catch (error) {
        console.error('Error loading stream:', error);
    }
}

// Load All Episodes for Navigation
async function loadAllEpisodes() {
    const container = document.getElementById('allEpisodes');
    
    try {
        const result = await api.getAnimeEpisodes(animeId, 1);
        
        if (result.success && result.data.length > 0) {
            allEpisodes = result.data;
            
            const episodesHTML = result.data.map(episode => `
                <div class="episode-thumb ${episode.number === episodeNumber ? 'active' : ''}" 
                     onclick="changeEpisode(${episode.number})"
                     style="${episode.number === episodeNumber ? 'background: var(--primary-color);' : ''}">
                    <strong>EP ${episode.number}</strong>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">${episode.title ? utils.truncate(episode.title, 30) : ''}</p>
                </div>
            `).join('');
            
            container.innerHTML = episodesHTML;
            
            // Update navigation buttons
            updateNavigationButtons();
        }
    } catch (error) {
        console.error('Error loading episodes:', error);
    }
}

// Update Navigation Buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevEpisode');
    const nextBtn = document.getElementById('nextEpisode');
    const currentEpisodeSpan = document.getElementById('currentEpisode');
    
    currentEpisodeSpan.textContent = `Episode ${episodeNumber}`;
    
    // Check if there's a previous episode
    const hasPrev = allEpisodes.some(ep => ep.number === episodeNumber - 1);
    prevBtn.disabled = !hasPrev;
    
    // Check if there's a next episode
    const hasNext = allEpisodes.some(ep => ep.number === episodeNumber + 1);
    nextBtn.disabled = !hasNext;
    
    // Add event listeners
    prevBtn.onclick = () => {
        if (hasPrev) {
            changeEpisode(episodeNumber - 1);
        }
    };
    
    nextBtn.onclick = () => {
        if (hasNext) {
            changeEpisode(episodeNumber + 1);
        }
    };
}

// Change Episode
function changeEpisode(newEpisode) {
    window.location.href = `watch.html?id=${animeId}&episode=${newEpisode}`;
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const prevBtn = document.getElementById('prevEpisode');
    const nextBtn = document.getElementById('nextEpisode');
    
    // Left arrow - previous episode
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        changeEpisode(episodeNumber - 1);
    }
    
    // Right arrow - next episode
    if (e.key === 'ArrowRight' && !nextBtn.disabled) {
        changeEpisode(episodeNumber + 1);
    }
});
      
