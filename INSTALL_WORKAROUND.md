# Installation Workaround Guide

## The Issue
Windows is experiencing symlink/linking issues with certain npm packages, particularly `@jridgewell/sourcemap-codec`. This is a known Windows + npm issue related to symlink permissions and path length.

## Solution 1: Enable Developer Mode (Recommended)

Windows 10/11 Developer Mode enables symlink creation without admin rights:

1. Open Settings
2. Go to "Update & Security" > "For Developers"
3. Enable "Developer Mode"
4. Restart your terminal/IDE
5. Try `npm install` again

## Solution 2: Run as Administrator

1. Close your terminal
2. Right-click Command Prompt or PowerShell
3. Select "Run as Administrator"
4. Navigate to project folder
5. Run `npm install --no-bin-links`

## Solution 3: Use a CDN Version (Quick Start)

Create a simple HTML file without build tools:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security+ Flashcards</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>
  <script src="https://unpkg.com/pinia@2/dist/pinia.iife.js"></script>
  <script src="https://unpkg.com/idb@8/build/umd.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./standalone.js"></script>
</body>
</html>
```

## Solution 4: Use Different Package Manager

### Try pnpm (often works better on Windows)
```bash
npm install -g pnpm
pnpm install
pnpm dev
```

### Try npm with specific flags
```bash
npm install --no-optional --no-bin-links --legacy-peer-deps
```

## Solution 5: Move to Shorter Path

Windows has path length limitations. Try moving the project:

```bash
# Move from:
C:\Users\Mitch\Documents\GitHub\FlashCard

# To something shorter:
C:\flashcard

cd C:\
mkdir flashcard
# Copy files over
cd flashcard
npm install
```

## Solution 6: Disable Windows Defender Real-Time Scanning

Sometimes Windows Defender locks files during npm install:

1. Open Windows Security
2. Virus & threat protection
3. Manage settings
4. Turn off "Real-time protection" temporarily
5. Run `npm install`
6. Turn protection back on

## Solution 7: Clean Install

```bash
# Clear npm cache
npm cache clean --force

# Remove any partial installs
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

# Fresh install
npm install --legacy-peer-deps
```

## Solution 8: Manual Dependency Installation

Install packages one by one to identify the problematic package:

```bash
npm install vue
npm install vue-router
npm install pinia
npm install idb
npm install -D vite
npm install -D @vitejs/plugin-vue
```

## Verification

After successful install, verify with:
```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
