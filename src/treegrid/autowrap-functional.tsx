import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { textWrapData } from './data';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .e-bigger .e-treegrid .e-treegridexpand,
    .e-bigger .e-treegrid .e-treegridcollapse {
        width: 18px;
    }`;

const AutoWrap = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <TreeGridComponent
          dataSource={textWrapData}
          treeColumnIndex={1}
          allowPaging={true}
          childMapping="subtasks"
          allowTextWrap={true}
          pageSettings={{ pageSize: 11 }}
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
              width="98"
            ></ColumnDirective>
            <ColumnDirective
              field="startDate"
              headerText="Start Date"
              width="90"
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
            <ColumnDirective
              field="priority"
              headerText="Priority"
              width="90"
            />
          </ColumnsDirective>
          <Inject services={[Page]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the Tree Grid component with the auto wrap
          column cell feature. In this sample, you can see that Task Name column
          cell content exceeded the available width hence it has been wrapped
          into multiple lines.
        </p>
      </div>
      <div id="description">
        <p>
          Auto wrap cell content can be enabled using <code>allowTextWrap</code>{" "}
          property of the Tree Grid. Setting this property will wrap cell text
          on multiple lines.This feature is useful to view the cell content when
          it exceeds the cell width.
        </p>
        <p>
          Setting this property will wrap the text in both content cell and
          header cell.
        </p>
        <p>
          In this demo, the <code>allowTextWrap</code> property is enabled, and
          you can also see that the Task Name column whose content exceeded the
          cell width is wrapped into multiple lines.
        </p>
        <p>
          More information about Auto wrap cells can be found in this
          documentation section.
        </p>
      </div>
    </div>
  );
}
export default AutoWrap;