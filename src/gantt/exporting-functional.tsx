import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, PdfExportProperties } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';

const Exporting = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let isFitToWidth: any;
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    resourceInfo: 'resources'
  };
  const resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  const splitterSettings: any = {
    position: "35%"
  };
  const projectStartDate: Date = new Date('03/25/2019');
  const projectEndDate: Date = new Date('07/28/2019');
  const gridLines: any = 'Both';
  const toolbar: any = ['ExcelExport', 'CsvExport', 'PdfExport'];
  const timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const toolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === "GanttExport_excelexport") {
      ganttInstance.current.excelExport();
    }
    else if (args.item.id === "GanttExport_csvexport") {
      ganttInstance.current.csvExport();
    }
    else if (args.item.id === "GanttExport_pdfexport") {
      var exportProperties: PdfExportProperties = {
        fitToWidthSettings: {
            isFitToWidth: isFitToWidth,
        }};
      ganttInstance.current.pdfExport(exportProperties);
    }
  }
  const autofit  = (args: any) =>  {
    if (args.checked) {
        isFitToWidth = true;
    } else {
        isFitToWidth = false;
    }
}
  return (
    <div className='control-pane'>
      <div className='control-section'>
      <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex' }}>
                <label htmlFor="unchecked" style={{ fontSize: '15px', margin: '0px 5px 0px 5px' }}> AutoFit in Pdf Export </label>
              <div>
                <SwitchComponent id="unchecked" checked={false} change={autofit.bind(this)}></SwitchComponent>
              </div>
            </div>
        </div>
        <GanttComponent id='GanttExport' ref={ganttInstance} dataSource={editingData} dateFormat={'MMM dd, y'}
          treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
          allowUnscheduledTasks={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} splitterSettings={splitterSettings}
          taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} toolbarClick={toolbarClick.bind(this)}
          height='410px' gridLines={gridLines} toolbar={toolbar} resourceFields={resourceFields} resources={editingResources}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Toolbar, ExcelExport, PdfExport]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel, PDF and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. </p>
      </div>
      <div id="description">
        <p>Gantt supports client-side exporting, which allows you to export its data to the Excel, PDF and CSV formats. </p>
        <p>In this demo, we have defined actions in the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#toolbarclick">toolbarClick</a></code> event to export the Gantt data using the
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">excelExport</a></code>,
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">pdfExport</a></code>
          and
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#csvexport">csvExport</a></code> methods.</p>
        <p>In addition we have provided support to export the Gantt component where each rows are auto-fit to the PDF document page width using
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/pdf-export/pdf-export">fitToWidthSettings</a></code>
          in  <code>PdfExportProperties</code></p>

        <p>Injecting Module:</p>
        <p>To use Excel and CSV export features, we need to inject
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">
            excelExport
          </a></code> module into the <code>services</code>. </p>
        <p>To use PDF export feature, we need to inject
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">
            pdfExport
          </a></code> module into the <code>services</code>. </p>
      </div>
    </div>
  )
}
export default Exporting;
