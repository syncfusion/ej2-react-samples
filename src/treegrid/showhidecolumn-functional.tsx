import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Column } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


function ShowHideColumn() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;
  let dropdownObj: DropDownListComponent;
  let buttonObj: ButtonComponent;
  let buttonObj2: ButtonComponent;

  const columnsName: { [key: string]: Object }[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'duration', name: 'Duration' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'progress', name: 'Progress' }
  ];


  function btnClick() {
    let columnName: string = dropdownObj.value.toString();
    let column: Column = treegridObj.getColumnByField(columnName);
    if (treegridObj.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
      alert('Atleast one Column should be visible');
    } else {
      treegridObj.grid.hideColumns(column.headerText, 'headerText');
      let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
      hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
    }
  }

  function showClick() {
    let columnName: string = dropdownObj.value.toString();
    let column: Column = treegridObj.getColumnByField(columnName);
    treegridObj.grid.showColumns(column.headerText, 'headerText');
    let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
    hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true}
            ref={treegrid => treegridObj = treegrid} pageSettings={{ pageSize: 10 }}>
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
              <tr>
                <td style={{ width: '30%' }}>
                  <div> Column </div>
                </td>
                <td style={{ width: '70%', paddingRight: '10px' }}>
                  <div id='columnddl'>
                    <DropDownListComponent width="96px" id="ddlelement"
                      dataSource={columnsName} fields={{ text: 'name', value: 'id' }} value="taskID"
                      ref={dropdown => dropdownObj = dropdown} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    <ButtonComponent id='hide'
                      ref={button => buttonObj = button} onClick={btnClick.bind(this)}> Hide </ButtonComponent>
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <ButtonComponent id='show'
                      ref={button => buttonObj2 = button} onClick={showClick.bind(this)}> Show </ButtonComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div style={{ paddingTop: '10px' }}> Hidden Columns</div>
                </td>
                <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                  <div>
                    <textarea id='hiddencolumns' style={{ resize: 'none', height: '65px', width: '92px', backgroundColor: '#fff', padding: '6px' }}
                      className='form-control'></textarea>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the text alignment functionalities of the Tree Grid columns.</p>
      </div>
      <div id='description'>
        <p>The Tree Grid column can be showed/hidden dynamically using <code>showColumns
        </code> and <code>hideColumns</code> method of the Grid.</p>
        <p>In this demo, the columns can be showed and hidden by selecting the column name in the dropdown
          and click the Show or Hide buttons to toggle visibility. And the columns visibility is toggled based on the
          <code>columns-&gt;headerText</code> value.</p>
        <br />
        <p>The <code>columns-&gt;visible</code> property specifies the visibility of a column.
          To hide a column at the initial rendering, set the <code>columns-&gt;visible</code> property to false.</p>
      </div>
    </div>
  )
}
export default ShowHideColumn;