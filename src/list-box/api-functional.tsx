/**
 * ListBox API Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState } from "react";
import { ListBoxComponent, DropDownListComponent, FieldSettingsModel, ChangeEventArgs, SelectionSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { SortOrder } from '@syncfusion/ej2-lists';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as data from './dataSource.json';
import './api.css';

function Api() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const [state, setState] = useState({
        sortOrder: 'None',
        selectionSettings: { mode: 'Multiple' } as SelectionSettingsModel
    });
    // Set the vegetableData to the data source.
    let dataA = data["vegetableData"];
    let ddlData1 = data["sort"]; let ddlData2 = data["selectionMode"];
    // Map the appropriate columns to fields property along with groupBy option.
    let fields: FieldSettingsModel = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    let ddlFields: FieldSettingsModel = { text: 'type', value: 'type' };
    function sortChange(args: ChangeEventArgs) {
        setState({ ...state, sortOrder: args.value as SortOrder });
    }
    function selectionChange(args: ChangeEventArgs) {
        setState({ ...state, selectionSettings: { mode : args.value } as SelectionSettingsModel });
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-8 control-section">
                <div id="listbox-api-control">
                    <ListBoxComponent dataSource={dataA} fields={fields} sortOrder={state.sortOrder as SortOrder} selectionSettings={state.selectionSettings as SelectionSettingsModel} />
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
                                        <DropDownListComponent dataSource={ddlData1} fields={ddlFields} change={sortChange} value='None' popupHeight='200px' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '50%', paddingTop: '10px' }}>
                                    <div>Selection Mode</div>
                                </td>
                                <td style={{ width: '50%', paddingTop: '10px' }}>
                                    <div style={{ maxWidth: '200px' }}>
                                        <DropDownListComponent dataSource={ddlData2} fields={ddlFields} change={selectionChange} value='Multiple' popupHeight='200px' />
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
        </div>
    );
}
export default Api;