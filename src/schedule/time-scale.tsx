import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective,
  Day, Week, TimelineViews, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule Timescale sample
 */

export class Timescale extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], (dataSource as any).scheduleData, null, true) as Object[];
  private instance = new Internationalization();
  private majorSlotTemplate(props): JSX.Element {
    return (<div>{this.instance.formatDate(props.date, { skeleton: 'hm' })}</div>);
  }
  private minorSlotTemplate(props): JSX.Element {
    return (<div style={{ textAlign: 'right', marginRight: '15px' }}>
      {this.instance.formatDate(props.date, { skeleton: 'ms' }).replace(':00', '')}
    </div>);
  }
  private slotCountList: { [key: string]: Object }[] = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 }
  ];
  private intervalList: { [key: string]: Object }[] = [
    { text: '30', value: 30 },
    { text: '60', value: 60 },
    { text: '90', value: 90 },
    { text: '120', value: 120 },
    { text: '150', value: 150 },
    { text: '180', value: 180 },
    { text: '240', value: 240 },
    { text: '300', value: 300 },
    { text: '720', value: 720 }
  ];
  private timeScaleOptions: { [key: string]: Object }[] = [
    { text: 'Show', value: 'enable' },
    { text: 'Hide', value: 'disable' }
  ];
  private templateOptions: { [key: string]: Object }[] = [
    { text: 'Yes', value: true },
    { text: 'No', value: false }
  ];
  private fields: object = { text: 'text', value: 'value' };
  private onSlotCountChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeScale.slotCount = args.value as number;
    this.scheduleObj.dataBind();
  }
  private onIntervalChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeScale.interval = args.value as number;
  }
  private onTimeScaleChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeScale.enable = (args.value === 'enable') ? true : false;
    this.scheduleObj.dataBind();
  }
  private onTemplateChange(args: ChangeEventArgs): void {
    (this.scheduleObj.timeScale as any).majorSlotTemplate = args.value ?
      this.majorSlotTemplate.bind(this) : null;
    (this.scheduleObj.timeScale as any).minorSlotTemplate = args.value ?
      this.minorSlotTemplate.bind(this) : null;
    this.scheduleObj.dataBind();
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='550px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}
              currentView='TimelineWeek' timeScale={{ enable: true, interval: 60, slotCount: 6 }}>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='TimelineDay' />
                <ViewDirective option='TimelineWeek' />
              </ViewsDirective>
              <Inject services={[Day, Week, TimelineViews, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table'
              style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Interval(in Minutes)
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={60} fields={this.fields}
                        dataSource={this.intervalList} change={this.onIntervalChange.bind(this)}>
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Slot Count</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={6} fields={this.fields}
                        dataSource={this.slotCountList} change={this.onSlotCountChange.bind(this)}>
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Grid lines</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={'enable'} fields={this.fields}
                        dataSource={this.timeScaleOptions} change={this.onTimeScaleChange.bind(this)}>
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Apply Template</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={false} fields={this.fields}
                        dataSource={this.templateOptions} change={this.onTemplateChange.bind(this)}></DropDownListComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>
            This demo depicts how to customize the grid lines of scheduler with different duration, count and also, how to
            apply template
            customizations on it.
          </p>
        </div>
        <div id="description">
          <p>
            In this demo, scheduler has been allowed to display different number of grid lines per hour assigned with
            different duration
            to each cell, by making use of the
            <code>interval</code> and <code>slotCount</code> properties.
            The grid lines can also be disabled on schedule, by setting `false` to the
            <code>enable</code> property available within
            <code>timeScale</code>. The time header text can be customized by making use of the
            <code>majorSlotTemplate</code> and
            <code>minorSlotTemplate</code> properties.
          </p>
        </div>
      </div>
    );
  }
}