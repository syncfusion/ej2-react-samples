import * as React from 'react';
import { ListBoxComponent, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as data from './dataSource.json';
import './api.css';
export class Api extends SampleBase {
    constructor() {
        super();
        // Set the vegetableData to the data source.
        this.data = data["vegetableData"];
        this.ddlData1 = data["sort"];
        this.ddlData2 = data["selectionMode"];
        // Map the appropriate columns to fields property along with groupBy option.
        this.fields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
        this.ddlFields = { text: 'type', value: 'type' };
        this.state = {
            sortOrder: 'None',
            selectionSettings: { mode: 'Multiple' }
        };
    }
    sortChange(args) {
        this.setState({ sortOrder: args.value });
    }
    selectionChange(args) {
        this.setState({ selectionSettings: { mode: args.value } });
    }
    render() {
        return (<div className='control-pane'>
                <div className="col-lg-8 control-section">
                    <div id="listbox-api-control">
                        <ListBoxComponent dataSource={this.data} fields={this.fields} sortOrder={this.state.sortOrder} selectionSettings={this.state.selectionSettings}/>
                    </div>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%', paddingTop: '10px' }}>
                                        <div>Sort order</div>
                                    </td>
                                    <td style={{ width: '50%', paddingTop: '10px' }}>
                                        <div style={{ maxWidth: '200px' }}>
                                            <DropDownListComponent dataSource={this.ddlData1} fields={this.ddlFields} change={this.sortChange.bind(this)} value='None' popupHeight='200px'/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', paddingTop: '10px' }}>
                                        <div>Selection Mode</div>
                                    </td>
                                    <td style={{ width: '50%', paddingTop: '10px' }}>
                                        <div style={{ maxWidth: '200px' }}>
                                            <DropDownListComponent dataSource={this.ddlData2} fields={this.ddlFields} change={this.selectionChange.bind(this)} value='Multiple' popupHeight='200px'/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the API functionalities of the ListBox component by using its properties from the property pane. Select any combination of properties from the property pane to achieve desired functionalities in ListBox.</p>
                </div>
                <div id='description'>
                    <p>In this demo, a ListBox is rendered with grouping feature by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/fieldSettingsModel/#groupby"><code>groupBy</code></a> property
                        in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/list-box/#fields"><code>fields</code></a> property. This sample has been showcased with following set of properties,</p>
                    <ul>
                        <li>You can switch to <code>Single</code> or <code>Multiple</code> selection mode by selecting the mode from the selection mode dropdown list.</li>
                        <li>You can switch to <code>None</code>, <code>Ascending</code>, or <code>Descending</code> sort orders by selecting the sort order from the sort order dropdown list.</li>
                    </ul>
                    <p>In this sample, by default, grouping is enabled and vegetableData is grouped based on its category. The user can change the sort order and selection type using dropdownlist.</p>
                    <p>More information about the ListBox api can be found in the
                        <a href="https://ej2.syncfusion.com/react/documentation/api/list-box/" target="_blank"> documentation</a> section.
                    </p>
                </div>
            </div>);
    }
}
