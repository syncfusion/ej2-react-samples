import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {
  // define the JSON of data
  private sportsData: { [key: string]: Object }[] = [
    { Id: 'Game1', Sports: 'American Football' },
    { Id: 'Game2', Sports: 'Badminton' },
    { Id: 'Game3', Sports: 'Basketball' },
    { Id: 'Game4', Sports: 'Cricket' },
    { Id: 'Game5', Sports: 'Football' },
    { Id: 'Game6', Sports: 'Golf' },
    { Id: 'Game7', Sports: 'Hockey' },
    { Id: 'Game8', Sports: 'Rugby' },
    { Id: 'Game9', Sports: 'Snooker' },
    { Id: 'Game10', Sports: 'Tennis' }
  ];
  // maps the appropriate column to fields property
  private fields: object = { text: 'Sports', value: 'Id' };
  // set the value to select an item based on mapped value at initial rendering
  private value: string = 'Game3';


  render() {
    return (
      <div className = 'control-pane'>
        <div id="multisection" className='control-section'>
          <div id="multidefault">
            <div className="control-styles">
            <h4>Default Mode</h4>
            <div>
              <MultiSelectComponent id="defaultelement" dataSource={this.sportsData} mode="Default" fields={this.fields} placeholder="Favorite Sports" />
            </div>
            </div>
            <div className="control-styles">
            <h4>Box Mode</h4>
            <div>
              <MultiSelectComponent id="boxelement" dataSource={this.sportsData} mode="Box" fields={this.fields} placeholder="Favorite Sports" />
            </div>
            </div>
            <div className="control-styles">
           <h4> Delimiter Mode</h4>
            <div>
              <MultiSelectComponent id="delimiterelement" dataSource={this.sportsData} mode="Delimiter" fields={this.fields} placeholder="Favorite Sports" />
            </div>
            </div>
            </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the default functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the suggestion list.</p>
        </div>
        
        <div id="description">
            <p>The <code>MultiSelect</code> component contains a list of predefined values, from that the user can choose a multiple
                values. </p>
            <p>In this sample, the selected items are shown with three different UI modes in three different MultiSelect elements. That three UI modes are listed here below,</p>
            <ul>
                <li><b>Default</b> - on focus-in, the component will act in <code>box mode</code> and on blur, the component will act in <code>delimiter mode</code>.</li> 
                <li><b>Box</b> - selected items will be visualized in chip.</li>
                <li><b>Delimiter</b> - selected items will be visualized in text content.</li>
            </ul>
            <p> More information on the MultiSelect instantiation can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/multi-select/getting-started.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}