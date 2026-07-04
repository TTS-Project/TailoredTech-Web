# Tailored Tech Solutions — Terra Farming Feature Reel

11 silent walkthrough clips cut from the 22-minute platform recording, paired with a hover/tap React video component for the lovable.dev site.

## Contents
```
src/components/TerraFeatureVideo.tsx   # React component (hover-desktop / tap-mobile / pause-offscreen)
public/videos/terra-*.mp4              # 11 feature clips (silent, 1280x720, H.264)
docs/terra-voiceover-script.md         # Bella voiceover script + ffmpeg mux command
```

## Deploy
1. Paste `TerraFeatureVideo.tsx` into lovable, drop the videos into lovable's public folder, render `<TerraFeatureGrid />` in the Terra Farming section.
2. When narration is ready, generate Bella voices from the script and mux onto clips per the docs.

Stack: React + TypeScript + Tailwind + Phosphor icons.

## Development Setup

Contributors working with [Claude Code](https://claude.com/claude-code) on macOS can install the CLI via Homebrew:

```bash
brew install --cask claude-code
```

On Linux, install it instead via npm:

```bash
npm install -g @anthropic-ai/claude-code
```
