import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Column } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


export class ShowHideColumn extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;
  public dropdownObj: DropDownListComponent;
  public buttonObj: ButtonComponent;
  public buttonObj2: ButtonComponent;

  private columnsName: { [key: string]: Object }[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'duration', name: 'Duration' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'progress', name: 'Progress' }
  ];

  private change(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let column: Column = this.treegridObj.getColumnByField(columnName);
    if (column.visible === undefined || column.visible) {
      this.buttonObj2.disabled = true;
      this.buttonObj.disabled = false;
    } else {
      this.buttonObj.disabled = true;
      this.buttonObj2.disabled = false;
    }
  }



  private btnClick() {
    let columnName: string = this.dropdownObj.value.toString();
    let column: Column = this.treegridObj.getColumnByField(columnName);
    if (this.treegridObj.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
      alert('Atleast one Column should be visible');
    } else {
      this.treegridObj.grid.hideColumns(column.headerText, 'headerText');
      this.buttonObj.disabled = true;
      this.buttonObj2.disabled = false;
      let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
      hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
    }
  }
  
  private created() {
    this.buttonObj2.disabled = true;
  }
  
  private showClick() {
    let columnName: string = this.dropdownObj.value.toString();
    let column: Column = this.treegridObj.getColumnByField(columnName);
    this.treegridObj.grid.showColumns(column.headerText, 'headerText');
    this.buttonObj2.disabled = true;
    this.buttonObj.disabled = false;
    let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
    hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' 
              ref={treegrid=> this.treegridObj = treegrid} pageSettings={{ pageSize: 10 }}>
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
                  <tr>
                  <td style={{ width: '30%' }}>
                      <div> Column </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div id='columnddl'>
                         <DropDownListComponent width="120px" id="ddlelement" change={this.change.bind(this)}
                            dataSource={this.columnsName} fields={{ text: 'name', value: 'id' }} value="taskID"
                            ref={dropdown=> this.dropdownObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                     <td style={{ width: '30%' }}>
                        <div>
                          <ButtonComponent id='hide' 
                            ref={button=> this.buttonObj = button} onClick={ this.btnClick.bind(this) }> Hide </ButtonComponent>
                        </div>
                     </td>
                     <td style={{ width: '70%' }}>
                        <div>
                          <ButtonComponent id='show' created={this.created.bind(this)}
                            ref={button=> this.buttonObj2 = button} onClick={ this.showClick.bind(this) }> Show </ButtonComponent>
                        </div>
                     </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px'}}> Hidden Columns</div>
                    </td>
                    <td style={{ width: '70%', Padding: '10px 10px 10px 0px' }}>
                      <div>
                        <textarea id='hiddencolumns' style={{ resize: 'none', height:'65px', backgroundColor:'#fff', padding: '6px' }}
                          className='form-control'></textarea>
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
          <p>This sample demonstrates the text alignment functionalities of the treegrid columns.</p>
        </div>
        <div id='description'>
          <p>The TreeGrid column can be showed/hidden dynamically using <code>showColumns
              </code> and <code>hideColumns</code> method of the Grid.</p>
          <p>In this demo, the columns can be showed and hidden by selecting the column name in the dropdown
              and click the Show or Hide buttons to toggle visibility. And the column`s visibility is toggled based on the 
              <code>columns->headerText</code> value.</p>
          <br/>
          <p>The <code>columns->visible</code> property specifies the visibility of a column. 
            To hide a column at the initial rendering, set the <code>columns->visible</code> property to false.</p>
        </div>
      </div>
    )
  }
}