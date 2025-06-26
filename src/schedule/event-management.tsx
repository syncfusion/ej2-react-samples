import * as React from 'react';
import './event-management.css';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, TimelineViews, Week, Day, Agenda, Inject, ExcelExport, Print,
  ToolbarItemsDirective, ToolbarItemDirective, PopupOpenEventArgs, PopupCloseEventArgs, EventRenderedArgs,
  ResourcesModel, CellClickEventArgs, ResourceDetails
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { AnimationSettingsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { Internationalization, closest, addClass, removeClass, extend } from '@syncfusion/ej2-base';
import { TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent, MenuEventArgs } from '@syncfusion/ej2-react-splitbuttons';
import * as dataSource from './datasource.json';
import { DateTimePicker } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';

let isDraggedItemDropped: boolean = false;
let draggedItemId: number = 0;
let draggedItemSpeakers: object[] = [];
let draggedItemDescription: string = '';
let selectedUnplannedEventItem: number = 0;

export class EventManagement extends SampleBase<{}, {}> {
  private scheduleRef: React.RefObject<ScheduleComponent>;
  private allUnplannedEventsTreeViewRef: React.RefObject<TreeViewComponent>;
  private CloudSecurityEventTreeViewRef: React.RefObject<TreeViewComponent>;
  private AIAutomationEventTreeViewRef: React.RefObject<TreeViewComponent>;
  private alertDialogRef: React.RefObject<DialogComponent>;

  private intl: Internationalization;
  private unplannedEvents: string[];
  private animationSettings: AnimationSettingsModel;

  private eventsData: Record<string, any>[];
  private unplannedEvent1Data: Record<string, any>[];
  private unplannedEvent2Data: Record<string, any>[];
  private allUnplannedEventsDataRef: Record<string, any>[];

  private rooms: Record<string, any>[];
  private roomsData: Record<string, any>[];
  private unPlannedEventsList: { id: string, name: string }[];

  constructor(props: {}) {
    super(props);

    this.scheduleRef = React.createRef<ScheduleComponent>();
    this.allUnplannedEventsTreeViewRef = React.createRef<TreeViewComponent>();
    this.CloudSecurityEventTreeViewRef = React.createRef<TreeViewComponent>();
    this.AIAutomationEventTreeViewRef = React.createRef<TreeViewComponent>();
    this.alertDialogRef = React.createRef<DialogComponent>();

    this.intl = new Internationalization();
    this.unplannedEvents = ['', 'Cloud Security Essentials', 'AI for Automation'];
    this.animationSettings = { effect: 'None' };

    this.eventsData = extend([], (dataSource as Record<string, any>).TechnicalEventData, null, true) as Record<string, any>[];
    this.unplannedEvent1Data = extend([], (dataSource as Record<string, any>).CloudSecurityEventData, null, true) as Record<string, any>[];
    this.unplannedEvent2Data = extend([], (dataSource as Record<string, any>).AIAutomationEventData, null, true) as Record<string, any>[];
    this.allUnplannedEventsDataRef = this.unplannedEvent1Data.concat(this.unplannedEvent2Data);

    this.rooms = [
      { RoomId: 1, RoomName: 'Room A', RoomCapacity: 100, RoomColor: '#0F6CBD' },
      { RoomId: 2, RoomName: 'Room B', RoomCapacity: 200, RoomColor: '#B71C1C' },
      { RoomId: 3, RoomName: 'Room C', RoomCapacity: 300, RoomColor: '#E65100' },
      { RoomId: 4, RoomName: 'Room D', RoomCapacity: 400, RoomColor: '#558B2F' },
    ];

    this.roomsData = [
      { RoomId: 0, RoomName: 'All' },
      { RoomId: 1, RoomName: 'Room A' },
      { RoomId: 2, RoomName: 'Room B' },
      { RoomId: 3, RoomName: 'Room C' },
      { RoomId: 4, RoomName: 'Room D' },
    ];

    this.unPlannedEventsList = this.unplannedEvents.map((name, index) => ({
      id: index.toString(),
      name: name === '' ? 'All' : name
    }));

    // Bind methods to this
    this.onEventRendered = this.onEventRendered.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onPopupOpen = this.onPopupOpen.bind(this);
    this.onPopupClose = this.onPopupClose.bind(this);
    this.onTreeDragStart = this.onTreeDragStart.bind(this);
    this.onTreeDragging = this.onTreeDragging.bind(this);
    this.onTreeDragStop = this.onTreeDragStop.bind(this);
    this.onUnplannedEventSelect = this.onUnplannedEventSelect.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.handlePrintExportSelect = this.handlePrintExportSelect.bind(this);
    this.toggleUnplannedEventsElement = this.toggleUnplannedEventsElement.bind(this);
    this.roomValueTemplate = this.roomValueTemplate.bind(this);
    this.resourceHeaderTemplate = this.resourceHeaderTemplate.bind(this);
    this.quickInfoHeader = this.quickInfoHeader.bind(this);
    this.quickInfoContent = this.quickInfoContent.bind(this);
    this.agendaTemplate = this.agendaTemplate.bind(this);
    this.treeTemplate = this.treeTemplate.bind(this);
    this.roomsDropDown = this.roomsDropDown.bind(this);
    this.printAndExport = this.printAndExport.bind(this);
  }

  checkRoomCapacity(Capacity: number, RoomId: number): boolean {
    const room: Record<string, any> = this.rooms.find((room) => room.RoomId === RoomId);
    return room && room.RoomCapacity >= Capacity;
  }

  getTimeString(value: Date): string {
    return this.intl.formatDate(value, { type: 'time', skeleton: 'short' });
  }

  getRoomName(value: any): string {
    return ((value.resourceData) ?
      value.resourceData[value.resource.textField] :
      value.resourceName);
  }

  getRoomCapacity(capacity: string): string {
    return 'Capacity - ' + capacity;
  }

  getResourceData(roomId: number): { [key: string]: Object } {
    const resources: ResourcesModel = this.scheduleRef.current?.getResourceCollections().slice(-1)[0];
    const resourceData = (resources.dataSource as any).filter((resource: any) => resource.RoomId === roomId)[0];
    return resourceData;
  }

  getQuickInfoHeaderStyle(data: any): { [key: string]: Object } {
    const resourceData = this.getResourceData(data.RoomId);
    return { background: resourceData.RoomColor, color: '#FFFFFF' };
  }

  getQuickInfoDurationText(data: Record<string, any>): string {
    return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
      this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
  }

  unplannedEventsUpdatedData(dataSource: Record<string, any>[], value: string): Record<string, any>[] {
    return dataSource.filter((data) => data.Title === value);
  }

  isDataSourceEmpty(dataSource: Record<string, any>[]): boolean {
    return !dataSource || dataSource.length === 0;
  }

  handleEmptyDataSourceDisplay(treeViewRef: any, dataSource: Record<string, any>[]): void {
    const noEventsElement: HTMLElement = document.querySelector('.no-events-message');
    if (noEventsElement) {
      if (this.isDataSourceEmpty(dataSource)) {
        treeViewRef.element.style.display = 'none';
        noEventsElement.classList.remove('hidden');
      } else {
        treeViewRef.element.style.display = 'block';
        noEventsElement.classList.add('hidden');
      }
    }
  }

  // Event handlers
  toggleUnplannedEventsElement(): void {
    let settingsPanel: HTMLElement = document.querySelector('.unplanned-events-container');
    let toggleButton: HTMLElement = this.scheduleRef.current?.element.querySelector('.e-show-unplanned-events') || this.scheduleRef.current?.element.querySelector('.e-hide-unplanned-events');
    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-hide-unplanned-events', 'e-show-unplanned-events');
    }
    else {
      addClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-show-unplanned-events', 'e-hide-unplanned-events');
    }
  }

  handlePrintExportSelect(args: MenuEventArgs): void {
    switch (args.item.id) {
      case 'print':
        // Hide toolbar items after Agenda
        document.querySelectorAll('.toolbar-post-agenda').forEach(item => {
          (item as HTMLElement).style.display = 'none';
        });
        this.scheduleRef.current?.print();
        setTimeout(() => {
          document.querySelectorAll('.toolbar-post-agenda').forEach(item => {
            (item as HTMLElement).style.display = 'inline-block';
          });
        }, 1000);
        break;
      case 'export':
        let exportValues = {
          fields: ['Id', 'Subject', 'Title', 'StartTime', 'EndTime', 'RoomId', 'Capacity']
        };
        this.scheduleRef.current?.exportToExcel(exportValues);
        break;
      default:
        break;
    }
  }

  onEventRendered(args: EventRenderedArgs): void {
    const data: Record<string, any> = args.data;
    const isBreakEvent: boolean = data.Subject.toLowerCase().includes('break') || data.Subject.toLowerCase().includes('lunch');
    if (isBreakEvent) {
      if (args.element.classList.contains('e-agenda-item')) {
        args.element.querySelector('.e-appointment').classList.add('e-break-event');
      } else {
        args.element.classList.add('e-break-event');
      }
    }
  }

  onRoomChange(e: ChangeEventArgs): void {
    const value: number = e.value as number;
    let previousItemData: Record<string, any> = e.previousItemData;
    if (!previousItemData) {
      return;
    }
    if (value === 0) {
      this.scheduleRef.current?.removeResource((previousItemData as any).RoomId, 'Rooms');
      this.scheduleRef.current?.addResource(this.rooms, 'Rooms', value);
    } else {
      if (previousItemData.RoomId === 0) {
        let resourceData: Record<string, any>[] = this.rooms.filter((room) => room.RoomId !== value);
        for (let idx = 0; idx < resourceData.length; idx++) {
          let resource: Record<string, any> = resourceData[idx];
          this.scheduleRef.current?.removeResource(resource.RoomId, 'Rooms');
        }
      } else {
        this.scheduleRef.current?.removeResource(previousItemData.RoomId, 'Rooms');
        let resourceData: Record<string, any>[] = this.rooms.filter((room) => room.RoomId === value);
        this.scheduleRef.current?.addResource(resourceData[0], 'Rooms', value);
      }
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    const isQuickInfoPopup: boolean = args.type === 'QuickInfo' || args.type === 'ViewEventInfo';
    const isEditorPopup: boolean = args.type === 'Editor';
    const isBreakEvent: boolean = args.target?.classList.contains('e-break-event');
    if ((isQuickInfoPopup && isBreakEvent) || (isEditorPopup && !isDraggedItemDropped)) {
      args.cancel = true;
      return;
    }
    if (isQuickInfoPopup) {
      args.element.classList.add('event-management-quick-popup');
    } else if (isEditorPopup) {
      args.element.classList.add('event-management-editor-popup');
      args.element.querySelector('.capacity-alert')?.remove();
      args.element.querySelector('.time-alert')?.remove();
      const startTimeElement: HTMLElement = args.element.querySelector('.e-start-end-row .e-start.e-control.e-datetimepicker');
      const endTimeElement: HTMLElement = args.element.querySelector('.e-start-end-row .e-end.e-control.e-datetimepicker');
      if (startTimeElement && endTimeElement) {
        const startDateTimePickerRef: DateTimePicker = (startTimeElement as any).ej2_instances?.[0];
        const endDateTimePickerRef: DateTimePicker = (endTimeElement as any).ej2_instances?.[0];
        if (startDateTimePickerRef && endDateTimePickerRef) {
          // Use the component's change event
          startDateTimePickerRef.change = () => {
            const startTime: Date = new Date(startDateTimePickerRef.value);
            // Handle duration calculation
            if (args.data && args.data.Duration) {
              const durationMatch = args.data.Duration.match(/(\d+)\s+(hour|hours|minute|minutes)/i);
              if (durationMatch) {
                const durationValue: number = parseInt(durationMatch[1]);
                const durationUnit: string = durationMatch[2].toLowerCase();
                const newEndTime: Date = new Date(startTime);
                if (durationUnit === 'hour' || durationUnit === 'hours') {
                  newEndTime.setHours(newEndTime.getHours() + durationValue);
                } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
                  newEndTime.setMinutes(newEndTime.getMinutes() + durationValue);
                }
                // Update end time
                endDateTimePickerRef.value = newEndTime;
              }
            }
          };
        }
      }
    }
  }

  onPopupClose(args: PopupCloseEventArgs): void {
    if (args.type === 'Editor') {
      const targetElement: HTMLElement = args.event.target as HTMLElement;
      const isSaveAction: boolean = targetElement.classList.contains('e-event-save') || targetElement.classList.contains('e-save-icon');
      if (isSaveAction) {
        const roomId: number = args.data.RoomId;
        const startTime: Date = args.data.StartTime;
        const endTime: Date = args.data.EndTime;
        const capacity: number = args.data.Capacity;
        const isRoomFiltered: boolean = (this.scheduleRef.current?.resourceCollection[0].dataSource as Record<string, any>[]).length === 1;
        const isRoomAvailable: boolean = this.scheduleRef.current?.isSlotAvailable(startTime, endTime, !isRoomFiltered ? roomId - 1 : 0) && startTime.getHours() >= 8 && (endTime.getHours() < 18 || (endTime.getHours() === 18 && endTime.getMinutes() === 0));
        const isCapacityAvailable: boolean = this.checkRoomCapacity(capacity, roomId);
        if (!isRoomAvailable) {
          let timeElement: Element = args.element.querySelector('.e-start-end-row');
          if (!args.element.querySelector('.time-alert')) {
            const newDiv: Element = document.createElement('div');
            newDiv.classList.add('time-alert');
            newDiv.textContent = 'Select an open time between 8 a.m. and 6 p.m.';
            timeElement.insertAdjacentElement('afterend', newDiv);
          }
        } else {
          if (args.element.querySelector('.time-alert')) {
            args.element.querySelector('.time-alert').remove();
          }
        }
        if (!isCapacityAvailable) {
          let timeElement: Element = args.element.querySelector('.e-description-row');
          if (!args.element.querySelector('.capacity-alert')) {
            const newDiv: Element = document.createElement('div');
            newDiv.classList.add('capacity-alert');
            newDiv.textContent = "Number of participants exceeds the room's limit.";
            timeElement.insertAdjacentElement('afterend', newDiv);
          }
        } else {
          if (args.element.querySelector('.capacity-alert')) {
            args.element.querySelector('.capacity-alert').remove();
          }
        }
        if (!isRoomAvailable || !isCapacityAvailable) {
          args.cancel = true;
        } else {
          let unplannedEventsTreeViewRefs = [this.allUnplannedEventsTreeViewRef, this.CloudSecurityEventTreeViewRef, this.AIAutomationEventTreeViewRef];
          let unplannedEventTreeViewRef = unplannedEventsTreeViewRefs[selectedUnplannedEventItem].current;
          let unplannedEventTreeViewData: { [key: string]: Object }[] = unplannedEventTreeViewRef.fields.dataSource as { [key: string]: Object }[];
          const updatedData = unplannedEventTreeViewData.filter((item: any) => item.Id !== draggedItemId);
          unplannedEventTreeViewRef.fields.dataSource = updatedData;
          this.allUnplannedEventsDataRef = this.allUnplannedEventsDataRef.filter(
            item => item.Id !== draggedItemId
          );
          this.handleEmptyDataSourceDisplay(unplannedEventTreeViewRef, updatedData);
          args.data.Speakers = draggedItemSpeakers;
          args.data.Description = draggedItemDescription;
        }
      }
      isDraggedItemDropped = false;
    }
  }

  onTreeDragStart(): void {
    document.body.classList.add('e-disble-not-allowed');
  }

  onTreeDragging(event: DragAndDropEventArgs): void {
    document.body.classList.add('tree-item-dragging');
    if (this.scheduleRef.current?.isAdaptive) {
      const classElement: HTMLElement = this.scheduleRef.current?.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
    // Remove not-allowed class from work cells
    if (event.target.classList.contains('e-work-cells')) {
      event.target.classList.remove('not-allowed-cursor');
    } else {
      // Add not-allowed class to non-work cells
      event.target.classList.add('not-allowed-cursor');
    }
  }

  onTreeDragStop(event: DragAndDropEventArgs): void {
    // Remove the class when dragging stops
    document.body.classList.remove('tree-item-dragging');
    // Remove any remaining cursor classes
    const dropNotAllowedElements = document.querySelectorAll('.not-allowed-cursor');
    dropNotAllowedElements.forEach(element => {
      element.classList.remove('not-allowed-cursor');
    });
    const treeviewElement: Element = closest(event.target, '.e-treeview');
    const classElement: Element = this.scheduleRef.current?.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }
    if (!treeviewElement) {
      event.cancel = true;
      let scheduleElement: Element = closest(event.target, '.e-content-wrap');
      if (scheduleElement) {
        let treeviewData: { [key: string]: Object }[] = this.allUnplannedEventsTreeViewRef.current.fields.dataSource as { [key: string]: Object }[];
        if (event.target.classList.contains('e-work-cells')) {
          const filteredData: { [key: string]: Object }[] = treeviewData.filter((item: any) => item.Id === parseInt(event.draggedNodeData.id as any, 10));
          const { Subject, Capacity, Speakers, Description, Duration, EventType, TargetAudience, EventLevel, EventTags, Title } = filteredData[0];
          const cellData: CellClickEventArgs = this.scheduleRef.current?.getCellDetails(event.target);
          const StartTime: Date = cellData.startTime;
          let EndTime: Date;
          const durationValue = parseInt((Duration as any).split(' ')[0]);
          const durationUnit = (Duration as any).split(' ')[1];
          let copyStartTime: Date = new Date(StartTime);
          if (durationUnit === 'hour' || durationUnit === 'hours') {
            copyStartTime.setHours(copyStartTime.getHours() + durationValue);  // Adds hours to StartTime
          } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
            copyStartTime.setMinutes(copyStartTime.getMinutes() + durationValue);  // Adds minutes to StartTime
          }
          EndTime = copyStartTime;
          const resourceDetails: ResourceDetails = this.scheduleRef.current?.getResourcesByIndex(cellData.groupIndex);
          const roomId: number = resourceDetails.resourceData.RoomId;
          const isRoomFiltered: boolean = (this.scheduleRef.current?.resourceCollection[0].dataSource as Record<string, any>[]).length === 1;
          const isRoomAvailable: boolean = this.scheduleRef.current?.isSlotAvailable(StartTime, EndTime, !isRoomFiltered ? roomId - 1 : 0);
          const isCapacityAvailable: boolean = this.checkRoomCapacity(Capacity as number, roomId);
          if (!isRoomAvailable || !isCapacityAvailable) {
            this.alertDialogRef.current.content = !isRoomAvailable ? 'This room is already booked for this time slot. Please select a different room or time.' : 'This room cannot accommodate the stated number of attendees. Please select a room with a suitable capacity.';
            this.alertDialogRef.current.show();
            return;
          }
          let eventData = {
            Subject: Subject,
            Title: Title,
            StartTime: StartTime,
            EndTime: EndTime,
            RoomId: roomId,
            Capacity: Capacity,
            Duration: Duration,
            EventType: EventType,
            TargetAudience: TargetAudience,
            EventLevel: EventLevel,
            EventTags: EventTags
          };
          isDraggedItemDropped = true;
          draggedItemId = parseInt(event.draggedNodeData.id as string, 10);
          draggedItemSpeakers = Speakers as object[];
          draggedItemDescription = Description.toString();
          this.scheduleRef.current?.openEditor(eventData, 'Add', true);
        }
      }
    }
    document.body.classList.remove('e-disble-not-allowed');
  }

  onUnplannedEventSelect(args: ChangeEventArgs): void {
    let treeviewRefs = [this.allUnplannedEventsTreeViewRef, this.CloudSecurityEventTreeViewRef, this.AIAutomationEventTreeViewRef];
    let previouslySelectedItem: number = parseInt((args.previousItemData as any).id, 10);
    selectedUnplannedEventItem = parseInt(args.value as any, 10);
    treeviewRefs[previouslySelectedItem].current.element.style.display = 'none';
    treeviewRefs[selectedUnplannedEventItem].current.element.style.display = '';
    treeviewRefs[selectedUnplannedEventItem].current.fields.dataSource =
      selectedUnplannedEventItem === 0 ? (treeviewRefs[1].current.fields.dataSource as any).concat(treeviewRefs[2].current.fields.dataSource) : this.unplannedEventsUpdatedData(this.allUnplannedEventsDataRef, this.unplannedEvents[selectedUnplannedEventItem]);
    this.handleEmptyDataSourceDisplay(treeviewRefs[selectedUnplannedEventItem].current, treeviewRefs[selectedUnplannedEventItem].current.fields.dataSource as any);
  }

  onCellClick(args: CellClickEventArgs): void {
    args.cancel = true;
  }

  roomValueTemplate(data: { [key: string]: string }): JSX.Element {
    return <span>{data.RoomName === 'All' ? 'Room: All' : data.RoomName}</span>;
  }

  resourceHeaderTemplate(props: any): JSX.Element {
    return (
      <div className="template-wrap">
        <div className="resource-detail">
          <div className="resource-name">{this.getRoomName(props)}</div>
          <div className="capacity-wrap">
            <span className='e-icons e-capacity-icon'></span>
            <span className='e-capacity'>{this.getRoomCapacity(props.resourceData.RoomCapacity.toString())}</span>
          </div>
        </div>
      </div>
    );
  }

  quickInfoHeader(props: Record<string, any>): JSX.Element {
    return (
      <div className="e-event-header e-popup-header">
        <div className="e-header-icon-wrapper">
          <button id="close" className="e-close e-icons e-close-icon e-btn e-lib e-flat e-round e-small e-icon-btn" title="CLOSE" onClick={() => { this.scheduleRef.current?.closeQuickInfoPopup(); }} />
        </div>
        <div className="quick-info-header-content" style={this.getQuickInfoHeaderStyle(props)}>
          <div className="quick-info-title">{props.Subject}</div>
          <div className="duration-text">{this.getQuickInfoDurationText(props)}</div>
        </div>
      </div>
    );
  }

  quickInfoContent(props: { [key: string]: string }): JSX.Element {
    let room = '';
    if (props.elementType !== 'cell') {
      room = this.rooms.filter((room) => room.RoomId === props.RoomId)[0].RoomName;
    }
    return (
      <div className="quick-info-content">
        <div className="event-content">
          <div className="e-room e-content-item">
            <label>Room</label>
            <span className='colon'>:</span>
            <span className='e-content'>{room}</span>
          </div>
          <div className="e-event e-content-item">
            <label>Event</label>
            <span className='colon'>:</span>
            <span className='e-content'>{props.Title}</span>
          </div>
          {props.Speakers && props.Speakers.length > 0 && (
            <div className="e-speaker e-content-item">
              <label>{props.Speakers.length > 1 ? 'Speakers' : 'Speaker'}</label>
              <span className='colon'>:</span>
              <span className='e-content'>
                {(props.Speakers as any).map((speaker: { [key: string]: string }, index: number) => (
                  `${speaker.Name} (${speaker.Title})${index < props.Speakers.length - 1 ?
                    (index === props.Speakers.length - 2 ? ' and ' : ', ') :
                    ''}`
                ))}
              </span>
            </div>
          )}
          <div className="e-count e-content-item">
            <label>Participant count</label>
            <span className='colon'>:</span>
            <span className='e-content'>{props.Capacity}</span>
          </div>
        </div>
      </div>
    );
  }

  agendaTemplate(props: any): JSX.Element {
    return (
      <div className="agenda-event">
        <div className="event-subject">{props.Subject}</div>
        <div className="event-description">{props.Description}</div>
        {props.Subject.toLowerCase().indexOf('break') === -1 && props.Subject.toLowerCase().indexOf('lunch') === -1 && (
          <div className="event-duration-audience">
            <div className="event-duration">
              <span className='e-icons e-duration-icon'></span>
              <span className='e-duration'>{this.getTimeString(props.StartTime) + ' - ' + this.getTimeString(props.EndTime)}</span>
            </div>
            <div className="event-audience">
              <span className='e-icons e-audience-icon'></span>
              <span className='e-audience-count'>Audience : {props.Capacity}</span>
            </div>
          </div>
        )}
        {props.Speakers && props.Speakers.length > 0 && (
          <div className="event-speaker">
            <div className="separator-line"></div>
            <label>{props.Speakers.length > 1 ? 'Speakers' : 'Speaker'}</label>
            {props.Speakers.map((speaker: Record<string, any>, index: number) => (
              <div className="speaker-details" key={index}>
                <div className="speaker-image">{speaker.Name.charAt(0)}</div>
                <div className="speaker-info">
                  <div className='speaker-name'>{speaker.Name}</div>
                  <div className='speaker-title'>{speaker.Title}</div>
                  <div className='speaker-note'>{speaker.Note}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  treeTemplate(props: Record<string, any>): JSX.Element {
    return (
      <div className="unplanned-item">
        <div className="unplanned-item-subject">{props.Subject}</div>
        <div className="unplanned-item-duration">
          <span className='duration-icon e-icons'></span>
          <span className='duration-value'>Duration: {props.Duration}</span>
        </div>
        <div className="unplanned-item-capacity">
          <span className='capacity-icon e-icons'></span>
          <span className='capacity-value'>Audience Size: {props.Capacity}</span>
        </div>
      </div>
    );
  }

  roomsDropDown(): JSX.Element {
    return (
      <DropDownListComponent
        dataSource={this.roomsData}
        fields={{ text: 'RoomName', value: 'RoomId' }}
        value={0}
        change={this.onRoomChange}
        valueTemplate={this.roomValueTemplate}
      />
    );
  }

  printAndExport(): JSX.Element {
    return (
      <DropDownButtonComponent
        items={[
          { text: 'Print', id: 'print' },
          { text: 'Export', id: 'export' },
        ]}
        select={this.handlePrintExportSelect}
        iconCss='e-icons e-print-export'
        cssClass='e-caret-hide e-tbar-btn'
      />
    );
  }

  render() {
    return (
      <div className='control-section event-management-control-section'>
        <div className='control-wrapper event-management-wrapper'>
          <ScheduleComponent
            ref={this.scheduleRef}
            cssClass='schedule-event-management'
            currentView='Day'
            selectedDate={new Date(2025, 1, 24)}
            width='100%'
            height='550px'
            startHour="08:00"
            endHour="18:00"
            timeScale={{ slotCount: 3 }}
            allowOverlap={false}
            eventSettings={{
              dataSource: this.eventsData,
              fields: {
                subject: { name: 'Subject' },
                location: { name: 'Title', title: 'Event' },
                startTime: { name: 'StartTime', validation: { required: true } },
                endTime: { name: 'EndTime', validation: { required: true } },
                roomId: { name: 'RoomId' },
                description: {
                  name: 'Capacity', title: 'Participants Count',
                  validation: { required: true }
                }
              }
            }}
            group={{ resources: ['Rooms'] }}
            eventRendered={this.onEventRendered}
            resourceHeaderTemplate={this.resourceHeaderTemplate}
            cellClick={this.onCellClick}
            popupClose={this.onPopupClose}
            popupOpen={this.onPopupOpen}
            quickInfoTemplates={{ header: this.quickInfoHeader, content: this.quickInfoContent }}
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="Agenda" eventTemplate={this.agendaTemplate} />
            </ViewsDirective>
            <ResourcesDirective>
              <ResourceDirective
                field="RoomId"
                title="Rooms"
                name="Rooms"
                dataSource={this.rooms}
                textField="RoomName"
                idField="RoomId"
                colorField="RoomColor"
              />
            </ResourcesDirective>
            <Inject services={[TimelineViews, Agenda, Week, Day, ExcelExport, Print]} />
            <ToolbarItemsDirective>
              <ToolbarItemDirective name='Previous' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='Next' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='DateRangeText' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='Views' align='Right'></ToolbarItemDirective>
              <ToolbarItemDirective type='Separator' align='Right' cssClass='toolbar-post-agenda' />
              <ToolbarItemDirective name='Custom' type='Input' template={this.roomsDropDown} align='Right' cssClass='toolbar-post-agenda room-filter' />
              <ToolbarItemDirective type='Separator' align='Right' cssClass='toolbar-post-agenda' />
              <ToolbarItemDirective name='Custom' type='Button'
                prefixIcon='e-icons e-show-unplanned-events' align='Right'
                showTextOn='Overflow' overflow='Show'
                id="overview_toolbar_settings_unplanned_events"
                click={this.toggleUnplannedEventsElement} cssClass='toolbar-post-agenda' />
              <ToolbarItemDirective name='Custom' type='Button'
                prefixIcon='e-icons e-print-export'
                template={this.printAndExport} align='Right' cssClass='toolbar-post-agenda print-export' />
            </ToolbarItemsDirective>
          </ScheduleComponent>
          <div className="unplanned-events-container">
            <div className="title-container">
              <div className="title-text">Unscheduled Events</div>
            </div>
            <div id="list-container">
              <div className='events-list'>
                <label className="event-label">Event</label>
                <DropDownListComponent
                  fields={{ text: 'name', value: 'id' }}
                  dataSource={this.unPlannedEventsList}
                  value={selectedUnplannedEventItem.toString()}
                  change={this.onUnplannedEventSelect}
                />
              </div>
              <TreeViewComponent
                ref={this.allUnplannedEventsTreeViewRef}
                id="treeview1"
                style={{ display: "" }}
                cssClass='event-management-treeview'
                dragArea=".event-management-wrapper"
                nodeTemplate={this.treeTemplate}
                fields={{
                  dataSource: this.allUnplannedEventsDataRef,
                  id: 'Id',
                  text: 'Subject',
                }}
                nodeDragStart={this.onTreeDragStart}
                nodeDragging={this.onTreeDragging}
                nodeDragStop={this.onTreeDragStop}
                allowDragAndDrop={true}
              />
              <TreeViewComponent
                ref={this.CloudSecurityEventTreeViewRef}
                id='treeview2'
                style={{ display: "none" }}
                cssClass='event-management-treeview'
                dragArea=".event-management-wrapper"
                nodeTemplate={this.treeTemplate}
                fields={{
                  dataSource: this.unplannedEvent1Data,
                  id: 'Id',
                  text: 'Subject',
                }}
                nodeDragStart={this.onTreeDragStart}
                nodeDragging={this.onTreeDragging}
                nodeDragStop={this.onTreeDragStop}
                allowDragAndDrop={true}
              />
              <TreeViewComponent
                ref={this.AIAutomationEventTreeViewRef}
                id='treeview3'
                style={{ display: "none" }}
                cssClass='event-management-treeview'
                dragArea=".event-management-wrapper"
                nodeTemplate={this.treeTemplate}
                fields={{
                  dataSource: this.unplannedEvent2Data,
                  id: 'Id',
                  text: 'Subject',
                }}
                nodeDragStart={this.onTreeDragStart}
                nodeDragging={this.onTreeDragging}
                nodeDragStop={this.onTreeDragStop}
                allowDragAndDrop={true}
              />
              <div className="no-events-message hidden">All events have been scheduled</div>
            </div>
          </div>
          <div id="target">
            <DialogComponent
              id="modalDialog"
              cssClass='alert-dialog'
              isModal={true}
              buttons={[
                {
                  click: () => {
                    this.alertDialogRef.current.hide();
                  },
                  buttonModel: {
                    isPrimary: true,
                    content: 'OK',
                  },
                },
              ]}
              header="Notice"
              height="240px"
              width="335px"
              ref={this.alertDialogRef}
              visible={false}
              showCloseIcon={true}
              animationSettings={this.animationSettings}
              target="#target"
            ></DialogComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This demo showcases a technical event management system that uses the Scheduler component, where each technical event is split into multiple sessions with specific room allocations. The system features drag-and-drop capabilities for scheduling sessions, conflict prevention, and filtering by room.</p>
        </div>
        <div id="description">
          <p>
            This example demonstrates how to implement a technical event management system using the Scheduler component. The application includes the following key features:
          </p>
          <ul>
            <li>Each technical event is organized into multiple separate sessions, with specific room allocations on the same day.</li>
            <li>An external list of unscheduled sessions that can be scheduled via drag-and-drop functionality</li>
            <li>Prevention of scheduling conflicts and room capacity overflows while dragging and dropping externally maintained event sessions.</li>
            <li>Room-based filtering through toolbar dropdown selections.</li>
            <li>Ability to filter and view unscheduled event sessions by technical event.</li>
            <li>Detailed agenda view that displays event information including speakers, audience size, and session descriptions.</li>
          </ul>
        </div>
      </div>
    );
  }
}