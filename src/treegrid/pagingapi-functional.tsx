import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { getObject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const PagingAPI = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  let sizemodeObj = useRef<DropDownListComponent>(null);
  let pageSizeObj = useRef<NumericTextBoxComponent>(null);
  let pageCountObj = useRef<NumericTextBoxComponent>(null);
  let currentPageObj = useRef<NumericTextBoxComponent>(null);

  const onChange = (args: ChangeEventArgs): void => {
    treegridObj.current.allowPaging = args.checked;
    toggleInputs(treegridObj.current.allowPaging, true);
  };

  const changeNum = () => {
    pageSizeObj.current.value =
      pageSizeObj.current.value >
        treegridObj.current.pageSettings.totalRecordsCount
        ? treegridObj.current.pageSettings.totalRecordsCount
        : pageSizeObj.current.value;
    treegridObj.current.pageSettings.pageSize = pageSizeObj.current.value;
    currentPageObj.current.max = Math.ceil(
      treegridObj.current.pageSettings.totalRecordsCount /
      treegridObj.current.pageSettings.pageSize
    );
  };

  const countChange = () => {
    pageCountObj.current.value =
      pageCountObj.current.value > 8 ? 8 : pageCountObj.current.value;
    treegridObj.current.pageSettings.pageCount = pageCountObj.current.value;
  };

  const currentPageChange = () => {
    currentPageObj.current.value =
      currentPageObj.current.value > currentPageObj.current.max
        ? currentPageObj.current.max
        : currentPageObj.current.value;
    let pageNumber: number = currentPageObj.current.value;
    treegridObj.current.goToPage(pageNumber);
  };

  const change = (args: Object): void => {
    let type: string = getObject("value", args);
    if (type === "Root") {
      treegridObj.current.pageSettings = { pageSizeMode: "Root", pageSize: 2 };
    } else {
      treegridObj.current.pageSettings = {
        pageSizeMode: "All",
        pageSize: pageSizeObj.current.value,
      };
    }
    toggleInputs(type === "All");
  };

  const toggleInputs = (state: boolean, isPager?: boolean) => {
    if (!isNullOrUndefined(isPager)) {
      let element: HTMLElement = document.getElementsByClassName(
        "con-prop1"
      )[0] as HTMLElement;
      element.style.display = state ? "table-row" : "none";
    }
    let flag: Boolean = sizemodeObj.current.value === "All";
    let elem: HTMLCollectionOf<Element> =
      document.getElementsByClassName("con-prop2");
    for (let i: number = 0; i < elem.length; i++) {
      let element: HTMLElement = elem[i] as HTMLElement;
      element.style.display = state && flag ? "table-row" : "none";
    }
  };

  const type: { [key: string]: Object }[] = [
    { id: "All", type: "All" },
    { id: "Root", type: "Root" },
  ];
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
            ref={treegridObj}
            pageSettings={{ pageCount: 2 }}
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
                type="date"
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
                headerText="progress"
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
                  <td style={{ width: "60%" }}>
                    <div> Allow Paging </div>
                  </td>
                  <td style={{ width: "60%" }}>
                    <div>
                      <CheckBoxComponent
                        checked={true}
                        change={onChange.bind(this)}
                      ></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
                <tr className="con-prop1">
                  <td style={{ width: "50%" }}>
                    <div style={{ paddingTop: "7px" }}> Page Size Mode </div>
                  </td>
                  <td style={{ width: "50%", paddingTop: "10px 10px 10px 0px" }}>
                    <div id="dropdown">
                      <DropDownListComponent
                        width="90px"
                        id="sizemode"
                        change={change.bind(this)}
                        dataSource={type}
                        fields={{ text: "type", value: "id" }}
                        value="All"
                        ref={sizemodeObj}
                      />
                    </div>
                  </td>
                </tr>
                <tr className="con-prop2">
                  <td style={{ width: "50%" }}>
                    <div style={{ paddingTop: "7px" }}> Page Size </div>
                  </td>
                  <td style={{ width: "50%", paddingTop: "10px 10px 10px 0px" }}>
                    <div id="numericbox">
                      <NumericTextBoxComponent
                        id="pagesize"
                        format="##"
                        min={1}
                        max={200}
                        value={12}
                        width="110px"
                        ref={pageSizeObj}
                        change={changeNum.bind(this)}
                      ></NumericTextBoxComponent>
                    </div>
                  </td>
                </tr>
                <tr className="con-prop2">
                  <td style={{ width: "50%" }}>
                    <div style={{ paddingTop: "7px" }}> Page Count </div>
                  </td>
                  <td style={{ width: "50%", paddingTop: "10px 10px 10px 0px" }}>
                    <div id="numericbox">
                      <NumericTextBoxComponent
                        id="pagecount"
                        format="##"
                        min={1}
                        max={4}
                        value={2}
                        width="110px"
                        ref={pageCountObj}
                        change={countChange.bind(this)}
                      ></NumericTextBoxComponent>
                    </div>
                  </td>
                </tr>
                <tr className="con-prop2">
                  <td style={{ width: "50%" }}>
                    <div style={{ paddingTop: "7px" }}> Current Page </div>
                  </td>
                  <td style={{ width: "50%", paddingTop: "10px 10px 10px 0px" }}>
                    <div id="numericbox">
                      <NumericTextBoxComponent
                        id="currentpage"
                        format="##"
                        min={1}
                        max={17}
                        value={1}
                        width="110px"
                        ref={currentPageObj}
                        change={currentPageChange.bind(this)}
                      ></NumericTextBoxComponent>
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
          This sample demonstrates the usage of paging API in Tree Grid. In this
          sample, use the properties panel to change the page size mode, page
          size, page count and current page of the Tree Grid.
        </p>
      </div>

      <div id="description">
        <p>
          Paging allows you to display the contents of the Tree Grid in page
          segments. The number of items on a page is determined by the{" "}
          <code>pageSettings-&gt;pageSize</code> property. If no value is
          specified for the <code>pageSettings-&gt;pageSize</code> property, the
          Tree Grid will display 12 items on a page. By default, paging is
          disabled. To enable paging, set <code>allowPaging</code> property to
          true.
        </p>
        <p>In this demo,</p>
        <ul>
          <li>
            Click the <strong>Allow Paging</strong> check box to enable/disable
            paging feature.
          </li>
          <li>
            Change the value of <strong>Page Size Mode</strong> Dropdown to
            change <code>pageSettings-&gt;pageSizeMode.</code>
          </li>
          <li>
            Change the value of <strong>Page Size</strong> textbox to change{" "}
            <code>pageSettings-&gt;pageSize.</code>
          </li>
          <li>
            Change the value of <strong>Page Count</strong> textbox to change{" "}
            <code>pageSettings-&gt;pageCount.</code>
          </li>
          <li>
            Change the value of <strong>Current Page</strong> textbox to change
            <code> pageSettings-&gt;currentPage.</code>
          </li>
        </ul>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use paging feature, we need to inject
          <code>Page</code> module into the <code>services</code>.
        </p>
        <p>
          More information on the paging configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/paging">documentation section</a>.
        </p>
      </div>
    </div>
  );
}
export default PagingAPI;