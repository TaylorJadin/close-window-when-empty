import { Plugin, WorkspaceLeaf } from 'obsidian';

export default class CloseWindowWhenEmptyPlugin extends Plugin {
    private initialLoad: boolean = true;
    private previousNumOpenTabs: number | null = null;
    private previousEmptyLeavesCount: number | null = null;

    onload() {
        this.registerEvent(this.app.workspace.on('layout-change', this.handleLayoutChange));
    }

    handleLayoutChange = () => {
        let numOpenTabs = 0;
        let numNonEmptyTabs = 0;
    
        // Count the number of open tabs and non-empty tabs
        this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
            if (leaf.getRoot() === this.app.workspace.rootSplit) {
                numOpenTabs++;
                if (leaf.view.getViewType() !== 'empty') {
                    numNonEmptyTabs++;
                }
            }
        });

        // Count the number of empty tabs
        const emptyLeaves = this.app.workspace.getLeavesOfType('empty');
        const currentEmptyLeavesCount = emptyLeaves.length;

        // On initial load, just store the initial state and return
        if (this.initialLoad) {
            this.initialLoad = false;
            this.previousNumOpenTabs = numOpenTabs;
            this.previousEmptyLeavesCount = currentEmptyLeavesCount;
            console.log('[CloseWindowWhenEmpty] Initial load:', {
                numOpenTabs,
                numNonEmptyTabs,
                currentEmptyLeavesCount
            });
            return;
        }

        // Check if we should close: previous layout had numOpenTabs: 1, 
        // and current layout has numOpenTabs: 1 and currentEmptyLeavesCount: 1
        const shouldClose = this.previousNumOpenTabs === 1 && 
            numOpenTabs === 1 && 
            currentEmptyLeavesCount === 1;
        
        console.log('[CloseWindowWhenEmpty] Layout change:', {
            previousNumOpenTabs: this.previousNumOpenTabs,
            previousEmptyLeavesCount: this.previousEmptyLeavesCount,
            numOpenTabs,
            numNonEmptyTabs,
            currentEmptyLeavesCount,
            shouldClose,
            closeCondition: {
                'previousNumOpenTabs === 1': this.previousNumOpenTabs === 1,
                'numOpenTabs === 1': numOpenTabs === 1,
                'currentEmptyLeavesCount === 1': currentEmptyLeavesCount === 1
            }
        });

        // Only close when one layout change with numOpenTabs: 1 is followed by 
        // a layout change with numOpenTabs: 1 and currentEmptyLeavesCount: 1
        if (shouldClose) {
            console.log('[CloseWindowWhenEmpty] Closing window...');
            // Close the Obsidian window
            window.close();
        }

        // Update previous state for next layout change
        this.previousNumOpenTabs = numOpenTabs;
        this.previousEmptyLeavesCount = currentEmptyLeavesCount;
    }

    onunload() {
        // Cleanup if necessary
    }
}
