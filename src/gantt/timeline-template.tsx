import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { Internationalization } from '@syncfusion/ej2-base';
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
  // Create an Internationalization instance
  public intlObj = new Internationalization();
  public ganttInstance: GanttComponent;
  public weekDate (dateString) {
    const date = this.ganttInstance.locale === 'ar' ? this.parseArabicDate(dateString) : this.parseDateString(dateString);
    return this.intlObj.formatDate(date, { skeleton: 'E' });
  };

  public formatDate (dateString) {
    const date = this.ganttInstance.locale === 'ar' ? this.parseArabicDate(dateString) : this.parseDateString(dateString);
    return this.intlObj.formatDate(date, { skeleton: 'd' });
  };

  public imageString (date) {
    const imageDate = this.ganttInstance.locale === 'ar' ? this.parseArabicDate(date) : this.parseDateString(date);
    return `src/gantt/images/${imageDate.getDay()}.svg`;
  };

  public convertArabicNumeralsToWestern = (arabicNumerals: any) => {
    const arabicToWesternMap: { [key: string]: string }  = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return arabicNumerals.replace(/[\u0660-\u0669]/g, (match: string) => arabicToWesternMap[match]);
  };

  public parseArabicDate = (arabicDateString: any) => {
    // To convert the 'arabicDateString' Arabic Date to ISO Date format
    const normalizedDate = this.convertArabicNumeralsToWestern(arabicDateString);
    const parts = normalizedDate.split('/'); // Assuming "DD/MM/YYYY" format
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  public parseDateString = (dateString: any) => {
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
  }
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
            }} src={this.imageString(props.date)} />
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
          <GanttComponent id='TimelineTemplate' dataSource={timelineTemplateData} highlightWeekends={true}
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
            In this demo, the timelineTemplate property enables the customization of timeline cells with any HTML content, allowing for enhanced visual appeal and personalized functionality.
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
