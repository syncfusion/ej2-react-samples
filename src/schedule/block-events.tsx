import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, TreeViewArgs, ResourcesDirective, ResourceDirective,
    ViewsDirective, ViewDirective, ResourceDetails, Inject, TimelineViews,
    Resize, DragAndDrop, TimelineMonth, Day
} from '@syncfusion/ej2-react-schedule';
import './block-events.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
/**
 * schedule block events sample
 */

export class BlockEvents extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private data: Object[] = extend([], (dataSource as any).blockData, null, true) as Object[];

    private employeeData: Object[] = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
    ];

    private getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    }

    private getEmployeeImage(value: ResourceDetails): string {
        let resourceName: string = this.getEmployeeName(value);
        return resourceName.toLowerCase();
    }

    private getEmployeeDesignation(value: ResourceDetails): string {
        return (value as ResourceDetails).resourceData.Designation as string;
    }

    private resourceHeaderTemplate(props: any): JSX.Element {
        return (<div className="template-wrap"><div className="employee-category"><div className={"employee-image " + this.getEmployeeImage(props)}></div><div className="employee-name">
            {this.getEmployeeName(props)}</div><div className="employee-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='block-events' width='100%' height='650px' selectedDate={new Date(2018, 7, 1)}
                                currentView='TimelineDay' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                                eventSettings={{
                                    dataSource: this.data
                                }}
                                group={{ enableCompactView: false, resources: ['Employee'] }}>
                                <ResourcesDirective>
                                    <ResourceDirective field='EmployeeId' title='Employees' name='Employee' allowMultiple={true}
                                        dataSource={this.employeeData} textField='Text' idField='Id' colorField='Color'>
                                    </ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective>
                                    <ViewDirective option='Day' />
                                    <ViewDirective option='TimelineDay' />
                                    <ViewDirective option='TimelineMonth' />
                                </ViewsDirective>
                                <Inject services={[Day, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example shows how to block specific time intervals or days on the Scheduler.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, few blocked events are defined to block the specific time range with the text “Unavailable”.
                        No events can be created on those blocked time range as well as edited through it. These blocked events can be
                        defined by setting <code>isBlock</code> field to true within the <code>eventSettings</code> and assigned
                        altogether with the events <code>dataSource</code>.
                    </p>
                </div>
            </div>
        );
    }
}

