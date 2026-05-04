const sunIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
    <path
      d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      fill="none"
    ></path>
  </svg>
`;

const moonIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M21 14.5A8.5 8.5 0 0 1 9.5 3A8.5 8.5 0 1 0 21 14.5Z"
      fill="currentColor"
    ></path>
  </svg>
`;

// Theme toggle: dark mode by default
const toggleBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.remove("dark");
    toggleBtn.innerHTML = moonIcon;
    toggleBtn.setAttribute("aria-label", "Switch to dark mode");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    toggleBtn.innerHTML = sunIcon;
    toggleBtn.setAttribute("aria-label", "Switch to light mode");
    localStorage.setItem("theme", "dark");
  }
}

setTheme(savedTheme === "light" ? "light" : "dark");

toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

// Search, filter, and sort projects
const searchInput = document.getElementById("projectSearch");
const filterProjects = document.getElementById("filterProjects");
const sortProjects = document.getElementById("sortProjects");
const projectList = document.getElementById("projectList");
const emptyMessage = document.getElementById("emptyMessage");

const originalProjects = Array.from(projectList.querySelectorAll(".project-card"));

function updateProjects() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCategory = filterProjects.value;
  const sortValue = sortProjects.value;

  let projects = [...originalProjects];

  projects = projects.filter((project) => {
    const title = project.dataset.title.toLowerCase();
    const text = project.textContent.toLowerCase();
    const category = project.dataset.category;

    const matchesSearch = title.includes(searchValue) || text.includes(searchValue);
    const matchesCategory = selectedCategory === "all" || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortValue === "az") {
    projects.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
  } else if (sortValue === "za") {
    projects.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
  }

  projectList.innerHTML = "";

  projects.forEach((project) => {
    projectList.appendChild(project);
  });

  emptyMessage.style.display = projects.length === 0 ? "block" : "none";
}

searchInput.addEventListener("input", updateProjects);
filterProjects.addEventListener("change", updateProjects);
sortProjects.addEventListener("change", updateProjects);

// Contact form validation
const contactForm = document.getElementById("contactForm");
const myName = document.getElementById("myName");
const myEmail = document.getElementById("myEmail");
const myMessage = document.getElementById("myMessage");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = myName.value.trim();
  const emailValue = myEmail.value.trim();
  const messageValue = myMessage.value.trim();

  if (nameValue === "" || emailValue === "" || messageValue === "") {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  if (nameValue.length < 3) {
    formMessage.textContent = "Name must be at least 3 characters long.";
    formMessage.style.color = "red";
    return;
  }

  if (!emailValue.includes("@") || !emailValue.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
    return;
  }

  if (messageValue.length < 10) {
    formMessage.textContent = "Message must be at least 10 characters long.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Message sent successfully.";
  formMessage.style.color = "green";

  contactForm.reset();
});

// GitHub API integration
const repoStatus = document.getElementById("repoStatus");
const repoList = document.getElementById("repoList");

async function loadRepositories() {
  repoStatus.textContent = "Loading repositories...";
  repoStatus.style.color = "inherit";
  repoList.innerHTML = "";

  try {
    const response = await fetch("https://api.github.com/users/B9-2/repos");

    if (!response.ok) {
      throw new Error("Failed to fetch repositories.");
    }

    let repos = await response.json();

    repos = repos.filter((repo) => {
      const hiddenRepos = [
        "202260760-Abdulrahim-assignment2",
        "202260760-Abdulrahim-assignment3",
        "202260760-Abdulrahim-assignment4",
      ];

      return !hiddenRepos.includes(repo.name);
    });

    repos.sort((a, b) => a.name.localeCompare(b.name));

    if (repos.length === 0) {
      repoStatus.textContent = "No repositories found.";
      return;
    }

    repoStatus.textContent = "";

    repos.forEach((repo) => {
      const repoCard = document.createElement("article");
      repoCard.className = "repo-card";

      repoCard.innerHTML = `
        <h3>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        </h3>
        <p class="repo-description">
          ${repo.description ? repo.description : "No description available."}
        </p>
        <p class="repo-meta">
          ${repo.language ? `Main language: ${repo.language}` : "Language not specified"}
        </p>
      `;

      repoList.appendChild(repoCard);
    });
  } catch (error) {
    repoStatus.textContent = "Could not load GitHub repositories. Please try again later.";
    repoStatus.style.color = "red";
  }
}

// Scroll to top button
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Run on page load
updateProjects();
loadRepositories();