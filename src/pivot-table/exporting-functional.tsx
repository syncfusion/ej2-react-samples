import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList, ExcelExport, ExcelExportProperties, PdfExportProperties, ConditionalFormatting, PDFExport } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, Inject } from '@syncfusion/ej2-react-dropdowns';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './exporting.css';

/**
 * PivotView Exporting Sample.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [
        { name: 'Amount', format: 'C0' },
        { name: 'In_Stock', format: 'N0' },
        { name: 'Sold', format: 'N0' },
    ],
    columns: [{ name: 'Year', expandAll: true }, { name: 'Quarter' }],
    dataSource: Pivot_Data,
    expandAll: false,
    conditionalFormatSettings: [
        {
            measure: 'In_Stock',
            value1: 120,
            conditions: 'LessThan',
            style: {
                backgroundColor: '#FF005C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            value1: 150,
            measure: 'In_Stock',
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#35B65A',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'Sold',
            value1: 1000,
            conditions: 'LessThan',
            style: {
                backgroundColor: '#FF005C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            value1: 1100,
            measure: 'Sold',
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#35B65A',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'Amount',
            value1: 7000,
            conditions: 'LessThan',
            style: {
                backgroundColor: '#FF005C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            value1: 12000,
            measure: 'Amount',
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#35B65A',
                color: 'white',
                fontFamily: 'Segoe UI',
                fontSize: '12px'
            },
            applyGrandTotals: false
        }
    ],
    drilledMembers: [{ name: 'Country', items: ['France'] }],
    filterSettings: [
        { name: 'Year', type: 'Include', items: ['FY 2026'] },
        { name: 'Products', type: 'Include', items: ['Gloves', 'Fenders'] },
    ]
};

function Exporting () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: PivotViewComponent;
    let mode: DropDownListComponent;
    let exportType: { [key: string]: Object }[] = [
        { value: 'pdf', text: 'PDF' },
        { value: 'excel', text: 'Excel' },
        { value: 'csv', text: 'CSV' }
    ];
    let expandMode: { [key: string]: Object }[] = [
        { value: 'false', text: 'False' },
        { value: 'true', text: 'True' }
    ];
    let today: string = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    function onClick(): void {
        if (mode.value === 'excel') {
            let excelExportProperties: ExcelExportProperties = {
                header: {
                    headerRows: 4,
                    rows: [
                        { cells: [{ colSpan: 10, value: "Sales Performance Report - Q1 2026", style: { fontColor: '#1B4965', fontSize: 20, hAlign: 'Center', bold: true } }] },
                        { cells: [{ colSpan: 10, value: "Region: Global | Currency: USD", style: { fontColor: '#35B65A', fontSize: 15, hAlign: 'Center', bold: true } }] }
                    ]
                },
                footer: {
                    footerRows: 4,
                    rows: [
                        { cells: [{ colSpan: 10, value: "Total In Stock: 1,863 | Total Units Sold: 6,327 | Total Sold Amount: $2,381,015", style: { fontColor: '#35B65A', fontSize: 15, hAlign: 'Center', bold: true } }] },
                        { cells: [{ colSpan: 10, value: `Report generated on: ${today}`, style: { fontColor: '#1B4965', fontSize: 15, hAlign: 'Center', bold: true } }] }
                    ]
                }
            };
            pivotObj.excelExport(excelExportProperties);
        } else if (mode.value === 'csv') {
            pivotObj.csvExport();
        } else {
            let pdfExportProperties: PdfExportProperties = {
                header: {
                    fromTop: 0,
                    height: 130,
                    contents: [
                        {
                            type: 'Text',
                            value: 'Sales Performance Report - Q1 2026',
                            position: { x: 275, y: 30 },
                            style: { textBrushColor: '#1B4965', fontSize: 35 }
                        },
                        {
                            type: 'Text',
                            value: 'Region: Global | Currency: USD',
                            position: { x: 385, y: 80 },
                            style: { textBrushColor: '#35B65A', fontSize: 22 }
                        }
                    ]
                },
                footer: {
                    fromBottom: 160,
                    height: 150,
                    contents: [
                        {
                            type: 'Text',
                            value: "Total In Stock: 1,863 | Total Units Sold: 6,327 | Total Sold Amount: $2,381,015",
                            position: { x: 275, y: 0 },
                            style: { textBrushColor: '#35B65A', fontSize: 18 }
                        },
                        {
                            type: 'Text',
                            value: `Report generated on: ${today}`,
                            position: { x: 385, y: 25 },
                            style: { textBrushColor: '#1B4965', fontSize: 18 }
                        },
                        {
                            type: 'PageNumber',
                            pageNumberType: 'Numeric',
                            format: 'Page {$current} of {$total}',
                            position: { x: 915, y: 120 },
                            style: { textBrushColor: '#1B4965', fontSize: 20 }
                        }
                    ]
                }
            };
            pivotObj.pdfExport(pdfExportProperties);
        }
    }

    function expandModeChange(args: Args): void {
        pivotObj.dataSourceSettings.expandAll = args.checked;
        pivotObj.dataBind();
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-8 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} allowExcelExport={true} allowPdfExport={true} showFieldList={true} width={'100%'} height={'350'} gridSettings={{ columnWidth: 140 }} allowConditionalFormatting={true}>
                        <Inject services={[FieldList, ExcelExport, ConditionalFormatting, PDFExport]} />
                    </PivotViewComponent>
                </div>
                <div className='col-lg-4 property-section' style={{ paddingRight: 0 }}>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Export Type:</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            {/* Render the DropDownList Component */}
                                            <DropDownListComponent id="etype" value="pdf" ref={d => mode = d} dataSource={exportType} fields={{ text: 'text', value: 'value' }} placeholder="PDF" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td></td>
                                    <td>
                                        <div id="btn-control" style={{ float: 'right' }}>
                                            <ButtonComponent onClick={onClick.bind(this)} isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates client-side exporting of the pivot table to Excel, CSV and PDF formats.</p>
            </div>
            <div id="description">
                <p>
                    The pivot table supports client-side exporting and allows data to be exported in Excel, CSV, and PDF formats
                    using the
                    <code>excelExport</code>,
                    <code>csvExport</code>, and
                    <code>pdfExport</code> methods.
                    To perform an export, the desired document type can be selected from the dropdown list in the property panel,
                    followed by clicking the "Export" button.
                </p>

                <p>
                    Headers and footers can also be added during export.
                    For Excel, the <code>header</code> and <code>footer</code> properties are defined in the
                    <code>excelExportProperties</code> object and passed to the <code>excelExport</code> method.
                    For PDF, the <code>header</code> and <code>footer</code> properties are defined in the
                    <code>pdfExportProperties</code> object and passed to the <code>pdfExport</code> method.
                </p>

                <p>
                    More information on exporting is available in the corresponding
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/excel-export">Excel
                        Export</a>,
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/excel-export#export-data-to-a-csv-file">CSV Export</a>,
                    and
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/pdf-export">PDF
                        Export</a>
                    documentation sections.
                </p>
            </div>
        </div>
    )
}

export default Exporting;