import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, Pager, Inject, PagerPosition } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import './paging.css';

/**
 * PivotView sample for Paging option.
 */

function Paging () {
    React.useEffect(() => {
        updateSampleSection();
    }, []);

    let pivotObj: PivotViewComponent;
    let pagerPositions: string[] = ['Top', 'Bottom'];
    let pageSizes: string[] = ['Row', 'Column', 'Both', 'None'];
    let pagerViewData: string[] = ['Row', 'Column', 'Both'];

    let remoteData: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/react/release/api/order',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    let dataSourceSettings: IDataOptions = {
        type: 'JSON',
        dataSource: remoteData,
        expandAll: true,
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
        filters: []
    };

    function onDropDownChange(args: ChangeEventArgs): void {
        if (args.element.id === 'Pager_Position') {
            pivotObj.pagerSettings.position = args.value as PagerPosition;
        } else if (args.element.id === 'Pager_View') {
            if (args.value === 'Row') {
                pivotObj.pagerSettings.showRowPager = true;
                pivotObj.pagerSettings.showColumnPager = false;
            } else if (args.value === 'Column') {
                pivotObj.pagerSettings.showRowPager = false;
                pivotObj.pagerSettings.showColumnPager = true;
            } else {
                pivotObj.pagerSettings.showRowPager = pivotObj.pagerSettings.showColumnPager = true;
            }
        } else {
            if (args.value === 'Row') {
                pivotObj.pagerSettings.showRowPageSize = true;
                pivotObj.pagerSettings.showColumnPageSize = false;
            } else if (args.value === 'Column') {
                pivotObj.pagerSettings.showRowPageSize = false;
                pivotObj.pagerSettings.showColumnPageSize = true;
            } else if (args.value === 'Both') {
                pivotObj.pagerSettings.showRowPageSize = pivotObj.pagerSettings.showColumnPageSize = true;
            } else {
                pivotObj.pagerSettings.showRowPageSize = pivotObj.pagerSettings.showColumnPageSize = false;
            }
        }
    };

    function compactCheckBoxChange(args: Args): void {
        pivotObj.pagerSettings.enableCompactView = args.checked;
    };

    function inverseCheckBoxChange(args: Args): void {
        pivotObj.pagerSettings.isInversed = args.checked;
    };

    return (
        <div className='control-pane'>
            <div className='col-lg-9 control-section component-section' style={{ overflow: 'auto' }}>
                <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'600'} gridSettings={{ columnWidth: 120 }} pageSettings={{
                    rowPageSize: 10,
                    columnPageSize: 5,
                    currentColumnPage: 1,
                    currentRowPage: 1
                }} pagerSettings={{
                    position: 'Bottom',
                    enableCompactView: false,
                    showColumnPager: true,
                    showRowPager: true
                }} enablePaging={true}>
                    <Inject services={[Pager]} />
                </PivotViewComponent>
            </div>
            <div className="col-lg-3 property-section pivot-property-section">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" style={{ width: "100%", height: "100%" }} className="pivot-property-panel-table property-panel-table">
                        <tbody>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div className="hdrlabel">Pager Position
                                    </div>
                                </td>   
                                <td>
                                    <div>
                                        <DropDownListComponent change={onDropDownChange.bind(this)} id="Pager_Position" dataSource={pagerPositions} index={1} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div className="hdrlabel">Show Pager
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent change={onDropDownChange.bind(this)} id="Pager_View" dataSource={pagerViewData} index={2} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div className="hdrlabel">Show Page Size
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent change={onDropDownChange.bind(this)} id="Page_Size" dataSource={pageSizes} index={2} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div className="hdrlabel">Compact View
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <CheckBoxComponent id='Compact_View' change={compactCheckBoxChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div className="hdrlabel">Inverse Pager
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <CheckBoxComponent id='Inverse' change={inverseCheckBoxChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample shows how to use the paging option to break and load a large data source into chunks and display them
                    page by page. You can also use the built-in navigation buttons to move between pages.
                </p>
            </div>
            <div id="description">
                <p>The pivot table provides an optimized way to render rows and columns page by page without displaying the entire
                    pivot data. To enable paging, set the <code>enablePaging</code> property to <b>true</b>. You can also configure
                    page information for
                    row and column, such as page size, current page, and so on, using the <code>pageSettings</code>. The
                    <code>pageSettings</code>
                    properties are explained in-detail below:
                </p>
                <table>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>currentRowPage :</code>
                        </td>
                        <td>Holds the current page number, row-wise. You can also change the page number at runtime.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "10px 0", width: '180px' }}>
                            <code>currentColumnPage :</code>
                        </td>
                        <td>Holds the current page number, column-wise. You can also change the page number at runtime.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>rowPageSize :</code>
                        </td>
                        <td>Indicates the number of records to be displayed in each page, row-wise. You can also change the page
                            size at runtime.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>columnPageSize :</code>
                        </td>
                        <td>Indicates the number of records to be displayed in each page, column-wise. You can also change the page
                            size at runtime.</td>
                    </tr>
                </table>
                <br />
                <p>Also, you can customize the paging UI by changing the position, visibility, page size, and other settings for
                    row and column using the <code>pagerSettings</code>. The <code>pagerSettings</code> properties are explained
                    in-detail below:
                </p>
                <table>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "10px 0", width: '180px' }}>
                            <code>position :</code>
                        </td>
                        <td>Display the pager UI either at top or bottom of the Pivot Table.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>isInversed :</code>
                        </td>
                        <td>Toggle and display the row and column pagers.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>showRowPager :</code>
                        </td>
                        <td>Show or hide the row pager in the pager UI.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>showColumnPager :</code>
                        </td>
                        <td>Show or hide the column pager in the pager UI.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>showRowPageSize :</code>
                        </td>
                        <td>Show or hide the pre-defined page sizes in the row pager UI.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>showColumnPageSize :</code>
                        </td>
                        <td>Show or hide the pre-defined page sizes in the column pager UI.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>rowPageSizes :</code>
                        </td>
                        <td>Allows you to assign a set of pre-defined page sizes in the pager UI's "Rows per page" dropdown, which
                            can be used to change the number of records displayed in row at runtime.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>columnPageSizes :</code>
                        </td>
                        <td>Allows you to assign a set of pre-defined page sizes in the pager UI's "Columns per page" dropdown,
                            which can be used to change the number of records displayed in column at runtime.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>enableCompactView :</code>
                        </td>
                        <td>Allows the paging UI to be displayed with minimal design by hiding all paging information except
                            navigation options.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", padding: "4px 0" }}>
                            <code>template :</code>
                        </td>
                        <td>Allows you to change the appearance of the pager UI by displaying user-defined HTML elements instead of
                            built-in HTML elements.</td>
                    </tr>
                </table>
                <br />
                <p>
                    <strong>Injecting Module:</strong>
                </p>
                <p>
                    The pivot table features are segregated into individual modules. To use the paging option, we
                    need to inject the
                    <code>Pager</code> module using the
                    <code> services</code> tag.
                </p><br />
                <p>
                    More information on the paging can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/paging">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default Paging;