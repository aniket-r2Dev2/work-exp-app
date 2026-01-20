# 🧰 Work Experience Tracker & Resume Builder

A beautiful and intuitive React application for tracking your professional work experience and generating professional resumes. Built with modern design principles, smooth animations, and a focus on user experience.

## ✨ Features

### 📊 **Experience Management**
- **Smart Experience Tracking**
  - Real-time duration calculations (years, months, days)
  - Company autocomplete with Clearbit API integration
  - Job title autocomplete (300+ local titles + API suggestions)
  - Location autocomplete (300+ major cities worldwide)
  - Skills & technologies tracking per role
  - Achievement management with bullet points
  - Support for current positions

### 📄 **Professional Resume Builder** ⭐ NEW
- **Multiple Templates**
  - **Classic** - Traditional serif design with timeline
  - **Modern** - Contemporary with color accents and gradients
  - **Minimal** - Clean, simple, and ATS-friendly
- **PDF Export** - High-quality PDF generation with custom filename
- **Print Support** - Optimized print layouts
- **Template Switching** - Live preview with instant template changes
- **Auto Sections** - Skills, Experience, Education, Certifications

### 🎨 **Modern & Beautiful UI**
- Clean, minimal design with gradient backgrounds
- Smooth animations and transitions
- Responsive layout that works on all devices
- Dark mode support
- Eye-friendly color scheme with professional aesthetics

### 🔧 **Data Management**
- Export/Import data as JSON
- LocalStorage persistence
- Clear all data option
- Merge or replace on import

## 📸 Screenshots

### Resume Templates

**Classic Template**
- Traditional professional design
- Serif typography (Georgia)
- Timeline-based experience layout
- Black and white for maximum compatibility

**Modern Template**
- Contemporary blue gradient header
- Color-coded sections
- Card-style education blocks
- Eye-catching skill pills

**Minimal Template**
- Ultra-clean design
- Maximum whitespace
- Light typography
- Simple borders and lines
- Perfect for ATS systems

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniket-r2Dev2/work-exp-app.git
   cd work-exp-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API keys (Optional but recommended)**
   ```bash
   # Create environment file
   echo "REACT_APP_JSEARCH_API_KEY=your_api_key_here" > .env.local
   ```
   - Get your JSearch API key from [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
   - Replace `your_api_key_here` with your actual API key
   - **Note:** The app works without the API key using local job titles only

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000) to view the application

### Build for Production

```bash
npm run build
```
This creates an optimized production build in the `build` folder.

## 🎯 How to Use

### **Track Your Experience**

1. **Add Your First Experience**
   - Click "Add New Experience" button
   - Fill in company details (autocomplete will suggest logos)
   - Add position with smart autocomplete
   - Add location with city autocomplete
   - Select employment type (Full-time, Part-time, etc.)
   - Add skills/technologies used
   - Include job description and key achievements

2. **Manage Your Timeline**
   - View your total experience (years, months, days)
   - Edit or remove existing experiences
   - Mark current positions
   - Track companies worked at

### **Build Your Resume** ⭐

1. **Add Profile Information**
   - Click "Experiences" in navigation
   - Navigate to "Resume" tab
   - Click "Add Profile Info"
   - Fill in your contact details and professional summary

2. **Choose a Template**
   - Select from Classic, Modern, or Minimal templates
   - See live preview of your resume
   - Switch templates anytime

3. **Export Your Resume**
   - **Download PDF** - High-quality PDF with custom filename
   - **Print** - Optimized for professional printing
   - Files named as: `Resume_YourName_2026-01-20.pdf`

4. **What's Included**
   - Professional summary
   - Technical skills (aggregated from all roles)
   - Work experience with achievements
   - Skills used in each role
   - Education (coming soon)
   - Certifications (coming soon)

## 📁 Project Structure

```
work-exp-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ExperienceCard.js       # Experience display with skills
│   │   │   └── SummaryCard.js          # Total experience summary
│   │   ├── common/
│   │   │   ├── Button.js               # Reusable button component
│   │   │   └── Input.js                # Enhanced input with icons
│   │   ├── forms/
│   │   │   ├── ExperienceForm.js       # Experience form with skills
│   │   │   └── ProfileForm.js          # Profile information form
│   │   ├── layout/
│   │   │   ├── EmptyState.js
│   │   │   └── Header.js               # App header with navigation
│   │   └── resume/
│   │       ├── ResumePreview.js        # Original resume component
│   │       └── templates/              # ⭐ NEW Resume templates
│   │           ├── ClassicTemplate.js  # Traditional design
│   │           ├── ModernTemplate.js   # Contemporary design
│   │           └── MinimalTemplate.js  # Clean & simple design
│   ├── config/
│   │   ├── jobTitles.json              # 300+ job positions
│   │   └── cities.json                 # 300+ major cities
│   ├── hooks/
│   │   ├── useExperience.js            # Experience state management
│   │   ├── useProfile.js               # Profile state management
│   │   └── useTheme.js                 # Dark mode management
│   ├── pages/
│   │   ├── Dashboard.js                # Main experiences page
│   │   └── Resume.js                   # ⭐ Resume builder page
│   ├── utils/
│   │   └── dateUtils.js                # Date calculations
│   ├── App.js                          # Main app with routing
│   ├── index.css                       # ⭐ Global styles + print styles
│   └── index.js                        # Entry point
├── package.json                        # ⭐ Updated with PDF dependencies
└── README.md
```

