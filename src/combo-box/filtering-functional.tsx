/**
 * ComboBox Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import './filtering.css';
import * as data from './dataSource.json';

const Filtering = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'countries';
    //define the filtering data
    const searchData: { [key: string]: Object; }[] = data[temp];
    // maps the appropriate column to fields property
    const fields: Object = { text: 'Name', value: 'Code' };
    // filtering event handler to filter a Country
    const onFiltering = (e: FilteringEventArgs) => {
        let query: Query = new Query();
        //frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        //pass the filter data source, filter query to updateData method.
        e.updateData(searchData, query);
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='filtering'>
                    <ComboBoxComponent id="country" dataSource={searchData} filtering={onFiltering.bind(this)} allowFiltering={true} fields={fields} placeholder="Select a country" popupHeight="270px" />
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the filtering functionalities of the ComboBox. Type a character in ComboBox element and choose an item from the filtered list based on the typed characters.</p>
            </div>
            <div id="description">
                <p>The ComboBox has built-in support to filter the data source when <code>allowFiltering</code> is enabled. It performs
                    when characters are typed in the search box. In <code>filtering</code> event, you can filter down the data source and
                    return the resulted data to ComboBox via <code>updateData</code> method to display its list items.</p>
                <p>This sample illustrates that, query the data source and pass the resulted data to ComboBox through the <code>updateData</code> method in <code>filtering</code> event.</p>
                <p> More information on the filtering feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/combo-box/filtering.html" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Filtering;