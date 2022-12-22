import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Group, LazyLoadGroup, InfiniteScroll, Sort } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import { createLazyLoadData } from './data';

function LazyLoadGroupingWithInfiniteScrolling() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const groupOptions: Object = { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] };
    const lazyLoadData: Object = createLazyLoadData();
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={lazyLoadData} allowSorting={true} height={400} enableInfiniteScrolling={true} allowGrouping={true} groupSettings={groupOptions}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' textAlign="Right" width='120' ></ColumnDirective>
                        <ColumnDirective field='ProductName' headerText='Product Name' width='160' ></ColumnDirective>
                        <ColumnDirective field='ProductID' headerText='Product ID' textAlign="Right" width='120' ></ColumnDirective>
                        <ColumnDirective field='CustomerID' headerText='Customer ID' width='120' ></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='160' ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Group, LazyLoadGroup, InfiniteScroll, Sort]} />
                </GridComponent>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the lazy loading grouping feature with infinite scrolling.</p>
            </div>

            <div id="description">
                <p>
                    The lazy load grouping allows the grid to render only the initial level caption rows in the collapsed state while grouping. Now, the Data Grid supports lazy load grouping for infinite scrolling enabled grid too, which means the records of each group caption will render only when you expand the group captions row. Buffer data is loaded only when the scrollbar reaches the end of the scroller. This is done by setting the <code>groupSettings-&gt;enableLazyLoading</code> property as true and the <code>enableInfiniteScrolling</code> property as true.
                </p>
                <p>
                    Note: The <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/#height">
                        height</a></code> property must be defined when enabling the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#enableinfinitescrolling">
                            enableInfiniteScrolling </a></code>.
                </p>
                <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                <p>
                    Grid features are segregated into individual feature-wise modules.
                    To use lazy load grouping and infinite scrolling features, we need to inject
                    <code>LazyLoadGroup</code> and <code>InfiniteScroll</code> modules into the <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default LazyLoadGroupingWithInfiniteScrolling;