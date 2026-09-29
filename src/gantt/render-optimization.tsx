import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, VirtualScroll } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { generateVirtualData } from './data';
import { SampleBase } from '../common/sample-base';

export class RenderOptimization extends SampleBase<{}, {}> {
    private recordCount: number = 5000;
    private dropdownData: any[] = [
        { Text: '5,000 Rows', Value: '5000' },
        { Text: '10,000 Rows', Value: '10000' },
    ];
    private dropdownFields = { text: 'Text', value: 'Value' };
    private shouldCalculateLoadTime: { current: boolean } = { current: true };
    private startLoadTime: Date = new Date();
    state = { loadTime: '' };

    private getVirtualData() {
        return generateVirtualData(this.recordCount);
    }

    private onDropdownChange = (e: any) => {
        this.recordCount = e.value;
        this.startLoadTime = new Date();
        this.shouldCalculateLoadTime.current = true;
        this.setState({});
    };

    private onDataBound = () => {
        if (this.shouldCalculateLoadTime.current && this.startLoadTime) {
            this.shouldCalculateLoadTime.current = false;
            const endLoadTime = new Date();
            const diff = endLoadTime.getTime() - this.startLoadTime.getTime();
            this.setState({ loadTime: (diff / 1000).toFixed(2) });
        }
    };

    render() {
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

        return (
            <div className="control-pane">
                <div className='control-section'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '130px', paddingBottom: '10px' }}>
                            <DropDownListComponent dataSource={this.dropdownData} fields={this.dropdownFields} value={this.recordCount} change={this.onDropdownChange} placeholder="5,000 Rows" />
                        </div>
                        <span style={{ paddingLeft: '20px', fontSize: '15px', marginTop: '5px' }}>
                            <b>Data initial load time:</b> {this.state.loadTime} sec
                        </span>
                    </div>

                    <GanttComponent
                        id="RenderOptimization"
                        dataSource={this.getVirtualData()}
                        enablePredecessorValidation={false}
                        autoCalculateDateScheduling={false}
                        treeColumnIndex={1}
                        dataBound={this.onDataBound}
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
                    <p>This sample demonstrates render optimization in Gantt Chart by minimizing DOM updates during rendering. The sample disables <code>autoCalculateDateScheduling</code> and uses a valid, pre-calculated data source so task dates are not recomputed during rendering, improving initial load performance.</p>
                </div>

                <div id="description">
                    <p>
                        This demo measures initial data load time and demonstrates render optimization by disabling <code>autoCalculateDateScheduling</code> and
                        providing a valid (pre-calculated) data source so the Gantt Chart does not recompute task dates during rendering. Combined with virtualization,
                        this reduces DOM updates and improves initial load and scroll performance.
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
    }
}

export default RenderOptimization;
