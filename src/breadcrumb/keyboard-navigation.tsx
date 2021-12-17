import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent} from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './keyboard-navigation.css';

export class KeyboardNavigation extends SampleBase<{}, {}> {

  public breadcrumb: BreadcrumbComponent;

  btnClick(): void {
    this.breadcrumb.activeItem = this.breadcrumb.items[this.breadcrumb.items.length - 1].text;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="content-wrapper breadcrumb-control-wrapper">
            <div className="row material2">
              <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <h5 style={{ display: "inline-block" }}>Simple Breadcrumb</h5>
                <ButtonComponent cssClass='e-small reset-btn'
                  onClick={ this.btnClick.bind(this) }>Reset State</ButtonComponent>
              </div>
            </div>
            <div className="row material2">
              <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <BreadcrumbComponent ref={(breadcrumbObj) => { this.breadcrumb = breadcrumbObj }} enableNavigation={false}></BreadcrumbComponent>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p> This sample demonstrates the keyboard navigation functionalities of the <b>Breadcrumb</b> component.</p>        </div>
        <div id='description'>
          <p>The <code>Breadcrumb</code> component can be interacted with keyboard navigation. Below key combinations can be used in Breadcrumb to initiate various actions.</p>
          <ul>
            <li><b>Tab</b> to navigate to the next item.</li>
            <li><b>Shift + Tab</b> to navigate to the previous item.</li>
            <li><b>Enter</b> to click the item.</li>
          </ul>
          <p>More information about <code>Breadcrumb</code> component keyboard navigations can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/">documentation section</a>.</p>
        </div>
      </div>
    );
  }
}