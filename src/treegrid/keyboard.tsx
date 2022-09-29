import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Edit, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


export class KeyBoard extends SampleBase<{}, {}> {

  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
  public editparams: any = { params: { format: 'n' } };
  public validationRule: Object = { required: true};
  public validationRule1: Object = { date: true};
  public validationRule2: Object = { required: true, number: true};

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='900' allowSelection={true} selectionSettings={{ type: 'Multiple' }}
              editSettings={this.editSettings}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' isPrimaryKey={true} width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='240'
                  validationRules={this.validationRule}></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' format='yMd' textAlign='Right' editType='datepickeredit'
                  validationRules={this.validationRule1} width='105' />
                <ColumnDirective field='duration' headerText='Duration' width='120' textAlign='Right' editType='numericedit' 
                  edit={this.editparams} validationRules={this.validationRule2} />
                <ColumnDirective field='progress' headerText='Progress' width='130' textAlign='Right' editType='numericedit'
                  edit={this.editparams} />
              </ColumnsDirective>
              <Inject services={[Edit]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <b>Keys</b>
                </td>
                <td style={{ width:'70%' }}>
                  <b>Description</b>
                 </td>
              </tr>
              <tr style={{ height:'50px' }}>
                <td style={{ width: '30%' }}>
                  <b>F2</b>
                </td>
                <td style={{ width: '30%' }}>
                    Row edit
                </td>
              </tr>
              <tr style={{ height:'50px' }}>
                <td style={{ width: '30%' }}>
                  <b>Enter</b>
                </td>
                <td style={{ width: '30%' }}>
                  Save request
                </td>
              </tr>
         <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Delete</b>
            </td>
            <td style={{ width: '30%' }}>
                Delete row
            </td>
         </tr>
         <tr style={{ height:'50px' }}>
             <td style={{ width: '30%' }}>
                <b>Ctrl + Shift + UpArrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Collapse Child Grid
            </td>
         </tr>
         <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Ctrl + Shift + DownArrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Expand Child Grid
            </td>
         </tr>
         <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Ctrl + UpArrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Collapse All
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Ctrl + DownArrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Expand All
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Ctrl + Home</b>
            </td>
            <td style={{ width: '30%' }}>
                First row selection
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Ctrl + End</b>
            </td>
            <td style={{ width: '30%' }}>
                Last row selection
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Home</b>
            </td>
            <td style={{ width: '30%' }}>
                First cell selection
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>End</b>
            </td>
            <td style={{ width: '30%' }}>
                Last cell selection
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Up Arrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Move row selection up
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Down Arrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Move row selection down
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Right Arrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Move Cell selection right
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Left Arrow</b>
            </td>
            <td style={{ width: '30%' }}>
                Move Cell selection left
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Shift + Down/Up</b>
            </td>
            <td style={{ width: '30%' }}>
                Multiple row Selection
            </td>
        </tr>
        <tr style={{ height:'50px' }}>
            <td style={{ width: '30%' }}>
                <b>Alt + j</b>
            </td>
            <td style={{ width: '30%' }}>
                Focus Tree Grid element
            </td>
        </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
          <p>This demo showcases the keyboard shortcuts applicable on Tree Grid and also lists out in below description, how those
            applicable shortcuts interacts with Tree Grid actions.</p>
        </div>
        <div id='description'>
          <p>All the Tree Grid actions can be controlled via keyboard keys and is availed by using <code>allowKeyboardInteraction</code>
              property which is set to true by default. The applicable key combinations and its relative functionalities are listed below,
          </p>
          <p>
            <table>
                <tr><td><b>Keys</b></td><td><b>Description</b></td></tr>
                <tr><td><code>Ctrl + Down Arrow</code></td><td>ExpandAll</td></tr>
                <tr><td><code>Ctrl + Up Arrow</code></td><td>CollapseAll</td></tr>
                <tr><td><code>F2</code></td><td>Edit</td></tr>
                <tr><td><code>ESC</code></td><td>Cancel</td></tr>
                <tr><td><code>Enter</code></td><td>Save</td></tr>
                <tr><td><code>Insert</code></td><td>Add</td></tr>
                <tr><td><code>Delete</code></td><td>Delete</td></tr>
                <tr><td><code>Ctrl + Home</code></td><td>First row selection</td></tr>
                <tr><td><code>Ctrl + End</code></td><td>Last row selection</td></tr>
                <tr><td><code>Home</code></td><td>First cell selection</td></tr>
                <tr><td><code>End</code></td><td>Last cell selection</td></tr>
                <tr><td><code>Up Arrow</code></td><td>Move row selection up</td></tr>
                <tr><td><code>Down Arrow</code></td><td>Move row selection down</td></tr>
                <tr><td><code>Up Arrow</code></td><td>Move Cell selection up</td></tr>
                <tr><td><code>Down Arrow</code></td><td>Move Cell selection down</td></tr>
                <tr><td><code>Right Arrow</code></td><td>Move Cell selection right</td></tr>
                <tr><td><code>Left Arrow</code></td><td>Move Cell selection left</td></tr>
                <tr><td><code>Shift + Down/Up</code></td><td>Multiple row Selection</td></tr>
                <tr><td style={{ width:'70%' }}><code>Shift + Right/Left/Down/Up</code></td><td>Multiple Cell Selection</td></tr>
                <tr><td><code>Ctrl + Shift + Up Arrow</code></td><td>Collapse selected parent row</td></tr>
                <tr><td><code>Ctrl + Shift + Down Arrow</code></td><td>Expand selected parent row</td></tr>
                <tr><td><code>Alt + j</code></td><td>Focus Tree Grid element</td></tr>
                <tr><td><code>Tab</code></td><td>Go to next cell for editing</td></tr>
                <tr><td><code>Shift + Tab</code></td><td>Go to previous cell for editing</td></tr>
                <tr><td><code>PageDown</code></td><td>Go to Next page</td></tr>
                <tr><td><code>PageUp</code></td><td>Go to Previous page</td></tr>
                <tr><td><code>Ctrl + Alt + PageUp</code></td><td>Go to First page</td></tr>
                <tr><td><code>Ctrl + Alt + PageDown</code></td><td>Go to Last page</td></tr>
                <tr><td><code>Alt + PageUp</code></td><td>Go to Next pager</td></tr>
                <tr><td><code>Alt + PageDown</code></td><td>Go to last pager</td></tr>
            </table>
          </p>
          <p>
            More information on the gridLines configuration can be found in this documentation section.
          </p>
        </div>
      </div>
    )
  }
}
