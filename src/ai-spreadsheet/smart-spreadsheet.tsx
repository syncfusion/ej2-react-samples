import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SmartSpreadsheet extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-spreadsheet/images/spreadsheet.gif'} width='100%' height='100%'></img>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the integration of AI to automatically analyze content, generate formulas, and validate
                        them in the Spreadsheet.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>In this sample, a tab labeled <code>AI Assistant</code> provides access to AI-powered features. Users can utilize
                        the following capabilities:</p>
                    <ul>
                        <li><strong>Full Sheet Analysis:</strong> Analyzes the data in the sheet and provides a summary of the details.
                        </li>
                        <li><strong>Validate:</strong> Validates the formulas in the current selection and updates the details as notes
                            in the corresponding cells.</li>
                        <li><strong>Generate Formula:</strong> Generates formulas based on user requirements using the AI AssistView.
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}