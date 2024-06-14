import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GanttComponent, Inject, Filter, ColumnsDirective, ColumnDirective, Selection, VirtualScroll, Sort } from '@syncfusion/ej2-react-gantt';
import { virtualData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const LoadingAnimation = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let filterType: { [key: string]: Object }[] = [
    { text: 'Shimmer', value: 'Shimmer' },
    { text: 'Spinner', value: 'Spinner' }
  ];
  const onChange = (sel: ChangeEventArgs): void => {
    let type: any = sel.value.toString();
    if (type === "Shimmer") {
      ganttInstance.current.loadingIndicator.indicatorType = "Shimmer";
      ganttInstance.current.enableVirtualMaskRow = true;
      ganttInstance.current.refresh();
    } else {
      ganttInstance.current.loadingIndicator.indicatorType = "Spinner";
      ganttInstance.current.enableVirtualMaskRow = false;
      ganttInstance.current.refresh();
    }
  }
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
  const loadingIndicator: any = {
    indicatorType: 'Shimmer'
  };
  const labelSettings: any = {
    taskLabel: 'Progress'
  };
  return (
    <div className='control-pane'>
      <div className='col-md-9'>
        <GanttComponent id='Filtering' ref={ganttInstance} dataSource={virtualData} treeColumnIndex={1} labelSettings={labelSettings}
          allowSelection={true} allowFiltering={true} allowSorting={true} highlightWeekends={true} enableVirtualization={true}
          taskFields={taskFields} splitterSettings={splitterSettings} height='450px' loadingIndicator = {loadingIndicator}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' />
            <ColumnDirective field='TaskName' headerText='Task Name' />
            <ColumnDirective field='StartDate' />
            <ColumnDirective field='Duration' />
            <ColumnDirective field='Progress' />
          </ColumnsDirective>
          <Inject services={[Filter, Selection, VirtualScroll, Sort]} />
        </GanttComponent>
      </div>
      <div className='col-md-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%',paddingLeft:0 }}>
                <div style={{ paddingTop: '10px',paddingLeft:0 }}> Indicator Type </div>
              </td>
              <td style={{ width: '70%' }}>
                <div>
                  <DropDownListComponent width="110px" id="seltype" change={onChange.bind(this)}
                    dataSource={filterType} value="Shimmer" />
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id="action-description">
        <p>This sample shows the loading indicator while initial rendering, refreshing and all gantt action. In this sample, you can change the loading indicators from the properties panel.</p>
      </div>

      <div id="description">
          <p>
            The Gantt has an option to show a loading indicator in-between the time of fetching the data and binding it to the gantt during initial rendering, refreshing or 
            while performing action like sorting, filtering and more.
          </p>
          <p>
            The Gantt support the following loading indicator types
          </p>
          <ul>
            <li><code>Shimmer</code></li>
            <li><code>Spinner</code></li>
          </ul>
          <p>
            Use the loading indicator by setting the <code>loadingIndicator.indicatorType</code> property as Spinner or Shimmer. The default value of the indicatorType is Spinner.
          </p>
          <p>
            By default <code>enableVirtualMaskRow</code> is set to true which renders Shimmer during virtual scrolling.
          </p>
      </div>
    </div>
  )
}
export default LoadingAnimation;
