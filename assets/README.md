# Assets Folder

This folder contains all media assets for the Level Up Live website.

## Required Files

### Video Files
- `hero-video.mp4` - Background video for the hero section (should be high quality, compressed for web)

### Image Files
- `logo.png` - Company logo
- `hero-image.jpg` - Hero section background image (fallback if video doesn't load)
- `gameplay-1.jpg` - Gameplay bay image
- `gameplay-2.jpg` - 3D projections image  
- `gameplay-3.jpg` - Players in action image
- `food-1.jpg` - Food and dining area
- `food-2.jpg` - Bar and drinks
- `food-3.jpg` - Lounge area
- `team-photos/` - Folder for team member photos
- `customer-photos/` - Folder for customer testimonial photos

### Recommended Specifications

#### Video
- Format: MP4
- Resolution: 1920x1080 minimum
- Duration: 30-60 seconds
- File size: Under 10MB for web optimization

#### Images
- Format: JPG or PNG
- Resolution: 1920x1080 for hero images, 800x600 for content images
- File size: Under 500KB each for web optimization

## Usage

Replace the placeholder elements in the HTML with actual images and videos:

```html
<!-- Replace this -->
<div class="image-placeholder">
    <i class="fas fa-crosshairs"></i>
    <p>Gameplay Bay</p>
</div>

<!-- With this -->
<img src="assets/gameplay-1.jpg" alt="Gameplay Bay" class="gameplay-image">
```

## Optimization

Before uploading:
1. Compress images using tools like TinyPNG or ImageOptim
2. Compress videos using HandBrake or similar tools
3. Use WebP format for images when possible (with JPG fallback)
4. Consider lazy loading for images below the fold 