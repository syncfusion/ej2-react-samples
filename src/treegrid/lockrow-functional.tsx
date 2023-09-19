import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData, lockRowDropDownData } from './data';
import { RowDataBoundEventArgs, BeginEditArgs } from '@syncfusion/ej2-react-grids';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { addClass, removeClass } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
.material .disableRow .e-rowcell{
    color: rgba(0, 0, 0, .38) !important;
  }`;
{/* custom code start */ }
const SAMPLE1_CSS = `
.material-dark .disableRow .e-rowcell{
  color: #757575 !important;
}
.material3 .disableRow .e-rowcell{
  color: rgba(0, 0, 0, .38) !important;
}
.material3-dark .disableRow .e-rowcell{
  color: #757575 !important;
}
.fabric .disableRow .e-rowcell{
  color: #c8c8c8 !important;
}
.fabric-dark .disableRow .e-rowcell{
  color: #757575 !important;
}    
.bootstrap .disableRow .e-rowcell{
  color: rgba(0, 0, 0, .35) !important;
}
.bootstrap-dark .disableRow .e-rowcell{
  color: #757575 !important;
}
.bootstrap4 .disableRow .e-rowcell{
  color: rgba(0, 0, 0, .35) !important;
}
.bootstrap5 .disableRow .e-rowcell{
  color: rgba(0, 0, 0, .35) !important;
}
.bootstrap5-dark .disableRow .e-rowcell{
  color: #757575 !important;
}
.highcontrast .disableRow .e-rowcell{
  color: #757575 !important;
}
.tailwind .disableRow .e-rowcell{
  color: #757575 !important;
}
.tailwind-dark .disableRow .e-rowcell{
  color: #757575 !important;
}
.e-multiselect {
  padding-left : 0px !important;
  padding-top: 0px !important;
}
`;
{/* custom code end */ }
const LockRow = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  let multiselectObj = useRef<MultiSelectComponent>(null);
  const toolbarOptions: any = ["Edit", "Update", "Cancel"];
  const editSettings: any = {
    allowEditing: true,
    mode: "Row",
    newRowPosition: "Child",
  };
  const editparams: any = { params: { popupHeight: "300px" } };
  const validationRule: Object = { required: true, number: true };
  const validationRule1: Object = { required: true };
  const validationRule2: Object = { date: true };
  const validationRule3: Object = { number: true, min: 0 };
  const editparams2: any = { params: { format: "n" } };
  const pageSettings: Object = { pageSize: 2, pageSizeMode: "Root" };
  const rowValues: number[] = [2, 6];

  const rowDataBound = (args: RowDataBoundEventArgs): void => {
    let key: string = "taskID";
    if (
      (multiselectObj.current.value as Object[]).indexOf(args.data[key]) !== -1
    ) {
      addClass([args.row], "disableRow");
    } else {
      removeClass([args.row], "disableRow");
    }
  };

  const beginEdit = (args: BeginEditArgs): void => {
    let key: string = "taskID";
    if (
      (multiselectObj.current.value as Object[]).indexOf(args.rowData[key]) !==
      -1
    ) {
      args.cancel = true;
    }
  };

  const select = (): void => {
    treegridObj.current.refresh();
  };

  const removed = (): void => {
    treegridObj.current.refresh();
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      {/* custom code start */}
      <style>{SAMPLE1_CSS}</style>
      {/* custom code end */}
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sampleData}
            treeColumnIndex={1}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            editSettings={editSettings}
            pageSettings={pageSettings}
            toolbar={toolbarOptions}
            enableHover={false}
            rowDataBound={rowDataBound.bind(this)}
            ref={treegridObj}
            beginEdit={beginEdit.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="100"
                textAlign="Right"
                validationRules={validationRule}
                isPrimaryKey={true}
              ></ColumnDirective>
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="220"
                validationRules={validationRule1}
              ></ColumnDirective>
              <ColumnDirective
                field="startDate"
                headerText="Start Date"
                width="130"
                textAlign="Right"
                editType="datepickeredit"
                format="yMd"
                validationRules={validationRule2}
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="140"
                editType="numericedit"
                textAlign="Right"
                validationRules={validationRule3}
                edit={editparams2}
              />
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar]} />
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
              <tr style={{ height: "50px" }}>
                <td style={{ width: "10%" }}>
                  <div style={{ paddingLeft: "0px" }}> Disable Rows </div>
                </td>
                <td style={{ width: "60%" }}>
                  <div>
                    <MultiSelectComponent
                      width="150px"
                      id="lockrows"
                      mode="CheckBox"
                      value={rowValues}
                      dataSource={lockRowDropDownData}
                      showDropDownIcon={true}
                      popupHeight="350px"
                      select={select.bind(this)}
                      removed={removed.bind(this)}
                      ref={multiselectObj}
                    >
                      <Inject services={[CheckBoxSelection]}></Inject>
                    </MultiSelectComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This samples demonstrates the way of preventing editing for certain
          row and disable the locked rows to differentiate edit and non-editable
          rows in Tree Grid.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid supports CRUD operations. This CRUD operations can be
          configured in Tree Grid using <code>editSettings</code>. Also, it has
          different modes to manipulate the datasource.
        </p>
        <p> The available modes are,</p>
        <ul>
          <li>
            <code>Row </code>
          </li>
          <li>
            <code>Cell</code>
          </li>
          <li>
            <code>Dialog</code>
          </li>
        </ul>
        <p>
          In this sample, we have provided an option in property panel to
          prevent editing for certain rows. Using <code>beginEdit</code>
          event of Tree Grid, we prevent the editing for selected Task ID row in
          the dropdown and disable the corresponding row using
          <code>rowDataBound</code> event of Tree Grid.
        </p>

        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use editing feature, we need to inject
          <code>Edit</code> module into the <code>services</code>.
        </p>
        <p>
          More information on the selection configuration can be found in this
          documentation section.
        </p>
      </div>
    </div>
  );
}
export default LockRow;