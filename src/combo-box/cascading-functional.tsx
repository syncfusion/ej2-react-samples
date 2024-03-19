/**
 * ComboBox Cscading Sample
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { updateSampleSection } from '../common/sample-base';
 import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
 import { Query } from '@syncfusion/ej2-data';
 import './cascading.css';
 import * as data from './dataSource.json';
 
function Cascading() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // country ComboBox instance
    let countryObj: ComboBoxComponent;
    // state ComboBox instance
    let stateObj: ComboBoxComponent;
    // city ComboBox instance
    let cityObj: ComboBoxComponent;
    const tempCountry:string = 'country';
    //define the country ComboBox data
    const countryData: { [key: string]: Object }[] =data[tempCountry];
    const tempState:string = 'state';
    //define the state ComboBox data
    const stateData: { [key: string]: Object }[] = data[tempState];
    const tempCity:string = 'cities';
    //define the city ComboBox data
    const cityData: { [key: string]: Object }[] = data[tempCity];
    // maps the country column to fields property
    const countryFields: Object = { value: 'CountryId', text: 'CountryName' };
    // maps the state column to fields property
    const stateFields: Object = { value: 'StateId', text: 'StateName' };
    // maps the city column to fields property
    const cityFields: Object = { text: 'CityName', value: 'CityId' };
    function countryChange(): void {
        // enable the state ComboBox
        stateObj.enabled = countryObj.value != null;
        // query the data source based on country ComboBox selected value
        let tempQuery: Query = new Query().where('CountryId', 'equal', countryObj.value as string);
        stateObj.query = tempQuery;
        // clear the existing selection in state ComboBox
        stateObj.text = null;
        // bind the property change to state ComboBox
        stateObj.dataBind();
        // clear the existing selection in city ComboBox
        cityObj.text = null;
        // disable the city ComboBox
        cityObj.enabled = false;
        // bind the property change to city ComboBox
        cityObj.dataBind();
    }
    function stateChange(): void {
        cityObj.enabled = true;
        // query the data source based on state ComboBox selected value
        let tempQuery1: Query = new Query().where('StateId', 'equal', stateObj.value as string);
        cityObj.query = tempQuery1;
        //clear the existing selection
        cityObj.text = null;
        // bind the property change to city ComboBox
        cityObj.dataBind();
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='cascade'>
                    <div style={{ paddingTop: '35px' }}>
                        <ComboBoxComponent id="countryList" dataSource={countryData} allowCustom={false} ref={(combobox) => {countryObj = combobox }} popupHeight="auto" fields={countryFields} change={countryChange.bind(this)} placeholder="Select a country" />
                    </div>
                    <div style={{ paddingTop: '35px' }}>
                        <ComboBoxComponent id="stateList" dataSource={stateData} allowCustom={false} ref={(combobox) => {stateObj = combobox }} popupHeight="auto" fields={stateFields} change={stateChange.bind(this)} enabled={false} placeholder="Select a state" />
                    </div>
                    <div style={{ paddingTop: '35px' }}>
                        <ComboBoxComponent id="cityList" dataSource={cityData} allowCustom={false} ref={(combobox) => {cityObj = combobox }} popupHeight="auto" fields={cityFields} enabled={false} placeholder="Select a city" />
                    </div>
                </div>
            </div>
            <div id="action-description">    
                <p>This sample demonstrates the cascading functionalities of the ComboBox. Choose a country from countries ComboBox, then respective states will be loaded in the second ComboBox
                 and the same has to done between states and cities ComboBox.</p>   
            </div>
            <div id="description">
                <p>The <code>Cascading</code> ComboBox is the series of ComboBox, where the value of one ComboBox depends on the another
                 ComboBox value. This can be configured by using the <code>change</code> event of parent ComboBox. Within
                 that change event handler, you should load the data to child ComboBox based on the selected value of parent ComboBox.</p>
                <p> More information on the Cascading feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/combo-box/how-to.html#configure-the-cascading-combobox" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Cascading;