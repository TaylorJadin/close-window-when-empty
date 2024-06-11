# Close Window When Empty

This plugin closes the Obsidian window (but doesn't quit the entire Application) when the last tab is closed, kind of how browsers work. This is intended for use on macOS, where this type of behavior is common for apps that have tabs, and this plugin won't do anything (even if its enabled) on other platforms.

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
