/**
 * AutoComplete Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';

export class Default extends SampleBase<{}, {}> {

  private listObj: AutoCompleteComponent;
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
        <div id="description">
            <p>The <code>AutoComplete</code> component provides the matched suggestion list when a character is typed in the input, from that the
                user can select one.</p> By default, the filter type value is <code>contains</code>.
            <p>The default sample illustrates the use of AutoComplete that allows the end-users to select an item from the suggestion list.
                Also, provided the option for change the search <code>filterType</code> in the property panel.
            </p>
            <p> More information on the AutoComplete instantiation can be found in this
                <a href="http://ej2.syncfusion.com/documentation/auto-complete/getting-started.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}