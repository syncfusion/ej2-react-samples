import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, VirtualScroll } from '@syncfusion/ej2-react-treegrid';
import { virtualData, dataSource } from './data';
import { SampleBase } from '../common/sample-base';
export class VirtualScrolling extends SampleBase {
    render() {
        dataSource();
        return (<div className='control-pane'>
                <div className='control-section'>
                <TreeGridComponent dataSource={virtualData} childMapping='Crew' enableVirtualization={true} treeColumnIndex={1} height='400'>
                <ColumnsDirective>
                <ColumnDirective field='TaskID' headerText='Player Jersey' width='120' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD1' headerText='Player Name' width='120'></ColumnDirective>
                <ColumnDirective field='FIELD2' headerText='Year' width='100' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD3' headerText='Stint' width='120' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='FIELD4' headerText='TMID' width='120' textAlign='Right'></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[VirtualScroll]}/>
                </TreeGridComponent>
                </div>
        <div id="action-description">
        <p>This sample demonstrates the TreeGrid component with the virtual scrolling feature. Scroll the TreeGrid content vertically to load rows.
        </p>
       </div>
<div id="description">
    <p>
    The TreeGrid UI virtualization allows you to render only rows visible within the view-port without buffering the entire datasource.
        To enable the virtualization, set
        <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization">enableVirtualization
        </a></code> property as true.
    </p>
    <p>
        Note: The <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#height">height
        </a></code> property must be defined when enabling <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization">enableVirtualization
        </a></code>
    </p>
    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
    <p>
        TreeGrid features are segregated into individual feature-wise modules. 
        To use virtual scrolling feature, we need to inject
        <code> VirtualScroll </code> module into the <code>services</code>.
    </p>
</div>
</div>);
    }
}
