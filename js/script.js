function getLanguageIcon(language) {
  const normalizedLanguage = (language || '').toLowerCase();

  if (normalizedLanguage === 'javascript') {
    return `
      <svg class="language-icon lang-javascript" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3"></rect>
        <text x="12" y="16">JS</text>
      </svg>
    `;
  }

  if (normalizedLanguage === 'html') {
    return `
      <svg class="language-icon lang-html" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3h14l-1.3 15.2L12 21l-5.7-2.8L5 3Z"></path>
        <path d="M9 8h6l-.3 3H9.3l.3 3.4 2.4.9 2.4-.9.2-1.8"></path>
      </svg>
    `;
  }

  if (normalizedLanguage === 'python') {
    return `
      <svg class="language-icon lang-python" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4h6a3 3 0 0 1 3 3v3H9a3 3 0 0 0-3 3v1H4V9a5 5 0 0 1 5-5Z"></path>
        <path d="M16 20h-6a3 3 0 0 1-3-3v-3h8a3 3 0 0 0 3-3v-1h2v5a5 5 0 0 1-5 5Z"></path>
        <circle cx="10" cy="7" r="0.9"></circle>
        <circle cx="14" cy="17" r="0.9"></circle>
      </svg>
    `;
  }

  return `
    <svg class="language-icon lang-code" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m10 8-4 4 4 4"></path>
      <path d="m14 8 4 4-4 4"></path>
    </svg>
  `;
}
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
    const response = await fetch('https://api.github.com/users/Abdulrahim-Albijadi/repos');
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
      const isFeatured = featuredRepoOrder.includes(repo.name);
      const repoCard = document.createElement('article');
      repoCard.className = `glass repo-card${isFeatured ? ' featured-repo' : ''}`;
      repoCard.innerHTML = `
        <div class="repo-top">
          <span class="repo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M14 2 5 13h7l-2 9 9-12h-7l2-8Z"></path>
            </svg>
          </span>
          <span class="repo-language">
            ${getLanguageIcon(repo.language)}
            ${repo.language || 'Code'}
          </span>
        </div>
        <h3>
          <a href="${repo.html_url}" target="_blank" rel="noopener">
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
        <a class="repo-action" href="${repo.html_url}" target="_blank" rel="noopener">View repository</a>
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
