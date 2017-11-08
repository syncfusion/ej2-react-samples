import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from './sample-base';


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
  private itemTemplate: string = '<div><img class="empImage" src="http://npmci.syncfusion.com/production/react/demos/src/combobox/Employees/${Eimg}.png" alt="employee"/>' +
  '<div class="ms-ename"> ${Name} </div><div class="ms-job"> ${Job} </div></div>';
  // set the value to valueTemplate property
  private valueTemplate: string = '<div><img class="valueTemp" src="http://npmci.syncfusion.com/production/react/demos/src/combobox/Employees/${Eimg}.png" alt="employee"/>' +
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
        
      </div>
    );
  }
}
ReactDOM.render(<Templates />, document.getElementById('sample'));