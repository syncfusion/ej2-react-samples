import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Aggregate,
  AggregatesDirective, AggregateDirective, AggregateColumnDirective, AggregateColumnsDirective,
  ToolbarItems
} from '@syncfusion/ej2-react-treegrid';
import { ExcelQueryCellInfoEventArgs, getObject, PdfExportProperties, PdfQueryCellInfoEventArgs } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { summaryData } from './data';
import { SampleBase } from '../common/sample-base';
import { ExcelExport, PdfExport, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
{/* custom code start */ }
const SAMPLE_CSS = `
  .fluent2 input#customers {
        padding-bottom: 8px !important;
  }
        
  .bootstrap5\.3 input#customers {
      padding-bottom: 5px !important;
  }

  .e-summarycell.e-templatecell {
    pointer-events:visible !important;
  }
  
  .e-treegrid .e-summarycell.e-templatecell .e-input-group input.e-control.e-dropdownlist.e-lib.e-input {
    padding-left: 6px !important;
  }`;
{/* custom code end */ }
export class CustomAggregate extends SampleBase<{}, {}> {
  public item: string = 'Seafood';
  public toolbarOptions: ToolbarItems[] = ['ExcelExport', 'PdfExport', 'CsvExport'];
  public treegridObj: TreeGridComponent;

  public listObj: DropDownList;

  public foods: { [key: string]: Object }[] = [
    { food: 'Seafood' },
    { food: 'Dairy' },
    { food: 'Edible' },
    { food: 'Crystal' },
  ];

  //Custom aggregate function to calculate the count of items for the selected category.
  public customAggregateFn(data: any): any {
    let sampleData: any = data.result ? getObject('result', data) : data;

    let countLength: number; countLength = 0;
    if (sampleData !== undefined) {
      sampleData.filter((record: Object) => {
        let data: string = getObject('category', record);
        let value: string = this.item;
        if (data === value) {
          countLength++;
        }
      });
    }
    return countLength;
  }

  public custom(props): any {
    return (<span> Count of <input type="text" id="customers" /> : {props.Custom}</span>)
  }

  //Initializes a DropDownList in the footer for category selection.
  public dataBound(): void {
    setTimeout(
      () => {
        if (!isNullOrUndefined(this.listObj)) {
          this.listObj.destroy();
        }
        this.listObj = new DropDownList({
          dataSource: this.foods,
          fields: { value: 'food' },
          placeholder: 'Select a Category',
          width: '110px',
          value: this.item,
          change: () => {
            setTimeout(
              () => {
                this.item = this.listObj.value.toString();
                this.treegridObj.refresh();
              }, 300);
          }
        });
        this.listObj.appendTo('#customers');
      })
  }

  public toolbarClick = (args: ClickEventArgs): void => {
    if (this.treegridObj && args.item.text === 'Excel Export') {
      (this.treegridObj as any).excelExport();
    }
    else if (this.treegridObj && args.item.text === 'PDF Export') {
      let exportProperties: PdfExportProperties = {
                  pageOrientation: 'Landscape',
              };
      (this.treegridObj as any).pdfExport(exportProperties);
    }
    else if (this.treegridObj && args.item.text === 'CSV Export') {
      (this.treegridObj as any).csvExport();
    }
  }

  //Handles the 'excelAggregateQueryCellInfo' event to customize aggregate cells during Excel export.
  public excelAggregateQueryCellInfo = (args: any): void => {
    if (args.cell.column.headerText === "Category") {
      args.value = "Count of " + this.item + " : " + args.row.data.category.Custom;
    }
  }

  //Handles the 'pdfAggregateQueryCellInfo' event to customize aggregate cells during PDF export.
  public pdfAggregateQueryCellInfo = (args: any): void => {
    if (args.cell.column.headerText === "Category") {
      args.value = "Count of " + this.item + " : " + args.row.data.category.Custom;
    }
  }
  render() {
    return (
      <div className='control-pane'>
        {/* custom code start */}
        <style>
          {SAMPLE_CSS}
        </style>
        {/* custom code end */}
        <div className='control-section'>
          <TreeGridComponent dataSource={summaryData} treeColumnIndex={1} gridLines="Both" childMapping='subtasks' height='400' allowExcelExport={true} allowPdfExport={true} excelAggregateQueryCellInfo={this.excelAggregateQueryCellInfo.bind(this)} pdfAggregateQueryCellInfo={this.pdfAggregateQueryCellInfo.bind(this)}
            ref={treegrid => this.treegridObj = treegrid} toolbarClick={this.toolbarClick.bind(this)} toolbar={this.toolbarOptions} dataBound={this.dataBound.bind(this)}>
                  <ColumnsDirective>
                            <ColumnDirective field='ID' headerText='Order ID' width='115' textAlign='Left'></ColumnDirective>
                            <ColumnDirective field='Name' headerText='Shipment Name' textAlign='Left' width='230'></ColumnDirective>
                            <ColumnDirective field='shipmentDate' headerText='Shipment Date' width='135' textAlign='Right' type='date' format='yMd'></ColumnDirective>
                            <ColumnDirective field='category' headerText='Category' width='220' textAlign='Left' minWidth='220' />
                            <ColumnDirective field='units' headerText='Total Units' width='90' textAlign='Right' type='number' />
                            <ColumnDirective field='unitPrice' headerText='Unit Price($)' width='100' textAlign='Right' type='number' format='C2' />
                            <ColumnDirective field='price' headerText='Price($)' width='100' textAlign='Right' type='number' format='C0' />
                          </ColumnsDirective>
            <AggregatesDirective>
              <AggregateDirective showChildSummary={false}>
                <AggregateColumnsDirective>
                  <AggregateColumnDirective columnName='category' type='Custom'
                    customAggregate={this.customAggregateFn.bind(this)} footerTemplate={this.custom}> </AggregateColumnDirective>
                </AggregateColumnsDirective>
              </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Aggregate, ExcelExport, PdfExport, Toolbar]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates custom aggregates and exporting functionality in the Tree Grid. Aggregate values for the columns are displayed in the column footer, and export options are available via the toolbar buttons.</p>
        </div>
        <div id="description">
          <p>The Tree Grid supports displaying aggregates in the footer, which can be configured using the <code>aggregates</code> property. Here, a <code>customAggregate</code> configuration is applied to the <b>Category</b> column to show a dropdown that displays the count of the selected category.</p>
          <p>
            The Tree Grid also supports seamless exports to <b>Excel</b>, <b>PDF</b>, or <b>CSV</b> with a single click. The <code>excelAggregateQueryCellInfo</code> and <code>pdfAggregateQueryCellInfo</code> events ensure that footer aggregate values are accurately preserved in the exported files.
          </p>
          <p>
            More information about custom aggregate can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/aggregates/custom-aggregate">documentation</a> section.
          </p>
        </div>
      </div>
    )
  }
}
