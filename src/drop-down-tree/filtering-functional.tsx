/**
 * Dropdown Tree Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import './filtering.css';
import * as dataSource from './filtering-data.json';

const Filtering = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data = dataSource as any;
    const fields: object = { dataSource: data.filterData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section dropdowntree-filtering'>
                <div className='control_wapper'>
                    <DropDownTreeComponent id="filter" filterBarPlaceholder='Search' allowFiltering={true} fields={fields} placeholder="Select an item" popupHeight="220px" />
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the filtering functionalities of the Dropdown Tree. Click the Dropdown Tree element, and then type a character in the search box. It will display the
                    filtered list items based on the typed characters.</p>
            </div>

            <div id="description">
                <p>The Dropdown Tree has the built-in support to filter the data source when the <code>allowFiltering</code> is enabled. It performs
                    when the characters are typed in the search box.</p>
            </div>
        </div>
    );
}
export default Filtering;