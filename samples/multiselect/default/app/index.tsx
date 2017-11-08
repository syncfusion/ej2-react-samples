import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from './sample-base';


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
      </div>
    );
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));