import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('src');
const _ALLOWED_Z_SCALE = new Set([
  'var(--z-behind)',
  'var(--z-content)',
  'var(--z-subnav)',
  'var(--z-header)',
  'var(--z-sticky-bar)',
  'var(--z-floating)',
  'var(--z-back-to-top)',
  'var(--z-drawer-backdrop)',
  'var(--z-drawer)',
  'var(--z-modal)',
  'var(--z-toast)',
]);

// Use z-[var(--TOKEN)] syntax in JSX, e.g. z-[var(--z-header)]

const FORBIDDEN_PATTERNS = [
  {
    regex: /\b(100vw|w-screen)\b/g,
    name: '100vw / w-screen forbidden (causes scrollbar overflow; use 100% or inset-x-0)'
  },
  {
    regex: /body\s*\{[^}]*overflow-x\s*:\s*hidden/gis,
    name: 'overflow-x:hidden on body forbidden (fix root causes)'
  },
  {
    regex: /html\s*\{[^}]*overflow-x\s*:\s*hidden/gis,
    name: 'overflow-x:hidden on html forbidden (fix root causes)'
  }
];

// Raw tailwind z-index classes like z-10, z-20, z-30, z-40, z-50, z-0, -z-10, z-[123] (unless using var(--z-TOKEN) design tokens)
const RAW_Z_REGEX = /\b(-?z-(?:0|10|20|30|40|50|auto|\[(?!var\(--z-)[^\]]+\]))\b/g;
// Inline style raw zIndex like zIndex: 50, zIndex: '50'
const INLINE_Z_REGEX = /zIndex\s*:\s*['"]?(?!var\(--z-)(\d+|auto)['"]?/g;

function scanDirectory(dir, errors = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath, errors);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');

      // Check whole-file patterns
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.regex.test(content)) {
          errors.push({
            file: fullPath,
            line: 1,
            issue: pattern.name
          });
        }
      }

      // Check line-by-line raw z-index
      // Exclude index.css definition of --z- variables
      const isIndexCss = entry.name === 'index.css';
      lines.forEach((line, idx) => {
        if (!isIndexCss) {
          let match;
          while ((match = RAW_Z_REGEX.exec(line)) !== null) {
            errors.push({
              file: fullPath,
              line: idx + 1,
              issue: `Raw Tailwind z-index class '${match[1]}' found. Use the design-token syntax: z-[var(--z-TOKEN)] where TOKEN is one of the --z-* CSS variables.`
            });
          }
          while ((match = INLINE_Z_REGEX.exec(line)) !== null) {
            errors.push({
              file: fullPath,
              line: idx + 1,
              issue: `Raw inline zIndex '${match[0]}' found. Use design-token syntax: zIndex: 'var(--z-TOKEN)' where TOKEN is one of the --z-* CSS variables.`
            });
          }
        }
      });
    }
  }
  return errors;
}

console.log('Running layout & overflow lint check on src/...');
const errors = scanDirectory(SRC_DIR);

if (errors.length > 0) {
  console.error(`\n❌ Found ${errors.length} layout/overflow/z-index lint issues:`);
  errors.slice(0, 30).forEach((err) => {
    const relPath = path.relative(process.cwd(), err.file);
    console.error(` - [${relPath}:${err.line}] ${err.issue}`);
  });
  if (errors.length > 30) {
    console.error(` ... and ${errors.length - 30} more`);
  }
  process.exit(1);
} else {
  console.log('✅ Layout & overflow lint check passed! Zero forbidden patterns.');
  process.exit(0);
}
