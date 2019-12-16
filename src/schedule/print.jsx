import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { ScheduleComponent, ViewDirective, Month, Resize, Print, DragAndDrop, Inject, ViewsDirective } from '@syncfusion/ej2-react-schedule';
import './print.css';
import * as dataSource from './datasource.json';
/**
 *  Schedule header customization sample
 */
export class PrintSchedule extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.scheduleData, null, true);
    }
    onActionBegin(args) {
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-print',
                text: 'Print', cssClass: 'e-schedule-print', click: this.onPrintIconClick.bind(this)
            };
            args.items.push(exportItem);
        }
    }
    onPrintIconClick() {
        this.scheduleObj.print();
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='print' width='100%' height='650px' id='schedule' ref={t => this.scheduleObj = t} selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: this.data }} actionBegin={this.onActionBegin.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Month'/>
              </ViewsDirective>
              <Inject services={[Month, Resize, DragAndDrop, Print]}/>
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
      </div>);
    }
}
