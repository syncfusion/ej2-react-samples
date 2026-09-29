import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, ColumnsDirective, ColumnDirective, VirtualScroll } from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';

const LoadOnDemand = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const dataSource: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/react/production/api/GanttLoadOnDemand',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  const taskFields: TaskFieldsModel = {
    id: 'taskId',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    hasChildMapping: 'isParent',
    parentID: 'parentID'
  };
  const projectStartDate: Date = new Date('01/02/2000');
  const projectEndDate: Date = new Date('12/01/2002');

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='LoadOnDemand' dataSource={dataSource} treeColumnIndex={1}
          taskFields={taskFields} enableVirtualization={true} loadChildOnDemand={true} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='taskId' width='120' headerText='Task ID' ></ColumnDirective>
            <ColumnDirective field='taskName' headerText='Task Name' width='250' allowReordering={false}></ColumnDirective>
            <ColumnDirective field='startDate' headerText='Start Date' allowSorting={false}></ColumnDirective>
            <ColumnDirective field='duration' headerText='Duration' allowEditing={false}></ColumnDirective>
            <ColumnDirective field='progress' headerText='Progress' allowFiltering={false}></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, VirtualScroll]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the load on-demand data binding support in Gantt Chart. It allows users to load parent records alone on load time.
          Child records render on demand during expansion action.</p>
      </div>

      <div id="description">
        <p>
          Load on demand and virtualization support is used to render a large number of tasks in the Gantt Chart with an effective performance.
          And so, in this demo, row virtualization is enabled with remote data binding which has 50,000 records.
        </p>
        <p>
          With the virtualization feature enabled in remote data binding, only the root level records are fetched from the remote server at the initial load time.
          So, need to set the <code>hasChildMapping</code> property of <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#taskfields">taskFields</a> that denotes whichever records have child records and set <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#loadchildondemand">loadChildOnDemand</a> property as false.
        </p>
        <p>
          When expanding the root parent node or scrolling vertically, the corresponding tasks are dynamically fetched from the remote server and then updated in the DOM based on the current viewport position.
        </p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use virtual scroll and selection features, we need to inject <code>VirtualScroll</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#load-child-on-demand">data binding</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default LoadOnDemand;
