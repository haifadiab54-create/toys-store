// Admin Page JavaScript
(async function() {
  // Render toy form
  function renderToyForm(toy = null) {
    const isEdit = toy !== null;
    return `
      <div class="toy-form-card">
        <h2>${isEdit ? 'Edit Toy' : 'Add New Toy'}</h2>
        <form id="toy-form" onsubmit="handleSubmit(event, ${isEdit ? toy.id : 'null'})">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Toy Name *</label>
              <input type="text" id="name" name="name" value="${isEdit ? toy.name : ''}" required>
            </div>
            <div class="form-group">
              <label for="description">Description *</label>
              <textarea id="description" name="description" rows="3" required>${isEdit ? toy.description : ''}</textarea>
            </div>
            <div class="form-group">
              <label for="price">Price ($) *</label>
              <input type="number" id="price" name="price" step="0.01" min="0" value="${isEdit ? toy.price : ''}" required>
            </div>
            <div class="form-group">
              <label for="stock">Stock *</label>
              <input type="number" id="stock" name="stock" min="0" value="${isEdit ? toy.stock : ''}" required>
            </div>
            <div class="form-group">
              <label for="category">Category *</label>
              <select id="category" name="category" required>
                ${CATEGORIES.filter(c => c !== 'All').map(cat => 
                  `<option value="${cat}" ${isEdit && toy.category === cat ? 'selected' : ''}>${cat}</option>`
                ).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="ageRange">Age Range *</label>
              <select id="ageRange" name="ageRange" required>
                ${AGE_RANGES.filter(a => a !== 'All Ages').map(age => 
                  `<option value="${age}" ${isEdit && toy.ageRange === age ? 'selected' : ''}>${age}</option>`
                ).join('')}
              </select>
            </div>
            <div class="form-group full-width">
              <label for="image">Image URL *</label>
              <input type="url" id="image" name="image" value="${isEdit ? toy.image : ''}" required placeholder="https://example.com/image.jpg">
              ${isEdit ? `<img src="${toy.image}" alt="Preview" onerror="this.src='https://via.placeholder.com/100'" style="width: 100px; height: 100px; object-fit: cover; border-radius: 0.5rem; margin-top: 0.5rem; border: 1px solid #e5e7eb;">` : ''}
            </div>
            <div class="form-group full-width">
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="checkbox" id="featured" name="featured" ${isEdit && toy.featured ? 'checked' : ''} style="width: 1rem; height: 1rem;">
                <span>Featured toy (appears on landing page)</span>
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel" onclick="closeForm()">Cancel</button>
            <button type="submit" class="btn-submit">${isEdit ? 'Update Toy' : 'Add Toy'}</button>
          </div>
        </form>
      </div>
    `;
  }

  // Initialize page
  let toys = [];
  let currentEditingId = null;

  async function loadToys() {
    toys = await fetchToys();
    renderAdminPage();
  }

  function renderAdminPage() {
    const totalToys = toys.length;
    const inStock = toys.filter(t => t.stock > 0).length;
    const outOfStock = toys.filter(t => t.stock === 0).length;
    const featured = toys.filter(t => t.featured).length;

    document.querySelector('.admin-page .container').innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="text-5xl mb-3" style="background: linear-gradient(to right, #4f46e5, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Toy Management
          </h1>
          <p style="color: #6b7280; font-size: 1.125rem;">Add, edit, and manage your toy inventory</p>
        </div>
        <button class="btn-add-new" onclick="openAddForm()">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Toy
        </button>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card" style="background: linear-gradient(to bottom right, #dbeafe, #bfdbfe);">
          <div class="stat-label" style="color: #2563eb;">Total Toys</div>
          <div class="stat-value" style="color: #1e40af;">${totalToys}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(to bottom right, #dcfce7, #bbf7d0);">
          <div class="stat-label" style="color: #16a34a;">In Stock</div>
          <div class="stat-value" style="color: #15803d;">${inStock}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(to bottom right, #fee2e2, #fecaca);">
          <div class="stat-label" style="color: #dc2626;">Out of Stock</div>
          <div class="stat-value" style="color: #b91c1c;">${outOfStock}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(to bottom right, #f3e8ff, #e9d5ff);">
          <div class="stat-label" style="color: #9333ea;">Featured</div>
          <div class="stat-value" style="color: #7e22ce;">${featured}</div>
        </div>
      </div>

      <!-- Toy Form Modal -->
      <div id="form-modal" class="modal" style="display: none;">
        <div class="modal-content">
          ${renderToyForm()}
        </div>
      </div>

      <!-- Table -->
      <div class="filters-card" style="overflow: hidden;">
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Age Range</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th style="text-align: center;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${toys.map(toy => `
                <tr>
                  <td>
                    <img src="${toy.image}" alt="${toy.name}" onerror="this.src='https://via.placeholder.com/50'" style="width: 3rem; height: 3rem; object-fit: cover; border-radius: 0.5rem;">
                  </td>
                  <td style="padding: 1rem; font-weight: 500;">${toy.name}</td>
                  <td>${toy.category}</td>
                  <td>${toy.ageRange}</td>
                  <td style="font-weight: 600;">$${toy.price.toFixed(2)}</td>
                  <td style="${toy.stock === 0 ? 'color: #dc2626;' : ''}">
                    ${toy.stock}
                  </td>
                  <td style="color: ${toy.featured ? '#16a34a' : '#9ca3af'}">
                    ${toy.featured ? 'Yes' : 'No'}
                  </td>
                  <td style="text-align: center;">
                    <button class="btn-action btn-edit" onclick="openEditForm(${toy.id})" title="Edit">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button class="btn-action btn-delete" onclick="handleDelete(${toy.id})" title="Delete">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Global functions for buttons
  window.openAddForm = function() {
    currentEditingId = null;
    const modal = document.getElementById('form-modal');
    modal.querySelector('.modal-content').innerHTML = renderToyForm();
    modal.style.display = 'flex';
  };

  window.openEditForm = function(id) {
    const toy = toys.find(t => t.id === id);
    if (!toy) return;
    currentEditingId = id;
    const modal = document.getElementById('form-modal');
    modal.querySelector('.modal-content').innerHTML = renderToyForm(toy);
    modal.style.display = 'flex';
  };

  window.closeForm = function() {
    document.getElementById('form-modal').style.display = 'none';
    currentEditingId = null;
  };

  window.handleSubmit = async function(event, id) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const toy = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      category: formData.get('category'),
      ageRange: formData.get('ageRange'),
      image: formData.get('image'),
      featured: formData.get('featured') === 'on'
    };

    try {
      if (id) {
        // Update existing toy
        await updateToy(id, toy);
        alert('Toy updated successfully!');
      } else {
        // Create new toy
        await createToy(toy);
        alert('Toy added successfully!');
      }
      closeForm();
      await loadToys();
    } catch (error) {
      alert('Error saving toy. Please check the console for details.');
      console.error(error);
    }
  };

  window.handleDelete = async function(id) {
    const toy = toys.find(t => t.id === id);
    if (!toy) return;
    
    if (!confirm(`Are you sure you want to delete "${toy.name}"?`)) {
      return;
    }

    try {
      await deleteToy(id);
      alert('Toy deleted successfully!');
      await loadToys();
    } catch (error) {
      alert('Error deleting toy. Please check the console for details.');
      console.error(error);
    }
  };

  // Close modal when clicking outside
  document.addEventListener('click', function(event) {
    const modal = document.getElementById('form-modal');
    if (event.target === modal) {
      closeForm();
    }
  });

  // Initialize
  await loadToys();
})();
