/**
 * DropDownList Template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './template.css';

export class Templates extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
  // define the JSON of data
  private employeesData: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', Eimg: '7', Designation: 'Team Lead', Country: 'England' },
    { Name: 'Anne Dodsworth', Eimg: '1', Designation: 'Developer', Country: 'USA' },
    { Name: 'Janet Leverling', Eimg: '3', Designation: 'HR', Country: 'USA' },
    { Name: 'Laura Callahan', Eimg: '2', Designation: 'Product Manager', Country: 'USA' },
    { Name: 'Margaret Peacock', Eimg: '6', Designation: 'Developer', Country: 'USA' },
    { Name: 'Michael Suyama', Eimg: '9', Designation: 'Team Lead', Country: 'USA' },
    { Name: 'Nancy Davolio', Eimg: '4', Designation: 'Product Manager', Country: 'USA' },
    { Name: 'Robert King', Eimg: '8', Designation: 'Developer ', Country: 'England' },
    { Name: 'Steven Buchanan', Eimg: '10', Designation: 'CEO', Country: 'England' }
  ];
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
      <div><img className="empImage" src={"src/auto-complete/Employees/"+`${data.Eimg}`+".png"} alt="employee"/>
      <div className="ename"> {data.Name} </div><div className="job"> {data.Designation} </div></div>
        );
    }
    //set the value to value template
    private valueTemplate(data: any): JSX.Element {
      return (
        <div className="valueTemplate" ><img className="value" src={"src/auto-complete/Employees/"+`${data.Eimg}`+".png"} height="28px" width="28px" alt="employee"/>
        <div className="name"> {data.Name} </div></div>
          );
      }


  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='template'>
            <DropDownListComponent id="employees" dataSource={this.employeesData} fields={this.fields} placeholder="Select an employee" itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} headerTemplate={this.headerTemplate} popupHeight="270px" />
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the template functionalities of the DropDownList. Click the DropDownList element and select an item from the customized list.</p>
        </div>
        
        <div id="description">
            <p>The DropDownList has been provided with several options to customize each list items, group title, selected value, header
            and footer elements.
            </p>
        
            <p>This sample uses the following list of templates in DropDownList</p>
            <ul>
                <li><code>ItemTemplate</code> - To customize the list item's content.</li>
                <li><code>ValueTemplate</code> - To customize the value element content that holds the selected item's text.</li>
                <li><code>HeaderTemplate</code> - To customize the header element.</li>
            </ul>
            <p> More information on the template feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/templates.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}