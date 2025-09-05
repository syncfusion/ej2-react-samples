import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { Column } from '@syncfusion/ej2-grids';
import { PropertyPane } from '../common/property-pane';

const ShowHideColumn = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  let ganttObj = useRef<GanttComponent>(null);
  let dropdownObj = useRef<DropDownListComponent>(null);
  let hideButtonObj = useRef<ButtonComponent>(null);
  let showButtonObj = useRef<ButtonComponent>(null);

  let columnsName: { [key: string]: Object }[] = [
    { id: 'TaskID', name: 'ID' },
    { id: 'StartDate', name: 'Start Date' },
    { id: 'EndDate', name: 'End Date' },
    { id: 'Duration', name: 'Duration' },
    { id: 'Predecessor', name: 'Dependency' },
    { id: 'Progress', name: 'Progress' }
  ];

  const change = (args: ChangeEventArgs): void => {
    let columnName: string = args.value.toString();
    let column: Column = ganttObj.current.treeGrid.grid.getColumnByField(columnName);
    if (column.visible === undefined || column.visible) {
      showButtonObj.current.disabled = true;
      hideButtonObj.current.disabled = false;
    } else {
      hideButtonObj.current.disabled = true;
      showButtonObj.current.disabled = false;
    }
  }

  const hideButtonClick = () => {
    if (dropdownObj.current.value) {
      let dropValue: string = dropdownObj.current.value.toString();
      let columnName: string = ganttObj.current.treeGrid.getColumnByField(dropValue).headerText;
      ganttObj.current.hideColumn(columnName);
      hideButtonObj.current.disabled = true;
      showButtonObj.current.disabled = false;
      let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
      hiddenColumns.value = hiddenColumns.value + columnName + '\n';
    }
  }

  const showButtonClick = () => {
    if (dropdownObj.current.value) {
      let dropValue: string = dropdownObj.current.value.toString();
      let columnName: string = ganttObj.current.treeGrid.getColumnByField(dropValue).headerText;
      ganttObj.current.showColumn(columnName);
      showButtonObj.current.disabled = true;
      hideButtonObj.current.disabled = false;
      let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
      hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
    }
  }

  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 4
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  return (
    <div className='control-pane'>
      <div className='col-md-9 control-section'>

        <GanttComponent id='ColumnMenu' treeColumnIndex={1} allowFiltering={true} allowSorting={true}
          ref={ganttObj} allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={splitterSettings}
          taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <Inject services={[Selection]} />
        </GanttComponent>
      </div>
      <div className='col-md-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '30%' }}>
                <div> Column </div>
              </td>
              <td style={{ width: '70%', paddingRight: '10px' }}>
                <div id='columnddl'>
                  <DropDownListComponent width="120px" id="dropDown" change={change.bind(this)}
                    dataSource={columnsName} fields={{ text: 'name', value: 'id' }}
                    ref={dropdownObj} />
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>
                <div>
                  <ButtonComponent id='hide'
                    ref={hideButtonObj} onClick={hideButtonClick.bind(this)}> Hide </ButtonComponent>
                </div>
              </td>
              <td style={{ width: '70%' }}>
                <div>
                  <ButtonComponent id='show'
                    ref={showButtonObj} onClick={showButtonClick.bind(this)}> Show </ButtonComponent>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>
                <div style={{ paddingTop: '10px' }}> Hidden Columns</div>
              </td>
              <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                <div>
                  <textarea id='hiddencolumns' style={{ resize: 'none', height: '65px', backgroundColor: '#fff', padding: '6px' }}
                    className='form-control'></textarea>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id="action-description">
        <p>This sample demonstrates dynamic show/hide columns feature of Gantt. Select column name from the properties panel,
          and then click hide/show to toggle visibility.
        </p>
      </div>

      <div id="description">
        <p>The Gantt column can be shown or hidden dynamically using the <code>showColumn</code> and <code>hideColumn</code> methods of the Gantt.</p>
        <p>In this demo, the columns can be shown and hidden by selecting the column name in dropdown. Click the Show or Hide button to toggle the visibility.
          The visibility of column is toggled based on the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#headertext">columns -&gt; headerText</a> value.
        </p>

        <p>The <a target="_blank" href="https://ej2.syncfusion.com/raect/documentation/api/gantt/columnModel/#visible">columns -&gt; visible</a> property specifies the visibility of a column.
          To hide a column at the initial rendering, set the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#visible">columns -&gt; visible</a> property to false.
        </p>
      <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/nextjs-getting-started#add-syncfusion-react-component">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default ShowHideColumn;
