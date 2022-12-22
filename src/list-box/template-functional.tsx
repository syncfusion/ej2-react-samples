/**
 * ListBox Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as data from './dataSource.json';
import './template.css';

function Template() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let dataA: { [key: string]: Object }[] = data["template_data"];

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section'>
                <div id="template-listbox-control">
                    <ListBoxComponent dataSource={dataA} itemTemplate='<div class="list-wrapper"><span class="${pic} e-avatar e-avatar-xlarge e-avatar-circle"></span><span class="text">${text}</span><span class="description">${description}</span></div>' />
                </div>
            </div>
            <div id='action-description'>
                <p>This sample demonstrates the Item template functionalities of a ListBox.
                    Here, SVG icons were used for visual representation of every list items. </p>
            </div>
            <div id='description'>
                <p>The <code>ListBox</code>is a graphical user interface component used to display a list of items. This sample illustrates how to integrate the item template to customize the
                    list item's content and this can be specified by using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#itemtemplate"><code>itemTemplate
                    </code></a> property.</p>
                <p>In this sample, data is bound to the ListBox using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#datasource"><code>dataSource
                </code></a> property.</p>
                <p> More information about the ListBox can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/list-box/getting-started" target="_blank"> documentation</a> section.
                </p>
            </div>
        </div>
    );
}
export default Template;