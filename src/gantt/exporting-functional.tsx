import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

function Exporting() {

  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance: GanttComponent;
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
    columnIndex: 2
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
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  function toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === "GanttExport_excelexport") {
      ganttInstance.excelExport();
    }
    else if (args.item.id === "GanttExport_csvexport") {
      ganttInstance.csvExport();
    }
    else if (args.item.id === "GanttExport_pdfexport") {
      ganttInstance.pdfExport();
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='GanttExport' ref={gantt => ganttInstance = gantt} dataSource={editingData} dateFormat={'MMM dd, y'}
          treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
          allowUnscheduledTasks={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} splitterSettings={splitterSettings}
          taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} toolbarClick={toolbarClick.bind(this)}
          height='410px' gridLines={gridLines} toolbar={toolbar} resourceFields={resourceFields} resources={editingResources}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate' ></ColumnDirective>
            <ColumnDirective field='Duration' ></ColumnDirective>
            <ColumnDirective field='Predecessor' ></ColumnDirective>
            <ColumnDirective field='resources' ></ColumnDirective>
            <ColumnDirective field='Progress' ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Toolbar, ExcelExport, PdfExport]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel, PDF and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. </p>
      </div>
      <div id="description">
        <p>Gantt supports client-side exporting, which allows you to export its data to the Excel, PDF and CSV formats. </p>
        <p>In this demo, we have defined actions in the <code>toolbarClick</code> event to export the Gantt data using the <code>excelExport</code>, <code>pdfExport</code> and <code>csvExport</code> methods.</p>

        <p>Injecting Module:</p>
        <p>To use Excel and CSV export features, inject the <code>ExcelExport</code> module using the <code>Gantt.Inject(ExcelExport)</code> method. </p>
        <p>To use PDF export feature, inject the <code>PdfExport</code> module using the <code>Gantt.Inject(PdfExport)</code> method. </p>
      </div>
    </div>
  )
}
export default Exporting;