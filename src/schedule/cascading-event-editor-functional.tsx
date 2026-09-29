import * as React from 'react';
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    TimelineViews,
    DragAndDrop,
    Resize,
    Inject,
    ResourcesDirective,
    ResourceDirective,
} from '@syncfusion/ej2-react-schedule';

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { updateSampleSection } from '../common/sample-base';
import './cascading-event-editor.css';
import { useEffect, useRef } from 'react';

const CascadingEventEditor = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const scheduleRef = useRef<ScheduleComponent>(null);
    const floors = [
        { id: 1, name: 'Floor 1' },
        { id: 2, name: 'Floor 2' },
    ];
    const eventsData = [
        {
            Id: 1,
            Subject: 'Meeting',
            Type: 'Meeting',
            StartTime: new Date(2026, 4, 11, 9, 0),
            EndTime: new Date(2026, 4, 11, 12, 0),
            StaffId: 1,
            FloorId: 1,
            RoomId: 101,
            ResourceId: 1,
        },
        {
            Id: 2,
            Subject: 'Appointment',
            Type: 'Appointment',
            StartTime: new Date(2026, 4, 11, 10, 0),
            EndTime: new Date(2026, 4, 11, 12, 0),
            StaffId: 2,
            FloorId: 1,
            RoomId: 102,
            ResourceId: 2,
        },
        {
            Id: 3,
            Subject: 'Review',
            Type: 'Internal',
            StartTime: new Date(2026, 4, 11, 10, 0),
            EndTime: new Date(2026, 4, 11, 13, 0),
            StaffId: 3,
            FloorId: 2,
            RoomId: 201,
            ResourceId: 3,
        },
        {
            Id: 4,
            Subject: 'Discussion',
            Type: 'Meeting',
            StartTime: new Date(2026, 4, 11, 13, 0),
            EndTime: new Date(2026, 4, 11, 16, 0),
            StaffId: 4,
            FloorId: 1,
            RoomId: 101,
            ResourceId: 1,
        },
        {
            Id: 5,
            Subject: 'Planning',
            Type: 'Meeting',
            StartTime: new Date(2026, 4, 11, 11, 0),
            EndTime: new Date(2026, 4, 11, 15, 0),
            StaffId: 5,
            FloorId: 2,
            RoomId: 201,
            ResourceId: 3,
        },
        {
            Id: 6,
            Subject: 'Planning',
            Type: 'Internal',
            StartTime: new Date(2026, 4, 11, 13, 0),
            EndTime: new Date(2026, 4, 11, 15, 0),
            StaffId: 1,
            FloorId: 2,
            RoomId: 201,
            ResourceId: 3,
        },
    ];

    const staffTemplate = (props) => {
        const d = props.resourceData;
        return (
            <div className="template-wrap">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: d.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                            }}
                        >
                            {d.text.charAt(0)}
                        </div>

                        <div>
                            <div>{d.text}</div>
                        </div>
                    </div>
                </div>

                <div>{d.type}</div>
            </div>
        );
    };

    const rooms = [
        { id: 101, name: 'Room 101', floorId: 1 },
        { id: 102, name: 'Room 102', floorId: 1 },
        { id: 201, name: 'Room 201', floorId: 2 },
    ];

    const resources = [
        { id: 1, name: 'Projector', roomId: 101 },
        { id: 2, name: 'Whiteboard', roomId: 102 },
        { id: 3, name: 'Conference Kit', roomId: 201 },
    ];

    const typeOptions = ['Meeting', 'Appointment', 'Internal'];

    const staffData = [
        { id: 1, text: 'Mike Anderson', color: '#1aaa55', type: 'Consultants' },
        { id: 2, text: 'Kevin Larson', color: '#357cd2', type: 'Sales' },
        { id: 3, text: 'Sarah Johnson', color: '#f57f17', type: 'Sales' },
        { id: 4, text: 'David Miller', color: '#7fa900', type: 'Testers' },
        { id: 5, text: 'Emma Wilson', color: '#df5286', type: 'Testers' },
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Meeting':
                return '#22c55e';
            case 'Appointment':
                return '#3b82f6';
            case 'Internal':
                return '#f59e0b';
            default:
                return '#6b7280';
        }
    };

    const onPopupOpen = (args) => {
        if (args.type === 'Editor' && args.element) {
            args.element.classList.add('cascading-editor-dialog');
        }
    };

    const onPopupClose = (args) => {
        if (args.type === 'Editor' && args.element) {
            args.element.classList.remove('cascading-editor-dialog');
        }
    };

    const CustomEditor = (props) => {
        const [type, setType] = React.useState(props.Type || 'Meeting');
        const [floorId, setFloorId] = React.useState(props.FloorId || null);
        const [roomId, setRoomId] = React.useState(props.RoomId || null);

        const [filteredRooms, setFilteredRooms] = React.useState<{ id: number; name: string; floorId: number }[]>([]);
        const [filteredResources, setFilteredResources] = React.useState<{ id: number; name: string; roomId: number }[]>(resources);

        React.useEffect(() => {
            const t = props.Type || 'Meeting';
            const f = props.FloorId || null;
            const r = props.RoomId || null;

            setType(t);
            setFloorId(f);
            setRoomId(r);

            if (t === 'Meeting' && f) {
                const roomsFiltered = rooms.filter((rm) => rm.floorId === f);
                setFilteredRooms(roomsFiltered);

                if (r) {
                    const resFiltered = resources.filter((rs) => rs.roomId === r);
                    setFilteredResources(resFiltered);
                } else {
                    setFilteredResources(resources);
                }
            } else {
                setFilteredRooms([]);
                setFilteredResources(resources);
            }
        }, [props.Id]);

        const onTypeChange = (e) => {
            const value = e.value;
            setType(value);
            setFloorId(null);
            setRoomId(null);
            setFilteredRooms([]);
            setFilteredResources(resources);
        };

        const onFloorChange = (e) => {
            const selected = e.value;
            setFloorId(selected);
            const roomsFiltered = rooms.filter((r) => r.floorId === selected);
            setFilteredRooms(roomsFiltered);
            setRoomId(null);
            setFilteredResources(resources);
        };

        const onRoomChange = (e) => {
            const selected = e.value;
            setRoomId(selected);
            const resFiltered = resources.filter((r) => r.roomId === selected);
            setFilteredResources(resFiltered);
        };

        return (
            <div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    className="e-field e-input"
                                    name="Subject"
                                    defaultValue={props.Subject || ''}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Type</td>
                            <td>
                                <DropDownListComponent
                                    className="e-field"
                                    dataSource={typeOptions}
                                    value={type}
                                    change={onTypeChange}
                                    name="Type"
                                />
                            </td>
                        </tr>

                        <tr style={{ display: type === 'Meeting' ? '' : 'none' }}>
                            <td>Floor</td>
                            <td>
                                <DropDownListComponent
                                    dataSource={floors}
                                    fields={{ text: 'name', value: 'id' }}
                                    value={floorId}
                                    change={onFloorChange}
                                    name="FloorId"
                                    className="e-field"
                                />
                            </td>
                        </tr>

                        <tr style={{ display: type === 'Meeting' ? '' : 'none' }}>
                            <td>Room</td>
                            <td>
                                <DropDownListComponent
                                    dataSource={filteredRooms}
                                    fields={{ text: 'name', value: 'id' }}
                                    value={roomId}
                                    change={onRoomChange}
                                    name="RoomId"
                                    className="e-field"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Resource</td>
                            <td>
                                <DropDownListComponent
                                    className="e-field"
                                    dataSource={staffData}
                                    fields={{ text: 'text', value: 'id' }}
                                    name="StaffId"
                                    value={props.StaffId}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Start</td>
                            <td>
                                <DateTimePickerComponent
                                    className="e-field"
                                    name="StartTime"
                                    value={props.StartTime}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>End</td>
                            <td>
                                <DateTimePickerComponent
                                    className="e-field"
                                    name="EndTime"
                                    value={props.EndTime}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <div className="schedule-container" style={{ width: '100%' }}>
                        <ScheduleComponent
                            cssClass="custom-scheduler"
                            ref={scheduleRef}
                            width="100%"
                            height="600px"
                            selectedDate={new Date(2026, 4, 11)}
                            currentView="TimelineDay"
                            group={{ resources: ['Staff'] }}
                            popupOpen={onPopupOpen}
                            popupClose={onPopupClose}
                            headerIndentTemplate={() => (
                                <div className="template-wrap header-indent">
                                    <div>Staff</div>
                                    <div>Type</div>
                                </div>
                            )}
                            resourceHeaderTemplate={staffTemplate}
                            eventSettings={{
                                dataSource: eventsData,
                            }}
                            editorTemplate={(props) => (
                                <CustomEditor key={props.Id || 'new'} {...props} />
                            )}
                            eventRendered={(args) => {
                                const type = args.data.Type || 'Meeting';
                                const color = getTypeColor(type);
                                args.element.style.backgroundColor = color;
                            }}
                        >
                            <ResourcesDirective>
                                <ResourceDirective
                                    field="StaffId"
                                    title="Staff"
                                    name="Staff"
                                    dataSource={staffData}
                                    textField="text"
                                    idField="id"
                                    groupIDField="StaffId"
                                    colorField="color"
                                />
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option="TimelineDay" />
                            </ViewsDirective>
                            <Inject services={[TimelineViews, DragAndDrop, Resize]} />
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This demo showcases the Cascading Event Editor in the Syncfusion React Scheduler.
                    Editor fields dynamically update based on user selections, enabling guided input,
                    improving accuracy, and enhancing usability for complex scheduling scenarios.
                </p>
            </div>

            <div id="description">
                <p>
                    This example demonstrates a <strong>Cascading Event Editor</strong> built with the Syncfusion Scheduler component.
                    It enhances the default editor by introducing dependent fields that react to user input,
                    creating a more structured and efficient event creation experience.
                </p>

                <p><strong>Cascading Dropdowns</strong></p>
                <p>
                    Dropdown selections dynamically filter related fields, ensuring users only see relevant options.
                    This reduces clutter and simplifies the form interaction.
                </p>

                <p><strong>Improved Data Consistency</strong></p>
                <p>
                    Field dependencies enforce logical relationships, minimizing invalid entries and maintaining
                    clean, structured data—ideal for hierarchical scenarios like resources, categories, or services.
                </p>

                <p><strong>Flexible Customization</strong></p>
                <p>
                    The editor layout is fully customizable, allowing integration of custom inputs, validation,
                    and UI enhancements to match specific business needs.
                </p>

                <p><strong>Key Benefits</strong></p>
                <p>
                    This approach simplifies data entry, reduces errors, and boosts productivity through
                    intelligent field interactions—making it well-suited for advanced scheduling and booking applications.
                </p>
                
                <p>
                    Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our <a target="_blank" href="https://www.syncfusion.com/scheduler-sdk/react-scheduler">React Scheduler</a> component page.
                </p>
            </div>
        </div>
    );
};

export default CascadingEventEditor;
