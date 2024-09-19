import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
const GanttSelection = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let dropdownModeList = useRef<DropDownListComponent>(null);
  let dropdownTypeList = useRef<DropDownListComponent>(null);
  let dropdownToggleList = useRef<DropDownListComponent>(null);
  const dropdownModeListData: { [key: string]: Object }[] = [
    { id: 'Row', type: 'Row' },
    { id: 'Cell', type: 'Cell' }
  ];
  const dropDownTypeListData: { [key: string]: Object }[] = [
    { id: 'Single', type: 'Single' },
    { id: 'Multiple', type: 'Multiple' }
  ];
  const dropdownToggleListData: { [key: string]: Object }[] = [
    { id: true, type: 'Enable' },
    { id: false, type: 'Disable' }
  ];
  const toggleValue: boolean = false;
  const perform = (): void => {
    ganttInstance.current.selectionSettings.mode = dropdownModeList.current.value as any;
    ganttInstance.current.selectionSettings.type = dropdownTypeList.current.value as any;
    ganttInstance.current.selectionSettings.enableToggle = dropdownToggleList.current.value as boolean;
  }
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const selectionSettings: any = {
    mode: 'Row',
    type: 'Single',
    enableToggle: false
  };
  const projectStartDate: Date = new Date('03/27/2024');
  const projectEndDate: Date = new Date('07/06/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-9'>
          <GanttComponent id='GanttSelection' ref={ganttInstance} dataSource={projectNewData} highlightWeekends={true}
            treeColumnIndex={1} allowSelection={true} splitterSettings={splitterSettings} selectionSettings={selectionSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='410px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <Inject services={[Selection]} />
          </GanttComponent>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>
                    Selection Mode
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%', paddingRight: '5px' }}>
                  <div style={{ width: '150px' }}>
                    <DropDownListComponent ref={dropdownModeList} id='SelectionModeList' tabIndex={1} dataSource={dropdownModeListData} fields={{ text: 'type', value: 'id' }}
                      value='Row'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>
                    Selection Type
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%', paddingRight: '5px' }}>
                  <div style={{ width: '150px' }}>
                    <DropDownListComponent ref={dropdownTypeList} id='SelectionTypeList' tabIndex={1} dataSource={dropDownTypeListData} fields={{ text: 'type', value: 'id' }}
                      value='Single'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>
                    Toggle Selection
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%', paddingRight: '5px' }}>
                  <div style={{ width: '150px' }}>
                    <DropDownListComponent ref={dropdownToggleList} id='SelectionTypeList' tabIndex={1} dataSource={dropdownToggleListData} fields={{ text: 'type', value: 'id' }}
                      value={toggleValue}></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    <ButtonComponent onClick={perform.bind(this)}> Update </ButtonComponent>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p> The selection feature enables you to highlight row or cell. It can be enabled by setting
        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection">allowSelection</a> to <code>true</code>.</p>
      </div>

      <div id="description">
        <p>
          The Gantt component supports two types of selection that can be set by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#type">selectionSettings.type</a> property.
          They are:
        </p>
        <ul>
          <li><code>Single</code> - Sets a single value by default and allows only selection of a single row or a cell.</li>
          <li><code>Multiple</code> - Allows you to select multiple rows or cells. To perform the multi-selection, press and hold the CTRL key and click the desired rows or cells.</li>
        </ul>
        <p>
          The Gantt component supports three types of selection modes that can be set by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#mode">selectionSettings.mode</a> property.
          They are:
        </p>
        <ul>
          <li><code>Row</code> - Allows you to select only rows, and the row value is set by default.</li>
          <li><code>Cell</code> - Allows you to select only cells.</li>
          <li><code>Both</code> - Allows you to select rows and cells at the same time..</li>
        </ul>
        <p>
          The Gantt component supports toggle selection that can be set by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#enabletoggle">selectionSettings.enableToggle</a> property.
        </p>
      </div>
    </div>
  )
}
export default GanttSelection;
