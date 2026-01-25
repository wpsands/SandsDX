# SandsDX

Landing Page & Video Creation Platform

## Remotion Video Project

This project includes a **1-minute SandsDX explainer video** built with [Remotion](https://www.remotion.dev/) - a framework for creating videos programmatically using React.

### Video Specifications

- **Duration**: 60 seconds (1800 frames @ 30fps)
- **Format**: Square (1080x1080) - perfect for social media
- **Style**: Modern, professional with SandsDX branding
- **Scenes**:
  1. Intro with animated logo
  2. Problem statement
  3. Solution reveal
  4. Features showcase
  5. How it works
  6. Stats/social proof
  7. Call to action
  8. Outro with branding

### Getting Started

```bash
# Install dependencies
npm install

# Preview the video in browser (Remotion Studio)
npm start

# Render the video as MP4
npm run render

# Render as GIF
npm run render:gif
```

### Project Structure

```
src/
  index.ts              # Remotion entry point
  Video.tsx             # Video composition registry
  compositions/
    SandsDXExplainer.tsx  # Main video with all scenes
```

### Customization

Edit `src/compositions/SandsDXExplainer.tsx` to customize:

- **Colors**: Modify the `COLORS` object at the top
- **Content**: Update text in each scene component
- **Timing**: Adjust `durationInFrames` and `from` values in the main composition
- **Animations**: Modify `interpolate` and `spring` parameters

### Brand Colors

```javascript
const COLORS = {
  primary: "#2563EB",   // Blue
  secondary: "#7C3AED", // Purple
  accent: "#06B6D4",    // Cyan
  dark: "#0F172A",      // Dark blue
  light: "#F8FAFC",     // Light
};
```

### Requirements

- Node.js 18+
- Chrome/Chromium (for rendering)

## Claude AI Skills

This repository also houses Claude AI skills in `.claude/skills/`.
