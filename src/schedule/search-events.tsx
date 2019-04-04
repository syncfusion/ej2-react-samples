import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, EJ2Instance,
  Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './search-events.css';
import { Query, DataManager, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import * as dataSource from './datasource.json';

/**
 * Sample for searching appointments
 */

export class SearchEvents extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], (dataSource as any).scheduleData, null, true) as Object[];

  private globalSearch(args: KeyboardEvent) {
    let searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(this.scheduleObj.getEvents(null, null, true)).executeQuery(new Query().
        search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            this.showSearchEvents('show', e.result);
          } else {
            this.showSearchEvents('hide');
          }
        });
    } else {
      this.showSearchEvents('hide');
    }
  }

  private searchOnclick(): void {
    let searchObj: { [key: string]: any }[] = [];
    let startDate: Date;
    let endDate: Date;
    let formElements: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.event-search .search-field'));
    formElements.forEach((node: HTMLInputElement) => {
      if (node.value && node.value !== '') {
        let fieldOperator: string = 'contains';
        let predicateCondition: string = 'or';
        let fieldValue: string | Date = node.value;
        let matchCase: boolean = true;
        if (node.classList.contains('e-datepicker')) {
          fieldOperator = node.classList.contains('e-start-time') ? 'greaterthanorequal' : 'lessthanorequal';
          predicateCondition = 'and';
          let fieldInstance: DatePicker = ((node as any) as EJ2Instance).ej2_instances[0] as DatePicker;
          fieldValue = fieldInstance.value;
          if (node.classList.contains('e-start-time')) {
            startDate = new Date(+fieldValue);
          }
          if (node.classList.contains('e-end-time')) {
            let date: Date = new Date(+fieldInstance.value);
            fieldValue = new Date(date.setDate(date.getDate() + 1));
            endDate = fieldValue;
          }
          matchCase = false;
        }
        searchObj.push({
          field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
          matchcase: matchCase
        });
      }
    });
    if (searchObj.length > 0) {
      let filterCondition: { [key: string]: any } = searchObj[0];
      let predicate: Predicate = new Predicate(
        filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
      for (let i: number = 1; i < searchObj.length; i++) {
        predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
      }
      let result: Object[] = new DataManager(this.scheduleObj.getEvents(startDate, endDate, true)).
        executeLocal(new Query().where(predicate));
      this.showSearchEvents('show', result);
    } else {
      this.showSearchEvents('hide');
    }
  }

  private clearOnClick(): void {
    document.getElementById('schedule').style.display = 'block';
    (document.getElementById('form-search') as HTMLFormElement).reset();
    this.showSearchEvents('hide');
  }

  private showSearchEvents(type: string, data?: Object): void {
    if (type === 'show') {
      if (document.getElementById('grid').classList.contains('e-grid')) {
        let gridObj: GridComponent = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as GridComponent;
        gridObj.dataSource = data;
        gridObj.dataBind();
      } else {
        let gridObj: GridComponent = new GridComponent({
          dataSource: data,
          height: 505,
          width: 'auto',
          columns: [
            { field: 'Subject', headerText: 'Subject', width: 120 },
            { field: 'Location', headerText: 'Location', width: 120 },
            { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
            { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
          ]
        });
        gridObj.appendTo(document.querySelector('#grid') as HTMLElement);
        this.scheduleObj.element.style.display = 'none';
      }
    } else {
      let gridObj: Object[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
      if (gridObj && gridObj.length > 0 && !(gridObj[0] as GridComponent).isDestroyed) {
        (gridObj[0] as GridComponent).destroy();
      }
      this.scheduleObj.element.style.display = 'block';
    }
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <div className='col-md-12'>
              <ScheduleComponent id='schedule' cssClass='resource' width='100%' height='650px' selectedDate={new Date(2019, 0, 10)}
                ref={schedule => this.scheduleObj = schedule}
                eventSettings={{
                  dataSource: this.data,
                }} >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
              </ScheduleComponent>
              <div id="grid"></div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 property-section property-customization'>
          <div className="property-panel-section">
            <p className="property-panel-header header-customization" style={{ width: '100%' }}>Search by all event fields</p>
            <div className="property-panel-content">
              <input className="e-input" type="text" placeholder="Enter the Search text" onKeyUp={this.globalSearch.bind(this)} />
            </div>
            <form className="event-search" id="form-search">
              <p className="property-panel-header header-customization" style={{ width: '100%' }}>Search by specific event fields</p>
              <table id="property-specific" style={{ width: '100%' }}>
                <tbody>
                  <tr className="row">
                    <td className="property-panel-content" colSpan={2}>
                      <input type="text" className="e-input search-field" id="searchEventName" data-name="Subject" placeholder="Subject" />
                    </td>
                  </tr>
                  <tr className="row" style={{ height: '45px' }}>
                    <td className="property-panel-content" colSpan={2}>
                      <input type="text" className="e-input search-field" id="searchEventLocation" data-name="Location"
                        placeholder="Location" />
                    </td>
                  </tr>
                  <tr className="row" style={{ height: '45px' }}>
                    <td className="property-panel-content" colSpan={2}>
                      <DatePickerComponent className="search-field e-start-time" value={null} data-name="StartTime" showClearButton={false}
                        placeholder="Start Time"></DatePickerComponent>
                    </td>
                  </tr>
                  <tr className="row" style={{ height: '45px' }}>
                    <td className="property-panel-content" colSpan={2}>
                      <DatePickerComponent className="search-field e-end-time" value={null} data-name="EndTime" showClearButton={false}
                        placeholder="End Time"></DatePickerComponent>
                    </td>
                  </tr>
                  <tr className="row" style={{ height: '45px' }}>
                    <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                      <ButtonComponent title='Search' type='button' onClick={this.searchOnclick.bind(this)}>Search</ButtonComponent>
                    </td>
                    <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                      <ButtonComponent title='Clear' type='button' onClick={this.clearOnClick.bind(this)}>Clear</ButtonComponent>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <div id="action-description">
          <p>This example showcases the search results of Scheduler appointments in a grid. When the user provides the
        search string on appropriate fields, the resulting event collection based on the search criteria will be
        displayed in a Grid.</p>
        </div>
        <div id="description">
          <p>In this example, the search text value is compared with the event field values of Scheduler DataSource and then
        the filtered resultant event data collection is assigned to the DataSource of Grid.</p>
        </div>
      </div>
    );
  }
}