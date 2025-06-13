/**
 * Nature-Inspired Themes for Card Matcher
 * Copy these into your theme.css file to quickly test different looks
 */

const ThemeSnippets = {
  
  // Original Eco Finance Theme
  ecoFinance: `
/* Eco Finance Theme */
:root {
  /* Brand Colors */
  --plaid-blue: #2d6a4f;      /* Deep green */
  --plaid-green: #74c69d;     /* Light green */
  --plaid-teal: #1b4332;      /* Dark forest green */
  --plaid-light-blue: #f1f8f2; /* Pale mint background */
  --plaid-gray: #e9f5ec;      /* Light green-gray */
  --plaid-white: #fff;
}

/* Font Settings */
body {
  font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d6a4f;
}

/* Button styling with rounded corners */
.btn-primary {
  background-color: #2e7d32;
  border: none;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(46,125,50,0.2);
  padding: 0.55rem 1.5rem;
}

.btn-primary:hover {
  background-color: #266d2c;
  box-shadow: 0 4px 8px rgba(46,125,50,0.3);
}

/* Card styling */
.card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.07);
}

/* Section styling */
.bg-light {
  background-color: #f5f8f5 !important;
  position: relative;
}

.bg-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #1b4332 !important;
  box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1);
}`,

  // Ocean Conservation Theme
  oceanConservation: `
/* Ocean Conservation Theme */
:root {
  /* Brand Colors */
  --plaid-blue: #006d77;      /* Deep teal */
  --plaid-green: #83c5be;     /* Sea foam */
  --plaid-teal: #00a6fb;      /* Bright blue */
  --plaid-light-blue: #edf6f9; /* Pale blue background */
  --plaid-gray: #e9f1f3;      /* Light blue-gray */
  --plaid-white: #fff;
}

/* Font Settings */
body {
  font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #006d77;
}

/* Button styling with rounded corners */
.btn-primary {
  background-color: #006d77;
  border: none;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(0,109,119,0.2);
  padding: 0.55rem 1.5rem;
}

.btn-primary:hover {
  background-color: #005c65;
  box-shadow: 0 4px 8px rgba(0,109,119,0.3);
}

/* Card styling */
.card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.07);
}

/* Section styling */
.bg-light {
  background-color: #edf6f9 !important;
  position: relative;
}

.bg-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #006d77, #83c5be, #00a6fb);
}

/* Navbar styling */
.navbar {
  background: linear-gradient(90deg, #006d77 0%, #00a6fb 100%) !important;
}`,

  // Solar Energy Theme
  solarEnergy: `
/* Solar Energy Theme */
:root {
  /* Brand Colors */
  --plaid-blue: #d68c45;      /* Amber */
  --plaid-green: #f2cc8f;     /* Light gold */
  --plaid-teal: #f8961e;      /* Orange */
  --plaid-light-blue: #fdf8ef; /* Cream background */
  --plaid-gray: #f2e9d8;      /* Light amber-gray */
  --plaid-white: #fff;
}

/* Font Settings */
body {
  font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #d68c45;
}

/* Button styling with rounded corners */
.btn-primary {
  background-color: #f8961e;
  border: none;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(248,150,30,0.2);
  padding: 0.55rem 1.5rem;
}

.btn-primary:hover {
  background-color: #e88817;
  box-shadow: 0 4px 8px rgba(248,150,30,0.3);
}

/* Card styling */
.card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 15px rgba(214,140,69,0.1);
}

/* Section styling */
.bg-light {
  background-color: #fdf8ef !important;
  position: relative;
}

.bg-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #f8961e, #f2cc8f, #d68c45);
}

/* Gradient backgrounds */
.bg-gradient-primary {
  background: linear-gradient(135deg, #f8961e 0%, #f2cc8f 100%) !important;
}`,

  // Forest Conservation Theme
  forestConservation: `
/* Forest Conservation Theme */
:root {
  /* Brand Colors */
  --plaid-blue: #344e41;      /* Deep forest green */
  --plaid-green: #588157;     /* Medium green */
  --plaid-teal: #3a5a40;      /* Pine green */
  --plaid-light-blue: #f0f4f0; /* Pale sage background */
  --plaid-gray: #e5e9e3;      /* Light sage gray */
  --plaid-white: #fff;
}

/* Font Settings */
body {
  font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Bitter', Georgia, serif;
  color: #344e41;
}

/* Button styling with natural look */
.btn-primary {
  background-color: #588157;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(88,129,87,0.2);
  padding: 0.55rem 1.5rem;
}

.btn-primary:hover {
  background-color: #4a6d4a;
  box-shadow: 0 4px 8px rgba(88,129,87,0.3);
}

/* Card styling */
.card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.07);
}

/* Section styling */
.bg-light {
  background-color: #f0f4f0 !important;
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23588157' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.bg-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #344e41, #588157, #a3b18a);
}`,

  // Clean Air Theme
  cleanAir: `
/* Clean Air Theme */
:root {
  /* Brand Colors */
  --plaid-blue: #4ea8de;      /* Sky blue */
  --plaid-green: #90e0ef;     /* Light blue */
  --plaid-teal: #48cae4;      /* Turquoise */
  --plaid-light-blue: #f8fdff; /* Ice background */
  --plaid-gray: #edf6f9;      /* Pale blue-gray */
  --plaid-white: #fff;
}

/* Font Settings */
body {
  font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  color: #4ea8de;
}

/* Button styling with cloud-like shape */
.btn-primary {
  background-color: #4ea8de;
  border: none;
  font-weight: 500;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(78,168,222,0.15);
  padding: 0.55rem 1.75rem;
}

.btn-primary:hover {
  background-color: #3d97cd;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(78,168,222,0.25);
}

/* Card styling with soft edges */
.card {
  border-radius: 20px;
  border: none;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}

/* Section styling */
.bg-light {
  background-color: #f8fdff !important;
  position: relative;
}

.navbar {
  background: linear-gradient(90deg, #4ea8de, #48cae4) !important;
}

/* Hero section */
.bg-gradient-primary {
  background: linear-gradient(135deg, #4ea8de 0%, #48cae4 50%, #90e0ef 100%) !important;
}`,

  // TrustFinance Theme
  trustFinance: `
/* TrustFinance Theme - Professional financial services theme with 
 * eco-friendly elements and a focus on trustworthiness - SOLID BACKGROUNDS */
:root {
  /* Brand Colors - Professional financial palette with forest undertones */
  --plaid-blue: #1b4332;      /* Deep forest blue-green (primary) */
  --plaid-green: #40916c;     /* Refined medium green (secondary) */
  --plaid-teal: #005f73;      /* Professional teal (accent) */
  --plaid-light-blue: #f8faf8; /* Clean off-white background */
  --plaid-gray: #eef2f1;      /* Light sage-gray */
  --plaid-white: #fff;
  
  /* Font Settings */
  --font-family-base: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-headings: 'Playfair Display', Georgia, serif;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}

/* Typography - Professional financial look with serif headings */
body {
  font-family: var(--font-family-base);
  color: #333;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-headings);
  color: #1b4332;
  line-height: 1.3;
}

h1 { font-weight: 600; letter-spacing: -0.01em; }
h2, h3 { font-weight: 600; letter-spacing: -0.005em; }

/* Button styling - Refined with subtle gradient */
.btn-primary {
  background: linear-gradient(to bottom, #1b4332, #163729);
  border: none;
  font-weight: var(--font-weight-medium);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0.6rem 1.5rem;
  font-family: var(--font-family-base);
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #1b4332 !important;
  box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #f8faf8;
  color: #1b4332;
  border: 1px solid #d0d9d4;
  font-weight: var(--font-weight-medium);
}

.btn-secondary:hover {
  background-color: #e8f0ec;
  color: #1b4332;
  border-color: #b5c2bc;
}

/* Card styling - Professional elevation */
.card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.card-header {
  background-color: #fafcfb;
  border-bottom: 1px solid #eef2f0;
  padding: 1rem 1.25rem;
}

.card-header h5 {
  margin-bottom: 0;
  font-size: 1.1rem;
  color: #1b4332;
}

/* Section styling - Subtle refinement - SOLID BACKGROUND */
.bg-light {
  background-color: var(--plaid-light-blue) !important;
  position: relative;
  /* Removed patterned background */
}

/* Subtle but sophisticated top border */
.bg-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #1b4332 !important;
  box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1);
}

/* UPDATED: Dark navbar styling with SOLID BACKGROUND */
.navbar {
  background-color: #1b4332 !important;
  box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1);
  padding: 0.75rem 1rem;
  border-bottom: none;
  position: relative;
}

/* Removed patterned navbar background */

.navbar-brand {
  font-family: var(--font-family-headings);
  color: #ffffff !important;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

/* Ensure navbar text is light on dark background */
.navbar-dark .navbar-nav .nav-link {
  color: rgba(255,255,255,0.85);
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
  z-index: 1;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: #ffffff;
}

.navbar-dark .navbar-nav .active > .nav-link {
  color: #ffffff;
  font-weight: 600;
}

/* Dropdown styling for dark navbar */
.navbar-dark .dropdown-menu {
  border: none;
  box-shadow: 0 3px 12px rgba(0,0,0,0.15);
  border-radius: 6px;
  margin-top: 8px;
}

.navbar-dark .dropdown-item:hover {
  background-color: #eef2f1;
  color: #1b4332;
}

.navbar-dark .dropdown-item.active {
  background-color: #1b4332;
}

/* Table styling for financial data */
.table {
  color: #333;
}

.table thead th {
  border-top: none;
  border-bottom: 2px solid #e9ecef;
  font-weight: 600;
  color: #1b4332;
  background-color: #fafcfb;
}

.table-hover tbody tr:hover {
  background-color: #f8faf8;
}

/* Form controls - Clean and precise */
.form-control {
  border-radius: 6px;
  border: 1px solid #d0d9d4;
  padding: 0.5rem 0.875rem;
}

.form-control:focus {
  border-color: #40916c;
  box-shadow: 0 0 0 0.2rem rgba(64, 145, 108, 0.2);
}

/* Footer refinements - SOLID BACKGROUND */
footer {
  background-color: #f8faf8;
  border-top: 1px solid #eef2f0;
  color: #495057;
  /* Removed patterned background */
}

/* Custom financial indicators */
.financial-metric {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.financial-metric-label {
  font-size: 0.875rem;
  color: #6c757d;
  width: 140px;
}

.financial-metric-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1b4332;
}

/* Trust indicators */
.trust-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f8faf8;
  border: 1px solid #e9ecef;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
}

.trust-badge i {
  color: #40916c;
  margin-right: 0.5rem;
}

.trust-badge span {
  font-size: 0.875rem;
  font-weight: 500;
  color: #495057;
}

/* SOLID background for hero sections */
.bg-primary {
  background-color: #1b4332 !important;
  box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}


/* Ensure content in hero sections is properly positioned */
.bg-primary * {
  position: relative;
  z-index: 1;
}
`};

// Log available themes
console.log("Available eco-friendly themes:", Object.keys(ThemeSnippets));