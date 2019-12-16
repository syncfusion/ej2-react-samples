import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './templates.css';
import * as data from './dataSource.json';
export class Templates extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'empList';
        // define the JSON of data
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
        return (<div><img className="empImage" src={"src/drop-down-list/Employees/" + data['Eimg'] + ".png"} alt="employee"/>
        <div className="ename"> {data.Name} </div><div className="job"> {data.Designation} </div></div>);
    }
    //set the value to value template
    valueTemplate(data) {
        return (<div className="valueTemplate"><img className="value" src={"src/drop-down-list/Employees/" + data.Eimg + ".png"} height="28px" width="28px" alt="employee"/>
          <div className="name"> {data.Name} </div></div>);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div id='template'>
            <DropDownListComponent id="employees" dataSource={this.employeesData} fields={this.fields} placeholder="Select an employee" itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} headerTemplate={this.headerTemplate} popupHeight="270px"/>
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
      </div>);
    }
}
