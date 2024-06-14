/**
 * ListView Default Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import { flatList, groupData } from './listData';
import './listview.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    //Map the appropriate columns to fields property
    let fields: Object = { groupBy: 'category' };
 
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id="flat-list">
                    <p className="displayText">Flat List</p> 
                    {/* ListView element */}
                    <ListViewComponent id="sample-list-flat" dataSource={flatList}></ListViewComponent>
                </div>
                <div id="group-list">
                    <p className="displayText">Group List</p> 
                    {/* Group ListView element */}
                    <ListViewComponent id="sample-list-group" dataSource={groupData} fields={fields}></ListViewComponent>
                </div>
            </div> 
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the ListView. Click any item from the list to select and highlight it.</p>
            </div>
            <div id="description" className="descriptionLayout">
                <p>The ListView component represents data in interactive hierarchical structure interface across different layouts or views, that also has the features such as data binding, template rendering, and grouping.</p>
                <p>The group list allows you to group the relevant items under a logical category by mapping the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view/fieldSettings/#groupby'>groupBy</a></code> field.</p>
                <p>In this sample, <b>Cars</b> are grouped based on their <b>Category</b>.</p>
            </div>
        </div>
    )
}
export default Default;