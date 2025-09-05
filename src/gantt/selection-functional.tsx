import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import './selection.css'
const GanttSelection = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let dropdownModeList = useRef<DropDownListComponent>(null);
  let checkBoxHover = useRef<CheckBoxComponent>(null);
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
    parentID: 'ParentId'
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
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  const onclick =()=>{
    if (checkBoxHover.current.checked) {
            ganttInstance.current.enableHover = true;
        } else {
             ganttInstance.current.enableHover = false;
        }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-9' style={{paddingLeft:"0px"}}>
          <GanttComponent id='GanttSelection' ref={ganttInstance} dataSource={projectNewData} highlightWeekends={true}
            treeColumnIndex={1} allowSelection={true} splitterSettings={splitterSettings} selectionSettings={selectionSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46} enableHover={true}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <Inject services={[Selection]} /> 
          </GanttComponent>
        </div>
        <div className='col-lg-3 property-section' style={{width: '21%'}}>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties">
            <tbody>
              <tr>
                <td>
                  <div id="hovercheckbox" style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
                  <label htmlFor='hover'style={{fontWeight: 400, marginBottom: '0px'}} >Enable Hover</label>
                  <CheckBoxComponent ref={checkBoxHover} id="hover" className="checkbox" checked={true} style={{padding: '0px'}} onClick={onclick} />
                  </div>
                </td>
            </tr>
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
          <p> This sample showcases the selection feature in the Gantt Chart. It allows highlighting rows or cells.</p>
        </div>

        <div id="description">
          <p>
              In this demo sample, the selection functionality in the Gantt Chart. The selection type can be configured using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#type">selectionSettings.type</a> property:
          </p>
          <ul>
              <li><code>Single</code> - Allows selection of a single row or cell.</li>
              <li><code>Multiple</code> - Enables selection of multiple rows or cells using Ctrl + click.</li>
          </ul>
          <p>
              The selection mode is set using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#mode">selectionSettings.mode</a> property:
              They are:
          </p>
          <ul>
                  <li><code>Row</code> - Allows selection of entire rows.</li>
                  <li><code>Cell</code> - Allows selection of individual cells.</li>
                  <li><code>Both</code> - Enables selection of both rows and cells simultaneously.</li>
          </ul>
          <p>
             Toggle selection is supported through the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#enabletoggle">selectionSettings.enableToggle</a> property, which allows deselecting a selected item by clicking it again.
              The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enablehover">enableHover</a> highlights the current row, header cell, and timeline cell on mouse hover, improving visual feedback during interaction.
          </p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/selection/selection">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default GanttSelection;
