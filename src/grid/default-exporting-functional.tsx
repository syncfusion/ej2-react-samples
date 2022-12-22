import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport, Group, ExcelQueryCellInfoEventArgs, PdfQueryCellInfoEventArgs, Sort } from '@syncfusion/ej2-react-grids';
import { employeeDetails } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
function Exporting() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbarOptions: any = ['ExcelExport', 'PdfExport', 'CsvExport'];
  let gridInstance: GridComponent;
  let checkboxObj: CheckBoxComponent;
  let flag: boolean = true;

  function dataBound() {
    if (flag) {
      gridInstance.toolbarModule.toolbar.hideItem(2, true);
      flag = false;
    }
  }

  function exportQueryCellInfo(args: ExcelQueryCellInfoEventArgs | PdfQueryCellInfoEventArgs): void {
    if (args.column.headerText === 'Employee Image') {
      if ((args as any).name === "excelQueryCellInfo") {
        args.image = { height: 75, base64: args.data["EmployeeImage"], width: 75 };
      } else {
        args.image = { base64: args.data["EmployeeImage"] };
      }
    }
    if (args.column.headerText === 'Email ID') {
      args.hyperLink = {
        target: 'mailto:' + args.data["EmailID"],
        displayText: args.data["EmailID"]
      };
    }
  }

  function onChanged(args: ChangeEventArgs): void {
    let fields: string[] = ["Employee Image", "Email ID"];
    if (args.checked) {
      gridInstance.showColumns(fields, "headerText");
      gridInstance.toolbarModule.toolbar.hideItem(2, true);
    }
    else {
      gridInstance.hideColumns(fields, "headerText");
      gridInstance.toolbarModule.toolbar.hideItem(2, false);
    }
  }

  function gridImageTemplate(props): any {
    var src = 'src/grid/images/' + props.EmployeeID + '.png';
    return (<div className='image'>
      <img src={src} alt={props.EmployeeID} />
    </div>);
  }
  function gridUrlTemplate(props): any {
    var src = 'mailto:${EmailID}' + props.EmailID;
    return (<div className='url'>
      <a href={src}>{props.EmailID}</a>
    </div>);
  }

  const template1: any = gridImageTemplate;
  const template2: any = gridUrlTemplate;

  function toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        gridInstance.pdfExport();
        break;
      case 'Excel Export':
        gridInstance.excelExport();
        break;
      case 'CSV Export':
        gridInstance.csvExport();
        break;
    }
  }
  return (
    <div className='control-pane'>
      <div className='col-lg-9 control-section'>
        <GridComponent dataSource={employeeDetails} ref={grid => gridInstance = grid} toolbar={toolbarOptions}
          allowExcelExport={true} allowPdfExport={true} allowSorting={true} allowGrouping={true} toolbarClick={toolbarClick.bind(this)}
          dataBound={dataBound.bind(this)} excelQueryCellInfo={exportQueryCellInfo.bind(this)} pdfQueryCellInfo={exportQueryCellInfo.bind(this)} height='350'>
          <ColumnsDirective>
            <ColumnDirective headerText='Employee Image' width='150' template={template1} textAlign='Center'></ColumnDirective>
            <ColumnDirective field='FirstName' headerText='Name' width='130' ></ColumnDirective>
            <ColumnDirective field='Title' headerText='Designation' width='180' ></ColumnDirective>
            <ColumnDirective headerText='Email ID' width='180' template={template2}></ColumnDirective>
            <ColumnDirective field='HireDate' headerText='Hire Date' width='120' format='yMd' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='Address' width='180' allowGrouping={false}></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Toolbar, ExcelExport, PdfExport, Group]} />
        </GridComponent>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tr>
              <td style={{ width: '70%' }}>
                <div>Export template column </div>
              </td>
              <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                <CheckBoxComponent ref={(scope) => { checkboxObj = scope; }} checked={true} change={onChanged.bind(this)}></CheckBoxComponent>
              </td>
            </tr>
          </table>
        </PropertyPane>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the client-side exporting of the Grid, which allows you to export its data to the Excel, Pdf and CSV formats.
          Use the toolbar buttons to export Grid data to desired format.</p>
      </div>
      <div id="description">
        <p>Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
        <p>In this demo, while exporting, we have included images and hyperlinks from the template columns i.e
          <strong><i>Image</i></strong> and <strong><i>URL</i></strong> using <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/#excelquerycellinfo">
            excelQueryCellInfo</a></code> and <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/#pdfquerycellinfo">
              pdfQueryCellInfo</a></code> events.
          The ExcelExport, PdfExport, and CsvExport items are defined in the toolbar, for which we have defined actions in toolbarClick event to export the Grid data using the
          <code><a target="_blank" className="code"

            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#excelexport">excelExport</a></code>,
          <code><a target="_blank" className="code"
            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#pdfexport">pdfExport</a></code>            and <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#csvexport">csvExport</a></code> methods.</p>

        <p>
          Note: Since CSV format is supported only plain text, images and hyperlinks will not be exported on this.</p>

        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        <p>Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject <code>ExcelExport</code>
          and <code>PdfExport</code> module into the <code>services</code></p>
        <p>
          More information on the exporting can be found in these
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/excel-exporting/">Excel Export</a> &
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/pdf-export/">PDF Export</a>
          documentation section.
        </p>
      </div>
    </div>
  )
}
export default Exporting;