import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const SAMPLE_CSS = `
  .fluent2,
  .fluent2-dark,
  .fluent2-highcontrast {
    #selectiondd1 .e-input-group {
      width: 110px !important;
    }
}`;

const Selection = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const [display, setDisplay] = useState<string>("none");
  let typeDropdownObj = useRef<DropDownListComponent>(null);
  let modeDropdownObj = useRef<DropDownListComponent>(null);
  let treegridObj = useRef<TreeGridComponent>(null);

  const types: { [key: string]: Object }[] = [
    { id: "Single", type: "Single" },
    { id: "Multiple", type: "Multiple" },
  ];

  const modes: { [key: string]: Object }[] = [
    { id: "Row", mode: "Row" },
    { id: "Cell", mode: "Cell" },
  ];

  const cellmodes: { [key: string]: Object }[] = [
    { id: "Flow", mode: "Flow" },
    { id: "Box", mode: "Box" },
  ];

  const typeChange = (args: ChangeEventArgs): void => {
    let type: any = args.value as string;
    let mode: any = modeDropdownObj.current.value as string;
    treegridObj.current.selectionSettings.type = type;
    if (type === "Multiple" && mode === "Cell") {
      setDisplay("table-row");
    } else {
      setDisplay("none");
    }
  };

  const modeChange = (args: ChangeEventArgs): void => {
    let mode: any = args.value;
    let type: any = typeDropdownObj.current.value as string;
    treegridObj.current.selectionSettings.mode = mode;
    if (type === "Multiple" && mode === "Cell") {
      setDisplay("table-row");
    } else {
      setDisplay("none");
    }
  };

  const cellmodeChange = (args: ChangeEventArgs): void => {
    let cellmode: any = args.value as string;
    treegridObj.current.selectionSettings.cellSelectionMode = cellmode;
  };
  return (
    <div className="control-pane">
      {/* custom code start */}
      <style>
          {SAMPLE_CSS}
        </style>
        {/* custom code end */}
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sampleData}
            treeColumnIndex={1}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            allowSelection={true}
            selectionSettings={{ type: "Multiple" }}
            pageSettings={{ pageSize: 10 }}
            ref={treegridObj}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="80"
                textAlign="Right"
              ></ColumnDirective>
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="200"
              ></ColumnDirective>
              <ColumnDirective
                field="startDate"
                headerText="Start Date"
                width="100"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="progress"
                headerText="Progress"
                width="90"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Page]} />
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
                <tr>
                  <td style={{ width: "30%" }}>
                    <div style={{ paddingTop: "7px", paddingLeft: "2px" }}>
                      {" "}
                      Selection Type{" "}
                    </div>
                  </td>
                  <td style={{ width: "70%", paddingRight: "10px" }}>
                    <div id='selectiondd1'>
                      <DropDownListComponent
                        width="100px"
                        id="type"
                        change={typeChange.bind(this)}
                        dataSource={types}
                        fields={{ text: "type", value: "id" }}
                        value="Multiple"
                        ref={typeDropdownObj}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30%", paddingLeft: "2px" }}>
                    <div> Selection Mode </div>
                  </td>
                  <td style={{ width: "70%" }}>
                    <div style={{ paddingRight: "10px", paddingBottom: "10px" }}>
                      <DropDownListComponent
                        width="100px"
                        id="mode"
                        change={modeChange.bind(this)}
                        dataSource={modes}
                        fields={{ text: "mode", value: "id" }}
                        value="Row"
                        ref={modeDropdownObj}
                      />
                    </div>
                  </td>
                </tr>
                <tr id="cellselection" style={{ display: display }}>
                  <td style={{ width: "30%" }}>
                    <div> Cell Selection Mode </div>
                  </td>
                  <td style={{ width: "70%" }}>
                    <div style={{ paddingRight: "10px", paddingBottom: "10px" }}>
                      <DropDownListComponent
                        width="100px"
                        id="cellmode"
                        change={cellmodeChange.bind(this)}
                        dataSource={cellmodes}
                        fields={{ text: "mode", value: "id" }}
                        value="Flow"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the selection feature in Grid, which allows
            you to select row or cell through simple mouse down or keyboard
            interaction.
          </p>
        </div>
        <div id="description">
          <p>
            Selection provides an interactive support to highlight the row or
            cell that you select. Selection can be done through a simple Mouse
            down or Keyboard interaction.To enable selection, set{" "}
            <code>allowSelection</code> as true.
          </p>
          <p>
            Tree Grid supports two types of selection which can be set using{" "}
            <code>selectionSettings-&gt;type</code> property. They are,
          </p>
          <ul>
            <li>
              <code>Single</code> - Enabled by default. Allows the user to
              select single row/cell at a time.
            </li>
            <li>
              <code>Multiple</code> - Allows the user to select more than one
              row/cell at a time.
            </li>
          </ul>
          <p>
            Also, supports three modes of selection which can be set using{" "}
            <code>selectionSettings-&gt;mode property</code>. They are,
          </p>
          <ul>
            <li>
              <code>Row</code> - Enabled by default. Enables the row selection
              in Grid.
            </li>
            <li>
              <code>Cell</code> - Enables the cell selection in Grid.
            </li>
            <li>
              <code>Both</code> - Enables both the row and cell selection in
              Grid. Clicking any cell will select both row and cell
              simultaneously
            </li>
          </ul>
          <p>
            The Tree Grid supports two types of cell selection mode that can be
            set by using the
            <code>selectionSettings.cellSelectionMode</code>. They are:
          </p>
          <ul>
            <li>
              <code>flow</code> - The Flow value is set by default. The range of
              cells are selected between the start index and end index that
              includes in between cells of rows.
            </li>
            <li>
              <code>box</code> - Range of cells are selected from the start and
              end column indexes that includes in between cells of rows within
              the range.
            </li>
          </ul>
          <p>
            To perform the multi-selection, hold CTRL key and click the desired
            rows/cells. To select range of rows/cells, hold SHIFT key and click
            the rows/cells.
          </p>
          <p>
            While using the Tree Grid in a touch device environment, there is an
            option for multi-selection through single tap on the row and it will
            show a popup with the multi-selection symbol.Tap the icon to enable
            multi-selection in a single tap.
          </p>
          <p>
            In this demo, select the selection type and selection mode from the
            properties panel to do the selection. The cell selection mode
            dropdown is enabled only when we select type as multiple and mode as
            cell in property panel.
          </p>
          <p>
            More information on the selection configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/selection/selection">documentation section</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Selection;