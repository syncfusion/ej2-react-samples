import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import './custom-template.css';
import * as dataSource from './customTemplate-data.json';

export class CustomTemplate extends SampleBase<{}, {}> {
    public ddtreeObj: DropDownTreeComponent;
    data = dataSource as any;
    private fields: Object = { dataSource: this.data.customTemplateData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    private showCheckBox: boolean = true;
    private treeSettings: Object = { autoCheck: true };
    private customTemplate: string = "${value.length} item(s) selected";
    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section dropdowntree-custom'>
                    <div className='control_wapper'>
                        <DropDownTreeComponent fields={this.fields} treeSettings={this.treeSettings} customTemplate={this.customTemplate} showCheckBox={this.showCheckBox} mode="Custom" placeholder="Select items" popupHeight="200px" />
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample explains you about the custom template support of the Dropdown Tree. When you click the checkbox, the selected items will be visualized based on the given custom template.
                    </p>
                </div>
                <div id="description">
                    <p>The <code>Dropdown Tree</code> component allows the user to select more than one value while enabling the checkbox or multi selection support.</p>
                    <p>The user can visualize the custom template instead of the selected item texts in the Dropdown Tree by enabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#mode">mode</a> type as <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#customTemplate">Custom</a>. User can also customize the given template by using the <code>customTemplate</code> property.
                    </p>
                    <p>In this demo, the Dropdown Tree is populated with the checkbox and custom template feature.</p>
                </div>
            </div>
        );
    }
}
