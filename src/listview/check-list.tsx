/**
 * ListView CheckList Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';
import{ flatList, groupData } from './listData';

export class Checklist extends SampleBase<{}, {}> {


    //Map the appropriate columns to fields property
    public fields: Object = { groupBy: 'category' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div id="flat-list">
                <h4>Flat List</h4>

                {/* ListView element */}
                <ListViewComponent id="sample-list-flat" dataSource={flatList} showCheckBox={true}></ListViewComponent>
            </div>
            <div id="group-list">
                <h4>Group List</h4>

                {/* Group ListView element */}
                <ListViewComponent id="sample-list-group" dataSource={groupData} fields={this.fields}
				showCheckBox = {true}></ListViewComponent>
            </div>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the checkbox functionalities of the ListView. Click multiple list item to check or uncheck the items.</p>
        </div>

        <div id="description" className="descriptionLayout">
            <p>The ListView component has checkbox feature, which is used to select multiple items from the list. This feature can be enabled using the 
               <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view/#showcheckbox'>showCheckBox</a></code>property.</p>
                    
            <p>In this sample, the checkbox is enabled on default list and group list.</p>
        </div>
      </div>
    )
  }
}