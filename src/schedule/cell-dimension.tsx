import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewsModelDirective, Day, Week, WorkWeek, Month, ActionEventArgs, EventRenderedArgs, Inject } from '@syncfusion/ej2-react-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';
import './cell-dimension.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 *  Schedule cell dimension sample
 */

export class CellDimension extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], employeeEventData, null, true) as Object[];
  private onCreated(): void {
    let scheduleObj: any = this;
    scheduleObj.adjustEventWrapper();
  }
  private onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
      this.scheduleObj.adjustEventWrapper();
    }
  }
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-cell-dimension' width='100%' height='550px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}
              created={this.onCreated} actionComplete={this.onActionComplete.bind(this)} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewsModelDirective option='Day' />
                <ViewsModelDirective option='Week' />
                <ViewsModelDirective option='WorkWeek' />
                <ViewsModelDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo shows how to set the width and height of the cells by overriding the default CSS classes, so that the Schedule
        events are viewable in a zoomed in style.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the height and width of the Schedule cells are set by overriding the default CSS class. By doing so, it also
            needs to adjust the outer event wrapper element to cope with the CSS changes which can be done by calling the 
            <code>adjustEventWrapper</code> method.
        </p>
        </div>
      </div>
    );
  }
}