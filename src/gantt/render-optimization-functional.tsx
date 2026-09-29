import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, VirtualScroll } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { generateVirtualData } from './data';
import { updateSampleSection } from '../common/sample-base';

const RenderOptimization = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const recordCount = useRef<number>(5000);
    const [count, setCount] = useState<number>(recordCount.current);
    const dropdownData = [
        { Text: '5,000 Rows', Value: '5000' },
        { Text: '10,000 Rows', Value: '10000' },
    ];
    const dropdownFields = { text: 'Text', value: 'Value' };
    const [loadTime, setLoadTime] = useState('');
    const [startLoadTime, setStartLoadTime] = useState<Date | null>(new Date());
    const shouldCalculateLoadTime = useRef(true);

    const virtualData = generateVirtualData(Number(count));

    const taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'parentID',
        dependency: 'Predecessor',
    } as any;

    const splitterSettings = { columnIndex: 2 } as any;
    const labelSettings = { taskLabel: 'Progress' } as any;
    const projectStartDate = new Date('03/29/2026');
    const projectEndDate = new Date('09/20/2026');

    const loadGanttData = () => {
        setStartLoadTime(new Date());
        shouldCalculateLoadTime.current = true;
    };

    const onDropdownChange = (e: any) => {
        setCount(e.value);
        loadGanttData();
    };

    const onDataBound = () => {
        if (shouldCalculateLoadTime.current && startLoadTime) {
            shouldCalculateLoadTime.current = false;
            const endLoadTime = new Date();
            const diff = endLoadTime.getTime() - (startLoadTime as Date).getTime();
            setLoadTime((diff / 1000).toFixed(2));
        }
    };

    return (
        <div className="control-pane">
            <div className='control-section'>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '130px', paddingBottom: '10px' }}>
                        <DropDownListComponent dataSource={dropdownData} fields={dropdownFields} value={recordCount} change={onDropdownChange} placeholder="5,000 Rows" />
                    </div>
                    <span style={{ paddingLeft: '20px', fontSize: '15px', marginTop: '5px' }}>
                        <b>Data initial load time:</b> {loadTime} sec
                    </span>
                </div>

                <GanttComponent
                    id="RenderOptimization"
                    dataSource={virtualData}
                    enablePredecessorValidation={false}
                    autoCalculateDateScheduling={false}
                    treeColumnIndex={1}
                    dataBound={onDataBound}
                    labelSettings={labelSettings}
                    allowSelection={true}
                    highlightWeekends={true}
                    enableVirtualization={true}
                    taskFields={taskFields}
                    splitterSettings={splitterSettings}
                    height="650px"
                    width="100%"
                    taskbarHeight={25}
                    rowHeight={46}
                    projectStartDate={projectStartDate}
                    projectEndDate={projectEndDate}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="TaskID" />
                        <ColumnDirective field="TaskName" headerText="Task Name" width={300} />
                        <ColumnDirective field="StartDate" />
                        <ColumnDirective field="Duration" />
                        <ColumnDirective field="Progress" />
                    </ColumnsDirective>
                    <Inject services={[Selection, VirtualScroll]} />
                </GanttComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates render optimization in Gantt by minimizing DOM updates during rendering. The sample disables <code>autoCalculateDateScheduling</code> and uses a valid, pre-calculated data source so task dates are not recomputed during rendering, improving initial load performance.</p>
            </div>

            <div id="description">
                <p>
                    This demo measures initial data load time and demonstrates render optimization by disabling <code>autoCalculateDateScheduling</code> and
                    providing a valid (pre-calculated) data source so the Gantt does not recompute task dates during rendering. When combined with
                    virtualization, this reduces DOM updates and improves both initial load and scroll performance.
                </p>
                <p>
                    Gantt component features are segregated into individual feature-wise modules. To use virtual scroll and selection features, inject
                    the <code>VirtualScroll</code> and <code>Selection</code> into the <code>Inject Services</code> section.
                </p>
                <br />
                <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/performance#optimizing-performance-with-autocalculatedatescheduling">documentation section</a>.</p>
                <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
            </div>
        </div>
    );
};

export default RenderOptimization;
