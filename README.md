# Security+ Flashcards

A Security+ study app with spaced repetition, scenario cards, and progress analytics.

## Why This Exists

Most flashcard apps are polite little index cards. This one is a slightly stricter teacher.

**Flashcards** is a web app designed to help you learn certification content faster (starting with CompTIA Security+ SY0-701) using:

- **Spaced repetition** (review weak cards more often)
- **Active recall** (typing answers, not just flipping)
- **Exam-style scenarios** (CompTIA flavor questions)
- **Progress tracking by domain** (so you know what's leaking)

This project is also a portfolio piece to showcase modern web development practices in Vue: component architecture, state management, persistence, analytics, and clean UX.

## Features

- 📚 Default Security+ SY0-701 deck with cards organized by domain
- 🧠 Spaced repetition algorithm (SM-2) for optimal learning
- ✍️ Active recall with typed answers
- 📊 Progress dashboard with analytics
- 🎯 Domain and topic tracking
- 💾 Offline-first with IndexedDB persistence
- 📥 Export/import decks as JSON
- 🔥 Daily goals and streak tracking

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- Vue 3 (Composition API)
- Pinia (State Management)
- Vue Router
- IndexedDB (via idb)
- Vite

## Card Types

1. **Definition Cards**: Term ↔ Definition
2. **Scenario Cards**: Scenario → Best answer + explanation

## Spaced Repetition

Cards are scheduled using a modified SM-2 algorithm:
- **Again**: Card shown again soon
- **Hard**: Longer interval, but not as long as Good
- **Good**: Standard interval increase
- **Easy**: Significantly longer interval
