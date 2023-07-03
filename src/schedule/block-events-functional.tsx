import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, ResourceDetails, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day } from '@syncfusion/ej2-react-schedule';
import './block-events.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
/**
 * schedule block events sample
 */

const BlockEvents = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).blockData, null, true) as Record<string, any>[];
    const employeeData: Record<string, any>[] = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
    ];

    const getEmployeeName = (value: ResourceDetails): string => {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    }

    const getEmployeeImage = (value: ResourceDetails): string => {
        return getEmployeeName(value).toLowerCase();
    }

    const getEmployeeDesignation = (value: ResourceDetails): string => {
        return (value as ResourceDetails).resourceData.Designation as string;
    }

    const resourceHeaderTemplate = (props: any) => {
        return (
            <div className="template-wrap">
                <div className="employee-category">
                    <div className={"employee-image " + getEmployeeImage(props)} />
                    <div className="employee-name"> {getEmployeeName(props)}</div>
                    <div className="employee-designation">{getEmployeeDesignation(props)}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">
                        <ScheduleComponent cssClass='block-events' width='100%' height='650px' selectedDate={new Date(2021, 7, 2)} currentView='TimelineDay' resourceHeaderTemplate={resourceHeaderTemplate} eventSettings={{ dataSource: data }} group={{ enableCompactView: false, resources: ['Employee'] }}>
                            <ResourcesDirective>
                                <ResourceDirective field='EmployeeId' title='Employees' name='Employee' allowMultiple={true} dataSource={employeeData} textField='Text' idField='Id' colorField='Color' />
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
                <p>This example shows how to block specific time intervals or days on the Scheduler.</p>
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
export default BlockEvents;