import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Resize, Print,
  DragAndDrop, Inject, ScheduleModel
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

export class PrintSchedule extends SampleBase<{}, {}> {
  public scheduleObj: ScheduleComponent;
  public printWithOptionsObj: CheckBoxComponent;
  public heightObj: DropDownListComponent;
  public widthObj: DropDownListComponent;
  public selectedDateObj: DatePickerComponent;
  private data: Object[] = extend([], (dataSource as any).scheduleData, null, true) as Object[];
  private printHeightAndWidthData: string[] = ['auto', '100%', '500px'];

  private onChange(args: ChangeEventArgs): void {
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

  private onPrintClick(): void {
    if (this.printWithOptionsObj.checked) {
      let printOptions: ScheduleModel = {
        height: this.heightObj.value as string,
        width: this.widthObj.value as string,
        selectedDate: this.selectedDateObj.value as Date
      };
      this.scheduleObj.print(printOptions);
    } else {
      this.scheduleObj.print();
    }
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='print' width='100%' height='650px' id='schedule' ref={t => this.scheduleObj = t}
              selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: this.data }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, Print]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table'>
              <tbody>
                <tr>
                  <td style={{ height: '50px' }}>
                    <div>
                      <CheckBoxComponent labelPosition="Before" label="Print with options" ref={t => this.printWithOptionsObj = t} change={this.onChange.bind(this)} />
                    </div>
                  </td>
                </tr>
                <tr className="e-height-row e-hide-row">
                  <td>
                    <div>
                      <DropDownListComponent id="heightElement" width="auto" placeholder="Height" floatLabelType="Always" ref={t => this.heightObj = t} value={'auto'} dataSource={this.printHeightAndWidthData}>
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr className="e-width-row e-hide-row">
                  <td>
                    <div>
                      <DropDownListComponent id="widthElement" width="auto" placeholder="Width" floatLabelType="Always" ref={t => this.widthObj = t} value={'auto'} dataSource={this.printHeightAndWidthData}>
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr className="e-selected-date-row e-hide-row">
                  <td>
                    <div>
                      <DatePickerComponent id="selectedDateElement" width="auto" placeholder="Selected date" floatLabelType="Always" ref={t => this.selectedDateObj = t} value={new Date(2019, 0, 10)} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <div>
                      <ButtonComponent iconCss="e-icons e-icon-schedule-print" cssClass="e-print-btn" onClick={this.onPrintClick.bind(this)}>Print</ButtonComponent>
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
          <p>In this example, the Scheduler element is Printed by making use of the public method
            <code>print</code>.</p>
          <p>
          <p>
            Also, we can print the schedule based on the custom rendering by passing the <code>ScheduleModel</code> in the
            <code>print</code> method.
            In the above demo, we have demonstrated the <code>print</code> method with the below properties of the
            <code>ScheduleModel</code>.
          </p>
          <ul>
            <li>height</li>
            <li>width</li>
            <li>selectedDate</li>
          </ul>
          <strong>Module Injection</strong>
          </p>
          <p>To start using Print functionality in Scheduler, we need to inject <code>Print</code> module into the services.
          </p>
        </div>
      </div>
    );
  }
}