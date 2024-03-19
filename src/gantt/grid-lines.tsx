import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';

export class GridLines extends SampleBase<{}, {}> {
  public ganttInstance: GanttComponent;
  public dropdownObj: DropDownListComponent;
  public linesData: { [key: string]: Object }[] = [
    { id: 'Both', type: 'Both' },
    { id: 'Vertical', type: 'Vertical' },
    { id: 'Horizontal', type: 'Horizontal' },
    { id: 'None', type: 'None' }
  ];
  private changeLine(args: ChangeEventArgs): void {
    let lines: any = args.value.toString();
    this.ganttInstance.gridLines = lines;
    this.ganttInstance.refresh();
  };
  public gridLines: any = 'Both';
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
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('07/06/2019');

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='GridLines' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData}
              highlightWeekends={true} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              treeColumnIndex={1} gridLines={this.gridLines} splitterSettings={this.splitterSettings}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
              <Inject services={[Selection, DayMarkers]} />
            </GanttComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ fontSize: '15px'}}>
                      Grid Lines
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div>
                      <DropDownListComponent ref={dropdown => this.dropdownObj = dropdown} id='gridLines' dataSource={this.linesData} fields={{ text: 'type', value: 'id' }}
                        value='Both' change={this.changeLine.bind(this)}></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the visibility of Gantt lines that separate the rows and columns.In this sample, you can change the gridlines from the property panel.</p>
        </div>

        <div id="description">
          <p>The <code>gridLines</code> property is used to control the visibility of line that separates the rows and columns.
            Gantt allows us to display the following grid lines:</p>
          <ul>
            <li><code>None</code> - Shows no line.</li>
            <li><code>Both</code> - Shows both horizontal and vertical lines.</li>
            <li><code>Horizontal</code> - Shows the horizontal line.</li>
            <li><code>Vertical</code> - Shows the vertical line.</li>
          </ul>
          <p> In this demo, you can modify the visibility of gridlines by selecting values in dropdown.</p>
          <p>Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code>
            method.To use markers, inject the <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
        </div>
      </div>
    )
  }
}
