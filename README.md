# Close Window When Empty

This plugin closes the Obsidian window when the last note is closed, in order to match how tabs in browsers work. On macOS, when the window is closed the application will stay running, but on Windows and Linux the application will quit, again kind of how browsers work.

## Installation
Clone this git repository into your vault's plugins folder:
```bash
cd $YOUR_VAULT/.obsidian/plugins
git clone https://github.com/taylorjadin/close-window-when-empty.git
```

## Usage
Toggle the plugin on and in the Community Plugins section of the Obsidian settings.

## Dev

Compile the typescript
```bash
npx tsc
```
