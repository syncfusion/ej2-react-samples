import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, VirtualScroll, Edit, Toolbar, RowDD } from '@syncfusion/ej2-react-treegrid';
import { LoadEventArgs } from '@syncfusion/ej2-react-grids';
import { virtualScrollData, virtualDataSource } from './data';
import { updateSampleSection } from '../common/sample-base';
import './virtualscrolling.css';

const VirtualScrolling = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const treegrid = useRef(null);
    
    const toolbarOptions: any = [
        "Add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
        "Indent",
        "Outdent",
    ];
    const editSettings: any = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Row",
        newRowPosition: "Child",
    };

    const statusTemplate = (args: any) => {
        const status: string = (args.Status || '').toString().toLowerCase();
        let cssClass: string = 'rg-status-maintenance';
        if (status.indexOf('run') === 0) cssClass = 'rg-status-running';
        else if (status.indexOf('stop') === 0) cssClass = 'rg-status-stopped';
        else if (status.indexOf('degrad') === 0) cssClass = 'rg-status-degraded';
        return <div className={`rg-badge ${cssClass}`}>{args.Status || ''}</div>;
    };

    const priorityTemplate = (args: any) => {
        const priority: string = (args.Priority || '').toString().toLowerCase();
        let cssClass: string = 'rg-priority-medium';
        let label: string = args.Priority || 'Medium';
        if (priority === 'low') cssClass = 'rg-priority-low';
        else if (priority === 'critical') cssClass = 'rg-priority-critical';
        else if (priority === 'high') cssClass = 'rg-priority-high';
        return <div className={`rg-badge ${cssClass}`}>{label}</div>;
    };

    const complianceTemplate = (args: any) => {
        const value: number = Math.max(0, Math.min(100, parseInt(args.ComplianceScore || 0)));
        return (
            <div className="rg-compliance-wrapper">
                <div className="rg-compliance"><i style={{ width: `${value}%` }}></i></div>
                <div className="rg-compliance-value">{value}</div>
            </div>
        );
    };

    const regionTemplate = (args: any) => {
        const region: string = args.Region || '';

        let flagSvg: any = '';

        if (region.indexOf('West US') >= 0 || region.indexOf('East US') >= 0) {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#B22234" />
                    <rect y="0" width="20" height="2" fill="#fff" />
                    <rect y="4" width="20" height="2" fill="#fff" />
                    <rect y="8" width="20" height="2" fill="#fff" />
                    <rect y="12" width="20" height="2" fill="#fff" />
                    <rect width="8" height="8" fill="#3C3B6E" />
                </svg>
            );
        } else if (
            region.indexOf('EU West') >= 0 ||
            region.indexOf('EU Central') >= 0 ||
            region.indexOf('North Europe') >= 0 ||
            region.indexOf('West Europe') >= 0
        ) {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#003399" />
                    <circle cx="10" cy="7" r="2" fill="#FFCC00" />
                    <circle cx="13" cy="7" r="0.6" fill="#FFCC00" />
                    <circle cx="7" cy="7" r="0.6" fill="#FFCC00" />
                    <circle cx="10" cy="4" r="0.6" fill="#FFCC00" />
                    <circle cx="10" cy="10" r="0.6" fill="#FFCC00" />
                </svg>
            );
        } else if (region.indexOf('Canada') >= 0) {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#fff" />
                    <rect width="5" height="14" fill="#FF0000" />
                    <rect x="15" width="5" height="14" fill="#FF0000" />
                    <path
                        d="M10,5 L10.5,7 L9,7.5 L10.5,8 L10,10 L11,8.5 L12,10 L11.5,8 L13,7.5 L11.5,7 L12,5 L11,6.5 Z"
                        fill="#FF0000"
                    />
                </svg>
            );
        } else if (region.indexOf('Australia') >= 0) {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#012169" />
                    <rect width="8" height="6" fill="#012169" />
                    <path d="M0,0 L8,6 M8,0 L0,6" stroke="#fff" strokeWidth="1.2" />
                    <path d="M4,0 L4,6 M0,3 L8,3" stroke="#fff" strokeWidth="2" />
                    <path d="M4,0 L4,6 M0,3 L8,3" stroke="#C8102E" strokeWidth="1.2" />
                    <circle cx="15" cy="10" r="1" fill="#fff" />
                    <circle cx="13" cy="8" r="0.8" fill="#fff" />
                    <circle cx="17" cy="8" r="0.8" fill="#fff" />
                </svg>
            );
        } else if (region.indexOf('Asia Pacific') >= 0 || region.indexOf('Southeast Asia') >= 0) {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#f97316" />
                    <circle cx="10" cy="7" r="3" fill="#fff" />
                    <text
                        x="10"
                        y="10"
                        fontSize="6"
                        textAnchor="middle"
                        fill="#f97316"
                        fontWeight="bold"
                    >
                        AP
                    </text>
                </svg>
            );
        } else if (region.indexOf('South America') >= 0) {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#009739" />
                    <path d="M10,1 L18,7 L10,13 L2,7 Z" fill="#FEDD00" />
                    <circle cx="10" cy="7" r="2.5" fill="#002776" />
                </svg>
            );
        } else {
            flagSvg = (
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    <rect width="20" height="14" fill="#6b7280" />
                    <circle cx="10" cy="7" r="4" fill="none" stroke="#fff" strokeWidth="0.8" />
                    <path
                        d="M10,3 Q12,7 10,11 M10,3 Q8,7 10,11 M6,7 L14,7"
                        stroke="#fff"
                        strokeWidth="0.8"
                        fill="none"
                    />
                </svg>
            );
        }

        return (
            <div className="rg-region">
                <span className="rg-region-flag">{flagSvg}</span>
                <span className="rg-region-name">{region}</span>
            </div>
        );
    };

    const actionBegin = (args: any) => {
        if(args.requestType === 'save') {
            args.data.TaskID = 10000 + Math.floor(Math.random() * 10001);
        }
    }    

    if (virtualScrollData.length === 0) {
        virtualDataSource();
    }

    
    const load = (args: LoadEventArgs) => {
        if (treegrid.current && treegrid.current.enableVirtualization) {
            args.enableSeamlessScrolling = true;
        }
    };

    return (
        <div className="control-pane">
            <div className="control-section">
                <TreeGridComponent
                    ref={(g: any) => treegrid.current = g}
                    dataSource={virtualScrollData}
                    enableVirtualization={true}
                    idMapping="TaskID"
                    parentIdMapping="ParentID"
                    treeColumnIndex={2}
                    editSettings={editSettings}
                    toolbar={toolbarOptions}
                    height="400"
                    rowHeight={50}
                    clipMode="EllipsisWithTooltip"
                    actionBegin={actionBegin}
                    load={load}
                >
                    <ColumnsDirective>
                        <ColumnDirective
                            field="TaskID"
                            headerText="ID"
                            width="90"
                            textAlign="Right"
                            isPrimaryKey={true}
                            visible={false}
                        ></ColumnDirective>
                        <ColumnDirective field="ParentID" headerText="Parent ID" width="90" textAlign="Right" visible={false} />
                        <ColumnDirective field="ResourceId" headerText="Resource" width="360" validationRules={{ required: true }} />
                        <ColumnDirective field="Name" headerText="Type" width="150" editType="dropdownedit" />
                        <ColumnDirective field="Status" headerText="Status" width="210" textAlign="Center"
                            template={statusTemplate} editType="dropdownedit"
                            validationRules={{ required: true }} />
                        <ColumnDirective field="Region" headerText="Region" width="180" editType="dropdownedit"
                            template={regionTemplate} validationRules={{ required: true }} />
                        <ColumnDirective field="Environment" headerText="Environment" width="140" textAlign="Left"
                            editType="dropdownedit" validationRules={{ required: true }} />
                        <ColumnDirective field="MonthlyCost" headerText="Monthly Cost ($)" width="140" textAlign="Right" format="C0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="Cpu" headerText="CPU (%)" width="110" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="Memory" headerText="Memory (%)" width="110" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="Disk" headerText="Disk (%)" width="110" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="NetworkMbps" headerText="Network (mbps)" width="130" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="RequestsPerSec" headerText="Requests (per sec)" width="150" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="ErrorRatePpm" headerText="Error Rate (ppm)" width="170" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="SecurityFindings" headerText="Security Errors" width="110" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="StorageGb" headerText="Storage (GB)" width="140" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="InstanceCount" headerText="Instances" width="110" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="UptimeDays" headerText="Uptime (days)" width="150" textAlign="Right" format="N0" editType="numericedit" edit={{ params: { format: "n" } }} />
                        <ColumnDirective field="Priority" headerText="Priority" width="130" textAlign="Center"
                            template={priorityTemplate} editType="dropdownedit" validationRules={{ required: true }} />
                        <ColumnDirective field="ComplianceScore" headerText="Compliance Score" width="180" textAlign="Left"
                            template={complianceTemplate} validationRules={{ required: true }} editType="numericedit" edit={{ params: { format: "n" } }} />
                    </ColumnsDirective>
                    <Inject services={[VirtualScroll, Edit, Toolbar, RowDD]} />
                </TreeGridComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates row virtualization in the TreeGrid component, enabling smooth scrolling and efficient rendering of large sets of self-referencing records with full CRUD support and custom cell templates.
                </p>
            </div>
            <div id="description">
                <p>
                    Row virtualization in TreeGrid displays only the rows currently visible in the viewport, ensuring smooth scrolling and optimal performance with large datasets.
                    TreeGrid virtualization is enabled by setting the <code>enableVirtualization</code> property to <code>true</code>. The <code>height</code> property must be explicitly defined when virtualization is enabled.
                </p>
                <p>
                    For seamless scrolling, set <code><a target="_blank" className="code" 
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/loadeventargs#enableSeamlessScrolling">args.enableSeamlessScrolling = true</a></code> in the TreeGrid's <code><a target="_blank" className="code" 
                    href="https://ej2.syncfusion.com/react/documentation/api/treegrid/index-default#load">load</a></code> event. 
                    This ensures smooth vertical and horizontal transitions, providing a smoother experience during fast scrolling when virtualization is enabled.
                </p>
                
                <p>
                    This demo showcases a self‑referential data source containing 10,000 records. In the TreeGrid, the hierarchical relationship is established by mapping the <code>parentIdMapping</code> property to the "ParentID" field and the <code>idMapping</code> property to the "TaskID" field in the data source.
                    The toolbar enables full CRUD operations along with hierarchy management options:
                </p>
                <ul>
                    <li><code>Indent</code>: Moves the selected row to become the last child of the row directly above it.</li>
                    <li><code>Outdent</code>: Moves the selected row up one level, making it a sibling of its previous parent.</li>
                </ul>
                <p><strong>Injecting Module:</strong></p>
                <p>
                    Tree Grid features are organized into individual feature-specific modules.
                    To use the virtual scrolling functionality, inject
                    <code> VirtualScroll </code> module into the <code>services</code>.
                </p>
                <p>
                    More information on the Virtual Scrolling can be found in <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/treegrid/virtual-scroll"
                        aria-label="Navigate to the documentation for virtual-scroll in React TreeGrid control">documentation </a> section.
                </p>
            </div>
        </div>
    );
}
export default VirtualScrolling;