import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PagerComponent } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <PagerComponent pageSize={1} totalRecordsCount={7} pageCount={3} >
          </PagerComponent>
        </div>
        <div id="description">
          <p>
            The Essential Javascript Pager component allows you to navigate between records which are sectioned into pages. The navigation
            between pages which is key functionality of Pager is done using built-in numeric and navigation buttons and provides
            easy user interaction.
        </p>
          <p>
            In this demo, the Pager is populated with its minimum default settings.
         </p>
          <p>
            More information on the Pager instantiation can be found in this
            <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/pager/getting-started.html">
              documentation section</a>.
        </p>
        </div>
      </div>
    )
  }
}