import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './multiple-selection.css';
import * as dataSource from './multiSelect-data.json';

export class MultiSelect extends SampleBase<{}, {}> {
  data = dataSource as any;
  private fields: Object = { dataSource: this.data.multiSelectData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
  private allowMultiSelection: boolean = true;

  render() {
    return (
      <div className='control-pane'>
        <div className='col-lg-12 control-section dropdowntree-multi'>
          <div className='control_wapper'>
            {/* Render the Dropdown Tree with item multi select option */}
            <DropDownTreeComponent fields={this.fields} allowMultiSelection={this.allowMultiSelection} placeholder="Select items" popupHeight="200px" />
          </div>
        </div>
        <div id="action-description">
          <p>This sample explains you about the multiple item selection functionalities of the Dropdown Tree. To select multiple
            items, you may press and hold the CTRL key and then select the desired items; or select any item by selecting it and
            then press and hold the SHIFT key to select a range of items continuously.</p>
        </div>

        <div id="description">
          <p>The <code>Dropdown Tree</code> component allows you to select multiple items by enabling the
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#allowmultiselection">allowMultiSelection</a> property.</p>
          <p>In this demo, the Dropdown Tree is enabled with multiple selection.</p>
        </div>
      </div>
    )
  }
}
