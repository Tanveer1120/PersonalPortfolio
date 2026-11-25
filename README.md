# Personal Portfolio Website

A modern, production-ready full-stack application designed for students and freshers to create, customize, download, and publish professional portfolios and ATS-friendly resumes in minutes without writing code.

---

## Key Features & Outputs

The application produces three core recruiter-ready outputs:

1. **Professional Portfolio PDF**:
   - A4 portrait format with print-grade typography and balanced whitespace.
   - Faithful representation of the selected template's visual design.
   - Intelligent multi-page flow preventing cropped or overlapping content.
2. **ATS-Friendly Resume PDF**:
   - Single-column, pure vector text-based PDF with 100% keyword fidelity.
   - Fully searchable and selectable by Applicant Tracking Systems (ATS).
   - Standard section hierarchy: Contact Info, Professional Summary, Technical Skills, Education, Projects, Experience, Certifications, Languages.
   - Strictly free of multiple columns, graphics, or unsupported parsing tables.
3. **Public Online Portfolio**:
   - Instant 1-click cloud publishing with persistent database storage.
   - Permanent unique public URLs (e.g. `https://yourdomain.com/portfolio/alex-johnson-a82k91`).
   - Accessible by anyone on desktop or mobile without requiring an account.
   - One-click sharing for WhatsApp and LinkedIn.
   - Update, unpublish, and delete management with secure owner tokens.

---

## Three Distinct Portfolio Templates

1. **Modern Professional**: Premium professional appearance, refined navy typography, elegant hero section, and clean blue/navy accents.
2. **Minimalist**: Clean white backdrop, simple typography, generous whitespace, minimal decoration, and clear section hierarchy.
3. **Modern Developer**: Developer-focused design, command-style navigation, prominent skills, terminal accents, and highlighted GitHub links.

---

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, HTML5, CSS3
- **PDF Engine**: jsPDF (Pure text vector PDF for ATS resumes + high-resolution canvas engine for styled portfolio documents)
- **Backend**: Node.js & Express.js REST API
- **Database**: Supabase PostgreSQL (with persistent local storage fallback when keys are pending)
- **Deployment**: Vercel & Node server ready

---

## Design System & Color Palette

- **Primary Navy**: `#14213D`
- **Secondary Navy**: `#1F3557`
- **Background**: `#F5F7FA`
- **White**: `#FFFFFF`
- **Accent Blue**: `#3B82F6`
- **Main Text**: `#1E293B`
- **Secondary Text**: `#64748B`
- **Borders**: `#E2E8F0`
- **Typography**: Inter / Roboto

---

## Project Architecture

```
Personal Portfolio Website/
├── api/
│   └── index.js                      # Vercel serverless entry point
├── public/
│   └── logo.svg                      # Vector application branding logo
├── server/
│   ├── app.js                        # Express REST application & route handlers
│   ├── index.js                      # Node server entry point
│   ├── supabaseClient.js             # Supabase PostgreSQL client & persistent fallback
│   ├── schema.sql                    # Supabase PostgreSQL table & RLS policies
│   └── test-server.js                # Automated backend test suite
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                # Responsive header navigation
│   │   ├── Footer.jsx                # Global branding & links footer
│   │   └── Icons.jsx                 # Vector icons (LinkedIn, GitHub, etc.)
│   ├── forms/
│   │   ├── StepIndicator.jsx         # 4-step interactive progress navigation
│   │   ├── StepPersonalInfo.jsx      # Step 1: Personal info & photo upload
│   │   ├── StepEducation.jsx         # Step 2: Degrees, institutions, grades
│   │   ├── StepSkillsProjects.jsx    # Step 3: Tech skills, languages, projects
│   │   └── StepExperience.jsx        # Step 4: Work/internships, certifications, template picker
│   ├── pages/
│   │   ├── HomePage.jsx              # Landing page with hero & feature showcase
│   │   ├── CreatePortfolioPage.jsx   # 4-step creation wizard container
│   │   ├── PreviewPortfolioPage.jsx  # Live preview, template switcher & sharing dashboard
│   │   └── PublicPortfolioPage.jsx   # Public shareable portfolio view (/portfolio/:slug)
│   ├── pdf/
│   │   ├── generateAtsPdf.js         # Pure text ATS single-column PDF generator
│   │   └── generatePortfolioPdf.js   # High-resolution multi-page portfolio PDF generator
│   ├── services/
│   │   ├── api.js                    # Frontend REST API client
│   │   └── storage.js                # LocalStorage auto-persistence engine
│   ├── templates/
│   │   ├── ModernProfessionalTemplate.jsx
│   │   ├── MinimalistTemplate.jsx
│   │   ├── ModernDeveloperTemplate.jsx
│   │   └── TemplateRenderer.jsx      # Dynamic template switcher
│   ├── types/
│   │   └── portfolio.js              # Data schema, categories, and constants
│   ├── App.jsx                       # Main router configuration
│   ├── index.css                     # Tailwind directives & print media styles
│   └── main.jsx                      # React DOM root entry
├── .env.example                      # Supabase configuration template
├── package.json                      # Scripts and dependencies
├── tailwind.config.js                # Theme tokens & brand colors
├── vercel.json                       # Vercel production deployment routing
└── vite.config.js                    # Vite build & proxy settings
```

---

## Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Setting Up Supabase PostgreSQL (Optional but Recommended)
1. Create a free database project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard and run the SQL script found in `server/schema.sql`.
3. Copy your project URL and Anon Key from **Project Settings -> API**.
4. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```
*(Note: If no Supabase credentials are provided, the application automatically uses its persistent local database engine so publishing, updating, and public URLs remain fully operational immediately).*

### 4. Running the Development Server
Run the backend and frontend:
```bash
# Terminal 1: Run Backend API
npm run server

# Terminal 2: Run Frontend with Hot Module Replacement
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Production Build
```bash
npm run build
npm start
```

### 6. Running Automated Tests
```bash
npm test
```

---

## Quality Assurance Checklist

- [x] Homepage navigation & branding
- [x] Streamlined 4-step creation form
- [x] Back and continue navigation with validation
- [x] Multiple education entries with Add/Edit/Remove
- [x] Multiple project entries with Add/Edit/Remove
- [x] Multiple experience and certification entries
- [x] Categorized technical skill suggestions & custom tags
- [x] Spoken language selection & custom entries
- [x] Profile photo upload with format & size validation
- [x] Automatic form data persistence across page reloads
- [x] Five distinct, non-cramped portfolio templates
- [x] Instant live template switching without data loss
- [x] Dedicated A4 Professional Portfolio PDF export
- [x] Pure text-based, single-column ATS Resume PDF export
- [x] Public cloud portfolio publishing with unique slugs
- [x] Direct public portfolio route (`/portfolio/:slug`)
- [x] WhatsApp & LinkedIn one-click sharing
- [x] Portfolio updating, unpublishing, and deletion
- [x] Responsive layout for mobile, tablet, and desktop
- [x] Zero critical browser errors and clean production build

---

## License

MIT License. Built for students, freshers, and professionals worldwide.
