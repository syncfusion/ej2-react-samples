import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import './employee.css';
import {
    TreeGridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject,
    Page,
    Sort,
    Filter,
    TreeGridComponent as TreeGridComp,
} from '@syncfusion/ej2-react-treegrid';

import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { employeeData } from './data';

interface LeaveAvailability {
    casual: number;
    earned: number;
    sick: number;
    [key: string]: number;
}

interface EmployeeRecord {
    ID: string;
    Employee: string;
    FullName: string;
    JobTitle: string;
    Location: string;
    JoinDate: string;
    Salary: number;
    Email: string;
    Status: string;
    WorkMode: string;
    LeaveAvailability: LeaveAvailability;
    LeaveCount: number;
    Department: string;
    ProjectDetails: string;
    ProjectStatus: string;
    Children: EmployeeRecord[];
}

const viewerRoles = [
    { id: 'hr', role: 'HR' },
    { id: 'employee', role: 'Employee' },
    { id: 'helpdesk', role: 'Help Desk' },
    { id: 'pm', role: 'Project Management' },
];

const EmployeeTreeGrid: React.FC = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const treeGridRef = useRef<TreeGridComp | null>(null);
    const [viewer, setViewer] = useState<string>('hr');

    const getBarHTML = (value: number): string => {
        const percent = (value / 12) * 100;
        let color = '#df2222';
        if (value > 8) color = '#00b300';
        else if (value > 4) color = '#ffc400';
        return `<div class='bar-fill' style='width:${percent}%;background:${color}'></div><div class='barlabel'>${value}</div>`;
    };

    const getColumns = (viewer: string): any[] => {
        const baseColumns = [
            {
                field: 'ID',
                headerText: 'ID',
                width: 200,
                minWidth: 200,
                textAlign: 'Left',
                clipMode: 'EllipsisWithTooltip',
            },
            {
                field: 'Employee',
                headerTemplate: () => {
                    return (<div style={{ display:'inline' }}><img src="src/treegrid/images/__Resources.png" width="20" height="20" className="resources" alt="Name" />Name</div>);
                },
                width: 280,
                clipMode: 'EllipsisWithTooltip',
                template: (props: EmployeeRecord) => (
                    <div className="employee-content">
                        <img
                            src={`src/treegrid/images/${props.FullName}.png`}
                            alt={props.FullName}
                            className="employee-img"
                        />
                        <div className="employee-info">
                            <span className="employee-name">{props.Employee}</span>
                            <span className="employee-title">{props.JobTitle}</span>
                        </div>
                    </div>
                ),
            },
        ];

        switch (viewer) {
            case 'hr':
                return [
                    ...baseColumns,
                    {
                        field: 'Location',
                        headerText: 'Location',
                        width: 200,
                        clipMode: 'EllipsisWithTooltip',
                        template: (props: EmployeeRecord) => (
                            <div className="flag-container">
                                <img
                                    src={`//ej2.syncfusion.com/javascript/demos/src/tree-grid/images/${props.Location}.png`}
                                    className="flag-img"
                                    alt={props.Location}
                                />
                                <div className="flag-text">{props.Location}</div>
                            </div>
                        ),
                    },
                    {
                        field: 'JoinDate',
                        headerText: 'Date Joined',
                        textAlign: 'Right',
                        width: 180,
                        clipMode: 'EllipsisWithTooltip',
                        format: { skeleton: 'yMd', type: 'date' },
                    },
                    {
                        field: 'Salary',
                        headerText: 'Salary per month',
                        format: 'c0',
                        textAlign: 'Right',
                        width: 210,
                        clipMode: 'EllipsisWithTooltip',
                    },
                    {
                        field: 'Email',
                        headerText: 'Email',
                        textAlign: 'Center',
                        width: 200,
                        clipMode: 'EllipsisWithTooltip',
                        template: (props: EmployeeRecord) => (
                            <a href={`mailto:${props.Email}`} className="email-link">
                                {props.Email}
                            </a>
                        ),
                    },
                ];
            case 'employee':
                return [
                    ...baseColumns,
                    {
                        field: 'Status',
                        headerText: 'Presence',
                        width: 200,
                        textAlign: 'Center',
                        clipMode: 'EllipsisWithTooltip',
                        template: (data: EmployeeRecord) => {
                            const bgColor = data.Status === 'Available' ? '#ccffcc' : data.Status === 'Busy' ? '#ffd09d' : '#ffd7cc';
                            const color = data.Status === 'Available' ? '#00cc00' : data.Status === 'Busy' ? '#ff8707' : '#e60000'; return (
                                <div
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: bgColor,
                                        color,
                                        padding: '0 4px',
                                        borderRadius: 4,
                                        textAlign: 'center',
                                        fontSize: 12,
                                    }}
                                >
                                    {data.Status}
                                </div>
                            );
                        },
                    },
                    { field: 'WorkMode', headerText: 'Work Mode', width: 230, clipMode: 'EllipsisWithTooltip', },
                    {
                        field: 'Email',
                        headerText: 'Email',
                        textAlign: 'Center',
                        width: 200,
                        clipMode: 'EllipsisWithTooltip',
                        template: (props: EmployeeRecord) => (
                            <a href={`mailto:${props.Email}`} className="email-link">
                                {props.Email}
                            </a>
                        ),
                    },
                ];
            case 'helpdesk':
                return [
                    ...baseColumns,
                    {
                        field: 'Status',
                        headerText: 'Presence',
                        width: 200,
                        textAlign: 'Center',
                        clipMode: 'EllipsisWithTooltip',
                        template: (data: EmployeeRecord) => {
                            const bgColor = data.Status === 'Available' ? '#ccffcc' : data.Status === 'Busy' ? '#ffd09d' : '#ffd7cc';
                            const color = data.Status === 'Available' ? '#00cc00' : data.Status === 'Busy' ? '#ff8707' : '#e60000'; return (
                                <div
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: bgColor,
                                        color,
                                        padding: '0 4px',
                                        borderRadius: 4,
                                        textAlign: 'center',
                                        fontSize: 12,
                                    }}
                                >
                                    {data.Status}
                                </div>
                            );
                        },
                    },
                    {
                        field: 'LeaveAvailability',
                        headerText: 'Leave Availability',
                        textAlign: 'Center',
                        width: 400,
                        allowFiltering: false,
                        clipMode: 'EllipsisWithTooltip',
                        template: (props: EmployeeRecord) => (
                            <div className="leave-bar-container">
                                {['casual', 'earned', 'sick'].map((type) => (
                                    <React.Fragment key={type}>
                                        <div className="leave-bar">
                                            <span className="leave-label">
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </span>
                                            <div
                                                className={`bar ${type}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: getBarHTML(props.LeaveAvailability?.[type] || 0),
                                                }}
                                            />
                                        </div>
                                        {type !== 'sick' && <div className="separator" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        ),
                    },
                    {
                        field: 'LeaveCount',
                        headerText: `Leave Taken in ${new Date().getFullYear()}`,
                        textAlign: 'Center',
                        width: 240,
                        clipMode: 'EllipsisWithTooltip',
                    },
                ];
            case 'pm':
                return [
                    ...baseColumns,
                    { field: 'Department', headerText: 'Department', width: 200, clipMode: 'EllipsisWithTooltip', },
                    { field: 'ProjectDetails', headerText: 'Project Details', width: 230, clipMode: 'EllipsisWithTooltip', },
                    { field: 'ProjectStatus', headerText: 'Project Status', width: 200, clipMode: 'EllipsisWithTooltip', },
                    {
                        field: 'Email',
                        headerText: 'Email',
                        textAlign: 'Center',
                        width: 200,
                        clipMode: 'EllipsisWithTooltip',
                        template: (props: EmployeeRecord) => (
                            <a href={`mailto:${props.Email}`} className="email-link">
                                {props.Email}
                            </a>
                        ),
                    },
                ];
            default:
                return baseColumns;
        }
    };

    const handleViewerChange = (e: ChangeEventArgs) => {
        setViewer(e.value as string);
        var tree=(document.getElementsByClassName('e-treegrid')[0] as any).ej2_instances[0];
        tree.clearFiltering();
        tree.clearSorting();
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="viewer-container" style={{ margin: '10px' }}>
                    <label htmlFor="viewer">Select Viewer Role : </label>
                    <DropDownListComponent
                        id="viewer"
                        dataSource={viewerRoles}
                        fields={{ text: 'role', value: 'id' }}
                        value={viewer}
                        change={handleViewerChange}
                        placeholder="Select Viewer Role"
                    />
                </div>

                <TreeGridComponent
                    key={viewer}
                    id="sample"
                    ref={treeGridRef}
                    dataSource={employeeData}
                    childMapping="Children"
                    treeColumnIndex={0}
                    height={400}
                    allowSorting={true}
                    allowFiltering={true}
                    filterSettings={{
                        type: 'Menu',
                        hierarchyMode: 'None',
                        mode: 'Immediate',
                    }}
                    pageSettings={{ pageSize: 10 }}
                    enableHover={true}
                    gridLines="Both"
                >
                    <ColumnsDirective>
                        {getColumns(viewer).map((col, idx) => (
                            <ColumnDirective key={idx} {...col} />
                        ))}
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter]} />
                </TreeGridComponent>
            </div>
            <div id="action-description">
                <p>This demo showcases the Syncfusion® Tree Grid. It presents comprehensive employee information customized for various viewer roles: HR, employee, help desk, and project management. The application uses a structured employee dataset with profiles, work modes, leave balances, and other relevant data.</p>
            </div>
            <div id='description'>
                <p>
                    This section highlights dynamic column generation and custom templates to present data that is specific and relevant to each viewer role. Features such as <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/treegrid/sorting">
                        Sorting</a>, <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/treegrid/filtering/filtering#filter-hierarchy-modes">
                        Filtering with hierarchical support</a> and <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/columns#format">
                        Column formatting</a> are seamlessly integrated. The Tree Grid <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-template">
                        Column template </a> is utilized to render visual elements like progress bars within cells. The Tree Grid flexibility and customization capabilities make it a powerful tool
                    for organizational data representation.
                </p>

                <p>
                    <br /> More information about Tree Grid instantiation can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/getting-started"> documentation section</a>.
                </p>
            </div>
        </div>
    );
};

export default EmployeeTreeGrid;