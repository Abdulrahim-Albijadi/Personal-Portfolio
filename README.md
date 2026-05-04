# My Portfolio (Assignment 4)

## Description
This is the final polished version of my personal portfolio web application for Assignment 4. It builds on Assignment 3 by improving the design, structure, documentation, and overall user experience using HTML, CSS, and JavaScript.

The website includes the main sections of a portfolio website such as Welcome, About Me, Skills, Projects, GitHub Repositories, and Contact.

## Features
- Welcome section with saved visitor name
- About Me section with a short introduction
- Skills section showing technical skills
- Projects section with images and project categories
- GitHub Repositories section that loads data automatically from the GitHub API
- Contact form requiring name, email, and a message
- Navigation bar for easier movement between sections
- Scroll-to-top button

### Main Features
- Dark/light mode with saved preference using `localStorage`
- Visitor name saving with `localStorage`
- Project search, filtering, and sorting
- Contact form validation with user feedback
- GitHub API integration to load repositories dynamically
- Responsive design for different screen sizes
- Hover effects and cleaner UI styling

## Setup (Run Locally)
1. Download or clone this repository.
2. Open the folder in VS Code.
3. Open `index.html` in your browser or use the VS Code Live Server extension.

## How It Works
- The theme toggle saves the user’s choice using `localStorage`, so it stays after refreshing the page.
- The welcome section saves the visitor’s name and shows it again when the page is reopened.
- The projects section allows searching, filtering, and sorting to make browsing easier.
- The GitHub section fetches repositories from the GitHub API and displays them on the page automatically.
- The contact form prevents invalid submission and shows feedback messages to the user.
- The scroll-to-top button appears when the user scrolls down and smoothly returns to the top.

## AI Use
I used AI tools, mainly ChatGPT, to help with planning Assignment 4, improving the website structure, fixing bugs, improving the UI, and organizing documentation.

I reviewed, tested, and modified the suggestions to make sure they fit my project and that I understood how the code works.

More details: `docs/ai-usage-report.md`.

## Documentation
- AI Usage Report: `docs/ai-usage-report.md`
- Technical Documentation: `docs/technical-documentation.md`

## Live Demo
https://b9-2.github.io/202260760-Abdulrahim-assignment4/