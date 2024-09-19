import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SmartPivot extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-pivot-table/images/smart-pivot.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This demo showcases the integration of AI with the Syncfusion React Pivot Table, designed to dynamically
                        visualize
                        and analyze data based on user queries. By leveraging advanced AI capabilities, this integration simplifies the
                        process of extracting valuable insights from various data categories, making complex </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        This showcase highlights the advanced capabilities of the Syncfusion React Pivot Table integrated with AI,
                        designed to streamline data exploration and visualization. Leveraging AI-driven features like Smart Data
                        Aggregation, Predictive Modeling, and Adaptive Filtering, this sample demonstrates how the Pivot Table can
                        automatically generate and adjust pivot tables based on user queries.
                    </p>
                    <p>
                        Users can interact with the React Pivot Table in real-time to experience the power of AI-assisted data analysis.
                        By selecting and updating queries through the AI Assist dialog UI, the Pivot Table dynamically recalculates and
                        displays relevant insights, offering a more intuitive and responsive way to explore data.
                    </p>
                </div>
            </div>
        )
    }
}