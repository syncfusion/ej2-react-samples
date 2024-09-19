import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { timelineTemplateData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './timelinetemplate.css'
const TimelineTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
 const weekDate=(dateString)=>{
    const date = new Date(dateString);
    const options: any = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

 const formatDate = (dateString)=> {
    const date = new Date(dateString);
    const options: any = { day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

 const imageString=(value)=> {
    return `src/gantt/images/${value.toLowerCase()}.svg`;
  };
 const timelineTemplate =(props): any =>{
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
          }}>{weekDate(props.date)}</div>
          <div style={{
            lineHeight: 'normal',
            paddingTop: '5px',
            paddingBottom: '2px',
            fontWeight: 'normal'
          }}>{formatDate(props.date)}</div>
          <div style={{
            width: '20px',
            height: '20px',
            lineHeight: 'normal'
          }}>
            <img style={{
              width: '100%',
              height: '100%'
            }} src={imageString(props.value)} />
          </div>
        </div>
      </div>)
    }

  }
  const splitterSettings: any = {
    columnIndex: 1
  };
  const timelineSettings: any = {
    topTier: {
      unit: 'Day',
  },
  timelineUnitSize: 200,
    };
    const labelSettings: any = {
      leftLabel: 'TaskName',
    };
   const projectStartDate = new Date('03/31/2024');
   const projectEndDate = new Date('04/23/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
      <GanttComponent id='Timeline' dataSource={timelineTemplateData} 
            splitterSettings={splitterSettings}
            taskFields={taskFields} height='550px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate} timelineSettings={timelineSettings}
            timelineTemplate={timelineTemplate} labelSettings={labelSettings} treeColumnIndex={1}> 
            <ColumnsDirective>
              <ColumnDirective field='TaskID' visible={false}></ColumnDirective>
              <ColumnDirective field='TaskName' width={300} ></ColumnDirective>
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
            In this demo, the timelineTemplate property enables the customization of timeline cells with any HTML content, allowing for enhanced visual appeal and personalized functionality.
            <p>The template contains these context properties to design the timeline cells.</p>
            <li><code>date</code>: Defines the date of timeline date.</li>
            <li><code>value</code>: Defines the date value to display in the timeline.</li>
            <li><code>tier</code>: Defines the tier of timeline.</li>
          </p>
        </div>
      </div>
  )
}
export default TimelineTemplate;
