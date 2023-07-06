import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Resize, Print, DragAndDrop, Inject, ScheduleModel } from '@syncfusion/ej2-react-schedule';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './print.css';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 *  Schedule print sample
 */

const PrintSchedule = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const [heightRow, setHeightRow] = useState<string>('e-height-row e-hide-row');
  const [widthRow, setWidthRow] = useState<string>('e-width-row e-hide-row');
  const [dateRow, setDateRow] = useState<string>('e-selected-date-row e-hide-row');
  let scheduleObj = useRef<ScheduleComponent>(null);
  let printWithOptionsObj = useRef<CheckBoxComponent>(null);
  let heightObj = useRef<DropDownListComponent>(null);
  let widthObj = useRef<DropDownListComponent>(null);
  let selectedDateObj = useRef<DatePickerComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  const printHeightAndWidthData: string[] = ['auto', '100%', '500px'];

  const onChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      setHeightRow('e-height-row');
      setWidthRow('e-width-row');
      setDateRow('e-selected-date-row');
    } else {
      setHeightRow('e-height-row e-hide-row');
      setWidthRow('e-width-row e-hide-row');
      setDateRow('e-selected-date-row e-hide-row');
    }
  }

  const onPrintClick = (): void => {
    if (printWithOptionsObj.current.checked) {
      let printOptions: ScheduleModel = {
        height: heightObj.current.value as string,
        width: widthObj.current.value as string,
        selectedDate: selectedDateObj.current.value as Date
      };
      scheduleObj.current.print(printOptions);
    } else {
      scheduleObj.current.print();
    }
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent cssClass='print' width='100%' height='650px' id='schedule' ref={scheduleObj} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, Print]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table schedule-print-property-panel'>
            <tbody>
              <tr>
                <td style={{ height: '50px' }}>
                  <div>
                    <CheckBoxComponent labelPosition="Before" label="Print with options" ref={printWithOptionsObj} change={onChange} />
                  </div>
                </td>
              </tr>
              <tr className={heightRow}>
                <td>
                  <div>
                    <DropDownListComponent id="heightElement" placeholder="Height" floatLabelType="Always" ref={heightObj} value={'auto'} dataSource={printHeightAndWidthData} />
                  </div>
                </td>
              </tr>
              <tr className={widthRow}>
                <td>
                  <div>
                    <DropDownListComponent id="widthElement" placeholder="Width" floatLabelType="Always" ref={widthObj} value={'auto'} dataSource={printHeightAndWidthData} />
                  </div>
                </td>
              </tr>
              <tr className={dateRow}>
                <td>
                  <div>
                    <DatePickerComponent id="selectedDateElement" placeholder="Selected date" floatLabelType="Always" ref={selectedDateObj} value={new Date(2021, 0, 10)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <div>
                    <ButtonComponent iconCss="e-icons e-print" cssClass="e-print-btn" onClick={onPrintClick}>Print</ButtonComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This example demonstrates how to print the Scheduler element at client-side.</p>
      </div>
      <div id='description'>
        <p>In this example, the Scheduler element is Printed by making use of the public method <code>print</code>.</p>
        <p>
          <p>
            Also, we can print the schedule based on the custom rendering by passing the <code>ScheduleModel</code> in the <code>print</code> method.
            In the above demo, we have demonstrated the <code>print</code> method with the below properties of the <code>ScheduleModel</code>.
          </p>
          <ul>
            <li>height</li>
            <li>width</li>
            <li>selectedDate</li>
          </ul>
          <strong>Module Injection</strong>
        </p>
        <p>To start using Print functionality in Scheduler, we need to inject <code>Print</code> module into the services.</p>
      </div>
    </div>
  );
}
export default PrintSchedule;