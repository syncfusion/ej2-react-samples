import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, Inject } from '@syncfusion/ej2-react-dropdowns';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';

/**
 * PivotView Exporting Sample.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false
};

export class Exporting extends SampleBase<{}, {}> {

    private pivotGridObj: PivotViewComponent;
    private mode: DropDownListComponent;
    private exportType: { [key: string]: Object }[] = [
        { value: 'pdf', text: 'PDF' },
        { value: 'excel', text: 'Excel' },
        { value: 'csv', text: 'CSV' }
    ];
    private expandMode: { [key: string]: Object }[] = [
        { value: 'false', text: 'False' },
        { value: 'true', text: 'True' }
    ];
    onClick(): void {
        if (this.mode.value === 'excel') {
            this.pivotGridObj.excelExport();
        } else if (this.mode.value === 'csv') {
            this.pivotGridObj.csvExport();
        } else {
            this.pivotGridObj.pdfExport();
        }
    }

    expandModeChange(args: Args): void {
        this.pivotGridObj.dataSourceSettings.expandAll = args.checked;
        this.pivotGridObj.dataBind();
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotGridObj = pivotview }} dataSourceSettings={dataSourceSettings} allowExcelExport={true} allowPdfExport={true} showFieldList={true} width={'100%'} height={'300'} gridSettings={{columnWidth: 140}}>
                            <Inject services={[FieldList]} />
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
                                                <DropDownListComponent width={'160px'} id="etype" value="pdf" ref={d => this.mode = d} dataSource={this.exportType} fields={{ text: 'text', value: 'value' }} placeholder="PDF" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td></td>
                                        <td>
                                            <div id="btn-control" style={{ float: 'right' }}>
                                                <ButtonComponent onClick={this.onClick.bind(this)} cssClass='e-flat' isPrimary={true}>Export</ButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates client-side exporting of the pivotgrid widget to Excel, CSV and PDF formats.</p>
                </div>
                <div id="description">
                    <p>The pivotgrid widget supports client-side exporting and exports its data to the Excel, CSV and PDF formats data using
                        the
                        <code>excelExport</code>,
                        <code>csvExport</code> and
                        <code>pdfExport</code> methods.
                    </p>
                    <p>
                        Choose the export document type in the dropdown list available inside the property panel and click the export button to export
                        the widget to the selected document format.
                    </p>
                </div>
            </div>
        )
    }
}