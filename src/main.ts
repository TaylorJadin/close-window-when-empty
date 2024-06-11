import { Plugin } from 'obsidian';

export default class CloseWindowWhenEmptyPlugin extends Plugin {
    private initialLoad: boolean = true;

    onload() {
        this.registerEvent(this.app.workspace.on('layout-change', this.handleLayoutChange));
    }

    handleLayoutChange = () => {
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
    }

    onunload() {
        // Cleanup if necessary
    }
}
