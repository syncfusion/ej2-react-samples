import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, VirtualScroll, ColumnsDirective, ColumnDirective} from "@syncfusion/ej2-react-gantt";
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export class RemoteData extends SampleBase<{}, {}> {
  public dataSource: DataManager | null = null;
  public taskFields: any = {
    id: "TaskId",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    parentID: "ParentId",
    dependency: "Predecessor",
  };
  public rowMark: string = "1,000 Rows";
  public dropdownData = [
    { Text: "1,000 Rows", Value: "1000" },
    { Text: "2,500 Rows", Value: "2500" },
    { Text: "5,000 Rows", Value: "5000" },
  ];
 
  public dropdownFields = { text: "Text", value: "Value" };
  public recordCount: string = "1000";
  public startLoadTime?: Date;
  public endLoadTime?: Date;
  public loadTime: string = "";
  public shouldCalculateLoadTime: boolean = true;
  public componentDidMount(): void {
    this.loadGanttData();
  }
  public onDropdownChange(event: any): void {
    this.recordCount = event.value;
    this.shouldCalculateLoadTime = true;
    this.loadGanttData(); // Reload data source
  }
  public startTime: number;
  public endTime: number;
  public loadGanttData(): void {
    this.dataSource = new DataManager({
      url: `https://services.syncfusion.com/react/production/api/GanttWebApiRemoteData?count=${this.recordCount}`,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    });
    this.startLoadTime = new Date();
  }
  public projectStartDate = new Date("12/28/2024");
  public projectEndDate = new Date("03/19/2025");
  public gridLines: any = "Horizontal";
  public timelineSettings: any = {
    timelineUnitSize: 50,
    topTier: {
      unit: "Week",
      format: "MMM dd, y",
    },
    bottomTier: {
      unit: "Day",
      format: "dd",
    },
  };
 
  public labelSettings: any = {
    leftLabel: "TaskName",
    taskLabel: "Progress",
  };
  public splitterSettings: any={
    columnIndex: 2
  };
  public onDataBound(): void {
    if (this.shouldCalculateLoadTime) {
      this.endLoadTime = new Date();
      this.calculateLoadTime();
      this.shouldCalculateLoadTime = false; // Reset the flag
    }
  };
  public calculateLoadTime(): void {
    if (this.startLoadTime && this.endLoadTime) {
      const difference = this.endLoadTime.getTime() - this.startLoadTime.getTime();
      this.loadTime = (difference/1000).toFixed(2);
    }
  };
  render() {
    return (
    <div className='control-pane'>
      <div className='control-section'>
        <div
          style={{display: "flex",}}>
         <div style={{ width: "130px",paddingBottom: "10px" }}>
            <DropDownListComponent
              dataSource={this.dropdownData}
              fields={this.dropdownFields}
              value={this.recordCount}
              change={this.onDropdownChange}
              placeholder="1,000 Rows"
            />
          </div>
          <span style={{ paddingLeft: "20px", fontSize: "15px", marginTop: "5px"}}>
          <b>Data initial load time:</b> {this.loadTime} sec
          </span>
        </div>
          <GanttComponent id='RemoteData' dataSource={this.dataSource} allowSorting={true} dateFormat={'MMM dd, y'}
          enableVirtualization={true} enableTimelineVirtualization={true}
            treeColumnIndex={1} allowSelection={true} highlightWeekends={false} includeWeekend={true} splitterSettings={this.splitterSettings}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} gridLines={this.gridLines} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings}
            dataBound={this.onDataBound.bind(this)} height='650px' rowHeight={46} taskbarHeight={25}>
            <ColumnsDirective>
              <ColumnDirective field='TaskId'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText="Project Activity" width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText="Planned Start Date"></ColumnDirective>
              <ColumnDirective field='Duration' headerText="Duration"></ColumnDirective>
              <ColumnDirective field='Progress' headerText="Completion (%)"></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, VirtualScroll]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Cereal_growth_staging_scales"
              target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the way of binding data to Gantt Chart with remote service. The Gantt Chart data source
              is bound to remote data using DataManager. This sample data helps to visualize the various phases of Barley
        harvesting.</p>
        </div>

        <div id="description">
          <p>
            The <code>dataSource</code> property in Gantt Chart can be assigned with the instance of
        <code>DataManager</code> to bind remote data.
                        The DataManager, which will act as an interface between the service endpoint and the Gantt Chart, will require
                        the below minimal information to interact with service endpoint properly.
        <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data</li>
            <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, ODataAdaptor is used for remote
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
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#remote-data">documentation section</a>.</p>
        </div>
      </div>
    )
  }
}