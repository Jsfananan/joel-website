# How to Upload to GitHub and Publish Your Website

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the "+" icon in the top right → "New repository"
3. Name it (e.g., "joel-salinas-website" or "personal-website")
4. Choose **Public** (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license (we'll add files manually)
6. Click "Create repository"

## Step 2: Initialize Git and Push to GitHub

Open Terminal and navigate to your website folder, then run these commands:

```bash
# Navigate to your website folder
cd "/Users/joelsalinas/Dropbox (Personal)/Website Personal"

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Personal website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name.

## Step 3: Publish with GitHub Pages (Free)

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Choose branch: **main**
6. Choose folder: **/ (root)**
7. Click **Save**
8. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/REPO_NAME/`

Your site will automatically update whenever you push changes!

## Alternative: Quick Commands to Run

If you've already created the GitHub repo, here are the exact commands:

```bash
cd "/Users/joelsalinas/Dropbox (Personal)/Website Personal"
git init
git add .
git commit -m "Initial commit: Personal website"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Future Updates

To update your site after making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

## Other Publishing Options

### Option 2: Netlify (Recommended for custom domains)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your website folder
3. Get instant HTTPS URL

### Option 3: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployments

## Custom Domain Setup

After publishing, you can add a custom domain in GitHub Pages settings or Netlify settings.
