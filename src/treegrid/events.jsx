import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Reorder, Sort, Edit } from '@syncfusion/ej2-react-treegrid';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class Events extends SampleBase {
    constructor() {
        super(...arguments);
        this.editparams2 = { params: { format: 'n' } };
        this.taskNameRule = { required: true };
    }
    created() {
        this.appendElement('TreeGrid <b>created</b> event called<hr>');
    }
    collapsing() {
        this.appendElement('TreeGrid <b>collapsing</b> event called<hr>');
    }
    collapsed() {
        this.appendElement('TreeGrid <b>collapsed</b> event called<hr>');
    }
    expanded() {
        this.appendElement('TreeGrid <b>expanded</b> event called<hr>');
    }
    expanding() {
        this.appendElement('TreeGrid <b>expanding</b> event called<hr>');
    }
    beginEdit() {
        this.appendElement('TreeGrid <b>beginEdit</b> event called<hr>');
    }
    columnDragStart() {
        this.appendElement('TreeGrid <b>columnDragStart</b> event called<hr>');
    }
    columnDrop() {
        this.appendElement('TreeGrid <b>columnDrop</b> event called<hr>');
    }
    columnDrag() {
        this.appendElement('TreeGrid <b>columnDrag</b> event called<hr>');
    }
    load() {
        this.appendElement('TreeGrid <b>load</b> event called<hr>');
    }
    create() {
        this.appendElement('TreeGrid <b>create</b> event called<hr>');
    }
    actionBegin() {
        this.appendElement('TreeGrid <b>actionBegin</b> event called<hr>');
    }
    actionComplete() {
        this.appendElement('TreeGrid <b>actionComplete</b> event called<hr>');
    }
    dataBound() {
        this.appendElement('TreeGrid <b>dataBound</b> event called<hr>');
    }
    rowSelecting() {
        this.appendElement('TreeGrid <b>rowSelecting</b> event called<hr>');
    }
    rowSelected() {
        this.appendElement('TreeGrid <b>rowSelected</b> event called<hr>');
    }
    rowDeselecting() {
        this.appendElement('TreeGrid <b>rowDeselecting</b> event called<hr>');
    }
    rowDeselected() {
        this.appendElement('TreeGrid <b>rowDeselected</b> event called<hr>');
    }
    appendElement(html) {
        let span = document.createElement('span');
        span.innerHTML = html;
        let log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    btnClick() {
        document.getElementById('EventLog').innerHTML = '';
    }
    render() {
        return (<div className='control-pane'>

        <div className='control-section'>
          <div className='col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' ref={treegrid => this.treegridObj = treegrid} editSettings={{ allowEditing: true }} allowReordering='true' allowSorting='true' pageSettings={{ pageCount: 5 }} load={this.load.bind(this)} created={this.created.bind(this)} actionBegin={this.actionBegin.bind(this)} actionComplete={this.actionComplete.bind(this)} dataBound={this.dataBound.bind(this)} rowSelecting={this.rowSelecting.bind(this)} rowSelected={this.rowSelected.bind(this)} columnDrag={this.columnDrag.bind(this)} columnDragStart={this.columnDragStart.bind(this)} columnDrop={this.columnDrop.bind(this)} beginEdit={this.beginEdit.bind(this)} collapsing={this.collapsing.bind(this)} collapsed={this.collapsed.bind(this)} expanded={this.expanded.bind(this)} expanding={this.expanding.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' isPrimaryKey={true} width='100' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='215' validationRules={this.taskNameRule}></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='160' type='date' format='yMd' textAlign='Right' editType='datepickeredit'/>
                <ColumnDirective field='duration' headerText='Duration' width='110' editType='numericedit' textAlign='Right' edit={this.editparams2}/>
                <ColumnDirective field='progress' headerText='Progress' width='110' textAlign='Right' editType='numericedit' edit={this.editparams2}/>
              </ColumnsDirective>
            <Inject services={[Page, Reorder, Sort, Edit]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr>
                    <td>
                      <div className='eventarea' style={{ height: '245px', overflow: 'auto' }}>
                          <span className="EventLog" id="EventLog" style={{ wordBreak: 'normal' }}></span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                          <ButtonComponent onClick={this.btnClick.bind(this)}> Clear </ButtonComponent>
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
            <p>This sample demonstrates all the events that have been triggered on all the TreeGrid operations with the help of Event Trace
                panel.
            </p>
        </div>
        <div id="description">
            <p>The TreeGrid triggers events based on its actions. The events can be used as an extension
                point to perform custom operations.
            </p>
            <p>In this demo, perform TreeGrid actions like paging, sorting, reordering, filtering etc. and see
                the <strong>Event Trace</strong> panel for the events emitted.
            </p>
            <p>More information on the Grid events can be found in the documentation section.
            </p>
        </div>
      </div>);
    }
}
