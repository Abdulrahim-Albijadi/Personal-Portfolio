const sunIcon = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
</svg>
`;
const moonIcon = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3A8.5 8.5 0 1 0 21 14.5Z" fill="currentColor"></path>
</svg>
`;
const toggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('dark');
    toggleBtn.innerHTML = moonIcon;
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark');
    toggleBtn.innerHTML = sunIcon;
    localStorage.setItem('theme', 'dark');
  }
}
setTheme(savedTheme === 'light' ? 'light' : 'dark');
toggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});
async function loadRepositories() {
  const repoStatus = document.getElementById('repoStatus');
  const repoList = document.getElementById('repoList');
  const featuredRepoOrder = [
    'SWE-363-KFUPMEvent-Project',
    'Personal-Portfolio',
    'bookstore-management-system',
  ];
  if (!repoList) return;
  repoStatus.textContent = 'Loading repositories...';
  try {
    const response = await fetch('https://api.github.com/users/B9-2/repos');
    let repos = await response.json();
    repos = repos.filter(repo => ![
      '202260760-Abdulrahim-assignment2',
      '202260760-Abdulrahim-assignment3',
      '202260760-Abdulrahim-assignment4'
    ].includes(repo.name));
    repos.sort((a, b) => {
      const aIndex = featuredRepoOrder.indexOf(a.name);
      const bIndex = featuredRepoOrder.indexOf(b.name);
      const aPriority = aIndex === -1 ? featuredRepoOrder.length : aIndex;
      const bPriority = bIndex === -1 ? featuredRepoOrder.length : bIndex;

      return aPriority - bPriority;
    });
    repoStatus.textContent = '';
    repos.slice(0, 6).forEach((repo) => {
      const repoCard = document.createElement('article');
      repoCard.className = 'glass repo-card';
      repoCard.innerHTML = `
        <div class="repo-top">
          <span class="repo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M14 2 5 13h7l-2 9 9-12h-7l2-8Z"></path>
            </svg>
          </span>
          <span>${repo.language || 'Code'}</span>
        </div>
        <h3>
          <a href="${repo.html_url}" target="_blank">
            ${repo.name}
          </a>
        </h3>
        <p class="repo-description">
          ${repo.description || 'No description available.'}
        </p>
        <div class="repo-meta">
          <span class="repo-stat">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path>
            </svg>
            ${repo.stargazers_count}
          </span>
          <span>${repo.visibility}</span>
        </div>
      `;
      repoList.appendChild(repoCard);
    });
  } catch (error) {
    repoStatus.textContent = 'Could not load repositories.';
  }
}
loadRepositories();
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('myName').value.trim();
    const email = document.getElementById('myEmail').value.trim();
    const message = document.getElementById('myMessage').value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:abdulraheem6421@gmail.com?subject=${subject}&body=${body}`;
    formMessage.textContent = 'Opening your email app with the message ready to send.';
  });
}
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'flex';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// Reveal animation

const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();


// Active navbar highlighting

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 160) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
