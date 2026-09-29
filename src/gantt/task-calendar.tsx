import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, DayMarkers, Edit, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './task-calendar.css';

export class TaskCalendar extends SampleBase<{}, { hours: number | null; warning: string }> {
  private gantt: GanttComponent;
  private hoursInput: NumericTextBoxComponent;
  private lastProcessedHours: number | null = null;
  private lastWarning: string = '';
  constructor(props: any) {
    super(props);
    this.state = { hours: 8, warning: '' };
  }

  private ploMeetingsData: any[] = [
    {
      TaskID: 1,
      TaskName: 'PLO Kickoff',
      StartDate: new Date('07/06/2026'),
      EndDate: new Date('07/15/2026'),
      subtasks: [
        { TaskID: 2, TaskName: 'PLO Charter sign-off', StartDate: new Date('07/05/2026'), Duration: 4, Progress: 100 },
        { TaskID: 3, TaskName: 'Stakeholder mapping', StartDate: new Date('07/05/2026'), Duration: 4, calendar: 'Steering-committee', Progress: 80 },
        { TaskID: 4, TaskName: 'Initial risk register', StartDate: new Date('07/05/2026'), Duration: 4, calendar: 'Compliance-audit', Progress: 60 }
      ]
    },
    {
      TaskID: 5,
      TaskName: 'Architecture Review',
      StartDate: new Date('07/13/2026'),
      EndDate: new Date('07/23/2026'),
      subtasks: [
        { TaskID: 6, TaskName: 'Solution architecture draft', StartDate: new Date('07/13/2026'), Duration: 3, calendar: 'Tech-review', Progress: 70 },
        { TaskID: 7, TaskName: 'Technical review board', StartDate: new Date('07/16/2026'), Duration: 2, calendar: 'Tech-review', Progress: 50, Predecessor: '6' },
        { TaskID: 8, TaskName: 'Architecture sign-off', StartDate: new Date('07/20/2026'), Duration: 2, calendar: 'Steering-committee', Progress: 30 }
      ]
    },
    {
      TaskID: 9,
      TaskName: 'Compliance & Audit',
      StartDate: new Date('07/15/2026'),
      EndDate: new Date('07/29/2026'),
      subtasks: [
        { TaskID: 10, TaskName: 'Audit readiness checklist', StartDate: new Date('07/15/2026'), Duration: 3, calendar: 'Compliance-audit', Progress: 65 },
        { TaskID: 11, TaskName: 'Internal compliance walkthrough', StartDate: new Date('07/20/2026'), Duration: 4, calendar: 'Compliance-audit', Progress: 40, Predecessor: '10' },
        { TaskID: 12, TaskName: 'External auditor session', StartDate: new Date('07/27/2026'), Duration: 2, calendar: 'Compliance-audit', Progress: 0, Predecessor: '11' }
      ]
    },
    {
      TaskID: 13,
      TaskName: 'Stakeholder Demos',
      StartDate: new Date('07/16/2026'),
      EndDate: new Date('07/24/2026'),
      subtasks: [
        { TaskID: 14, TaskName: 'Demo to executive sponsors', StartDate: new Date('07/16/2026'), Duration: 1, calendar: 'Steering-committee', Progress: 100 },
        { TaskID: 15, TaskName: 'Demo to engineering leads', StartDate: new Date('07/20/2026'), Duration: 1, Progress: 50, Predecessor: '14' },
        { TaskID: 16, TaskName: 'Demo to compliance officers', StartDate: new Date('07/23/2026'), Duration: 1, calendar: 'Compliance-audit', Progress: 0, Predecessor: '15' }
      ]
    },
    {
      TaskID: 17,
      TaskName: 'Launch Readiness Review',
      StartDate: new Date('07/27/2026'),
      EndDate: new Date('08/04/2026'),
      subtasks: [
        { TaskID: 18, TaskName: 'Go / No-go meeting', StartDate: new Date('07/27/2026'), Duration: 1, calendar: 'Steering-committee', Progress: 0 },
        { TaskID: 19, TaskName: 'Final compliance sign-off', StartDate: new Date('07/29/2026'), Duration: 2, calendar: 'Compliance-audit', Progress: 0, Predecessor: '18' },
        { TaskID: 20, TaskName: 'Launch announcement', StartDate: new Date('08/03/2026'), Duration: 1, Progress: 0, Predecessor: '19' }
      ]
    }
  ];

