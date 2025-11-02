// Shared Toy Card Component
function renderToyCard(toy) {
  const stockBadge = toy.stock > 0 
    ? `<span class="toy-badge toy-in-stock">In Stock</span>` 
    : `<span class="toy-badge toy-out-stock">Out of Stock</span>`;
  
  const featuredBadge = toy.featured 
    ? `<div class="toy-featured">
         <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
         </svg>
         <span>Featured</span>
       </div>` 
    : '';

  return `
    <div class="toy-card">
      <div class="toy-image-wrapper">
        <img src="${toy.image}" alt="${toy.name}" class="toy-image" onerror="this.src='https://via.placeholder.com/300'">
        <div class="toy-badges">
          ${featuredBadge}
          ${stockBadge}
        </div>
      </div>
      <div class="toy-content">
        <h3 class="toy-name">${toy.name}</h3>
        <span class="toy-category">${toy.category}</span>
        <p class="toy-description">${toy.description}</p>
        <div class="toy-footer">
          <div>
            <div class="toy-footer-label">Price</div>
            <span class="toy-price">$${toy.price.toFixed(2)}</span>
          </div>
          <div class="toy-footer-right">
            <div class="toy-footer-label">Age</div>
            <span class="toy-age">${toy.ageRange}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

