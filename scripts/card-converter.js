#!/usr/bin/env node

/**
 * Card Converter Script
 * Converts between JavaScript card files and CSV format for efficient AI content generation
 *
 * Usage:
 *   npm run convert:to-csv -- <input.js> <output.csv>
 *   npm run convert:to-js -- <input.csv> <output.js>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV Headers
const CSV_HEADERS = [
  'type',
  'front',
  'back',
  'scenario',
  'options',
  'correctAnswer',
  'explanation',
  'instructions',
  'targets',
  'items',
  'domain',
  'topic',
  'difficulty'
];

/**
 * Escape CSV field
 */
function escapeCSV(value) {
  if (value === undefined || value === null) return '';
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * Unescape CSV field
 */
function unescapeCSV(value) {
  if (!value) return '';
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/""/g, '"');
  }
  return value;
}

/**
 * Convert array to pipe-separated string
 */
function arrayToString(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return '';
  return arr.map(item => {
    if (typeof item === 'object') {
      return JSON.stringify(item);
    }
    return String(item);
  }).join('|');
}

/**
 * Convert pipe-separated string to array
 */
function stringToArray(str) {
  if (!str) return [];
  return str.split('|').map(item => {
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  });
}

/**
 * Convert JS card object to CSV row
 */
function cardToCSVRow(card) {
  return [
    card.type || '',
    card.front || '',
    card.back || '',
    card.scenario || '',
    arrayToString(card.options),
    card.correctAnswer !== undefined ? card.correctAnswer : '',
    card.explanation || '',
    card.instructions || '',
    arrayToString(card.targets),
    arrayToString(card.items),
    card.domain || '',
    card.topic || '',
    card.difficulty || ''
  ].map(escapeCSV).join(',');
}

/**
 * Convert CSV row to card object
 */
function csvRowToCard(row) {
  const fields = parseCSVRow(row);
  const card = {
    type: fields[0] || 'definition'
  };

  // Add fields based on card type
  if (fields[1]) card.front = unescapeCSV(fields[1]);
  if (fields[2]) card.back = unescapeCSV(fields[2]);
  if (fields[3]) card.scenario = unescapeCSV(fields[3]);
  if (fields[4]) card.options = stringToArray(unescapeCSV(fields[4]));
  if (fields[5] !== '') card.correctAnswer = parseInt(fields[5], 10);
  if (fields[6]) card.explanation = unescapeCSV(fields[6]);
  if (fields[7]) card.instructions = unescapeCSV(fields[7]);
  if (fields[8]) card.targets = stringToArray(unescapeCSV(fields[8]));
  if (fields[9]) card.items = stringToArray(unescapeCSV(fields[9]));
  if (fields[10]) card.domain = unescapeCSV(fields[10]);
  if (fields[11]) card.topic = unescapeCSV(fields[11]);
  if (fields[12]) card.difficulty = unescapeCSV(fields[12]);

  return card;
}

/**
 * Parse a CSV row respecting quoted fields
 */
function parseCSVRow(row) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);

  return fields;
}

/**
 * Convert JS file to CSV using dynamic import
 */
