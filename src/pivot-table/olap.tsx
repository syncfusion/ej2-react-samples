import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PivotViewComponent, Inject, FieldList, CalculatedField, GroupingBar,
    Toolbar, PDFExport, ExcelExport, ConditionalFormatting, SaveReportArgs,
    FetchReportArgs, LoadReportArgs, RemoveReportArgs, RenameReportArgs, ToolbarArgs
} from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import './olap.css';

/**
 * PivotView ToolBar Sample Olap.
 */

let dataSourceSettings = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    enableSorting: true,
    columns: [{ name: '[Product].[Product Categories]', caption: 'Product Categories' }, { name: '[Measures]', caption: 'Measures' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    values: [{ name: '[Measures].[Customer Count]', caption: 'Customer Count' }, { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }],
    rows: [{ name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }],
    filters: [{ name: '[Date].[Fiscal]', caption: 'Date Fiscal' }],
    filterSettings: [{
        name: '[Date].[Fiscal]', items: ['[Date].[Fiscal].[Fiscal Quarter].&[2002]&[4]', '[Date].[Fiscal].[Fiscal Year].&[2005]'],
        levelCount: 3
    }
    ]
};

export class OlapSample extends SampleBase<{}, {}> {

    public pivotObj: any;
    public toolbarOptions: any = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Grid', 'Chart', 'MDX', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'];


    fetchReport(args: FetchReportArgs): void {
        let reportsCollection: string[] = [];
        let reeportsList: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item: any): void { reeportsList.push(item.reportName); });
        args.reportName = reeportsList;
    }
    saveReport(args: any): void {
        let report: SaveReportArgs[] = [];
        let isSave: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            report = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            report.map(function (item: any): any {
                if (args.reportName === item.reportName) {
                    item.report = args.report; isSave = true;
                }
            });
            if (!isSave) {
                report.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(report);
        }
    }
    removeReport(args: RemoveReportArgs): void {
        let reportsCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (let i: number = 0; i < reportsCollection.length; i++) {
            if (reportsCollection[i].reportName === args.reportName) {
                reportsCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    }
    loadReport(args: LoadReportArgs): void {
        let reportsCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportsCollection.map(function (item: any): void {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            this.pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
        }
    }
    renameReport(args: RenameReportArgs): void {
        let reportsCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.isReportExists) {
            for (let i: number = 0; i < reportsCollection.length; i++) {
                if (reportsCollection[i].reportName === args.rename) {
                    reportsCollection.splice(i, 1);
                }
            }
        }
        reportsCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    }
    beforeToolbarRender(args: ToolbarArgs): void {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    }
    newReport(): void {
        this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
    chartOnLoad(args): void {
        let selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme =
            selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'500'} showFieldList={true} showGroupingBar={true} gridSettings={{ columnWidth: 140 }}
                        allowExcelExport={true} allowConditionalFormatting={true} allowPdfExport={true} showToolbar={true} allowCalculatedField={true} displayOption={{ view: 'Both' }} toolbar={this.toolbarOptions}
                        newReport={this.newReport.bind(this)} renameReport={this.renameReport.bind(this)} removeReport={this.removeReport.bind(this)} loadReport={this.loadReport.bind(this)} fetchReport={this.fetchReport.bind(this)}
                        saveReport={this.saveReport.bind(this)} toolbarRender={this.beforeToolbarRender.bind(this)} chartSettings={{ title: 'Sales Analysis', load: this.chartOnLoad.bind(this) }}>
                        <Inject services={[FieldList, GroupingBar, CalculatedField, Toolbar, PDFExport, ExcelExport, ConditionalFormatting]} />
                    </PivotViewComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the rendering of a pivot table bound to an online SSAS OLAP cube as its data source.
                        OLAP cube elements like dimension, hierarchy, measure, and others can be arranged in row, column, value, and
                        slicer axes to create desired views at runtime.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, users can explore all of an OLAP cube and its elements and view the resultant report in a pivot
                        table or pivot chart at runtime. Grouping bar and field list options are included for exploring the data. Along
                        with these, toolbar options are included for switching to the pivot chart, performing report manipulation, and
                        more:
                    </p>
                    <table>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '10px 0', width: '230px;' }}>
                                <code>Create new report:</code>
                            </td>
                            <td>Allows user to create new reports at runtime.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Rename report:</code>
                            </td>
                            <td>Allows user to change current report name dynamically through UI.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Remove report:</code>
                            </td>
                            <td>Allows user to remove current report from the report collection at runtime.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Save as option:</code>
                            </td>
                            <td>Allows user to save report locally in browser memory.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Report list:</code>
                            </td>
                            <td>Swap between reports within the report collection.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Pivot Table:</code>
                            </td>
                            <td>Allows user to view data in cross-tabulation format.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Pivot Chart and its types:</code>
                            </td>
                            <td>Allows user to view data in graphical format. The chart types include column, bar, line, area, etc. It
                                also has options for showing and hiding legends and displaying chart series of different measures on
                                single and multiple axes.
                            </td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Show MDX query:</code>
                            </td>
                            <td>View the MDX query of the current pivot table that is used to fetch the data from the cube.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Export:</code>
                            </td>
                            <td>Provides options to save data in PDF, Excel, and CSV document types.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Hide subtotals and grand totals:</code>
                            </td>
                            <td>Hide grand totals and subtotals based on hierarchies in rows and columns.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Conditional formatting:</code>
                            </td>
                            <td>Allows user to customize cells base on certain conditions.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Field List:</code>
                            </td>
                            <td>Provides option to alter the report dynamically through UI.</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}