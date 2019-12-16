import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './calendar-export-import.css';
import { extend } from '@syncfusion/ej2-base';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule ICS Export and Import sample
 */
export class CalendarImportExport extends SampleBase {
    constructor(props) {
        super(props);
        this.multiple = false;
        this.showFileList = false;
        this.allowedExtensions = '.ics';
        this.data = extend([], dataSource.scheduleData, null, true);
    }
    onClick() {
        this.scheduleObj.exportToICalendar();
    }
    onSelect(args) {
        this.scheduleObj.importICalendar(args.event.target.files[0]);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule} selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: this.data }}>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month'/>
                <ViewDirective option='Agenda'/>
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '50%' }}>
                    <div className='col-md-12' style={{ paddingTop: '8px' }}>Export as iCalendar</div>
                  </td>
                  <td style={{ width: '50%' }}>
                    <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                      <ButtonComponent id='ics-export' title='Export' onClick={this.onClick.bind(this)}>Export</ButtonComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '50%' }}>
                    <div className='col-md-12' style={{ paddingTop: '8px' }}>Import iCalendar file</div>
                  </td>
                  <td style={{ width: '50%' }}>
                    <UploaderComponent id='fileUpload' type='file' allowedExtensions={this.allowedExtensions} cssClass='calendar-import' buttons={{ browse: 'Choose file' }} multiple={this.multiple} showFileList={this.showFileList} selected={this.onSelect.bind(this)}></UploaderComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>
            This example showcases how to export the Scheduler events to a calendar (.ics) file, as well as how to import events from an .ics file (downloaded from any of the calendars like Google or Outlook) into our Scheduler.
            </p>
        </div>
        <div id="description">
          <p>
            In this example, the Scheduler events can be exported to a calendar (.ics) file by making use of the <code>exportToICalendar</code> public method. By default,
            the calendar is exported with a file name <code>Calendar.ics</code>.
            To change this file name on export, pass the custom string value as <code>fileName</code> to get the file downloaded with this provided name.
            The events from external calendars can also be imported into Scheduler by making use of the <code>importICalendar</code> method. This method accepts the blob object of an .ics file to be imported as a mandatory argument.
            </p>
          <p>
            <strong>Module Injection</strong>
          </p>
          <p>
            To start using the export and import ICS functionality in Scheduler, we need to inject <code>ICalendarExport</code> and <code>ICalendarImport</code> modules into the services.
            </p>
        </div>
      </div>);
    }
}
