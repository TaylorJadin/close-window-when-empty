import { Plugin, WorkspaceLeaf } from 'obsidian';

export default class CloseWindowWhenEmptyPlugin extends Plugin {
    private initialLoad: boolean = true;

    onload() {
        this.registerEvent(this.app.workspace.on('layout-change', this.handleLayoutChange));
    }

    handleLayoutChange = () => {
        let numOpenTabs = 0;
    
        // Count the number of open tabs
        this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
            if (leaf.getRoot() === this.app.workspace.rootSplit) {
                numOpenTabs++;
            }
        });

        // Count the number of empty tabs
        const emptyLeaves = this.app.workspace.getLeavesOfType('empty');

        // Debug stuff
        // const activeLeaf = this.app.workspace.activeLeaf;
        // console.log('Number of open tabs in main view:', numOpenTabs);
        // if (activeLeaf) {
        //     console.log('Active leaf type:', activeLeaf.view.getViewType());
        // } else {
        //     console.log('No active leaf');
        // }

        // Avoid closing the window on the initial load
        if (this.initialLoad) {
            this.initialLoad = false;
            return;
        }

        // Close the window if there is only one tab and the active leaf type is "empty"
        if (numOpenTabs === 1 && (emptyLeaves.length === 1)) {
            // Close the Obsidian window
            window.close();
        }
    }

    onunload() {
        // Cleanup if necessary
    }
}
