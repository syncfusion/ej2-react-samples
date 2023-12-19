import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Toolbar,
  Column
} from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { IEditCell } from '@syncfusion/ej2-react-grids';
import { AutoComplete } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';

const EditTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbarOptions: any = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Row",
    newRowPosition: "Below",
  };
  const taskIDRule: Object = { required: true, number: true };
  const priorityRule: Object = { required: true };
  const dateRule: Object = { date: true };
  const durationRule: Object = { number: true, min: 0 };
  const editparams2: any = { params: { format: "n" } };
  let elem: HTMLElement;
  let autoCompleteobj: AutoComplete;
  let treegridObj = useRef<TreeGridComponent>(null);
  const editTemplate: IEditCell = {
    create: () => {
      elem = document.createElement("input");
      return elem;
    },
    read: () => {
      return autoCompleteobj.value;
    },
    destroy: () => {
      autoCompleteobj.destroy();
    },
    write: (args: { rowData: Object; column: Column }) => {
      autoCompleteobj = new AutoComplete({
        dataSource: treegridObj.current.grid.dataSource as {
          key: string;
          value: any;
        }[],
        fields: { value: "taskName" },
        value: args.rowData[args.column.field],
      });
      autoCompleteobj.appendTo(elem);
    },
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <TreeGridComponent
          dataSource={sampleData}
          treeColumnIndex={1}
          childMapping="subtasks"
          height="400"
          editSettings={editSettings}
          toolbar={toolbarOptions}
          ref={treegridObj}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="taskID"
              headerText="Task ID"
              width="80"
              textAlign="Right"
              validationRules={taskIDRule}
              isPrimaryKey={true}
            ></ColumnDirective>
            <ColumnDirective
              field="taskName"
              headerText="Task Name"
              width="200"
              edit={editTemplate}
            ></ColumnDirective>
            <ColumnDirective
              field="startDate"
              headerText="Start Date"
              width="140"
              textAlign="Right"
              editType="datepickeredit"
              format="yMd"
              validationRules={dateRule}
              type="date"
            />
            <ColumnDirective
              field="duration"
              headerText="Duration"
              width="140"
              editType="numericedit"
              textAlign="Right"
              validationRules={durationRule}
              edit={editparams2}
            />
            <ColumnDirective
              field="progress"
              headerText="Progress"
              width="150"
              textAlign="Right"
              editType="numericedit"
              validationRules={durationRule}
              edit={editparams2}
            />
            <ColumnDirective
              field="priority"
              headerText="Priority"
              width="130"
              textAlign="Right"
              editType="stringedit"
              validationRules={priorityRule}
            />
          </ColumnsDirective>
          <Inject services={[Edit, Toolbar]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This samples demonstrates the Tree Grid Cell Edit template feature.
          Using Cell Edit Template feature we have rendered the AutoComplete
          component for “<b>Task Name</b>” column.
        </p>
      </div>
      <div id="description">
        <p>
          The cell edit template is used to add a custom component for a
          particular column by invoking the following functions:
        </p>
        <ul>
          <li>
            <code>create</code> - It is used to create the element at the time
            of initialization.
          </li>
          <li>
            <code>write</code> - It is used to create the custom component or
            assign default value at the time of editing.
          </li>
          <li>
            <code>read</code> - It is used to read the value from the component
            at the time of save.
          </li>
          <li>
            <code>destroy</code> - It is used to destroy the component.
          </li>
        </ul>
        <p>
          In this demo, we have rendered the AutoComplete component for “Task
          Name” column of Tree Grid using <code>edit</code> property.
        </p>
        <p>
        <br/> More information about Cell Edit template can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/editing/template-editing">documentation section</a>.
        </p>
      </div>
    </div>
  );
}
export default EditTemplate;