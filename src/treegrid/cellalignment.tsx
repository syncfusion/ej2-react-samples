import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


export class CellAlign extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;
  public dropdownObj: DropDownListComponent;
  public dropdownObj2: DropDownListComponent;

  private columnNames: { [key: string]: Object }[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'duration', name: 'Duration' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'progress', name: 'Progress' }
  ];

  private alignment: { [key: string]: Object }[] = [
    { id: 'Right', name: 'Right' },
    { id: 'Left', name: 'Left' },
    { id: 'Center', name: 'Center' },
    { id: 'Justify', name: 'Justify' }
  ];

  private change(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let alignment: any = this.treegridObj.getColumnByField(columnName).textAlign;
    this.dropdownObj2.value = alignment;
  }

  private change2(args: ChangeEventArgs): void {
    let alignment: any = args.value;
    let columnName: string = this.dropdownObj.value.toString();
    this.treegridObj.getColumnByField(columnName).textAlign = alignment;
    this.treegridObj.refreshColumns();
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging='true' 
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
                  <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px' }}> Column </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div>
                         <DropDownListComponent width="95px" id="columns" change={this.change.bind(this)}
                            dataSource={this.columnNames} fields={{ text: 'name', value: 'id' }} value="taskID"
                            ref={dropdown=> this.dropdownObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: '50px' }}>
                     <td style={{ width: '30%' }}>
                        <div> Cell Alignment </div>
                     </td>
                     <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                        <div>
                        <DropDownListComponent width="95px" id="alignment" change={this.change2.bind(this)}
                            dataSource={this.alignment} fields={{ text: 'name', value: 'id' }} value="Right"
                            ref={dropdown=> this.dropdownObj2 = dropdown} />
                        </div>
                     </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
          <p>This sample demonstrates the text alignment functionalities of the Tree Grid columns.</p>
        </div>
        <div id='description'>
          <p>
            Align both content and header text of particular column using the <code>textAlign
            </code> property of columns. There are four possible ways to align content and header text of column, they are.</p>
          <ul>
            <li><code>Right</code></li>
            <li><code>Left</code></li>
            <li><code>Center</code></li>
            <li><code>Justify</code></li>
          </ul>
          <p>
            In this sample, we have initially set the <code>textAlign</code> property as “Right” for Task ID, Start Date, Duration and Progress
            columns and also we have an option to align the values of content and header text dynamically by select the column
            and text align value from property panel.
          </p>
           <p>
              More information about Cell Alignment can be found in this documentation section.
           </p>
        </div>
      </div>
    )
  }
}