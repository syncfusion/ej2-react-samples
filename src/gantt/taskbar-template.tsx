import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, DayMarkers, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective, Selection } from '@syncfusion/ej2-react-gantt';
import { customizedData } from './data';
import { SampleBase } from '../common/sample-base';
import './taskbar-template.css'

export class Taskbar extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskId',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public splitterSettings: any = {
    columnIndex: 1
  };
  private dayWorkingTime: any = [{ from: 0, to: 24 }];
  public timelineSettings: any = {
    timelineUnitSize: 70,
    topTier: {
      unit: 'Hour',
      format: 'MMM dd, yyyy'
    },
    bottomTier: {
      unit: 'Minutes',
      count: 2,
      format: 'h:mm a'
    },
  }
  public eventMarkerDay1: Date = new Date('03/05/2025 07:09:00 PM');
  public eventMarkerDay2: Date = new Date('03/05/2025 07:46:00 PM');
  public eventMarkerDay3: Date = new Date('03/05/2025 07:59:00 PM');
  public eventMarkerDay4: Date = new Date('03/05/2025 08:08:00 PM');
  public eventMarkerDay5: Date = new Date('03/05/2025 08:24:00 PM');
  public eventMarkerDay6: Date = new Date('03/05/2025 08:31:00 PM');
  public eventMarkerDay7: Date = new Date('03/05/2025 08:47:00 PM');
  public labelSettings: any = {
    leftLabel: 'TaskName',
  };
  public tooltipTemplate(props): any {
    if (props.Winner && props.Movie) {
      return (<div>
        {props.Winner} wins oscar award for {props.Movie}
      </div>);
    } else if (props.Movie) {
      return (<div>
        {props.Winner} wins oscar award for {props.Movie}
      </div>);
    } else {
      return (<div>
        {props.Performance}
      </div>);
    }
  };
  public template: any = this.tooltipTemplate;
  public tooltipSettings: any = {
    taskbar: this.template.bind(this),
  };
  public taskbarTemplate(props): any {
    if (props.TaskName == 'Oscar moments') {
      return (<div className="e-gantt-child-taskbar e-custom-moments" style={{height: "100%", borderRadius: "5px"}}>
        {
          props.ganttProperties.duration < 4 ?
            <img className="moments" src="src/gantt/images/moments.svg" height="32" width="32" alt='Oscar Moment svg'/> :
            <div>
              <img className="moments" src="src/gantt/images/moments.svg" height="32" width="32" alt='Oscar Moment svg'/>
              <span className="e-task-label"
                style={{
                position: "absolute",
                top: "15px",
                left: "40px",
                right: "5px",
                fontSize: "12px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "90%",
                lineHeight: "1.2",
                }}
              >
                {props.Performance}
              </span>
           </div>
        }
      </div>);
    }
    else if (props.TaskName == 'Oscar performance') {
      return (<div className="e-gantt-child-taskbar e-custom-performance" style={{height: "100%", borderRadius: "5px"}}>
        {
          props.ganttProperties.duration <= 5 ?
            <img className="face-mask" src="src/gantt/images/face-mask.svg" height="32" width="32" alt='Oscar Performance svg'/> :
            <div>
              <img className="face-mask" src="src/gantt/images/face-mask.svg" height="32" width="32" alt='Oscar Performance svg'/>
              <span className="e-task-label e-oscar-performance" 
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "40px",
                  right: "5px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: "90%",
                  lineHeight: "1.2",
                }}
              >
                {props.Performance}
              </span>
            </div>
        }
      </div>);
    } else {
      return (
        <div className="e-gantt-parent-taskbar e-custom-parent" style={{height: "100%", borderRadius: "5px", textOverflow: "ellipsis"}}>
          {props.ganttProperties.duration < 4 ?
            <img className="oscar" src="src/gantt/images/oscar.svg" height="32" width="32" alt='Oscar svg'/> :
            props.Winner && props.Movie ?
              <div>
                <img className="oscar" src="src/gantt/images/oscar.svg" height="32" width="32" alt='Oscar svg'/>
                <span className="e-task-label"
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "40px",
                    right: "5px",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {props.Winner}
                </span>
                <span className="e-task-label"
                  style={{
                    position: "absolute",
                    top: "28px",
                    left: "40px",
                    right: "5px",
                    fontSize: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {props.Movie}
                </span>
              </div> : props.Movie ?
                <div>
                  <img className="oscar" src="src/gantt/images/oscar.svg" height="32" width="32" alt='Oscar svg'/>
                  <span className="e-task-label e-oscar-movie" 
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "40px",
                      right: "5px",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {props.Movie} 
                  </span>
                </div> :
              <span className="e-task-label"></span>
          }
        </div>
      );
    }

  };
  public childTaskbarTemplate: any = this.taskbarTemplate.bind(this);
  public milstoneTemplate(props): any {
  return (
    <div style={{ marginTop: "3px" }}>
      <div style={{ position: "absolute", left: "3px", top: "4px" }}>
        <img
          className="moments"
          src="src/gantt/images/moments.svg"
          height="24"
          width="48"
          style={{ zIndex: 1, left: "-4px", top: "12px", position: "absolute" }}
          alt="Moments svg"
        />
        <div
          className="e-gantt-milestone"
          style={{
            width: "41px",
            height: "41px",
            transform: "rotate(45deg)",
            backgroundColor: "#7ab748",
            border: "0",
            position: "absolute",
            left: "-5px",
            top: "4px"
          }}
        ></div>
      </div>
    </div>
  );
}

  public milestone: any = this.milstoneTemplate.bind(this);
  public projectStartDate: any = new Date('03/05/2025 06:00 PM');
  public projectEndDate: any = new Date('03/05/2025 09:50 PM');

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='TaskbarTemplate' dataSource={customizedData} dateFormat={'hh:mm a'}
            taskFields={this.taskFields} height='650px' splitterSettings={this.splitterSettings}
            treeColumnIndex={1} rowHeight={75} taskbarHeight={65} dayWorkingTime={this.dayWorkingTime}
            durationUnit={'Minute'} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings}
            tooltipSettings={this.tooltipSettings} milestoneTemplate={this.milestone} taskbarTemplate={this.childTaskbarTemplate}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} allowSelection={true}>
            <ColumnsDirective>
              <ColumnDirective field='TaskId' headerText='Event Id' width={130}></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Event Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start time' ></ColumnDirective>
              <ColumnDirective field='EndDate' headerText='End time' ></ColumnDirective>
              <ColumnDirective field='Winner' headerText='Winner' ></ColumnDirective>
              <ColumnDirective field='Movie' headerText='Movie' ></ColumnDirective>
              <ColumnDirective field='Performance' headerText='Moments / Performance Details' width={250}></ColumnDirective>
            </ColumnsDirective>
            <EventMarkersDirective>
              <EventMarkerDirective day={this.eventMarkerDay1} label='Performance' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay2} label='Moments' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay3} label='Performance' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay4} label='Moments' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay5} label='Moments' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay6} label='Performance' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay7} label='Moments' ></EventMarkerDirective>
            </EventMarkersDirective>
            <Inject services={[DayMarkers, Selection]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
          <a href="https://en.wikipedia.org/wiki/90th_Academy_Awards" target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample visualizes the complete event schedule of the 90th Academy awards.
        Taskbars are customized using template support and timeline header is customized for a better view of the data.</p>
        </div>

        <div id="description">
        <p>
          The Gantt Chart provides support for customizing taskbar UI using taskbar template feature. The
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#taskbartemplate">taskbarTemplate</a>
          property accepts either string or HTML element`s ID value, which will be used as the template for the taskbars.
          The summary tasks and the milestone items can also customized using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#parenttaskbartemplate">parentTaskbarTemplate</a> and
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#milestonetemplate">milestoneTemplate</a> properties.
          In this demo, we have customized the taskbar UI to display the data from custom columns and the taskbarTemplate
          is assigned with the ID of a SCRIPT element whose content is used as the template.
        </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use markers, inject the
            <code>DayMarkers</code> module. To use a selection, inject the
            <code>Selection</code> module.
          </p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/appearance-customization#taskbar-template">documentation section</a>.</p>
        </div>
      </div>
    )
  }
}
