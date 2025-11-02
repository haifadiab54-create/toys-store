// Toys Page JavaScript
(async function() {
  const toys = await fetchToys();
  
  // Filter state
  let filters = {
    search: '',
    category: 'All',
    ageRange: 'All Ages',
    priceRange: 'all',
    sortBy: 'name'
  };

  // Apply filters
  function filterToys() {
    let filtered = [...toys];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(toy =>
        toy.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        toy.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(toy => toy.category === filters.category);
    }

    // Age range filter
    if (filters.ageRange !== 'All Ages') {
      filtered = filtered.filter(toy => toy.ageRange === filters.ageRange);
    }

    // Price range filter
    if (filters.priceRange === 'under20') {
      filtered = filtered.filter(toy => toy.price < 20);
    } else if (filters.priceRange === '20to40') {
      filtered = filtered.filter(toy => toy.price >= 20 && toy.price <= 40);
    } else if (filters.priceRange === 'over40') {
      filtered = filtered.filter(toy => toy.price > 40);
    }

    // Sort
    if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  // Render no results message
  function renderNoResults() {
    return `
      <div class="no-results">
        <div class="no-results-icon">
          <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3>No toys found</h3>
        <p>Try adjusting your filters</p>
        <button onclick="document.getElementById('reset-filters').click()" class="btn btn-primary">Reset Filters</button>
      </div>
    `;
  }

  // Update UI
  function updateResults() {
    const filtered = filterToys();
    const grid = document.getElementById('toys-grid');
    const count = document.getElementById('results-count');

    if (count) {
      count.innerHTML = `<p>Showing <span class="text-primary font-semibold">${filtered.length}</span> ${filtered.length === 1 ? 'toy' : 'toys'}</p>`;
    }

    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = renderNoResults();
      } else {
        grid.innerHTML = filtered.map(toy => renderToyCard(toy)).join('');
      }
    }
  }

  // Render filters
  function renderFilters() {
    return `
      <div class="filter-group">
        <label for="search-input" class="filter-label">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </label>
        <input 
          type="text" 
          id="search-input" 
          class="filter-input" 
          placeholder="Search toys..."
          value="${filters.search}"
        >
      </div>

      <div class="filter-group">
        <label for="category-select" class="filter-label">Category</label>
        <select id="category-select" class="filter-input">
          ${CATEGORIES.map(cat => 
            `<option value="${cat}" ${filters.category === cat ? 'selected' : ''}>${cat}</option>`
          ).join('')}
        </select>
      </div>

      <div class="filter-group">
        <label for="age-select" class="filter-label">Age Range</label>
        <select id="age-select" class="filter-input">
          ${AGE_RANGES.map(age => 
            `<option value="${age}" ${filters.ageRange === age ? 'selected' : ''}>${age}</option>`
          ).join('')}
        </select>
      </div>

      <div class="filter-group">
        <label for="price-select" class="filter-label">Price Range</label>
        <select id="price-select" class="filter-input">
          <option value="all" ${filters.priceRange === 'all' ? 'selected' : ''}>All Prices</option>
          <option value="under20" ${filters.priceRange === 'under20' ? 'selected' : ''}>Under $20</option>
          <option value="20to40" ${filters.priceRange === '20to40' ? 'selected' : ''}>$20 - $40</option>
          <option value="over40" ${filters.priceRange === 'over40' ? 'selected' : ''}>Over $40</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="sort-select" class="filter-label">Sort By</label>
        <select id="sort-select" class="filter-input">
          <option value="name" ${filters.sortBy === 'name' ? 'selected' : ''}>Name (A-Z)</option>
          <option value="price-low" ${filters.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
          <option value="price-high" ${filters.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
        </select>
      </div>
    `;
  }

  // Render page
  const filtered = filterToys();
  
  document.querySelector('.toys-page .container').innerHTML = `
    <div class="toys-header">
      <h1 class="text-5xl mb-6">All Toys</h1>
      <p class="text-lg text-gray-600">Explore our complete collection of magical toys</p>
    </div>

    <!-- Filters -->
    <div class="filters-card">
      <div class="filter-header">
        <div class="filter-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M10,18V16H21V18M3,18A2,2 0 0,1 1,16C1,15 1.25,14.14 1.76,13.46L8.73,4.83C9.29,4.02 10.17,3.5 11.13,3.5H21V5.5H11.13L4.5,14.5L3,16.5H21V18H3M14,13V11H21V13H14M14,8V6H21V8H14Z"></path>
          </svg>
        </div>
        <h2>Filters & Search</h2>
      </div>
      <div class="filter-grid">
        ${renderFilters()}
      </div>
      <div class="filter-actions">
        <button id="reset-filters" class="btn-reset">Reset Filters</button>
      </div>
    </div>

    <!-- Results -->
    <div class="results-count" id="results-count">
      <p>Showing <span class="text-primary font-semibold">${filtered.length}</span> ${filtered.length === 1 ? 'toy' : 'toys'}</p>
    </div>

    <!-- Toys Grid -->
    <div class="toys-grid" id="toys-grid">
      ${filtered.length === 0 ? renderNoResults() : filtered.map(toy => renderToyCard(toy)).join('')}
    </div>
  `;

  // Event listeners
  document.getElementById('search-input').addEventListener('input', (e) => {
    filters.search = e.target.value;
    updateResults();
  });

  document.getElementById('category-select').addEventListener('change', (e) => {
    filters.category = e.target.value;
    updateResults();
  });

  document.getElementById('age-select').addEventListener('change', (e) => {
    filters.ageRange = e.target.value;
    updateResults();
  });

  document.getElementById('price-select').addEventListener('change', (e) => {
    filters.priceRange = e.target.value;
    updateResults();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    updateResults();
  });

  document.getElementById('reset-filters').addEventListener('click', () => {
    filters = {
      search: '',
      category: 'All',
      ageRange: 'All Ages',
      priceRange: 'all',
      sortBy: 'name'
    };
    
    document.getElementById('search-input').value = '';
    document.getElementById('category-select').value = 'All';
    document.getElementById('age-select').value = 'All Ages';
    document.getElementById('price-select').value = 'all';
    document.getElementById('sort-select').value = 'name';
    
    updateResults();
  });
})();
