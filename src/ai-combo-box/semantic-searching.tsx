import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class ComboBoxSemanticSearch extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-combo-box/images/semantic-search.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This demo highlights the advanced capabilities of the Syncfusion React ComboBox, specifically focusing on
                        the Semantic Search feature:
                    </p>
                    <p>
                        <strong>Semantic Search:</strong> Users can search for items based on the meaning and context of their queries,
                        rather than relying solely on exact keyword matches. This AI-driven feature enhances search accuracy by
                        understanding the intent behind user inputs, delivering more relevant and intuitive results. It is especially
                        beneficial in applications where finding the right item quickly is crucial.
                    </p>
                    <p>
                        This feature makes the Syncfusion React ComboBox a powerful tool for creating more intelligent and
                        responsive search interfaces.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react' aria-label="Navigate to explore the syncfusion JavaScript AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        <strong>Semantic Search:</strong> The Semantic Search feature empowers users to find items by interpreting the
                        context and meaning of their search queries. Unlike traditional search methods that depend on exact keyword
                        matches, Semantic Search understands the intent behind the query, offering more accurate and relevant results.
                        This enhances user experience, particularly in complex or large datasets, by making search interactions more
                        intuitive and effective.
                    </p>
                </div>
                <AIToast/>
            </div>
        )
    }
}