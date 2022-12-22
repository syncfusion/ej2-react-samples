/**
 * AutoComplete Grouping & Icons Samples
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { updateSampleSection } from '../common/sample-base';
 import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
 import './icons.css';
 import * as data from './dataSource.json';
 
function Grouping() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let listObj: AutoCompleteComponent;
    const temp:string = 'vegetableData';
    // define the JSON of data
    const vegetableData: { [key: string]: Object }[] = data[temp];
    // maps the appropriate column to grouping fields property
    const groupFields: Object = { groupBy: 'Category', value: 'Vegetable' };
    const tempData:string = 'socialMedia';
    // define the JSON of data
    const socialMediaData: { [key: string]: Object }[] =data[tempData];
    // maps the appropriate column to icons fields property
    const iconFields: Object = { value: 'SocialMedia', iconCss: 'Class' };
    return (
        <div className='control-pane'>
            <div className='control-section' id='autoIcon'>
                <div className='col-lg-6'>
                    <div id="group">
                    <h4>Grouping</h4>
                        <AutoCompleteComponent id="vegetables" showPopupButton={true} dataSource={vegetableData} fields={groupFields} placeholder="e.g. Cabbage" />
                    </div>
                </div>
                <div className='col-lg-6'>
                  <div id="icon">
                  <h4>Icons</h4>
                      <AutoCompleteComponent id="icons" showPopupButton={true} dataSource={socialMediaData} fields={iconFields} placeholder="e.g. Facebook" />
                  </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the grouping and icons supports of the AutoComplete. Type a character in the autocomplete element and choose an item from the categorized list/icons list. And also enabled the
                <code>showPopupButton</code> property to show the all suggestion items while clicking on popup button.</p>
            </div>
            <div id="description">
                <p>The AutoComplete allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
                <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
                <p>The second AutoComplete is populated with icons which is rendered by mapping the <code>iconCss</code> field.</p>
                <p> More information on the grouping feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/auto-complete/grouping.html" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default Grouping;