#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the built main.js file
const mainJsPath = path.join(__dirname, '..', 'main.js');
let content = fs.readFileSync(mainJsPath, 'utf8');

// Remove devLog function calls - handle multi-line with balanced parentheses
function removeDevLogCalls(code) {
    let result = '';
    let i = 0;
    
    while (i < code.length) {
        // Look for devLog(
        if (code.substring(i, i + 7) === 'devLog(') {
            // Skip to the matching closing parenthesis
            let depth = 0;
            let j = i + 7;
            let inString = false;
            let stringChar = '';
            
            while (j < code.length) {
                const char = code[j];
                
                if (!inString && (char === '"' || char === "'" || char === '`')) {
                    inString = true;
                    stringChar = char;
                } else if (inString && char === stringChar && code[j - 1] !== '\\') {
                    inString = false;
                } else if (!inString) {
                    if (char === '(') depth++;
                    if (char === ')') {
                        if (depth === 0) {
                            // Found the matching closing paren
                            // Skip the entire call including semicolon and whitespace
                            j++;
                            while (j < code.length && /[\s;]/.test(code[j])) j++;
                            i = j;
                            break;
                        }
                        depth--;
                    }
                }
                j++;
            }
            if (j >= code.length) break;
        } else {
            result += code[i];
            i++;
        }
    }
    
    return result;
}

// Remove the __DEV__ constant and its comment (lines 4-5)
content = content.replace(/\/\/ Dev mode flag - set to false for production builds\nconst __DEV__ = (true|false);\n/g, '');

// Remove the devLog function and its comment (lines 6-11)
// Match the function definition more carefully
content = content.replace(/\/\/ Dev logging helper - will be stripped in production\nfunction devLog\(\.\.\.args\) \{\n    if \(__DEV__\) \{\n        console\.log\(\.\.\.args\);\n    \}\n\}\n/g, '');

// Remove devLog calls
content = removeDevLogCalls(content);

// Clean up excessive empty lines (more than 2 consecutive)
content = content.replace(/\n{3,}/g, '\n\n');

// Write back to main.js
fs.writeFileSync(mainJsPath, content, 'utf8');

console.log('✓ Removed dev logging from main.js');
