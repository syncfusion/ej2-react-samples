/**
 * AutoComplete Custom Filtering Sample
 */
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import './resize.css';
import * as data from './dataSource.json';

const ResizeFunctionality = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'booksData';
    const booksData: { [key: string]: Object; }[] = data[temp];
    // maps the appropriate column to fields property
    const fields: object = { value: 'BookName' };


    return (
        <div id='autocustom' className='control-pane'>
            <div className='control-section'>
                <div id='resize'>
                    <AutoCompleteComponent id="books" dataSource={booksData} allowResize={true}  fields={fields} placeholder="e.g. Node.js Succinctly" />
                </div>
            </div>

            <div id="action-description">
            <p>This example demonstrates the custom resizing functionality of the AutoComplete component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
            </div>

            <div id="description">
            <p>Enable the resize feature of the AutoComplete popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p> 
            </div>
        </div>
    );
}
export default ResizeFunctionality;
