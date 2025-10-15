import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, Filter, Sort, ColumnMenu, Resize,Edit,Reorder,UndoRedo,ContextMenu, ColumnsDirective, ColumnDirective,Toolbar,DayMarkers } from '@syncfusion/ej2-react-gantt';
import { undoRedoData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import './undo-redo.css'

const GanttUndoRedo = () => {
  useEffect(() => {
    updateSampleSection();
    initializeToolbar();
  }, [])
  let ganttInstance: GanttComponent;
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
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const undoRedoActions: any = ['Sorting','Add','ColumnReorder','ColumnResize','ColumnState','Delete','Edit','Filtering','Indent','Outdent','NextTimeSpan','PreviousTimeSpan','RowDragAndDrop','Search'];

  const splitterSettings: any = {
    columnIndex: 4
};
const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
const toolbar: any = ["Add",
      "Edit",
      "Update",
      "Delete",
      "Cancel",
      { text: "Undo", tooltipText: "Undo", id: "Undo" },
      { text: "Redo", tooltipText: "Redo", id: "Redo" },
    ];
  const toolbarClick=(args: ClickEventArgs): void=>{
    if (args.item.text === "Undo") {
      ganttInstance.undo();
    } else if (args.item.text === "Redo") {
      ganttInstance.redo();
    }
    updateBadges();
  }
  
  const initializeToolbar=()=> {
    const toolbarInstance = document.querySelector('.e-gantt-toolbar');
    const undoBtn: any = toolbarInstance.querySelector('[aria-label="Undo"]');
    const redoBtn: any = toolbarInstance.querySelector('[aria-label="Redo"]');
    if (toolbarInstance) {
      
      if (undoBtn) {
        undoBtn.classList.add('e-overlay');
      }
      if (redoBtn) {
        redoBtn.classList.add('e-overlay');
      }
      if (redoBtn.classList.contains("e-overlay") && undoBtn.classList.contains("e-overlay")) {
        undoBtn.style.pointerEvents = "none";
        redoBtn.style.pointerEvents = "none";
        undoBtn.style.boxShadow = "0 0 0 transparent";
        redoBtn.style.boxShadow = "0 0 0 transparent";
      }
      else {
        undoBtn.style.boxShadow = "";
        redoBtn.style.boxShadow = "";
      }
    }
  };
  const updateBadges = () => {
    const toolbarInstance = document.querySelector('.e-gantt-toolbar');
    const undoBtn: any = toolbarInstance.querySelector('[aria-label="Undo"]');
    const redoBtn: any = toolbarInstance.querySelector('[aria-label="Redo"]');
    const undoCount = ganttInstance.getUndoActions().length;
    const redoCount = ganttInstance.getRedoActions().length;
    if (undoBtn) {
      if (undoCount === 0) {
        undoBtn.classList.add("e-overlay");
        undoBtn.style.cursor = "default";
        undoBtn.style.pointerEvents = "none";
      } else {
        undoBtn.classList.remove("e-overlay");
        undoBtn.style.cursor = "pointer";
        undoBtn.style.pointerEvents = "auto";
      } 
    }

    if (redoBtn) {
      if (redoCount === 0) {
        redoBtn.classList.add('e-overlay');
        redoBtn.style.cursor = "default";
        redoBtn.style.pointerEvents = "none";
   
      } else {
        redoBtn.classList.remove("e-overlay");
        redoBtn.style.cursor = "pointer";
        redoBtn.style.pointerEvents = "auto";
      }
    }
    if (redoBtn.classList.contains("e-overlay")) {
      redoBtn.style.boxShadow = "0 0 0 transparent";
    } else {
      redoBtn.style.boxShadow = ""; // Clears inline style, allowing CSS to apply
    }

    if (undoBtn.classList.contains("e-overlay")) {
      undoBtn.style.boxShadow = "0 0 0 transparent";
    } else {
      undoBtn.style.boxShadow = ""; // Clears inline style
    }
    setBadge(undoBtn, undoCount);
    setBadge(redoBtn, redoCount);
  };

  const setBadge = (button, count) => {

    let badge = button.querySelector(
      '.e-badge.e-badge-danger.e-badge-notification.e-badge-overlap.e-badge-circle'
    );
    
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'e-badge e-badge-danger e-badge-notification e-badge-overlap e-badge-circle';
      button.appendChild(badge);
    }

    const tailwind3 = document.body.classList.contains('tailwind3') || 
                     document.body.classList.contains('tailwind3-dark');
    const bootstrap5 = document.body.classList.contains('bootstrap5.3') || 
                      document.body.classList.contains('bootstrap5.3-dark');
    const material3 = document.body.classList.contains('material3-dark') || 
                     document.body.classList.contains('material3');
    const fluent2 = document.body.classList.contains('fluent2-dark') || 
                   document.body.classList.contains('fluent2');
    const fluent = document.body.classList.contains('fluent-dark') ||
                  document.body.classList.contains('fluent');

    if (tailwind3) {
      badge.style.backgroundColor = '#c2410c';
      badge.style.color = '#fff';
      badge.style.marginTop = '3px';
      badge.style.paddingTop = "2px";
    } else if (bootstrap5) {
      badge.style.backgroundColor = '#ffc107';
      badge.style.color = '#000';
      badge.style.paddingTop = '3px';
      badge.style.marginTop = '6px';
    } else if (fluent2) {
      badge.style.backgroundColor = '#fde300';
      badge.style.color = '#000';
      badge.style.paddingTop = '4px';
      badge.style.marginTop = '6px';
    } else if (material3) {
      badge.style.backgroundColor = '#b3261e';
      badge.style.color = '#fff';
      badge.style.paddingTop = '4px';
    }
    else if(fluent) {
      badge.style.backgroundColor = "#fde300";
      badge.style.color = "#000";
      badge.style.paddingTop = "2px";
      badge.style.marginTop = "8px";
    }

    badge.textContent = count.toString();
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  };
  const projectStartDate: Date = new Date('06/24/2025');
  const projectEndDate: Date = new Date('08/31/2025');
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' treeColumnIndex={1}  ref={gantt => ganttInstance = gantt}  showColumnMenu={true} allowFiltering={true} allowSorting={true}
            allowResizing={true} dataSource={undoRedoData} highlightWeekends={true} splitterSettings={splitterSettings} toolbarClick={toolbarClick}
            taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46} enableUndoRedo={true} enableContextMenu={true}
            allowReordering={true} editSettings={editSettings} toolbar={toolbar} undoRedoActions={undoRedoActions}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate} actionComplete={updateBadges} resizeStop={updateBadges}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Filter, Sort, ColumnMenu, Resize,Edit,Reorder,UndoRedo,ContextMenu, Toolbar,DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
            <p>This sample showcases the undo-redo functionality in the Gantt Chart, allowing users to revert or reapply their recent actions such as task edits, additions, and deletions.</p>
        </div>
        <div id="description">
            <p>The undo feature lets users reverse the most recent changes made to tasks, dependencies, columns, or timeline settings. The redo feature restores actions that were previously undone. Both can be triggered using keyboard shortcuts (<code>Ctrl + Z</code> for Undo, <code>Ctrl + Y</code> for Redo) or via toolbar buttons.</p>
            <p>
                You can configure which actions are tracked using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#undoredoactions">undoRedoActions</a> property. Supported actions include: 
                <code>Edit</code>, <code>Add</code>, <code>Delete</code>, <code>Sorting</code>, <code>ColumnReorder</code>, <code>ColumnResize</code>, <code>Search</code>, <code>Filtering</code>, <code>ZoomIn</code>, <code>ZoomOut</code>, <code>ZoomToFit</code>, <code>ColumnState</code>, <code>Indent</code>, <code>Outdent</code>, <code>RowDragAndDrop</code>, <code>TaskbarDragAndDrop</code>, <code>PreviousTimeSpan</code>, and <code>NextTimeSpan</code>
            </p>
            <p>The number of undo-redo steps stored can be controlled using the <code>undoRedoStepsCount</code> property, which defaults to 10.</p>
            <p>
                In this demo, the undo-redo feature is enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enableundoredo">
                enableUndoRedo</a> to <code>true</code>
            </p>
          <br/>
            <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/undo-redo">documentation section</a>.</p>
        </div>

      </div>
    )
  }
export default GanttUndoRedo;
