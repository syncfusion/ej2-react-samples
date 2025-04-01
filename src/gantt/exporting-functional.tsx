import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, PdfExportProperties, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './exporting.css'

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
  const projectStartDate: Date = new Date('03/25/2024');
  const projectEndDate: Date = new Date('07/28/2024');
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
  const eventMarkers: any = [
            {
                day: new Date('04/02/2024'),
            }, {
                day: new Date("04/09/2024"),
                label: 'Research phase'
            }, {
                day: new Date("04/30/2024"),
                label: 'Design phase'
            }, {
                day: new Date("05/23/2024"),
                label: 'Production phase'
            }, {
                day: new Date("06/20/2024"),
                label: 'Sales and marketing phase'
            }
        ];
  const holidays: any = [
            {
                from: new Date('04/04/2024'),
                to: new Date('04/04/2024'),
                label: 'Local Holiday'
            }, {
                from: new Date('04/19/2024'),
                to: new Date('04/19/2024'),
                label: 'Good Friday'
            }, {
                from: new Date('04/30/2024'),
                to: new Date('04/30/2024'),
                label: 'Release Holiday'
            }, 
        ];
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
      ganttInstance.current.pdfExport();
    }
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='GanttExport' ref={ganttInstance} dataSource={editingData} dateFormat={'MMM dd, y'}
          treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
          allowUnscheduledTasks={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} splitterSettings={splitterSettings}
          taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} toolbarClick={toolbarClick.bind(this)}
          height='410px' gridLines={gridLines} toolbar={toolbar} resourceFields={resourceFields} holidays={holidays} eventMarkers={eventMarkers} resources={editingResources}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Toolbar, ExcelExport, PdfExport, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel, PDF and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. </p>
      </div>
      <div id="description">
      <p>Gantt supports client-side exporting, which allows you to export its data to the Excel, PDF and CSV formats. </p>
          <p>In this demo, we have defined actions in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#toolbarclick">toolbarClick</a> event to export the Gantt data using the
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">excelExport</a>,
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">pdfExport</a>
            and
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#csvexport">csvExport</a> methods.</p>
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
