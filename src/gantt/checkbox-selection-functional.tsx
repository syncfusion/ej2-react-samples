import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, LabelSettingsModel, SplitterSettingsModel, SelectionSettingsModel, ColumnsDirective, ColumnDirective, Toolbar, Filter, ToolbarItem } from '@syncfusion/ej2-react-gantt';
import { hierarchyCheckboxData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './checkbox-selection.css';

const GanttCheckBoxSelection = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let dropdownModeList = useRef<DropDownListComponent>(null);
  const dropdownModeListData: { [key: string]: Object }[] = [
    { id: 'self', type: 'self' },
    { id: 'hierarchy', type: 'hierarchy' },
    { id: 'filteredHierarchy', type: 'filteredHierarchy' }
  ];

  const onChange = (e: ChangeEventArgs): void => {
    let mode: any = e.value.toString();
    ganttInstance.current.hierarchyCheckboxMode = mode;
    ganttInstance.current.refresh();
  }
  
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  const toolbar: ToolbarItem[] = ["Search"];
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  const selectionSettings: SelectionSettingsModel = {
    mode: 'Row',
    type: 'Multiple',
    enableToggle: false
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-9' style={{ paddingLeft: "0px" }}>
          <GanttComponent id='GanttCheckBoxSelection' ref={ganttInstance} dataSource={hierarchyCheckboxData} highlightWeekends={true}
            treeColumnIndex={2} allowSelection={true} allowFiltering={true} splitterSettings={splitterSettings} selectionSettings={selectionSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='650px' hierarchyCheckboxMode='hierarchy' taskbarHeight={25} rowHeight={46} enableHover={true}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate} toolbar={toolbar}>
              <ColumnsDirective>
                <ColumnDirective field="CheckBox" headerText='' showCheckbox={true} width='70px' allowFiltering={false} />
                <ColumnDirective field="TaskID" visible={false} />
                <ColumnDirective field="TaskName" headerText="Task Name" allowReordering={false} width='190px'
                />
                <ColumnDirective field="StartDate" headerText="Start Date" width='140px' />
                <ColumnDirective field="Predecessor" headerText="Predecessor" width='190px'
                />
                <ColumnDirective field="Duration" headerText="Duration" allowEditing={false} width='130px' />
                <ColumnDirective field="Progress" headerText="Progress" />
              </ColumnsDirective>
            <Inject services={[Selection, Toolbar, Filter]} />
          </GanttComponent>
        </div>
        <div className='col-lg-3 property-section' style={{ width: '21%' }}>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties">
            <tbody>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>
                    Hierarchy Checkbox Mode
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ width: '100%', paddingRight: '5px' }}>
                  <div style={{ width: '150px' }}>
                    <DropDownListComponent ref={dropdownModeList} id='SelectionModeList' tabIndex={1} dataSource={dropdownModeListData} fields={{ text: 'type', value: 'id' }}
                      change={onChange.bind(this)} value='hierarchy'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates hierarchy checkbox selection in the Gantt Chart using self, hierarchy, and filteredHierarchy selection modes.
        </p>
      </div>

      <div id="description">
        <p>
          The hierarchy checkbox selection feature simplifies parent-child selection management by automatically handling descendant propagation and ancestor state calculations. It supports parent selection, child selection, and indeterminate checkbox states without requiring custom implementation. The hierarchy selection behavior can be configured using the
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/#hierarchycheckboxmode">hierarchyCheckboxMode</a>
          property.
        </p>

        <p>
          The following hierarchy checkbox modes are supported:
        </p>
        <ul>
          <li>
            <code>self</code> - Selecting or deselecting a checkbox affects only the current row. Parent and child records remain unchanged.
          </li>
          <li>
            <code>hierarchy</code> - Selecting a parent record automatically selects all descendant records. Child selection updates the corresponding parent state and displays indeterminate states when applicable.
          </li>
          <li>
            <code>filteredHierarchy</code> - Works similar to <code>hierarchy</code>, but checkbox propagation is applied only to the currently visible records after filtering or searching.
          </li>
        </ul>

        <p style={{ fontWeight: '500' }}>
          Injecting Module:
        </p>

        <p>
          Gantt component features are segregated into individual feature-wise modules. To use hierarchy checkbox selection, inject the
          <code>Selection</code> <code>Filter</code> <code>Toolbar</code> module using the
          <code>Gantt.Inject(Selection, Filter, Toolbar)</code> method.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/selection/selection">selection</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default GanttCheckBoxSelection;
