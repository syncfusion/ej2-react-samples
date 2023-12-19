import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar,
  PdfExport, ExcelExport
} from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { updateSampleSection } from '../common/sample-base';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';

const Export = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let collapsedStatePersist: boolean = true;
  let toolbarOptions: any = ["ExcelExport", "PdfExport", "CsvExport"];
  let treegridInstance = useRef<TreeGridComponent>(null);

  const toolbarClick = (args: ClickEventArgs): void => {
    switch (args.item.id) {
      case treegridInstance.current.grid.element.id + "_pdfexport":
        if (
          treegridInstance.current.enableRtl === true &&
          treegridInstance.current.locale === "ar"
        ) {
          let innercontent: any =
            "You need custom fonts to export Arabic characters, refer this" +
            '<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">' +
            "documentation section</a>";
          DialogUtility.alert({ content: innercontent });
        } else {
          let pdfExportProperties = {
            isCollapsedStatePersist: collapsedStatePersist,
          };
          treegridInstance.current.pdfExport(pdfExportProperties);
        }
        break;
      case treegridInstance.current.grid.element.id + "_excelexport":
        let excelExportProperties = {
          isCollapsedStatePersist: collapsedStatePersist,
        };
        treegridInstance.current.excelExport(excelExportProperties);
        break;
      case treegridInstance.current.grid.element.id + "_csvexport":
        treegridInstance.current.csvExport();
        break;
    }
  };

  const onChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      collapsedStatePersist = true;
    } else {
      collapsedStatePersist = false;
    }
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sampleData}
            ref={treegridInstance}
            treeColumnIndex={1}
            childMapping="subtasks"
            toolbar={toolbarOptions}
            toolbarClick={toolbarClick.bind(this)}
            height="410"
            allowExcelExport={true}
            allowPdfExport={true}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="110"
                textAlign="Right"
              ></ColumnDirective>
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="180"
              ></ColumnDirective>
              <ColumnDirective
                field="startDate"
                headerText="Start Date"
                width="120"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="endDate"
                headerText="End Date"
                width="90"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="progress"
                headerText="Progress"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="priority"
                headerText="Priority"
                width="90"
              />
            </ColumnsDirective>
            <Inject services={[Toolbar, ExcelExport, PdfExport]} />
          </TreeGridComponent>
        </div>
        <div className="col-md-3 property-section">
          <PropertyPane title="Export Customization">
            <table
              id="property"
              className="property-panel-table"
              style={{ width: "100%" }}
            >
              <tbody>
                <tr style={{ height: "50px" }}>
                  <td style={{ width: "60%" }}>
                    <CheckBoxComponent
                      checked={true}
                      label="Persist collapsed state"
                      labelPosition="Before"
                      change={onChange.bind(this)}
                    ></CheckBoxComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the client-side exporting of the Tree Grid,
          which allows you to export its data to the Excel, Pdf and CSV formats.
          Use the toolbar buttons to export Tree Grid data to desired format.{" "}
        </p>
        <p>
          By using the Persist collapsed state checkbox we can persist the
          Expand/Collpase state of Tree Grid in exported document{" "}
        </p>
      </div>
      <div id="description">
        <p>
          Tree Grid supports client-side exporting which allows you to export
          its data to the Excel, Pdf and CSV formats.
        </p>
        <p>
          In this demo, for the toolbar items of exporting, we have defined
          actions in <code>toolbarClick</code> event to export the Tree Grid
          data using the <code>excelExport</code>, <code>pdfExport</code> and{" "}
          <code>csvExport</code> methods.
        </p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use exporting feature, we need to inject{" "}
          <code>ExcelExport</code> and <code>PdfExport</code> module into the
          services.
        </p>
        <p>
          More information on the  
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/pdf-export">
          Pdf exporting </a> and
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/excel-export/excel-export">
          Excel exporting</a>
          can be found in documentation section.
        </p>
      </div>
    </div>
  );
}
export default Export;