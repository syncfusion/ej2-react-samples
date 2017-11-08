import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {
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
  private fields: object = { text: 'Sports', value: 'Id' };
  private value: string = 'Game3';


  render() {
    return (      
      <div className = 'control-pane'>
        <div id="multisection" className='control-section'>
          <div id="multidefault">
            <div className="control-styles">
            <h4>Default Mode</h4>
            <div>
              <MultiSelectComponent id="defaultelement" dataSource={this.sportsData} mode="default" fields={this.fields} placeholder="Favorite Sports" />
            </div>
            </div>
            <div className="control-styles">
            <h4>Box Mode</h4>
            <div>
              <MultiSelectComponent id="boxelement" dataSource={this.sportsData} mode="box" fields={this.fields} placeholder="Favorite Sports" />
            </div>
            </div>
            <div className="control-styles">
           <h4> Delimiter Mode</h4>
            <div>
              <MultiSelectComponent id="delimiterelement" dataSource={this.sportsData} mode="delimiter" fields={this.fields} placeholder="Favorite Sports" />
            </div>
            </div>
            </div>
        </div>
        <div id="description">
            <p>The <code>MultiSelect</code> component contains a list of predefined values, from that the user can choose a multiple
                values. </p>
            <p>The default sample demostrates <code>MultiSelect</code>, in the following UI modes.</p>
            <ul>
                <li><b>Default</b></li> - selected items will be visualized in text content. 
                <li><b>Box</b></li> - selected items will be visualized as box with clear icon.
                <li><b>Delimiter</b></li> - selected items will be visualized in chip.
            </ul>
            <p> More information on the MultiSelect instantiation can be found in the
                <a href="http://ej2.syncfusion.com/documentation/multi-select/getting-started.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}