import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { ItemModel } from '@syncfusion/ej2-react-navigations';
import {
  ScheduleComponent, ViewDirective, Week, Resize, ExcelExport, ExportOptions, ActionEventArgs, DragAndDrop, Inject, ViewsDirective
} from '@syncfusion/ej2-react-schedule';
import './excel-export.css';
import * as dataSource from './datasource.json';

/**
 *  Schedule header customization sample
 */

export class ExportToExcel extends SampleBase<{}, {}> {
  public scheduleObj: ScheduleComponent;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];

  private onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      let exportItem: ItemModel = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
        text: 'Excel Export', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
      };
      args.items.push(exportItem);
    }
  }

  private onExportClick(): void {
    let exportValues: ExportOptions = {
      fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location']
    };
    this.scheduleObj.exportToExcel(exportValues);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='excel-export' width='100%' height='650px' id='schedule' ref={t => this.scheduleObj = t}
              selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: this.data }}
              actionBegin={this.onActionBegin.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Week' />
              </ViewsDirective>
              <Inject services={[Week, Resize, DragAndDrop, ExcelExport]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This example demonstrates how to export the Scheduler events to an Excel file format at client-side.</p>
        </div>
        <div id='description'>
          <p>
            In this example, the Scheduler events data are exported to an Excel file by making use of the public method
            <code>exportToExcel</code>. By default, the whole event collection bound to the Scheduler gets exported as an excel file. To
            export only specific events of Scheduler, you need to pass the custom data collection as a parameter to the
            <code>exportToExcel</code> method. This method accepts the export options as its arguments such as fileName, exportType,
            fields, customData, and includeOccurrences. The fileName denotes the name to be given for the exported file and
            the <code>exportType</code> allows you to set the format of the excel file to be exported either as .xlsx or .csv. The custom
            or specific field collection of event dataSource to be exported can be provided through <code>fields</code> option and the
            custom data collection can be exported by passing them through the <code>customData</code> option. There also exists option
            to export individual instances of the recurring events to an excel file, by setting true or false to the
            <code>includeOccurrences</code> option, denoting either to include or exclude the occurrences as separate instances on an
            exported excel file.
          </p>
          <p>
            <strong>Module Injection</strong>
          </p>
          <p>To start using Excel exporting functionality in Scheduler, we need to inject <code>ExcelExport</code> module into the services.
          </p>
        </div>
      </div>
    );
  }
}