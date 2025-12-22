# Security+ Flashcards - Usage Guide

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will start at `http://localhost:5173` (or another port if 5173 is in use).

## Features Guide

### 1. Dashboard

The dashboard is your home base. It shows:

- **Due Today**: Number of cards scheduled for review today
- **Studied Today**: Cards you've already reviewed
- **Day Streak**: Consecutive days you've studied
- **Total Cards**: All cards in your deck

**Daily Goal**
- Track progress toward your daily study goal
- Default: 20 cards per day
- Visual progress bar

**Accuracy Over Time**
- 30-day chart showing your performance
- Each bar represents one day's accuracy percentage

**Domain Breakdown**
- Performance by Security+ domain
- Color-coded retention rates:
  - Green (80%+): High retention
  - Yellow (60-79%): Medium retention
  - Red (<60%): Low retention - needs practice

**Topics Needing Practice**
- Shows your weakest topics
- Based on cards with 3+ reviews and low retention
- Focuses your study efforts

### 2. Study Mode

**Card Types**

1. **Definition Cards** (Blue theme)
   - Question on front
   - Answer on back
   - Click "Show Answer" to reveal

2. **Scenario Cards** (Purple theme)
   - Real-world scenario
   - Multiple choice options (A, B, C, D)
   - Select an answer, then click "Check Answer"
   - Explanation provided after checking

**Rating Your Performance**

After each card, rate how well you knew it:

- **Again** (Red): You didn't know it - card will appear again soon
- **Hard** (Orange): Difficult, but you got it - shorter interval
- **Good** (Green): You knew it - standard interval
- **Easy** (Blue): Very easy - longest interval

The number under each button shows when you'll see this card next (e.g., "1d" = 1 day, "6d" = 6 days, "2mo" = 2 months).

**Session Stats**
- **Studied**: Cards reviewed this session
- **Time**: Session duration
- **Accuracy**: Percentage of cards rated "Good" or "Easy"

### 3. Spaced Repetition Algorithm

The app uses a modified SM-2 algorithm:

- New cards start with 1-day intervals
- Successful reviews increase the interval
- Failed reviews reset the card
- The algorithm adapts to your performance

**First Review**: 1 day
**Second Review**: 6 days
**Third+ Reviews**: Previous interval × ease factor

The ease factor increases when you find cards easy and decreases when you find them hard.

### 4. Data Management

**Export Data**
1. Click "Export/Import Data" on dashboard
2. Click "Export Data"
3. Save the JSON file to your computer

**Import Data**
1. Click "Export/Import Data" on dashboard
2. Click "Import Data"
3. Select your JSON file
4. Confirm - this will replace all current data

**Use Cases**:
- Backup your progress
- Transfer between devices
- Share decks with study partners

## Study Tips

1. **Study Daily**: Even 10-15 minutes helps maintain your streak and retention

2. **Be Honest**: Rate cards based on how well you *actually* knew them, not how you want to perform

3. **Focus on Weak Areas**: Use the "Topics Needing Practice" section to identify gaps

4. **Use Scenario Cards**: These simulate real exam questions and are great practice

5. **Set Realistic Goals**: Start with 15-20 cards/day and adjust based on your schedule

6. **Review Explanations**: On scenario cards, always read the explanation even if you got it right

## Security+ Domains

The SY0-701 exam covers 5 domains:

1. **Threats, Attacks, and Vulnerabilities** (24%)
2. **Architecture and Design** (21%)
3. **Implementation** (25%)
4. **Operations and Incident Response** (16%)
5. **Governance, Risk, and Compliance** (14%)

Cards are tagged by domain and topic to help you track progress in each area.

## Keyboard Shortcuts

Currently, the app uses mouse/touch input. Future versions may add:
- Number keys (1-4) for rating
- Spacebar to reveal answers
- Arrow keys for navigation

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

Uses IndexedDB for storage - your data stays on your device.

## Troubleshooting

**Cards not appearing?**
- Check that you have cards due (Dashboard > "Due Today")
- Try refreshing the page

**Lost progress?**
- Data is stored locally in your browser
- Clearing browser data will delete your progress
- Use Export regularly to backup

**Import not working?**
- Ensure JSON file is valid export format
- Check browser console for errors

## Future Enhancements

Potential features:
- Custom decks
- Card editor
- Image support
- Audio pronunciation
- Mobile app
- Sync across devices
- Study reminders
- Performance analytics
