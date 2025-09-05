import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PivotViewComponent, IDataOptions, IDataSet, IAxisSet, Inject, FieldList, CalculatedField,
    Toolbar, PDFExport, ExcelExport, ConditionalFormatting, SaveReportArgs,
    FetchReportArgs, LoadReportArgs, RemoveReportArgs, RenameReportArgs, ToolbarArgs,
    NumberFormatting, GroupingBar, VirtualScroll, DrillThrough, Grouping
} from '@syncfusion/ej2-react-pivotview';
import * as dataSource from './pivot-data/universitydata.json';
import { SampleBase } from '../common/sample-base';
import { ChartTheme } from '@syncfusion/ej2-react-charts';
import { select, createElement, Browser } from '@syncfusion/ej2-base';
import { ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import './overview.css';

/**
 * PivotView Overview Sample
 */
let UniversityData: IDataSet[] = (dataSource as any).data;
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'region', caption: 'Region' }, { name: 'country', caption: 'Country' }],
    rows: [{ name: 'rank_display', caption: 'Rank', expandAll: true, allowDragAndDrop: false },
    { name: 'university', caption: 'University', expandAll: true, allowDragAndDrop: false }],
    formatSettings: [{ name: 'international_students', format: 'N0' },
    { name: 'faculty_count', format: 'N0' }],
    dataSource: UniversityData,
    expandAll: false,
    values: [{ name: 'international_students', caption: 'Students' },
    { name: 'faculty_count', caption: 'Faculty' }],
    filters: [{ name: 'type', caption: 'University Type' }],
    filterSettings: [{ name: 'region', type: 'Exclude', items: ['Africa', 'Latin America'] }],
    fieldMapping: [{ name: 'rank_display', dataType: 'number' },
    { name: 'country', caption: 'Country' },
    { name: 'city', caption: 'City' },
    { name: 'region', caption: 'Region' },
    { name: 'research_output', caption: 'Research Output' },
    { name: 'student_faculty_ratio', caption: 'Student faculty ratio' }],
    groupSettings: [{ name: 'rank_display', type: 'Number', rangeInterval: 100 }],
    conditionalFormatSettings: [
        {
            measure: 'international_students',
            value1: 1,
            value2: 5000,
            conditions: 'Between',
            style: {
                backgroundColor: '#E10000',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'international_students',
            value1: 50000,
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#0C860C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'faculty_count',
            value1: 1,
            value2: 1000,
            conditions: 'Between',
            style: {
                backgroundColor: '#E10000',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'faculty_count',
            value1: 10000,
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#0C860C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        }
    ],
    showHeaderWhenEmpty: false,
    emptyCellsTextContent: '-',
    excludeFields: ['link', 'logo']
};

export class PivotOverview extends SampleBase<{}, {}> {

    public pivotObj: any;
    public toolbarOptions: any = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'];

    queryCellInfo(args): any {
        if (args.cell && args.cell.classList.contains('e-valuescontent') && args.data && args.data[0].hasChild) {
            let pivotValues: any; let colIndex: number = Number(args.cell.getAttribute('aria-colindex')) - 1;
            if (!isNaN(colIndex)) {
                pivotValues = this.pivotObj.pivotValues[args.data[colIndex].rowIndex][args.data[colIndex].colIndex];
            }
            if (pivotValues && args.cell && args.cell.classList.contains(pivotValues.cssClass)) {
                args.cell.classList.remove(pivotValues.cssClass);
                pivotValues.style = undefined;
            }
        }
    }

    cellTemplate(args): any {
        if (args.cellInfo && args.cellInfo.axis === 'row' && args.cellInfo.valueSort.axis === 'university') {
            let imgElement: Element = createElement('img', {
                className: 'university-logo',
                attrs: {
                    'src': UniversityData[args.cellInfo.index[0]].logo as string,
                    'alt': args.cellInfo.formattedText as string + ' Image',
                    'width': '30',
                    'height': '30'
                },
            });
            let cellValue: Element = select('.e-cellvalue', args.targetCell);
            cellValue.classList.add('e-hyperlinkcell');
            cellValue.addEventListener('click', this.hyperlinkCellClick.bind(this.pivotObj));
            args.targetCell.firstElementChild.insertBefore(imgElement, cellValue);
        }
        return '';
    }

    hyperlinkCellClick(args: MouseEvent) {
        let cell: Element = (args.target as Element).closest('.e-rowsheader');
        let pivotValue: IAxisSet = this.pivotObj.pivotValues[Number(cell.getAttribute('index'))][Number(cell.getAttribute('aria-colindex')) - 1] as IAxisSet;
        let link: string = UniversityData[pivotValue.index[0]].link as string;
        window.open(link, '_blank');
    }

    saveReport(args: any): void {
        let reports: SaveReportArgs[] = [];
        let isSaved: boolean = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            let report = JSON.parse(args.report);
            report.dataSourceSettings.dataSource = [];
            report.pivotValues = [];
            args.report = JSON.stringify(report);
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
            let report = JSON.parse(args.report);
            report.dataSourceSettings.dataSource = this.pivotObj.dataSourceSettings.dataSource;
            this.pivotObj.dataSourceSettings = report.dataSourceSettings;
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
    newReport(): void {
        this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
    beforeToolbarRender(args: ToolbarArgs): void {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    }
    chartOnLoad(args): void {
        let selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }
    chartSeriesCreated(args): void {
        this.pivotObj.chartSettings.chartSeries.legendShape = this.pivotObj.chartSettings.chartSeries.type === 'Polar' ? 'Rectangle' : 'SeriesType';
    }
    excelQueryCellInfo(args: ExcelQueryCellInfoEventArgs): void {
        if ((args?.cell as IAxisSet).axis === 'value' && (args?.cell as IAxisSet).value === undefined) {
            args.style.numberFormat = undefined;
        }
    }
    load(args): void {
        if (Browser.isDevice) {
            args.dataSourceSettings.rows = [{ name: 'rank_display', caption: 'Rank', expandAll: true, allowDragAndDrop: false }];
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
                    <div>
                        <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'600'} showFieldList={true} exportAllPages={false} maxNodeLimitInMemberEditor={50} cellTemplate={this.cellTemplate.bind(this)}
                            showGroupingBar={true} allowGrouping={true} enableVirtualization={true} enableValueSorting={true} allowDeferLayoutUpdate={true} allowDrillThrough={true} gridSettings={{
                                columnWidth: 120, allowSelection: true, rowHeight: 36,
                                selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' },
                                excelQueryCellInfo: this.excelQueryCellInfo.bind(this),
                                queryCellInfo: this.queryCellInfo.bind(this)
                            }} allowExcelExport={true} allowNumberFormatting={true} allowConditionalFormatting={true} allowPdfExport={true} showToolbar={true} allowCalculatedField={true} displayOption={{ view: 'Both' }} toolbar={this.toolbarOptions}
                            newReport={this.newReport.bind(this)} renameReport={this.renameReport.bind(this)} removeReport={this.removeReport.bind(this)} loadReport={this.loadReport.bind(this)} fetchReport={this.fetchReport.bind(this)}
                            saveReport={this.saveReport.bind(this)} toolbarRender={this.beforeToolbarRender.bind(this)} load={this.load.bind(this)} chartSettings={{ title: 'Top Universities Analysis', load: this.chartOnLoad.bind(this) }} chartSeriesCreated={this.chartSeriesCreated.bind(this)} enableFieldSearching={true}>
                            <Inject services={[FieldList, CalculatedField, Toolbar, PDFExport, ExcelExport, ConditionalFormatting, NumberFormatting, GroupingBar, Grouping, VirtualScroll, DrillThrough]} />
                        </PivotViewComponent>
                    </div>
                    <div className='urllink'>
                        Source:
                        <a href="https://www.topuniversities.com/university-rankings?utm_source=topnav" target="_blank">QS World
                            University Rankings</a>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample provides an overview of <a target="_blank"
                        href="https://www.syncfusion.com/react-components/react-pivot-table">
                        React Pivot Table</a>, which allows you to organize and summarize pivot data
                        in
                        a detailed or abstract view and display it as a grid and chart.</p>
                </div>
                <div id="description">
                    <p>
                        The React Pivot Table is a powerful control for organizing and summarizing business data and displaying the
                        results in a table and chart format. It includes major features such as built-in <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/aggregation/#aggregation">
                            aggregations</a>, <a target="_blank"
                                href="https://ej2.syncfusion.com/react/documentation/pivotview/field-list/#field-list">
                            pivot table field list</a> for report manipulation, Excel-like <a target="_blank"
                                href="https://ej2.syncfusion.com/react/documentation/pivotview/filtering/#filtering">
                            filtering</a> and <a target="_blank"
                                href="https://ej2.syncfusion.com/react/documentation/pivotview/sorting/#sorting">
                            sorting</a>, <a target="_blank"
                                href="https://ej2.syncfusion.com/react/documentation/pivotview/editing/#editing">
                            editing</a>, <a target="_blank"
                                href="https://ej2.syncfusion.com/react/documentation/pivotview/excel-export/#excel-export">
                            Excel</a> and <a target="_blank"
                                href="https://ej2.syncfusion.com/react/documentation/pivotview/pdf-export/#pdf-export">
                            PDF</a> exporting, and so on, which are used in this demo, as well as a large data source loaded without any
                        performance degradation by using <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/virtual-scrolling/#virtual-scrolling">
                            virtualization</a> support.
                    </p><br />
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Pivot Table can be found in this <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/getting-started/#getting-started">
                        documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
