import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './pivot-table-exporting.css';
import { PivotViewComponent, IDataOptions, IDataSet, GroupingBar, FieldList, VirtualScroll , Toolbar, ExcelExport, Inject } from '@syncfusion/ej2-react-pivotview';
import { Menu } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';

/**
 * PivotView Default Sample.
 */

let dataSourceSettings: IDataOptions = {
    url: 'https://ej2services.syncfusion.com/react/development/api/pivot/post',
    mode: 'Server',
    expandAll: true,
    enableSorting: true,
    columns: [ { name: 'Year', caption: 'Production Year' },
    ],
    values: [
        { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }
    ],
    rows: [{ name: 'Country' }, {name: 'Products'}],
    formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' }],
    filters: []
};

export class PivotTableExporting extends SampleBase<{}, {}> {

    public pivotObj: any;
    public toolbarOptions: any = ['Chart', 'FieldList'];

    toolbarRender(args): void {
        args.customToolbar.splice(0, 0, {
            prefixIcon: 'e-menu-icon e-pivotview-excel-export e-icons',
            tooltipText: 'Excel Export as Pivot',
            click: this.toolbarClicked.bind(this),
        });
        args.customToolbar.splice(1, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(2, 0, {
            template: '<ul id="grid_menu"></ul>',
            id: 'custom_toolbar'
        });
        args.customToolbar.splice(3, 0, {
            type: 'Separator'
        });
    }

    onDataBound(): void {
        if (Browser.isDevice && this.pivotObj && this.pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
        if (document.querySelector('#grid_menu .e-menu-item') == null) {
            let menuItems = [
                {
                    iconCss: 'e-toolbar-grid e-icons',
                    items: [
                        { text: 'Compact Layout', id: 'Compact' },
                        { text: 'Tabular Layout', id: 'Tabular' },
                    ],
                },
            ];
            new Menu(
                { items: menuItems, select: this.gridToolbarClicked },
                '#grid_menu'
            );
        }
    }

    toolbarClicked(): void {
        this.pivotObj.exportAsPivot();
    }

    gridToolbarClicked(args: any): void {
        if (this.pivotObj && this.pivotObj.gridSettings && this.pivotObj.gridSettings.layout !== args.item.id && (args.item.id == 'Compact' || args.item.id == 'Tabular')) {
            this.pivotObj.setProperties({
                gridSettings: {
                    layout: args.item.id
                },
                displayOption: {
                    view: 'Both', primary: 'Table'
                },
            }, true);
            this.pivotObj.refresh();
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <PivotViewComponent id='PivotView' ref={d => this.pivotObj = d} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} showToolbar={true} allowPdfExport={true}
                        gridSettings={{ columnWidth: Browser.isDevice ? 100 : 120 }} showFieldList={true} showGroupingBar={true} allowDataCompression={true} allowExcelExport={true}
                        displayOption={{ view: 'Both' }} toolbar={this.toolbarOptions} chartSettings={{
                            title: 'Sales Analysis', primaryYAxis: { border: { width: 0 } }, legendSettings: { visible: false, },
                            chartSeries: { type: 'Bar', animation: { enable: false } }
                        }} toolbarRender={this.toolbarRender} dataBound={this.onDataBound}>
                        <Inject services={[FieldList, Toolbar, ExcelExport, GroupingBar, VirtualScroll]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates exporting a server-side Syncfusion Pivot Table as a fully interactive Excel Pivot Table.
                    </p>
                </div>
                <div id="description">
                    <p>This sample shows how to export a <strong>server-side</strong> Syncfusion Pivot Table to an Excel file while
                        preserving its native pivot structure. The exported Excel file supports full interactivity, allowing users to
                        customize pivot configurations directly within Excel.</p>
                    <p>The Pivot Table uses a server-side pivot engine powered by the <a target="_blank"
                            href="https://www.nuget.org/packages/Syncfusion.Pivot.Engine/"> Syncfusion.Pivot.Engine</a> package. This
                        engine runs on a separate hosted server, performing all pivot operations—including <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/aggregation/#aggregation">
                            aggregation</a>, <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/filtering/#filtering">
                            filtering</a>, <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/sorting/#sorting">
                            sorting</a>, and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/grouping">
                            grouping</a> and returns only paged data to the client. The connection to the remote service is configured
                        using the <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettings/#url">
                            dataSourceSettings-&gt;url</a> property.</p>
                    <p><strong>Excel Export</strong> is available via the built-in toolbar and generates a true Excel Pivot Table, not
                        just static data. This enables users to interact with and manipulate the exported report directly in Excel.</p>
                    <p>Additionally, the toolbar includes custom menu items to toggle between <code>Compact</code> and
                        <code>Tabular</code> layouts and to switch chart types dynamically. This empowers users to customize both the
                        visual structure and the associated chart representation of their data.</p>
                    <br />
                    <p>
                    <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivot table features are segregated into individual modules. To use the exporting option, we need
                        to inject the
                                    <code> Excel Export</code> module into the
                                    <code> services</code>.
                    </p><br />
                    <p>
                        More information about server-side aggregation can be found in this <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/server-side-pivot-engine">
                            documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}