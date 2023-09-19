import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Inject } from '@syncfusion/ej2-react-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const LoadingAnimation = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data = new DataManager({
        url: "https://services.syncfusion.com/react/production/api/SelfReferenceData",
        adaptor: new WebApiAdaptor(),
    });
    let treegridInstance = useRef<TreeGridComponent>(null);
    const indicatortypes: { [key: string]: Object }[] = [
        { id: "Shimmer", name: "Shimmer" },
        { id: "Spinner", name: "Spinner" },
    ];
    const fields: Object = { text: "name", value: "id" };
    let indicatorDropDown: DropDownListComponent;
    const indicatorChange = (e): void => {
        if (indicatorDropDown.value === "Shimmer") {
            treegridInstance.current.loadingIndicator.indicatorType = "Shimmer";
        } else {
            treegridInstance.current.loadingIndicator.indicatorType = "Spinner";
        }
        treegridInstance.current.refresh();
    };
    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="col-md-9">
                    <TreeGridComponent
                        id="TreeGrid"
                        dataSource={data}
                        ref={treegridInstance}
                        hasChildMapping="isParent"
                        height="400"
                        pageSettings={{ pageCount: 3 }}
                        treeColumnIndex={1}
                        allowPaging={true}
                        idMapping="TaskID"
                        parentIdMapping="parentItem"
                        loadingIndicator={{ indicatorType: "Shimmer" }}
                        allowSorting={true}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                field="TaskID"
                                headerText="Task ID"
                                width="120"
                                textAlign="Right"
                            ></ColumnDirective>
                            <ColumnDirective
                                field="TaskName"
                                headerText="Task Name"
                                width="240"
                            ></ColumnDirective>
                            <ColumnDirective
                                field="StartDate"
                                headerText="Start Date"
                                width="140"
                                format="yMd"
                                textAlign="Right"
                            />
                            <ColumnDirective
                                field="Duration"
                                headerText="Duration"
                                width="130"
                                textAlign="Right"
                            />
                            <ColumnDirective
                                field="Progress"
                                headerText="Progress"
                                width="130"
                            />
                        </ColumnsDirective>
                        <Inject services={[Page, Sort]} />
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
                                <td style={{ width: "30%" }}>
                                    <div> Indicator Type </div>
                                </td>
                                <td style={{ width: "70%" }}>
                                    <div id="columnddl">
                                        <DropDownListComponent
                                            dataSource={indicatortypes}
                                            value="Shimmer"
                                            change={indicatorChange.bind(this)}
                                            fields={fields}
                                            ref={(indicateDropDown) => {
                                                indicatorDropDown = indicateDropDown;
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample shows the loading indicator while tree grid loading and
                    refreshing especially when using remote data. In this sample, you can
                    change the loading indicators from the properties panel.
                </p>
            </div>
            <div id="description">
                <p>
                    When performing the tree grid actions (like sorting, filtering, and
                    more), the loading indicator is shown in the in-between time the
                    processed data is fetched and bound to the tree grid.
                </p>
                <p>
                    The Tree Grid supports the following loading indicator types. They
                    are:{" "}
                </p>
                <ul>
                    <li>
                        <code>Spinner</code>
                    </li>
                    <li>
                        <code>Shimmer</code>
                    </li>
                </ul>
                <p>
                    Use the loading indicator by setting the{" "}
                    <code>
                        <a
                            target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#loadingindicator"
                        >
                            loadingIndicator.indicatorType
                        </a>
                    </code>{" "}
                    property as <code>Spinner</code> or <code>Shimmer</code>. The default
                    value of the indicatorType is <code>Spinner</code>. In this demo, the{" "}
                    <code>Shimmer</code> type is initially enabled.
                </p>
            </div>
        </div>
    );
}
export default LoadingAnimation;