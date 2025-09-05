import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect,useState,useRef  } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective,VirtualScroll  } from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const RemoteData = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const recordCount = useRef<string>("1000");
  const dataSource: DataManager = new DataManager({
    url: `https://services.syncfusion.com/react/production/api/GanttWebApiRemoteData?count=${recordCount.current}`,
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  const [loadTime, setLoadTime] = useState<string>("");
  const [startLoadTime, setStartLoadTime] = useState<Date | null>(new Date());
  const shouldCalculateLoadTime = useRef<Boolean>(true);
  const dropdownData = [
    { Text: "1,000 Rows", Value: "1000" },
    { Text: "2,500 Rows", Value: "2500" },
    { Text: "5,000 Rows", Value: "5000" },
  ];
  const dropdownFields = { text: "Text", value: "Value" };
  const taskFields: any = {
    id: "TaskId",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    parentID: "ParentId",
    dependency: "Predecessor",
  };
  const projectStartDate = new Date("12/29/2024");
  const projectEndDate = new Date("03/19/2025");
  const gridLines: any = "Horizontal";
  const timelineSettings: any = {
    timelineUnitSize: 50,
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
      format: 'dd'
    },
  };
  
  const labelSettings: any = {
    rightLabel: "TaskName",
    taskLabel: "Progress"
  };
  const loadGanttData = () => {
    setStartLoadTime(new Date());
    shouldCalculateLoadTime.current = true;
  };
  const splitterSettings: any={
    columnIndex: 2
  };
  const onDropdownChange = (e: any) => {
    recordCount.current = e.value;
    loadGanttData();
  };
  const onDataBound = () => {
    if (shouldCalculateLoadTime.current && startLoadTime) {
      shouldCalculateLoadTime.current = false;
      const endLoadTime = new Date();
      const diff = endLoadTime.getTime() - startLoadTime.getTime();
      setLoadTime((diff/1000).toFixed(2));  
    }
  };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div
          style={{display: "flex",}}>
         <div style={{ width: "130px",paddingBottom: "10px" }}>
            <DropDownListComponent
              dataSource={dropdownData}
              fields={dropdownFields}
              value={recordCount}
              change={onDropdownChange}
              placeholder="1,000 Rows"
            />
          </div>
          <span style={{ paddingLeft: "20px", fontSize: "15px", marginTop: "5px"}}>
          <b>Data initial load time:</b> {loadTime} sec
          </span>
        </div>
        <GanttComponent id='RemoteData' dataSource={dataSource} allowSorting={true} dateFormat={'MMM dd, y'}
          treeColumnIndex={1} allowSelection={true} highlightWeekends={false} includeWeekend={true} splitterSettings={splitterSettings}
          allowUnscheduledTasks={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} enableVirtualization= {true} enableTimelineVirtualization={true}
          taskFields={taskFields} gridLines={gridLines} timelineSettings={timelineSettings} labelSettings={labelSettings}
          dataBound={onDataBound} height='650px' rowHeight={46} taskbarHeight={25} >
          <ColumnsDirective>
            <ColumnDirective field='TaskId'></ColumnDirective>
            <ColumnDirective field='TaskName' headerText="Project Activity" width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate' headerText="Planned Start Date"></ColumnDirective>
            <ColumnDirective field="Duration" headerText="Duration"></ColumnDirective>
            <ColumnDirective field="Progress"headerText="Completion (%)"></ColumnDirective>
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

export default RemoteData;
