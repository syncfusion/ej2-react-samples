import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './style.css';
import * as data from './dataSource.json';

const Grouping = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const temp: string = 'vegetableData';
    //define the data with category
    const vegetableData: { [key: string]: Object }[] = data[temp];
    // map the groupBy field with category column
    const groupFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    return (
        <div id='multigroup' className='control-pane'>
            <div className='control-section'>
                <div id="ms-multigroup" className="control-styles">
                <label className="h4">Grouping</label>
                    <MultiSelectComponent id="grouping" dataSource={vegetableData} fields={groupFields} placeholder="Select vegetables" />
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the grouping functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the categorized list.</p>
            </div>
            <div id="description">
                <p>The MultiSelect allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
                <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
                <p>More information on the grouping feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/multi-select/grouping.html" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Grouping;