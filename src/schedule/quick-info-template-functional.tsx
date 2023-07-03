import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { extend, Internationalization, isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, Day, Week, WorkWeek, Month, Agenda, MonthAgenda, Inject, Resize, DragAndDrop, ResourcesModel, CellClickEventArgs, CurrentAction, PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";
import './quick-info-template.css';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule quick info template sample
 */

const QuickInfoTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let scheduleObj = useRef<ScheduleComponent>(null);
    let eventTypeObj = useRef<DropDownListComponent>(null);
    let titleObj = useRef<TextBoxComponent>(null);
    let notesObj = useRef<TextBoxComponent>(null);
    const scheduleData: Record<string, any>[] = extend([], (dataSource as Record<string, any>).quickInfoTemplateData, undefined, true) as Record<string, any>[];
    const intl: Internationalization = new Internationalization();
    const roomData: Record<string, any>[] = [
        { Name: 'Jammy', Id: 1, Capacity: 20, Color: '#ea7a57', Type: 'Conference' },
        { Name: 'Tweety', Id: 2, Capacity: 7, Color: '#7fa900', Type: 'Cabin' },
        { Name: 'Nestle', Id: 3, Capacity: 5, Color: '#5978ee', Type: 'Cabin' },
        { Name: 'Phoenix', Id: 4, Capacity: 15, Color: '#fec200', Type: 'Conference' },
        { Name: 'Mission', Id: 5, Capacity: 25, Color: '#df5286', Type: 'Conference' },
        { Name: 'Hangout', Id: 6, Capacity: 10, Color: '#00bdae', Type: 'Cabin' },
        { Name: 'Rick Roll', Id: 7, Capacity: 20, Color: '#865fcf', Type: 'Conference' },
        { Name: 'Rainbow', Id: 8, Capacity: 8, Color: '#1aaa55', Type: 'Cabin' },
        { Name: 'Swarm', Id: 9, Capacity: 30, Color: '#df5286', Type: 'Conference' },
        { Name: 'Photogenic', Id: 10, Capacity: 25, Color: '#710193', Type: 'Conference' }
    ];

    const getResourceData = (data: Record<string, any>): Record<string, any> => {
        const resources: ResourcesModel = scheduleObj.current.getResourceCollections().slice(-1)[0];
        const resourceData: Record<string, any> = (resources.dataSource as Record<string, any>[]).filter((resource: Record<string, any>) => resource.Id === data.RoomId)[0] as Record<string, any>;
        return resourceData;
    }

    const getHeaderStyles = (data: Record<string, any>): Record<string, any> => {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        } else {
            const resourceData: Record<string, any> = getResourceData(data);
            return { background: resourceData.Color, color: '#FFFFFF' };
        }
    }

    const getHeaderTitle = (data: Record<string, any>): string => {
        return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
    }

    const getHeaderDetails = (data: { [key: string]: Date }): string => {
        return intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    }

    const getEventType = (data: { [key: string]: string }): string => {
        return getResourceData(data).Name as string;
    }

    const buttonClickActions = (e: Event) => {
        const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
        const getSlotData: Function = (): Record<string, any> => {
            const addObj: Record<string, any> = {};
            addObj.Id = scheduleObj.current.getEventMaxID();
            addObj.Subject = isNullOrUndefined(titleObj.current.value) ? 'Add title' : titleObj.current.value;
            addObj.StartTime = new Date(scheduleObj.current.activeCellsData.startTime);
            addObj.EndTime = new Date(scheduleObj.current.activeCellsData.endTime);
            addObj.IsAllDay = scheduleObj.current.activeCellsData.isAllDay;
            addObj.Description = isNullOrUndefined(notesObj.current.value) ? 'Add notes' : notesObj.current.value;
            addObj.RoomId = eventTypeObj.current.value;
            return addObj;
        };
        if ((e.target as HTMLElement).id === 'add') {
            const addObj: Record<string, any> = getSlotData();
            scheduleObj.current.addEvent(addObj);
        } else if ((e.target as HTMLElement).id === 'delete') {
            const eventDetails: Record<string, any> = scheduleObj.current.activeEventData.event as Record<string, any>;
            let currentAction: CurrentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            scheduleObj.current.deleteEvent(eventDetails, currentAction);
        } else {
            const isCellPopup: boolean = (quickPopup.firstElementChild as HTMLElement).classList.contains('e-cell-popup');
            const eventDetails: Record<string, any> = isCellPopup ? getSlotData() : scheduleObj.current.activeEventData.event as Record<string, any>;
            let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            scheduleObj.current.openEditor(eventDetails, currentAction, true);
        }
        scheduleObj.current.closeQuickInfoPopup();
    }

    const onPopupOpen = (args: PopupOpenEventArgs): void => {
        if (args.target && !args.target.classList.contains('e-appointment') && !isNullOrUndefined(titleObj) && !isNullOrUndefined(titleObj.current)) {
            titleObj.current.focusIn();
        }
    }

    const headerTemplate = (props: { [key: string]: Date }) => {
        return (
            <div className="quick-info-header">
                <div className="quick-info-header-content" style={getHeaderStyles(props)}>
                    <div className="quick-info-title">{getHeaderTitle(props)}</div>
                    <div className="duration-text">{getHeaderDetails(props)}</div>
                </div>
            </div>
        );
    }

    const contentTemplate = (props: { [key: string]: string }) => {
        return (
            <div className="quick-info-content">
                {props.elementType === 'cell' ?
                    <div className="e-cell-content">
                        <div className="content-area">
                            <TextBoxComponent id="title" ref={titleObj} placeholder="Title" />
                        </div>
                        <div className="content-area">
                            <DropDownListComponent id="eventType" ref={eventTypeObj} dataSource={roomData} fields={{ text: "Name", value: "Id" }} placeholder="Choose Type" index={0} popupHeight="200px" />
                        </div>
                        <div className="content-area">
                            <TextBoxComponent id="notes" ref={notesObj} placeholder="Notes" />
                        </div>
                    </div>
                    :
                    <div className="event-content">
                        <div className="meeting-type-wrap">
                            <label>Subject</label>:
                            <span>{props.Subject}</span>
                        </div>
                        <div className="meeting-subject-wrap">
                            <label>Type</label>:
                            <span>{getEventType(props)}</span>
                        </div>
                        <div className="notes-wrap">
                            <label>Notes</label>:
                            <span>{props.Description}</span>
                        </div>
                    </div>
                }
            </div>
        );
    }

    const footerTemplate = (props: Record<string, any>) => {
        return (
            <div className="quick-info-footer">
                {props.elementType == "cell" ?
                    <div className="cell-footer">
                        <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" onClick={buttonClickActions.bind(this)} />
                        <ButtonComponent id="add" cssClass='e-flat' content="Add" isPrimary={true} onClick={buttonClickActions.bind(this)} />
                    </div>
                    :
                    <div className="event-footer">
                        <ButtonComponent id="delete" cssClass='e-flat' content="Delete" onClick={buttonClickActions.bind(this)} />
                        <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" isPrimary={true} onClick={buttonClickActions.bind(this)} />
                    </div>
                }
            </div>
        );
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent id="schedule" cssClass='quick-info-template' ref={scheduleObj} height="650px" selectedDate={new Date(2021, 0, 9)} eventSettings={{ dataSource: scheduleData }} quickInfoTemplates={{ header: headerTemplate.bind(this), content: contentTemplate.bind(this), footer: footerTemplate.bind(this) }} popupOpen={onPopupOpen.bind(this)}>
                        <ResourcesDirective>
                            <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' textField='Name' idField='Id' colorField='Color' dataSource={roomData}></ResourceDirective>
                        </ResourcesDirective>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id='action-description'>
                <p>This demo showcases the quick popups for cells and appointments with the customized templates.</p>
            </div>
            <div id='description'>
                <p>In this demo, the quick popup is customized based on the office required appointment-related fields which can be achieved by making use of the <code>quickInfoTemplate</code> option.</p>
                <p>
                    The <code>quickInfoTemplate</code> has three UI elements such as <code>header</code>, <code>content</code>, and <code>footer</code>. You can customize these UI elements of the quick popup.
                    You can also customize whether the quick popup is applicable to the cells or events or for both using the <code>elementType</code> property.
                </p>
            </div>
        </div>
    );
}
export default QuickInfoTemplate;