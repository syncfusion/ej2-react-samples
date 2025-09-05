import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import './selection.css'

export class GanttSelection extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private dropdownModeList: DropDownListComponent;
  private checkBoxHover :CheckBoxComponent;
  private dropdownTypeList: DropDownListComponent;
  private dropdownToggleList: DropDownListComponent;
  public dropdownModeListData: { [key: string]: Object }[] = [
    { id: 'Row', type: 'Row' },
    { id: 'Cell', type: 'Cell' }
  ];
  public dropDownTypeListData: { [key: string]: Object }[] = [
    { id: 'Single', type: 'Single' },
    { id: 'Multiple', type: 'Multiple' }
  ];
  public dropdownToggleListData: { [key: string]: Object }[] = [
    { id: true, type: 'Enable' },
    { id: false, type: 'Disable' }
  ];
  public toggleValue: boolean = false;
  private perform(): void {
    let mode: any = this.dropdownModeList.value;
        let type: any = this.dropdownTypeList.value;
        let toggle: boolean = this.dropdownToggleList.value as boolean;
        this.ganttInstance.selectionSettings.mode = mode;
        this.ganttInstance.selectionSettings.type = type;
        this.ganttInstance.selectionSettings.enableToggle = toggle;
  }
  
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public selectionSettings: any = {
    mode: 'Row',
    type: 'Single',
    enableToggle: false
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  public onclick =()=>{
    if (this.checkBoxHover.checked) {
            this.ganttInstance.enableHover = true;
        } else {
             this.ganttInstance.enableHover = false;
        }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='GanttSelection' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData} highlightWeekends={true}
              treeColumnIndex={1} allowSelection={true} splitterSettings={this.splitterSettings} selectionSettings={this.selectionSettings}
              taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <Inject services={[Selection]} />
            </GanttComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <tbody>
                <tr>
                    <td>
                      <div id="hovercheckbox" style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
                        <label htmlFor='hover'style={{fontWeight: 400, marginBottom: '0px'}} >Enable Hover</label>
                        <CheckBoxComponent ref={check=>this.checkBoxHover=check} id="hover" className="checkbox" checked={true} style={{padding: '0px'}} onClick={this.onclick} />
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
                      <DropDownListComponent ref={DropDownList => this.dropdownModeList = DropDownList} id='SelectionModeList' tabIndex={1} dataSource={this.dropdownModeListData} fields={{ text: 'type', value: 'id' }}
                        value='Row' width='125px'></DropDownListComponent>
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
                      <DropDownListComponent ref={DropDownList => this.dropdownTypeList = DropDownList} id='SelectionTypeList' tabIndex={1} dataSource={this.dropDownTypeListData} fields={{ text: 'type', value: 'id' }}
                        value='Single' width='125px'></DropDownListComponent>
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
                      <DropDownListComponent ref={DropDownList => this.dropdownToggleList = DropDownList} id='SelectionTypeList' tabIndex={1} dataSource={this.dropdownToggleListData} fields={{ text: 'type', value: 'id' }}
                        value={this.toggleValue} width='125px'></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      <ButtonComponent onClick={this.perform.bind(this)}> Update </ButtonComponent>
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
}
