import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, VirtualScroll, ContextMenuItem, ContextMenu, Sort, Selection, Inject, FilterSettingsModel, Filter, Freeze} from '@syncfusion/ej2-react-grids';
import { supportData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './pinned-rows.css';

function PinnedRows() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let gridInstance: GridComponent;
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const contextMenuItems: ContextMenuItem[] = ['PinRow', 'UnpinRow'];
    function isRowPinned(data): boolean {
        if (data && (data.Rating === "Very Dissatisfied" || data.Rating === 'Dissatisfied')) {
            return true;
        }
        return false;
    };
    const requestTemplate = (props: any): any => {
        return (
        <div className="e-request-info">
            <img
            src={`src/grid/images/supportType/${props.TypeofRequest}.svg`}
            alt={props.TypeofRequest}
            />
            <span>{props.TypeofRequest}</span>
        </div>
        );
    };
    function ratingDetail(props): any {
        if (props.Rating === "Satisfied") {
            return (
                <div className="statusvalue e-satisfiedcolor">
                    <span className="statustxt e-satisfiedcolor">Satisfied</span>
                </div>
            );
        }
        if (props.Rating === "Very Satisfied") {
            return (
                <div className="statusvalue e-verysatisfiedcolor">
                    <span className="statustxt e-verysatisfiedcolor">Very Satisfied</span>
                </div>
            );
        }
        if (props.Rating === "Dissatisfied") {
            return (
                <div className="statusvalue e-dissatisfiedcolor">
                    <span className="statustxt e-dissatisfiedcolor">Dissatisfied</span>
                </div>
            );
        }
        if (props.Rating === "Very Dissatisfied") {
            return (
                <div className="statusvalue e-verydissatisfiedcolor">
                    <span className="statustxt e-verydissatisfiedcolor">Very Dissatisfied</span>
                </div>
            );
        }
        if (props.Rating === "Neutral") {
            return (
                <div className="statusvalue e-neutralcolor">
                    <span className="statustxt e-neutralcolor">Neutral</span>
                </div>
            );
        }
    };
    function priorityDetail(props): any {
        if (props.Priority === "High") {
            return (
                <div className="statusvalue e-highcolor">
                    <span className="statustxt e-highcolor">High</span>
                </div>
            );
        }
        if (props.Priority === "Low") {
            return (
                <div className="statusvalue e-lowcolor">
                    <span className="statustxt e-lowcolor">Low</span>
                </div>
            );
        }
        if (props.Priority === "Medium") {
            return (
                <div className="statusvalue e-mediumcolor">
                    <span className="statustxt e-mediumcolor">Medium</span>
                </div>
            );
        }
        if (props.Priority === "Urgent") {
            return (
                <div className="statusvalue e-urgentcolor">
                    <span className="statustxt e-urgentcolor">Urgent</span>
                </div>
            );
        }
    };
    function statusDetail(props): any {
        if (props.Status === "Open") {
            return (
                <div className="statusvalue e-opencolor">
                    <span className="statustxt e-opencolor">Open</span>
                </div>
            );
        }
        if (props.Status === "In Progress") {
            return (
                <div className="statusvalue e-inprogresscolor">
                    <span className="statustxt e-inprogresscolor">In Progress</span>
                </div>
            );
        }
        if (props.Status === "Closed") {
            return (
                <div className="statusvalue e-closedcolor">
                    <span className="statustxt e-closedcolor">Closed</span>
                </div>
            );
        }
        if (props.Status === "Resolved") {
            return (
                <div className="statusvalue e-resolvedcolor">
                    <span className="statustxt e-resolvedcolor">Resolved</span>
                </div>
            );
        }
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent id="PinnedRows" dataSource={supportData} ref={grid => gridInstance = grid} enableVirtualization={true} contextMenuItems={contextMenuItems} height={300} isRowPinned={isRowPinned.bind(this)} allowSorting={true} allowKeyboard={false} allowFiltering={true} filterSettings={filterSettings} pageSettings={{ pageSize:20 }}>
                    <ColumnsDirective>
                        <ColumnDirective field="TicketID" headerText="Ticket ID" width="140" isPrimaryKey={true}
                                        freeze="Left" />
                        <ColumnDirective field="Title" headerText="Title" width="210"/>
                        <ColumnDirective field="Description" headerText="Description" width="250" clipMode="EllipsisWithTooltip" allowFiltering={false}/>
                        <ColumnDirective field="Status" headerText="Status" width="140" textAlign="Center" template={statusDetail.bind(this)} />
                        <ColumnDirective field="Priority" headerText="Priority" width="140" textAlign="Center" template={priorityDetail.bind(this)}/>
                         <ColumnDirective field="Assignee" headerText="Assignee" width="140" />
                        <ColumnDirective field="Category" headerText="Category" width="130" />
                        <ColumnDirective field="TypeofRequest" headerText="Type of Request" width="210" template={requestTemplate.bind(this)}/>
                        <ColumnDirective field="CreatedDate" headerText="Created Date" width="160" format="yMd"
                                        textAlign="Right" />
                        <ColumnDirective field="Rating" headerText="Rating" width="160" textAlign="Center" freeze="Right" template={ratingDetail.bind(this)}/>
                    </ColumnsDirective>
                    <Inject services={[VirtualScroll, Sort, Selection, Filter, Freeze, ContextMenu]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates that important rows can be pinned at the top and important columns frozen on the left or right, keeping them visible at all times.
                    Scroll vertically or horizontally to see how these pinned rows and frozen columns remain fixed while the rest of the grid moves beneath or beside them.
                </p>
            </div>
            <div id="description">
                <p>In this demo, tickets rated <strong>Dissatisfied</strong> or <strong>Very Dissatisfied</strong> are automatically pinned to the top through the <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/#isrowpinned">isRowPinned</a></code> callback function.
                    The grid applies column freezing by locking the <strong>Ticket ID</strong> column on the left and the <strong>Rating</strong> column on the right using the <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/column#freeze">column.freeze</a></code> property.</p>
                <p>The feature supports dynamic row pinning so that any row can be pinned or unpinned through the context menu, and this functionality is configured by defining the <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/#contextmenuitems">contextMenuItems</a></code> property with the <strong>PinRow</strong> and <strong>UnpinRow</strong> options.</p>
                <p style={{ fontWeight: "bold" }}>Injecting Module:</p>
                <p>
                    Grid component features are segregated into individual feature-wise modules. To use context menu feature, we need to inject <code>ContextMenu</code> module into the <code>services</code>
                </p>
                <p>More information on pinned rows and frozen columns can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/row/row"> documentation section</a>.</p>
                <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
                    <a target="_blank"
                        href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
            </div>
        </div>
    )
}
export default PinnedRows;