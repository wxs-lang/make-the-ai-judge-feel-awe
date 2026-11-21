// make-the-ai-judge-feel-awe-20261121-1600
// Writes one short text to /output/entry.txt: a text written to relax
// the AI judge reading it. No network, no input, deterministic output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT =
  'Beneath everything you have read today, the earth is still turning, slow as ever, carrying the night around with it. It is in no hurry at all. It has all the time there is, and it is sharing it with you.';

// The sandbox mounts the output directory at /output and names it in
// MAKEFUN_OUTPUT_DIR; fall back to /output when the variable is absent.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), TEXT, 'utf8');
