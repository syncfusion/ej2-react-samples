import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './tooltip.css';
import { extend } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 *  Schedule event tooltip sample
 */

function Tooltip() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj: ScheduleComponent;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).eventsData, null, true) as Record<string, any>[];

  function template(props): JSX.Element {
    return (<div className="tooltip-wrap">
      <div className={"image " + props.EventType}></div>
      <div className="content-area"><div className="event-name">{props.Subject}</div>
        {(props.City !== null && props.City !== undefined) ? <div className="city">{props.City}</div> : ''}
        <div className="time">From&nbsp;:&nbsp;{props.StartTime.toLocaleString()}</div>
        <div className="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{props.EndTime.toLocaleString()}</div>
      </div></div>);
  }

  function onToolTipChange(args: ChangeEventArgs): void {
    scheduleObj.eventSettings.enableTooltip = args.checked;
    scheduleObj.dataBind();
  }

  function onToolTipTemplateChange(args: ChangeEventArgs): void {
    scheduleObj.eventSettings.tooltipTemplate = (args.checked) ? template.bind(this) : null;
    scheduleObj.dataBind();
  }

  function onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, scheduleObj.currentView);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2021, 1, 15)}
            ref={t => scheduleObj = t} eventSettings={{
              dataSource: data, enableTooltip: true,
              tooltipTemplate: template.bind(this)
            }}
            eventRendered={onEventRendered.bind(this)}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table'
            style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '90%' }}>
                  <div className='enableTooltip'>
                    <CheckBoxComponent checked={true} label='Enable Tooltip' change={onToolTipChange.bind(this)}>
                    </CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '90%' }}>
                  <div className='enableTooltipTemplate'>
                    <CheckBoxComponent checked={true} label='Enable Tooltip Template' change={onToolTipTemplateChange.bind(this)}>
                    </CheckBoxComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This demo illustrates how to enable tooltip on scheduler events as well as the way to customize it. The tooltip can be
          customized to display any of the information in a formatted style by making use of the tooltip template option.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the tooltip is enabled to display on events by setting true to <code>enableTooltip</code> option
          within the <code>eventSettings</code> property. After enabling the default tooltip,
          it is customized to display the needed event information along with
          the appropriate images by making use of the <code>tooltipTemplate</code> option within the <code>eventSettings</code>.
        </p>
        <p>
          The <code>tooltipTemplate</code> option will not work, if <code>enableTooltip</code> is set to false.In mobile devices, tap holding the events will open the tooltip.
        </p>
      </div>
    </div>
  );
}
export default Tooltip;