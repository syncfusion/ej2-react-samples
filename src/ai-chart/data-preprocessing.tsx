import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
import { AIDataPreprocessing } from './data-preprocessing/frontend/ai-data-preprocessing';

/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
export class DataPreprocessing extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AIDataPreprocessing />
                </div>
                <div id="action-description">
                    <p> This sample demonstrates AI-powered data cleaning and preprocessing for an e-commerce website's hourly traffic data. Click the <strong>AI Clean</strong> button to automatically fill missing values and resolve outliers with the help of the AI assist service.</p>
                </div>
                <div id='description'>
                     <p>
                        The chart visualises hourly visitor counts for a single day. Several
                        hourly slots are intentionally left as <code>null</code> in the
                        original data so that the AI can impute them. The <strong>AI Clean</strong> action sends the dataset to the AI
                        service, which returns a cleaned version that fills the gaps and
                        smooths outliers. Originally missing slots are highlighted in
                        <code>#D84227</code> so they remain visually distinguishable from
                        real, observed values.
                      </p>
                      <p>
                        <strong>Injecting Module</strong>
                      </p>
                      <p>
                        To render a <code>MultiColoredLine</code> series, inject the
                        <code>MultiColoredLineSeries</code> and <code>LineSeries</code>
                        modules into <code>services</code>. The colour of each point is
                        driven by a <code>pointColorMapping</code> field, so missing
                        values can be drawn in a distinct colour without a second series.
                      </p>
                </div>
                <AIToast/> 
            </div>
        )
    }
}