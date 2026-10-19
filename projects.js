/**
 * CENTRALIZED PORTFOLIO DATA — ABDULBASIT ABUBAKAR | EXPERTHUB AGENCY
 *
 * How to add a new project later:
 * 1. Copy one of the project objects in PORTFOLIO_PROJECTS below.
 * 2. Paste it at the top or bottom of the array.
 * 3. Fill in id, name, description, category, projectType, image, liveUrl, technologies, featured, and status.
 * 4. Save and commit to GitHub. Both Selected Work and Complete Portfolio update automatically.
 */

const PORTFOLIO_CATEGORIES = [
  "All Projects",
  "Hospitality & Real Estate",
  "Home Decor",
  "Food & Restaurant",
  "Clothing & Fashion",
  "Footwear",
  "3D & Interactive Experiences",
  "Product Page Designs",
  "Other Projects"
];

const PORTFOLIO_PROJECTS = [
  {
    id: "veloura-product-storytelling",
    name: "Veloura | Interactive Product Storytelling",
    description: "An interactive product page design focused on structured product storytelling, clear value communication, and a refined purchasing layout.",
    category: "Product Page Designs",
    projectType: "Interactive Ecommerce Experience",
    image: "", // Add screenshot path later, e.g., "assets/images/veloura-pro.jpg"
    liveUrl: "https://veloura-pro.vercel.app/",
    technologies: ["Product Page UX", "Interactive Storytelling", "Conversion Design"],
    featured: true,
    status: "live"
  },
  {
    id: "veloura-3d",
    name: "Veloura 3D",
    description: "An interactive 3D web experience exploring spatial product presentation, motion-led storytelling, and modern frontend interaction.",
    category: "3D & Interactive Experiences",
    projectType: "3D Web Concept",
    image: "",
    liveUrl: "https://veloura3d-concept.vercel.app/",
    technologies: ["3D Interaction", "Interactive Web", "Creative Frontend"],
    featured: true,
    status: "live"
  },
  {
    id: "afterglow",
    name: "Afterglow",
    description: "A contemporary clothing and fashion brand concept designed with editorial visual hierarchy, lookbook presentation, and smooth browsing.",
    category: "Clothing & Fashion",
    projectType: "Brand Concept Storefront",
    image: "",
    liveUrl: "https://afterglow-concept-brand.vercel.app/",
    technologies: ["Fashion Ecommerce", "Brand Direction", "Responsive UI"],
    featured: true,
    status: "live"
  },
  {
    id: "veloura-brand",
    name: "Veloura",
    description: "A complete clothing brand website concept featuring collection showcases, modern fashion typography, and an elevated shopping flow.",
    category: "Clothing & Fashion",
    projectType: "Full Storefront Concept",
    image: "",
    liveUrl: "https://veloura-concept.vercel.app/",
    technologies: ["Apparel Storefront", "Ecommerce UX", "Visual Design"],
    featured: true,
    status: "live"
  },
  {
    id: "real-estate-concept",
    name: "Real Estate Concept",
    description: "A property and real estate web concept crafted to showcase architectural listings with clean filtering and clear inquiry paths.",
    category: "Hospitality & Real Estate",
    projectType: "Concept Website",
    image: "",
    liveUrl: "https://realestate-concept-iota.vercel.app/",
    technologies: ["Real Estate UI", "Property Showcase", "Responsive Layout"],
    featured: false,
    status: "live"
  },
  {
    id: "aura-house",
    name: "Aura House",
    description: "An architectural living and hospitality concept emphasizing calm visual pacing, spatial photography layout, and refined details.",
    category: "Hospitality & Real Estate",
    projectType: "Concept Website",
    image: "",
    liveUrl: "https://aurahouse-concept.vercel.app/",
    technologies: ["Hospitality Design", "Editorial Layout", "Frontend"],
    featured: false,
    status: "live"
  },
  {
    id: "novastay",
    name: "NovaStay",
    description: "A modern hotel and accommodation booking concept built around clear room presentation and a streamlined guest discovery experience.",
    category: "Hospitality & Real Estate",
    projectType: "Hospitality Concept",
    image: "",
    liveUrl: "https://novastay-concept.vercel.app/",
    technologies: ["Accommodation UX", "Booking Flow", "Responsive Web"],
    featured: false,
    status: "live"
  },
  {
    id: "formrun",
    name: "Formrun",
    description: "A performance footwear concept storefront designed with bold product framing, athletic energy, and mobile-ready browsing.",
    category: "Footwear",
    projectType: "Footwear Concept",
    image: "",
    liveUrl: "https://formrun-gamma.vercel.app/",
    technologies: ["Footwear Ecommerce", "Product Presentation", "UI Design"],
    featured: false,
    status: "live"
  },
  {
    id: "forme-home-decor",
    name: "Forme Home Decor",
    description: "An interior and home decor brand concept focused on warm minimalism, curated object presentation, and tactile visual balance.",
    category: "Home Decor",
    projectType: "Brand Concept",
    image: "",
    liveUrl: "https://forme-homedecor-concept-brand.vercel.app/",
    technologies: ["Home Decor", "Storefront Design", "Brand Experience"],
    featured: false,
    status: "live"
  },
  {
    id: "safron-fire",
    name: "Safron Fire",
    description: "A culinary and restaurant web concept crafted to highlight menu storytelling, atmosphere, and an inviting dining presentation.",
    category: "Food & Restaurant",
    projectType: "Restaurant Concept",
    image: "",
    liveUrl: "https://safron-fire-concept-brand.vercel.app/",
    technologies: ["Restaurant Web", "Hospitality UX", "Visual Storytelling"],
    featured: false,
    status: "live"
  },
  {
    id: "beauty-spa",
    name: "Beauty Spa",
    description: "A wellness and beauty spa web experience structured to communicate serenity, treatment offerings, and effortless appointment inquiry.",
    category: "Other Projects",
    projectType: "Concept Website",
    image: "",
    liveUrl: "https://beauty-spa-green.vercel.app/",
    technologies: ["Service Website", "UI/UX Design", "Responsive Layout"],
    featured: false,
    status: "live"
  },
  {
    id: "norve",
    name: "Norve",
    description: "A digital brand concept exploring clean layout composition, restrained typography, and modern frontend structure.",
    category: "Other Projects",
    projectType: "Concept Project",
    image: "",
    liveUrl: "http://norve-brand.vercel.app",
    technologies: ["Web Design", "Brand Concept", "Frontend"],
    featured: false,
    status: "live"
  },
  {
    id: "footwear-concept",
    name: "Footwear Concept",
    description: "A dedicated concept project exploring product presentation, modern layout structure, and interactive web execution.",
    category: "Other Projects",
    projectType: "Concept Project",
    image: "",
    liveUrl: "https://footwear-concept.vercel.app/",
    technologies: ["Concept Design", "Ecommerce UI", "Responsive Web"],
    featured: false,
    status: "live"
  }
];
