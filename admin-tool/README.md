# Landscape Photography Admin Tool

This is a standalone admin tool for the Landscape Photography website. It allows you to:

1. Upload photos to Cloudinary
2. Add new photos to your website's data
3. Trigger GitHub Actions to rebuild your site

## How to Use

### Setup (First Time Only)

1. Create a Cloudinary account and set up an upload preset:
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Create an "unsigned" upload preset called `landscape_photos`
   - Set the folder to `landscape-photos`

2. Create a GitHub Personal Access Token (PAT):
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Create a new token with `repo` scope
   - Save this token securely (you'll need it for the admin tool)

### Using the Admin Tool

1. Open `index.html` in your browser
2. Enter your Cloudinary cloud name, upload preset, and GitHub token when prompted
   - These will be saved in your browser's local storage for convenience
3. Click "Upload Photo" to select an image from your computer
4. Fill in the photo details (title, category, location, etc.)
5. Click "Save Photo" to:
   - Upload the image to Cloudinary (if not already done)
   - Update the site's data file on GitHub
   - Trigger a rebuild of your site via GitHub Actions

### Important Notes

- This tool works entirely in your browser - no server required
- Your credentials are stored in your browser's local storage
- Each photo upload:
  1. Uploads the image to Cloudinary
  2. Adds the image URL and metadata to your site's data file

## How It Works

The admin tool:
1. Uses Cloudinary's Upload Widget to directly upload photos to your Cloudinary account
2. Uses GitHub's API to update your site's data file with the new photo information
3. Commits the changes to GitHub, which triggers a rebuild of your static site

## Troubleshooting

- If uploads fail, check your Cloudinary cloud name and upload preset
- If saving to GitHub fails, check your personal access token
- For security reasons, the tool will prompt you for credentials if they're not saved

## Security Considerations

- Your GitHub token has write access to your repository
- Do not share your admin tool's URL with others
- Consider revoking your GitHub token when you're done with admin tasks 