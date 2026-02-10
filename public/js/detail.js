// Detail Page Script

let animeId = null;
let currentEpisodePage = 1;

document.addEventListener('DOMContentLoaded', () => {
    animeId = utils.getQueryParam('id');
    
    if (!animeId) {
        window.location.href = 'catalog.html';
        return;
    }
    
    loadAnimeDetails();
    loadEpisodes(1);
});

// Load Anime Details
async function loadAnimeDetails() {
    const container = document.getElementById('animeDetailsContainer');
    
    try {
        const result = await api.getAnimeDetails(animeId);
        
        if (result.success && result.data) {
            const anime = result.data;
            
            container.innerHTML = `
                <div class="anime-detail">
                    <div class="anime-detail-header" style="background-image: url('${anime.image}');">
                    </div>
                    <div class="anime-detail-content">
                        <div class="anime-poster">
                            <img src="${anime.image}" alt="${anime.title}" onerror="this.src='https://via.placeholder.com/250x350?text=No+Image'">
                        </div>
                        <div class="anime-info">
                            <h1>${anime.title}</h1>
                            ${anime.titleEnglish ? `<p style="color: var(--text-gray); font-size: 1.2rem; margin-bottom: 1rem;">${anime.titleEnglish}</p>` : ''}
                            
                            <div class="anime-stats">
                                <div class="stat-item">
                                    <span class="stat-label">Score</span>
                                    <span class="stat-value">
                                        <i class="fas fa-star"></i> ${anime.score || 'N/A'}
                                    </span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Episodes</span>
                                    <span class="stat-value">${anime.episodes || 'Unknown'}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Status</span>
                                    <span class="stat-value">${anime.status || 'Unknown'}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Year</span>
                                    <span class="stat-value">${anime.year || 'N/A'}</span>
                                </div>
                            </div>
                            
                            ${anime.genres && anime.genres.length > 0 ? `
                                <div class="genres">
                                    ${anime.genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join('')}
                                </div>
                            ` : ''}
                            
                            ${anime.studios && anime.studios.length > 0 ? `
                                <p style="margin-top: 1rem;">
                                    <strong>Studio:</strong> ${anime.studios.map(s => s.name).join(', ')}
                                </p>
                            ` : ''}
                            
                            ${anime.synopsis ? `
                                <div class="synopsis">
                                    <h3>Synopsis</h3>
                                    <p>${anime.synopsis}</p>
                                </div>
                            ` : ''}
                            
                            ${anime.trailer ? `
                                <div style="margin-top: 2rem;">
                                    <a href="${anime.trailer}" target="_blank" class="btn btn-primary">
                                        <i class="fas fa-play"></i> Watch Trailer
                                    </a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        } else {
            utils.showError(container, 'Anime not found');
        }
    } catch (error) {
        console.error('Error loading anime details:', error);
        utils.showError(container, 'Failed to load anime details.');
    }
}

// Load Episodes
async function loadEpisodes(page) {
    const container = document.getElementById('episodesList');
    const paginationContainer = document.getElementById('episodesPagination');
    
    try {
        container.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading episodes...</p>
            </div>
        `;
        
        const result = await api.getAnimeEpisodes(animeId, page);
        
        if (result.success && result.data.length > 0) {
            const episodesHTML = result.data.map(episode => `
                <div class="episode-card" onclick="watchEpisode(${animeId}, ${episode.number})">
                    <div class="episode-number">
                        ${episode.number}
                    </div>
                    <div class="episode-info">
                        <h4>Episode ${episode.number}</h4>
                        <p>${episode.title || 'No title available'}</p>
                        ${episode.aired ? `<p style="font-size: 0.8rem; color: var(--text-gray);">Aired: ${utils.formatDate(episode.aired)}</p>` : ''}
                    </div>
                </div>
            `).join('');
            
            container.innerHTML = episodesHTML;
            
            // Render pagination if available
            if (result.pagination && result.pagination.has_next_page) {
                currentEpisodePage = result.pagination.current_page || page;
                const totalPages = result.pagination.last_visible_page || 1;
                renderEpisodesPagination(paginationContainer, totalPages);
            } else {
                paginationContainer.innerHTML = '';
            }
        } else {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-gray);">
                    <i class="fas fa-info-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No episodes information available</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading episodes:', error);
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-gray);">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Failed to load episodes</p>
            </div>
        `;
    }
}

// Render Episodes Pagination
function renderEpisodesPagination(container, totalPages) {
    let paginationHTML = '';
    
    paginationHTML += `
        <button onclick="changeEpisodePage(${currentEpisodePage - 1})" ${currentEpisodePage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
    `;
    
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        paginationHTML += `
            <button onclick="changeEpisodePage(${i})" ${i === currentEpisodePage ? 'class="active"' : ''}>
                ${i}
            </button>
        `;
    }
    
    paginationHTML += `
        <button onclick="changeEpisodePage(${currentEpisodePage + 1})" ${currentEpisodePage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    container.innerHTML = paginationHTML;
}

// Change Episode Page
function changeEpisodePage(page) {
    if (page < 1) return;
    loadEpisodes(page);
    
    // Scroll to episodes section
    document.querySelector('.episodes-section').scrollIntoView({ behavior: 'smooth' });
}

// Watch Episode
function watchEpisode(animeId, episodeNumber) {
    window.location.href = `watch.html?id=${animeId}&episode=${episodeNumber}`;
                              }
                      
