import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, InfiniteScroll } from '@syncfusion/ej2-react-treegrid';
import { virtualData, dataSource } from './data';
import { SampleBase } from '../common/sample-base';

export class InfiniteScrolling extends SampleBase<{}, {}> {

    render() {
        if (virtualData.length === 0) {
            dataSource();
        }
        return (
            <div className='control-pane'>
                <div className='control-section'>
                <TreeGridComponent dataSource={virtualData} childMapping = 'Crew' pageSettings={{ pageSize: 50 }} enableInfiniteScrolling={true} treeColumnIndex={1} height='400' >
                <ColumnsDirective>
                <ColumnDirective field='TaskID' headerText='Player Jersey' width='140' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD1' headerText='Player Name' width='120'></ColumnDirective>
                <ColumnDirective field='FIELD2' headerText='Year' width='120' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD3' headerText='Stint' width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD4' headerText='TMID' width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD5' headerText='LGID' width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD6' headerText='GP' width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD7' headerText='GS' width='90' textAlign='Right'></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[InfiniteScroll]} />
                </TreeGridComponent>
                </div>
        <div id="action-description">
        <p>This sample demonstrates the Tree Grid component with the infinite scrolling feature.
    </p>

       </div>
<div id="description">
    <p>
    The Tree Grid Infinite scrolling, allows you to load data in lazy loading concept, which means the buffer data is loaded only when the scrollbar reaches the end of the scroller.
    To enable the enableInfiniteScrolling, set
        <code><a target="_blank" className="code"
        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enableInfiniteScrolling">enableInfiniteScrolling
        </a></code> property as true.
    </p>
    <p>
        Note: The <code><a target="_blank" className="code"
        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#height">height
        </a></code> property must be defined when enabling <code><a target="_blank" className="code"
        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enableInfiniteScrolling">enableInfiniteScrolling
        </a></code>
    </p>
    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
    <p>
        Tree Grid features are segregated into individual feature-wise modules. 
        To use infinite scrolling feature, we need to inject
        <code> InfiniteScroll </code> module into the <code>services</code>.
    </p>
</div>
</div>
        )
    }
}