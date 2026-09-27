// Put your GitHub username here
const GITHUB_USERNAME = "tsiyonerku-rgb";

async function fetchGitHubRepos() {
  const container = document.getElementById("repo-container");

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const originalRepos = repos.filter(repo => !repo.fork);

    // Clear loading message
    container.innerHTML = "";

    if (originalRepos.length === 0) {
      container.innerHTML = "<p class='status-msg'>No public repositories found.</p>";
      return;
    }

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
    container.innerHTML = `<p class="status-msg">Failed to load repositories (${error.message}).</p>`;
  }
}

// Fetch repos once DOM is loaded
document.addEventListener("DOMContentLoaded", fetchGitHubRepos);