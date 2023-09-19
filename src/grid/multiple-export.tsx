import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, RowSelectEventArgs, Selection, Inject, PdfExport, ExcelExport, Toolbar, ExcelExportProperties, PdfExportProperties } from '@syncfusion/ej2-react-grids';
import { customerData, data } from './data';
import { SampleBase } from '../common/sample-base';
import './sample.css';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

type carType = { CustomerID: string, CustomerName: string, ContactName: string };

export class MultipleExport extends SampleBase<{}, {}> {

    public key: any = null;
    public detail: Object = [];
    public detailGrid: GridComponent;
    public masterGrid: GridComponent;
    public checkboxObj: CheckBoxComponent;
    public toolbarOptions: any = ['ExcelExport', 'PdfExport'];
    public exportGrids: any = ['MasterGrid', 'DetailGrid'];
    public newSheetExcelProperties: ExcelExportProperties = {
        multipleExport: { type: 'NewSheet' }
    };
    public sameSheetPdfProperties: PdfExportProperties = {
        multipleExport: { type: "AppendToPage", blankSpace: 10 }
    };
    public names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
    public master: Object = customerData.filter((e: carType) => this.names.indexOf(e.CustomerID) !== -1);;
    public rowselect(args: RowSelectEventArgs): void {
        let selRecord: carType = args.data as carType;
        let selecteMessage: any = document.getElementsByClassName('e-statustext')[0];
        let message: HTMLElement = selecteMessage.querySelector('b')
        message.textContent = selRecord.ContactName;
        this.detailGrid.dataSource = data.filter((record: carType) => record.CustomerName === selRecord.ContactName).slice(0, 5);
    }
    public toolbarClick(args: ClickEventArgs): void {
        if (this.checkboxObj.checked) {
            switch (args.item.id) {
                case 'MasterGrid_excelexport':
                    this.masterGrid.excelExport({}, true);
                    break;
                case 'MasterGrid_pdfexport':
                    this.masterGrid.pdfExport(this.sameSheetPdfProperties, true);
                    break;
            }
        }
        else {
            switch (args.item.id) {
                case 'MasterGrid_excelexport':
                    this.masterGrid.excelExport(this.newSheetExcelProperties, true);
                    break;
                case 'MasterGrid_pdfexport':
                    this.masterGrid.pdfExport({}, true);
                    break;
            }
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-9 control-section'>
                <p className="e-mastertext">Master Grid</p>
                    <GridComponent id='MasterGrid' dataSource={this.master} selectedRowIndex={2} allowExcelExport={true} allowPdfExport={true} toolbar={this.toolbarOptions}
                        exportGrids={this.exportGrids} rowSelected={this.rowselect.bind(this)} toolbarClick={this.toolbarClick.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective field='ContactName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='CompanyName' headerText='Company Name' width='150'></ColumnDirective>
                            <ColumnDirective field='Address' headerText='Address' width='150' />
                            <ColumnDirective field='Country' headerText='Country' width='150' />
                        </ColumnsDirective>
                        <Inject services={[Selection, PdfExport, ExcelExport, Toolbar]} />
                    </GridComponent>

                    <div className='e-statustext'> Showing orders of Customer:  <b></b></div>

                    <GridComponent id='DetailGrid' dataSource={this.detail} allowSelection={false} allowExcelExport={true} allowPdfExport={true} ref={grid => this.detailGrid = grid}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='Right' ></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' />
                            <ColumnDirective field='ShipName' headerText='Ship Name' width='150'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[PdfExport, ExcelExport, Toolbar]} />
                    </GridComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr>
                                <td style={{ width: '70%' }}>
                                    <div>Export Grids in same sheet</div>
                                </td>
                                <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                                    <CheckBoxComponent ref={(scope) => { this.checkboxObj = scope; }} checked={true}></CheckBoxComponent>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the client-side exporting of mutliple grids, which allows you to export the data of
                        multiple grids in the same or different pages to Excel and PDF formats.
                    </p>
                </div>

                <div id='description'>
                    <p>Data Grids support client-side exporting which allows you to export data to Excel and PDF formats.</p>
                    <p>Multiple grids can be exported by providing their <code>IDs</code> in the <code>exportGrids</code> property.</p>
                    <p>In this demo, Excel and PDF exports are enabled in both grids by setting the <code>allowExcelExport</code> and <code>allowPdfExport</code> 
                        properties to true. In the master grid, the grid IDs are listed in the 
                        <code>exportGrids</code> property which can be exported to Excel and PDF formats by clicking the toolbar buttons.
                    </p>
                    <p>The ExcelExport and PdfExport items are defined in the toolbar of the Grid. Actions are defined in
                        the <code><a target="_blank" className="code" href="https://helpej2.syncfusion.com/react/documentation/api/grid/#toolbarclick">toolbarClick</a></code> event
                        to export Grid data using <code><a target="_blank" className="code" href="https://helpej2.syncfusion.com/react/documentation/api/grid/#excelexport">excelExport</a></code> and 
                        <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/api/grid#pdfexport">pdfExport</a></code> methods.
                    </p>
                    <p>By default, in this demo grids are exported on the same page. They can be exported in separate pages by
                        unchecking the checkbox. This can be achieved by setting the multipleExport <code>type</code> of 
                        <code><a target="_blank" className="code" href="https://helpej2.syncfusion.com/react/documentation/api/grid/excelExportProperties/">ExcelExportProperties</a></code> 
                        and <code><a target="_blank" className="code" href="https://helpej2.syncfusion.com/react/documentation/api/grid/pdfExportProperties/">PdfExportProperties.</a></code>
                    </p>

                    <p style={{ fontWeight: 500 }}>Injecting Modules</p>
                    <p>
                        Grid features are segregated into individual feature-wise modules.
                        To use selection and export features, inject <code>Selection</code>, <code>ExcelExport</code> 
                        and <code>PdfExport</code> modules into the <code>services</code>.
                    </p>
                    <p>
                        More information on the exporting configuration can be found in this <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/grid/excel-export/excel-exporting">
                            excel-export</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/pdf-export/pdf-export">pdf-export</a> documentation sections.
                    </p>
                </div>
            </div>
        )
    }
}