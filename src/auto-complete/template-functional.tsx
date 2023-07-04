/**
 * AutoComplete Template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import './templates.css';
import * as data from './dataSource.json';

const Templates = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'empList';
    // define the JSON of data
    const employeesData: { [key: string]: Object }[] = data[temp];
    // maps the appropriate column to fields property
    const fields: object = { value: 'Name' };
    //set the value to header template
    const headerTemplate = () => {
        return (
            <div className="header"> <span>Photo</span> <span className="columnHeader">Employee Info</span></div>
        );
    }
    //set the value to item template
    const itemTemplate = (data: any) => {
        return (
            <div><img className="empImage" src={"src/auto-complete/Employees/" + data.Eimg + ".png"} alt="employee" />
                <div className="ename"> {data.Name} </div><div className="job"> {data.Designation} </div>
            </div>
        );
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='template'>
                    <AutoCompleteComponent id="employees" dataSource={employeesData} fields={fields} placeholder="e.g. Andrew Fuller" itemTemplate={itemTemplate} headerTemplate={headerTemplate} popupHeight="350px" />
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the template functionalities of the AutoComplete. Type a character in the autocomplete element and choose an item from the customized list</p>
            </div>
            <div id="description">
                <p>The AutoComplete has been provided with several options to customize each list items, group title, header and footer
                    elements.</p>
                <p>This sample uses the following list of templates in AutoComplete</p>
                <ul>
                    <li><code>ItemTemplate</code> - To customize the list item's content.</li>
                    <li><code>HeaderTemplate</code> - To customize the header element.</li>
                </ul>
                <p> More information on the template feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/auto-complete/templates.html" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Templates;