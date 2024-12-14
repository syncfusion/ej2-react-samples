/**
 * ComboBox Resize Sample
 */
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import './resize.css';
import * as data from './dataSource.json';

const Resize = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'countries';
    //define the resize data
    const searchData: { [key: string]: Object; }[] = data[temp];
    // maps the appropriate column to fields property
    const fields: Object = { text: 'Name', value: 'Code' };
    
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='resize'>
                    <ComboBoxComponent id="country" dataSource={searchData}  allowResize={true} fields={fields} placeholder="Select a country" popupHeight="270px" />
                </div>
            </div>
            <div id="action-description">
            <p>This example demonstrates the custom resizing functionality of the ComboBox component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
            </div>
            <div id="description">
            <p>Enable the resize feature of the ComboBox popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p> 
            </div>
        </div>
    );
}
export default Resize;