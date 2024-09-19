import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SmartTaskPrioritizer extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-gantt/images/task-prioritizer.gif'} width='100%' alt="Showcase Text to MindMap Gif" height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how AI can prioritize tasks within a task collection. The AI evaluates baseline dates
                        and scheduled taskbar dates to identify critical tasks, which are crucial for meeting project deadlines. It then
                        reallocates resources to these critical tasks, ensuring efficient resource management and timely project
                        completion.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        The process begins with the AI identifying the critical tasks based on the project schedule. Following this, the
                        AI generates another prompt to reassign resources and provides a summary of the reallocation and critical task
                        details.
                    </p>
                </div>
            </div>
        )
    }
}