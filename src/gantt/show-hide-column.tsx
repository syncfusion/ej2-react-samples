import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { Column} from '@syncfusion/ej2-grids';
import { PropertyPane } from '../common/property-pane';

export class ShowHideColumn extends SampleBase<{}, {}> {
  public ganttObj: GanttComponent;
  public dropdownObj: DropDownListComponent;
  public hideButtonObj: ButtonComponent;
  public showButtonObj: ButtonComponent;
  
  private columnsName: { [key: string]: Object }[] = [
    { id: 'TaskID', name: 'ID' },
    { id: 'StartDate', name: 'Start Date' },
    { id: 'EndDate', name: 'End Date' },
    { id: 'Duration', name: 'Duration' },
    { id: 'Predecessor', name: 'Dependency' },
    { id: 'Progress', name: 'Progress' }
  ];
  
  private change(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let column: Column = this.ganttObj.treeGrid.grid.getColumnByField(columnName);
    if (column.visible === undefined || column.visible) {
      this.showButtonObj.disabled = true;
      this.hideButtonObj.disabled = false;
    } else {
      this.hideButtonObj.disabled = true;
      this.showButtonObj.disabled = false;
    }
  }

  private hideButtonClick() {
    if ( this.dropdownObj.value) {
      let dropValue: string = this.dropdownObj.value.toString();
      let columnName: string =  this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
      this.ganttObj.hideColumn(columnName);
      this.hideButtonObj.disabled = true;
      this.showButtonObj.disabled = false;
      let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
      hiddenColumns.value = hiddenColumns.value + columnName + '\n';
    }
  }
  
  private showButtonClick() {
    if ( this.dropdownObj.value) {
      let dropValue: string = this.dropdownObj.value.toString();
      let columnName: string = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
      this.ganttObj.showColumn(columnName);
      this.showButtonObj.disabled = true;
      this.hideButtonObj.disabled = false;
      let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
      hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
    }
  }

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
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 4
};
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('07/06/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='col-md-9 control-section'>
        
          <GanttComponent id='ColumnMenu' treeColumnIndex={1} allowFiltering={true} allowSorting={true}
           ref={gantt => this.ganttObj = gantt} allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <Inject services={[Selection]} />
          </GanttComponent>
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
                         <DropDownListComponent width="120px" id="dropDown" change={this.change.bind(this)}
                            dataSource={this.columnsName} fields={{ text: 'name', value: 'id' }}
                            ref={dropdown=> this.dropdownObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                     <td style={{ width: '30%' }}>
                        <div>
                          <ButtonComponent id='hide' 
                            ref={button=> this.hideButtonObj = button} onClick={ this.hideButtonClick.bind(this) }> Hide </ButtonComponent>
                        </div>
                     </td>
                     <td style={{ width: '70%' }}>
                        <div>
                          <ButtonComponent id='show'
                            ref={button=> this.showButtonObj = button} onClick={ this.showButtonClick.bind(this) }> Show </ButtonComponent>
                        </div>
                     </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px'}}> Hidden Columns</div>
                    </td>
                    <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <textarea id='hiddencolumns' style={{ resize: 'none', height:'65px', backgroundColor:'#fff', padding: '6px' }}
                          className='form-control'></textarea>
                      </div>
                    </td>
                  </tr>
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
          The visibility of column is toggled based on the <code>columns -&gt; headerText</code> value.
        </p>
        
        <p>The <code>columns -&gt; visible</code> property specifies the visibility of a column. 
        To hide a column at the initial rendering, set the <code>columns -&gt; visible</code> property to false.
        </p>
        </div>
    </div>
    )
  }
}
