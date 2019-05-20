import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class FilterMenu extends SampleBase<{}, {}> {

  private treegridInstance: TreeGridComponent;
  private filterType: { [key: string]: Object }[] = [
    { text: 'Menu', value: 'Menu' },
    { text: 'Excel', value: 'Excel' }
];
  private modes: { [key: string]: Object }[] = [
    { text: 'Parent', value: 'Parent' },
    { text: 'Child', value: 'Child' },
    { text: 'Both', value: 'Both' },
    { text: 'None', value: 'None' },
  ];

  public onChange(sel: ChangeEventArgs): void {
    let type:any = sel.value.toString();
    this.treegridInstance.filterSettings.type = type;
    this.treegridInstance.clearFiltering();
  }
  public onChange2(sel: ChangeEventArgs): void {
    let mode:any = sel.value.toString();
    this.treegridInstance.filterSettings.hierarchyMode = mode;
    this.treegridInstance.clearFiltering();
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
           <TreeGridComponent dataSource={sampleData} ref={treegrid => this.treegridInstance = treegrid} treeColumnIndex={1}
            childMapping= 'subtasks' allowPaging='true' allowFiltering='true'
            filterSettings={{ type:'Menu', hierarchyMode:'Parent'}}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='90' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='180'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
            </ColumnsDirective>
            <Inject services={[Filter, Page]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '10px'}}> Filter Type </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                         <DropDownListComponent width="120px" id="seltype" change={this.onChange.bind(this)}
                            dataSource={this.filterType} value="Menu" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '10px'}}> Hierarchy Mode </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                         <DropDownListComponent width="120px" id="selmode" change={this.onChange2.bind(this)}
                            dataSource={this.modes} value="Parent" />
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
         </div>
        </div>
        <div id="action-description">
          <p> This sample demonstrates the way of filtering TreeGrid columns using menu and excel filter UI. In this sample,
            click the filtering icon from column header to show filter UI for a particular column. You can change the filter type
            from the properties panel.
          </p>
        </div>
        <div id="description">
          <p>The filtering feature enables the user to view the reduced amount of records based on filter criteria. It can be enabled
            by setting <code>allowFiltering</code> property as true.</p>
            <p>TreeGrid supports the following filter types. They are </p>
        <ul>
            <li><code>FilterBar</code></li>
                <li><code>Menu</code></li>
                <li><code>Excel</code></li>
        </ul>
        you can change the filter type by setting <code>filterSettings->type</code>
          <p>TreeGrid provides support for a set of filtering modes with hierarchyMode property.
            The below are the type of filter mode available in TreeGrid. </p>
          <ul>
            <li><code>Parent</code> - This is the default filter hierarchy mode in TreeGrid.The filtered records are displayed with its
                parent records, if the filtered records not have any parent record then the filtered record only displayed.</li>
            <li><code>Child</code> - The filtered records are displayed with its child record, if the filtered records do not have any
                child record then only the filtered records are displayed.</li>
            <li><code>Both</code> - The filtered records are displayed with its both parent and child record.
                If the filtered records do not have any parent and child record then only the filtered records are displayed.</li>
            <li><code>None</code> - Only the filtered records are displayed.</li>
          </ul>
          <p> In this demo, filter menu enabled by default, you can switch to other hierarchy mode of filtering by using dropdown.</p>
          <p>Injecting Module:</p>
          <p>
            TreeGrid features are segregated into individual feature-wise modules. To use filtering feature, we need to inject
            <code>Filter</code> module into the <code>services</code>.
          </p>
          <p>
            More information filter configuration can be found in this documentation section.
          </p>
        </div>
    </div>
    )
  }
}