import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Reorder, Sort, Edit } from '@syncfusion/ej2-react-treegrid';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
{/* custom code start */ }
const SAMPLE_CSS = `
    #EventLog b{
      color: #388e3c;
    }
    hr {
      margin: 1px 10px 1px 0px;
      border-top: 1px solid #eee;
    }`;
{/* custom code end */ }
const Events = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  const editparams2: any = { params: { format: "n" } };
  const taskNameRule: Object = { required: true };

  const created = (): void => {
    appendElement("Tree Grid <b>created</b> event called<hr>");
  };
  const collapsing = (): void => {
    appendElement("Tree Grid <b>collapsing</b> event called<hr>");
  };
  const collapsed = (): void => {
    appendElement("Tree Grid <b>collapsed</b> event called<hr>");
  };
  const expanded = (): void => {
    appendElement("Tree Grid <b>expanded</b> event called<hr>");
  };
  const expanding = (): void => {
    appendElement("Tree Grid <b>expanding</b> event called<hr>");
  };
  const beginEdit = (): void => {
    appendElement("Tree Grid <b>beginEdit</b> event called<hr>");
  };
  const columnDragStart = (): void => {
    appendElement("Tree Grid <b>columnDragStart</b> event called<hr>");
  };
  const columnDrop = (): void => {
    appendElement("Tree Grid <b>columnDrop</b> event called<hr>");
  };
  const columnDrag = (): void => {
    appendElement("Tree Grid <b>columnDrag</b> event called<hr>");
  };
  const load = (): void => {
    appendElement("Tree Grid <b>load</b> event called<hr>");
  };
  const create = (): void => {
    appendElement("Tree Grid <b>create</b> event called<hr>");
  };
  const actionBegin = (): void => {
    appendElement("Tree Grid <b>actionBegin</b> event called<hr>");
  };
  const actionComplete = (): void => {
    appendElement("Tree Grid <b>actionComplete</b> event called<hr>");
  };
  const dataBound = (): void => {
    appendElement("Tree Grid <b>dataBound</b> event called<hr>");
  };
  const rowSelecting = (): void => {
    appendElement("Tree Grid <b>rowSelecting</b> event called<hr>");
  };
  const rowSelected = (): void => {
    appendElement("Tree Grid <b>rowSelected</b> event called<hr>");
  };
  const rowDeselecting = (): void => {
    appendElement("Tree Grid <b>rowDeselecting</b> event called<hr>");
  };
  const rowDeselected = (): void => {
    appendElement("Tree Grid <b>rowDeselected</b> event called<hr>");
  };

  const appendElement = (html: string): void => {
    let span: HTMLElement = document.createElement("span");
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById("EventLog");
    log.insertBefore(span, log.firstChild);
  }

  const btnClick = (): void => {
    document.getElementById("EventLog").innerHTML = "";
  }
  return (
    <div className="control-pane">
      {/* custom code start */}
      <style>{SAMPLE_CSS}</style>
      {/* custom code end */}
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sampleData}
            treeColumnIndex={1}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            ref={treegridObj}
            editSettings={{ allowEditing: true }}
            allowReordering={true}
            allowSorting={true}
            pageSettings={{ pageCount: 5 }}
            load={load.bind(this)}
            created={created.bind(this)}
            actionBegin={actionBegin.bind(this)}
            actionComplete={actionComplete.bind(this)}
            dataBound={dataBound.bind(this)}
            rowSelecting={rowSelecting.bind(this)}
            rowSelected={rowSelected.bind(this)}
            columnDrag={columnDrag.bind(this)}
            columnDragStart={columnDragStart.bind(this)}
            columnDrop={columnDrop.bind(this)}
            beginEdit={beginEdit.bind(this)}
            collapsing={collapsing.bind(this)}
            collapsed={collapsed.bind(this)}
            expanded={expanded.bind(this)}
            expanding={expanding.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                isPrimaryKey={true}
                width="100"
                textAlign="Right"
              ></ColumnDirective>
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="215"
                validationRules={taskNameRule}
              ></ColumnDirective>
              <ColumnDirective
                field="startDate"
                headerText="Start Date"
                width="160"
                type="date"
                format="yMd"
                textAlign="Right"
                editType="datepickeredit"
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="110"
                editType="numericedit"
                textAlign="Right"
                edit={editparams2}
              />
              <ColumnDirective
                field="progress"
                headerText="Progress"
                width="110"
                textAlign="Right"
                editType="numericedit"
                edit={editparams2}
              />
            </ColumnsDirective>
            <Inject services={[Page, Reorder, Sort, Edit]} />
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
              <tr>
                <td>
                  <div
                    className="eventarea"
                    style={{ height: "245px", overflow: "auto" }}
                  >
                    <span
                      className="EventLog"
                      id="EventLog"
                      style={{ wordBreak: "normal" }}
                    ></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="evtbtn" style={{ paddingBottom: "10px" }}>
                    <ButtonComponent onClick={btnClick.bind(this)}>
                      {" "}
                      Clear{" "}
                    </ButtonComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates all the events that have been triggered on
          all the Tree Grid operations with the help of Event Trace panel.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid triggers events based on its actions. The events can be
          used as an extension point to perform custom operations.
        </p>
        <p>
          In this demo, perform Tree Grid actions like paging, sorting,
          reordering, filtering etc. and see the <strong>Event Trace</strong>{" "}
          panel for the events emitted.
        </p>
        <p>
          More information on the Grid events can be found in the documentation
          section.
        </p>
      </div>
    </div>
  );
}
export default Events;