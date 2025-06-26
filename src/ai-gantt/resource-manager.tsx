import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class SmartResourceAllocation extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-gantt/images/resource-manager.gif'} width='100%' alt="Showcase Text to MindMap Gif" height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to efficiently manage resource overallocation by reallocating available resources to
                        tasks. It visually updates the Gantt Chart by changing the color of the taskbars to reflect the reallocated
                        tasks, allowing for better tracking and management of resource usage. The process helps ensure that no single
                        resource is overburdened, maintaining an optimized workflow.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        The sample reallocates tasks to prevent resource overallocation. The reallocation process involves interacting
                        with the <strong>TaskCollection</strong>, <strong>ResourceCollection</strong>, and <strong>AssignmentCollection</strong> to generate a new assignment collection.
                        This new collection resolves any overallocated tasks by redistributing them within the same resource, ensuring
                        balanced resource utilization. Taskbar colors are updated accordingly to indicate the changes in allocation,
                        providing clear visual feedback on the resource adjustments.
                    </p>
                </div>
                <AIToast/>
            </div>
        )
    }
}