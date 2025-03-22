# Landscape Photographer Portfolio

A beautiful portfolio website for landscape photographers, built with Next.js, Cloudinary for image management, and deployable to GitHub Pages.

## Features

- Responsive image gallery
- Admin dashboard for photo management
- Blog section
- Contact form
- SEO optimized
- High performance
- Static site export for GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- GitHub account
- Cloudinary account (free tier is sufficient)

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/landscape-photographer.git
cd landscape-photographer
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Configure Cloudinary
   - Sign up for a [Cloudinary account](https://cloudinary.com)
   - Create an upload preset in your Cloudinary dashboard:
     - Go to Settings > Upload
     - Scroll down to "Upload presets" and click "Add upload preset"
     - Set "Upload preset name" (remember this name)
     - Set "Signing Mode" to "Signed"
     - Save the preset

4. Create a `.env.local` file with your Cloudinary credentials
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your-upload-preset
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. Run the development server
```bash
npm run dev
# or
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see your application

## Deployment to GitHub Pages

### One-time setup

1. Create a new repository on GitHub

2. Push your code to GitHub
```bash
git remote add origin https://github.com/yourusername/landscape-photographer.git
git push -u origin main
```

3. Set up GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Set "Source" to "GitHub Actions"

4. Add your Cloudinary secrets to GitHub:
   - Go to Settings > Secrets and variables > Actions
   - Add the following repository secrets:
     - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
     - `NEXT_PUBLIC_CLOUDINARY_PRESET_NAME`: Your Cloudinary upload preset name

### Automated Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site to GitHub Pages whenever you push to the main branch.

After pushing your code, the action will:
1. Build your Next.js application as a static site
2. Deploy it to GitHub Pages
3. You can monitor the deployment in the "Actions" tab of your repository

## File Structure

- `/src/app`: Next.js application routes and pages
- `/src/components`: React components
- `/src/lib`: Utility functions and data
- `/public`: Static assets

## Customization

- Update your photographer information in `/src/lib/data.ts`
- Modify the site theme in `/src/app/globals.css`
- Add or edit pages in the `/src/app` directory

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Cloudinary](https://cloudinary.com/)
- [GitHub Pages](https://pages.github.com/)
