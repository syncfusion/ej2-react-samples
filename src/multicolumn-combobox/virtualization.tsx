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
        let names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emily Davis"];
        let departments = ["HR", "IT", "Finance", "Marketing", "Sales"];
        let roles = ["Manager", "Developer", "Analyst", "Consultant", "Executive"];
        let locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push({
                Name: names[Math.floor(Math.random() * names.length)],
                Department: departments[Math.floor(Math.random() * departments.length)],
                Role: roles[Math.floor(Math.random() * roles.length)],
                Location: locations[Math.floor(Math.random() * locations.length)]
            });
        }
        return result;
    };
    gridSettings: { rowHeight: 40 };
    fields: { text: 'Name', value: 'Name'};
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper virtualization-multicolumn'>
                        <div style={{ paddingTop: '55px' }}>
                        <label>Select an employee</label>
                            <MultiColumnComboBoxComponent type="text" dataSource={this.data(150)} enableVirtualization={true} fields={this.fields} placeholder='e.g. Alice Johnson' popupHeight={'230px'} popupWidth={'550px'} gridSettings={this.gridSettings}>
                                <ColumnsDirective>
                                    <ColumnDirective field='Name' header='Name' width={100}></ColumnDirective>
                                    <ColumnDirective field='Department' header='Department' width={100}></ColumnDirective>
                                    <ColumnDirective field='Role' header='Role' width={90}></ColumnDirective>
                                    <ColumnDirective field='Location' header='Location' width={90}></ColumnDirective>
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
