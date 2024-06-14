import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Internationalization } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, DetailRow, ExportDetailTemplateEventArgs, ExcelExport, Inject, PdfExport, Toolbar, Sort, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { updateSampleSection } from '../common/sample-base';
import "./sample.css";

let instance: Internationalization = new Internationalization();

interface DateFormat extends Window {
    format?: Function;
}

function DetailTemplateExport() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbarOptions: any = ['ExcelExport', 'PdfExport'];
    let gridInstance: GridComponent;
    const format = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }

    function gridTemplate(props): any {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (<table className="detailtable" style={{ width: "100%" }} >
            <colgroup>
                <col style={{ width: "35%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "30%" }} />
            </colgroup>
            <tbody>
                <tr>
                    <td rowSpan={4} className='images'>
                        <img className='photo' src={src} alt={props.EmployeeID} />
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>First Name: </span> {props.FirstName}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>Postal Code: </span> {props.PostalCode}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>Last Name: </span> {props.LastName}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>City: </span> {props.City}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>Title: </span> {props.Title}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>Phone: </span> {props.HomePhone}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>Address: </span> {props.Address}
                    </td>
                    <td>
                        <span style={{ fontWeight: 500 }}>HireDate: </span> {format(props.HireDate)}
                    </td>
                </tr>
            </tbody>
        </table>
        );
    }

    const template: any = gridTemplate;

    function toolbarClick(args: ClickEventArgs): void {
        switch (args.item.id) {
          case 'DetailTemplateExport_pdfexport':
            gridInstance.pdfExport({ hierarchyExportMode: 'All' });
            break;
          case 'DetailTemplateExport_excelexport':
            gridInstance.excelExport({ hierarchyExportMode: 'All' });
            break;
        }
      }

      function exportDetailTemplate(args: ExportDetailTemplateEventArgs): void {
        args.value = {
            columnCount: 3,
            rows: [
                {
                    cells: [
                        {
                            index: 0, rowSpan: 4, image: args.action === 'excelexport' ? {
                                base64: args.parentRow.data['EmployeeImage'],
                                height: 80, width: 80
                            } : { base64: args.parentRow.data['EmployeeImage'], width: 80 }
                        },
                        { index: 1, value: 'First Name: ' + args.parentRow.data['FirstName'] },
                        { index: 2, value: 'Postal Code: ' + args.parentRow.data['PostalCode'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Last Name: ' + args.parentRow.data['LastName'] },
                        { index: 2, value: 'City: ' + args.parentRow.data['City'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Title: ' + args.parentRow.data['Title'] },
                        { index: 2, value: 'Phone: ' + args.parentRow.data['HomePhone'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Address: ' + args.parentRow.data['Address'] },
                        { index: 2, value: 'HireDate: ' + format(args.parentRow.data['HireDate']) }
                    ]
                }
            ]
        };
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
            <GridComponent id='DetailTemplateExport' dataSource={employeeData} ref={grid => gridInstance = grid} toolbar={toolbarOptions}
                        allowExcelExport={true} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} allowPdfExport={true} toolbarClick={toolbarClick.bind(this)}
                        detailTemplate={template.bind(this)} exportDetailTemplate={exportDetailTemplate.bind(this)} width='auto'>
                        <ColumnsDirective>
                            <ColumnDirective field='FirstName' headerText='First Name' width='110' />
                            <ColumnDirective field='LastName' headerText='Last Name' width='110' />
                            <ColumnDirective field='Title' headerText='Name' width='240' />
                            <ColumnDirective field='Country' headerText='Country' width='180' />
                        </ColumnsDirective>
                        <Inject services={[DetailRow, ExcelExport, PdfExport, Toolbar, Sort, Filter]} />
                    </GridComponent>
            </div>
            
            <div id="action-description">
                <p>This sample demonstrates how to export detail grids. In this sample, you can export the detail grid by
                    clicking the corresponding export button on the grid's toolbar.</p>
            </div>
            <div id="description">
                <p>
                    The detail row template provides additional information about a data row which can shown or hidden by clicking the
                    expand or collapse button. The <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid#detailtemplate">
                        detailTemplate</a></code> property accepts either the string or HTML element`s ID value, which will be used as the
                    template for the detail row.
                </p>
                <p>
                    In this demo, Employees' information is displayed in the detail row.
                </p>
                <p>Data Grid supports client-side exporting to export data to the Excel and PDF formats.</p>
                <p>In this demo, the Employees' information can be exported using the <code>exportDetailTemplate</code> event where each cell can be customized.
                    The ExcelExport and PdfExport items are defined in the toolbar of the Grid. Actions are defined in
                    the <code><a target="_blank" className="code" href="https://helpej2.syncfusion.com/react/documentation/api/grid/#toolbarclick">toolbarClick</a></code> event
                    to export Grid data using <code><a target="_blank" className="code" href="https://helpej2.syncfusion.com/react/documentation/api/grid/#excelexport">excelExport</a>
                    </code> and <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/api/grid#pdfexport">pdfExport</a></code> methods with the
                    <code>hierarchyExportMode</code> set to <code>All</code>.
                </p>
                <p>
                    The detail grids' export options can be changed by using the <code>hierarchyExportMode</code> property.
                </p>
                <p>The detail template allows you to export the grid with the following options,</p>
                <ul>
                    <li><code>Expanded</code> : Exports only the visible detail rows in an expanded state.</li>
                    <li><code>All</code> : Exports all the detail rows in an expanded state.</li>
                    <li><code>None</code> : Exports the detail rows in a collapsed state.</li>
                </ul>
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Grid features are segregated into individual feature-wise modules.
                    To use the detail template, PdfExport and ExcelExport Grid features, inject <code>DetailRow</code>,
                    <code>PdfExport</code>, <code>ExcelExport</code> modules into the <code>services</code>.
                </p>
                <p>
                    More information on the exporting configuration can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/excel-export/excel-exporting">Excel-export</a>
                    and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/pdf-export/pdf-export">PDF-export</a> documentation sections.
                </p>
            </div>
        </div>
    )
}
export default DetailTemplateExport;