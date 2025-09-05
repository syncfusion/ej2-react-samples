import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Aggregate,
  AggregatesDirective, AggregateDirective, AggregateColumnDirective, AggregateColumnsDirective,
  ToolbarItems
} from '@syncfusion/ej2-react-treegrid';
import { getObject, PdfExportProperties } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { summaryData } from './data';
import { updateSampleSection } from '../common/sample-base';
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
const CustomAggregate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let item: string = "Seafood";
  let treegridObj = useRef<TreeGridComponent>(null);
  let toolbarOptions: ToolbarItems[] = ['ExcelExport','PdfExport','CsvExport'];
   
  let listObj: DropDownList;
  const foods: { [key: string]: Object }[] = [
    { food: "Seafood" },
    { food: "Dairy" },
    { food: "Edible" },
    { food: "Crystal" },
  ];

   //Custom aggregate function to calculate the count of items for the selected category.
  const customAggregateFn = (data: any): any => {
    let sampleData: any = data.result ? getObject('result', data): data;
       
    let countLength: number;
    countLength = 0;
    if(sampleData !== undefined){
    sampleData.filter((record: Object) => {
      let data: string = getObject("category", record);
      let value: string = item;
      if (data === value) {
        countLength++;
      }
    });
  }
    return countLength;
  };
  const custom = (props): any => {
    return (
      <span>
        {" "}
        Count of <input type="text" id="customers" /> : {props.Custom}
      </span>
    );
  };

  //Initializes a DropDownList in the footer for category selection.
  const dataBound = (): void => {
    setTimeout(() => {
      if (!isNullOrUndefined(listObj)) {
        listObj.destroy();
      }
      listObj = new DropDownList({
        dataSource: foods,
        fields: { value: "food" },
        placeholder: "Select a Category",
        width: "110px",
        value: item,
        change: () => {
          setTimeout(() => {
            item = listObj.value.toString();
            treegridObj.current.refresh();
          }, 300);
        },
      });
      listObj.appendTo("#customers");
    })
  };
  const toolbarClick = (args: ClickEventArgs): void => {
          if (treegridObj && args.item.text === 'Excel Export') {
              (treegridObj as any).current.excelExport();
          }
          else if (treegridObj && args.item.text === 'PDF Export') {
              let exportProperties: PdfExportProperties = {
            pageOrientation: 'Landscape',
        };
              (treegridObj as any).current.pdfExport(exportProperties);
          }
          else if (treegridObj && args.item.text === 'CSV Export') {
              (treegridObj as any).current.csvExport();
          }
      }
  

       //Handles the 'excelAggregateQueryCellInfo' event to customize aggregate cells during Excel export.
      const excelAggregateQueryCellInfo = (args: any): void => {
           if (args.cell.column.headerText === "Category") {
                    args.style.value = "Count of " + item + " : " +args.row.data.category.Custom;
                
            }
      }
  
       //Handles the 'pdfAggregateQueryCellInfo' event to customize aggregate cells during PDF export.
      const pdfAggregateQueryCellInfo = (args: any): void => {
         if (args.cell.column.headerText === "Category") {
            args.value = "Count of " + item + " : " +args.row.data.category.Custom;
         }
      }
  return (
    <div className="control-pane">
      {/* custom code start */}
      <style>{SAMPLE_CSS}</style>
      {/* custom code end */}
      <div className="control-section">
        <TreeGridComponent
          dataSource={summaryData}
          treeColumnIndex={1}
          childMapping="subtasks"
          height="400"
          gridLines="Both"
          ref={treegridObj}
          allowExcelExport={true}
          allowPdfExport={true}
          dataBound={dataBound.bind(this)}
          excelAggregateQueryCellInfo={excelAggregateQueryCellInfo.bind(this)}
          pdfAggregateQueryCellInfo={pdfAggregateQueryCellInfo.bind(this)}
          toolbarClick={toolbarClick.bind(this)} 
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            <ColumnDirective field='ID' headerText='Order ID' width='115' textAlign='Left'></ColumnDirective>
            <ColumnDirective field='Name' headerText='Shipment Name' textAlign='Left' width='230'></ColumnDirective>
            <ColumnDirective field='shipmentDate' headerText='Shipment Date' width='135' textAlign='Right' type='date' format='yMd'></ColumnDirective>
            <ColumnDirective field='category' headerText='Category' width='220' textAlign='Left' minWidth='220' />
            <ColumnDirective field='units' headerText='Units' width='90' textAlign='Right' type='number' />
            <ColumnDirective field='unitPrice' headerText='Unit Price($)' width='100' textAlign='Right' type='number' format='C2' />
            <ColumnDirective field='price' headerText='Price($)' width='100' textAlign='Right' type='number' format='C0' />
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective showChildSummary={false}>
              <AggregateColumnsDirective>
                <AggregateColumnDirective
                  columnName="category"
                  type="Custom"
                  customAggregate={customAggregateFn.bind(this)}
                  footerTemplate={custom}
                >
                  {" "}
                </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject services={[Aggregate,Toolbar,PdfExport,ExcelExport]} />
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
  );
}
export default CustomAggregate;

