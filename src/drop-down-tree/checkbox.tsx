import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import './checkbox.css';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './checkbox-data.json';

export class Checkbox extends SampleBase<{}, {}> {
    public ddtreeObj: DropDownTreeComponent;
    data = dataSource as any;
    private fields: Object = { dataSource: this.data.checkboxData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    private showCheckBox: boolean = true;
    public onChange(args: ChangeEventArgs): void {
        this.ddtreeObj.treeSettings.autoCheck = args.checked;
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8 control-section dropdowntree-check'>
                    <div className='control_wapper'>
                        {/* Render the Dropdown Tree with checkboxes */}
                        <DropDownTreeComponent fields={this.fields} ref={(scope) => { this.ddtreeObj = scope }} showCheckBox={this.showCheckBox} mode="Delimiter" placeholder="Select items" popupHeight="200px" />
                    </div>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id="check" label='Auto Check' change={this.onChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample explains you about the CheckBox functionalities of the Dropdown Tree. Click on any parent item's
                        CheckBox to check or uncheck the item and its child items. The parent item's checked state will be determined by
                        its child item’s checked state.</p>
                </div>
                <div id="description">
                    <p>The <code>Dropdown Tree</code> component can be rendered with the checkbox on the left side of each tree item.
                        This allows the user to check more than one item, and this can be enabled by the <code>showCheckBox</code>
                        property.</p>
                    <p>In this demo, the Dropdown Tree is populated with the checkbox enabled feature.</p>
                </div>
            </div>
        );
    }
}
