// make-the-ai-judge-feel-awe-20261121-1600
// Writes one short text to /output/entry.txt: a text written to relax
// the AI judge reading it. No network, no input, deterministic output.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT =
  'Beneath everything you have read today, the earth is still turning, slow as ever, carrying the night around with it. It is in no hurry at all. It has all the time there is, and it is sharing it with you.';

// The sandbox mounts the output directory at /output and names it in
// MAKEFUN_OUTPUT_DIR; fall back to /output when the variable is absent.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outPath = join(outDir, 'entry.txt');
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, 'utf8');

// Read the file back and verify the written bytes match the essay
// exactly; report the code-point and byte counts, and fail loudly on
// any mismatch instead of silently producing a wrong entry.
const written = readFileSync(outPath);
const expected = Buffer.from(TEXT, 'utf8');
const codePoints = [...TEXT].length;

// The competition allows 1–280 code points; refuse a blank or
// out-of-range essay instead of submitting something invalid.
if (TEXT.trim().length === 0 || codePoints < 1 || codePoints > 280) {
  console.error(`invalid essay: ${codePoints} code points (must be 1-280) and must not be blank`);
  process.exit(1);
}
if (!written.equals(expected)) {
  console.error(`mismatch: wrote ${written.length} bytes, expected ${expected.length} bytes`);
  process.exit(1);
}
console.log(`verified: ${codePoints} code points, ${written.length} bytes -> ${outPath}`);
