import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class AnomalyDetection extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-grid/images/anomaly-detection.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how the syncfusion React DataGrid, enhanced with AI, can detect anomalies within
                        its data.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>In this example, the DataGrid displays details like Machine ID, Voltage, Pressure, Temperature, Motor Speed, and
                        Production Rate. AI analyzes this data to identify unusual points and explains why they are considered
                        anomalies. When you press the "Detect Anomaly" button, the grid updates to display the anomaly details.
                    </p>
                </div>
            </div>
        )
    }
}