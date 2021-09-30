import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './keyboard-navigation.css';

export class KeyboardNavigation extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="content-wrapper breadcrumb-control-wrapper">
            <div className="row material2">
              <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <h5>Simple Breadcrumb</h5>
              </div>
            </div>
            <div className="row material2">
              <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <BreadcrumbComponent enableNavigation={false}></BreadcrumbComponent>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p> This sample demonstrates the Keyboard Navigation functionalities of the <b>Breadcrumb</b> component.</p>
        </div>
        <div id='description'>
          <p>The <code>Breadcrumb</code> component can be interacted with keyboard navigation. Below key combinations can be used in Breadcrumb to initiate various actions.</p>
          <ul>
            <li><b>Tab</b> to navigate to the next item.</li>
            <li><b>Shift + Tab</b> to navigate to the previous item.</li>
            <li><b>Enter</b> to click the item.</li>
          </ul>
          <p>More information about <code>Breadcrumb</code> component Keyboard navigations can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/">documentation section</a>.</p>
        </div>
      </div>
    );
  }
}