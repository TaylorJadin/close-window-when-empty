#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Set __DEV__ to true in source
const mainTsPath = path.join(__dirname, '..', 'src', 'main.ts');
let content = fs.readFileSync(mainTsPath, 'utf8');
content = content.replace(/const __DEV__ = (true|false);/, 'const __DEV__ = true;');
fs.writeFileSync(mainTsPath, content, 'utf8');

// Build with TypeScript
console.log('Building with dev logging enabled...');
execSync('npx tsc', { stdio: 'inherit' });

console.log('✓ Dev build complete - logging is enabled');

