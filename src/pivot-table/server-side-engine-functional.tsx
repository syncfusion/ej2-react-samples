import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { IDataOptions, PivotViewComponent, VirtualScroll, Inject, FieldList, GroupingBar } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './server-side-engine.css';

/**
 * PivotView Server Side Engine Sample.
 */

let pivotObj: PivotViewComponent;

let dataSourceSettings: IDataOptions = {
    url: 'https://ej2services.syncfusion.com/react/development/api/pivot/post',
    mode: 'Server',
    expandAll: false,
    enableSorting: true,
    columns: [ { name: 'Year', caption: 'Production Year' },
    ],
    values: [
        { name: 'Sold', caption: 'Units Sold' },
        { name: 'Price', caption: 'Sold Amount' }
    ],
    rows: [{ name: 'ProductID', caption: 'Product ID' }],
    formatSettings: [{ name: 'Price', format: 'C0' }, { name: 'Sold', format: 'N0' }],
    filters: []
};


function ServerSideEngine() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);


    function onDataBound(): void {
        if (Browser.isDevice && pivotObj && pivotObj.enableRtl) {
            (document as any).querySelector('.control-section').classList.add('e-rtl');
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <PivotViewComponent id='PivotView' ref={d => pivotObj = d} dataSourceSettings={dataSourceSettings} showFieldList={true} showGroupingBar={true}
                    width={'100%'} height={'450'} dataBound={onDataBound} enableVirtualization={true} allowDataCompression={true}>
                    <Inject services={[VirtualScroll, FieldList, GroupingBar]} />
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to use a server-side pivot engine to obtain, process and return the summarized data via a remote service and display it in the pivot table.</p>
            </div>
            <div id="description">
                <p>
                    The Pivot Table's server-side pivot engine (external pivot engine) uses the Syncfusion package <a
                    target="_blank" href="https://www.nuget.org/packages/Syncfusion.Pivot.Engine/"> Syncfusion.Pivot.Engine</a> to
                    gather data from the data source and perform all pivot operations such as <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/aggregation/#aggregation">
                        aggregation</a>, <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/filtering/#filtering">
                        filtering</a>, <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/sorting/#sorting">
                        sorting</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/grouping">
                        grouping</a>, and more on a separate hosted server and only paged
                    data is sent to the pivot table viewport via web service.
                    The <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettings/#url">
                        dataSourceSettings-&gt;url</a> property allows this web service URL to be
                    connected to the pivot table.
                </p>
                <p>
                    In this demo, the pivot table is shown with the virtualization option enabled through the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/pivotview/#enablevirtualization">
                        enableVirtualization</a> property
                    and an external server engine. This would improve pivot table rendering performance when working with large
                    amounts of data.
                </p>
                <br />
                <p>
                    <strong>Injecting Module:</strong>
                </p>
                <p>
                    The pivot table features are segregated into individual modules. To use the virtual scrolling option,
                    we need to inject the
                    <code>VirtualScroll</code> module using the <code> services</code> tag.
                </p>
                <br />
                <p>
                    More information about server-side aggregation can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/server-side-pivot-engine">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default ServerSideEngine;