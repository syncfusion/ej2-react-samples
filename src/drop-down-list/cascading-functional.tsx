/**
 * DropDownList Cascading Sample
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { updateSampleSection } from '../common/sample-base';
 import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
 import { Query } from '@syncfusion/ej2-data';
 import './cascading.css';
 import * as data from './dataSource.json';
 
function Cascading(){
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // country DropDownList instance
    let countryObj: DropDownListComponent;
    // state DropDownList instance
    let stateObj: DropDownListComponent;
    // city DropDownList instance
    let cityObj: DropDownListComponent;
    const tempCountry:string = 'country';
    //define the country DropDownList data
    const countryData: { [key: string]: Object }[] = data[tempCountry];
    const tempState:string = 'state';
    //define the state DropDownList data
    const stateData: { [key: string]: Object }[] = data[tempState];
    const tempCity:string = 'cities';
    //define the city DropDownList data
    const cityData: { [key: string]: Object }[] = data[tempCity];
    // maps the country column to fields property
    const countryFields: Object = { value: 'CountryId', text: 'CountryName' };
    // maps the state column to fields property
    const stateFields: Object = { value: 'StateId', text: 'StateName' };
    // maps the city column to fields property
    const cityFields: Object = { text: 'CityName', value: 'CityId' };
    function countryChange(): void {
        stateObj.enabled = countryObj.value != null;
        // query the data source based on country DropDownList selected value
        let tempQuery: Query = new Query().where('CountryId', 'equal', countryObj.value);
        stateObj.query = tempQuery;
        // clear the existing selection.
        stateObj.text = null;
        // bind the property changes to state DropDownList
        stateObj.dataBind();
        // clear the existing selection.
        cityObj.text = null;
        cityObj.enabled = false;
        // bind the property changes to city DropDownList
        cityObj.dataBind();
    }
    function stateChange(): void {
        cityObj.enabled = true;
        // query the data source based on state DropDownList selected value
        let tempQuery1: Query = new Query().where('StateId', 'equal', stateObj.value);
        cityObj.query = tempQuery1;
        // clear the existing selection.
        cityObj.text = null;
        // bind the property changes to city DropDownList
        cityObj.dataBind();
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='cascade'>
                    <div style={{ paddingTop: '35px' }}>
                        <DropDownListComponent id="country" dataSource={countryData} ref={(dropdownlist) => {countryObj = dropdownlist }} fields={countryFields} popupHeight="auto" change={countryChange.bind(this)} placeholder="Select a country" />
                    </div>
                    <div style={{ paddingTop: '35px' }}>
                        <DropDownListComponent id="state" dataSource={stateData} ref={(dropdownlist) => {stateObj = dropdownlist }} fields={stateFields} popupHeight="auto" change={stateChange.bind(this)} enabled={false} placeholder="Select a state" />
                    </div>
                    <div style={{ paddingTop: '35px' }}>
                        <DropDownListComponent id="city" dataSource={cityData} ref={(dropdownlist) => {cityObj = dropdownlist }} fields={cityFields} enabled={false} popupHeight="auto" placeholder="Select a city" />
                    </div>
                </div>
            </div>
            <div id="action-description">    
                <p>This sample demonstrates the cascading functionalities of the DropDownList. Choose a country from the countries DropDownList, then respective states will be loaded in the second DropDownList
                 and the same has to be done between states and cities DropDownList.</p>   
            </div>
            <div id="description">
                <p>The <code>Cascading</code> DropDownList is the series of DropDownList, where the value of one DropDownList depends on
                 the another DropDownList value. This can be configured by using the <code>change</code> event of parent DropDownList.
                 Within that change event handler, you should load the data to child DropDownList based on the selected value of parent
                 DropDownList.</p>
                <p>In this sample, if a country is selected from countries DropDownList, the respective states will be loaded in the second DropDownList
                 and the same has to be done between states and cities DropDownList.</p>
                <p> More information on the Cascading feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/how-to.html#configure-the-cascading-combobox" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Cascading;