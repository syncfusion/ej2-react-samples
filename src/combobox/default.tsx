/**
 * ComboBox Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';

export class Default extends SampleBase<{}, {}> {

  private listObj: ComboBoxComponent;
  // define the JSON of data
  private sportsData: { [key: string]: Object }[] = [
    { Id: 'Game1', Game: 'American Football' },
    { Id: 'Game2', Game: 'Badminton' },
    { Id: 'Game3', Game: 'Basketball' },
    { Id: 'Game4', Game: 'Cricket' },
    { Id: 'Game5', Game: 'Football' },
    { Id: 'Game6', Game: 'Golf' },
    { Id: 'Game7', Game: 'Hockey' },
    { Id: 'Game8', Game: 'Rugby' },
    { Id: 'Game9', Game: 'Snooker' },
    { Id: 'Game10', Game: 'Tennis' }
  ];
  // maps the appropriate column to fields property
  private fields: object = { text: 'Game', value: 'Id' };
  // set the value to select an item based on mapped value at initial rendering
  private value: string = 'Game3';

  public onChange(): void {
    let value: Element = document.getElementById('value');
    let text: Element = document.getElementById('text');
    value.innerHTML = this.listObj.value === null ? 'null' : this.listObj.value.toString();
    text.innerHTML = this.listObj.text === null ? 'null' : this.listObj.text;
  }
  // call the change event's function after initialized the component.
  public rendereComplete(): void {
    this.onChange();
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9 control-wrappers'>
            <div id='default'>
              <ComboBoxComponent id="games" dataSource={this.sportsData} ref={(combobox) => { this.listObj = combobox }} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select a game" value={this.value} popupHeight="220px" />
            </div>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                <tr>
                  <td style={{ padding: '5px', width: '25%' }}>Value</td>
                  <td>:<span id='value' style={{ paddingLeft: '10px' }}></span></td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', width: '25%' }}>Text</td>
                  <td>:<span id='text' style={{ paddingLeft: '10px' }}></span></td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the default functionalities of the ComboBox. Type a character in the ComboBox element or click the drodown icon to choose an item from the <code>options</code> list.
                The selected item's <code>value</code> and <code>text</code> property values will be shown in the property panel.</p>
        </div>
        
        <div id="description">
            <p>The <code>ComboBox</code> component allows the user to type a value, or choose an option from the list of predefined options.</p>
            <p> More information on the ComboBox instantiation can be found in the
                <a href="http://ej2.syncfusion.com/documentation/combo-box/getting-started.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}