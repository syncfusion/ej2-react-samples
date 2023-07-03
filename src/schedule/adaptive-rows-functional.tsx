import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { TimelineViews, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './adaptive-rows.css';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

/**
 * schedule adaptive rows sample
 */

const AdaptiveRows = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const schObj = useRef<ScheduleComponent>(null);
    const data: Record<string, any>[] = (dataSource as any).roomData as Record<string, any>[];
    const [rowAutoHeight, setRowAutoHeight] = useState<boolean>(true);
    const [scheduleData, setScheduleData] = useState<Record<string, any>[]>(data);
    const ownerData: Record<string, any>[] = [
        { text: 'Room A', id: 1, color: '#98AFC7' },
        { text: 'Room B', id: 2, color: '#99c68e' },
        { text: 'Room C', id: 3, color: '#C2B280' },
        { text: 'Room D', id: 4, color: '#3090C7' },
        { text: 'Room E', id: 5, color: '#95b9' },
        { text: 'Room F', id: 6, color: '#95b9c7' },
        { text: 'Room G', id: 7, color: '#deb887' },
        { text: 'Room H', id: 8, color: '#3090C7' },
        { text: 'Room I', id: 9, color: '#98AFC7' },
        { text: 'Room J', id: 10, color: '#778899' }
    ];

    const onChange = (args: ChangeEventArgs): void => {
        setRowAutoHeight(args.checked);
    }
    useEffect(() => {
        if (schObj.current) {
            schObj.current.dataBind();
            const updatedData = rowAutoHeight ? extend([], data, null, true) : data;
            setScheduleData(updatedData as Record<string, any>[]);
        }
    }, [rowAutoHeight]);
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent ref={schObj} cssClass='adaptive-rows' width='100%' height='650px' selectedDate={new Date(2021, 7, 2)} rowAutoHeight={rowAutoHeight} eventSettings={{ dataSource: scheduleData, fields: { id: 'Id', subject: { title: 'Summary', name: 'Subject' }, location: { title: 'Location', name: 'Location' }, description: { title: 'Comments', name: 'Description' }, startTime: { title: 'From', name: 'StartTime' }, endTime: { title: 'To', name: 'EndTime' } } }} group={{ enableCompactView: false, resources: ['MeetingRoom'] }} >
                        <ResourcesDirective>
                            <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' allowMultiple={true} dataSource={ownerData} textField='text' idField='id' colorField='color' />
                        </ResourcesDirective>
                        < ViewsDirective >
                            <ViewDirective option='TimelineDay' />
                            <ViewDirective option='TimelineWeek' />
                        </ViewsDirective>
                        < Inject services={[TimelineViews, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent id='adaptive-rows' checked={rowAutoHeight} label='Row Auto Height' change={onChange} ></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This example showcases how the work-cells of Scheduler auto-adjust its height based on the number of
                    appointments present in those time ranges.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, <code>rowAutoHeight</code> property is set as <code>true</code> to auto-adjust the height
                    of work cells based on the number of appointments present in the same time ranges. Also, this functionality
                    is applicable only on all the timeline views as well as on the calendar month view. When this option is disabled,
                    the height of the work cells remains static and at the time of exceeding appointments count, the <code>+n more</code>
                    text indicator will be shown at the bottom of the cells.
                </p>
            </div>
        </div>
    );
}
export default AdaptiveRows;