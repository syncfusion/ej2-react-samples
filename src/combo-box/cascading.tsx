/**
 * ComboBox Cscading Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './cascading.css';
import * as data from './dataSource.json';

export class Cascading extends SampleBase<{}, {}> {

  // country ComboBox instance
  private countryObj: ComboBoxComponent;
  // state ComboBox instance
  private stateObj: ComboBoxComponent;
  // city ComboBox instance
  private cityObj: ComboBoxComponent;
  private tempCountry:string = 'country';
  //define the country ComboBox data
  private countryData: { [key: string]: Object }[] =data[this.tempCountry];
  private tempState:string = 'state';
  //define the state ComboBox data
  private stateData: { [key: string]: Object }[] = data[this.tempState];
  private tempCity:string = 'cities';
  //define the city ComboBox data
  private cityData: { [key: string]: Object }[] = data[this.tempCity];
  // maps the country column to fields property
  private countryFields: Object = { value: 'CountryId', text: 'CountryName' };
  // maps the state column to fields property
  private stateFields: Object = { value: 'StateId', text: 'StateName' };
  // maps the city column to fields property
  private cityFields: Object = { text: 'CityName', value: 'CityId' };

  public countryChange(): void {
    // enable the state ComboBox
    this.stateObj.enabled = true;
    // query the data source based on country ComboBox selected value
    let tempQuery: Query = new Query().where('CountryId', 'equal', this.countryObj.value);
    this.stateObj.query = tempQuery;
    // clear the existing selection in state ComboBox
    this.stateObj.text = null;
    // bind the property change to state ComboBox
    this.stateObj.dataBind();
    // clear the existing selection in city ComboBox
    this.cityObj.text = null;
    // disable the city ComboBox
    this.cityObj.enabled = false;
    // bind the property change to city ComboBox
    this.cityObj.dataBind();
  }
  public stateChange(): void {
    this.cityObj.enabled = true;
    // query the data source based on state ComboBox selected value
    let tempQuery1: Query = new Query().where('StateId', 'equal', this.stateObj.value);
    this.cityObj.query = tempQuery1;
    //clear the existing selection
    this.cityObj.text = null;
    // bind the property change to city ComboBox
    this.cityObj.dataBind();
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='cascade'>
            <div style={{ paddingTop: '35px' }}>
              <ComboBoxComponent id="countryList" dataSource={this.countryData} allowCustom={false} ref={(combobox) => { this.countryObj = combobox }} popupHeight="auto" fields={this.countryFields} change={this.countryChange.bind(this)} placeholder="Select a country" />
            </div>
            <div style={{ paddingTop: '35px' }}>
              <ComboBoxComponent id="stateList" dataSource={this.stateData} allowCustom={false} ref={(combobox) => { this.stateObj = combobox }} popupHeight="auto" fields={this.stateFields} change={this.stateChange.bind(this)} enabled={false} placeholder="Select a state" />
            </div>
            <div style={{ paddingTop: '35px' }}>
              <ComboBoxComponent id="cityList" dataSource={this.cityData} allowCustom={false} ref={(combobox) => { this.cityObj = combobox }} popupHeight="auto" fields={this.cityFields} enabled={false} placeholder="Select a city" />
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
}