async function jsToCSV(inputPath, outputPath) {
  console.log(`Converting ${inputPath} to CSV...`);

  // Create stub types module to satisfy imports
  const stubTypesPath = path.join(__dirname, 'stub-types.mjs');
  const stubContent = `export const CardType = {
  DEFINITION: 'definition',
  SCENARIO: 'scenario',
  DRAGDROP: 'dragdrop'
};

export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};
`;

  fs.writeFileSync(stubTypesPath, stubContent);

  try {
    // Create a temporary modified version that imports from our stub
    const originalContent = fs.readFileSync(inputPath, 'utf8');
    const modifiedContent = originalContent.replace(
      /from ['"]@\/types['"]/g,
      `from '${pathToFileURL(stubTypesPath).href}'`
    );

    const tempPath = path.join(__dirname, '__temp_import__.mjs');
    fs.writeFileSync(tempPath, modifiedContent);

    // Import the modified file
    const module = await import(pathToFileURL(tempPath).href + '?t=' + Date.now());

    // Find the exported cards array and metadata
    const cards = Object.values(module).find(value => Array.isArray(value));
    const metadata = module.metadata;

    if (!cards || cards.length === 0) {
      throw new Error('No cards array found in JS file');
    }

    // Apply domain from metadata to each card (if metadata exists)
    if (metadata && metadata.domain) {
      cards.forEach(card => {
        if (!card.domain) {
          card.domain = metadata.domain;
        }
      });
    }

    // Convert to CSV
    const csvLines = [CSV_HEADERS.join(',')];
    cards.forEach(card => {
      csvLines.push(cardToCSVRow(card));
    });

    fs.writeFileSync(outputPath, csvLines.join('\n'), 'utf8');
    console.log(`✓ Converted ${cards.length} cards to ${outputPath}`);

    // Cleanup temp files
    fs.unlinkSync(tempPath);
  } finally {
    // Cleanup stub file
    if (fs.existsSync(stubTypesPath)) {
      fs.unlinkSync(stubTypesPath);
    }
  }
}

/**
 * Convert CSV to JS file
 */
function csvToJS(inputPath, outputPath) {
  console.log(`Converting ${inputPath} to JS...`);

  // Read CSV file
  const csvContent = fs.readFileSync(inputPath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim());

  // Skip header
  const dataLines = lines.slice(1);

  // Convert each row to card object
  const cards = dataLines.map(csvRowToCard);

  // Determine variable name from output filename
  const baseName = path.basename(outputPath, '.js');
  const varName = baseName.replace(/-./g, x => x[1].toUpperCase()) + 'Cards';

  // Determine domain from first card
  const domain = cards[0]?.domain || 'General';

  // Generate JS content
  const jsContent = `import { CardType, Difficulty } from '@/types'

// Auto-generated from CSV
export const metadata = {
  domain: ${JSON.stringify(domain)}
}

export const ${varName} = [
${cards.map(card => cardToJS(card, domain)).join(',\n')}
]
`;

  fs.writeFileSync(outputPath, jsContent, 'utf8');
  console.log(`✓ Converted ${cards.length} cards to ${outputPath}`);
}

/**
 * Convert card object to JS code string
 * @param {Object} card - Card object
 * @param {string} fileDomain - Domain from file metadata (cards shouldn't include domain)
 */
function cardToJS(card, fileDomain) {
  const lines = [];
  lines.push('  {');
  lines.push(`    type: CardType.${card.type.toUpperCase()},`);

  if (card.front) lines.push(`    front: ${JSON.stringify(card.front)},`);
  if (card.back) lines.push(`    back: ${JSON.stringify(card.back)},`);
  if (card.scenario) lines.push(`    scenario: ${JSON.stringify(card.scenario)},`);
  if (card.options) lines.push(`    options: ${JSON.stringify(card.options, null, 6).replace(/\n/g, '\n    ')},`);
  if (card.correctAnswer !== undefined) lines.push(`    correctAnswer: ${card.correctAnswer},`);
  if (card.explanation) lines.push(`    explanation: ${JSON.stringify(card.explanation)},`);
  if (card.instructions) lines.push(`    instructions: ${JSON.stringify(card.instructions)},`);
  if (card.targets) lines.push(`    targets: ${JSON.stringify(card.targets, null, 6).replace(/\n/g, '\n    ')},`);
  if (card.items) lines.push(`    items: ${JSON.stringify(card.items, null, 6).replace(/\n/g, '\n    ')},`);

  // Skip domain - it's now in metadata export

  if (card.topic) lines.push(`    topic: ${JSON.stringify(card.topic)},`);
  if (card.difficulty) lines.push(`    difficulty: Difficulty.${card.difficulty.toUpperCase()}`);

  lines.push('  }');
  return lines.join('\n');
}

// CLI
const args = process.argv.slice(2);
const command = args[0];
const inputPath = args[1];
const outputPath = args[2];

if (!command || !inputPath || !outputPath) {
  console.log('Usage:');
  console.log('  node card-converter.js to-csv <input.js> <output.csv>');
  console.log('  node card-converter.js to-js <input.csv> <output.js>');
  process.exit(1);
}

try {
  if (command === 'to-csv') {
    await jsToCSV(inputPath, outputPath);
  } else if (command === 'to-js') {
    csvToJS(inputPath, outputPath);
  } else {
    console.error('Unknown command:', command);
    process.exit(1);
  }
} catch (error) {
  console.error('Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
