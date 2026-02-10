// Catalog Page Script

let currentPage = 1;
let totalPages = 1;
let isSearchMode = false;
let isSeasonalMode = false;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    // Check if this is a search or seasonal request
    searchQuery = utils.getQueryParam('search');
    isSeasonalMode = utils.getQueryParam('seasonal') === 'true';
    
    if (searchQuery) {
        isSearchMode = true;
        loadSearchResults();
    } else if (isSeasonalMode) {
        loadSeasonalCatalog();
    } else {
        loadCatalog(currentPage);
    }
});

// Load Catalog
async function loadCatalog(page) {
    const container = document.getElementById('catalogAnime');
    const paginationContainer = document.getElementById('pagination');
    
    try {
        utils.showLoading(container);
        const result = await api.getPopularAnime(page);
        
        if (result.success && result.data.length > 0) {
            const animeCards = result.data.map(anime => utils.createAnimeCard(anime)).join('');
            container.innerHTML = animeCards;
            
            // Update pagination
            if (result.pagination) {
                currentPage = result.pagination.current_page || page;
                totalPages = result.pagination.last_visible_page || 1;
                renderPagination(paginationContainer);
            }
        } else {
            utils.showError(container, 'No anime found');
        }
    } catch (error) {
        console.error('Error loading catalog:', error);
        utils.showError(container, 'Failed to load catalog. Please try again later.');
    }
}

// Load Search Results
async function loadSearchResults() {
    const container = document.getElementById('catalogAnime');
    const paginationContainer = document.getElementById('pagination');
    
    try {
        utils.showLoading(container);
        const result = await api.searchAnime(searchQuery);
        
        if (result.success && result.data.length > 0) {
            const animeCards = result.data.map(anime => utils.createAnimeCard(anime)).join('');
            container.innerHTML = animeCards;
            
            // Update header to show search query
            const headerSection = document.querySelector('.catalog-header h1');
            if (headerSection) {
                headerSection.innerHTML = `<i class="fas fa-search"></i> Search Results for "${searchQuery}"`;
            }
            
            // Hide pagination for search
            paginationContainer.innerHTML = '';
        } else {
            utils.showError(container, `No results found for "${searchQuery}"`);
        }
    } catch (error) {
        console.error('Error searching anime:', error);
        utils.showError(container, 'Search failed. Please try again.');
    }
}

// Load Seasonal Catalog
async function loadSeasonalCatalog() {
    const container = document.getElementById('catalogAnime');
    const paginationContainer = document.getElementById('pagination');
    
    try {
        utils.showLoading(container);
        const result = await api.getSeasonalAnime();
        
        if (result.success && result.data.length > 0) {
            const animeCards = result.data.map(anime => utils.createAnimeCard(anime)).join('');
            container.innerHTML = animeCards;
            
            // Update header
            const headerSection = document.querySelector('.catalog-header h1');
            if (headerSection) {
                headerSection.innerHTML = `<i class="fas fa-calendar"></i> Current Season Anime`;
            }
            
            // Hide pagination
            paginationContainer.innerHTML = '';
        } else {
            utils.showError(container, 'No seasonal anime found');
        }
    } catch (error) {
        console.error('Error loading seasonal anime:', error);
        utils.showError(container, 'Failed to load seasonal anime.');
    }
}

// Render Pagination
function renderPagination(container) {
    if (isSearchMode || isSeasonalMode) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
    `;
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<button onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<button disabled>...</button>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" ${i === currentPage ? 'class="active"' : ''}>
                ${i}
            </button>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<button disabled>...</button>`;
        }
        paginationHTML += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    container.innerHTML = paginationHTML;
}

// Change Page
function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }
    
    currentPage = page;
    loadCatalog(page);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
              }
