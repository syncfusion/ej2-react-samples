import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class NaturalLanguageQuery extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-querybuilder/images/natural-languagequery.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        Natural Language Querying in the Query Builder allows users to construct complex queries using plain, everyday
                        language. Instead of relying on technical query syntax, users can simply type their questions or requests as
                        they would naturally speak them. This feature interprets the intent and generates the corresponding query,
                        making data retrieval more accessible to non-technical users.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        The Natural Language Querying feature enables users to input queries in plain language, which the system then
                        interprets to automatically generate the appropriate database queries. This simplifies the process of data
                        retrieval, allowing users to obtain insights without needing to understand complex query syntax.
                    </p>
                </div>
            </div>
        )
    }
}