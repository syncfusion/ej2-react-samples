/**
 * DropDownList Cascading Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './cascading.css';

export class Cascading extends SampleBase<{}, {}> {

  // country DropDownList instance
  private countryObj: DropDownListComponent;
  // state DropDownList instance
  private stateObj: DropDownListComponent;
  // city DropDownList instance
  private cityObj: DropDownListComponent;
  //define the country DropDownList data
  private countryData: { [key: string]: Object }[] = [
    { CountryName: 'Australia', CountryId: '2' },
    { CountryName: 'United States', CountryId: '1' }
  ];
  //define the state DropDownList data
  private stateData: { [key: string]: Object }[] = [
    { StateName: 'New York', CountryId: '1', StateId: '101' },
    { StateName: 'Queensland', CountryId: '2', StateId: '104' },
    { StateName: 'Tasmania ', CountryId: '2', StateId: '105' },
    { StateName: 'Victoria', CountryId: '2', StateId: '106' },
    { StateName: 'Virginia ', CountryId: '1', StateId: '102' },
    { StateName: 'Washington', CountryId: '1', StateId: '103' }
  ];
  //define the city DropDownList data
  private cityData: { [key: string]: Object }[] = [
    { CityName: 'Aberdeen', StateId: '103', CityId: 207 },
    { CityName: 'Alexandria', StateId: '102', CityId: 204 },
    { CityName: 'Albany', StateId: '101', CityId: 201 },
    { CityName: 'Beacon ', StateId: '101', CityId: 202 },
    { CityName: 'Brisbane ', StateId: '104', CityId: 211 },
    { CityName: 'Cairns', StateId: '104', CityId: 212 },
    { CityName: 'Colville ', StateId: '103', CityId: 208 },
    { CityName: 'Devonport', StateId: '105', CityId: 215 },
    { CityName: 'Emporia', StateId: '102', CityId: 206 },
    { CityName: 'Geelong', StateId: '106', CityId: 218 },
    { CityName: 'Hampton ', StateId: '102', CityId: 205 },
    { CityName: 'Healesville ', StateId: '106', CityId: 217 },
    { CityName: 'Hobart', StateId: '105', CityId: 213 },
    { CityName: 'Launceston ', StateId: '105', CityId: 214 },
    { CityName: 'Lockport', StateId: '101', CityId: 203 },
    { CityName: 'Melbourne', StateId: '106', CityId: 216 },
    { CityName: 'Pasco', StateId: '103', CityId: 209 },
    { CityName: 'Townsville', StateId: '104', CityId: 210 }
  ];
  // maps the country column to fields property
  private countryFields: Object = { value: 'CountryId', text: 'CountryName' };
  // maps the state column to fields property
  private stateFields: Object = { value: 'StateId', text: 'StateName' };
  // maps the city column to fields property
  private cityFields: Object = { text: 'CityName', value: 'CityId' };

  public countryChange(): void {
    this.stateObj.enabled = true;
    // query the data source based on country DropDownList selected value
    let tempQuery: Query = new Query().where('CountryId', 'equal', this.countryObj.value);
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
  public stateChange(): void {
    this.cityObj.enabled = true;
    // query the data source based on state DropDownList selected value
    let tempQuery1: Query = new Query().where('StateId', 'equal', this.stateObj.value);
    this.cityObj.query = tempQuery1;
    // clear the existing selection.
    this.cityObj.text = null;
    // bind the property changes to city DropDownList
    this.cityObj.dataBind();
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='cascade'>
            <div style={{ paddingTop: '35px' }}>
              <DropDownListComponent id="country" dataSource={this.countryData} ref={(dropdownlist) => { this.countryObj = dropdownlist }} fields={this.countryFields} popupHeight="auto" change={this.countryChange.bind(this)} placeholder="Select a country" />
            </div>
            <div style={{ paddingTop: '35px' }}>
              <DropDownListComponent id="state" dataSource={this.stateData} ref={(dropdownlist) => { this.stateObj = dropdownlist }} fields={this.stateFields} popupHeight="auto" change={this.stateChange.bind(this)} enabled={false} placeholder="Select a state" />
            </div>
            <div style={{ paddingTop: '35px' }}>
              <DropDownListComponent id="city" dataSource={this.cityData} ref={(dropdownlist) => { this.cityObj = dropdownlist }} fields={this.cityFields} enabled={false} popupHeight="auto" placeholder="Select a city" />
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
                <a href="http://ej2.syncfusion.com/documentation/drop-down-list/how-to.html#configure-the-cascading-combobox" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}