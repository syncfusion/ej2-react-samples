import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Reorder, Sort, Edit } from '@syncfusion/ej2-react-treegrid';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
{/* custom code start */}
const SAMPLE_CSS = `
    #EventLog b{
      color: #388e3c;
    }
    hr {
      margin: 1px 10px 1px 0px;
      border-top: 1px solid #eee;
    }`;
{/* custom code end */}
export class Events extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;
  public editparams2: any = { params: { format: 'n' } };
  public taskNameRule: Object = { required: true };

  public created(): void {
    this.appendElement('Tree Grid <b>created</b> event called<hr>');
  }
  public collapsing(): void {
    this.appendElement('Tree Grid <b>collapsing</b> event called<hr>');
  }
  public collapsed(): void {
    this.appendElement('Tree Grid <b>collapsed</b> event called<hr>');
  }
  public expanded(): void {
    this.appendElement('Tree Grid <b>expanded</b> event called<hr>');
  }
  public expanding(): void {
    this.appendElement('Tree Grid <b>expanding</b> event called<hr>');
  }
  public beginEdit(): void {
    this.appendElement('Tree Grid <b>beginEdit</b> event called<hr>');
  }
  public columnDragStart(): void {
    this.appendElement('Tree Grid <b>columnDragStart</b> event called<hr>');
  }
  public columnDrop(): void {
    this.appendElement('Tree Grid <b>columnDrop</b> event called<hr>');
  }
  public columnDrag(): void {
    this.appendElement('Tree Grid <b>columnDrag</b> event called<hr>');
  }
  public load(): void {
    this.appendElement('Tree Grid <b>load</b> event called<hr>');
  }
  public create(): void {
    this.appendElement('Tree Grid <b>create</b> event called<hr>');
  }
  public actionBegin(): void {
    this.appendElement('Tree Grid <b>actionBegin</b> event called<hr>');
  }
  public actionComplete(): void {
    this.appendElement('Tree Grid <b>actionComplete</b> event called<hr>');
  }
  public dataBound(): void {
    this.appendElement('Tree Grid <b>dataBound</b> event called<hr>');
  }
  public rowSelecting(): void {
    this.appendElement('Tree Grid <b>rowSelecting</b> event called<hr>');
  }
  public rowSelected(): void {
    this.appendElement('Tree Grid <b>rowSelected</b> event called<hr>');
  }
  public rowDeselecting(): void {
    this.appendElement('Tree Grid <b>rowDeselecting</b> event called<hr>');
  }
  public rowDeselected(): void {
    this.appendElement('Tree Grid <b>rowDeselected</b> event called<hr>');
  }

  public appendElement(html: string) : void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  }

  private btnClick(): void {
    document.getElementById('EventLog').innerHTML = ''
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
              ref={treegrid=> this.treegridObj = treegrid} editSettings={{ allowEditing: true }} allowReordering={true}
              allowSorting={true} pageSettings={{ pageCount: 5 }} load={this.load.bind(this)} created={this.created.bind(this)}
              actionBegin={this.actionBegin.bind(this)} actionComplete={this.actionComplete.bind(this)}
              dataBound={this.dataBound.bind(this)} rowSelecting={this.rowSelecting.bind(this)} rowSelected={this.rowSelected.bind(this)}
              columnDrag={this.columnDrag.bind(this)} columnDragStart={this.columnDragStart.bind(this)}
              columnDrop={this.columnDrop.bind(this)} beginEdit={this.beginEdit.bind(this)} collapsing={this.collapsing.bind(this)}
              collapsed={this.collapsed.bind(this)} expanded={this.expanded.bind(this)} expanding={this.expanding.bind(this)} >
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' isPrimaryKey={true} width='100' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='215' validationRules={this.taskNameRule}></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='160' type='date' 
                  format='yMd' textAlign='Right' editType='datepickeredit' />
                <ColumnDirective field='duration' headerText='Duration' width='110' editType='numericedit' textAlign='Right'
                  edit={this.editparams2} />
                <ColumnDirective field='progress' headerText='Progress' width='110' textAlign='Right' editType='numericedit' 
                  edit={this.editparams2} />
              </ColumnsDirective>
            <Inject services={[Page, Reorder, Sort, Edit]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr>
                    <td>
                      <div className='eventarea' style={{ height: '245px', overflow: 'auto'}}>
                          <span className="EventLog" id="EventLog" style={{ wordBreak: 'normal'}}></span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='evtbtn' style={{ paddingBottom: '10px'}}>
                          <ButtonComponent onClick={ this.btnClick.bind(this) }> Clear </ButtonComponent>
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
            <p>This sample demonstrates all the events that have been triggered on all the Tree Grid operations with the help of Event Trace
                panel.
            </p>
        </div>
        <div id="description">
            <p>The Tree Grid triggers events based on its actions. The events can be used as an extension
                point to perform custom operations.
            </p>
            <p>In this demo, perform Tree Grid actions like paging, sorting, reordering, filtering etc. and see
                the <strong>Event Trace</strong> panel for the events emitted.
            </p>
            <p>More information on the Grid events can be found in the documentation section.
            </p>
        </div>
      </div>
    )
  }
}