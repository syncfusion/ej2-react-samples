import * as React from 'react';
import { useEffect, useRef } from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GanttComponent, TaskFieldsModel, Inject, Filter, ColumnsDirective, ColumnDirective, Selection, VirtualScroll, Sort, LabelSettingsModel, SplitterSettingsModel, LoadingIndicatorModel } from '@syncfusion/ej2-react-gantt';
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
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'parentID'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  const loadingIndicator: LoadingIndicatorModel = {
    indicatorType: 'Shimmer'
  };
  const labelSettings: LabelSettingsModel = {
    taskLabel: 'Progress'
  };
  const projectEndDate: Date = new Date('09/21/2025');
  return (
    <div className='control-pane'>
      <div className='col-md-9'>
        <GanttComponent id='LoadingAnimation' ref={ganttInstance} dataSource={virtualData} treeColumnIndex={1} labelSettings={labelSettings}
          allowSelection={true} allowFiltering={true} allowSorting={true} highlightWeekends={true} enableVirtualization={true} projectEndDate={projectEndDate}
          taskFields={taskFields} splitterSettings={splitterSettings} height='650px' taskbarHeight={25} rowHeight={46} loadingIndicator={loadingIndicator}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width={100} />
            <ColumnDirective field='TaskName' headerText='Task Name' width="300px" />
            <ColumnDirective field='StartDate' width={170} />
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
                <td style={{ width: '50%', paddingLeft: 0 }}>
                  <div style={{ paddingTop: '10px', paddingLeft: 0 }}>Indicator Type </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <DropDownListComponent width="113px" id="seltype" change={onChange}
                      dataSource={filterType} value="Shimmer" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the loading animation support in the Gantt Chart. Use the property panel to switch between the <code>Shimmer</code> and <code>Spinner</code> loading indicators displayed during data loading, refreshing, virtual scrolling, and other Gantt actions.</p>
      </div>

      <div id="description">
        <p>
          This example demonstrates the loading indicator functionality in the Gantt Chart. Loading indicators are displayed during initial rendering, data refreshing, virtual scrolling, and while performing operations such as sorting and filtering.
        </p>
        <p>
          The Gantt Chart supports the following loading indicator types:
        </p>
        <ul>
          <li><code>Shimmer</code> - Displays placeholder rows that mimic the layout of the content while data is loading.</li>
          <li><code>Spinner</code> - Displays a loading spinner until the requested operation is completed</li>
        </ul>
        <p>Use the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/loadingIndicatorModel/#indicatortype">Indicator Type</a></code> option in the property panel to switch between <code>Shimmer</code> and <code>Spinner</code> loading indicators. This behavior can also be configured using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/loadingIndicatorModel/#indicatortype">loadingIndicator.indicatorType</a> property.</p>
        
        <p>
          When <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualmaskrow">enableVirtualMaskRow</a></code> is enabled, shimmer placeholders are displayed during virtual scrolling to provide a smoother loading experience when working with large datasets
        </p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use virtualscroll, Filter, sorting and selection features, we need to inject <code>VirtualScroll</code>, <code>Filter</code>, <code>Sort</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/loading-animation">loading animation</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default LoadingAnimation;
