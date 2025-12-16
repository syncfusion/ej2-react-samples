import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-treegrid';
import { wrapData } from './data';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .e-bigger .e-treegrid .e-treegridexpand,
    .e-bigger .e-treegrid .e-treegridcollapse {
        width: 18px;
    }`;

const AutoWrap = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <TreeGridComponent
          dataSource={wrapData}
          treeColumnIndex={1}
          allowPaging={true}
          allowSorting={true}
          childMapping="subtasks"
          allowTextWrap={true}
          height='400'
          pageSettings={{ pageSize: 11 }}
          allowFiltering={true}
          filterSettings={{ type: 'Excel', hierarchyMode: 'Parent' }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="taskID"
              headerText="Task ID"
              width="140"
              textAlign="Right"
            ></ColumnDirective>
            <ColumnDirective
              field="taskName"
              headerText="Title"
              width="240"
            ></ColumnDirective>
            <ColumnDirective
              field="description"
              headerText="Description (Comprehensive Objectives for Deliverables)"
              width="370"
            />
            <ColumnDirective
              field="employeeName"
              headerText="Assigned To"
              width="180"
            />
            <ColumnDirective
              field="priority"
              headerText="Priority"
              width="150"
              textAlign="Center"
            />
            <ColumnDirective
              field="status"
              headerText="Status"
              width="130"
              textAlign="Center"
            />
            <ColumnDirective
              field="startDate"
              headerText="Start Date"
              width="160"
              type="date"
              format="yMd"
              textAlign="Right"
            />
            <ColumnDirective
              field="endDate"
              headerText="End Date"
              width="160"
              type="date"
              format="yMd"
              textAlign="Right"
            />
          </ColumnsDirective>
          <Inject services={[Page, Filter, Sort]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Tree Grid with the text wrap option enabled
          for both headers and cell content. This setting ensures that long header
          text and cell values are fully visible by wrapping onto multiple lines
          instead of being truncated with an ellipsis. </p>
      </div>

      <div id="description">
        <p>In this demo, the <strong>"Title"</strong> and <strong>"Description"</strong> columns
          exceeds the available width, so its header and cell content are wrapped
          across multiple lines for better readability. Text wrapping is enabled
          by setting the Tree Grid's <code><a aria-label="API link for documentation"
            target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/index-default#allowtextwrap">allowTextWrap</a></code>
          property to <strong>true</strong>, which automatically applies wrapping
          to both header and cell content.</p>
        <p>
          More information about text wrap can be found in this 
          <a target="_blank"
            href="https://ej2.syncfusion.com/react/documentation/treegrid/cell/cell#autowrap-the-treegrid-content">
            documentation
          </a> section.
        </p>
      </div>
    </div>
  );
};
export default AutoWrap;
