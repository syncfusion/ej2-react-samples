import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import './custom-template.css';
import * as dataSource from './customTemplate-data.json';

function CustomTemplate() {
    React.useEffect(() => {
        updateSampleSection();
        }, [])
    let ddtreeObj: DropDownTreeComponent;
    let data = dataSource as any;
    let fields: Object = { dataSource: data.customTemplateData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    let showCheckBox: boolean = true;
    let treeSettings: Object = { autoCheck: true };
    let customTemplate: string = "${value.length} item(s) selected";
    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section dropdowntree-custom'>
                <div className='control_wapper'>
                    <DropDownTreeComponent fields={fields} treeSettings={treeSettings} customTemplate={customTemplate} showCheckBox={showCheckBox} mode="Custom" placeholder="Select items" popupHeight="200px" />
                </div>
            </div>
            <div id="action-description">
                <p>This sample explains you about the custom template support of the Dropdown Tree. When you click the checkbox, the selected items will be visualized based on the given custom template.
                </p>
            </div>
            <div id="description">
                <p>The <code>Dropdown Tree</code> component allows the user to select more than one value while enabling the checkbox or multi selection support.</p>
                <p>The user can visualize the custom template instead of the selected item texts in the Dropdown Tree by enabling the <code>mode</code> type as <code>Custom</code>. User can also customize the given template by using the <code>customTemplate</code> property.
                </p>
                <p>In this demo, the Dropdown Tree is populated with the checkbox and custom template feature.</p>
            </div>
        </div>
    );
}
export default CustomTemplate;
