import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


function GridLines() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;

  const lines: { [key: string]: Object }[] = [
    { id: 'Horizontal', type: 'Horizontal' },
    { id: 'Vertical', type: 'Vertical' },
    { id: 'Both', type: 'Both' },
    { id: 'None', type: 'None' }
  ];

  function change(args: ChangeEventArgs): void {
    let lines: any = args.value.toString();
    treegridObj.gridLines = lines;
    treegridObj.refresh();
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true}
            ref={treegrid => treegridObj = treegrid} pageSettings={{ pageSize: 10 }} gridLines='Vertical'>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='100' type='date' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
            </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '60%' }}>
                  <div>
                    Grid Lines
                  </div>
                </td>
                <td style={{ width: '60%' }}>
                  <div>
                    <DropDownListComponent width="115px" id="selmode" change={change.bind(this)}
                      dataSource={lines} fields={{ text: 'type', value: 'id' }} value="Vertical" />
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates visibility of the Tree Grid lines that separates the rows and columns.
          In this sample, you can change the gridline from the properties panel.</p>
      </div>
      <div id='description'>
        <p>The <code>gridLines</code> property is used to control the line visibility that separates the rows and columns.
          Tree Grid allows us to display the following grid lines,
        </p>
        <ul>
          <li><code>Default</code> - Shows the Horizontal line.</li>
          <li><code>None</code> - Shows no line.</li>
          <li><code>Both</code> - Shows both Horizontal and Vertical lines.</li>
          <li><code>Horizontal</code> - Shows the Horizontal line.</li>
          <li><code>Vertical</code> - Shows the Vertical line.</li>
        </ul>
        <p> In this demo, you can modify the visibility of gridlines by selecting values in the dropdown.
        </p>
        <p>
          More information on the gridLines configuration can be found in this documentation section.
        </p>
      </div>
    </div>
  )
}
export default GridLines;