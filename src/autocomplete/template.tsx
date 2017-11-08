/**
 * AutoComplete Template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './templates.css';

export class Templates extends SampleBase<{}, {}> {

  private listObj: AutoCompleteComponent;
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
  private fields: object = { value: 'Name' };
  //set the value to header template
  private headerTemplate: string = '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>';
  //set the value to item template
  private itemTemplate: string = '<div><img class="empImage" src="src/autocomplete/Employees/${Eimg}.png" alt="employee"/>' +
  '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>';

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='template'>
            <AutoCompleteComponent id="employees" dataSource={this.employeesData} fields={this.fields} placeholder="e.g. Andrew Fuller" itemTemplate={this.itemTemplate} headerTemplate={this.headerTemplate} popupHeight="350px" />
          </div>
        </div>
        <div id="action-description">    
            <p>This sample demonstrates the template functionalities of the AutoComplete. Type a character in the autocomplete element and choose an item from the customized list</p>     
        </div>
        
        <div id="description">
            <p>The AutoComplete has been provided with several options to customize each list items, group title, header and footer
                elements.
            </p>
        
            <p>This sample uses the following list of templates in AutoComplete</p>
            <ul>
                <li><code>ItemTemplate</code> - To customize the list item's content.</li>
                <li><code>HeaderTemplate</code> - To customize the header element.</li>
            </ul>
            <p> More information on the template feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/documentation/auto-complete/templates.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}