  private taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    calendarId: 'calendar'
  };

  private calendarSettings: any = {
    projectCalendar: {
      workingTime: [
        { from: 8, to: 12 },
        { from: 13, to: 17 }
      ],
      holidays: [
        { from: '07/06/2026', to: '07/06/2026', label: 'Company Foundation Day' }
      ],
      exceptions: [
        { from: '07/05/2026', to: '07/05/2026', label: 'Extended Work Day' }
      ]
    },
    taskCalendars: [
      {
        calendarId: 'Steering-committee',
        holidays: [
          { from: '07/07/2026', to: '07/07/2026', label: 'SC Strategy Day' },
          { from: '07/22/2026', to: '07/22/2026', label: 'Board Offsite' }
        ],
        exceptions: [
          { from: '07/05/2026', to: '07/05/2026', label: 'Compensatory Working' },
          { from: '07/19/2026', to: '07/19/2026', label: 'Compensatory Working' }
        ]
      },
      {
        calendarId: 'Tech-review',
        holidays: [
          { from: '07/16/2026', to: '07/17/2026', label: 'Architecture Review Freeze' }
        ],
        exceptions: [
          { from: '07/26/2026', to: '07/26/2026', label: 'Extra Review Slot' }
        ]
      },
      {
        calendarId: 'Compliance-audit',
        holidays: [
          { from: '07/09/2026', to: '07/10/2026', label: 'Compliance Blackout' }
        ],
        exceptions: [
          { from: '07/25/2026', to: '07/25/2026', label: 'Mandatory Audit Working Day' }
        ]
      }
    ]
  };

  private onHoursChange = (args: any) => {
    const val = args.value as number | null;
    const warningMessage = 'Hours per day value must be greater than 1 and less than 24.';

    if (val == null) {
      this.setState({ warning: warningMessage });
      return;
    }

    if (val < 1 || val > 24) {
      this.setState({ warning: warningMessage });
      return;
    }

    // valid value
    this.setState({ hours: val, warning: '' });
  };

  private updateHours = () => {
    const inputValue = this.hoursInput && this.hoursInput.value != null ? Number(this.hoursInput.value) : this.state.hours;

    if (inputValue == null || inputValue < 1 || inputValue > 24) {
      const warningMessage = 'Hours per day value must be greater than 1 and less than 24.';
      this.lastWarning = warningMessage;
      this.setState({ warning: warningMessage });
      return;
    }

    this.setState({ warning: '', hours: inputValue });
    if (this.gantt) {
      this.gantt.hoursPerDay = inputValue;
    }
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section task-calendar-container">
          <div className="task-calendar-left">
            <div className="hours-input-row">
              <label>Hours per day</label>
              <NumericTextBoxComponent ref={NumericTextBox => this.hoursInput = NumericTextBox} value={this.state.hours} min={1} max={24} format="n" strictMode={false} change={this.onHoursChange} width='120px' />
              <ButtonComponent cssClass='e-primary' onClick={this.updateHours}>Update</ButtonComponent>
              {this.state.warning && <span className="hours-warning">{this.state.warning}</span>}
            </div>

            <GanttComponent id="TaskCalendarGantt" ref={g => this.gantt = g} dataSource={this.ploMeetingsData} allowSorting={true} treeColumnIndex={1}
              taskFields={this.taskFields} editSettings={{ allowAdding: true, allowEditing: true, allowDeleting: true, allowTaskbarEditing: true, showDeleteConfirmDialog: true }}
              toolbar={['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search', 'PrevTimeSpan', 'NextTimeSpan']}
              splitterSettings={{ columnIndex: 3 }} allowSelection={true} gridLines={'Both'} showColumnMenu={false} highlightWeekends={true}
              labelSettings={{ rightLabel: 'TaskName', taskLabel: 'Progress' }}
              timelineSettings={{ topTier: { unit: 'Week', format: 'MM/dd/yyyy' }, bottomTier: { unit: 'Day', count: 1 } }}
              calendarSettings={this.calendarSettings} height={'550px'} taskbarHeight={25} rowHeight={46} projectStartDate={new Date('07/01/2026')} projectEndDate={new Date('08/31/2026')}>
              <ColumnsDirective>
                <ColumnDirective field='TaskID' visible={false} width='90' />
                <ColumnDirective field='TaskName' headerText='Task Name' width='200' clipMode='EllipsisWithTooltip' />
                <ColumnDirective field='calendar' headerText='Calendar Profile' width='150' />
                <ColumnDirective field='Duration' headerText='Duration' width='90' />
                <ColumnDirective field='Predecessor' headerText='Dependency' width='120' />
                <ColumnDirective field='StartDate' headerText='Start Date' width='100' />
                <ColumnDirective field='Progress' width='90' />
              </ColumnsDirective>
              <Inject services={[Selection, Toolbar, DayMarkers, Edit]} />
            </GanttComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates how different tasks can use different calendars in the Gantt chart. Leadership, compliance, and technical reviews each have their own working rules, while the hours per day field still controls the default duration calculation for the project.</p>
        </div>
        <div id="description">
          <p>This task calendar sample shows that a Gantt Chart project can assign a unique <code>calendar</code> to each task. Different tasks can follow different working patterns without changing the rest of the schedule.</p>
          <p>This sample uses the following calendar configurations:</p>
          <ul>
            <li><strong>Project Calendar:</strong> Standard working hours from 8:00 AM to 12:00 PM and 1:00 PM to 5:00 PM, with a holiday on 07/06/2026 (Company Foundation Day) and an exception working day on 07/05/2026 (Extended Work Day).</li>
            <li><strong>Steering-committee:</strong> Holidays on 07/07/2026 (SC Strategy Day) and 07/22/2026 (Board Offsite), with exception working days on 07/05/2026 and 07/19/2026 (Compensatory Working).</li>
            <li><strong>Tech-review:</strong> Holiday period from 07/16/2026 to 07/17/2026 (Architecture Review Freeze), with an exception working day on 07/26/2026 (Extra Review Slot).</li>
            <li><strong>Compliance-audit:</strong> Holiday period from 07/09/2026 to 07/10/2026 (Compliance Blackout), with an exception working day on 07/25/2026 (Mandatory Audit Working Day).</li>
          </ul>
          <p>The <code>hoursPerDay</code> property controls the working hours considered for duration calculations, while the project calendar serves as the default schedule for tasks that do not specify a custom calendar.</p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use toolbar, edit, markers and selection features, we need to inject the <code>Toolbar</code>, <code>Edit</code>, <code>DayMarkers</code> and <code>Selection</code> into the <code>Inject Services</code> section.
          </p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/getting-started">documentation section</a>.</p>
          <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    );
  }
}

export default TaskCalendar;
