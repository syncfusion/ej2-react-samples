import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const Search = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridInstance = useRef<TreeGridComponent>(null);
  const modes: { [key: string]: Object }[] = [
    { text: "Parent", value: "Parent" },
    { text: "Child", value: "Child" },
    { text: "Both", value: "Both" },
    { text: "None", value: "None" },
  ];

  const onChange = (sel: ChangeEventArgs): void => {
    let mode: any = sel.value.toString();
    treegridInstance.current.search("");
    treegridInstance.current.searchSettings.hierarchyMode = mode;
  };

  const toolbarOptions: any = ["Search"];
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sampleData}
            ref={treegridInstance}
            treeColumnIndex={1}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            toolbar={toolbarOptions}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="70"
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
                width="90"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="80"
                textAlign="Right"
              />
              <ColumnDirective
                field="progress"
                headerText="Progress"
                width="80"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Filter, Page, Toolbar]} />
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
                    <div style={{ paddingTop: "10px" }}> Hierarchy Mode </div>
                  </td>
                  <td style={{ width: "70%" }}>
                    <div>
                      <DropDownListComponent
                        width="100px"
                        id="selmode"
                        change={onChange.bind(this)}
                        dataSource={modes}
                        value="Parent"
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
          {" "}
          This sample demonstrates the Tree Grid searching feature. In this
          sample, use the search box from toolbar to search Tree Grid records
          and the hierarchy mode of searching can be changed using property
          panel.
        </p>
      </div>

      <div id="description">
        <p>
          The Tree Grid has an option to search its content using the search
          method with search key as the parameter.
        </p>
        <p>
          The tree grid supports different types of search mode through the{" "}
          <code>searchSettings.hierarchyMode property</code>.
        </p>
        <p>
          The following are the types of search modes available in the tree
          grid.
        </p>
        <ul>
          <li>
            <code>Parent</code> - This is the default search hierarchy mode in
            the tree grid. It displays a searched record with its parent
            records. If the searched records do not have any parent record, it
            displays only the searched record.
          </li>
          <li>
            <code>Child</code> - Displays the searched record with its child
            record. If the searched records do not have any child record, it
            displays only the searched record.
          </li>
          <li>
            <code>Both</code> - Displays the searched record with both its
            parent and child records. If the searched records do not have any
            parent and child records, it displays only the searched record.
          </li>
          <li>
            <code>None</code> - Displays only the searched record.
          </li>
        </ul>
        <p>
          In this demo, The Tree Grid toolbar provides an option to search the
          Tree Grid's records. The user can type the text box in the toolbar and
          click search button or press Enter key to perform search operation.And
          also we have an option to change the searching hierarchy mode through
          the dropdown.
        </p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use searching feature, we need to inject{" "}
          <code>Filter</code>
          module into the <code>services</code>.
        </p>
        <p>
          More information on the searching configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/searching">documentation section</a>.
        </p>
      </div>
    </div>
  );
}
export default Search;