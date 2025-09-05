import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { timelineTemplateData } from './data';
import { Internationalization } from '@syncfusion/ej2-base';
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
  let ganttInstance: any;
 // Create an Internationalization instance
 const intlObj = new Internationalization();

 const weekDate = (dateString) => {
    const date = ganttInstance.locale === 'ar' ? parseArabicDate(dateString) : parseDateString(dateString);
    return intlObj.formatDate(date, { skeleton: 'E' });
  };

 const formatDate = (dateString) => {
    const date = ganttInstance.locale === 'ar' ? parseArabicDate(dateString) : parseDateString(dateString);
    return intlObj.formatDate(date, { skeleton: 'd' });
  };

 const imageString = (date) => {
    const imageDate = ganttInstance.locale === 'ar' ? parseArabicDate(date) : parseDateString(date);
    return `src/gantt/images/${imageDate.getDay()}.svg`;
  };

  const convertArabicNumeralsToWestern = (arabicNumerals: any) => {
    const arabicToWesternMap: { [key: string]: string }  = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return arabicNumerals.replace(/[\u0660-\u0669]/g, (match: string) => arabicToWesternMap[match]);
  };

  const parseArabicDate = (arabicDateString: any) => {
    // To convert the 'arabicDateString' Arabic Date to ISO Date format
    const normalizedDate = convertArabicNumeralsToWestern(arabicDateString);
    const parts = normalizedDate.split('/'); // Assuming "DD/MM/YYYY" format
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const parseDateString = (dateString: any) => {
    // Check if the date string is in the format "DD.MM.YYYY"
    if (dateString.includes('.')) {
      var parts = dateString.split('.');
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10) - 1;
      var year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    // Fallback to default date parsing
    return new Date(dateString);
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
            }} src={imageString(props.date)} />
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
   const projectStartDate = new Date('03/29/2025 01:00:00 PM');
   const projectEndDate = new Date('04/23/2025');
  return (
    <div className='control-pane'>
      <div className='control-section'>
      <GanttComponent id='TimelineTemplate' dataSource={timelineTemplateData} ref={gantt => ganttInstance = gantt}
            splitterSettings={splitterSettings}
            taskFields={taskFields} height='650px' taskbarHeight={25} rowHeight={46}
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
          </p>
          <p>The template contains these context properties to design the timeline cells:</p>
          <ul>
            <li><code>date</code>: Defines the date of timeline date.</li>
            <li><code>value</code>: Defines the date value to display in the timeline.</li>
            <li><code>tier</code>: Defines the tier of timeline.</li>
          </ul>
          <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/timeline/timeline#timeline-template">documentation section</a>.</p>
        </div>
      </div>
  )
}
export default TimelineTemplate;
