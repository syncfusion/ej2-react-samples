import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar, RowDD } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const Editing = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  const toolbarOptions: any = [
    "Add",
    "Delete",
    "Update",
    "Cancel",
    "Indent",
    "Outdent",
  ];
  const editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Cell",
    newRowPosition: "Below",
  };
  const validationRule: Object = { required: true };
  const validationRule1: Object = { date: true };
  const validationRule2: Object = { required: true, number: true };
  const editparams2: any = { params: { format: "n" } };
  const pageSettings: Object = { pageCount: 5 };
  const editing: { [key: string]: Object }[] = [
    { id: "CellEditing", name: "Cell Editing" },
    { id: "RowEditing", name: "Row Editing" },
  ];
  const change = (args: ChangeEventArgs): void => {
    if (args.value === "CellEditing") {
      treegridObj.current.editSettings.mode = "Cell";
      treegridObj.current.toolbar = [
        "Add",
        "Delete",
        "Update",
        "Cancel",
        "Indent",
        "Outdent",
      ];
    } else {
      treegridObj.current.editSettings.mode = "Row";
      treegridObj.current.toolbar = [
        "Add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
        "Indent",
        "Outdent",
      ];
    }
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sampleData}
            treeColumnIndex={1}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            selectedRowIndex={2}
            editSettings={editSettings}
            pageSettings={pageSettings}
            toolbar={toolbarOptions}
            ref={treegridObj}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="90"
                textAlign="Right"
                validationRules={validationRule2}
                isPrimaryKey={true}
              ></ColumnDirective>
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="220"
                validationRules={validationRule}
              ></ColumnDirective>
              <ColumnDirective
                field="startDate"
                headerText="Start Date"
                width="160"
                textAlign="Right"
                editType="datepickeredit"
                format="yMd"
                validationRules={validationRule1}
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="140"
                editType="numericedit"
                textAlign="Right"
                validationRules={validationRule2}
                edit={editparams2}
              />
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar, RowDD]} />
          </TreeGridComponent>
        </div>
        <div className="col-md-3 property-section">
          <PropertyPane title="Properties">
            <table
              id="property"
              title="Properties"
              className="property-panel-table"
              style={{ width: "100%" }}
            >
              <tbody>
                <tr style={{ height: "50px" }}>
                  <td style={{ width: "30%" }}>
                    <div> Edit Mode </div>
                  </td>
                  <td style={{ width: "70%" }}>
                    <div id="columnddl">
                      <DropDownListComponent
                        width="125px"
                        id="selmode"
                        change={change.bind(this)}
                        dataSource={editing}
                        fields={{ text: "name", value: "id" }}
                        value="CellEditing"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates CRUD operations in Tree Grid. You can perform
          CRUD operations as follows,
        </p>
        <ul>
          <li>
            <code>Add</code> - To add new record, click Add toolbar button{" "}
          </li>
          <li>
            <code>Edit</code> - To edit record, double click a row or click
            toolbar Edit button after selected a row{" "}
          </li>
          <li>
            <code>Delete</code> - To delete record, click toolbar Delete button
            after selected a row{" "}
          </li>
          <li>
            <code>Update</code>,<code>Cancel</code> - You can save or discard
            changes by click toolbar Update and cancel button respectively
          </li>
          <li>
            <code>Indent</code> - Indents the record to one level of hierarchy.
          </li>
          <li>
            <code>Outdent</code> - Outdent the record to one level of hierarchy.
          </li>
        </ul>
      </div>
      <div id="description">
        <p>
          The Tree Grid supports CRUD operations. This CRUD operations can be
          configured in Tree Grid using editSettings. Also, it has different
          modes to manipulate the datasource.
        </p>
        <ul>
          <li>
            <code>Row</code>
          </li>
          <li>
            <code>Cell</code>
          </li>
          <li>
            <code>Dialog</code>
          </li>
        </ul>
        <p>
          In this demo, Row mode is enabled for editing by default. You can
          start editing any row by double clicking on it or clicking on
          toolbar’s Edit button, then the currently selected row will be changed
          to edited state. You can change the row values and save edited data to
          the datasource.
        </p>
        <p>
          We have also provided an option in property panel to select the edit
          mode as Cell or Row to change <code>mode</code> of editing.
        </p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use editing feature, we need to inject
          <code>Edit</code> module into the <code>services</code>.
        </p>
        <p>
          To use indent and outdent feature, we need to inject
          <code>RowDD</code> module into the <code>services</code>.
        </p>
        <p>
          More information on the selection configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/editing/row-editing">documentation section</a>.
        </p>
      </div>
    </div>
  );
}
export default Editing;