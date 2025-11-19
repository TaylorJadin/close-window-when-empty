#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Set __DEV__ to false in source (though we'll strip it anyway)
const mainTsPath = path.join(__dirname, '..', 'src', 'main.ts');
let content = fs.readFileSync(mainTsPath, 'utf8');
content = content.replace(/const __DEV__ = (true|false);/, 'const __DEV__ = false;');
fs.writeFileSync(mainTsPath, content, 'utf8');

// Build with TypeScript
console.log('Building for production...');
execSync('npx tsc', { stdio: 'inherit' });

// Strip console.log statements
console.log('Stripping dev logging...');
const stripConsolePath = path.join(__dirname, 'strip-console.js');
execSync(`node ${stripConsolePath}`, { stdio: 'inherit' });

console.log('✓ Production build complete - all logging removed');

