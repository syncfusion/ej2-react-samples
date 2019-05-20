/**
 * ListBox Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as data from './dataSource.json';
import './default.css';

export class Default extends SampleBase<{}, {}> {
    public data: { [key: string]: Object }[] = data["info"];
    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section'>
                    <div id='listbox-control'>
                        <h4>Select your favorite car:</h4>
                        <ListBoxComponent dataSource={this.data} />
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the default functionalities of a ListBox. Click any item to select a single item or ctrl + click to select multiple items.</p>
                </div>
                <div id='description'>
                    <p>The <code>ListBox</code> is a graphical user interface component used to display a list of items. Users can select one or more items in the list using a checkbox or by keyboard selection.
                        It supports sorting, grouping, reordering, and drag and drop of items.</p>
                    <p>In this sample, data is bound to the ListBox using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#datasource"><code>dataSource
                        </code></a> property. You can select your favorite cars from the ListBox.</p>
                    <p> More information about the ListBox can be found in the
                        <a href="https://ej2.syncfusion.com/react/documentation/list-box/getting-started" target="_blank"> documentation</a> section.
                    </p>
                </div>
            </div>
        );
    }
}