import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, LabelSettingsModel, SplitterSettingsModel, SelectionSettingsModel, ColumnsDirective, ColumnDirective, Filter, Toolbar, ToolbarItem } from '@syncfusion/ej2-react-gantt';
import { hierarchyCheckboxData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import './checkbox-selection.css';

export class GanttCheckBoxSelection extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private dropdownModeList: DropDownListComponent;
  public dropdownModeListData: { [key: string]: Object }[] = [
    { id: 'self', type: 'self' },
    { id: 'hierarchy', type: 'hierarchy' },
    { id: 'filteredHierarchy', type: 'filteredHierarchy' }
  ];

  public onChange = (e: ChangeEventArgs): void => {
    let mode: any = e.value.toString();
    this.ganttInstance.hierarchyCheckboxMode = mode;
    this.ganttInstance.refresh();
  }

  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  public selectionSettings: SelectionSettingsModel = {
    mode: 'Row',
    type: 'Multiple',
    enableToggle: false
  };
  public toolbar: ToolbarItem[] = ["Search"];
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='GanttCheckBoxSelection' ref={gantt => this.ganttInstance = gantt} dataSource={hierarchyCheckboxData} highlightWeekends={true}
              treeColumnIndex={2} allowSelection={true} allowFiltering={true} enableHover={true} splitterSettings={this.splitterSettings} selectionSettings={this.selectionSettings}
              taskFields={this.taskFields} toolbar={this.toolbar} labelSettings={this.labelSettings} height='650px' hierarchyCheckboxMode='hierarchy' taskbarHeight={25} rowHeight={46}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
                <ColumnsDirective>
                  <ColumnDirective field="CheckBox" headerText='' showCheckbox={true} width='70px' allowFiltering={false}/>
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
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
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
                        <DropDownListComponent ref={DropDownList => this.dropdownModeList = DropDownList} id='SelectionModeList' tabIndex={1} dataSource={this.dropdownModeListData} fields={{ text: 'type', value: 'id' }}
                          change={this.onChange.bind(this)} value='hierarchy' width='125px'></DropDownListComponent>
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
            <code>Selection</code> <code>Filter</code> <code>Toolbar</code>module using the
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
}
