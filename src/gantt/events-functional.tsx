import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ContextMenu, Reorder, Resize, ColumnMenu, Toolbar, Edit, Filter, Sort, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const Events = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let eventLog = useRef<HTMLSpanElement>(null)
  const taskFields: any = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    child: "subtasks",
  };
  const columns: any = [
    { field: "TaskID", width: 80 },
    { field: "TaskName", width: 250 },
    { field: "StartDate" },
    { field: "EndDate" },
    { field: "Duration" },
    { field: "Predecessor" },
    { field: "Progress" },
  ];
  const toolbar: any = [
    "Add",
    "Edit",
    "Update",
    "Delete",
    "Cancel",
    "ExpandAll",
    "CollapseAll",
    "Search",
  ];
  const editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
  };
  const labelSettings: any = {
    leftLabel: "TaskName",
  };
  const splitterSettings: any = {
    columnIndex: 2,
  };
  const projectStartDate: Date = new Date("03/24/2019");
  const projectEndDate: Date = new Date("07/06/2019");
  const created = (): void => {
    appendElement('Gantt <b>created</b> event called<hr>');
  };
  const load = (): void => {
    appendElement('Gantt <b>load</b> event called<hr>');
  };
  const dataBound = (): void => {
    appendElement('Gantt <b>dataBound</b> event called<hr>');
  };
  const toolbarClick = (): void => {
    appendElement('Gantt <b>toolbarClick</b> event called<hr>');
  };
  const beforeTooltipRender = (): void => {
    appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
  };
  const actionBegin = (): void => {
    appendElement('Gantt <b>actionBegin</b> event called<hr>');
  };
  const actionComplete = (): void => {
    appendElement('Gantt <b>actionComplete</b> event called<hr>');
  };
  const cellEdit = (): void => {
    appendElement('Gantt <b>cellEdit</b> event called<hr>');
  };
  const endEdit = (): void => {
    appendElement('Gantt <b>endEdit</b> event called<hr>');
  };
  const taskbarEditing = (): void => {
    appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
  };
  const taskbarEdited = (): void => {
    appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
  };
  const rowSelecting = (): void => {
    appendElement('Gantt <b>rowSelecting</b> event called<hr>');
  };
  const rowSelected = (): void => {
    appendElement('Gantt <b>rowSelected</b> event called<hr>');
  };
  const rowDeselecting = (): void => {
    appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
  };
  const rowDeselected = (): void => {
    appendElement('Gantt <b>rowDeselected</b> event called<hr>');
  };
  const columnDragStart = (): void => {
    appendElement('Gantt <b>columnDragStart</b> event called<hr>');
  };
  const columnDrag = (): void => {
    appendElement('Gantt <b>columnDrag</b> event called<hr>');
  };
  const columnDrop = (): void => {
    appendElement('Gantt <b>columnDrop</b> event called<hr>');
  };
  const expanding = (): void => {
    appendElement('Gantt <b>expanding</b> event called<hr>');
  };
  const expanded = (): void => {
    appendElement('Gantt <b>expanded</b> event called<hr>');
  };
  const collapsing = (): void => {
    appendElement('Gantt <b>collapsing</b> event called<hr>');
  };
  const collapsed = (): void => {
    appendElement('Gantt <b>collapsed</b> event called<hr>');
  };
  const columnMenuClick = (): void => {
    appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
  };
  const columnMenuOpen = (): void => {
    appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
  };
  const contextMenuClick = (): void => {
    appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
  };
  const contextMenuOpen = (): void => {
    appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
  };
  const resizeStart = (): void => {
    appendElement('Gantt <b>resizeStart</b> event called<hr>');
  };
  const resizing = (): void => {
    appendElement('Gantt <b>resizing</b> event called<hr>');
  };
  const resizeStop = (): void => {
    appendElement('Gantt <b>resizeStop</b> event called<hr>');
  };
  const splitterResizeStart = (): void => {
    appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
  };
  const splitterResizing = (): void => {
    appendElement('Gantt <b>splitterResizing</b> event called<hr>');
  };
  const splitterResized = (): void => {
    appendElement('Gantt <b>splitterResized</b> event called<hr>');
  };
  const recordDoubleClick = (): void => {
    appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
  };
  const onTaskbarClick = (): void => {
    appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
  };
  const appendElement = (html: string): void => {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  };
  const clear = (): void => {
    eventLog.current.innerHTML = "";
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-lg-9">
          <GanttComponent
            id="Events"
            dataSource={projectNewData}
            highlightWeekends={true}
            treeColumnIndex={1}
            allowSelection={true}
            allowSorting={true}
            allowReordering={true}
            allowResizing={true}
            enableContextMenu={true}
            showColumnMenu={true}
            columns={columns}
            toolbar={toolbar}
            editSettings={editSettings}
            splitterSettings={splitterSettings}
            taskFields={taskFields}
            labelSettings={labelSettings}
            height="410px"
            created={created.bind(this)}
            load={load.bind(this)}
            dataBound={dataBound.bind(this)}
            toolbarClick={toolbarClick.bind(this)}
            beforeTooltipRender={beforeTooltipRender.bind(this)}
            actionBegin={actionBegin.bind(this)}
            actionComplete={actionComplete.bind(this)}
            cellEdit={cellEdit.bind(this)}
            endEdit={endEdit.bind(this)}
            taskbarEditing={taskbarEditing.bind(this)}
            taskbarEdited={taskbarEdited.bind(this)}
            rowSelecting={rowSelecting.bind(this)}
            rowSelected={rowSelected.bind(this)}
            rowDeselecting={rowDeselecting.bind(this)}
            rowDeselected={rowDeselected.bind(this)}
            columnDragStart={columnDragStart.bind(this)}
            columnDrag={columnDrag.bind(this)}
            columnDrop={columnDrop.bind(this)}
            expanding={expanding.bind(this)}
            expanded={expanded.bind(this)}
            collapsing={collapsing.bind(this)}
            collapsed={collapsed.bind(this)}
            columnMenuClick={columnMenuClick.bind(this)}
            columnMenuOpen={columnMenuOpen.bind(this)}
            contextMenuClick={contextMenuClick.bind(this)}
            contextMenuOpen={contextMenuOpen.bind(this)}
            resizeStart={resizeStart.bind(this)}
            resizing={resizing.bind(this)}
            resizeStop={resizeStop.bind(this)}
            splitterResizeStart={splitterResizeStart.bind(this)}
            splitterResizing={splitterResizing.bind(this)}
            splitterResized={splitterResized.bind(this)}
            recordDoubleClick={recordDoubleClick.bind(this)}
            onTaskbarClick={onTaskbarClick.bind(this)}
            projectStartDate={projectStartDate}
            projectEndDate={projectEndDate}
          >
            <ColumnsDirective>
              <ColumnDirective field="TaskID" width="80"></ColumnDirective>
              <ColumnDirective field="TaskName" width="250"></ColumnDirective>
              <ColumnDirective field="StartDate"></ColumnDirective>
              <ColumnDirective field="EndDate"></ColumnDirective>
              <ColumnDirective field="Duration"></ColumnDirective>
              <ColumnDirective field="Predecessor"></ColumnDirective>
              <ColumnDirective field="Progress"></ColumnDirective>
            </ColumnsDirective>
            <Inject
              services={[
                Selection,
                DayMarkers,
                ContextMenu,
                Reorder,
                Resize,
                ColumnMenu,
                Toolbar,
                Edit,
                Filter,
                Sort,
              ]}
            />
          </GanttComponent>
        </div>
        <div className="col-lg-3 property-section">
          <PropertyPane title="Event Trace">
            <table
              id="property"
              className="property-panel-table"
              title="Event Trace"
              style={{ width: "100%" }}
            >
            <tbody>
              <tr>
                <td>
                  <div
                    className="eventarea"
                    style={{ height: "346px", overflow: "auto" }}
                  >
                    <span
                      className="EventLog"
                      id="EventLog"
                      style={{ wordBreak: "normal" }}
                      ref={eventLog}
                    ></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", padding: "20px 10px 10px 80px" }}>
                  <div>
                    <ButtonComponent onClick={clear.bind(this)}>
                      {" "}
                      Clear{" "}
                    </ButtonComponent>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates all the events that occur on all the Gantt
          operations with the help of Event Trace panel.
        </p>
      </div>

      <div id="description">
        <p>
          The Gantt triggers events based on its actions. The events can be used
          as an extension point to perform custom operations.
        </p>
        <p>
          In this demo, perform Gantt actions such as load, created, dataBound,
          toolbarClick, beforeTooltipRender, actionBegin, actionComplete,
          cellEdit, endEdit, taskbarEditing, taskbarEdited, rowSelecting,
          rowSelected, rowDeselecting, rowDeselected, columnDragStart,
          columnDrag, columnDrop, expanding, expanded, collapsing, collapsed,
          columnMenuClick, columnMenuOpen, contextMenuClick, contextMenuOpen,
          resizeStart, resizing, resizeStop, splitterResizeStart,
          splitterResizing, splitterResized, recordDoubleClick, onTaskbarClick
          and see the <strong>Event Trace</strong> panel for the events emitted.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise
          modules. To use a selection, inject the
          <code>Selection</code> module using the{" "}
          <code>Gantt.Inject(Selection)</code> method.To use a sorting, inject
          the
          <code>Sort</code> module using the <code>Gantt.Inject(Sort)</code>{" "}
          method.To reorder column, inject the
          <code>Reorder</code> module using the{" "}
          <code>Gantt.Inject(Reorder)</code> method.To resize column width,
          inject the
          <code>Resize</code> module using the <code>Gantt.Inject(Resize)</code>{" "}
          method.To use a contextmenu, inject the
          <code>Contextmenu</code> module using the{" "}
          <code>Gantt.Inject(Contextmenu)</code> method.To use a columnmenu,
          inject the
          <code>ColumnMenu</code> module using the{" "}
          <code>Gantt.Inject(ColumnMenu)</code> method.To use a toolbar, inject
          the
          <code>Toolbar</code> module using the{" "}
          <code>Gantt.Inject(Toolbar)</code> method.To use a edit, inject the
          <code>Edit</code> module using the <code>Gantt.Inject(Edit)</code>{" "}
          method.To use markers, inject the
          <code>DayMarkers</code> module using the{" "}
          <code>Gantt.Inject(DayMarkers)</code> method.
        </p>
      </div>
    </div>
  );
}
export default Events;
