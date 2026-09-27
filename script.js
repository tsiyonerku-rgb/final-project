// GitHub Username Configuration
const GITHUB_USERNAME = "tsiyonerku-rgb";

async function fetchGitHubRepos() {
  const container = document.getElementById("repo-container");

  try {
    // Fetch public repositories sorted by most recently updated
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter out forks to only show your original work
    const originalRepos = repos.filter(repo => !repo.fork);

    // Clear the initial loading message
    container.innerHTML = "";

    if (originalRepos.length === 0) {
      container.innerHTML = "<p class='status-msg'>No public repositories found.</p>";
      return;
    }

    // Generate HTML for each repository
    originalRepos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "repo-card";

      card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
        <p>${repo.description ? repo.description : "No description provided."}</p>
        <div class="repo-meta">
          <span>${repo.language || "Web"}</span>
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    // Display error message if the API call fails
    container.innerHTML = `<p class="status-msg" style="color: #ef4444;">Failed to load repositories (${error.message}).</p>`;
  }
}

// Execute the fetch function once the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", fetchGitHubRepos);