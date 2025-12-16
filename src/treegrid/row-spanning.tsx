import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { rowSpanData } from './data';
import { ColumnDirective, ColumnsDirective, Freeze, Inject, TreeGridComponent, Page } from '@syncfusion/ej2-react-treegrid';
export class RowSpanningAPI extends SampleBase<{}, {}> {
    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <TreeGridComponent dataSource={rowSpanData} enableHover={false} allowSelection={false} allowPaging={true} pageSettings={{ pageSizeMode: 'All', pageSize: 18 }}
                        rowHeight={50} gridLines='Both' enableColumnSpan={true} enableRowSpan={true} height={400}
                        childMapping='children' treeColumnIndex={0} clipMode='EllipsisWithTooltip'>

                        <ColumnsDirective>
                            <ColumnDirective field="activityName" headerText="Phase Name" width="250" freeze="Left" />
                            <ColumnDirective
                                headerText="Schedule"
                                textAlign="Center"
                                columns={[
                                    { field: 'startDate', headerText: 'Start Date', type: 'date', format: 'MM/dd/yyyy', width: 140, textAlign: 'Center' },
                                    { field: 'endDate', headerText: 'End Date', type: 'date', format: 'MM/dd/yyyy', width: 140, textAlign: 'Center' }
                                ]} />
                            <ColumnDirective
                                headerText="Work Status"
                                textAlign="Center"
                                columns={[
                                    { field: 'status', headerText: 'Status', width: 180, textAlign: 'Center' }
                                ]}
                            />
                            <ColumnDirective
                                headerText="Compliance"
                                textAlign="Center"
                                columns={[
                                    { field: 'permitStatus', headerText: 'Permit Status', width: 160, textAlign: 'Center' },
                                    { field: 'inspectionDate', headerText: 'Inspection Date', width: 180, type: 'date', format: 'MM/dd/yyyy', textAlign: 'Center' },
                                    { field: 'inspectionStatus', headerText: 'Inspection Status', width: 180, textAlign: 'Center' },
                                    { field: 'punchListStatus', headerText: 'Punch List Status', width: 180, textAlign: 'Center' }
                                ]}
                            />
                            <ColumnDirective
                                headerText="Personnel"
                                textAlign="Center"
                                columns={[
                                    { field: 'supervisor', headerText: 'Supervisor', width: 180 },
                                    { field: 'team', headerText: 'Crew', width: 200 }
                                ]} />
                            <ColumnDirective
                                headerText="Materials"
                                textAlign="Center"
                                columns={[
                                    { field: 'materialUsed', headerText: 'Materials Used', width: 180, textAlign: 'Center' },
                                    { field: 'materialCost', headerText: 'Material Cost', width: 140, format: 'C2', textAlign: 'Right', enableRowSpan: false }
                                ]}
                            />
                            <ColumnDirective
                                headerText="Cost Summary"
                                textAlign="Center"
                                columns={[
                                    { field: 'totalBudget', headerText: 'Planned Budget', width: 140, format: 'C2', textAlign: 'Center', enableRowSpan: false },
                                    { field: 'paidToDate', headerText: 'Actual Spend', width: 140, format: 'C2', textAlign: 'Center', enableRowSpan: false }
                                ]}
                            />
                        </ColumnsDirective>
                        <Inject services={[Freeze, Page]} />
                    </TreeGridComponent>
                    <div id="action-description">
                        <p>
                            This sample demonstrates how the Tree Grid automatically merges adjacent cells containing same value across both rows and columns.
                        </p>
                    </div>

                    <div id="description">
                        <p>
                            In this demo, the <b>"Start Date"</b>, <b>"End Date"</b>, <b>"Status"</b>, and <b>"Permit Status"</b> columns are merged when they share the same value. Row and column spanning can be enabled by setting <code>enableRowSpan</code> and <code>enableColumnSpan</code> to <b>true</b>, allowing the Tree Grid to merge adjacent cells both horizontally and vertically.
                        </p>
                        <p>
                            The <b>"Phase Name"</b> column remains frozen on the left side, achieved using the <a href="https://ej2.syncfusion.com/react/documentation/treegrid/frozen#freeze-direction">freeze</a> property in the column definition.
                        </p>
                        <p>Tree Grid features are separated into feature-wise modules. To use the frozen rows and columns feature, inject the Freeze module using the <code>TreeGrid.Inject(Freeze)</code> method</p>
                        <p>
                            More information on the Tree Grid component can be found in this 
                            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/getting-started">
                                documentation</a> section.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}