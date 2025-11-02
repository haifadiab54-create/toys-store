// Home Page JavaScript
(async function() {
  const toys = await fetchToys();
  const featuredToys = toys.filter(t => t.featured).slice(0, 4);
  const featuredHtml = featuredToys.map(toy => renderToyCard(toy)).join('');

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="min-h-screen">
      <!-- Featured Toys Section -->
      <section class="featured-toys">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l1.5 4.5h4.5L14.25 10.5l1.5 4.5L12 11.25 8.25 15l1.5-4.5L5.25 6.5h4.5L12 2z"></path>
              </svg>
              <span>Most Loved</span>
            </div>
            <h2 class="section-title">Featured Toys</h2>
            <p class="section-subtitle">Check out our most popular toys this season</p>
          </div>
          <div class="toys-grid">
            ${featuredHtml}
          </div>
          <div style="text-align: center; margin-top: 3rem;">
            <button class="btn btn-primary" onclick="window.location.href='toys.html'">
              View All Toys
            </button>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section style="position: relative; padding: 6rem 0; background: linear-gradient(to bottom right, #4f46e5, #9333ea, #ec4899); color: white; overflow: hidden;">
        <div style="position: absolute; inset: 0; background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMC00YzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMi0yIC45LTIgMiAuOSAyIDIgMnoiLz48L2c+PC9nPjwvc3ZnPg=='); opacity: 0.2;"></div>
        <div class="container" style="position: relative;">
          <div style="max-width: 48rem; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 3rem; margin-bottom: 1.5rem;">Ready to Find the Perfect Toy?</h2>
            <p style="font-size: 1.25rem; margin-bottom: 2.5rem; opacity: 0.9;">Browse our complete collection and make a child's day special with toys that inspire creativity and wonder</p>
            <button class="btn btn-primary" onclick="window.location.href='toys.html'" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
              Explore All Toys
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l1.5 4.5h4.5L14.25 10.5l1.5 4.5L12 11.25 8.25 15l1.5-4.5L5.25 6.5h4.5L12 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
})();
