/**
 * MultiColumnComboBox Virtualization Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './virtualization.css';

export class Virtual extends SampleBase<{}, {}> {
    data: Function = (count: number) => {
        let names = ["John", "Alice", "Bob", "Mario Pontes", "Yang Wang", "Michael", "Nancy", "Robert King"];
        let hours = [8, 12, 16];
        let status = ["Pending", "Completed", "In Progress"];
        let designation = ["Engineer", "Manager", "Tester"];
        let result: Object[] = [];
        for (let i = 0; i < count; i++) {
            result.push({
                TaskID: i + 1,
                Engineer: names[Math.floor(Math.random() * names.length)],
                Designation: designation[Math.floor(Math.random() * designation.length)],
                Estimation: hours[Math.floor(Math.random() * hours.length)],
                Status: status[Math.floor(Math.random() * status.length)]
            });
        }
        return result;
    };
    gridSettings: { rowHeight: 40 };
    fields: { text: 'Engineer', value: 'TaskID'};
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper virtualization-multicolumn'>
                        <div style={{ paddingTop: '55px' }}>
                            <MultiColumnComboBoxComponent type="text" dataSource={this.data(150)} enableVirtualization={true} fields={this.fields} placeholder='Select an engineer' popupHeight={'230px'} gridSettings={this.gridSettings}>
                                <ColumnsDirective>
                                    <ColumnDirective field='TaskID' header='Task ID' width={100}></ColumnDirective>
                                    <ColumnDirective field='Engineer' header='Engineer' width={140}></ColumnDirective>
                                    <ColumnDirective field='Designation' header='Designation' width={130}></ColumnDirective>
                                    <ColumnDirective field='Estimation' header='Estimation' width={120}></ColumnDirective>
                                    <ColumnDirective field='Status' header='Status' width={120}></ColumnDirective>
                                </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This example demonstrates the virtualization support in the MultiColumn ComboBox. It has 150 items bound to it. However, when you open the suggestion list only few items are loaded based on the popup height and the remaining items are loaded while scrolling.</p>
                </div>

                <div id="description">
                    <p>The MultiColumn ComboBox supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the <code>enableVirtualization</code> property to <code>true</code>. When virtualization is enabled, MultiColumn ComboBox doesn't render the entire suggestion data source on initial rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling. Virtualization works with both local and remote data.</p>
                </div>
            </div>
        )
    }
}
