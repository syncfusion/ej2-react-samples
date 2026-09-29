import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective, DialogEventArgs } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { DataManager } from '@syncfusion/ej2-data';
/**
 * Kanban Remote Data sample
 */
const RemoteData = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let dataManger: DataManager = new DataManager({
        url: "https://services.syncfusion.com/react/production/api/Kanban",
        crossDomain: true,
    });
    const dialogOpen = (args: DialogEventArgs): void => {
        args.cancel = true;
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        keyField="Status"
                        dataSource={dataManger}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                        allowDragAndDrop={false}
                        dialogOpen={dialogOpen.bind(this)}
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Testing" keyField="Testing" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates remote data binding in the Kanban component, enabling data to be retrieved from external services and displayed in an interactive workflow management interface.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates remote data binding in the Kanban component using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding" target="_blank">dataSource</a> property and a <a href="https://ej2.syncfusion.com/react/documentation/data/overview" target="_blank">DataManager</a> instance. The DataManager acts as an intermediary between the Kanban board and a remote service, enabling data to be fetched and displayed from external data sources.
                </p>
                <p>
                    To connect with a remote service, the DataManager requires a service endpoint URL and an adaptor. The adaptor is responsible for processing requests and responses between the component and the remote data source. The <code>@syncfusion/ej2-data</code> package provides several built-in adaptors, including <code>UrlAdaptor</code>, <code>ODataAdaptor</code>, <code>ODataV4Adaptor</code>, <code>WebApiAdaptor</code>, and <code>WebMethodAdaptor</code>, for working with different service types.
                </p>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding#remote-data" target="_blank">remote data</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default RemoteData;