// API utility for json-server
const API_BASE_URL = "http://localhost:3000";

// Fetch all toys
async function fetchToys() {
  try {
    const response = await fetch(`${API_BASE_URL}/toys`);
    if (!response.ok) {
      throw new Error("Failed to fetch toys");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching toys:", error);
    // Return fallback data if API fails
    return [];
  }
}

// Fetch a single toy by ID
async function fetchToy(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/toys/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch toy");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching toy:", error);
    return null;
  }
}

// Create a new toy
async function createToy(toy) {
  try {
    const response = await fetch(`${API_BASE_URL}/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy),
    });
    if (!response.ok) {
      throw new Error("Failed to create toy");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating toy:", error);
    throw error;
  }
}

// Update a toy
async function updateToy(id, toy) {
  try {
    const response = await fetch(`${API_BASE_URL}/toys/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy),
    });
    if (!response.ok) {
      throw new Error("Failed to update toy");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating toy:", error);
    throw error;
  }
}

// Delete a toy
async function deleteToy(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/toys/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete toy");
    }
    return true;
  } catch (error) {
    console.error("Error deleting toy:", error);
    throw error;
  }
}
