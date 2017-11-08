/**
 * DropDownList Template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from './sample-base';


export class Templates extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
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
  private fields: object = { text: 'Name', value: 'Eimg' };
  private headerTemplate: string = '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>';
  private itemTemplate: string = '<div><img class="empImage" src="http://npmci.syncfusion.com/production/react/demos/src/dropdownlist/Employees/${Eimg}.png" alt="employee"/>' +
  '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>';
  private valueTemplate: string = '<div style="width:100%;height:100%;"><img class="value" src="http://npmci.syncfusion.com/production/react/demos/src/dropdownlist/Employees/${Eimg}.png" height="28px" width="28px" alt="employee"/>'
  + '<div class="name"> ${Name} </div></div>';

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='template'>
            <DropDownListComponent id="employees" dataSource={this.employeesData} fields={this.fields} placeholder="Select a game" itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} headerTemplate={this.headerTemplate} popupHeight="270px" />
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Templates />, document.getElementById('sample'));