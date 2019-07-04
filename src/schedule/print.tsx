import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { ItemModel } from '@syncfusion/ej2-react-navigations';
import {
  ScheduleComponent, ViewDirective, Month, Resize, Print,
  ActionEventArgs, ToolbarActionArgs, DragAndDrop, Inject, ViewsDirective
} from '@syncfusion/ej2-react-schedule';
import './print.css';
import * as dataSource from './datasource.json';

/**
 *  Schedule header customization sample
 */

export class PrintSchedule extends SampleBase<{}, {}> {
  public scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], (dataSource as any).scheduleData, null, true) as Object[];

  private onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      let exportItem: ItemModel = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-print',
        text: 'Print', cssClass: 'e-schedule-print', click: this.onPrintIconClick.bind(this)
      };
      args.items.push(exportItem);
    }
  }

  private onPrintIconClick(): void {
    this.scheduleObj.print();
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='print' width='100%' height='650px' id='schedule' ref={t => this.scheduleObj = t}
              selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: this.data }}
              actionBegin={this.onActionBegin.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Month, Resize, DragAndDrop, Print]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This example demonstrates how to print the Scheduler element at client-side.</p>
        </div>
        <div id='description'>
          <p>In this example, the Scheduler element is Printed by making use of the public method
            <code>print</code>.</p>
          <p>
          <strong>Module Injection</strong>
          </p>
          <p>To start using Print functionality in Scheduler, we need to inject <code>Print</code> module into the services.
          </p>
        </div>
      </div>
    );
  }
}