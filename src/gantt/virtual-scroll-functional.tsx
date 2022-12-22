import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnDirective, ColumnsDirective, VirtualScroll } from '@syncfusion/ej2-react-gantt';
import { virtualData } from './data';
import { updateSampleSection } from '../common/sample-base';

function Virtualscroll() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'parentID'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const labelSettings: any = {
    taskLabel: 'Progress'
  };

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='SplitTasks' dataSource={virtualData} treeColumnIndex={1} labelSettings={labelSettings}
          allowSelection={true} highlightWeekends={true} enableVirtualization={true}
          taskFields={taskFields} splitterSettings={splitterSettings} height='450px'>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' />
            <ColumnDirective field='TaskName' headerText='Task Name' />
            <ColumnDirective field='StartDate' />
            <ColumnDirective field='Duration' />
            <ColumnDirective field='Progress' />
          </ColumnsDirective>
          <Inject services={[Selection, VirtualScroll]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Virtual Scroll support in the Gantt Chart. This feature allows users to load a large amount of data effectively.
          It also reduces the DOM element's weight by virtually updating DOM during the vertical scroll.</p>
      </div>
      <div id="description">
        <p>Virtualization support is used to render large number tasks in Gantt with effective performance. In this mode all the tasks are
          fetched from data source initially, then some of the records are rendered in DOM which are compact to the current viewport area.
          While scrolling tasks are updated in DOM as per current viewport position. This mode can be enabled by setting
          <code>enableVirtualization</code> property as true. </p>
        <p>By default during Virtual scroll Shimmer effect is enabled you can disable this by changing <code>enableVirtualMaskRow</code> to false</p>
      </div>
    </div>
  )
}

export default Virtualscroll;