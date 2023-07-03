import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, TimelineViews, Inject, Resize, DragAndDrop, TimeScaleModel } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule Timescale sample
 */

const Timescale = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  const instance = new Internationalization();
  const workDays: number[] = [0, 1, 2, 3, 4, 5];
  const slotCountList: Record<string, any>[] = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 }
  ];
  const intervalList: Record<string, any>[] = [
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
  const timeScaleOptions: Record<string, any>[] = [
    { text: 'Show', value: 'enable' },
    { text: 'Hide', value: 'disable' }
  ];
  const templateOptions: Record<string, any>[] = [
    { text: 'Yes', value: true },
    { text: 'No', value: false }
  ];
  const fields: Record<string, any> = { text: 'text', value: 'value' };
  const [timeScale, setTimeScale] = useState<TimeScaleModel>({
    enable: true,
    interval: 60,
    slotCount: 6,
    majorSlotTemplate: null,
    minorSlotTemplate: null
  })
  const majorSlotTemplate = (props) => {
    return (<div>{instance.formatDate(props.date, { skeleton: 'hm' })}</div>);
  }

  const minorSlotTemplate = (props) => {
    return (<div style={{ textAlign: 'center' }}>{instance.formatDate(props.date, { skeleton: 'ms' }).replace(':00', '')}</div>);
  }

  const onSlotCountChange = (args: ChangeEventArgs): void => {
    setTimeScale({ ...timeScale, slotCount: args.value as number })
    scheduleObj.current.dataBind();
  }

  const onIntervalChange = (args: ChangeEventArgs): void => {
    setTimeScale({ ...timeScale, interval: args.value as number })
  }

  const onTimeScaleChange = (args: ChangeEventArgs): void => {
    setTimeScale({ ...timeScale, enable: (args.value === 'enable') ? true : false })
    scheduleObj.current.dataBind();
  }

  const onTemplateChange = (args: ChangeEventArgs): void => {
    setTimeScale({
      ...timeScale,
      majorSlotTemplate: args.value ? majorSlotTemplate.bind(this) : null,
      minorSlotTemplate: args.value ? minorSlotTemplate.bind(this) : null
    });
    scheduleObj.current.dataBind();
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent height='550px' cssClass='time-scale' ref={scheduleObj} selectedDate={new Date(2021, 0, 10)} workDays={workDays} eventSettings={{ dataSource: data }} currentView='TimelineWeek' timeScale={timeScale}>
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
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={60} fields={fields} dataSource={intervalList} change={onIntervalChange} placeholder='Interval (in minutes)' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={6} fields={fields} dataSource={slotCountList} change={onSlotCountChange} placeholder='Slot Count' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={'enable'} fields={fields} dataSource={timeScaleOptions} change={onTimeScaleChange} placeholder='Gridlines' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={false} fields={fields} dataSource={templateOptions} change={onTemplateChange} placeholder='Apply Template' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id="action-description">
        <p>This demo depicts how to customize the grid lines of scheduler with different duration, count and also, how to apply template customizations on it.</p>
      </div>
      <div id="description">
        <p>
          In this demo, scheduler has been allowed to display different number of grid lines per hour assigned with
          different duration to each cell, by making use of the <code>interval</code> and <code>slotCount</code> properties.
          The grid lines can also be disabled on schedule, by setting `false` to the <code>enable</code> property available within
          <code>timeScale</code>. The time header text can be customized by making use of the <code>majorSlotTemplate</code> and <code>minorSlotTemplate</code> properties.
        </p>
      </div>
    </div>
  );
}
export default Timescale;