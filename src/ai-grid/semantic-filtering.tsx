import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SemanticFiltering extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-grid/images/semantic-filtering.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how the syncfusion React DataGrid, integrated with AI, supports Semantic Search.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react'
                        aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                </div>
                <div id="description">
                    <p>In this example, the DataGrid displays diagnostic information from medical reports. With Semantic Search, you
                        don’t need to enter the exact word to find related information. For instance, if the DataGrid lists "Abdominal
                        pain," it can still show relevant reports even if you search for "stomach" instead of the exact term. The grid
                        dynamically displays related search results using AI.
                    </p>
                </div>
            </div>
        )
    }
}