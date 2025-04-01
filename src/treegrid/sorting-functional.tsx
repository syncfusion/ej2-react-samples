import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Sort } from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SortEventArgs } from '@syncfusion/ej2-react-grids';
import { sortData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Sorting = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  let orderNameObj = useRef<CheckBoxComponent>(null);
  let categoryObj = useRef<CheckBoxComponent>(null);
  let orderDateObj = useRef<CheckBoxComponent>(null);
  let unitsObj = useRef<CheckBoxComponent>(null);

  const sortingOptions: Object = {
    columns: [
      { field: "Category", direction: "Ascending" },
      { field: "orderName", direction: "Ascending" },
    ],
  };

  const orderNameChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      treegridObj.current.sortByColumn("orderName", "Ascending", true);
    } else {
      treegridObj.current.grid.removeSortColumn("orderName");
    }
  };

  const categoryChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      treegridObj.current.sortByColumn("Category", "Ascending", true);
    } else {
      treegridObj.current.grid.removeSortColumn("Category");
    }
  };

  const orderDateChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      treegridObj.current.sortByColumn("orderDate", "Ascending", true);
    } else {
      treegridObj.current.grid.removeSortColumn("orderDate");
    }
  };

  const unitsChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      treegridObj.current.sortByColumn("units", "Ascending", true);
    } else {
      treegridObj.current.grid.removeSortColumn("units");
    }
  };

  const sort = (args: SortEventArgs): void => {
    if (args.requestType === "sorting") {
      for (let columns of treegridObj.current.getColumns()) {
        for (let sortcolumns of treegridObj.current.sortSettings.columns) {
          if (sortcolumns.field === columns.field) {
            check(sortcolumns.field, true);
            break;
          } else {
            check(columns.field, false);
          }
        }
      }
    }
  };

  const check = (field: string, state: boolean): void => {
    switch (field) {
      case "orderName":
        orderNameObj.current.checked = state;
        break;
      case "Category":
        categoryObj.current.checked = state;
        break;
      case "orderDate":
        orderDateObj.current.checked = state;
        break;
      case "units":
        unitsObj.current.checked = state;
        break;
    }
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent
            dataSource={sortData}
            treeColumnIndex={0}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            allowSorting={true}
            sortSettings={sortingOptions}
            ref={treegridObj}
            actionComplete={sort.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="orderName"
                headerText="Order Name"
                width="220"
              ></ColumnDirective>
              <ColumnDirective
                field="Category"
                headerText="Category"
                width="150"
              ></ColumnDirective>
              <ColumnDirective
                field="orderDate"
                headerText="Order Date"
                width="130"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="units"
                headerText="Units"
                width="130"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort]} />
          </TreeGridComponent>
        </div>
        <div className="col-md-3 property-section">
          <table
            id="property"
            title="Properties"
            className="property-panel-table"
            style={{ width: "100%" }}
          >
            <tbody>
              <tr>
                <td style={{ width: "70%" }}>
                  <div> Order Name</div>
                </td>
                <td style={{ width: "30%", padding: "10px 10px 10px 0px" }}>
                  <div className="col-md-6">
                    <CheckBoxComponent
                      checked={true}
                      change={orderNameChange.bind(this)}
                      ref={orderNameObj}
                    ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: "70%" }}>
                  <div> Category </div>
                </td>
                <td style={{ width: "30%", padding: "10px 10px 10px 0px" }}>
                  <div className="col-md-6">
                    <CheckBoxComponent
                      checked={true}
                      change={categoryChange.bind(this)}
                      ref={categoryObj}
                    ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: "70%" }}>
                  <div> Order Date </div>
                </td>
                <td style={{ width: "30%", padding: "10px 10px 10px 0px" }}>
                  <div className="col-md-6">
                    <CheckBoxComponent
                      change={orderDateChange.bind(this)}
                      ref={orderDateObj}
                    ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: "70%" }}>
                  <div> Units </div>
                </td>
                <td style={{ width: "30%", padding: "10px 10px 10px 0px" }}>
                  <div className="col-md-6">
                    <CheckBoxComponent
                      change={unitsChange.bind(this)}
                      ref={unitsObj}
                    ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the Tree Grid multi sorting feature. To
            sort two or more columns, hold the CTRL key and click the column
            header.
          </p>
        </div>
        <div id="description">
          <p>
            Sorting feature enables us to order the data in a particular
            direction. It can be enabled by setting the{" "}
            <code>allowSorting</code> as true.
          </p>
          <p className="e-grid" style={{ border: "none" }}>
            To sort a Tree Grid column by simply click the column header. The
            icons <span className="e-icons e-icon-ascending"></span>(ascending)
            and <span className="e-icons e-icon-descending"></span>(descending)
            specifies the sort direction of a column.
          </p>
          <p>
            By default, multi-sorting is enabled in Tree Grid, to sort multiple
            column hold <strong>CTRL</strong> key and click the column header.
            To clear sort for a column, hold <strong>SHIFT</strong> key and
            click the column header.
          </p>
          <p>
            {" "}
            While using Tree Grid in a touch device, you have an option for
            multi sorting in single tap on the Tree Grid header. By tapping on
            the Tree Grid header, it will show the toggle button in small popup
            with sort icon. Now tap the button to enable the multi-sorting in
            single tap.
          </p>
          <p>In this demo, </p>
          <ul>
            <li>Simply click the column header to sort a column.</li>
            <li>
              Check the checkboxes in the properties panel to sort a column and
              uncheck to remove sort from a column.
            </li>
          </ul>
          <p>Injecting Module:</p>
          <p>
            Tree Grid features are segregated into individual feature-wise
            modules. To use sorting feature, we need to inject
            <code>Sort</code> module into the <code>services</code>.
          </p>
          <p>
            More information on the sorting feature configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/sorting">documentation section</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Sorting;
