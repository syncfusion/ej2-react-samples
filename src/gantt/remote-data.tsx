import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, VirtualScroll, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel, GridLine, TimelineSettingsModel } from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export class RemoteData extends SampleBase<{}, { loadTime: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { loadTime: "" };
  }
  private ganttInstance: GanttComponent;
  public recordCount: string = "1000";
  public dataSource: DataManager =  new DataManager({
      url: `https://services.syncfusion.com/react/production/api/GanttWebApiRemoteData?count=${this.recordCount}`,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    });
  public taskFields: TaskFieldsModel = {
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
  public startLoadTime?: Date;
  public endLoadTime?: Date;
  public loadTime: string = "";
  public shouldCalculateLoadTime: boolean = true;
  public onDropdownChange = (event: any): void => {
    this.recordCount = event.value;
    this.shouldCalculateLoadTime = true;
    this.loadGanttData(); // Reload data source
  }
  public startTime: number;
  public endTime: number;
  public loadGanttData = (): void => {
    this.ganttInstance.dataSource = new DataManager({
      url: `https://services.syncfusion.com/react/production/api/GanttWebApiRemoteData?count=${this.recordCount}`,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    });
    this.startLoadTime = new Date();
  }
  componentDidMount(): void {
    this.startLoadTime = new Date();
  }
  public projectStartDate = new Date("12/28/2024");
  public projectEndDate = new Date("03/19/2025");
  public gridLines: GridLine = "Horizontal";
  public timelineSettings: TimelineSettingsModel = {
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

  public labelSettings: LabelSettingsModel = {
    rightLabel: "TaskName",
    taskLabel: "Progress",
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  public onDataBound = (): void => {
    if (this.shouldCalculateLoadTime) {
      this.endLoadTime = new Date();
      this.calculateLoadTime();
      this.shouldCalculateLoadTime = false; // Reset the flag
    }
  };
  public calculateLoadTime = (): void => {
    if (this.startLoadTime && this.endLoadTime) {
      const difference = this.endLoadTime.getTime() - this.startLoadTime.getTime();
      this.setState({
        loadTime: (difference / 1000).toFixed(2),
      });
    }
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div
            style={{ display: "flex", }}>
            <div style={{ width: "130px", paddingBottom: "10px" }}>
              <DropDownListComponent
                dataSource={this.dropdownData}
                fields={this.dropdownFields}
                value={this.recordCount}
                change={this.onDropdownChange}
                placeholder="1,000 Rows"
              />
            </div>
            <span style={{ paddingLeft: "20px", fontSize: "15px", marginTop: "5px" }}>
              <b>Data initial load time:</b> {this.state.loadTime} sec
            </span>
          </div>
          <GanttComponent id='RemoteData' ref={gantt => this.ganttInstance = gantt} dataSource={this.dataSource} allowSorting={true} dateFormat={'MMM dd, y'}
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
          <p>This sample demonstrates binding remote data to the Gantt Chart using <code>DataManager</code>. The data visualizes the various stages of the product growth cycle and supports efficient navigation of large datasets through row and timeline virtualization.</p>
        </div>

        <div id="description">
          <p>
            The <code>dataSource</code> property in Gantt Chart can be assigned with the instance of
            <code>DataManager</code> to bind remote data.
            The DataManager, which will act as an interface between the service endpoint and the Gantt Chart, will require
            the below minimal information to interact with service endpoint properly.
          </p>
          <ul>
            <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data</li>
            <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, ODataAdaptor is used for remote binding.</li>
          </ul>
          <p>
            Adaptor is responsible for processing response and request from/to the service endpoint. The <code>@syncfusion/ej2-data</code> package provides some predefined adaptors which are designed to interact with particular service endpoints. They are:
          </p>
          <ul>
            <li><code>UrlAdaptor</code> - Use this to interact any remote services. This is the base adaptor for all remote based adaptors.</li>
            <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
            <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
            <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
            <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
          </ul>
          <p>
            In this demo, remote data is bound by assigning service data as an instance of <code>DataManager</code> to the <code>dataSource</code> property. More information on the data binding can be found in this documentation section.
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a virtual scroll and selection feature, we need to inject 
            the <code>VirtualScroll</code> and <code>Selection</code> into the <code>Inject Services</code> section.
          </p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#remote-data">data binding</a> documentation section.</p>
          <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}