"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class CloseWindowWhenEmptyPlugin extends obsidian_1.Plugin {
    constructor() {
        super(...arguments);
        this.initialLoad = true;
        this.handleLayoutChange = () => {
            const leaves = this.app.workspace.getLeavesOfType('markdown');
            // Avoid closing the window on the initial load
            if (this.initialLoad) {
                this.initialLoad = false;
                return;
            }
            if (leaves.length === 0) {
                // Close the Obsidian window
                window.close();
            }
        };
    }
    onload() {
        this.registerEvent(this.app.workspace.on('layout-change', this.handleLayoutChange));
    }
    onunload() {
        // Cleanup if necessary
    }
}
exports.default = CloseWindowWhenEmptyPlugin;
