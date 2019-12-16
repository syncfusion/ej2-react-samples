/**
 * ListView Default Sample
 */
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import { flatList, groupData } from './listData';
import './listview.css';
export class Default extends SampleBase {
    constructor() {
        super(...arguments);
        //Map the appropriate columns to fields property
        this.fields = { groupBy: 'category' };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <div id="flat-list">
                <h4>Flat List</h4>

                
                <ListViewComponent id="sample-list-flat" dataSource={flatList}></ListViewComponent>
            </div>
            <div id="group-list">
                <h4>Group List</h4>

                
                <ListViewComponent id="sample-list-group" dataSource={groupData} fields={this.fields}></ListViewComponent>
            </div>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the default functionalities of the ListView. Click any list item to select and highlight an item.</p>
        </div>

        <div id="description" className="descriptionLayout">
            <p>ListView component represent data in interactive hierarchical structure interface across different layouts or views, that also has the features of data-binding, template rendering, and grouping.</p>

            <p>The group list allows to group the relevant items under a logical category by mapping the <code>groupBy</code> field.</p>

            <p>In this sample, <b>Cars</b> are grouped based on their <b>category</b>.</p>
        </div>
      </div>);
    }
}
