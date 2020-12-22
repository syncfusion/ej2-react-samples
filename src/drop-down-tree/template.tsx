/**
 * Dropdown Tree Template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './templates.css';
import * as dataSource from './template-data.json';

export class Templates extends SampleBase<{}, {}> {

  data = dataSource as any;
  // maps the appropriate column to fields property
  private fields: object = { dataSource: this.data.templateData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
  //set the value to header template
  private headerTemplate(): JSX.Element {
    return (
      <div className="head"> Employee List </div>
    );
  }
  //set the value to item template
  private itemTemplate(data: any): JSX.Element {
    return (
      <div> <img className="eimage" src={"src/images/employees/" + data['eimg'] + ".png"} />
        <div> <div className="ename"> {data.name} </div><div className="ejob"> {data.job} </div><span className="e-badge icons"><span className={data['status']}></span></span></div></div>
    );
  }
  //set the value to footer template
  private footerTemplate(): JSX.Element {
    return (
      <div className="footer" > <div className="footer-content">
        <span className="e-badge">
          <span className="display available">
            <span className="status online"></span>
            Available
              </span>
          <span className="display meeting">
            <span className="status busy"></span>
            Busy
              </span>
          <span className="display unavailable">
            <span className="status away"></span>
            Away
              </span>
        </span>
      </div> </div>
    );
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section dropdowntree-templates'>
          <div className='control_wrapper'>
            <DropDownTreeComponent fields={this.fields} placeholder="Select an employee" itemTemplate={this.itemTemplate} footerTemplate={this.footerTemplate} headerTemplate={this.headerTemplate} popupHeight="270px" cssClass="ddt-template" width="100%" />
          </div>
        </div>
        <div id="action-description">
          <p>This sample explains you about the template functionalities of the Dropdown Tree. Click the Dropdown Tree
            element, and then select an item from the customized list.</p>
        </div>

        <div id="description">
          <p>The Dropdown Tree has been provided with several options to customize each list items, header, and footer
            elements.
          </p>
          <p>This sample uses the following list of templates in the Dropdown Tree</p>
          <ul>
            <li><code>ItemTemplate</code> - To customize the list item's content.</li>
            <li><code>HeaderTemplate</code> - To customize the header element.</li>
            <li><code>FooterTemplate</code> - To customize the footer element.</li>
          </ul>
        </div>
      </div>
    );
  }
}