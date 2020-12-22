import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class Filtering extends SampleBase<{}, {}> {

  private treegridInstance: TreeGridComponent;
  private modes: { [key: string]: Object }[] = [
    { text: 'Parent', value: 'Parent' },
    { text: 'Child', value: 'Child' },
    { text: 'Both', value: 'Both' },
    { text: 'None', value: 'None' },
  ];

  public onChange(sel: ChangeEventArgs): void {
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
            childMapping= 'subtasks' height='350' allowPaging='true' allowFiltering='true'
            filterSettings={{ mode:'Immediate', type:'FilterBar', hierarchyMode:'Parent'}}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='90' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right' />
            </ColumnsDirective>
            <Inject services={[Filter, Page]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '10px'}}> Hierarchy Mode </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                         <DropDownListComponent width="120px" id="selmode" change={this.onChange.bind(this)}
                            dataSource={this.modes} value="Parent" />
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
         </div>
        </div>
        <div id="action-description">
          <p> This sample demonstrates the default support of filterbar in Tree Grid.In this sample, type the value
            in the filterbar and press enter to filter particular column.The filtering is based on hierarchy mode.</p>
        </div>
        <div id="description">
          <p>The filtering feature enables the user to view the reduced amount of records based on filter criteria. It can be enabled
            by setting <code>allowFiltering </code> property as true. A filter bar row will be rendered next to header which allows the
            end-users to filter data by entering text within its cells.</p>
          <p>Filterbar uses two modes which specifies how to start filtering. They are,</p>
          <ul>
            <li><code>OnEnter</code> - Enabled by default, filter will be initiated after pressing <code>Enter</code> key.</li>
            <li><code>Immediate</code> - Filter will start after user ends typing. This uses a time delay of <i>1500ms</i> to initiate
              filter after use stops typing. It can be overridden using the <code>filterSettings->immediateModeDelay
              </code> property.</li>
          </ul>
          <p>Tree Grid provides support for a set of filtering modes with <code>hierarchyMode</code> property. The below are the
            type of filter mode available in Tree Grid.</p>
          <ul>
            <li><code>Parent</code> - This is the default filter hierarchy mode in Tree Grid. The filtered records are displayed with its
              parent records, if the filtered records not have any parent record then the filtered record only displayed.</li>
            <li><code>Child</code> - The filtered records are displayed with its child record, if the filtered records do not have any child
              record then only the filtered records are displayed.</li>
            <li><code>Both</code> - The filtered records are displayed with its both parent and child record.
              If the filtered records do not have any parent and child record then only the filtered records are displayed.</li>
            <li><code>None</code> - Only the filtered records are displayed.</li>
          </ul>
          <br/>
          <p>Injecting Module:</p>
          <p>
            Tree Grid features are segregated into individual feature-wise modules. To use filtering feature, we need to inject
            <code>Filter</code> module into the <code>services</code>.
          </p>
          <p>
            More information on the filter configuration can be found in this documentation section.
          </p>
      </div>
    </div>
    )
  }
}