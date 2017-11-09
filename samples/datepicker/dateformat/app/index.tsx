import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { DatePickerComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';

let dateValue: Date = new Date();
export class Dateformat extends SampleBase<{}, {}> {
  private datepickerInstance: DatePickerComponent;
  private dropElement: HTMLSelectElement;
  /*Apply selected format to the component*/
  public onValueChange(): void {
    let dateformat: string = this.dropElement.value;
    this.datepickerInstance.format = dateformat;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-9'>
            <div className='datepicker-control-section'>
              <DatePickerComponent format='dd-MMM-yy' ref={calendar => this.datepickerInstance = calendar} value={dateValue} ></DatePickerComponent>
            </div>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>
                      Date Format
                    </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <select id='ddl' name='ddl' onChange={this.onValueChange.bind(this)} className='form-control' style={{ padding: '6px' }} ref={d => this.dropElement = d}>
                        <option value="dd-MMM-yy">dd-MMM-yy</option>
                        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                        <option value="dd-MMMM">dd-MMMM</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Dateformat />, document.getElementById('sample'));