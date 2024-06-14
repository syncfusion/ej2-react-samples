import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { timelineTemplateData } from './data';
import { SampleBase } from '../common/sample-base';
import './timelinetemplate.css'
export class TimelineTemplate extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public splitterSettings: any = {
    columnIndex: 1
  };
  public labelSettings: any = {
    leftLabel: 'TaskName',
  };
  weekDate(dateString){
    const date = new Date(dateString);
    const options: any = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  formatDate(dateString) {
    const date = new Date(dateString);
    const options: any = { day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  imageString (value) {
    return `src/gantt/images/${value.toLowerCase()}.svg`;
  };
public timelineSettings: any = {
  topTier: {
    unit: 'Day',
},
timelineUnitSize: 200,
  };
  timelineTemplate(props): any {
    if (props.tier == 'topTier') {
      return (<div
        className="e-header-cell-label e-gantt-top-cell-text"
        style={{
          width: '100%',
          fontWeight: 'bold',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        title={props.date}
      >
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <div style={{
            lineHeight: 'initial',
            fontWeight: 'normal'
          }}>{this.weekDate(props.date)}</div>
          <div style={{
            lineHeight: 'normal',
            paddingTop: '5px',
            paddingBottom: '2px',
            fontWeight: 'normal'
          }}>{this.formatDate(props.date)}</div>
          <div style={{
            width: '20px',
            height: '20px',
            lineHeight: 'normal'
          }}>
            <img style={{
              width: '100%',
              height: '100%'
            }} src={this.imageString(props.value)} />
          </div>
        </div>
      </div>)
    }

  }
  public projectStartDate: Date = new Date('03/31/2024');
  public projectEndDate: Date = new Date('04/23/2024');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Timeline' dataSource={timelineTemplateData} highlightWeekends={true}
            splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} height='550px' labelSettings={this.labelSettings}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} timelineSettings={this.timelineSettings}
            timelineTemplate={this.timelineTemplate} treeColumnIndex={1} >
            <ColumnsDirective>
              <ColumnDirective field='TaskID' visible={false}></ColumnDirective>
              <ColumnDirective field='TaskName' width={300}></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' ></ColumnDirective>
              <ColumnDirective field='Duration' ></ColumnDirective>
              <ColumnDirective field='Progress' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample explains the way of rendering timeline template by mapping template elements to the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#timelineTemplate">timelineTemplate</a> property.</p>
        </div>
        <div id="description">
          <p>
            In this demo, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#timelineTemplate">timelineTemplate</a> property enables the customization of timeline cells with any HTML content, allowing for enhanced visual appeal and personalized functionality.
            <p>The template contains these context properties to design the timeline cells.</p>
            <li><code>date</code>: Defines the date of timeline date.</li>
            <li><code>value</code>: Defines the date value to display in the timeline.</li>
            <li><code>tier</code>: Defines the tier of timeline.</li>
          </p>
        </div>
      </div>
    );
  }
}
