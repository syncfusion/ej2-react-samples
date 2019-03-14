import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './templates.css';
import * as data from './dataSource.json';

export class Templates extends SampleBase<{}, {}> {
  private temp:string = 'empList';
  // define the JSON of data
  private employeesData: { [key: string]: Object }[] = data[this.temp];
  // maps the appropriate column to fields property
  private fields: object = { text: 'Name', value: 'Eimg' };
  //set the value to header template
  private headerTemplate(data: any): JSX.Element {
    return (
      <div className="header"> <span>Photo</span> <span className="columnHeader">Employee Info</span></div>
        );
    }
    //set the value to item template
    private itemTemplate(data: any): JSX.Element {
      return (
        <div><img className="empImage" src={"src/combo-box/Employees/" + data.Eimg +".png"} alt="employee"/>
  <div className="ms-ename"> {data.Name} </div><div className="ms-job"> {data.Job} </div></div>
          );
      }
      //set the value to value template
      private valueTemplate(data: any): JSX.Element {
        return (
          <div><img className="valueTemp" src={"src/combo-box/Employees/" + data.Eimg +".png"} alt="employee"/>
  <div className="nameTemp"> {data.Name} </div></div>
            );
        }

  render() {
    return (
      <div id='multitemp' className='control-pane'>
        <div className='control-section'>
          <div id='multitemplate' className="control-styles">
            <h4>Template</h4>
            <MultiSelectComponent id="multiTemplate" dataSource={this.employeesData} fields={this.fields} mode="Box" placeholder="Select employee" itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} headerTemplate={this.headerTemplate} />
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the template functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the customized list.</p>
        </div>
        
        <div id="description">
            <p>The MultiSelect has been provided with several options to customize each list items, group title, selected value, header
            and footer elements.
            </p>
        
            <p>This sample uses the following list of templates in MultiSelect.</p>
            <ul>
                <li><code>ItemTemplate</code> - To customize the list item's content.</li>
                <li><code>ValueTemplate</code> - To customize the value element content that holds the selected item's text.</li>
                <li><code>HeaderTemplate</code> - To customize the header element.</li>
            </ul>
            <p> More information on the template feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/multi-select/templates.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}