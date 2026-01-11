# How to Add Your Favicon

## Step 1: Add Your Favicon Files

Place your favicon files in the root directory of your website (same folder as `index.html`):

### Required Files:
1. **favicon.ico** - Main favicon (16x16 and 32x32 combined)
2. **favicon-32x32.png** - 32x32 PNG version
3. **favicon-16x16.png** - 16x16 PNG version
4. **apple-touch-icon.png** - 180x180 PNG for iOS devices

### Optional (Recommended):
5. **site.webmanifest** - Web app manifest file

## Step 2: File Naming

Make sure your files are named exactly:
- `favicon.ico`
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`
- `site.webmanifest` (optional)

## Step 3: HTML is Already Updated!

The HTML already has the proper favicon links. Once you add the files, they'll work automatically.

## Creating Favicon Files

### Option 1: Online Tools (Easiest)
1. Go to https://favicon.io or https://realfavicongenerator.net
2. Upload your image (square, at least 512x512px recommended)
3. Download the generated files
4. Place them in your website folder

### Option 2: From Your Existing Image
If you have a PNG/JPG:
1. Use https://favicon.io/favicon-converter/
2. Upload your image
3. Download all sizes
4. Rename and place in your folder

### Option 3: Manual Creation
- Use image editing software (Photoshop, GIMP, etc.)
- Create images at the specified sizes
- Save as PNG (or ICO for favicon.ico)

## File Sizes Reference

- **favicon.ico**: Contains 16x16 and 32x32 (multi-resolution ICO file)
- **favicon-32x32.png**: 32x32 pixels
- **favicon-16x16.png**: 16x16 pixels
- **apple-touch-icon.png**: 180x180 pixels (for iOS home screen)

## Optional: Web Manifest

If you want to create a `site.webmanifest` file (for PWA support), here's a template:

```json
{
    "name": "Joel Salinas - AI Leadership Consultant",
    "short_name": "Joel Salinas",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#1E3A5F",
    "background_color": "#FFFFFF",
    "display": "standalone"
}
```

## Testing

After adding files:
1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check if favicon appears in browser tab
3. Test on mobile device for apple-touch-icon

## Current Status

✅ HTML favicon links are already in place
⏳ Waiting for you to add the favicon files to the directory

Once you add the files and push to GitHub, your favicon will appear!
