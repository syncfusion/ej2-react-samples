import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './cascading.css';
import * as data from './dataSource.json';
export class Cascading extends SampleBase {
    constructor() {
        super(...arguments);
        this.tempCountry = 'country';
        //define the country DropDownList data
        this.countryData = data[this.tempCountry];
        this.tempState = 'state';
        //define the state DropDownList data
        this.stateData = data[this.tempState];
        this.tempCity = 'cities';
        //define the city DropDownList data
        this.cityData = data[this.tempCity];
        // maps the country column to fields property
        this.countryFields = { value: 'CountryId', text: 'CountryName' };
        // maps the state column to fields property
        this.stateFields = { value: 'StateId', text: 'StateName' };
        // maps the city column to fields property
        this.cityFields = { text: 'CityName', value: 'CityId' };
    }
    countryChange() {
        this.stateObj.enabled = true;
        // query the data source based on country DropDownList selected value
        let tempQuery = new Query().where('CountryId', 'equal', this.countryObj.value);
        this.stateObj.query = tempQuery;
        // clear the existing selection.
        this.stateObj.text = null;
        // bind the property changes to state DropDownList
        this.stateObj.dataBind();
        // clear the existing selection.
        this.cityObj.text = null;
        this.cityObj.enabled = false;
        // bind the property changes to city DropDownList
        this.cityObj.dataBind();
    }
    stateChange() {
        this.cityObj.enabled = true;
        // query the data source based on state DropDownList selected value
        let tempQuery1 = new Query().where('StateId', 'equal', this.stateObj.value);
        this.cityObj.query = tempQuery1;
        // clear the existing selection.
        this.cityObj.text = null;
        // bind the property changes to city DropDownList
        this.cityObj.dataBind();
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div id='cascade'>
            <div style={{ paddingTop: '35px' }}>
              <DropDownListComponent id="country" dataSource={this.countryData} ref={(dropdownlist) => { this.countryObj = dropdownlist; }} fields={this.countryFields} popupHeight="auto" change={this.countryChange.bind(this)} placeholder="Select a country"/>
            </div>
            <div style={{ paddingTop: '35px' }}>
              <DropDownListComponent id="state" dataSource={this.stateData} ref={(dropdownlist) => { this.stateObj = dropdownlist; }} fields={this.stateFields} popupHeight="auto" change={this.stateChange.bind(this)} enabled={false} placeholder="Select a state"/>
            </div>
            <div style={{ paddingTop: '35px' }}>
              <DropDownListComponent id="city" dataSource={this.cityData} ref={(dropdownlist) => { this.cityObj = dropdownlist; }} fields={this.cityFields} enabled={false} popupHeight="auto" placeholder="Select a city"/>
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
                DropDownList.
            </p>
        
            <p>In this sample, if a country is selected from countries DropDownList, the respective states will be loaded in the second DropDownList
                and the same has to be done between states and cities DropDownList.</p>
            <p> More information on the Cascading feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/how-to.html#configure-the-cascading-combobox" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>);
    }
}
