import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Sort } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';

function StickyHeader() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={data} enableStickyHeader={true} allowSorting={true}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right"></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right'/>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'/>
                        <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right"></ColumnDirective>
                        <ColumnDirective field='ShipName' headerText='Ship Name' width='170'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Sort]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Grid component with the sticky header feature.
                    In this sample, the header will be visible when the parent element is scrolled.
                </p>
            </div>
            <div id='description'>
                <p>The Grid headers can be fixed while scrolling its parent element.
                    It can be done by setting the <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/#enablestickyheader">
                        enableStickyHeader
                    </a></code> property.
                </p>
                <p>
                    In this demo, while scrolling the demo page, the Grid header will be stick to the top of its parent element.
                </p>
                <p>
                    More information on the stacked header configuration can be found in this
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/scrolling#sticky-header">
                        documentation section</a>.
                </p>

            </div>
        </div>
    )
}
export default StickyHeader;