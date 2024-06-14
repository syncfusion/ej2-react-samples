import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GanttComponent, Inject, Filter, ColumnsDirective, ColumnDirective, Selection, VirtualScroll, Sort } from '@syncfusion/ej2-react-gantt';
import { virtualData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class LoadingAnimation extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private filterType: { [key: string]: Object }[] = [
    { text: 'Shimmer', value: 'Shimmer' },
    { text: 'Spinner', value: 'Spinner' }
  ];
  public onChange(sel: ChangeEventArgs): void {
    let type: any = sel.value.toString();
    if (type === "Shimmer") {
      this.ganttInstance.loadingIndicator.indicatorType = "Shimmer";
      this.ganttInstance.enableVirtualMaskRow = true;
      this.ganttInstance.refresh();
    } else {
      this.ganttInstance.loadingIndicator.indicatorType = "Spinner";
      this.ganttInstance.enableVirtualMaskRow = false;
      this.ganttInstance.refresh();
    }
  }
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'parentID'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public loadingIndicator: any = {
    indicatorType: 'Shimmer'
  };
  public labelSettings: any = {
    taskLabel: 'Progress'
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='col-md-9'>
            <GanttComponent id='Filtering' ref={gantt => this.ganttInstance = gantt} dataSource={virtualData} treeColumnIndex={1} labelSettings={this.labelSettings}
            allowSelection={true} allowFiltering={true} allowSorting={true} highlightWeekends={true} enableVirtualization={true}
            taskFields={this.taskFields} splitterSettings={this.splitterSettings} height='450px' loadingIndicator = {this.loadingIndicator}>
              <ColumnsDirective>
                  <ColumnDirective field='TaskID'/>
                  <ColumnDirective field='TaskName' headerText='Task Name'/>
                  <ColumnDirective field='StartDate'/>
                  <ColumnDirective field='Duration'/>
                  <ColumnDirective field='Progress'/>
              </ColumnsDirective>
              <Inject services={[Filter, Selection, VirtualScroll, Sort]} />
            </GanttComponent>
            </div>
          <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
            <tr>
              <td style={{ width: '50%',paddingLeft:0 }}>
              <div style={{ paddingTop: '10px',paddingLeft:0}}>Indicator Type </div>
              </td>
              <td style={{ width: '70%' }}>
              <div>
              <DropDownListComponent width="110px" id="seltype" change={this.onChange.bind(this)}
                dataSource={this.filterType} value="Shimmer" />
              </div>
              </td>
            </tr>
            </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample shows the loading indicator while initial rendering, refreshing and all gantt action. In this sample, you can change the loading indicators from the properties panel.</p>
        </div>

        <div id="description">
          <p>
            The Gantt has an option to show a loading indicator in-between the time of fetching the data and binding it to the gantt during initial rendering, refreshing or 
            while performing action like sorting, filtering and more.
          </p>
          <p>
            The Gantt support the following loading indicator types
          </p>
          <ul>
            <li><code>Shimmer</code></li>
            <li><code>Spinner</code></li>
          </ul>
          <p>
            Use the loading indicator by setting the <code>loadingIndicator.indicatorType</code> property as Spinner or Shimmer. The default value of the indicatorType is Spinner.
          </p>
          <p>
            By default <code>enableVirtualMaskRow</code> is set to true which renders Shimmer during virtual scrolling.
          </p>
        </div>
      </div>
    )
  }
}
