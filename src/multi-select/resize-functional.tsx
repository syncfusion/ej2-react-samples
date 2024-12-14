import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './style.css';
import * as data from './dataSource.json';

const Resize = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'countries';
    //define the resize data
    let dataLocal: { [key: string]: Object; }[];
    dataLocal = data[temp];
    // maps the appropriate column to fields property
    const fields: Object = { text: 'Name', value: 'Code' };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='multifilter' className="control-styles">
                <label className="h4">Resize</label>
                    <MultiSelectComponent id="comboelement" dataSource={dataLocal}  allowResize={true} fields={fields} placeholder="Select countries" />
                </div>
            </div>
            <div id="action-description">
            <p>This example demonstrates the custom resizing functionality of the MultiSelect component. You can adjust the popup size based on your preferences, providing more control over its appearance.</p>
            </div>
            <div id="description">
            <p>Enable the resize feature of the MultiSelect popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management.</p>
            </div>
        </div>
    );
}
export default Resize;