/**
 * ListView Default Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import { flatList, groupData } from './listData';
import './listview.css';
export class Default extends SampleBase<{}, {}> {
    
    //Map the appropriate columns to fields property
    public fields: Object = { groupBy: 'category' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div id="flat-list">
                <h4>Flat List</h4>

                {/* ListView element */}
                <ListViewComponent id="sample-list-flat" dataSource={flatList}></ListViewComponent>
            </div>
            <div id="group-list">
                <h4>Group List</h4>

                {/* Group ListView element */}
                <ListViewComponent id="sample-list-group" dataSource={groupData} fields={this.fields}></ListViewComponent>
            </div>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the default functionalities of the ListView. Click any item from the list to select and highlight it.</p>
        </div>

        <div id="description" className="descriptionLayout">
            <p>The ListView component represents data in interactive hierarchical structure interface across different layouts or views, that also has the features such as data binding, template rendering, and grouping.</p>

            <p>The group list allows you to group the relevant items under a logical category by mapping the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view/fieldSettings/#groupby'>groupBy</a></code> field.</p>

            <p>In this sample, <b>Cars</b> are grouped based on their <b>Category</b>.</p>
        </div>
      </div>
    )
  }
}