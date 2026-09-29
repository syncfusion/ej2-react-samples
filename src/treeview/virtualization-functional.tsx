import * as React from 'react';
import { useEffect } from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './treeview.css';

const Virtualization = () => {

    useEffect(() => {
        updateSampleSection();
    }, []);

    const totalNodes: number = 8000;
    const employeesPerDept: number = 20;

    const departments: string[] = [
        'Engineering', 'Sales', 'Human Resources', 'Finance', 'Marketing',
        'Customer Support', 'Operations', 'Legal', 'Research',
        'IT Infrastructure'
    ];

    const employeeRoles: string[] = [
        'Manager', 'Senior Engineer', 'Software Engineer',
        'Business Analyst', 'QA Engineer', 'Consultant',
        'Specialist', 'Coordinator', 'Executive', 'Associate'
    ];

    const generateOrganizationData = (total: number, children: number): Object[] => {
        const data: any[] = [];
        let index = 0;
        let id = 1;
        let deptIndex = 0;

        while (index < total) {
            const deptId = id++;
            const parentIndex = index;

            data[index++] = {
                id: deptId,
                pid: null,
                name: departments[deptIndex % departments.length],
                hasChild: false,
                isChecked: true,
                isExpanded: false
            };

            let childCount = 0;

            for (let i = 0; i < children && index < total; i++) {
                data[index++] = {
                    id: id++,
                    pid: deptId,
                    name: `${employeeRoles[i % employeeRoles.length]} - Employee ${i + 1}`,
                    isChecked: true,
                    isExpanded: false
                };
                childCount++;
            }

            if (childCount > 0) {
                data[parentIndex].hasChild = true;
            }

            deptIndex++;
        }

        return data;
    };

    const fields: object = {
        dataSource: generateOrganizationData(totalNodes, employeesPerDept),
        id: 'id',
        parentID: 'pid',
        text: 'name',
        hasChildren: 'hasChild',
        isChecked: 'isChecked',
        expanded: 'isExpanded'
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='tree-control_wrapper virtualization'>
                    <TreeViewComponent
                        fields={fields}
                        height='400px'
                        enableVirtualization={true}
                        showCheckBox={true}
                    />
                </div>
            </div>

            <div id="action-description">
            <p>
                This example demonstrates virtualization support in React TreeView. The component has 8000 items bound to it including children; however, when you open the suggestion list, only few items are loaded based on the height specified, and the remaining items are loaded while scrolling.
            </p>
        </div>

        <div id="description">
            <p>The TreeView supports UI virtualization to improve rendering performance when handling a large amount of data. Enable this feature by setting the <code>enableVirtualization</code> property to <code>true</code> and providing a fixed <code>height</code> for the TreeView container.</p>
            <p>In this demo, a large organization-like dataset is generated programmatically and virtualization is enabled to render the nodes efficiently.</p>
            <p>For more details, refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/virtualization/" target="_blank">Virtualization documentation</a>.</p>
        </div>
        </div>
    );
};

export default Virtualization;