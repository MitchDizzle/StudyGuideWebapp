# CompTIA Study Guide

A comprehensive study app for CompTIA certifications with spaced repetition, multiple card types, and detailed progress analytics.

## Overview

This web-based flashcard application helps you master CompTIA certification content using proven learning techniques. Built with Vue 3 and designed for efficient studying with offline support.

## Features

### 📦 Multiple Study Packs
- **Security+ SY0-701**: Complete coverage across all 5 domains
  - Threats, Attacks, and Vulnerabilities
  - Architecture and Design
  - Implementation
  - Operations and Incident Response
  - Governance, Risk, and Compliance
- **Network+ N10-008**: Networking fundamentals and concepts
- Enable/disable packs based on what you're studying

### 🎴 Interactive Card Types
- **Definition Cards**: Traditional term-to-definition flashcards
- **Scenario Cards**: Multiple-choice questions with detailed explanations
- **Drag & Drop Cards**: Interactive matching and ordering exercises

### 🧠 Smart Learning Features
- **Spaced Repetition (SM-2)**: Cards you struggle with appear more frequently
- **Active Recall**: Type answers instead of passive review
- **Progress Tracking**: Monitor accuracy and retention by domain and topic
- **Daily Goals**: Set and track daily study targets
- **Streak Tracking**: Build study habits with day streaks
- **Study Breaks**: Automatic break reminders every 15 minutes

### 📊 Analytics Dashboard
- Cards due today vs cards studied
- Accuracy over time (30-day chart)
- Domain-by-domain breakdown with retention rates
- Weak topics identification
- Session statistics (time, cards studied, accuracy)

### 💾 Data Management
- **Offline-First**: Works without internet using IndexedDB
- **Export/Import**: Backup and restore your progress as JSON
- **Reset Progress**: Start fresh while keeping statistics
- **Multi-Pack Support**: Study multiple certifications simultaneously

### ⚙️ Customizable Settings
- Adjustable daily goals
- Enable/disable specific study packs
- Per-pack statistics and tracking

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Deployment

This app is configured to work in any subfolder without modification. Simply build and upload the `dist` folder contents to your web server.

URLs will use hash-based routing (e.g., `/#/study`) for maximum compatibility.

## Tech Stack

- **Vue 3** (Composition API)
- **Pinia** (State Management)
- **Vue Router** (Hash-based routing for portability)
- **IndexedDB** (via idb library for offline persistence)
- **Vite** (Build tool and dev server)

## Card Rating System

The spaced repetition algorithm uses 4 rating options:

- **Again**: Card shown again soon (resets interval)
- **Hard**: Longer interval, but conservative
- **Good**: Standard interval increase (optimal retention)
- **Easy**: Significantly longer interval (mastered content)
