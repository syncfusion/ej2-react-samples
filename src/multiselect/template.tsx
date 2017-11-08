import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './templates.css';

export class Templates extends SampleBase<{}, {}> {
  // define the JSON of data
  private employeesData: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', Eimg: '7', Job: 'Team Lead', Country: 'England' },
    { Name: 'Anne Dodsworth', Eimg: '1', Job: 'Developer', Country: 'USA' },
    { Name: 'Janet Leverling', Eimg: '3', Job: 'HR', Country: 'USA' },
    { Name: 'Laura Callahan', Eimg: '2', Job: 'Product Manager', Country: 'USA' },
    { Name: 'Margaret Peacock', Eimg: '6', Job: 'Developer', Country: 'USA' },
    { Name: 'Michael Suyama', Eimg: '9', Job: 'Team Lead', Country: 'USA' },
    { Name: 'Nancy Davolio', Eimg: '4', Job: 'Product Manager', Country: 'USA' },
    { Name: 'Robert King', Eimg: '8', Job: 'Developer ', Country: 'England' },
    { Name: 'Steven Buchanan', Eimg: '10', Job: 'CEO', Country: 'England' }
  ];
  // maps the appropriate column to fields property
  private fields: object = { text: 'Name', value: 'Eimg' };
  // set the value to headerTemplate property
  private headerTemplate: string = '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>';
  // set the value to itemTemplate property
  private itemTemplate: string = '<div><img class="empImage" src="src/combobox/Employees/${Eimg}.png" alt="employee"/>' +
  '<div class="ms-ename"> ${Name} </div><div class="ms-job"> ${Job} </div></div>';
  // set the value to valueTemplate property
  private valueTemplate: string = '<div><img class="valueTemp" src="src/combobox/Employees/${Eimg}.png" alt="employee"/>' +
  '<div class="nameTemp"> ${Name} </div></div>';

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='multitemplate' className="control-styles">
            <h4>Template</h4>
            <MultiSelectComponent id="multiTemplate" dataSource={this.employeesData} fields={this.fields} mode="box" placeholder="Select employee" itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} headerTemplate={this.headerTemplate} />
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
                <a href="http://ej2.syncfusion.com/documentation/multi-select/templates.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}