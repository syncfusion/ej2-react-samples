import * as React from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  Inject,
  Toolbar,
  Edit,
  TreeGridComponent
} from '@syncfusion/ej2-react-treegrid';
import {
  DropDownListComponent
} from '@syncfusion/ej2-react-dropdowns';
import type { ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import type { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { showCheckBoxData } from './data';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS: string = `
.e-bigger.bootstrap5 .e-treegrid .e-hierarchycheckbox .e-frame,
.e-bigger.bootstrap5-dark .e-treegrid .e-hierarchycheckbox .e-frame,
.e-bigger.bootstrap4 .e-treegrid .e-hierarchycheckbox .e-frame {
height: 17px;
width: 17px;
}
.checkboxprop {
padding-bottom: 8px;
}
.checkboxprop > .checkboxmode {
display: flex;
align-items: center;
gap: 12px;
}
.checkboxprop > .checkboxmode > span {
display: inline-block;
font-size: 14px;
white-space: nowrap;
}
.checkboxprop > .checkboxmode > .checkboxmode {
display: block;
flex: 0 0 180px;
width: 180px;
}
.checkboxprop .e-dropdownlist {
width: 100% !important;
}
.status-badge {
display: inline-block;
padding: 4px 10px;
border-radius: 12px;
font-size: 12px;
font-weight: 600;
}
.completed {
background: #dcfce7;
color: #15803d;
}
.in-progress {
background: #dbeafe;
color: #1d4ed8;
}
.not-started {
background: #f3f4f6;
color: #4b5563;
}
.under-review {
background: #fef3c7;
color: #b45309;
}
.blocked {
background: #fee2e2;
color: #dc2626;
}
`;
interface HierarchyModeData {
  [key: string]: string;
  id: string;
  name: string;
}
interface TaskData {
  taskID: number;
  taskName: string;
  assignee: string;
  designation: string;
  priority: string;
  status: string;
  progress: string;
  expanded?: boolean;
  subTasks?: TaskData[];
}
/**
* Hierarchy Checkbox Mode TreeGrid sample.
*/
export class CheckboxSelection extends SampleBase<{}, {}> {
  private treeGridObj: TreeGridComponent | null = null;
  private hierarchyModeData: HierarchyModeData[] = [
    { id: 'Self', name: 'Self' },
    { id: 'Hierarchy', name: 'Hierarchy' },
    {
      id: 'FilteredHierarchy',
      name: 'Filtered Hierarchy'
    }
  ];
  private hierarchyModeFields: Object = {
    text: 'name',
    value: 'id'
  };
  private hierarchyModeChange(args: ChangeEventArgs): void {
    if (!this.treeGridObj) {
      return;
    }
    if (args.value === 'Hierarchy') {
      this.treeGridObj.hierarchyCheckboxMode = 'hierarchy';
    } else if (args.value === 'FilteredHierarchy') {
      this.treeGridObj.hierarchyCheckboxMode =
        'filteredHierarchy';
    } else {
      this.treeGridObj.hierarchyCheckboxMode = 'self';
    }
    this.treeGridObj.dataBind();
  }
  private editSettings: any = {
    allowDeleting: true,
  };
  private queryCellInfo(args: QueryCellInfoEventArgs): void {
    if (
      args.column?.field !== 'status' ||
      !args.cell ||
      !args.data
    ) {
      return;
    }
    const taskData: TaskData = args.data as TaskData;
    const statusClass: string = taskData.status
      .toLowerCase()
      .replace(/\s+/g, '-');
    args.cell.innerHTML = `
<span class="status-badge ${statusClass}">
${taskData.status}
</span>
`;
  }
  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <div>
            <div className="checkboxprop">
              <div className="checkboxmode">
                <span>
                  Hierarchy Checkbox Mode
                </span>
                <div className="checkboxmode">
                  <DropDownListComponent
                    id="hierarchyModes"
                    dataSource={
                      this.hierarchyModeData
                    }
                    fields={
                      this.hierarchyModeFields
                    }
                    value="Self"
                    width="180px"
                    change={this
                      .hierarchyModeChange
                      .bind(this)}
                    htmlAttributes={{
                      tabindex: '1'
                    }}
                  />
                </div>
              </div>
            </div>
            <TreeGridComponent
              id="TreeGrid"
              ref={(
                treeGrid: TreeGridComponent
              ): void => {
                this.treeGridObj = treeGrid;
              }}
              dataSource={showCheckBoxData}
              childMapping="subTasks"
              treeColumnIndex={1}
              hierarchyCheckboxMode="self"
              toolbar={['Search', 'Delete']}
              allowFiltering={true}
              editSettings={this.editSettings}
              height={380}
              queryCellInfo={
                this.queryCellInfo.bind(this)
              }
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="taskID"
                  visible={false}
                  isPrimaryKey={true}
                />
                <ColumnDirective
                  field="taskName"
                  headerText="Task Name"
                  width={270}
                  showCheckbox={true}
                />
                <ColumnDirective
                  field="assignee"
                  headerText="Employee"
                  width={180}
                />
                <ColumnDirective
                  field="designation"
                  headerText="Designation"
                  width={220}
                />
                <ColumnDirective
                  field="priority"
                  headerText="Priority"
                  width={140}
                />
                <ColumnDirective
                  field="status"
                  headerText="Status"
                  width={120}
                  textAlign="Center"
                />
                <ColumnDirective
                  field="progress"
                  headerText="Progress"
                  width={120}
                  textAlign="Right"
                />
              </ColumnsDirective>
              <Inject
                services={[Filter, Toolbar, Edit]}
              />
            </TreeGridComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates hierarchical checkbox selection in the TreeGrid
            using the <code>hierarchyCheckboxMode</code> property.
          </p>
        </div>
       <div id="description">
    <p>
        Checkboxes are displayed in the Tree Grid tree column by enabling the
        <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/treegridcolumn#showcheckbox">showCheckbox</a></code>
        property. The checkbox selection behavior across hierarchical records is controlled through the
        <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#hierarchycheckboxmode">hierarchyCheckboxMode</a></code>
        property.
    </p>

    <p>
        In <strong>self</strong> mode, selecting a checkbox affects only the clicked row.
        In <strong>hierarchy</strong> mode, selecting a parent row automatically selects all its child rows, and changes made to child rows are reflected in their parent rows.
        The <strong>filteredHierarchy</strong> mode behaves similarly to hierarchy mode but applies selection only to the rows currently visible after filtering or searching.
    </p>

    <p>
        On touch-enabled devices, checkboxes can be selected or cleared by tapping them directly.
    </p>

    <p>
        More information on checkbox column can be found in this<a target="_blank" 
        href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/columns#checkbox-column"> documentation section</a>.
    </p>

    <p>
        Looking for the full React Tree Grid component overview, features, pricing, and documentation?
        Visit our<a target="_blank" href="https://www.syncfusion.com/react-components/react-tree-grid"> React Tree Grid component </a>page.
    </p>
</div>
      </div>
    );
  }
}
export default CheckboxSelection;