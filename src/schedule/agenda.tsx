import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { generateObject } from './helper';
import { NumericTextBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import './schedule-component.css';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule agenda sample
 */

export class AgendaView extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private virtualScrollOptions: { [key: string]: Object }[] = [
    { text: 'True', value: true },
    { text: 'False', value: false }
  ];
  private hideEmptyAgendaDaysOptions: { [key: string]: Object }[] = [
    { text: 'True', value: true },
    { text: 'False', value: false }
  ];
  private fields: object = { text: 'text', value: 'value' };
  private onVitrualChange(args: DropDownChangeArgs): void {
    this.scheduleObj.views = [{ option: 'Agenda', allowVirtualScrolling: args.value as boolean }];
  }
  private onEmptyAgendaDaysChange(args: DropDownChangeArgs): void {
    this.scheduleObj.hideEmptyAgendaDays = args.value as boolean;
  }
  private onCountChange(args: ChangeEventArgs): void {
    this.scheduleObj.agendaDaysCount = args.value !== null ? args.value : 7;
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule}
              currentView='Agenda' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: generateObject() }}>
              <ViewsDirective>
                <ViewDirective option='Agenda' allowVirtualScrolling={false} />
              </ViewsDirective>
              <Inject services={[Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Allow Virtual Scrolling</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={false} dataSource={this.virtualScrollOptions}
                        fields={this.fields} change={this.onVitrualChange.bind(this)}></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Hide empty Days</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={true} dataSource={this.hideEmptyAgendaDaysOptions}
                        fields={this.fields} change={this.onEmptyAgendaDaysChange.bind(this)}></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Days Count</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <NumericTextBoxComponent format='n0' value={7} min={1} max={15}
                        change={this.onCountChange.bind(this)} ></NumericTextBoxComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo showcases the agenda view and the configurations available in it.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, Agenda view is set as active view on Scheduler and made its <code>allowVirtualScrolling</code> option as false.
            With this settings, the Agenda view loads the initial data for the next 7 days count
             from the date value assigned to the <code>selectedDate</code> property of the Scheduler.
            The initial data loading for 7 days count is due to the default value assigned to the <code>agendaDaysCount</code> property
             which can be customized as per the user needs.
          </p>
          <p>
            When the <code>allowVirtualScrolling</code> property is set to true,
            the user is allowed to scroll through all the events simply by scrolling up and down upto the last event available in Scheduler.
          </p>
          <p>
            By default, the days which doesn’t have any events will be hidden on this view –
             but by setting <code>hideEmptyAgendaDays</code> property to false will allow the <code>No Events</code> text
   to be displayed against the dates that has no events.
        </p>
        </div>
      </div>
    );
  }
}