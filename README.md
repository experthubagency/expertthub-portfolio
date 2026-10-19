# Abdulbasit Abubakar | Experthub Agency — Portfolio Website

Official portfolio website for **Abdulbasit Abubakar**, founder of **Experthub Agency**. Built with semantic HTML5, modern responsive CSS, and vanilla JavaScript for instant deployment on GitHub and Vercel.

## File List

- `index.html` — Complete website structure, SEO/Open Graph tags, Services, About, Website Audit form, and General Contact form.
- `style.css` — Dark, cinematic, editorial design system with mobile-first responsive rules and reduced-motion accessibility support.
- `projects.js` — Centralized project database and category definitions.
- `script.js` — Portfolio rendering engine, category filter controller, mobile navigation, and Formspree submission handler.
- `favicon.svg` — Vector monogram icon (`EH`) matching the brand palette.
- `README.md` — Maintenance and mobile deployment documentation.

---

## How to Add a New Project Later

You never need to edit `index.html` to add or update a project. Open `projects.js` and add a new object inside the `PORTFOLIO_PROJECTS` array:

```javascript
  {
    id: "new-brand-store",
    name: "New Brand Storefront",
    description: "Short description of what the project explores or delivers.",
    category: "Clothing & Fashion", // Must match one of PORTFOLIO_CATEGORIES
    projectType: "Shopify Concept",
    image: "assets/images/new-brand.jpg", // Leave as "" to show the styled placeholder card
    liveUrl: "[https://your-new-project.vercel.app/](https://your-new-project.vercel.app/)", // Leave as "" if not yet live
    technologies: ["Shopify", "Product UX", "Responsive Design"],
    featured: false, // Set to true to also display in "Selected Work"
    status: "live"
  },
