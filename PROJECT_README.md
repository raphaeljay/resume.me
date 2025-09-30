# Jamaica Raphael Ajemina - Personal Resume Website

A modern, professional resume website built with React, TypeScript, and Tailwind CSS.

## 🎨 Features

- **Responsive Design**: Looks great on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Smooth Animations**: Professional scroll animations and transitions
- **SEO Optimized**: Meta tags for social sharing and search engines
- **Fast Performance**: Built with Vite for optimal loading speeds
- **Accessible Navigation**: Smooth scroll with active section highlighting

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Sticky navigation with smooth scroll
│   ├── ThemeToggle.tsx         # Dark/light mode switcher
│   ├── HeroSection.tsx         # Profile image & intro
│   ├── AboutSection.tsx        # About me summary
│   ├── SkillsSection.tsx       # Categorized technical skills
│   ├── ExperienceSection.tsx   # Work experience timeline
│   ├── ProjectsSection.tsx     # Project showcase cards
│   ├── CertificationsSection.tsx # Certifications & education
│   ├── SoftSkillsSection.tsx   # Soft skills grid
│   ├── ContactSection.tsx      # Contact information
│   └── Footer.tsx              # Footer with copyright
├── pages/
│   └── Index.tsx               # Main page assembly
├── assets/
│   └── profile.jpg             # Profile picture
└── index.css                   # Design system & custom styles

public/
└── resume.pdf                  # Downloadable resume file
```

## 🎯 How to Customize

### 1. Update Profile Image
Replace `src/assets/profile.jpg` with your own professional headshot.

### 2. Update Resume PDF
Replace `public/resume.pdf` with your actual resume file.

### 3. Edit Content
All content is in the component files. Key areas to update:

**Personal Info** (`HeroSection.tsx`):
- Name, title, tagline
- Phone, email, location
- LinkedIn URL

**About Me** (`AboutSection.tsx`):
- Professional summary
- Highlighted expertise areas

**Skills** (`SkillsSection.tsx`):
- Add/remove skill categories
- Update individual skills in each category

**Experience** (`ExperienceSection.tsx`):
- Job titles and companies
- Achievements and responsibilities
- Employment dates

**Projects** (`ProjectsSection.tsx`):
- Project names and descriptions
- Technologies used

**Certifications** (`CertificationsSection.tsx`):
- Current certifications
- Education background

**Contact** (`ContactSection.tsx`):
- Contact methods
- Social media links

### 4. Customize Colors & Design

The design system is defined in `src/index.css`:

```css
:root {
  --primary: 197 71% 52%;        /* Main accent color (cyan) */
  --background: 0 0% 100%;       /* Background color */
  --foreground: 222 47% 11%;     /* Text color */
  /* ... more color tokens */
}
```

Change HSL values to match your personal brand colors.

### 5. Modify Animations

Animation speeds and styles are in `tailwind.config.ts`:

```typescript
animation: {
  "fade-in": "fade-in 0.6s ease-out",
  // Adjust duration (0.6s) or timing (ease-out)
}
```

## 🚀 Development

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

The site will be available at `http://localhost:3000`

### Manual Docker Commands

```bash
# Build the Docker image
docker build -t jamaica-portfolio .

# Run the container
docker run -d -p 3000:80 --name jamaica-portfolio jamaica-portfolio

# Stop and remove container
docker stop jamaica-portfolio
docker rm jamaica-portfolio
```

## 📦 Deployment

### Docker Deployment
The project includes Docker configuration for containerized deployment:
- `Dockerfile` - Multi-stage build with nginx
- `docker-compose.yml` - Easy orchestration
- `nginx.conf` - Optimized static file serving

### Other Deployment Options
- **Netlify**: Connect your Git repository
- **Vercel**: Import from GitHub
- **GitHub Pages**: Enable in repository settings and build with `npm run build`

## 🔧 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📝 Content Update Checklist

- [ ] Replace profile image
- [ ] Upload actual resume PDF
- [ ] Update name and contact info
- [ ] Customize about me section
- [ ] Add/remove technical skills
- [ ] Update work experience
- [ ] Add your projects
- [ ] Update certifications
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Check dark mode appearance

## 🎨 Design System

The site uses semantic color tokens for easy theming:
- `primary`: Main accent color (cyan/blue)
- `background`: Page background
- `foreground`: Main text color
- `card`: Card backgrounds
- `muted`: Subtle backgrounds
- `accent`: Secondary highlights

All components use these tokens, so changing them in `index.css` updates the entire site.

## 📧 Support

For questions or issues, contact:
- Email: ajemina212@gmail.com
- LinkedIn: [linkedin.com/in/raphael-jamaica](https://linkedin.com/in/raphael-jamaica)

---

**Made with ❤️ by Jamaica Raphael Ajemina**
