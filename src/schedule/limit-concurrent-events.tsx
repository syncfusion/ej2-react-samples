import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek,
  Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';

import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './limit-concurrent-events.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

export class LimitConcurrentEvents extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).overlappingData, null, true) as Record<string, any>[];
  private displayMode: string = 'limited';
  private maxEventsLimit: number = 1;

  private getMaxStack = (): number => {
    return this.displayMode === 'all' ? 0 : this.maxEventsLimit;
  }

  private getEventDataSource = (): Record<string, any>[] => {
    const scheduleData: Record<string, any>[] = this.scheduleObj?.getEvents() || [];
    return scheduleData.length > 0 ? scheduleData : this.data;
  }

  private onDisplayModeChange = (mode: string) => {
    this.displayMode = mode;
    if (mode === 'all') {
      this.scheduleObj.activeViewOptions.maxEventStack = 0;
    }
    else {
      this.scheduleObj.activeViewOptions.maxEventStack = this.maxEventsLimit;
    }
    this.scheduleObj.refreshEvents();
  };

  private onLimitChange = (value: number) => {
    this.maxEventsLimit = value;
    this.scheduleObj.activeViewOptions.maxEventStack = value;
    this.scheduleObj.refreshEvents();
  };

  private applyMaxStackToAllViews = (value: number) => {
    if (!this.scheduleObj) return;
    const currentViews = this.scheduleObj.views as any[];
    const updatedViews = currentViews.map((view) => ({
      ...view,
      maxEventStack: value
    }));
    this.scheduleObj.setProperties(
      { views: updatedViews },
      true
    );
    this.scheduleObj.dataBind();
    this.scheduleObj.refreshEvents();
  };

  public onNavigating = (args: any) => {
    if (args.action === 'view') {
      const value = this.displayMode === 'all' ? 0 : this.maxEventsLimit;
      this.applyMaxStackToAllViews(value);
    }
  };

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-8 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-limit-concurrent' width='100%' height='650px' ref={t => this.scheduleObj = t}
              currentView='Week' selectedDate={new Date(2026, 4, 29)} eventSettings={{ dataSource: this.getEventDataSource() }}
              navigating={this.onNavigating}>
              <ViewsDirective>
                <ViewDirective option='Day' maxEventStack={this.getMaxStack()} />
                <ViewDirective option='Week' maxEventStack={this.getMaxStack()} />
                <ViewDirective option='WorkWeek' maxEventStack={this.getMaxStack()} />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>

        <div className='col-lg-4 property-section' style={{ padding: '15px' }}>
          <PropertyPane title='Properties'>
            <div style={{ display: 'flex', alignItems: 'center', height: '70px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <RadioButtonComponent
                  cssClass={"schedule-radio-button"}
                  name="eventDisplay"
                  value="all"
                  checked={this.displayMode === 'all'}
                  change={() => this.onDisplayModeChange('all')}
                />
                <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                  <b>Show all events</b>
                </span>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '70px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RadioButtonComponent
                  cssClass={"schedule-radio-button"}
                  name="eventDisplay"
                  value="limited"
                  checked={this.displayMode === 'limited'}
                  change={() => this.onDisplayModeChange('limited')}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  marginLeft: '30px',
                  gap: '6px'
                }}
              >
                <b>Show up to</b>
                <NumericTextBoxComponent
                  value={this.maxEventsLimit}
                  min={1}
                  width="110px"
                  format="n0"
                  enabled={this.displayMode === 'limited'}
                  change={(e) => this.onLimitChange(e.value)}
                />
                <b>labels</b>
              </div>
            </div>
          </PropertyPane>
        </div>

        <div id='action-description'>
          <p>
            This demo illustrates how to limit the number of concurrent events displayed within a single time slot on the Scheduler component.
          </p>
        </div>
        <div id='description'>
          <p>
            In this demo, the <code>maxEventStack</code> property allows you to control how many events are visible at a time within each time slot.
            When multiple events overlap and exceed the specified limit, a "+N" indicator appears, showing how many additional events exist.
            Users can click on this indicator to view remaining events in a popup window.
          </p>
          <p>
            Use the options below to customize the event display:
          </p>
          <ul>
            <li>Select <strong>"Show all events"</strong> to display all events</li>
            <li>Select <strong>"Show up to N labels"</strong> to set a maximum limit for visible events per time slot</li>
            <li>Modify the numeric value to adjust how many events display before the "+N" indicator appears</li>
          </ul>
          <p>
            The <code>maxEventStack</code> property is applicable only with Day, Week, and WorkWeek views when the timeScale option is enabled.
          </p>
          <p>
            Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our <a target="_blank" href="https://www.syncfusion.com/scheduler-sdk/react-scheduler">React Scheduler</a> component page.
          </p>
        </div>
      </div>
    );
  }
}
