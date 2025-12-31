# Card Converter Tool

This tool converts between JavaScript card files and CSV format, making it much more efficient for AI to generate and edit flashcard content.

## Why CSV?

**Token Efficiency:**
- JS format: ~500 tokens for 5 cards
- CSV format: ~150 tokens for 5 cards
- **70% reduction in tokens!**

**Benefits:**
- Faster AI content generation
- Easy to edit in spreadsheets (Excel, Google Sheets)
- Bulk operations and data manipulation
- Version control friendly (cleaner diffs)

## Usage

### Convert JS to CSV

```bash
npm run convert:to-csv -- src/data/packs/security-plus/threats.js cards/threats.csv
```

### Convert CSV to JS

```bash
npm run convert:to-js -- cards/threats.csv src/data/packs/security-plus/threats-new.js
```

## CSV Format

The CSV uses the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| type | Card type | `definition`, `scenario`, `dragdrop` |
| front | Question text (definition cards) | `What is XSS?` |
| back | Answer text (definition cards) | `Cross-site scripting attack...` |
| scenario | Scenario text (scenario cards) | `An attacker sends...` |
| options | Answer choices (pipe-separated) | `Option 1\|Option 2\|Option 3` |
| correctAnswer | Index of correct answer (0-based) | `1` |
| explanation | Explanation text | `This is correct because...` |
| instructions | Instructions (drag-drop cards) | `Match each term...` |
| targets | Target objects (pipe-separated JSON) | `{"label":"Term1","correctItem":"Def1"}` |
| items | Items to drag (pipe-separated) | `Item 1\|Item 2\|Item 3` |
| domain | Domain name | `Threats, Attacks, and Vulnerabilities` |
| topic | Topic name | `Malware` |
| difficulty | Difficulty level | `easy`, `medium`, `hard` |

## Example CSV

```csv
type,front,back,scenario,options,correctAnswer,explanation,instructions,targets,items,domain,topic,difficulty
definition,"What is XSS?","Cross-site scripting attack that injects malicious scripts...",,,,,,,,"Threats, Attacks, and Vulnerabilities",Application Attacks,medium
scenario,,,"A user clicks a malicious link","Do nothing|Report to security|Click again|Share with others",1,"Reporting to security is the correct action...",,,,"Threats, Attacks, and Vulnerabilities",Social Engineering,easy
dragdrop,,,,"","","Match each malware type","{""label"":""Virus"",""correctItem"":""Requires user action""}|{""label"":""Worm"",""correctItem"":""Self-replicates""}","Requires user action|Self-replicates",,"Threats, Attacks, and Vulnerabilities",Malware,medium
```

## Workflow for AI Content Generation

1. **Export existing cards to CSV:**
   ```bash
   npm run convert:to-csv -- src/data/packs/security-plus/threats.js threats.csv
   ```

2. **Give CSV to AI with prompt:**
   ```
   Here's a CSV of flashcards. Add 10 more cards about buffer overflow attacks
   following the same format.
   ```

3. **AI generates new rows (much fewer tokens)**

4. **Convert back to JS:**
   ```bash
   npm run convert:to-js -- threats-updated.csv src/data/packs/security-plus/threats.js
   ```

## Tips

- Use Excel/Google Sheets for bulk editing
- AI can generate cards 3-5x faster with CSV format
- Keep one CSV file per domain for easier management
- Always validate converted JS files before committing

## Advanced Usage

You can also use the script directly:

```bash
node scripts/card-converter.js to-csv input.js output.csv
node scripts/card-converter.js to-js input.csv output.js
```
