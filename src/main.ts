import { Plugin, WorkspaceLeaf } from 'obsidian';

// Dev mode flag - set to false for production builds
const __DEV__ = false;

// Dev logging helper - will be stripped in production
function devLog(...args: any[]) {
    if (__DEV__) {
        console.log(...args);
    }
}

export default class CloseWindowWhenEmptyPlugin extends Plugin {
    private initialLoad: boolean = true;
    private previousNumOpenTabs: number | null = null;

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
        const currentEmptyLeavesCount = emptyLeaves.length;

        // On initial load, just store the initial state and return
        if (this.initialLoad) {
            this.initialLoad = false;
            this.previousNumOpenTabs = numOpenTabs;
            devLog('[CloseWindowWhenEmpty] Initial load:', {
                numOpenTabs,
                currentEmptyLeavesCount
            });
            return;
        }

        // Check if we should close: previous layout had numOpenTabs: 1, 
        // and current layout has numOpenTabs: 1 and currentEmptyLeavesCount: 1
        const shouldClose = this.previousNumOpenTabs === 1 && 
            numOpenTabs === 1 && 
            currentEmptyLeavesCount === 1;

        devLog('[CloseWindowWhenEmpty] Layout change:', {
            previousNumOpenTabs: this.previousNumOpenTabs,
            numOpenTabs,
            currentEmptyLeavesCount,
            shouldClose
        });

        // Only close when one layout change with numOpenTabs: 1 is followed by 
        // a layout change with numOpenTabs: 1 and currentEmptyLeavesCount: 1
        if (shouldClose) {
            devLog('[CloseWindowWhenEmpty] Closing window...');
            // Close the Obsidian window
            window.close();
        }

        // Update previous state for next layout change
        this.previousNumOpenTabs = numOpenTabs;
    }

    onunload() {
        // Cleanup if necessary
    }
}
