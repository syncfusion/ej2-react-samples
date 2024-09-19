import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, Edit, Filter, Toolbar, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const KeyboardInteraction = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
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
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
  };
  const toolbar: any = ['Search'];
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/24/2024');
  const projectEndDate: Date = new Date('07/06/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-9'>
          <GanttComponent id='KeyboardInteraction' dataSource={projectNewData} highlightWeekends={true}
            treeColumnIndex={1} allowSelection={true} allowKeyboard={true}
            toolbar={toolbar} editSettings={editSettings} splitterSettings={splitterSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='410px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers, Edit, Filter, Toolbar]} />
          </GanttComponent>
        </div>
        <div className='col-lg-3 property-section' style={{ height: '450px', overflow: 'auto' }}>
          <PropertyPane title='Event Trace'>
            <table id="property" title="Properties">
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <b>Keys</b>
                </td>
                <td style={{ width: '70%' }}>
                  <b>Description</b>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Alt + J</b>
                </td>
                <td style={{ width: '50%' }}>
                    Focus Gantt Component
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Tab / Shift + Tab</b>
                </td>
                <td style={{ width: '50%' }}>
                    Focus the next or previous element
                </td>
            </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Home</b>
                </td>
                <td style={{ width: '50%' }}>
                  First Row Selection
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>End</b>
                </td>
                <td style={{ width: '50%' }}>
                  Last Row Selection
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>DownArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                  Move Row Selection Down
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>UpArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                  Move Row Selection Up
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>LeftArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                    Move Cell Selection Left
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>RightArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                    Move Cell Selection Right
                </td>
            </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + UpArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                  Collapse All
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + DownArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                  Expand All
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + Shift + UpArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                  Collapse Row
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + Shift + DownArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                  Expand Row
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Enter</b>
                </td>
                <td style={{ width: '50%' }}>
                  Save Request
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Esc</b>
                </td>
                <td style={{ width: '50%' }}>
                  Cancel Request
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Insert</b>
                </td>
                <td style={{ width: '50%' }}>
                  Add Record
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + Insert</b>
                </td>
                <td style={{ width: '50%' }}>
                  Add Record By Dialog
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + F2</b>
                </td>
                <td style={{ width: '50%' }}>
                  Edit Record By Dialog
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Delete</b>
                </td>
                <td style={{ width: '50%' }}>
                  Delete Row
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Ctrl + Shift + F</b>
                </td>
                <td style={{ width: '50%' }}>
                  Focus Search TextBox
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                  <b>Shift + F5</b>
                </td>
                <td style={{ width: '50%' }}>
                  Focus Task
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Shift + DownArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                    Move Cell Selection Down
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Shift + UpArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                    Move Cell Selection Up
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Shift + LeftArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                    Move Cell Selection Left
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Shift + RightArrow</b>
                </td>
                <td style={{ width: '50%' }}>
                    Move Cell Selection Right
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Ctrl + Z</b>
                </td>
                <td style={{ width: '50%' }}>
                    Undo Last Action
                </td>
            </tr>
            <tr style={{ height: '50px' }}>
                <td style={{ width: '50%' }}>
                    <b>Ctrl + Y</b>
                </td>
                <td style={{ width: '50%' }}>
                    Redo Last Action
                </td>
            </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This demo showcases the keyboard shortcuts applicable on Gantt and also lists out in below descriptions, and this demo also explains how those applicable shortcuts interacts with Gantt actions.</p>
      </div>
      <div id="description">
        <p>All the Gantt actions can be controlled via keyboard keys and are availed using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowkeyboard">allowKeyboard</a> property, which is set to true by default. The applicable key combinations and their relative functionalities are listed below.</p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use a toolbar, inject
          the <code>Toolbar</code> module using the <code>Gantt.Inject(Toolbar)</code> method.To use a edit, inject the
          <code>Edit</code> module using the <code>Gantt.Inject(Edit)</code> method.To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
        <p>
          <table>
            <tr>
              <td><b>Keys</b></td>
              <td><b>Description</b></td>
            </tr>
            <tr>
              <td><code>Alt + J</code></td>
              <td>Focus Gantt Component</td>
            </tr>
            <tr>
                <td><code>Tab / Shift + Tab</code></td>
                <td>Focus the next or previous element</td>
            </tr>
            <tr>
              <td><code>Home</code></td>
              <td>First Row Selection</td>
            </tr>
            <tr>
              <td><code>End</code></td>
              <td>Last Row Selection</td>
            </tr>
            <tr>
              <td><code>DownArrow</code></td>
              <td>Move Row Selection Down</td>
            </tr>
            <tr>
              <td><code>UpArrow</code></td>
              <td>Move Row Selection Up</td>
            </tr>
            <tr>
              <td><code>LeftArrow</code></td>
              <td>Move Cell Selection Left</td>
            </tr>
            <tr>
                <td><code>RightArrow</code></td>
                <td>Move Cell Selection Right</td>
            </tr>
            <tr>
              <td><code>Ctrl + UpArrow</code></td>
              <td>Collapse All</td>
            </tr>
            <tr>
              <td><code>Ctrl + DownArrow</code></td>
              <td>Expand All</td>
            </tr>
            <tr>
              <td><code>Ctrl + Shift + UpArrow</code></td>
              <td>Collapse Row</td>
            </tr>
            <tr>
              <td><code>Ctrl + Shift + DownArrow</code></td>
              <td>Expand Row</td>
            </tr>
            <tr>
              <td><code>Enter</code></td>
              <td>Save Request</td>
            </tr>
            <tr>
              <td><code>Esc</code></td>
              <td>Cancel Request</td>
            </tr>
            <tr>
              <td><code>Insert</code></td>
              <td>Add Record</td>
            </tr>
            <tr>
              <td><code>Ctrl + Insert</code></td>
              <td>Add Record By Dialog</td>
            </tr>
            <tr>
              <td><code>Ctrl + F2</code></td>
              <td>Edit Record By Dialog</td>
            </tr>
            <tr>
              <td><code>Delete</code></td>
              <td>Delete Row</td>
            </tr>
            <tr>
              <td><code>Ctrl + Shift + F</code></td>
              <td>Focus Search Textbox</td>
            </tr>
            <tr>
              <td><code>Shift + F5</code></td>
              <td>Focus Task</td>
            </tr>
            <tr>
              <td><code>Shift + DownArrow</code></td>
              <td>Move Cell Selection Down</td>
            </tr>
            <tr>
                <td><code>Shift + UpArrow</code></td>
                <td>Move Cell Selection Up</td>
            </tr>
            <tr>
                <td><code>Shift + LeftArrow</code></td>
                <td>Move Cell Selection Left</td>
            </tr>
            <tr>
                <td><code>Shift + RightArrow</code></td>
                <td>Move Cell Selection Right</td>
            </tr>
            <tr>
                <td><code>Ctrl + Z</code></td>
                <td>Undo Last Action</td>
            </tr>
            <tr>
              <td><code>Ctrl + Y</code></td>
              <td>Redo Last Action</td>
            </tr>
          </table>
        </p>
      </div>
    </div>
  )
};
export default KeyboardInteraction;
