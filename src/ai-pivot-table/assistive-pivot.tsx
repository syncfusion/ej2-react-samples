import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
import { AIAssistivePivot } from './frontend/ai-assistive-pivot';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
export class AssistivePivot extends SampleBase<{}, {}> {
    componentDidMount() {
        updateAISampleSection();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AIAssistivePivot />
                </div>
                <div id="action-description">
                    <p>
                        This demo showcases the <strong>Syncfusion React Pivot Table</strong> enhanced with our <strong>Syncfusion React AI AssistView</strong>, allowing you to perform complex data operations using natural language. Streamline your workflow by asking the component to sort, filter, drill down, add calculated fields, or apply conditional formatting—bypassing traditional UI interactions for faster analysis.
                    </p>
                    <p>
                        To explore more <strong>Syncfusion React Smart AI</strong> integrations locally, 
                        check out our <a href="https://github.com/syncfusion/smart-ai-samples/tree/master/react" target="_blank" rel="noopener noreferrer" aria-label="Open the Syncfusion Smart AI samples GitHub repository for React in a new tab"> React AI Demos on GitHub </a>.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        The <strong>Syncfusion React AI AssistView</strong> component is embedded directly within the Pivot Table interface, transforming data analysis. Through intelligent prompt processing, this integration empowers users to conversationally manage and visualize complex data faster than ever before.
                    </p>
                    <p>Key capabilities include:</p>
                    <ul>
                        <li><strong>Manage Pivot Fields:</strong> Use natural language to set rows, columns, values, and filters.</li>
                        <li><strong>Advanced Filtering:</strong> Apply member, label, and value-based filters with simple commands.</li>
                        <li><strong>Dynamic Sorting:</strong> Configure both standard and value-based sorting on the fly.</li>
                        <li><strong>Data Views:</strong> Expand or collapse fields, including individual drilled members.</li>
                        <li><strong>Calculated Fields:</strong> Define custom fields and formulas without complex syntax.</li>
                        <li><strong>Totals and Formatting:</strong> Toggle grand totals and subtotals, and manage conditional formatting rules.</li>
                        <li><strong>Chart Integration:</strong> Switch chart types while keeping display options synchronized.</li>
                    </ul>
                    <p>
                        By combining <strong>conversational AI</strong> with the Pivot Table’s multidimensional analysis, this solution simplifies workflows, making interactive reporting more intuitive, powerful, and highly adaptable.
                    </p>
                </div>
                <AIToast />
            </div>
        )
    }
}