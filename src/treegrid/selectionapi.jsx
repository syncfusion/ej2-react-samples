import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class SelectionAPI extends SampleBase {
    btnClick() {
        let startRow = this.numericObj.value;
        let toRow = this.numericObj2.value;
        let rows = [];
        for (let i = startRow; i <= toRow; i++) {
            rows.push(i);
        }
        this.treegridObj.selectRows(rows);
    }
    btnClick2() {
        this.treegridObj.clearSelection();
    }
    render() {
        return (<div className='control-pane'>

        <div className='control-section'>
          <div className='col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' allowSelection='true' ref={treegrid => this.treegridObj = treegrid} pageSettings={{ pageSize: 10 }} selectionSettings={{ type: 'Multiple' }}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='100' type='date' format='yMd' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right'/>
              </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div><b>Select Rows</b></div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '5px !important' }}>
                      <div style={{ paddingTop: '8px' }}>
                        Start
                      </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div id='numericbox' style={{ minWidth: '130px' }}>
                        <NumericTextBoxComponent id='start' format='##' min={0} max={11} ref={numeric => this.numericObj = numeric} width='110px'>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '8px' }}> To </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div id='numericbox' style={{ minWidth: '130px' }}>
                        <NumericTextBoxComponent id='to' format='##' min={0} max={11} ref={numeric => this.numericObj2 = numeric} width='110px'>
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
    <p>TreeGrid supports two types of selection which can be set using
        <code>selectionSettings->type
        </code> property. They are,</p>
    <ul>
        <li><code>single</code> - Enabled by default. Allows the user to select single row/cell at a time.</li>
        <li><code>multiple</code> - Allows the user to select more than one row/cell at a time.</li>
    </ul>
    <p>Also, supports three modes of selection which can be set using
        <code>selectionSettings->mode
        </code> property. They are,
    </p>
    <ul>
        <li><code>Row</code> - Enabled by default. Enables row selection in TreeGrid.</li>
        <li><code>Cell</code> - Enables cell selection in TreeGrid.</li>
        <li><code>Both</code> - Enables both row and cell selection in TreeGrid. 
        Clicking any cell will select both the row and cell simultaneously.
        </li>
    </ul>
    <p>The treegrid supports two types of cell selection mode that can be set by using the  
            <code>
            selectionSettings->cellSelectionMode
            </code> property. They are,</p>
        <ul>
            <li><code>Flow</code> - The Flow value is set by default. The range of cells are selected between the start index
                and end index that includes in between cells of rows.</li>
            <li><code>Box</code> - Range of cells are selected from the start and 
                end column indexes that includes in between cells of rows within the range.</li>
        </ul>
    <p>To perform the multi-selection, hold <strong>CTRL</strong> key and click the desired rows/cells. 
    To select range of rows/cells, hold <strong>SHIFT</strong> key and click the rows/cells.</p>
    <p>While using the TreeGrid in a touch device environment, there is an option for multi-selection 
        through single tap on the row and it will show a popup with the multi-selection symbol. 
        Tap the icon to enable multi-selection in a single tap.
    </p>
    <p>In this demo, enter the values in the Start and To text box to select range of rows.
        And click the Clear Selection button to deselect the rows.
    </p>
    <p>
        More information on the selection configuration can be found in this documentation section.
    </p>
    </div>
      </div>);
    }
}
