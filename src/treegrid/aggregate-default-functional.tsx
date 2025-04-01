import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Aggregate,
  AggregatesDirective, AggregateDirective, AggregateColumnDirective, AggregateColumnsDirective,
  Toolbar, PdfExport, ExcelExport
} from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { summaryRowData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogUtility } from '@syncfusion/ej2-popups';

const AggregateRow = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  let toolbarOptions = ["ExcelExport", "PdfExport", "CsvExport"];
  const QueryCellInfo = (args: any) => {
    if (args.column && args.column.footerTemplate) {
      if (args.cell.value !== null && args.cell.value !== undefined) {
        const aggregateType = args.column.footerTemplate.match(/Minimum|Maximum/);
        if (aggregateType) {
          args.value = `${aggregateType[0]}: ${args.value}`;
        }
      }
    }
  };
  const toolbarClick = (args: ClickEventArgs): void => {
    switch (args.item.id) {
      case treegridObj.current.grid.element.id + "_pdfexport":
        if ( treegridObj.current.enableRtl === true && treegridObj.current.locale === "ar" ) {
          let innercontent: any =
            "You need custom fonts to export Arabic characters, refer this" +
            '<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">' +
            "documentation section</a>";
          DialogUtility.alert({ content: innercontent });
        }
        else {
          treegridObj.current.pdfExport();
        }
        break;
      case treegridObj.current.grid.element.id + "_excelexport":
        treegridObj.current.excelExport();
        break;
      case treegridObj.current.grid.element.id + "_csvexport":
        treegridObj.current.csvExport();
        break;
    }
  };

  const onChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      treegridObj.current.aggregates[0].showChildSummary = true;
      treegridObj.current.refresh();
    } else {
      treegridObj.current.aggregates[0].showChildSummary = false;
      treegridObj.current.refresh();
    }
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={summaryRowData}
            treeColumnIndex={0}
            childMapping="children"
            height="410"
            toolbar={toolbarOptions}
            toolbarClick={toolbarClick.bind(this)}
            allowExcelExport={true}
            allowPdfExport={true}
            ref={treegridObj}
            excelQueryCellInfo={QueryCellInfo}
            pdfQueryCellInfo={QueryCellInfo}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="FreightID"
                headerText="Freight ID"
                width="150"
              ></ColumnDirective>
              <ColumnDirective
                field="FreightName"
                headerText="Freight Name"
                width="190"
              ></ColumnDirective>
              <ColumnDirective
                field="TotalUnits"
                headerText="Total Units"
                width="160"
                textAlign="Right"
              />
              <ColumnDirective
                field="UnitWeight"
                headerText="Weight Per Unit"
                width="130"
                textAlign="Right"
              />
            </ColumnsDirective>
            <AggregatesDirective>
              <AggregateDirective>
                <AggregateColumnsDirective>
                  <AggregateColumnDirective
                    field="TotalUnits"
                    columnName="TotalUnits"
                    type="Min"
                    footerTemplate="Minimum: ${Min}"
                  >
                    {" "}
                  </AggregateColumnDirective>
                  <AggregateColumnDirective
                    field="UnitWeight"
                    columnName="UnitWeight"
                    type="Max"
                    footerTemplate="Maximum: ${Max}"
                  >
                    {" "}
                  </AggregateColumnDirective>
                </AggregateColumnsDirective>
              </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Aggregate, Toolbar, ExcelExport, PdfExport]} />
          </TreeGridComponent>
        </div>
        <div className="col-md-3 property-section">
          <PropertyPane title="Properties">
            <table
              id="property"
              title="Properties"
              className="property-panel-table"
              style={{ width: "100%" }}
            >
              <tbody>
                <tr style={{ height: "50px" }}>
                  <td style={{ width: "60%" }}>
                    <div>Show Child Summary</div>
                  </td>
                  <td style={{ width: "60%" }}>
                    <div>
                      <CheckBoxComponent
                        checked={true}
                        change={onChange.bind(this)}
                      ></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates aggregate functionality of the Tree Grid. In
          this sample, the aggregate value for the columns “Total Units” and
          “Unit Weight” is displayed in column footer and provide an option to
          show child summary.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid supports aggregates which will be displayed at the
          footer and every hierarchy level. The aggregate configurations can be
          provided by the <code> aggregates</code> property.
        </p>
        <p>The built-in aggregates are,</p>
        <ul>
          <li>
            <code>Sum</code>
          </li>
          <li>
            <code>Average</code>
          </li>
          <li>
            <code>Min</code>
          </li>
          <li>
            <code>Max</code>
          </li>
          <li>
            <code>Count</code>
          </li>
          <li>
            <code>TrueCount</code>
          </li>
          <li>
            <code>FalseCount</code>
          </li>
          <li>
            <code>Custom</code> - Requires the <code>customAggregate</code>{" "}
            property to perform aggregation. The custom aggregate value can be
            accessed inside template using the key <code>${"custom"}</code>
          </li>
        </ul>
        <p>
          In this demo, the <code>footerTemplate</code> property is used to
          display three different aggregates in the Tree Grid footer.
        </p>
        <ul>
          <li>
            Showing minimum aggregate for “Total Units” column and the
            footerTemplate using its type name as <code>(${"Min"})</code>.
          </li>
          <li>
            Showing average aggregate for “Unit weight column” column and the
            footerTemplate using its type name as <code>(${"Max"})</code>.
          </li>
        </ul>
        <p>
          The template expression should be provided inside{" "}
          <code>${"..."}</code> the interpolation syntax.
        </p>
        <p>Additionally, the Tree Grid supports client-side exporting to Excel, PDF, and CSV formats. In this demo, for the toolbar items of exporting, actions are defined in the toolbarClick event to export the Tree Grid data using the excelExport, pdfExport, and csvExport methods.</p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use aggregate feature, we need to inject{" "}
          <code>Aggregate</code> module into the services.
        </p>
        <p>
          More information about aggregate can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/aggregates/aggregates">documentation section</a>.
        </p>
      </div>
    </div>
  );
}
export default AggregateRow;