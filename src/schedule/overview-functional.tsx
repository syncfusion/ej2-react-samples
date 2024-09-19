import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import { ButtonComponent, SwitchComponent, CheckBoxComponent, ChangeEventArgs as SwitchEventArgs } from '@syncfusion/ej2-react-buttons';
import { TimePickerComponent, ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs, MultiSelectComponent, MultiSelectChangeEventArgs, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { UploaderComponent, SelectedEventArgs, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ToolbarComponent, ItemsDirective, ItemDirective, BeforeOpenCloseMenuEventArgs, MenuEventArgs as ContextMenuEventArgs, MenuItemModel, ContextMenuComponent, ClickEventArgs, AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ResourcesModel, ScheduleComponent, Day, Week, WorkWeek, Month, Year, TimelineViews, TimelineMonth, TimelineYear, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop, Agenda, Print, ExcelExport, ICalendarImport, ICalendarExport, CellClickEventArgs, Timezone, CurrentAction, PopupOpenEventArgs, View } from '@syncfusion/ej2-react-schedule';
import { DropDownButtonComponent, ItemModel, MenuEventArgs } from '@syncfusion/ej2-react-splitbuttons';
import { addClass, Browser, closest, extend, Internationalization, isNullOrUndefined, removeClass, remove, compile } from '@syncfusion/ej2-base';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { tz } from 'moment-timezone';
import { updateSampleSection } from '../common/sample-base';
import './overview.css';

const Overview = () => {
  useEffect(() => {
    updateSampleSection();
    return () => {
      if (liveTimeInterval) {
          clearInterval(liveTimeInterval as number);
      }
    }
  }, [])
  const [currentView, setCurrentView] = useState<View>('Week');
  const [isTimelineView, setIsTimelineView] = useState<boolean>(false);
  let scheduleObj = useRef<ScheduleComponent>(null);
  let contextMenuObj = useRef<ContextMenuComponent>(null);
  let timeBtn = useRef<HTMLElement>(null);
  let selectedTarget: Element;
  let intl: Internationalization = new Internationalization();
  let workWeekObj = useRef<MultiSelectComponent>(null);
  let resourceObj = useRef<MultiSelectComponent>(null);
  let liveTimeInterval: NodeJS.Timeout | number;
  const weekDays: Record<string, any>[] = [
    { text: 'Sunday', value: 0 },
    { text: 'Monday', value: 1 },
    { text: 'Tuesday', value: 2 },
    { text: 'Wednesday', value: 3 },
    { text: 'Thursday', value: 4 },
    { text: 'Friday', value: 5 },
    { text: 'Saturday', value: 6 }
  ];
  const exportItems: ItemModel[] = [
    { text: 'iCalendar', iconCss: 'e-icons e-export' },
    { text: 'Excel', iconCss: 'e-icons e-export-excel' }
  ];
  const contextMenuItems: MenuItemModel[] = [
    { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
    { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
    { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
    { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
    { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
    {
      text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash',
      items: [
        { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
        { text: 'Delete Series', id: 'DeleteSeries' }
      ]
    },
    {
      text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit',
      items: [
        { text: 'Edit Occurrence', id: 'EditOccurrence' },
        { text: 'Edit Series', id: 'EditSeries' }
      ]
    }
  ];
  const calendarCollections: Record<string, any>[] = [
    { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
    { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
    { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
    { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
  ];
  const timezoneData: Record<string, any>[] = [
    { text: 'UTC -12:00', value: 'Etc/GMT+12' },
    { text: 'UTC -11:00', value: 'Etc/GMT+11' },
    { text: 'UTC -10:00', value: 'Etc/GMT+10' },
    { text: 'UTC -09:00', value: 'Etc/GMT+9' },
    { text: 'UTC -08:00', value: 'Etc/GMT+8' },
    { text: 'UTC -07:00', value: 'Etc/GMT+7' },
    { text: 'UTC -06:00', value: 'Etc/GMT+6' },
    { text: 'UTC -05:00', value: 'Etc/GMT+5' },
    { text: 'UTC -04:00', value: 'Etc/GMT+4' },
    { text: 'UTC -03:00', value: 'Etc/GMT+3' },
    { text: 'UTC -02:00', value: 'Etc/GMT+2' },
    { text: 'UTC -01:00', value: 'Etc/GMT+1' },
    { text: 'UTC +00:00', value: 'Etc/GMT' },
    { text: 'UTC +01:00', value: 'Etc/GMT-1' },
    { text: 'UTC +02:00', value: 'Etc/GMT-2' },
    { text: 'UTC +03:00', value: 'Etc/GMT-3' },
    { text: 'UTC +04:00', value: 'Etc/GMT-4' },
    { text: 'UTC +05:00', value: 'Etc/GMT-5' },
    { text: 'UTC +05:30', value: 'Asia/Calcutta' },
    { text: 'UTC +06:00', value: 'Etc/GMT-6' },
    { text: 'UTC +07:00', value: 'Etc/GMT-7' },
    { text: 'UTC +08:00', value: 'Etc/GMT-8' },
    { text: 'UTC +09:00', value: 'Etc/GMT-9' },
    { text: 'UTC +10:00', value: 'Etc/GMT-10' },
    { text: 'UTC +11:00', value: 'Etc/GMT-11' },
    { text: 'UTC +12:00', value: 'Etc/GMT-12' },
    { text: 'UTC +13:00', value: 'Etc/GMT-13' },
    { text: 'UTC +14:00', value: 'Etc/GMT-14' }
  ];
  const majorSlotData: Record<string, any>[] = [
    { Name: '1 hour', Value: 60 },
    { Name: '1.5 hours', Value: 90 },
    { Name: '2 hours', Value: 120 },
    { Name: '2.5 hours', Value: 150 },
    { Name: '3 hours', Value: 180 },
    { Name: '3.5 hours', Value: 210 },
    { Name: '4 hours', Value: 240 },
    { Name: '4.5 hours', Value: 270 },
    { Name: '5 hours', Value: 300 },
    { Name: '5.5 hours', Value: 330 },
    { Name: '6 hours', Value: 360 },
    { Name: '6.5 hours', Value: 390 },
    { Name: '7 hours', Value: 420 },
    { Name: '7.5 hours', Value: 450 },
    { Name: '8 hours', Value: 480 },
    { Name: '8.5 hours', Value: 510 },
    { Name: '9 hours', Value: 540 },
    { Name: '9.5 hours', Value: 570 },
    { Name: '10 hours', Value: 600 },
    { Name: '10.5 hours', Value: 630 },
    { Name: '11 hours', Value: 660 },
    { Name: '11.5 hours', Value: 690 },
    { Name: '12 hours', Value: 720 }
  ];
  const minorSlotData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const timeFormatData: Record<string, any>[] = [
    { Name: "12 hours", Value: "hh:mm a" },
    { Name: "24 hours", Value: "HH:mm" }
  ];
  const weekNumberData: Record<string, any>[] = [
    { Name: 'Off', Value: 'Off' },
    { Name: 'First Day of Year', Value: 'FirstDay' },
    { Name: 'First Full Week', Value: 'FirstFullWeek' },
    { Name: 'First Four-Day Week', Value: 'FirstFourDayWeek' }
  ];
  const tooltipData: Record<string, any>[] = [
    { Name: 'Off', Value: 'Off' },
    { Name: 'On', Value: 'On' }
  ];

  const importTemplateFn = (data: Record<string, any>): NodeList => {
    const template: string = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
    return compile(template.trim())(data) as NodeList;
  }

  const updateLiveTime = (): void => {
    let scheduleTimezone: string = scheduleObj ? scheduleObj.current.timezone : 'Etc/GMT';
    let liveTime;
    if (scheduleObj.current.isAdaptive) {
      liveTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: scheduleTimezone });
    }
    else {
      liveTime = new Date().toLocaleTimeString('en-US', { timeZone: scheduleTimezone });
    }
    timeBtn.current.innerHTML = liveTime;
  };

  const onImportClick = (args: SelectedEventArgs): void => {
    scheduleObj.current.importICalendar(((args.event.target as HTMLInputElement).files as any)[0]);
  }

  const onPrint = (): void => {
    scheduleObj.current.print();
  }

  const onExportClick = (args: MenuEventArgs): void => {
    if (args.item.text === 'Excel') {
      let exportDatas: Record<string, any>[] = [];
      let eventCollection: Record<string, any>[] = scheduleObj.current.getEvents();
      let resourceCollection: ResourcesModel[] = scheduleObj.current.getResourceCollections();
      let resourceData: Record<string, any>[] = resourceCollection[0].dataSource as Record<string, any>[];
      for (let resource of resourceData) {
        let data: Record<string, any>[] = eventCollection.filter((e: Record<string, any>) => e.CalendarId === resource.CalendarId);
        exportDatas = exportDatas.concat(data as Record<string, any>[]);
      }
      scheduleObj.current.exportToExcel({ exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId'] });
    } else {
      scheduleObj.current.exportToICalendar();
    }
  }

  const getEventData = (): Record<string, any> => {
    const date: Date = scheduleObj.current.selectedDate;
    return {
      Id: scheduleObj.current.getEventMaxID(),
      Subject: '',
      StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), 0, 0),
      EndTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours() + 1, 0, 0),
      Location: '',
      Description: '',
      IsAllDay: false,
      CalendarId: 1
    };
  }

  const onToolbarItemClicked = (args: ClickEventArgs): void => {
    switch (args.item.text) {
      case 'Day':
        setCurrentView(isTimelineView ? 'TimelineDay' : 'Day');
        break;
      case 'Week':
        setCurrentView(isTimelineView ? 'TimelineWeek' : 'Week');
        break;
      case 'WorkWeek':
        setCurrentView(isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek');
        break;
      case 'Month':
        setCurrentView(isTimelineView ? 'TimelineMonth' : 'Month');
        break;
      case 'Year':
        setCurrentView(isTimelineView ? 'TimelineYear' : 'Year');
        break;
      case 'Agenda':
        setCurrentView('Agenda');
        break;
      case 'New Event':
        const eventData: Record<string, any> = getEventData();
        scheduleObj.current.openEditor(eventData, 'Add', true);
        break;
      case 'New Recurring Event':
        const recEventData: Record<string, any> = getEventData();
        scheduleObj.current.openEditor(recEventData, 'Add', true, 1);
        break;
    }
  }

  useEffect(() => {
    let updatedView: View = currentView;
    switch (currentView) {
      case 'Day':
      case 'TimelineDay':
        updatedView = isTimelineView ? 'TimelineDay' : 'Day';
        break;
      case 'Week':
      case 'TimelineWeek':
        updatedView = isTimelineView ? 'TimelineWeek' : 'Week';
        break;
      case 'WorkWeek':
      case 'TimelineWorkWeek':
        updatedView = isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
        break;
      case 'Month':
      case 'TimelineMonth':
        updatedView = isTimelineView ? 'TimelineMonth' : 'Month';
        break;
      case 'Year':
      case 'TimelineYear':
        updatedView = isTimelineView ? 'TimelineYear' : 'Year';
        break;
      case 'Agenda':
        updatedView = 'Agenda';
        break;
    }
    scheduleObj.current.currentView = updatedView;
  }, [isTimelineView]);

  const onChange = (args: SwitchEventArgs) => {
    setIsTimelineView(args.checked);
  }

  const timelineTemplate = useCallback(() => {
    return (
      <div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='timeline_views' checked={isTimelineView} change={onChange} />
          </div>
          <div className='text-child'>Timeline Views</div>
        </label>
      </div >
    );
  },[])

  const groupTemplate = useCallback(() => {
    return (
      <div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='grouping' checked={true} change={(args: SwitchEventArgs) => { scheduleObj.current.group.resources = args.checked ? ['Calendars'] : []; }} />
          </div>
          <div className='text-child'>Grouping</div>
        </label>
      </div>
    );
  },[])

  const gridlineTemplate = useCallback(() => {
    return (
      <div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='timeSlots' checked={true} change={(args: SwitchEventArgs) => { scheduleObj.current.timeScale.enable = args.checked as boolean; }} />
          </div>
          <div className='text-child'>Gridlines</div>
        </label>
      </div>
    );
  },[])

  const autoHeightTemplate = useCallback(() => {
    return (
      <div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='row_auto_height' checked={false} change={(args: SwitchEventArgs) => { scheduleObj.current.rowAutoHeight = args.checked as boolean; }} />
          </div>
          <div className='text-child'>Row Auto Height</div>
        </label>
      </div>
    );
  },[])

  const getDateHeaderDay = (value: Date): string => {
    return intl.formatDate(value, { skeleton: 'E' });
  }
  const getDateHeaderDate = (value: Date): string => {
    return intl.formatDate(value, { skeleton: 'd' });
  }
  const getWeather = (value: Date) => {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image"  src= "src/schedule/images/weather-clear.svg" alt="Clear Weather"/>';
      case 1:
        return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
      case 2:
        return '<img class="weather-image" src="src/schedule/images/weather-rain.svg" alt="Rain Weather"/>';
      case 3:
        return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
      case 4:
        return '<img class="weather-image" src="src/schedule/images/weather-rain.svg" alt="Rain Weather"//>';
      case 5:
        return '<img class="weather-image" src="src/schedule/images/weather-clear.svg" alt="Clear Weather"/>';
      case 6:
        return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
      default:
        return null;
    }
  }

  const dateHeaderTemplate = (props: { date: Date; }) => {
    return (
      <Fragment>
        <div>{getDateHeaderDay(props.date)}</div>
        <div>{getDateHeaderDate(props.date)}</div>
        <div className="date-text" dangerouslySetInnerHTML={{ __html: getWeather(props.date) }}></div>
      </Fragment>
    );
  }

  const onResourceChange = (args: MultiSelectChangeEventArgs): void => {
    let resourcePredicate: Predicate & any;
    for (let value of args.value) {
      if (resourcePredicate) {
        resourcePredicate = resourcePredicate.or(new Predicate('CalendarId', 'equal', value as number));
      } else {
        resourcePredicate = new Predicate('CalendarId', 'equal', value as number);
      }
    }
    scheduleObj.current.resources[0].query = resourcePredicate ? new Query().where(resourcePredicate) : new Query().where('CalendarId', 'equal', 1);
  }
  let generateEvents = (): Record<string, any>[] => {
    let eventData: Record<string, any>[] = [];
    let eventSubjects: string[] = [
      'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Traveling', 'Annual Conference', 'Birthday Celebration',
      'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day', 'MoonShiners',
      'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
      'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
    ];
    let weekDate: Date = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
    let startDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
    let endDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
    eventData.push({
      Id: 1,
      Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
      StartTime: startDate,
      EndTime: endDate,
      Location: '',
      Description: 'Event Scheduled',
      RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;',
      IsAllDay: false,
      IsReadonly: false,
      CalendarId: 1
    });
    for (let a: number = 0, id: number = 2; a < 500; a++) {
      let month: number = Math.floor(Math.random() * (11 - 0 + 1) + 0);
      let date: number = Math.floor(Math.random() * (28 - 1 + 1) + 1);
      let hour: number = Math.floor(Math.random() * (23 - 0 + 1) + 0);
      let minutes: number = Math.floor(Math.random() * (59 - 0 + 1) + 0);
      let start: Date = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
      let end: Date = new Date(start.getTime());
      end.setHours(end.getHours() + 2);
      let startDate: Date = new Date(start.getTime());
      let endDate: Date = new Date(end.getTime());
      eventData.push({
        Id: id,
        Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
        StartTime: startDate,
        EndTime: endDate,
        Location: '',
        Description: 'Event Scheduled',
        IsAllDay: id % 10 === 0,
        IsReadonly: endDate < new Date(),
        CalendarId: (a % 4) + 1
      });
      id++;
    }
    if (Browser.isIE) {
      Timezone.prototype.offset = (date: Date, timezone: string): number => tz.zone(timezone).utcOffset(date.getTime());
    }
    let overviewEvents: { [key: string]: Date }[] = extend([], eventData, undefined, true) as { [key: string]: Date }[];
    let timezone: Timezone = new Timezone();
    let currentTimezone: never = timezone.getLocalTimezoneName() as never;
    for (let event of overviewEvents) {
      event.StartTime = timezone.convert(event.StartTime, 'UTC', currentTimezone);
      event.EndTime = timezone.convert(event.EndTime, 'UTC', currentTimezone);
    }
    return overviewEvents;
  };

  const createUpload = () => {
    const element = document.querySelector('.calendar-import .e-css.e-btn');
    element.classList.add('e-inherit');
  }

  const btnClick = () => {
    let settingsPanel: Element = document.querySelector('.overview-content .right-panel') as Element;
    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      workWeekObj.current.refresh();
      resourceObj.current.refresh();
    } else {
      addClass([settingsPanel], 'hide');
    }
    scheduleObj.current.refreshEvents();
  }

  const contextMenuOpen = (args: BeforeOpenCloseMenuEventArgs) => {
    let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell') as Element], 'e-selected-cell');
    }
    scheduleObj.current.closeQuickInfoPopup();
    let targetElement: HTMLElement = args.event.target as HTMLElement;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (selectedTarget.classList.contains('e-appointment')) {
      let eventObj: Record<string, any> = scheduleObj.current.getEventDetails(selectedTarget) as Record<string, any>;
      if (eventObj.RecurrenceRule) {
        contextMenuObj.current.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        contextMenuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        contextMenuObj.current.showItems(['Save', 'Delete'], true);
        contextMenuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    } else if ((selectedTarget.classList.contains('e-work-cells') || selectedTarget.classList.contains('e-all-day-cells')) &&
      !selectedTarget.classList.contains('e-selected-cell')) {
      removeClass([].slice.call(scheduleObj.current.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
      selectedTarget.setAttribute('aria-selected', 'true');
      selectedTarget.classList.add('e-selected-cell');
    }
    contextMenuObj.current.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    contextMenuObj.current.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }

  const contextMenuSelect = (args: ContextMenuEventArgs) => {
    let selectedMenuItem: string = args.item.id as string;
    let eventObj: Record<string, any> = {};
    if (selectedTarget && selectedTarget.classList.contains('e-appointment')) {
      eventObj = scheduleObj.current.getEventDetails(selectedTarget) as Record<string, any>;
    }
    switch (selectedMenuItem) {
      case 'Today':
        scheduleObj.current.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        let selectedCells: Element[] = scheduleObj.current.getSelectedElements();
        let activeCellsData: CellClickEventArgs = scheduleObj.current.getCellDetails(selectedCells.length > 0 ? selectedCells : selectedTarget);
        if (selectedMenuItem === 'Add') {
          scheduleObj.current.openEditor(activeCellsData, 'Add');
        } else {
          scheduleObj.current.openEditor(activeCellsData, 'Add', false, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          let query: Query = new Query().where(scheduleObj.current.eventFields.id as string, 'equal', eventObj.RecurrenceID as string | number);
          eventObj = new DataManager(scheduleObj.current.eventsData).executeLocal(query)[0] as Record<string, any>;
        }
        scheduleObj.current.openEditor(eventObj, selectedMenuItem);
        break;
      case 'Delete':
        scheduleObj.current.deleteEvent(eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        scheduleObj.current.deleteEvent(eventObj, selectedMenuItem);
        break;
    }
  }

  const timezoneChange = (args: ChangeEventArgs) => {
    scheduleObj.current.timezone = args.value as string;
    updateLiveTime();
    (document.querySelector('.schedule-overview #timezoneBtn') as HTMLElement).innerHTML = args.itemData.text;
  }

  const weekNumberChange = (args: ChangeEventArgs) => {
    if (args.value == "Off") {
      scheduleObj.current.showWeekNumber = false;
    } else {
      scheduleObj.current.showWeekNumber = true;
      scheduleObj.current.weekRule = args.value as any;
    }
  }

  const tooltipChange = (args: ChangeEventArgs) => {
    if (args.value === "Off") {
      scheduleObj.current.eventSettings.enableTooltip = false;
    } else {
      scheduleObj.current.eventSettings.enableTooltip = true;
    }
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='content-wrapper'>
          <div className='schedule-overview'>
            <AppBarComponent colorMode="Primary">
              <span className="time e-icons e-time-zone"></span>
              <span id="timezoneBtn" className="time ">UTC</span>
              <span className="time e-icons e-clock"></span>
              <span id="timeBtn" className="time current-time" ref={timeBtn}></span>
              <div className="e-appbar-spacer"></div>
              <div className='control-panel calendar-export'>
                <ButtonComponent id='printBtn' cssClass='title-bar-btn e-inherit' iconCss='e-icons e-print' onClick={(onPrint)} content='Print' />
              </div>
              <div className='control-panel import-button'>
                <UploaderComponent id='fileUpload' type='file' allowedExtensions='.ics' cssClass='calendar-import' buttons={{ browse: importTemplateFn({ text: 'Import' })[0] as HTMLElement }} multiple={false} showFileList={false} selected={(onImportClick)} created={createUpload} />
              </div>
              <div className='control-panel calendar-export'>
                <DropDownButtonComponent id='exportBtn' content='Export' cssClass = 'e-inherit' items={exportItems} select={onExportClick} />
              </div>
              <ButtonComponent id='settingsBtn' cssClass='overview-toolbar-settings e-inherit' iconCss='e-icons e-settings' iconPosition='Top' content='' onClick={btnClick} />
            </AppBarComponent>
            <ToolbarComponent id='toolbarOptions' cssClass='overview-toolbar' width='100%' height={70} overflowMode='Scrollable' scrollStep={100} created={() => liveTimeInterval = setInterval(() => { updateLiveTime(); }, 1000)} clicked={onToolbarItemClicked}>
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-plus' tooltipText='New Event' text='New Event' tabIndex={0}/>
                <ItemDirective prefixIcon='e-icons e-repeat' tooltipText='New Recurring Event' text='New Recurring Event' tabIndex={0} />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-day' tooltipText='Day' text='Day'tabIndex={0}/>
                <ItemDirective prefixIcon='e-icons e-week' tooltipText='Week' text='Week' tabIndex={0}/>
                <ItemDirective prefixIcon='e-icons e-week' tooltipText='WorkWeek' text='WorkWeek' tabIndex={0} />
                <ItemDirective prefixIcon='e-icons e-month' tooltipText='Month' text='Month' tabIndex={0} />
                <ItemDirective prefixIcon='e-icons e-month' tooltipText='Year' text='Year' tabIndex={0} />
                <ItemDirective prefixIcon='e-icons e-agenda-date-range' tooltipText='Agenda' text='Agenda' tabIndex={0} />
                <ItemDirective tooltipText='Timeline Views' text='Timeline Views' template={timelineTemplate} />
                <ItemDirective type='Separator' />
                <ItemDirective tooltipText='Grouping' text='Grouping' template={groupTemplate} />
                <ItemDirective tooltipText='Timme Slots' text='Timme Slots' template={gridlineTemplate} />
                <ItemDirective tooltipText='Auto Fit Rows' text='Auto Fit Rows' template={autoHeightTemplate} />
              </ItemsDirective>
            </ToolbarComponent>
            <div className='overview-content'>
              <div className='left-panel'>
                <div className='overview-scheduler'>
                  <ScheduleComponent id='scheduler' cssClass='schedule-overview' ref={scheduleObj} width='100%' height='100%' currentView={currentView} group={{ resources: ['Calendars'] }} timezone='UTC' eventSettings={{ dataSource: generateEvents() }} dateHeaderTemplate={dateHeaderTemplate}>
                    <ResourcesDirective>
                      <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' dataSource={calendarCollections} query={new Query().where('CalendarId', 'equal', 1)} textField='CalendarText' idField='CalendarId' colorField='CalendarColor' />
                    </ResourcesDirective>
                    <ViewsDirective>
                      <ViewDirective option='Day' />
                      <ViewDirective option='Week' />
                      <ViewDirective option='WorkWeek' />
                      <ViewDirective option='Month' />
                      <ViewDirective option='Year' />
                      <ViewDirective option='Agenda' />
                      <ViewDirective option='TimelineDay' />
                      <ViewDirective option='TimelineWeek' />
                      <ViewDirective option='TimelineWorkWeek' />
                      <ViewDirective option='TimelineMonth' />
                      <ViewDirective option='TimelineYear' />
                    </ViewsDirective>
                    <Inject services={[Day, Week, WorkWeek, Month, Year, Agenda, TimelineViews, TimelineMonth, TimelineYear, DragAndDrop, Resize, Print, ExcelExport, ICalendarImport, ICalendarExport]} />
                  </ScheduleComponent>
                  <ContextMenuComponent id='overviewContextMenu' cssClass='schedule-context-menu' ref={contextMenuObj} target='.e-schedule' items={contextMenuItems} beforeOpen={contextMenuOpen} select={contextMenuSelect} />
                </div>
              </div>
              <div className='right-panel hide'>
                <div className='control-panel e-css'>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Calendar</label>
                    </div>
                    <div className='col-right'>
                      <MultiSelectComponent id="resources" cssClass='schedule-resource' ref={resourceObj} dataSource={calendarCollections as Record<string, any>[]} mode='CheckBox' fields={{ text: 'CalendarText', value: 'CalendarId' }} enableSelectionOrder={false} showClearButton={false} showDropDownIcon={true} popupHeight={300} value={[1]} change={onResourceChange}>
                        <Inject services={[CheckBoxSelection]} />
                      </MultiSelectComponent>
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>First Day of Week</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="weekFirstDay" dataSource={weekDays} fields={{ text: 'text', value: 'value' }} value={0} popupHeight={400} change={(args: ChangeEventArgs) => { scheduleObj.current.firstDayOfWeek = args.value as number; }} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Work week</label>
                    </div>
                    <div className='col-right'>
                      <MultiSelectComponent id="workWeekDays" cssClass='schedule-workweek' ref={workWeekObj} dataSource={weekDays} mode='CheckBox' fields={{ text: 'text', value: 'value' }} enableSelectionOrder={false} showClearButton={false} showDropDownIcon={true} value={[1, 2, 3, 4, 5]} change={(args: MultiSelectChangeEventArgs) => scheduleObj.current.workDays = args.value as number[]}>
                        <Inject services={[CheckBoxSelection]} />
                      </MultiSelectComponent>
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Timezone</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="timezone" dataSource={timezoneData} fields={{ text: 'text', value: 'value' }} value='Etc/GMT' popupHeight={150} change={timezoneChange} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Day Start Hour</label>
                    </div>
                    <div className='col-right'>
                      <TimePickerComponent id='dayStartHour' showClearButton={false} value={new Date(new Date().setHours(0, 0, 0))} change={(args: TimeEventArgs) => scheduleObj.current.startHour = intl.formatDate(args.value as Date, { skeleton: 'Hm' })} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Day End Hour</label>
                    </div>
                    <div className='col-right'>
                      <TimePickerComponent id='dayEndHour' showClearButton={false} value={new Date(new Date().setHours(23, 59, 59))} change={(args: TimeEventArgs) => scheduleObj.current.endHour = intl.formatDate(args.value as Date, { skeleton: 'Hm' })} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Work Start Hour</label>
                    </div>
                    <div className='col-right'>
                      <TimePickerComponent id='workHourStart' showClearButton={false} value={new Date(new Date().setHours(9, 0, 0))} change={(args: TimeEventArgs) => scheduleObj.current.workHours.start = intl.formatDate(args.value as Date, { skeleton: 'Hm' })} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Work End Hour</label>
                    </div>
                    <div className='col-right'>
                      <TimePickerComponent id='workHourEnd' showClearButton={false} value={new Date(new Date().setHours(18, 0, 0))} change={(args: TimeEventArgs) => scheduleObj.current.workHours.end = intl.formatDate(args.value as Date, { skeleton: 'Hm' })} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Slot Duration</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="slotDuration" dataSource={majorSlotData} fields={{ text: 'Name', value: 'Value' }} value={60} popupHeight={150} change={(args: ChangeEventArgs) => { scheduleObj.current.timeScale.interval = args.value as number; }} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Slot Interval</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="slotInterval" dataSource={minorSlotData} value={2} popupHeight={150} change={(args: ChangeEventArgs) => { scheduleObj.current.timeScale.slotCount = args.value as number; }} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Time Format</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="timeFormat" dataSource={timeFormatData} fields={{ text: 'Name', value: 'Value' }} value={"hh:mm a"} popupHeight={150} change={(args: ChangeEventArgs) => { scheduleObj.current.timeFormat = args.value as any; }} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Week Numbers</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="weekNumber" dataSource={weekNumberData} fields={{ text: 'Name', value: 'Value' }} value={"Off"} popupHeight={150} change={weekNumberChange} />
                    </div>
                  </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Tooltip</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="tooltip" dataSource={tooltipData} fields={{ text: 'Name', value: 'Value' }} value={"Off"} popupHeight={150} change={tooltipChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div id="action-description">
        <p>
          This <a aria-label="React scheduler example" href="https://www.syncfusion.com/react-ui-components/react-scheduler" target="_blank">React Scheduler example</a> demonstrates the overview of React Scheduler with its overall features. Use the toolbar buttons
          to play with Scheduler functionalities.
        </p>
      </div>
      <div id="description">
        <p>
          The React Scheduler is a fully-features calendar component that is used to manage appointments with multiple
          resources. The data can be pulled from the <code>dataManager</code> component or valid local JSON data or
          Restful web services and bind the data fields using <code>eventSettings.fields</code>.
        </p>
        <p>In this demo, React Scheduler features such as Multiple views, Templates (Date Header, Quick Info), Resources, Grouping, Timezone, Timescale, etc... are used along with multiple resources.</p>
      </div>
    </div>
  );
}
export default Overview;
