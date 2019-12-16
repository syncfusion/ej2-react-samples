import * as React from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
export class GanttSelection extends SampleBase {
    constructor() {
        super(...arguments);
        this.dropdownModeListData = [
            { id: 'Row', type: 'Row' },
            { id: 'Cell', type: 'Cell' }
        ];
        this.dropDownTypeListData = [
            { id: 'Single', type: 'Single' },
            { id: 'Multiple', type: 'Multiple' }
        ];
        this.dropdownToggleListData = [
            { id: true, type: 'Enable' },
            { id: false, type: 'Disable' }
        ];
        this.toggleValue = false;
        this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.selectionSettings = {
            mode: 'Row',
            type: 'Single',
            enableToggle: false
        };
        this.projectStartDate = new Date('03/27/2019');
        this.projectEndDate = new Date('07/06/2019');
    }
    perform() {
        let mode = this.dropdownModeList.value;
        let type = this.dropdownTypeList.value;
        let toggle = this.dropdownToggleList.value;
        this.ganttInstance.selectionSettings.mode = mode;
        this.ganttInstance.selectionSettings.type = type;
        this.ganttInstance.selectionSettings.enableToggle = toggle;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='GanttSelection' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1} allowSelection={true} splitterSettings={this.splitterSettings} selectionSettings={this.selectionSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <Inject services={[Selection]}/>
            </GanttComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      Selection Mode
                    </div>
                  </td>
                  <td style={{ width: '70%', paddingright: '5px' }}>
                    <div>
                      <DropDownListComponent ref={DropDownList => this.dropdownModeList = DropDownList} id='SelectionModeList' tabIndex={1} dataSource={this.dropdownModeListData} fields={{ text: 'type', value: 'id' }} value='Row'></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      Selection Type
                    </div>
                  </td>
                  <td style={{ width: '70%', paddingright: '5px' }}>
                    <div>
                      <DropDownListComponent ref={DropDownList => this.dropdownTypeList = DropDownList} id='SelectionTypeList' tabIndex={1} dataSource={this.dropDownTypeListData} fields={{ text: 'type', value: 'id' }} value='Single'></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      Toggle Selection
                    </div>
                  </td>
                  <td style={{ width: '70%', paddingright: '5px' }}>
                    <div>
                      <DropDownListComponent ref={DropDownList => this.dropdownToggleList = DropDownList} id='SelectionTypeList' tabIndex={1} dataSource={this.dropdownToggleListData} fields={{ text: 'type', value: 'id' }} value={this.toggleValue}></DropDownListComponent>
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
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
        <p> The selection feature enables you to highlight row or cell. It can be enabled by setting
        <code>allowSelection</code> to <code>true</code>.</p>
        </div>

        <div id="description">
        <p>
        The Gantt component supports two types of selection that can be set by using the <code>selectionSettings.type</code> property.
        They are:
    </p>
    <ul>
            <li><code>Single</code> - Sets a single value by default and allows only selection of a single row or a cell.</li>
            <li><code>Multiple</code> - Allows you to select multiple rows or cells. To perform the multi-selection, press and hold the CTRL key and click the desired rows or cells.</li>
    </ul>
    <p>
        The Gantt component supports three types of selection modes that can be set by using the <code>selectionSettings.mode</code> property.
        They are:
    </p>
    <ul>
            <li><code>Row</code> - Allows you to select only rows, and the row value is set by default.</li>
            <li><code>Cell</code> - Allows you to select only cells.</li>
            <li><code>Both</code> - Allows you to select rows and cells at the same time..</li>
    </ul>
    <p>
        The Gantt component supports toggle selection that can be set by using the <code>selectionSettings.enableToggle</code> property.
    </p>
        </div>
      </div>);
    }
}
