/**
 * AutoComplete Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';


export class Default extends SampleBase<{}, {}> {

  private listObj: AutoCompleteComponent;
  // define the array of string
  private sportsData: string[] = ['Badminton', 'Basketball', 'Cricket',
    'Football', 'Golf', 'Gymnastics',
    'Hockey', 'Rugby', 'Snooker', 'Tennis'];
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-12 control-wrappers'>
            <div id='default'>
              <AutoCompleteComponent id="games" dataSource={this.sportsData} ref={(AutoComplete) => { this.listObj = AutoComplete }} placeholder="e.g. Basketball" />
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));