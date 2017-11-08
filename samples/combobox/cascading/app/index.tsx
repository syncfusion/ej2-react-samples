/**
 * ComboBox Cscading Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';


export class Cascading extends SampleBase<{}, {}> {

  private countryObj: ComboBoxComponent;
  private stateObj: ComboBoxComponent;
  private cityObj: ComboBoxComponent;

  private countryData: { [key: string]: Object }[] = [
    { CountryName: 'Australia', CountryId: '2' },
    { CountryName: 'United States', CountryId: '1' }
  ];
  private stateData: { [key: string]: Object }[] = [
    { StateName: 'New York', CountryId: '1', StateId: '101' },
    { StateName: 'Queensland', CountryId: '2', StateId: '104' },
    { StateName: 'Tasmania ', CountryId: '2', StateId: '105' },
    { StateName: 'Victoria', CountryId: '2', StateId: '106' },
    { StateName: 'Virginia ', CountryId: '1', StateId: '102' },
    { StateName: 'Washington', CountryId: '1', StateId: '103' }
  ];
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
  private countryFields: Object = { value: 'CountryId', text: 'CountryName' };
  private stateFields: Object = { value: 'StateId', text: 'StateName' };
  private cityFields: Object = { text: 'CityName', value: 'CityId' };

  public countryChange(): void {
    this.stateObj.enabled = true;
    let tempQuery: Query = new Query().where('CountryId', 'equal', this.countryObj.value);
    this.stateObj.query = tempQuery;
    this.stateObj.text = null;
    this.stateObj.dataBind();
    this.cityObj.text = null;
    this.cityObj.enabled = false;
    this.cityObj.dataBind();
  }
  public stateChange(): void {
    this.cityObj.enabled = true;
    let tempQuery1: Query = new Query().where('StateId', 'equal', this.stateObj.value);
    this.cityObj.query = tempQuery1;
    this.cityObj.text = null;
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
      </div>
    );
  }
}
ReactDOM.render(<Cascading />, document.getElementById('sample'));