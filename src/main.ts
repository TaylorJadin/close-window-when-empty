import { Plugin } from 'obsidian';

export default class CloseWindowWhenEmptyPlugin extends Plugin {
    private initialLoad: boolean = true;

    onload() {
        this.registerEvent(this.app.workspace.on('layout-change', this.handleLayoutChange));
    }

    handleLayoutChange = () => {
        const markdownLeaves = this.app.workspace.getLeavesOfType('markdown');
        const graphLeaves = this.app.workspace.getLeavesOfType('graph');
        const leaves = [...markdownLeaves, ...graphLeaves];

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
