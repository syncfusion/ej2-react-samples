import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, VirtualScroll } from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';

export class LoadOnDemand extends SampleBase<{}, {}> {
  public dataSource: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/react/production/api/GanttLoadOnDemand',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public taskFields: any = {
    id: 'taskId',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    hasChildMapping: 'isParent',
    parentID: 'parentID'
  };
  public projectStartDate: Date = new Date('01/02/2000');
  public projectEndDate: Date = new Date('12/01/2002');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='LoadOnDemand' dataSource={this.dataSource} treeColumnIndex={1}
            taskFields={this.taskFields} enableVirtualization={true} loadChildOnDemand={true} height='460px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='taskId' width='80' headerText='Task ID' ></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='250' allowReordering ={false}></ColumnDirective>
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
        </div>
      </div>
    )
  }
}
