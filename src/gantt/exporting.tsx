import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, PdfExportProperties, DayMarkers} from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckBoxComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';

export class Exporting extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public isFitToWidth: any;
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId',
    resourceInfo: 'resources'
  };
  public resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public splitterSettings: any = {
    position: "35%"
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('09/01/2025');
  public gridLines: any = 'Both';
  public toolbar: any = ['ExcelExport', 'CsvExport', 'PdfExport'];
  public timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === "GanttExport_excelexport") {
      this.ganttInstance.excelExport();
    }
    else if (args.item.id === "GanttExport_csvexport") {
      this.ganttInstance.csvExport();
    }
    else if (args.item.id === "GanttExport_pdfexport") {
      var exportProperties: PdfExportProperties = {
        fitToWidthSettings: {
            isFitToWidth: this.isFitToWidth,
        }};
      this.ganttInstance.pdfExport(exportProperties);
    }
  }


componentDidMount() {
  this.checkHighContrastMode();
}

checkHighContrastMode() {
  // Check if body has fluent2-highcontrast, fluent2-dark, or fluent2 class
  const themes = ['fluent2-highcontrast', 'fluent2-dark', 'fluent2'];
  const isHighContrast = themes.some(theme => document.body.classList.contains(theme));
  if (isHighContrast) {
    const labelElement = document.getElementById('exported');
    if (labelElement) {
      labelElement.style.padding = '5px';
    }
  }
}
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='GanttExport' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} toolbarClick={this.toolbarClick.bind(this)}
            height='650px' taskbarHeight={25} rowHeight={46} gridLines={this.gridLines} toolbar={this.toolbar} resourceFields={this.resourceFields} resources={editingResources}>
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
          <br/>
            <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/excel-export/excel-export">documentation section</a>.</p>
        </div>
      </div>
    )
  }
}
