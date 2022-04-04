import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ContextMenu, Reorder, Resize, ColumnMenu, Toolbar, Edit, Filter, Sort, ColumnsDirective, ColumnDirective  } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export class Events extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public columns: any = [
    { field: 'TaskID', width: 80 },
    { field: 'TaskName', width: 250 },
    { field: 'StartDate' },
    { field: 'EndDate' },
    { field: 'Duration' },
    { field: 'Predecessor' },
    { field: 'Progress' },
  ];
  public toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search'];
  public editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('07/06/2019');
  public created(): void {
    this.appendElement('Gantt <b>created</b> event called<hr>');
  }
  public load(): void {
    this.appendElement('Gantt <b>load</b> event called<hr>');
  }
  public dataBound(): void {
    this.appendElement('Gantt <b>dataBound</b> event called<hr>');
  }
  public toolbarClick(): void {
    this.appendElement('Gantt <b>toolbarClick</b> event called<hr>');
  }
  public beforeTooltipRender(): void {
    this.appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
  }
  public actionBegin(): void {
    this.appendElement('Gantt <b>actionBegin</b> event called<hr>');
  }
  public actionComplete(): void {
    this.appendElement('Gantt <b>actionComplete</b> event called<hr>');
  }
  public cellEdit(): void {
    this.appendElement('Gantt <b>cellEdit</b> event called<hr>');
  }
  public endEdit(): void {
    this.appendElement('Gantt <b>endEdit</b> event called<hr>');
  }
  public taskbarEditing(): void {
    this.appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
  }
  public taskbarEdited(): void {
    this.appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
  }
  public rowSelecting(): void {
    this.appendElement('Gantt <b>rowSelecting</b> event called<hr>');
  }
  public rowSelected(): void {
    this.appendElement('Gantt <b>rowSelected</b> event called<hr>');
  }
  public rowDeselecting(): void {
    this.appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
  }
  public rowDeselected(): void {
    this.appendElement('Gantt <b>rowDeselected</b> event called<hr>');
  }
  public columnDragStart(): void {
    this.appendElement('Gantt <b>columnDragStart</b> event called<hr>');
  }
  public columnDrag(): void {
    this.appendElement('Gantt <b>columnDrag</b> event called<hr>');
  }
  public columnDrop(): void {
    this.appendElement('Gantt <b>columnDrop</b> event called<hr>');
  }
  public expanding(): void {
    this.appendElement('Gantt <b>expanding</b> event called<hr>');
  }
  public expanded(): void {
    this.appendElement('Gantt <b>expanded</b> event called<hr>');
  }
  public collapsing(): void {
    this.appendElement('Gantt <b>collapsing</b> event called<hr>');
  }
  public collapsed(): void {
    this.appendElement('Gantt <b>collapsed</b> event called<hr>');
  }
  public columnMenuClick(): void {
    this.appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
  }
  public columnMenuOpen(): void {
    this.appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
  }
  public contextMenuClick(): void {
    this.appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
  }
  public contextMenuOpen(): void {
    this.appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
  }
  public resizeStart(): void {
    this.appendElement('Gantt <b>resizeStart</b> event called<hr>');
  }
  public resizing(): void {
    this.appendElement('Gantt <b>resizing</b> event called<hr>');
  }
  public resizeStop(): void {
    this.appendElement('Gantt <b>resizeStop</b> event called<hr>');
  }
  public splitterResizeStart(): void {
    this.appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
  }
  public splitterResizing(): void {
    this.appendElement('Gantt <b>splitterResizing</b> event called<hr>');
  }
  public splitterResized(): void {
    this.appendElement('Gantt <b>splitterResized</b> event called<hr>');
  }
  public recordDoubleClick(): void {
    this.appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
  }
  public onTaskbarClick(): void {
    this.appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
  }

  public appendElement(html: string): void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  }

  private clear(): void {
    document.getElementById('EventLog').innerHTML = ''
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='Events' dataSource={projectNewData} highlightWeekends={true}
              treeColumnIndex={1} allowSelection={true} allowSorting={true} allowReordering={true}
              allowResizing={true} enableContextMenu={true} showColumnMenu={true}
              columns={this.columns} toolbar={this.toolbar} editSettings={this.editSettings} splitterSettings={this.splitterSettings}
              taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              created={this.created.bind(this)} load={this.load.bind(this)} dataBound={this.dataBound.bind(this)} toolbarClick={this.toolbarClick.bind(this)}
              beforeTooltipRender={this.beforeTooltipRender.bind(this)} actionBegin={this.actionBegin.bind(this)}
              actionComplete={this.actionComplete.bind(this)} cellEdit={this.cellEdit.bind(this)} endEdit={this.endEdit.bind(this)}
              taskbarEditing={this.taskbarEditing.bind(this)} taskbarEdited={this.taskbarEdited.bind(this)}
              rowSelecting={this.rowSelecting.bind(this)} rowSelected={this.rowSelected.bind(this)} rowDeselecting={this.rowDeselecting.bind(this)}
              rowDeselected={this.rowDeselected.bind(this)} columnDragStart={this.columnDragStart.bind(this)} columnDrag={this.columnDrag.bind(this)}
              columnDrop={this.columnDrop.bind(this)} expanding={this.expanding.bind(this)} expanded={this.expanded.bind(this)}
              collapsing={this.collapsing.bind(this)} collapsed={this.collapsed.bind(this)} columnMenuClick={this.columnMenuClick.bind(this)}
              columnMenuOpen={this.columnMenuOpen.bind(this)} contextMenuClick={this.contextMenuClick.bind(this)}
            contextMenuOpen={this.contextMenuOpen.bind(this)} resizeStart={this.resizeStart.bind(this)} resizing={this.resizing.bind(this)}
              resizeStop={this.resizeStop.bind(this)} splitterResizeStart={this.splitterResizeStart.bind(this)}
              splitterResizing={this.splitterResizing.bind(this)} splitterResized={this.splitterResized.bind(this)}
              recordDoubleClick={this.recordDoubleClick.bind(this)} onTaskbarClick={this.onTaskbarClick.bind(this)}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' ></ColumnDirective>
              <ColumnDirective field='Duration' ></ColumnDirective>
              <ColumnDirective field='Predecessor' ></ColumnDirective>
              <ColumnDirective field='Progress' ></ColumnDirective>
            </ColumnsDirective>
              <Inject services={[Selection, DayMarkers, ContextMenu, Reorder, Resize, ColumnMenu, Toolbar, Edit, Filter, Sort]} />
            </GanttComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Event Trace'>
              <table id="property" className="property-panel-table" title="Event Trace" style={{ width: '100%' }}>
                <tr>
                  <td>
                    <div className="eventarea" style={{ height: '346px', overflow: 'auto' }}>
                      <span className="EventLog" id="EventLog" style={{ wordBreak: 'normal' }}></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%', padding: '20px 10px 10px 80px' }}>
                    <div>
                      <ButtonComponent onClick={this.clear.bind(this)}> Clear </ButtonComponent>
                    </div>
                  </td>
                </tr>

              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates all the events that occur on all the Gantt operations with the help of Event Trace panel.</p>
        </div>

        <div id="description">
          <p>The Gantt triggers events based on its actions. The events can be used as an extension point to perform custom operations.</p>
          <p>In this demo, perform Gantt actions such as load, created, dataBound, toolbarClick, beforeTooltipRender, actionBegin, actionComplete, cellEdit,
        endEdit, taskbarEditing, taskbarEdited, rowSelecting, rowSelected, rowDeselecting, rowDeselected, columnDragStart, columnDrag,
        columnDrop, expanding, expanded, collapsing, collapsed, columnMenuClick, columnMenuOpen, contextMenuClick, contextMenuOpen, resizeStart,
        resizing, resizeStop, splitterResizeStart, splitterResizing, splitterResized, recordDoubleClick, onTaskbarClick and
        see the <strong>Event Trace</strong> panel for the events emitted.</p>

        <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
        <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use a sorting, inject the
        <code>Sort</code> module using the <code>Gantt.Inject(Sort)</code> method.To reorder column, inject the
        <code>Reorder</code> module using the <code>Gantt.Inject(Reorder)</code> method.To resize column width, inject the
        <code>Resize</code> module using the <code>Gantt.Inject(Resize)</code> method.To use a contextmenu, inject the
        <code>Contextmenu</code> module using the <code>Gantt.Inject(Contextmenu)</code> method.To use a columnmenu, inject the
        <code>ColumnMenu</code> module using the <code>Gantt.Inject(ColumnMenu)</code> method.To use a toolbar, inject the
        <code>Toolbar</code> module using the <code>Gantt.Inject(Toolbar)</code> method.To use a edit, inject the
        <code>Edit</code> module using the <code>Gantt.Inject(Edit)</code> method.To use markers, inject the
        <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.
    </p>
        </div>
      </div>
    )
  }
}
