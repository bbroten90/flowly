# Flowly Website

This repository contains the website files for Flowly, a platform that provides instant cash flow solutions for blue-collar businesses.

## Hosting on GitHub Pages with Custom Domain

Follow these steps to host the Flowly website on GitHub Pages with your custom domain (getflowly.ca):

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "flowly-website")
4. Make it public
5. Click "Create repository"

### 2. Push the Website Files to GitHub

```bash
# Clone the repository to your local machine
git clone https://github.com/yourusername/flowly-website.git

# Navigate to the repository folder
cd flowly-website

# Copy all website files to this folder
# (You can do this manually or with a command)

# Add all files to git
git add .

# Commit the changes
git commit -m "Initial website files"

# Push to GitHub
git push origin main
```

### 3. Set Up GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the branch you want to deploy (usually "main")
5. Click "Save"

### 4. Configure Custom Domain

1. In the GitHub Pages section of your repository settings, enter "getflowly.ca" in the "Custom domain" field
2. Click "Save"
3. Check the "Enforce HTTPS" option (recommended for security)

### 5. Update DNS Settings

You'll need to update your domain's DNS settings to point to GitHub Pages:

#### Option 1: Using an A Record

Add these A records to point to GitHub Pages' IP addresses:
- A record: @ → 185.199.108.153
- A record: @ → 185.199.109.153
- A record: @ → 185.199.110.153
- A record: @ → 185.199.111.153

#### Option 2: Using a CNAME Record

If you prefer using a CNAME record (and your DNS provider allows it for apex domains):
- CNAME record: @ → yourusername.github.io

### 6. Wait for DNS Propagation

DNS changes can take up to 48 hours to propagate, though they often take effect much sooner. Once propagation is complete, your website will be accessible at getflowly.ca.

### 7. Verify Setup

1. Visit getflowly.ca in your browser to ensure the website is working correctly
2. Check that all links, images, and resources load properly
3. Test the website on different devices and browsers

## File Structure

- `index.html` - Main landing page
- `flowly-how-it-works.html` - Detailed explanation of how Flowly works
- `flowly-careers.html` - Careers page
- `flowly-privacy-policy.html` - Privacy policy
- `flowly-registration.html` - User registration page
- `CNAME` - Contains the custom domain name for GitHub Pages

## Maintenance

To update the website:

1. Make changes to the files locally
2. Commit and push the changes to GitHub
3. GitHub Pages will automatically rebuild and deploy your site

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

## Support

If you encounter any issues with the GitHub Pages setup, refer to the [GitHub Pages documentation](https://docs.github.com/en/pages).
