import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScheduleComponent, Agenda, Inject, View, ViewsModel } from '@syncfusion/ej2-react-schedule';
import { generateObject } from './helper';
import { NumericTextBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import './schedule-component.css';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule agenda sample
 */

const AgendaView = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const virtualScrollOptions: Record<string, any>[] = [
    { text: 'True', value: true },
    { text: 'False', value: false }
  ];
  const hideEmptyAgendaDaysOptions: Record<string, any>[] = [
    { text: 'True', value: true },
    { text: 'False', value: false }
  ];
  const fields: Record<string, any> = { text: 'text', value: 'value' };
  const [views, setViews] = useState<View[] | ViewsModel[]>([{ option: 'Agenda', allowVirtualScrolling: false }]);
  const [hideEmptyAgendaDays, setHideEmptyAgendaDays] = useState<boolean>(true);
  const [agendaDaysCount, setAgendaDaysCount] = useState<number>(7)
  const onVirtualChange = (args: DropDownChangeArgs): void => {
    setViews([{ option: 'Agenda', allowVirtualScrolling: args.value as boolean }])
  }
  const onEmptyAgendaDaysChange = (args: DropDownChangeArgs): void => {
    setHideEmptyAgendaDays(args.value as boolean)
  }
  const onCountChange = (args: ChangeEventArgs): void => {
    setAgendaDaysCount(args.value !== null ? args.value : 7)
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' views={views} currentView='Agenda' selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: generateObject() }} hideEmptyAgendaDays={hideEmptyAgendaDays} agendaDaysCount={agendaDaysCount}>
            <Inject services={[Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={false} dataSource={virtualScrollOptions} fields={fields} change={onVirtualChange} floatLabelType='Always' placeholder='Allow Virtual Scrolling'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={hideEmptyAgendaDays} dataSource={hideEmptyAgendaDaysOptions} fields={fields} change={onEmptyAgendaDaysChange} floatLabelType='Always' placeholder='Hide Empty Days'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <NumericTextBoxComponent format='n0' value={agendaDaysCount} min={1} max={15} change={onCountChange} floatLabelType='Always' placeholder='Days Count' />
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
export default AgendaView;