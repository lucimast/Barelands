# Barelands - Landscape Photography Website

A professional landscape photography website built with Next.js, Tailwind CSS, and TypeScript. This site includes a secure admin panel for managing photos and content.

## Features

- Responsive design optimized for all devices
- Beautiful photography showcase with masonry grid layout
- Secure admin panel with NextAuth.js authentication
- Analytics integration with Vercel Analytics
- Easy deployment to Netlify

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js v16+
- Git

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/barelands.git
cd barelands
```

2. Install dependencies:

```bash
bun install
# or npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory using `.env.local` as a template.

```bash
cp .env.local.example .env.local
```

Update the `.env.local` file with your credentials. Make sure to:
- Generate a secure `NEXTAUTH_SECRET` (you can use `openssl rand -base64 32`)
- Update `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` values
- Set `NEXTAUTH_URL` to your domain in production

4. Run the development server:

```bash
bun dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Adding Your Photos

1. Replace the sample photos in the `/public` directory with your own images.
2. Update the photo data in `src/lib/data.ts` with your photo details.
3. Add additional categories as needed.

## Customizing Content

Edit the following files to customize the website content:

- `src/lib/data.ts` - Main data file containing photo and about information
- `src/components/HeroSection.tsx` - Hero section content
- `src/components/AboutSection.tsx` - About section content
- `src/components/Footer.tsx` - Footer content and links

## Deployment to Netlify

This project is configured for easy deployment to Netlify. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure build settings:
   - Build command: `bun run build` or `npm run build`
   - Publish directory: `.next`
4. Add environment variables in the Netlify dashboard matching your `.env.local` file
5. Deploy the site

### Domain Configuration

To set up your custom domain (barelands.vip):

1. In the Netlify dashboard, go to Site settings > Domain management
2. Click "Add custom domain" and enter your domain
3. Follow the DNS configuration instructions provided by Netlify
4. Update your `NEXTAUTH_URL` environment variable to match your production URL

## Security Considerations

- Change the default admin password immediately after deployment
- Generate a unique, secure `NEXTAUTH_SECRET` for production
- Consider enabling Two-Factor Authentication for your Netlify account
- Regularly backup your photo data

## Admin Features

The admin panel is accessible at `/admin` and includes:

- Dashboard with key statistics and recent activity
- Photo management (upload, edit, delete)
- Analytics data visualization

Default admin credentials:
- Email: admin@barelands.vip
- Password: changeme123 (change this immediately)

## License

This project is proprietary and not for redistribution.

## Support

For support, please contact your developer.
