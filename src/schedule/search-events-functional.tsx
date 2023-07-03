import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, EJ2Instance, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './search-events.css';
import { Query, DataManager, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import * as dataSource from './datasource.json';

/**
 * Sample for searching appointments
 */

const SearchEvents = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const [display, setDisplay] = useState<string>('block');
  let scheduleObj = useRef<ScheduleComponent>(null);
  let gridElement = useRef<HTMLDivElement>(null);
  let formObj = useRef<HTMLFormElement>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];

  const globalSearch = (args: KeyboardEvent) => {
    let searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(scheduleObj.current.getEvents(null, null, true)).executeQuery(new Query().search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            showSearchEvents('show', e.result);
          } else {
            showSearchEvents('hide');
          }
        });
    } else {
      showSearchEvents('hide');
    }
  }

  const searchOnclick = (): void => {
    let searchObj: { [key: string]: any }[] = [];
    let startDate: Date;
    let endDate: Date;
    let formElements: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.event-search .search-field'));
    formElements.forEach((node: HTMLInputElement) => {
      let fieldOperator: string;
      let predicateCondition: string;
      let fieldValue: string | Date;
      let fieldInstance: DatePicker;
      if (node.value && node.value !== '' && !node.classList.contains('e-datepicker')) {
        fieldOperator = 'contains';
        predicateCondition = 'or';
        fieldValue = node.value;
        searchObj.push({
          field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
          matchcase: true
        });
      }
      if (node.classList.contains('e-datepicker') && (((node as any) as EJ2Instance).ej2_instances[0] as DatePicker).value) {
        fieldInstance = ((node as any) as EJ2Instance).ej2_instances[0] as DatePicker;
        fieldValue = fieldInstance.value;
        if (node.classList.contains('e-start-time')) {
          fieldOperator = 'greaterthanorequal';
          predicateCondition = 'and';
          startDate = new Date(+fieldValue);
        } else {
          fieldOperator = 'lessthanorequal';
          predicateCondition = 'and';
          let date: Date = new Date(+fieldInstance.value);
          fieldValue = new Date(date.setDate(date.getDate() + 1));
          endDate = fieldValue;
        }
        searchObj.push({
          field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
          matchcase: false
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
      let result: Record<string, any>[] = new DataManager(scheduleObj.current.getEvents(startDate, endDate, true)).executeLocal(new Query().where(predicate));
      showSearchEvents('show', result);
    } else {
      showSearchEvents('hide');
    }
  }

  const clearOnClick = (): void => {
    document.getElementById('schedule').style.display = 'block';
    (document.getElementById('form-search') as HTMLFormElement).reset();
    showSearchEvents('hide');
  }

  const showSearchEvents = (type: string, data?: Record<string, any>): void => {
    if (type === 'show') {
      if (gridElement.current.classList.contains('e-grid')) {
        let gridObj: GridComponent = ((gridElement.current as unknown) as EJ2Instance).ej2_instances[0] as GridComponent;
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
        gridObj.appendTo(gridElement.current);
        setDisplay('none');
      }
    } else {
      let gridObj: Record<string, any>[] = ((gridElement.current as unknown) as EJ2Instance).ej2_instances;
      if (gridObj && gridObj.length > 0 && !(gridObj[0] as GridComponent).isDestroyed) {
        (gridObj[0] as GridComponent).destroy();
      }
      setDisplay('block');
    }
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <div className='col-md-12'>
            <ScheduleComponent id='schedule' style={{display: display}} cssClass='resource' width='100%' height='650px' selectedDate={new Date(2021, 0, 10)} ref={scheduleObj} eventSettings={{ dataSource: data }} >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
            <div id="grid" ref={gridElement}></div>
          </div>
        </div>
      </div>
      <div className='col-lg-3 property-section property-customization'>
        <div className="property-panel-section">
          <p className="property-panel-header header-customization" style={{ width: '100%' }}>Search by all event fields</p>
          <div className="property-panel-content">
            <input className="e-input" type="text" placeholder="Enter the Search text" onKeyUp={globalSearch.bind(this)} />
          </div>
          <form className="event-search" id="form-search" ref={formObj}>
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
                    <input type="text" className="e-input search-field" id="searchEventLocation" data-name="Location" placeholder="Location" />
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="property-panel-content" colSpan={2}>
                    <DatePickerComponent className="search-field e-start-time" value={null} data-name="StartTime" showClearButton={false} placeholder="Start Time"></DatePickerComponent>
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="property-panel-content" colSpan={2}>
                    <DatePickerComponent className="search-field e-end-time" value={null} data-name="EndTime" showClearButton={false} placeholder="End Time"></DatePickerComponent>
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                    <ButtonComponent title='Search' type='button' onClick={searchOnclick.bind(this)}>Search</ButtonComponent>
                  </td>
                  <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                    <ButtonComponent title='Clear' type='button' onClick={clearOnClick.bind(this)}>Clear</ButtonComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div id="action-description">
        <p>
          This example showcases the search results of Scheduler appointments in a grid. When the user provides the
          search string on appropriate fields, the resulting event collection based on the search criteria will be
          displayed in a Grid.
        </p>
      </div>
      <div id="description">
        <p>
          In this example, the search text value is compared with the event field values of Scheduler DataSource and then 
          the filtered resultant event data collection is assigned to the DataSource of Grid.
        </p>
      </div>
    </div>
  );
}
export default SearchEvents;