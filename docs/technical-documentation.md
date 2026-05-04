# Technical Documentation (Assignment 4)

## Project Overview
This project is the final polished version of my personal portfolio web application for Assignment 4. It builds on Assignment 3 by improving the structure, design, user experience, and overall presentation quality.

The website contains the main sections of a portfolio website: Welcome, About Me, Skills, Projects, GitHub Repositories, and Contact. It also includes interactive features such as dark mode, saved visitor name, project search/filter/sort, GitHub API loading, form validation, and a scroll-to-top button.

## Folder Structure
- `index.html` — Main page structure
- `css/styles.css` — Page styling, responsive layout, dark mode styles, and UI improvements
- `js/script.js` — JavaScript interactivity and logic
- `assets/images/` — Images used in the Projects section
- `docs/ai-usage-report.md` — AI usage report
- `docs/technical-documentation.md` — This document
- `presentation/` — Presentation slides and demo video

## HTML Structure (index.html)
- `<main id="container">` wraps the main content of the page
- Header:
  - Shows my name, student information, and dark mode button
- Navigation bar:
  - Provides quick links to the main sections of the page
- Sections:
  - `#welcome` — lets the visitor enter and save their name
  - `#about` — short introduction about me
  - `#skills` — shows technical skills as badges
  - `#projects` — shows project cards with title, category, description, and image
    - Includes filter dropdown (`#filterProjects`)
    - Includes sort dropdown (`#sortProjects`)
    - Includes search input (`#projectSearch`)
    - Includes an empty state message (`#emptyMessage`)
  - `#github-projects` — shows repositories loaded automatically from the GitHub API
    - Includes status message (`#repoStatus`)
    - Includes repository container (`#repoList`)
  - `#contact` — contact form with name, email, and message
    - Includes a feedback message element (`#formMessage`)
- `#scrollTopBtn` — button used to scroll back to the top of the page

## CSS Styling (css/styles.css)
- The layout is centered using `#container` with a max-width.
- Sections are styled like cards using padding, rounded corners, borders, and light shadow.
- The hero area at the top shows the name, subtitle, and dark mode button in a clean layout.
- The navigation bar uses rounded links to make page navigation easier.
- The skills section uses badge-style elements.
- The projects section uses a grid for controls and project cards.
- Project cards include hover effects to make the interface feel more interactive.
- The GitHub section uses repository cards instead of a simple list.
- Inputs, buttons, and dropdowns are styled consistently.
- The scroll-to-top button is fixed at the bottom-right of the page.
- Images use fixed card heights with `object-fit` for a cleaner layout.
- Responsive behavior:
  - On smaller screens, layouts stack vertically.
  - Project cards become one-column cards.
  - Main buttons can stretch to full width for easier mobile use.
- Dark mode:
  - The `.dark` class changes the background, text, cards, inputs, buttons, navigation links, and project tags.
  - Dark mode also updates the custom dropdown arrow colors.

## JavaScript Interactivity (js/script.js)

### 1. Visitor Name Saving
- The welcome section allows the visitor to enter their name.
- The name is saved using `localStorage`.
- The saved name is shown again when the page is reopened.
- The name can be saved either by clicking the Save button or pressing Enter.

### 2. Dark/Light Mode Toggle
- A button with `id="themeToggle"` toggles dark mode.
- On click:
  - Adds or removes the `dark` class on the `<body>`
  - Updates the button text
  - Saves the theme in `localStorage`
- On page load:
  - The saved theme is loaded and applied automatically

### 3. Project Search, Filter, and Sort
- The projects section supports three controls:
  - Search by text
  - Filter by category
  - Sort by title
- The search input listens for typing and updates the visible projects.
- The filter dropdown shows all projects or only selected categories.
- The sort dropdown changes the order of the project cards.
- If no project matches, an empty message is shown.

### 4. Contact Form Validation
- The form has `id="contactForm"`.
- On submit:
  - Prevents default form submission
  - Checks if fields are empty
  - Checks that the name has at least 3 characters
  - Checks that the email looks valid
  - Checks that the message has at least 10 characters
  - Displays error or success messages
  - Resets the form after successful submission

### 5. GitHub API Integration
- The GitHub section fetches public repositories from the GitHub API.
- Repositories are loaded automatically when the page opens.
- Each repository is displayed in a styled card with:
  - repository name
  - description
  - main language
- If loading fails, an error message is shown to the user.

### 6. Scroll-to-Top Button
- The scroll button appears after the user scrolls down the page.
- When clicked, it smoothly scrolls the user back to the top.
- This improves the user experience, especially on longer pages.

## Performance and Compatibility
- Images use `loading="lazy"` to improve loading performance.
- The website uses plain HTML, CSS, and JavaScript without heavy libraries.
- The layout is responsive and works better across different screen sizes.
- The code is separated into clear files for structure and readability.
- Error messages are shown when form input is invalid or when repositories cannot be loaded.

## How to Run Locally
1. Open the project folder in VS Code.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.
3. Test the main features:
   - Save visitor name
   - Toggle dark/light mode
   - Search, filter, and sort projects
   - Check GitHub repositories loading
   - Submit the contact form with valid and invalid inputs
   - Scroll down and test the scroll-to-top button