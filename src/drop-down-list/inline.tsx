/**
 * DropDownList Inline Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './inline.css';
import * as data from './dataSource.json';

export class Inline extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
  private temp:string = 'employees';
  // define the JSON of data
  private employeesData: { [key: string]: Object }[] = data[this.temp];
  // maps the appropriate column to fields property
  private fields: object = { text: 'Name' };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='inline' style= {{padding: '100px 100px 100px 250px'}}>
            <span id="contentText">React top expert of this week is
            <DropDownListComponent id="inline" cssClass="inlinecss" dataSource={this.employeesData} fields={this.fields} placeholder="Select an employee" popupHeight="200px" width="60px" popupWidth="140px" value='Michael' />
            </span>
          </div>
        </div>
        <div id="action-description">
          <p>The DropDownList appearing in line with highlighted content. Click that DropDownList value content and select an item
          from the popup list.
        </p>
        </div>

        <div id="description">
          <p>The DropDownList component can be rendered in line with other content and you can override the styles of the dropdownlist
        component.
      </p>
          <p>This sample illustrates using the user's data that has been used and customized DropDownList border.</p>
        </div>
      </div>
    );
  }
}