## 🔧 Technology Stack

### Core
- **React 19.1.0** - Latest React with modern hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Resume Builder ⭐
- **react-to-print** - Print functionality
- **html2canvas** - HTML to canvas conversion
- **jsPDF** - PDF generation

### APIs & Data
- **Clearbit API** - Company logos and data
- **JSearch API** - Job title autocomplete (optional)
- **GeoDB Cities API** - Location autocomplete (optional)

### Storage
- **LocalStorage** - Client-side data persistence

## 🎨 Resume Template Details

### Classic Template
- **Style:** Traditional, professional
- **Font:** Georgia (serif)
- **Colors:** Black, white, gray
- **Best for:** Corporate, finance, legal, traditional industries
- **Features:** Timeline, clear sections, conservative design

### Modern Template  
- **Style:** Contemporary, eye-catching
- **Font:** System UI (sans-serif)
- **Colors:** Blue gradients, color accents
- **Best for:** Tech, startups, creative roles
- **Features:** Colored header, skill badges, modern spacing

### Minimal Template
- **Style:** Clean, simple, scannable
- **Font:** Helvetica Neue (sans-serif)
- **Colors:** Grayscale only
- **Best for:** ATS systems, tech roles, minimalists
- **Features:** Maximum whitespace, light typography, text-based

## 📊 Data Flow

### Experience Data
```javascript
{
  id: "timestamp",
  company: "Company Name",
  companyDomain: "company.com",
  companyLogo: "https://logo.clearbit.com/company.com",
  position: "Software Engineer",
  location: "San Francisco, CA",
  category: "Full-time",
  startDate: "2021-06-01",
  endDate: "2024-01-15",
  current: false,
  description: "Job description...",
  skills: ["React", "Node.js", "AWS"],
  achievements: [
    "Led team of 5 developers",
    "Increased performance by 40%"
  ]
}
```

### Profile Data
```javascript
{
  fullName: "John Doe",
  headline: "Senior Software Engineer",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  website: "johndoe.com",
  summary: "Experienced software engineer..."
}
```

## 🎯 Roadmap

### Phase 1: Foundation ✅ (Complete)
- [x] Experience tracking
- [x] Skills management
- [x] Data persistence
- [x] Import/Export

### Phase 2: Resume Builder ✅ (Complete)
- [x] Multiple templates (3)
- [x] PDF export
- [x] Print support
- [x] Template selector

### Phase 3: Coming Soon 🚧
- [ ] Education section
- [ ] Certifications section
- [ ] Custom template colors
- [ ] More template options (Technical, Executive)
- [ ] Resume scoring

### Phase 4: AI Features 🎯
- [ ] Job description analyzer
- [ ] Resume vs JD matching
- [ ] AI resume suggestions
- [ ] Keyword optimization
- [ ] ATS compatibility checker

## 🔒 Privacy & Data

- **Local Storage:** All data stored in browser localStorage
- **No Server:** No data sent to external servers (except API calls)
- **API Usage:**
  - Clearbit: Company logos (no personal data)
  - JSearch: Job titles (query only, optional)
  - GeoDB: Cities (query only, optional)
- **Export/Import:** Full control over your data

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Test Coverage

```bash
npm test -- --coverage
```

Tests are located in `src/__tests__/` directory.

## 🚀 Deployment

### GitHub Pages

```bash
npm run deploy
```

Your app will be live at: `https://aniket-r2dev2.github.io/work-exp-app/`

### CI/CD

GitHub Actions automatically:
1. Runs tests on every push
2. Builds the project
3. Deploys to GitHub Pages

Workflow: `.github/workflows/deploy.yml`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Acknowledgments

- Clearbit for company data and logos
- JSearch API for job titles
- GeoDB Cities for location data
- Lucide for beautiful icons
- Tailwind CSS for styling framework
- React team for the amazing framework
- Open source community

## 📧 Contact

- **Developer:** Aniket Anil Kumar
- **GitHub:** [@aniket-r2Dev2](https://github.com/aniket-r2Dev2)
- **Project:** [work-exp-app](https://github.com/aniket-r2Dev2/work-exp-app)
- **Live Demo:** [https://aniket-r2dev2.github.io/work-exp-app/](https://aniket-r2dev2.github.io/work-exp-app/)

---

**Built with ❤️ using React and modern web technologies**

⭐ Star this repo if you find it helpful!