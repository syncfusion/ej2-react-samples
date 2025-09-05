import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, Toolbar,ColumnDirective, ColumnsDirective, TimelineViewMode } from '@syncfusion/ej2-react-gantt';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent, DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './timezone.css';

const Timezone = () => {
  const ganttInstance = useRef<GanttComponent>(null);

  useEffect(() => {
    updateSampleSection();
  }, []);

  const timezoneData: any = [
    { taskID: 1, taskName: 'Project schedule', startDate: new Date('02/04/2025 08:00'), endDate: new Date('03/10/2025') },
    { taskID: 2, taskName: 'Planning', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), parentID: 1 },
    { taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), duration: 6, progress: '60', parentID: 2 },
    { taskID: 4, taskName: 'Plan budget', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), duration: 6, progress: '90', parentID: 2 },
    { taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/04/2025 08:00'), endDate: new Date('02/10/2025'), duration: 6, progress: '75', parentID: 2 },
    { taskID: 6, taskName: 'Planning complete', startDate: new Date('02/06/2025 08:00'), endDate: new Date('02/10/2025'), duration: 0, predecessor: '3FS,4FS,5FS', parentID: 2 },
    { taskID: 7, taskName: 'Design', startDate: new Date('02/13/2025 08:00'), endDate: new Date('02/17/2025 08:00'), parentID: 1 },
    { taskID: 8, taskName: 'Software specification', startDate: new Date('02/13/2025 08:00'), endDate: new Date('02/15/2025'), duration: 3, progress: '60', predecessor: '6FS', parentID: 7 },
    { taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/13/2025 08:00'), endDate: new Date('02/15/2025'), duration: 3, progress: '100', predecessor: '6FS', parentID: 7 },
    { taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/16/2025 08:00'), endDate: new Date('02/17/2025 08:00'), duration: 2, progress: '100', predecessor: '9FS', parentID: 7 },
    { taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2025 08:00'), endDate: new Date('02/17/2025 08:00'), duration: 0, predecessor: '10FS', parentID: 7 },
    { taskID: 12, taskName: 'Implementation', startDate: new Date('02/18/2025 08:00'), endDate: new Date('02/25/2025 08:00'), parentID: 1 },
    { taskID: 13, taskName: 'Develop core modules', startDate: new Date('02/18/2025 08:00'), endDate: new Date('02/22/2025'), duration: 5, progress: '80', predecessor: '11FS', parentID: 12 },
    { taskID: 14, taskName: 'Integrate modules', startDate: new Date('02/19/2025 08:00'), endDate: new Date('02/23/2025'), duration: 5, progress: '70', predecessor: '13FS', parentID: 12 },
    { taskID: 15, taskName: 'Implementation complete', startDate: new Date('02/25/2025 08:00'), endDate: new Date('02/25/2025 08:00'), duration: 0, predecessor: '14FS', parentID: 12 },
    { taskID: 16, taskName: 'Testing', startDate: new Date('02/26/2025 08:00'), endDate: new Date('03/02/2025 08:00'), parentID: 1 },
    { taskID: 17, taskName: 'Unit testing', startDate: new Date('02/26/2025 08:00'), endDate: new Date('02/28/2025'), duration: 3, progress: '50', predecessor: '15FS', parentID: 16 },
    { taskID: 18, taskName: 'Integration testing', startDate: new Date('02/27/2025 08:00'), endDate: new Date('03/01/2025'), duration: 4, progress: '40', predecessor: '17FS', parentID: 16 },
    { taskID: 19, taskName: 'Test report', startDate: new Date('03/02/2025 08:00'), endDate: new Date('03/02/2025 08:00'), duration: 0, predecessor: '18FS', parentID: 16 },
    { taskID: 20, taskName: 'Deployment', startDate: new Date('03/03/2025 08:00'), endDate: new Date('03/06/2025 08:00'), parentID: 1 },
    { taskID: 21, taskName: 'Configure environment', startDate: new Date('03/03/2025 08:00'), endDate: new Date('03/04/2025'), duration: 2, progress: '30', predecessor: '19FS', parentID: 20 },
    { taskID: 22, taskName: 'Deploy application', startDate: new Date('03/04/2025 08:00'), endDate: new Date('03/05/2025'), duration: 2, progress: '20', predecessor: '21FS', parentID: 20 },
    { taskID: 23, taskName: 'Deployment verification', startDate: new Date('03/06/2025 08:00'), endDate: new Date('03/06/2025 08:00'), duration: 0, predecessor: '22FS', parentID: 20 },
    { taskID: 24, taskName: 'Training', startDate: new Date('03/07/2025 08:00'), endDate: new Date('03/08/2025 08:00'), parentID: 1 },
    { taskID: 25, taskName: 'User training', startDate: new Date('03/07/2025 08:00'), endDate: new Date('03/07/2025'), duration: 1, progress: '10', predecessor: '23FS', parentID: 24 },
    { taskID: 26, taskName: 'Admin training', startDate: new Date('03/07/2025 08:00'), endDate: new Date('03/08/2025'), duration: 2, progress: '10', predecessor: '23FS', parentID: 24 },
    { taskID: 27, taskName: 'Training complete', startDate: new Date('03/08/2025 08:00'), endDate: new Date('03/08/2025 08:00'), duration: 0, predecessor: '25FS,26FS', parentID: 24 },
    { taskID: 28, taskName: 'Client review', startDate: new Date('03/09/2025 08:00'), endDate: new Date('03/09/2025'), duration: 1, progress: '0', predecessor: '27FS', parentID: 1 },
    { taskID: 29, taskName: 'Project handover', startDate: new Date('03/10/2025 08:00'), endDate: new Date('03/10/2025'), duration: 0, predecessor: '28FS', parentID: 1 },
    { taskID: 30, taskName: 'Post-Project Review', startDate: new Date('03/10/2025 08:00'), endDate: new Date('03/10/2025 08:00'), duration: 0, progress: '0', predecessor: '29FS', parentID: 1 }
  ];

  const taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    parentID: 'parentID'
  };

  const timelineSettings: any = {
    timelineUnitSize: 90,
    topTier: {
      unit: 'Day',
      format: 'EEE dd/yyyy' 
    },
    bottomTier: {
      unit: 'Hour',
      format: 'hh:mm a'
    }
  };

  const dayWorkingTime: any = [{ from: 0, to: 23 }]; // Updated to match TypeScript code

  const getTimeZonesWithOffsets=():{ id: string; text: string }[]=> {
        const now: Date = new Date();
        let zones;
        if ((Intl as any).supportedValuesOf) {
            zones = (Intl as any).supportedValuesOf('timeZone');
            // Ensure UTC is included and comes first
            if (zones.indexOf('UTC') === -1) {
                zones.unshift('UTC');
            }
        } 
        const uniqueZones = [];
        const seen: any = {};
        for (var i = 0; i < zones.length; i++) {
            if (!seen[zones[i]]) {
                seen[zones[i]] = true;
                uniqueZones.push(zones[i]);
            }
        }
        return uniqueZones.map(function(tz: string): { id: string; text: string } {
        let formatter: Intl.DateTimeFormat = new (Intl as typeof Intl).DateTimeFormat('en-US', {
            timeZone: tz,
            timeZoneName: 'longOffset' as 'long'
        });
        let parts = (formatter as any).formatToParts(now) as { type: string; value: string }[];
        let offsetPart = parts.filter(function(part: { type: string; value: string }): boolean { return part.type === 'timeZoneName'; })[0];
        let offset: string = offsetPart ? offsetPart.value : 'UTC+00:00';
        offset = offset.replace('GMT', 'UTC');
        if (offset === 'UTC' || offset === 'GMT') {
                offset = 'UTC+00:00';
        }
        return { id: tz, text: tz + ' (' + offset + ')' };
        });
    };


  const timeZoneList = (args: ChangeEventArgs): void => {
    if (args.value && ganttInstance.current) {
      ganttInstance.current.timezone = args.value.toString().split(' (')[0];
    } else if (ganttInstance.current) {
      ganttInstance.current.timezone = null;
    }
  };

  const timelineData: string[] = ['Day', 'Week', 'Month'];

  const timelineUnit = (args: ChangeEventArgs): void => {
    const unit: string = args.value as string;
    if (ganttInstance.current) {
      if (unit === 'Day') {
        ganttInstance.current.timelineSettings.topTier.unit = 'Day';
        ganttInstance.current.timelineSettings.bottomTier.unit = 'Hour';
        ganttInstance.current.timelineSettings.bottomTier.format = 'hh:mm a';
      } else if (unit === 'Week') {
        ganttInstance.current.timelineSettings.topTier.unit = 'Week';
        ganttInstance.current.timelineSettings.bottomTier.unit = 'Day';
        ganttInstance.current.timelineSettings.bottomTier.format = 'dd MMM';
      } else {
        ganttInstance.current.timelineSettings.topTier.unit = 'Month';
        ganttInstance.current.timelineSettings.bottomTier.unit = 'Day';
        ganttInstance.current.timelineSettings.bottomTier.format = 'dd';
      }
    }
  };

  const getPreviousTimeSpan = () => {
    if (ganttInstance.current) {
      ganttInstance.current.previousTimeSpan();
    }
  };

  const getNextTimeSpan = () => {
    if (ganttInstance.current) {
      ganttInstance.current.nextTimeSpan();
    }
  };
  const toolbar: any = [
    {
      align: 'Left',
      template: '<div class="timezone-label"><label class="showhide" style="margin-right: 10px;">Time Zone:</label></div>'
    },
    {
      align: 'Left',
      template: () => (
      <ComboBoxComponent
        id="timezonelist"
        value="UTC (UTC+00:00)"
        placeholder="Select Time Zone"
        change={timeZoneList}
        allowFiltering={true}
        filterType="Contains"
        dataSource={getTimeZonesWithOffsets()}
        width="300px"
        popupWidth="350px"
        popupHeight="350px"
        fields={{ value: 'id', text: 'text' }}
      />
    ),
    },
    {
      align: 'Right',
      template: () => (
        < ButtonComponent id= "previous-timespan"
        cssClass= "previous-timespan"
        onClick= {getPreviousTimeSpan}
        iconCss= 'e-icons e-chevron-left-fill'/>
      )
    },
    {
      type: 'Separator',
      align: 'Right'
    },
    {
      align: 'Right',
      template: ()=>(
       <DropDownListComponent id= "timeline"
        value= {timelineSettings.topTier.unit}
        placeholder= "Select timeline"
        change= {timelineUnit}
        dataSource= {timelineData}
        width= '100px' />
      )
    },
    {
      type: 'Separator',
      align: 'Right'
    },
    {
      align: 'Right',
      template: () => (
        < ButtonComponent id= "next-timespan"
        cssClass= "next-timespan"
        onClick= {getNextTimeSpan}
        iconCss= 'e-icons e-chevron-right-fill'/>
      )
    }
  ];
  return (
    <div className="control-pane">
      <div className="control-section">
        <GanttComponent id="Timezone" ref={ganttInstance} dataSource={timezoneData} taskFields={taskFields} timelineSettings={timelineSettings} 
        toolbar={toolbar} height="650px" taskbarHeight={25} rowHeight={46} timezone='UTC' 
        durationUnit="Hour" includeWeekend={true} treeColumnIndex={1} dayWorkingTime={dayWorkingTime}>
          <ColumnsDirective>
            <ColumnDirective field="taskID" visible={false} width="80"></ColumnDirective>
            <ColumnDirective field="taskName" headerText="Name" width="250"></ColumnDirective>
            <ColumnDirective field="startDate"></ColumnDirective>
            <ColumnDirective field="endDate"></ColumnDirective>
            <ColumnDirective field="duration"></ColumnDirective>
            <ColumnDirective field="predecessor"></ColumnDirective>
            <ColumnDirective field="progress"></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Toolbar]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates how the React Gantt Chart schedules project tasks using the UTC timezone, ensuring consistent date and time handling across global teams.</p>
      </div>
      <div id="description">
        <p>
          For example, in this demo, the timezone of Gantt is set to UTC, and the task named <code>Plan timeline</code> has start time as <code>08:00 am</code> but converted based on UTC and rendered at <code>2.30 am</code>
        </p>
        <p>
          When a user sets any timezone, dates are converted based on the value set to <code><a target="_blank" className='code' href="https://ej2.syncfusion.com/react/documentation/api/gantt#timezone">timezone</a></code> property of Gantt control.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/timezone">documentation section</a>.</p>
      </div>
    </div>
  );
};

export default Timezone;