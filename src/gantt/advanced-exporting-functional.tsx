import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, PdfExportProperties, DayMarkers, CriticalPath } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources,pdfExport } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import {
    PdfColor,
    PdfFontStyle,
    PdfPen,
    PdfDashStyle,
  } from '@syncfusion/ej2-pdf-export';

const AdvancedExporting = () => {
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
  const projectStartDate: Date = new Date('03/25/2025');
  const projectEndDate: Date = new Date('06/25/2025');
  const gridLines: any = 'Both';
  const toolbar: any = ['PdfExport'];
  const timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  const eventMarkers: any =  [
    {
        day: new Date('04/09/2025'),
        label: 'Research phase'
    }, 
    {
        day: new Date('06/20/2025'),
        label: 'Sales and marketing phase'
    }
];
  const holidays: any = [
    {
        from: new Date('04/04/2025'),
        to: new Date('04/04/2025'),
        label: 'Local Holiday'
    }, {
        from: new Date('04/19/2025'),
        to: new Date('04/19/2025'),
        label: 'Good Friday'
    }, {
        from: new Date('04/30/2025'),
        to: new Date('04/30/2025'),
        label: 'Release Holiday'
    },
];
const LeftLabelTemplate = (props) => {
    return (<span>{props.TaskName}</span>);
  };
  const templateLeft: any = LeftLabelTemplate;
  const RightLabelTemplate = (props) => {
    if (props.ganttProperties.resourceInfo) {
      let resources = props.ganttProperties.resourceInfo;
      let out = [];
      for (let index = 0; index < resources.length; index++) {
        let src = 'src/gantt/images/' + resources[index].resourceName + '.png';
        let img = (
          <img
            key={`img-${index}`}
            src={src}
            height="40px"
            alt={resources[index].resourceName}
          />
        );
        let span = (
          <span
            key={`span-${index}`}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            {resources[index].resourceName}
          </span>
        );
        out.push(img, span);
      }
      return (<div>{out}</div>);
    } else {
      return <div></div>
    }
  };  
  const templateRight: any = RightLabelTemplate;  
  const labelSettings: any = {
    leftLabel: templateLeft.bind(this),
    rightLabel: templateRight.bind(this)
  };
  const toolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === "AdvancedExporting_pdfexport") {
        var borderWidth = 1;
        var borderColor = new PdfColor(227, 22, 91);
        var pdfpen = new PdfPen(borderColor, borderWidth);
        pdfpen.dashStyle = PdfDashStyle.Dash;
        var exportProperties: PdfExportProperties = {
           pageSize: 'A2',
          fileName:"Product Development Report.pdf.pdf",
          ganttStyle: {
              eventMarker: {
                  label: {
                      fontColor: new PdfColor(33, 33, 33),
                      fontStyle: PdfFontStyle.Bold,
                      backgroundColor: new PdfColor(253, 191, 100),
                  },
                  lineStyle: pdfpen,
              },
              holiday: {
                  fontColor: new PdfColor(33, 33, 33),
                  backgroundColor: new PdfColor(243, 244, 246),
              }
          },
          header: {
              fromTop: 0,
              height: 150,
              contents: [
                  {
                  type: 'Text',
                  value:'Product Development Lifecycle Gantt Chart Report March 2025 - June 2025',
                  position: { x: 20, y: 20 },
                  style: { textBrushColor: '#00008B', fontSize: 24 },
                  },
                  {
                  type: 'Line',
                  style: { penColor: '#00008B', penSize: 2, dashStyle: 'Solid' },
                  points: { x1: 20, y1: 70, x2: 755, y2: 70 }, 
                  },
              ],
              },
          footer: {
              fromBottom: 160,
              height: 100,
              contents: [
                  {
                      type: 'Text',
                      value: "© 2025 Syncfusion Inc. All Rights Reserved.\n" +
                              "Generated on: " + new Date().toLocaleString('en-US', {
                                  month: 'long',
                                  day: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: true
                              }),
                      position: { x: 1950, y: 40 },
                      style: { textBrushColor: '#3a435e', fontSize: 20 },
                  }
              ],
          },
          fitToWidthSettings: {
              isFitToWidth: isFitToWidth,
          }};
      ganttInstance.current.pdfExport(exportProperties);
    }
  }
    const pdfQueryTaskbarInfo = (args) => {
        args.labelSettings.leftLabel.value = args.data.ganttProperties.taskName;
        if (args.data.ganttProperties.resourceNames) {
            args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
            args.labelSettings.rightLabel.image = [{
                base64: args.data.taskData.resourcesImage, width: 20, height: 20
            }];
            if (args.data.ganttProperties.taskId === 7) {
                args.labelSettings.leftLabel.value = 'Custom Label';
                args.labelSettings.leftLabel.fontStyle.fontColor = new PdfColor(142, 36, 64);
            }
        }
        var theme = document.body.classList.contains('tailwind3-dark') || document.body.classList.contains('fluent2-dark') ||
            document.body.classList.contains('material3-dark') || document.body.classList.contains('bootstrap5.3-dark') ||
            document.body.classList.contains('fluent2-highcontrast') || document.body.classList.contains('fluent2-dark');
        if (theme && args.data.isCritical) {
            args.taskbar.progressColor = new PdfColor(172, 6, 136);
            args.taskbar.taskColor = args.taskbar.taskBorderColor = new PdfColor(73, 4, 58);
        }
        else if (!theme && args.data.isCritical) {
            args.taskbar.progressColor = new PdfColor(176, 0, 138);
            args.taskbar.taskColor = new PdfColor(255, 206, 244);
        }
    }
    const queryTaskbarInfo = (args) => {
        var theme = document.body.classList.contains('tailwind3-dark') || document.body.classList.contains('fluent2-dark') ||
            document.body.classList.contains('material3-dark') || document.body.classList.contains('bootstrap5.3-dark') ||
            document.body.classList.contains('fluent2-highcontrast') || document.body.classList.contains('fluent2-dark');
        if (theme && args.data.isCritical) {
            args.taskbarBgColor = "#49043A";
            args.progressBarBgColor = "#AC0688";
        } else if (!theme && args.data.isCritical) {
            args.progressBarBgColor = "#B0008A";
            args.taskbarBgColor = "#FFCEF4";
        }
    }
    const autofit = (args: any) => {
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
                <label htmlFor="unchecked" id="exported" style={{ fontSize: '15px', margin: '0px 5px 0px 5px' }}> AutoFit in Pdf Export </label>
              <div>
                <SwitchComponent id="unchecked" checked={false} change={autofit.bind(this)}></SwitchComponent>
              </div>
            </div>
        </div>
        <GanttComponent id='AdvancedExporting' ref={ganttInstance} dataSource={pdfExport} dateFormat={'MMM dd, y'} enableCriticalPath={true}
          treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
          allowUnscheduledTasks={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} splitterSettings={splitterSettings}
          taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} toolbarClick={toolbarClick.bind(this)}
          height='410px' gridLines={gridLines} toolbar={toolbar} resourceFields={resourceFields} holidays={holidays} eventMarkers={eventMarkers} resources={editingResources}
          pdfQueryTaskbarInfo = {pdfQueryTaskbarInfo} queryTaskbarInfo={queryTaskbarInfo}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Toolbar, ExcelExport, PdfExport, DayMarkers, CriticalPath]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the advanced PDF export features of the Gantt Chart, allowing customization of various
          elements such as headers, footers, task labels, event markers, holidays, and taskbars. These customizations can
          be configured using the
          <a target="_blank"
            href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/">pdfExportProperties</a>
          and
          <a target="_blank"
            href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfQueryTaskbarInfoEventArgs/">pdfQueryTaskbarInfo</a>
          event.
        </p>
      </div>
      <div id="description">
      <p>In this sample, the Gantt Chart's PDF export functionality
           is enhanced with various customization options:
        </p>

        <ul>
          <li>
            <strong>Custom Headers and Footers</strong>: The headers and footers in the exported PDF can be
            customized using the
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/#header">header</a>
            and
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/#footer">footer</a>
            properties,which allowing us to include relevant information of exported PDF.
          </li>
          <li>
            <strong>Taskbar and Task Label Styling</strong>:Taskbar and Task Label appearance can be customized in
            the exported PDF using the
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfQueryTaskbarInfoEventArgs">pdfQueryTaskbarInfoEvent</a>.
          </li>
          <li>
            <strong> Event marker and holiday</strong>:Event marker and holiday can be cusotmized in exported PDF
            using
            <a target="_blank"
              href="https://helpej2.syncfusion.com/documentation/api/gantt/pdfExportProperties/#ganttstyle">ganttstyle</a>
            in <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties">pdfExportProperties</a>.
          </li>
          <li>
            <strong>Fit-to-Width Support</strong>: This feature allows the Gantt component's rows to be auto-fitted
            to the width of the PDF document's page using the
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/#fittowidthsettings">fitToWidthSettings</a>
            in <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties">pdfExportProperties</a>.
          </li>
        </ul>

        <p>More information about advanced PDF exporting features in Gantt can be found in the <a target="_blank"
          href="https://ej2.syncfusion.com/javascript/documentation/gantt/pdf-export/pdf-export">documentation
          section</a>.</p>
        <p>To use PDF export feature, we need to inject
          <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">
            pdfExport
          </a></code> module into the <code>services</code>. </p>
      </div>
    </div>
  )
}
export default AdvancedExporting;
