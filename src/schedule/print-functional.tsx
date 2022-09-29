import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Resize, Print, DragAndDrop, Inject, ScheduleModel
} from '@syncfusion/ej2-react-schedule';
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

function PrintSchedule() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj: ScheduleComponent;
  let printWithOptionsObj: CheckBoxComponent;
  let heightObj: DropDownListComponent;
  let widthObj: DropDownListComponent;
  let selectedDateObj: DatePickerComponent;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  const printHeightAndWidthData: string[] = ['auto', '100%', '500px'];

  function onChange(args: ChangeEventArgs): void {
    let classList: string[] = ['.e-height-row', '.e-width-row', '.e-selected-date-row'];
    for (let i: number = 0; i < classList.length; i++) {
      let element: HTMLElement = document.querySelector(classList[i]);
      if (args.checked) {
        element.classList.remove('e-hide-row');
      } else {
        element.classList.add('e-hide-row');
      }
    }
  }

  function onPrintClick(): void {
    if (printWithOptionsObj.checked) {
      let printOptions: ScheduleModel = {
        height: heightObj.value as string,
        width: widthObj.value as string,
        selectedDate: selectedDateObj.value as Date
      };
      scheduleObj.print(printOptions);
    } else {
      scheduleObj.print();
    }
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent cssClass='print' width='100%' height='650px' id='schedule' ref={t => scheduleObj = t}
            selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }}>
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
                    <CheckBoxComponent labelPosition="Before" label="Print with options" ref={t => printWithOptionsObj = t} change={onChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr className="e-height-row e-hide-row">
                <td>
                  <div>
                    <DropDownListComponent id="heightElement" placeholder="Height" floatLabelType="Always" ref={t => heightObj = t} value={'auto'} dataSource={printHeightAndWidthData}>
                    </DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr className="e-width-row e-hide-row">
                <td>
                  <div>
                    <DropDownListComponent id="widthElement" placeholder="Width" floatLabelType="Always" ref={t => widthObj = t} value={'auto'} dataSource={printHeightAndWidthData}>
                    </DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr className="e-selected-date-row e-hide-row">
                <td>
                  <div>
                    <DatePickerComponent id="selectedDateElement" placeholder="Selected date" floatLabelType="Always" ref={t => selectedDateObj = t} value={new Date(2021, 0, 10)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <div>
                    <ButtonComponent iconCss="e-icons e-print" cssClass="e-print-btn" onClick={onPrintClick.bind(this)}>Print</ButtonComponent>
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