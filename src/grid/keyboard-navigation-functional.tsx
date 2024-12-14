import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject, Filter, Sort, Group } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';
import './keyboard-nav.css';

function KeyboardNavigation() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  const editparams: any = { params: { popupHeight: '300px' } };
  const validationRules = { required: true };
  const orderidRules: Object = { required: true, number: true };
  const pageSettings: Object = { pageCount: 5 };
  const filterSettings: any = { type: 'Menu' };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={data} toolbar={toolbarOptions} allowPaging={true} allowFiltering={true} editSettings={editSettings} pageSettings={pageSettings} filterSettings={{ type: 'Menu' }}
          allowSorting={true} allowGrouping={true}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={validationRules}></ColumnDirective>
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit'></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' textAlign='Right' editType='datepickeredit' format='yMd' width='170' allowGrouping={false} ></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={editparams} ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Filter, Sort, Group]} />
        </GridComponent>
        <div id="action-description">
          <p>Keyboard shortcuts can be used to interact with DataGrid functionality. In the example below, various key combinations can be used to interact with the grid.</p>
        </div>
        <div id="description">
          <ul>
            <li><b>FOCUS ELEMENTS</b>
              <ul>
                <li><span className="keys"><kbd>Home</kbd></span><span className="keydescription">- Moves the focus to the first cell of the focused row.</span></li>
                <li><span className="keys"><kbd>End</kbd></span><span className="keydescription">- Moves the focus to the last cell of the focused row.</span></li>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>Home</kbd></span><span className="keydescription">- Moves the focus to the first Cell of the first row in our DataGrid component.</span> </li>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>End</kbd></span><span className="keydescription">- Moves the focus to the last Cell of the last row in our DataGrid component.</span> </li>
                <li><span className="keys"><kbd>Down arrow</kbd></span><span className="keydescription">- Moves the cell focus downward from the focused cell.</span></li>
                <li><span className="keys"><kbd>Up arrow</kbd></span><span className="keydescription">- Moves the cell focus upward from the focused cell.</span> </li>
                <li><span className="keys"><kbd>Right arrow</kbd>/<kbd>Tab</kbd></span><span className="keydescription">- Moves the cell focus right side from the focused cell.</span></li>
                <li><span className="keys"><kbd>Left arrow</kbd>/<kbd>Shift</kbd>+<kbd>Tab</kbd></span><span className="keydescription">- Moves the cell focus left side from the focused cell.</span></li>
                <li><span className="keys"><kbd>Alt</kbd>+<kbd>J</kbd></span><span className="keydescription">- Moves the focus to the entire grid. </span> </li>
                <li><span className="keys"><kbd>Alt</kbd>+<kbd>W</kbd></span><span className="keydescription">- Move the focus to the grid content element</span></li>
              </ul>
            </li>
          </ul>
          <hr />
          <ul>
            <li><b> PAGER</b>
              <ul>
                <li><span className="keys"><kbd>Page down</kbd> / <kbd>Right arrow</kbd></span><span className="keydescription">- Navigates to the next page.</span></li>
                <li><span className="keys"><kbd>Page up</kbd> / <kbd>Left arrow</kbd></span><span className="keydescription">- Navigates to the previous page.</span> </li>
                <li><span className="keys"><kbd>Enter</kbd> / <kbd>Space</kbd></span><span className="keydescription">- Select the currently focused page.</span></li>
                <li><span className="keys"><kbd>Tab</kbd></span><span className="keydescription">- Focus on the next pager item.</span></li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Tab</kbd></span><span className="keydescription">- Focus on the previous pager item.</span></li>
                <li><span className="keys"><kbd>Home</kbd> / <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Page up</kbd></span><span className="keydescription">- Navigates to the first page.</span></li>
                <li><span className="keys"><kbd>End</kbd> / <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Page down</kbd></span><span className="keydescription">- Navigates to the last page.</span></li>
              </ul>
            </li>
          </ul>
          <hr />
          <ul>
            <li><b>SELECTION</b>
              <ul>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Down arrow</kbd></span><span className="keydescription">- Extends the row/cell selection downwards from the selected row/cell.</span></li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Up arrow</kbd></span><span className="keydescription">- Extends the row/cell selection upwards from the selected row/cell.</span></li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Left arrow</kbd></span><span className="keydescription">- Extends the cell selection to the left side from the selected cell.</span></li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Right arrow</kbd></span><span className="keydescription">- Extends the cell selection to the right side from the selected cell.</span> </li>
                <li><span className="keys"><kbd>Enter</kbd></span><span className="keydescription">- Moves the row/cell selection upward from the selected row.</span></li>
                <li><span className="keys"><kbd>Esc</kbd></span><span className="keydescription">- Deselects all the selected row/cells.</span></li>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>A</kbd></span><span className="keydescription">- Select all the row/cells in the current page.</span></li>
                <li><span className="keys"><kbd>Up arrow</kbd></span><span className="keydescription">- Moves up a row/cell selection from the selected row/cell.</span></li>
                <li><span className="keys"><kbd>Down arrow</kbd></span><span className="keydescription">- Moves down a row/cell selection from the selected row/cell.</span></li>
                <li><span className="keys"><kbd>Right arrow</kbd></span><span className="keydescription">- Moves to the right cell selection from the selected cell.</span></li>
                <li><span className="keys"><kbd>Left arrow</kbd></span><span className="keydescription">- Moves to the left cell selection from the selected cell.</span></li>
              </ul>
            </li>
          </ul>
          <hr />
          <ul>
            <li><b>EDITING</b>
              <ul>
                <li><span className="keys"><kbd>F2</kbd></span><span className="keydescription">- Starts editing of selected row if Mode is Normal/Dialog or Starts editing of selected cell if Mode is Batch.</span></li>
                <li><span className="keys"><kbd>Enter</kbd></span><span className="keydescription"></span>- Saves the current form it the Mode is Normal or Dialog / Saves the current cell and starts editing the next row cell if Mode is Batch.</li>
                <li><span className="keys"><kbd>Del</kbd></span><span className="keydescription"></span>- Deletes the current selected record.</li>
                <li><span className="keys"><kbd>Insert</kbd></span><span className="keydescription"></span>- Creates a new add form depending on the NewRowPosition.</li>
                <li><span className="keys"><kbd>Tab</kbd></span><span className="keydescription"></span>- Navigates to the next editable cell if the Mode is Normal or Dialog / Saves the current cell and starts editing the next cell is Mode is Batch.</li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Tab</kbd></span><span className="keydescription"></span>- Navigates to the previous editable cell if the Mode is Normal or Dialog / Saves the current cell and starts editing the previous cell is Mode is Batch</li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Enter</kbd></span><span className="keydescription"></span>- Saves the current cell and starts editing the previous row cell if Mode is Batch.</li>
              </ul>
            </li>
          </ul>
          <hr />
          <ul>
            <li> <b>FILTERING</b>
              <ul>
                <li><span className="keys"><kbd>Alt</kbd>+<kbd>Down arrow</kbd></span><span className="keydescription">- Opens the filter menu excel, menu and checkbox filter when its header element is in focused state.</span> </li>
              </ul>
            </li>
          </ul>
          <hr />
          <ul>
            <li><b>SORTING</b>
              <ul>
                <li><span className="keys"><kbd>Enter</kbd></span><span className="keydescription">- Performs sorting, ascending/descending on a column when its header element is in focused state.</span> </li>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>Enter</kbd></span><span className="keydescription">- Performs multi-sorting on a column when its header element is in focused state.</span></li>
                <li><span className="keys"><kbd>Shift</kbd>+<kbd>Enter</kbd></span><span className="keydescription">- Clears sorting for the focused header column.</span> </li>
              </ul>
            </li>
          </ul>
          <hr />
          <ul>
            <li><b>GROUPING</b>
              <ul>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>Down arrow</kbd></span><span className="keydescription"></span>- Expands all the Visible Group.</li>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>Up arrow</kbd></span><span className="keydescription"></span>- Collapses all the visible groups.</li>
                <li><span className="keys"><kbd>Ctrl</kbd>+<kbd>Space</kbd></span><span className="keydescription"></span>- Performs grouping when focused on a header element.</li>
                <li><span className="keys"><kbd>Enter</kbd></span><span className="keydescription"></span>- If the current cell is an expand/collapse cell then expands/collapses the current group/detailrow/childgrid.</li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </div>
  );
}
export default KeyboardNavigation;