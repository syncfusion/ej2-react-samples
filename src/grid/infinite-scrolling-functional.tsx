import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, InfiniteScroll, VirtualScroll } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { datasource, virtualData } from './data';

// custom code end
function InfiniteScrolling() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // custom code start
    const SAMPLE_CSS = `
    .image {
        position: absolute;
        background-repeat: no-repeat;
        background-image: url('src/grid/images/spinner.gif');
        background-position: center;
        width: 16px;
        height: 28px;
    }

    .e-bigger .image {
        height: 36px;
    }
    
    #popup {
        position: absolute;
        background-color: transparent;
        display: none;
        z-index: 100;
    }
    .div-button{
        margin: 5px 5px 5px 0;
    }`;
    let grid: GridComponent;
    let data: Object[] = [];
    function onclick() {
        if (!data.length) {
            datasource();
            grid.dataSource = data = virtualData;
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='div-button'>
                    <ButtonComponent cssClass={'e-info'} onClick={onclick.bind(this)}>Load 100K Data</ButtonComponent>
                    <span id="popup">
                        <span id="gif" className="image"></span>
                    </span>
                </div>
                <GridComponent dataSource={[]} enableInfiniteScrolling={true} enableColumnVirtualization={true} height={400} pageSettings={{ pageSize: 50 }}
                    ref={g => grid = g}>
                    <ColumnsDirective>
                        <ColumnDirective field='SNo' headerText='S.No' width='140' isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='FIELD1' headerText='Player Name' width='130' ></ColumnDirective>
                        <ColumnDirective field='FIELD2' headerText='Year' width='100' ></ColumnDirective>
                        <ColumnDirective field='FIELD3' headerText='Sports' width='160'></ColumnDirective>
                        <ColumnDirective field='FIELD4' headerText='Country' width='160'></ColumnDirective>
                        <ColumnDirective field='FIELD5' headerText='LGID' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD6' headerText='GP' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD7' headerText='GS' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD8' headerText='Minutes' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD9' headerText='Points' width='130' ></ColumnDirective>
                        <ColumnDirective field='FIELD10' headerText='OREB' width='140' ></ColumnDirective>
                        <ColumnDirective field='FIELD11' headerText='DREB' width='140' ></ColumnDirective>
                        <ColumnDirective field='FIELD12' headerText='REB' width='130' ></ColumnDirective>
                        <ColumnDirective field='FIELD13' headerText='Assists' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD14' headerText='Steals' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD15' headerText='Blocks' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD16' headerText='Turnovers' width='140' ></ColumnDirective>
                        <ColumnDirective field='FIELD17' headerText='PF' width='100' ></ColumnDirective>
                        <ColumnDirective field='FIELD18' headerText='FGA' width='150' ></ColumnDirective>
                        <ColumnDirective field='FIELD19' headerText='FGM' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD20' headerText='FTA' width='150' ></ColumnDirective>
                        <ColumnDirective field='FIELD21' headerText='FTM' width='140' ></ColumnDirective>
                        <ColumnDirective field='FIELD22' headerText='Three Attempted' width='170' ></ColumnDirective>
                        <ColumnDirective field='FIELD23' headerText='Three Made' width='150' ></ColumnDirective>
                        <ColumnDirective field='FIELD24' headerText='Post GP' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD25' headerText='Post GS' width='120' ></ColumnDirective>
                        <ColumnDirective field='FIELD26' headerText='Post Minutes' width='150' ></ColumnDirective>
                        <ColumnDirective field='FIELD27' headerText='Post Points' width='140' ></ColumnDirective>
                        <ColumnDirective field='FIELD28' headerText='Post OREB' width='160' ></ColumnDirective>
                        <ColumnDirective field='FIELD29' headerText='Post DREB' width='160' ></ColumnDirective>
                        <ColumnDirective field='FIELD30' headerText='Post REB' width='160'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[InfiniteScroll, VirtualScroll]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Grid component with the infinite scrolling feature. You can use the scrollbar or navigation keys or the mouse wheel to perform the infinite scroll action.
                </p>
            </div>
            <div id='description'>
            <p>
                    The Grid Infinite scrolling feature enables the loading of data using the lazy loading concept, where buffer data is loaded only when the scrollbar reaches the end of the scroller. 
                    To enable Infinite scrolling, set the <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/#enableinfinitescrolling">
                    enableInfiniteScrolling </a></code> property to true. Additionally, you can efficiently display a multiple columns without performance degradation using the clumn virtualization feature. 
                    Enable column virtualization by setting the <code><a target="_blank" className="code"
                    href="http://ej2.syncfusion.com/react/documentation/api/grid/#enablecolumnvirtualization">
                    enableColumnVirtualization</a></code> property to true.
                </p>
                    <p>
                        Note: The <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#height">
                            height</a></code> property must be defined when enabling the <code><a target="_blank" className="code"
                                href="https://ej2.syncfusion.com/react/documentation/api/grid/#enableinfinitescrolling">
                                enableInfiniteScrolling </a></code>.
                    </p>
                    <p>
                    This sample demonstrates the Grid component with the infinite scrolling feature.
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>Grid component features are separated into feature-wise modules.
                         To use the InfiniteScrolling feature, inject the <code>InfiniteScroll</code> module into the <code>services</code>.</p>
                    <p>
                        To utilize column virtualization, you must integrate the <code>VirtualScroll</code> module,
                        and for infinite scrolling, integrate the <code>InfiniteScroll</code> module into your services.
                    </p>
                    <p>
                More information on the infinite scrolling can be found in this
                <a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/grid/scrolling/infinite-scrolling">
                documentation section</a>.
            </p>
            </div>
        </div>
    )
}
export default InfiniteScrolling;