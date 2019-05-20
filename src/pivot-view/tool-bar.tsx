import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PivotViewComponent, IDataOptions, Inject, FieldList, CalculatedField,
    Toolbar, PDFExport, ExcelExport, ConditionalFormatting, SaveReportArgs,
    FetchReportArgs, LoadReportArgs, RemoveReportArgs, RenameReportArgs, ToolbarArgs
} from '@syncfusion/ej2-react-pivotview';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';
import './tool-bar.css';

/**
 * PivotView Toolbar Sample
 */

let dataSource: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    data: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};

export class PivotToolbar extends SampleBase<{}, {}> {

    public pivotGridObj: any;
    public toolbarOptions: any = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'];


    saveReport(args: any): void {
        let reports: SaveReportArgs[] = [];
        let isSaved: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            reports.map(function (item: any): any {
                if (args.reportName === item.reportName) {
                    item.report = args.report; isSaved = true;
                }
            });
            if (!isSaved) {
                reports.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(reports);
        }
    }
    fetchReport(args: FetchReportArgs): void {
        let reportCollection: string[] = [];
        let reeportList: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): void { reeportList.push(item.reportName); });
        args.reportName = reeportList;
    }
    loadReport(args: LoadReportArgs): void {
        let reportCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): void {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            this.pivotGridObj.dataSource = JSON.parse(args.report).dataSource;
        }
    }
    removeReport(args: RemoveReportArgs): void {
        let reportCollection: any[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (let i: number = 0; i < reportCollection.length; i++) {
            if (reportCollection[i].reportName === args.reportName) {
                reportCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    }
    renameReport(args: RenameReportArgs): void {
        let reportCollection: string[] = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    }
    newReport(): void {
        this.pivotGridObj.setProperties({ dataSource: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
	beforeToolbarRender(args: ToolbarArgs): void {
        args.customToolbar.splice(6, 0, {
            type: 'Separator' 
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator' 
        });
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id='pivot-grid-section' style={{ overflow: 'initial' }}>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotGridObj = scope; }} dataSource={dataSource} width={'100%'} height={'300'} showFieldList={true} gridSettings={{ columnWidth: 140 }}
                        allowExcelExport={true} allowConditionalFormatting={true} allowPdfExport={true} showToolbar={true} allowCalculatedField={true} displayOption = {{view:'Both'}} toolbar={this.toolbarOptions}
						 newReport={this.newReport.bind(this)} renameReport={this.renameReport.bind(this)} removeReport={this.removeReport.bind(this)} loadReport={this.loadReport.bind(this)} fetchReport={this.fetchReport.bind(this)}
						 saveReport={this.saveReport.bind(this)} toolbarRender={this.beforeToolbarRender.bind(this)}>
                        <Inject services={[FieldList, CalculatedField, Toolbar, PDFExport, ExcelExport, ConditionalFormatting]} />
                    </PivotViewComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the toolbar options of the pivotgrid widget.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, users can generate a report at runtime, as well as save and load them. Save and load operations
                        are performed in localStorage (session storage) using the saveReport and loadReport events. Users can change the
                        grid or chart view using the toggle option. Other toolbar options available are:
                    </p>
                    <p>
                        <ul>
                            <li>Create new report.</li>
                            <li>Rename report.</li>
                            <li>Remove report.</li>
                            <li>Save as option.</li>
                            <li>Hide subtotals and grand totals.</li>
                            <li>Export to PDF, Excel, and CSV.</li>
                            <li>PivotTable Field List</li>
                        </ul>
                    </p>
                </div>
            </div>
        )
    }
}