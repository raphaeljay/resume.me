# Jamaica Raphael Ajemina - Personal Resume Website

A modern, professional resume website showcasing IT Infrastructure and Network Engineering expertise.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Getting Started

### Prerequisites

Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### GitHub Pages (Automatic)

This project includes a GitHub Actions workflow for automatic deployment:

1. **Push to GitHub**:
   ```sh
   git remote add origin <YOUR_REPO_URL>
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions"
   - The workflow will automatically deploy on every push to `main`

3. **Access your site**: `https://<username>.github.io/<repository-name>/`

### Docker Deployment

```sh
# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

### Other Platforms
- **Netlify**: Connect your Git repository
- **Vercel**: Import from GitHub
- **Any static hosting**: Build with `npm run build` and deploy the `dist` folder
