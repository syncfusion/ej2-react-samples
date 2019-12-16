import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './templates.css';
import * as data from './dataSource.json';
export class Templates extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'empList';
        // define the JSON of employees data
        this.employeesData = data[this.temp];
        // maps the appropriate column to fields property
        this.fields = { text: 'Name', value: 'Eimg' };
    }
    //set the value to header template
    headerTemplate(data) {
        return (<div className="header"> <span>Photo</span> <span className="columnHeader">Employee Info</span></div>);
    }
    //set the value to item template
    itemTemplate(data) {
        return (<div><img className="empImage" src={"src/combo-box/Employees/" + data.Eimg + ".png"} alt="employee"/>
        <div className="ename"> {data.Name} </div><div className="job"> {data.Designation} </div></div>);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div id='template'>
            <ComboBoxComponent id="employees" dataSource={this.employeesData} fields={this.fields} placeholder="Select an employee" itemTemplate={this.itemTemplate} headerTemplate={this.headerTemplate} popupHeight="270px"/>
          </div>
        </div>
        <div id="action-description">    
            <p>This sample demonstrates the template functionalities of the ComboBox. Type a character in the ComboBox element or click on the drodown icon to choose an item from the customized list.</p>
        </div>
        <div id="description">
            <p>The ComboBox has been provided with several options to customize each list items, group title, header and footer elements.
            </p>
        
            <p>This sample uses the following list of templates in ComboBox</p>
            <ul>
                <li><code>ItemTemplate</code> - To customize the list item's content.</li>
                <li><code>HeaderTemplate</code> - To customize the header element.</li>
            </ul>
            <p> More information on the template feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/combo-box/templates.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>);
    }
}
