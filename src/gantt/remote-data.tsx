import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';

export class RemoteData extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskId',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    dependency: 'Predecessor',
    child: 'SubTasks'
  };
  public projectStartDate = new Date('02/24/2019');
  public projectEndDate = new Date('06/10/2019');
  public gridLines: any = 'Both';
  public timelineSettings: any = {
    timelineUnitSize: 50,
    topTier: {
      unit: 'Month',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
      formatter: (date: Date) => {
        let month: number = date.getMonth();
        if (month === 1) {
          return '';
        } else {
          let presentDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          let start: Date = new Date(presentDate.getFullYear(), 0, 0);
          let diff: number = Number(presentDate) - Number(start);
          let oneDay: number = 1000 * 60 * 60 * 24;
          let day: number = Math.floor(diff / oneDay);
          return 'day ' + (day - 59);
        }
      },
    },
  };
  public dataSource: DataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/GanttData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='RemoteData' dataSource={this.dataSource} allowSorting={true} dateFormat={'MMM dd, y'}
            treeColumnIndex={0} allowSelection={true} highlightWeekends={false} includeWeekend={true}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} gridLines={this.gridLines} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings}
            height='410px'>
            <ColumnsDirective>
			  <ColumnDirective field='TaskId' visible={false}></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Task Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Cereal_growth_staging_scales"
              target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the way of binding data to Gantt chart with remote service. The Gantt chart data source
              is bound to remote data using DataManager. This sample data helps to visualize the various phases of Barley
        harvesting.</p>
        </div>

        <div id="description">
          <p>
            The <code>dataSource</code> property in Gantt chart can be assigned with the instance of
        <code>DataManager</code> to bind remote data.
                        The DataManager, which will act as an interface between the service endpoint and the Gantt chart, will require
                        the below minimal information to interact with service endpoint properly.
        <li><code>DataManager->url</code> - Defines the service endpoint to fetch data</li>
            <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, ODataAdaptor is used for remote
            binding.</li>
            Adaptor is responsible for processing response and request from/to the service endpoint.
        <code>@syncfusion/ej2-data</code>
            package provides some predefined adaptors which are designed to interact with particular service endpoints. They
            are,
        <li><code>UrlAdaptor</code> - Use this to interact any remote services. This is the base adaptor for all remote
            based adaptors.</li>
            <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
            <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
            <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
            <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
            In this demo, remote data is bound by assigning service data as an instance of <code>DataManager</code> to the
        <code>dataSource</code>
            property.
            More information on the data binding can be found in this documentation section.
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection feature, inject the
            <code>Selection</code> module.
          </p>
        </div>
      </div>
    )
  }
}
