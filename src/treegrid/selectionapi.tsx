import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
{/* custom code start */}
const SAMPLE_CSS = `
    .datalink {
      text-align: right;
      padding: 10px 0;
    }
    @media screen and (max-width: 480px) {
      .datalink {
        padding-bottom: 0;
        padding-top: 15px;
    }`;
{/* custom code end */}
export class SelectionAPI extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;
  public numericObj: NumericTextBoxComponent;
  public numericObj2: NumericTextBoxComponent;

  private btnClick(): void {
    let startRow: number = this.numericObj.value;
    let toRow: number = this.numericObj2.value;
    let rows: number[] = [];
    for ( let i: number = startRow > toRow ? toRow : startRow ; i <= (startRow > toRow ? startRow : toRow) ; i++ ) {
        rows.push(i);
    }
    this.treegridObj.selectRows(rows);
  }

  private btnClick2(): void {
    this.treegridObj.clearSelection();
  }

  render() {
    return (
      <div className='control-pane'>
            {/* custom code start */}
         <style>
          {SAMPLE_CSS}
        </style>
              {/* custom code end */}
        <div className='control-section'>
          <div className = 'col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true} 
              allowSelection={true} ref={treegrid=> this.treegridObj = treegrid} pageSettings={{ pageSize: 10 }}
              selectionSettings={{ type:'Multiple'}}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='100' type='date' format='yMd' textAlign='Right' />
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
                <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
              </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div><b>Select Rows</b></div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '20%' }}>
                      <div style={{ paddingTop: '8px' }}>
                        Start
                      </div>
                    </td>
                    <td style={{ width: '80%', paddingRight: '10px' }}>
                      <div id='numericbox' style={{ minWidth: '95px' }}>
                        <NumericTextBoxComponent id='start' format='##' min={0} max={11} ref={numeric => this.numericObj = numeric}
                          width='95px'>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '20%' }}>
                      <div style={{ paddingTop: '8px' }}> To </div>
                    </td>
                    <td style={{ width: '80%', paddingRight: '10px' }}>
                      <div id='numericbox' style={{ minWidth: '95px' }}>
                        <NumericTextBoxComponent id='to' format='##' min={0} max={11} ref={numeric => this.numericObj2 = numeric}
                          width='95px'>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className='col-md-6'>
                        <ButtonComponent onClick={this.btnClick.bind(this)}>Select Row</ButtonComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="col-md-12"><b>Clear Selection</b></div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="col-md-6" style={{ paddingBottom: '10px' }}>
                        <ButtonComponent onClick={this.btnClick2.bind(this)}>Clear Selection</ButtonComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
          </PropertyPane>
        </div>
      </div>

<div id="description">
    <p>
        Selection provides an interactive support to highlight the row or cell that you select. 
        Selection can be done through a simple Mouse down or Keyboard interaction. 
        To enable selection, set <code>
        allowSelection
        </code> as true.
    </p>
    <p>Tree Grid supports two types of selection which can be set using
        <code>selectionSettings-&gt;type
        </code> property. They are,</p>
    <ul>
        <li><code>single</code> - Enabled by default. Allows the user to select single row/cell at a time.</li>
        <li><code>multiple</code> - Allows the user to select more than one row/cell at a time.</li>
    </ul>
    <p>Also, supports three modes of selection which can be set using
        <code>selectionSettings-&gt;mode
        </code> property. They are,
    </p>
    <ul>
        <li><code>Row</code> - Enabled by default. Enables row selection in Tree Grid.</li>
        <li><code>Cell</code> - Enables cell selection in Tree Grid.</li>
        <li><code>Both</code> - Enables both row and cell selection in Tree Grid. 
        Clicking any cell will select both the row and cell simultaneously.
        </li>
    </ul>
    <p>The Tree Grid supports two types of cell selection mode that can be set by using the  
            <code>
            selectionSettings-&gt;cellSelectionMode
            </code> property. They are,</p>
        <ul>
            <li><code>Flow</code> - The Flow value is set by default. The range of cells are selected between the start index
                and end index that includes in between cells of rows.</li>
            <li><code>Box</code> - Range of cells are selected from the start and 
                end column indexes that includes in between cells of rows within the range.</li>
        </ul>
    <p>To perform the multi-selection, hold <strong>CTRL</strong> key and click the desired rows/cells. 
    To select range of rows/cells, hold <strong>SHIFT</strong> key and click the rows/cells.</p>
    <p>While using the Tree Grid in a touch device environment, there is an option for multi-selection 
        through single tap on the row and it will show a popup with the multi-selection symbol. 
        Tap the icon to enable multi-selection in a single tap.
    </p>
    <p>In this demo, enter the values in the Start and To text box to select range of rows.
        And click the Clear Selection button to deselect the rows.
    </p>
    <p>
      More information on the selection configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/selection/selection">documentation section</a>.
    </p>
    </div>
      </div>
    )
  }
}
