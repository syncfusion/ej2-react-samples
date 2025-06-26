import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { IDataOptions, PivotViewComponent, VirtualScroll, Inject, FieldList, GroupingBar, Toolbar, PDFExport, ExcelExport, BeforeExportEventArgs, ToolbarArgs, ToolbarItems } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './server-side-engine.css';
import { Menu } from '@syncfusion/ej2-navigations';
import { ExcelExportProperties, PdfExportProperties } from '@syncfusion/ej2-grids';

/**
 * PivotView Server Side Engine Sample.
 */

let pivotObj: PivotViewComponent;

let toolbarOptions: ToolbarItems[] = ['Export', 'FieldList'];

let dataSourceSettings: IDataOptions = {
    url: 'https://ej2services.syncfusion.com/react/release/api/pivot/post',
    mode: 'Server',
    expandAll: false,
    enableSorting: true,
    columns: [ { name: 'Year', caption: 'Production Year' },
    ],
    values: [
        { name: 'Sold', caption: 'Units Sold' },
        { name: 'Price', caption: 'Sold Amount' }
    ],
    rows: [{ name: 'ProductID', caption: 'Product ID' }, {name: 'Country'}],
    drilledMembers: [{ name: 'ProductID', items: ['PRO-10001', 'PRO-10002', 'PRO-10003'] }],
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
        if (document.querySelector('#grid_menu .e-menu-item') == null) {
            var menuItems = [
                {
                    iconCss: 'e-toolbar-grid e-icons',
                    items: [
                        { text: 'Compact Layout', id: 'Compact' },
                        { text: 'Tabular Layout', id: 'Tabular' },
                    ],
                },
            ];
            new Menu(
                { items: menuItems, select: gridToolbarClicked.bind(this) },
                '#grid_menu'
            );
        }
    }

    function gridToolbarClicked(args: any): void {
        if (pivotObj && pivotObj.gridSettings && pivotObj.gridSettings.layout !== args.item.id) {
            pivotObj.setProperties({
                gridSettings: {
                    layout: args.item.id
                },
                displayOption: {
                    view: 'Both', primary: 'Table'
                },
            }, true);
            pivotObj.refresh();
        }
    }

    function getExcelExportProperties(excelExportProperties: ExcelExportProperties): void {
        excelExportProperties.header = {
            headerRows: 7,
            rows: [
                {
                    index: 1,
                    cells: [
                        { index: 1, colSpan: 13, value: 'INVOICE', style: { fontColor: '#C25050', fontSize: 25, hAlign: 'Center', bold: true } }
                    ]
                },
                {
                    index: 3,
                    cells: [
                        { index: 1, colSpan: 3, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
                        { index: 10, colSpan: 2, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
                        { index: 12, colSpan: 2, value: 'DATE', style: { fontColor: '#C67878', bold: true } }
                    ]
                },
                {
                    index: 4,
                    cells: [
                        { index: 1, colSpan: 3, value: '2501 Aerial Center Parkway' },
                        { index: 10, colSpan: 2, value: 2034 },
                        { index: 12, colSpan: 2, value: new Date() }
                    ]
                },
                {
                    index: 5,
                    cells: [
                        { index: 1, colSpan: 3, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
                        { index: 10, colSpan: 2, value: 'CUSTOMER ID', style: { fontColor: '#C67878', bold: true } },
                        { index: 12, colSpan: 2, value: 'TERMS', style: { fontColor: '#C67878', bold: true } }
                    ]
                },
                {
                    index: 6,
                    cells: [
                        { index: 10, colSpan: 2, value: 564 },
                        { index: 12, colSpan: 2, value: 'Net 30 days' }
                    ]
                }
            ]
        };
        excelExportProperties.footer = {
            footerRows: 3,
            rows: [
                {
                    index: 2,
                    cells: [
                        { colSpan: 13, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }
                    ]
                },
                {
                    index: 3,
                    cells: [
                        { colSpan: 13, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }
                    ]
                }
            ]
        };
    }
    
    function getPdfExportProperties(pdfExportProperties: PdfExportProperties): void {
        pdfExportProperties.header = {
            fromTop: 0,
            height: 130,
            contents: [
                {
                    type: 'Text',
                    value: 'INVOICE',
                    position: { x: 250, y: 50 },
                    style: { textBrushColor: '#C25050', fontSize: 19 },
                },
            ],
        };
        pdfExportProperties.footer = {
            fromBottom: 0,
            height: 130,
            contents: [
                {
                    type: 'Text',
                    value: 'Thank you for your business!',
                    position: { x: 250, y: 50 },
                    style: { textBrushColor: '#C67878', fontSize: 13 },
                },
            ],
        };
    }

    function beforeToolbarRender(args: ToolbarArgs): void {
        args.customToolbar.splice(2, 0, {
            template: '<ul id="grid_menu"></ul>',
            id: 'custom_toolbar'
        });
        args.customToolbar.splice(1, 0, {
            type: 'Separator'
        });
    }

    function beforeExport(args: BeforeExportEventArgs) {
        if (args.excelExportProperties) {
            getExcelExportProperties(args.excelExportProperties);
        } else if (args.pdfExportProperties) {
            getPdfExportProperties(args.pdfExportProperties);
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <PivotViewComponent id='PivotView' ref={d => pivotObj = d} dataSourceSettings={dataSourceSettings} showFieldList={true} showGroupingBar={true}
                    width={'100%'} height={'450'} dataBound={onDataBound} enableVirtualization={true} allowDataCompression={true} showToolbar={true}
                    allowPdfExport={true} allowExcelExport={true} gridSettings={{ columnWidth: Browser.isDevice ? 100 : 120, layout: 'Tabular' }} toolbarRender={beforeToolbarRender.bind(this)}
                    toolbar={toolbarOptions} beforeExport={beforeExport.bind(this)}>
                    <Inject services={[VirtualScroll, FieldList, GroupingBar, Toolbar, PDFExport, ExcelExport]} />
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p>This sample shows how to use a server-side pivot engine to fetch and display summarized data in the Pivot Table.
                    It includes export options for Excel, CSV, and PDF with headers and footers, and a layout switcher to toggle
                    between Compact and Tabular views at runtime.</p>
            </div>
            <div id="description">
                <p>
                    The Pivot Table's server-side pivot engine (external pivot engine) uses the Syncfusion<sup>®</sup> package <a
                    target="_blank" href="https://www.nuget.org/packages/Syncfusion.Pivot.Engine/"> Syncfusion<sup>®</sup>.Pivot.Engine</a> to
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
                <p>
                    The built-in toolbar includes export options for Excel, CSV, and PDF documents. These export features support
                    adding headers and footers, enabling enriched document formatting and presentation.
                </p>
                <p>
                    Additionally, a custom toolbar menu is provided to switch between <strong>Compact</strong> and
                    <strong>Tabular</strong> layouts at runtime, offering flexibility in how the summarized data is displayed.
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