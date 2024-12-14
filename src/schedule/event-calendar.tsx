import * as React from "react";
import './event-calendar.css'
import { ClickEventArgs, ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ResourcesDirective, ResourceDirective, TimelineMonth, Year, resetTime, ViewsDirective, ViewDirective, EventRenderedArgs, getWeekFirstDate, getWeekLastDate, ActionEventArgs, addDays, addMonths, addYears, WEEK_LENGTH, EJ2Instance } from '@syncfusion/ej2-react-schedule';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-react-lists';
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import * as dataSource from './datasource.json';
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ColorPickerComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Internationalization, extend, isNullOrUndefined } from "@syncfusion/ej2/base";
import { DropDownList } from "@syncfusion/ej2-react-dropdowns";
import { SampleBase } from "../common/sample-base";


export class EventCalendar extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private calendarSidebarObj: SidebarComponent;
    private colorPickerObj: ColorPickerComponent;
    private calendarObj: CalendarComponent;
    private unPlannedSidebarObj: SidebarComponent;
    private calendarsListObj: ListViewComponent;
    private gridObj: GridComponent;
    private dialogObj: DialogComponent;
    private toolbarObj: ToolbarComponent;
    private calendarNameObj: TextBoxComponent;
    private saveButtonRef: HTMLButtonElement;
    private currentDate: Date = new Date();
    private intl: Internationalization = new Internationalization();
    private isAdd: boolean;
    private calendars = [
        { name: "My Calendar", id: 1, color: "#c43081", isSelected: true },
        { name: "Company", id: 2, color: "#ff7f50", isSelected: true },
        { name: "Birthday", id: 3, color: "#AF27CD", isSelected: true },
        { name: "Holiday", id: 4, color: "#808000", isSelected: true }];
    private selectedCalendars: Record<string, any> = this.getSelectedCalendars();
    private appointmentData: Record<string, any>[] = this.generateCalendarData();
    private filteredData: Record<string, any> = this.getFilteredData();
    private eventSettings = { dataSource: extend([], this.filteredData.planned, null, true) as Record<string, any>[] };
    private resourceData = [
        { name: 'Nancy', id: 1, color: '#df5286' },
        { name: 'Steven', id: 2, color: '#7fa900' },
        { name: 'Robert', id: 3, color: '#ea7a57' },
        { name: 'Smith', id: 4, color: '#5978ee' },
        { name: 'Micheal', id: 5, color: '#df5286' },
        { name: 'Root', id: 6, color: '#00bdae' }
    ];

    private getSelectedCalendars() {
        const selectedIds = [];
        const selectedItems = [];
        for (let calendar of this.calendars) {
            if (calendar.isSelected) {
                selectedIds.push(calendar.id);
                selectedItems.push(calendar);
            }
        }
        return { ids: selectedIds, items: selectedItems };
    }

    private generateCalendarData() {
        let collections = extend([], [...(dataSource as Record<string, any>).personalData, ...(dataSource as Record<string, any>).companyData, ...(dataSource as Record<string, any>).birthdayData, ...(dataSource as Record<string, any>).holidayData], null, true) as Record<string, any>[];
        const oldTime = new Date(2021, 3, 1).getTime();
        const newTime = resetTime(new Date()).getTime();
        for (const data of collections) {
            data.IsPlanned = !(data.Id % 2);
            data.IsAllDay = [1, 2].indexOf(data.CalendarId) <= -1;
            const diff = oldTime - new Date(data.StartTime).getTime();
            const hour = Math.floor(Math.random() * (13 - 9) + 9);
            data.StartTime = new Date(newTime - diff + (data.IsAllDay ? 0 : (hour * 60 * 60 * 1000)));
            data.EndTime = new Date(data.StartTime.getTime() + (data.IsAllDay ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000));
            data.ResourceId = Math.floor(Math.random() * 6) + 1;
        }
        return collections;
    }

    private getFilteredData() {
        const planned = [];
        const unPlanned = [];
        for (const data of this.appointmentData) {
            if (this.selectedCalendars.ids.indexOf(data.CalendarId) > -1) {
                if (data.IsPlanned) {
                    planned.push(data);
                } else {
                    unPlanned.push(data);
                }
            }
        }
        return { planned: planned, unPlanned: unPlanned };
    }

    private onCalendarListChange = (args: SelectEventArgs): void => {
        if (args?.event?.target) {
            const target = args.event.target as HTMLElement;
            if (target.classList.contains('e-edit')) {
                args.cancel = true;
                this.openDialog(args, 'Save');
            } else if (target.classList.contains('e-trash')) {
                args.cancel = true;
                this.removeCalendar(args);

            } else {
                this.calendarSelection(args);
            }
        } else {
            this.calendarSelection(args);
        }
    };

    private openDialog = (args: SelectEventArgs, action: string): void => {
        if (this.calendarNameObj) {
            this.calendarNameObj.value = (args.data as Record<string, any>).name;
            this.colorPickerObj.value = (args.data as Record<string, any>).color;
            this.saveButtonRef.innerHTML = action;
            this.dialogObj.header = "Edit Calendar";
            this.dialogObj.show();
            this.saveButtonRef.onclick = (): void => {
                if (this.calendarNameObj) {
                    const newValue = this.calendarNameObj.value.trim();
                    const newColor = this.colorPickerObj.value.trim();
                    if (newValue.length > 0) {
                        this.calendars = this.calendars.map((item) => {
                            if (item.name === (args.data as Record<string, any>).name) {
                                return { ...item, name: newValue, color: newColor };
                            }
                            return item;
                        });
                        this.selectedCalendars = this.getSelectedCalendars();
                        this.calendarsListObj.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
                        this.scheduleObj.refreshEvents();
                        this.dialogObj.hide();
                    }
                }
            }

        }
    };

    private removeCalendar = (args: SelectEventArgs): void => {
        this.calendarsListObj.removeItem(args.item);
        this.calendars = this.calendars.filter((item: Record<string, any>): boolean => item.id !== (args.data as Record<string, any>).id);
        this.appointmentData = this.appointmentData.filter((item: Record<string, any>): boolean => item.CalendarId !== (args.data as Record<string, any>).id);
        this.selectedCalendars = this.getSelectedCalendars();
        this.filteredData = this.getFilteredData();
        this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true) as Record<string, any>[];
        this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
    };

    private updateTextValue = (): void => {
        if (this.isAdd) {
            if (this.calendarNameObj) {
                let newValue: string = this.calendarNameObj.value.trim();
                newValue = newValue === "" ? "New Calendar" : newValue;
                const newId: number = (this.calendars.length + 1);
                const newItem: {
                    name: string;
                    id: number;
                    color: string;
                    isSelected: boolean;
                } = { name: newValue, id: newId, color: this.colorPickerObj.value, isSelected: true };
                this.calendars.push(newItem);
                this.selectedCalendars = this.getSelectedCalendars();
                this.calendarsListObj.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
                this.dialogObj.hide();
            }
            this.isAdd = false;
        }
    }

    private onListActionComplete = (): void => {
        setTimeout(() => {
            if (this.calendarsListObj) {
                let iconAdd: HTMLElement = this.calendarsListObj.element.querySelector(".e-plus");
                this.applyBackgroundColors();
                if (iconAdd) {
                    iconAdd.addEventListener("click", () => {
                        this.isAdd = true;
                        this.calendarNameObj.value = '';
                        this.colorPickerObj.value = "#008000ff";
                        this.saveButtonRef.innerHTML = "Add";
                        this.dialogObj.show();
                    });
                }
            }
        }, 200);
    }

    private calendarSelection = (args: SelectEventArgs): void => {
        const idFromArgs: number = Number((args.data as { [key: string]: Object; }).id);
        this.calendars[args.index].isSelected = args.isChecked;
        this.selectedCalendars = this.getSelectedCalendars();
        if (args.isChecked) {
            this.changeCheckboxBackgroundColor(idFromArgs);
        }
        this.filteredData = this.getFilteredData();
        this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true) as Record<string, any>[];
        this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
    };

    private applyBackgroundColors = (): void => {
        this.calendars.forEach((calendar: Record<string, any>): void => {
            const listItem: Element = this.calendarsListObj.element.querySelector(`[data-uid="${calendar.id}"]`);
            if (listItem) {
                const checkboxFrame: Element = listItem.querySelector(`.e-checkbox-wrapper .e-frame.e-check,
                    .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame`);
                if (checkboxFrame) {
                    (checkboxFrame as HTMLElement).style.backgroundColor = calendar.color;
                    (checkboxFrame as HTMLElement).style.borderColor = calendar.color;
                }
            }
        });
    };

    private changeCheckboxBackgroundColor = (idFromArgs: number): void => {
        const listItem = document.querySelector(`[data-uid="${idFromArgs}"]`);
        if (listItem) {
            const checkboxFrame = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check');
            const selectedItem = this.calendars.find((item) => item.id === idFromArgs);
            if (checkboxFrame && selectedItem?.color) {
                (checkboxFrame as HTMLElement).style.backgroundColor = selectedItem.color;
                (checkboxFrame as HTMLElement).style.borderColor = selectedItem.color;
            }
        }
    };

    private onToolbarItemClicked = (args: ClickEventArgs): void => {
        if (!args.item) {
            return;
        }
        switch (args.item.cssClass) {
            case 'e-menu-btn':
                this.calendarSidebarObj.toggle();
                break;
            case 'e-create':
                if (this.scheduleObj && this.calendars.length > 0) {
                    const data: Record<string, any> = {
                        StartTime: resetTime(new Date()),
                        EndTime: resetTime(addDays(new Date(), 1)),
                        ResourceId: this.selectedCalendars?.ids[0] || this.calendars[0]?.id
                    };
                    this.scheduleObj.openEditor(data, 'Add', true);
                }
                break;
            case 'e-previous':
                this.scheduleObj.changeDate(this.scheduleObj.activeView.getNextPreviousDate('Previous'));
                break;
            case 'e-next':
                this.scheduleObj.changeDate(this.scheduleObj.activeView.getNextPreviousDate('Next'));
                break;
            case 'e-today':
                this.scheduleObj.selectedDate = new Date();
                break;
            case 'e-day':
                this.scheduleObj.currentView = 'Day';
                break;
            case 'e-week':
                this.scheduleObj.currentView = 'Week';
                break;
            case 'e-month':
                this.scheduleObj.currentView = 'Month';
                break;
            case 'e-agenda':
                this.scheduleObj.currentView = 'Agenda';
                break;
            case 'e-timeline':
                this.scheduleObj.currentView = 'TimelineMonth';
                break;
            case 'e-year':
                this.scheduleObj.currentView = 'Year';
                break;
            default:
                break;
        }
    };

    private onScheduleActionComplete = (args: ActionEventArgs): void => {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            this.updateDateRange();
            if (args.requestType === 'dateNavigate' && resetTime(this.calendarObj.value) !== resetTime(this.scheduleObj.selectedDate)) {
                this.calendarObj.value = this.scheduleObj.selectedDate;
            }
        } else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
            for (const event of args.addedRecords) {
                event.IsPlanned = true;
                this.appointmentData.push(event);
            }
            for (const event of args.changedRecords) {
                const index: number = this.appointmentData.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
                this.appointmentData[index] = event;
            }
            for (const event of args.deletedRecords) {
                const index: number = this.appointmentData.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
                this.appointmentData.splice(index, 1);
            }
            const events: Record<string, any>[] = args.addedRecords.concat(args.changedRecords);
            for (const event of events) {
                let calendar: Record<string, any> = this.selectedCalendars.items.find((item: Record<string, any>): boolean => item.id === event.CalendarId);
                if (isNullOrUndefined(calendar)) {
                    calendar = this.calendars.find((item: Record<string, any>): boolean => item.id === event.CalendarId);
                    calendar.isSelected = true;
                    this.selectedCalendars = this.getSelectedCalendars();
                    this.filteredData = this.getFilteredData();
                    this.calendarsListObj.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
                    this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true) as Record<string, any>[];
                    this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
                }
            }
        }
    };

    private updateDateRange = () => {
        let dateRange: string = '';
        if (this.scheduleObj) {
            const dateCollection: Date[] = this.scheduleObj.getCurrentViewDates();
            dateRange = this.scheduleObj.getDateRangeText(dateCollection);
            if (dateRange !== '' && this.toolbarObj) {
                const dateRangeElement: HTMLElement = this.toolbarObj.element.querySelector('.e-date-range .e-tbar-btn-text'); 
                this.toolbarObj.element.querySelector('.e-date-range .e-tbar-btn').setAttribute('aria-label', dateRange); 
                dateRangeElement.textContent = dateRange;
            }
        }
    };

    private valueChanged = (args: any) => {
        if (args?.isInteracted && this.scheduleObj) {
            this.scheduleObj.selectedDate = args.value;
        }
    };

    private listTemplate = (data: { name: string; id: number; color: string; isSelected: boolean }) => {
        return (
            <div className="calendar-list-item">
                <div className="calendar-name" title={data.name}>
                    {data.name}
                </div>
                {data.id !== 1 && (
                    <div className="calendar-buttons">
                        <span id="calendar-edit-btn" className="e-icons e-edit" data-calendar-id={data.id}></span>
                        <span id="calendar-delete-btn" className="e-icons e-trash" data-calendar-id={data.id}></span>
                    </div>
                )}
            </div>
        );
    };

    private listHeaderTemplate = () => {
        return (
            <div className="calendars-list-header">
                <div className="header-text">Calendars</div>
                <div className="header-icon e-icons e-plus"></div>
            </div>
        );
    };

    private schedulePopupOpen = (args: EventRenderedArgs) => {
        if (args.type === "Editor") {
            if (!args.element.querySelector(".custom-field-row")) {
                const row = document.createElement('div');
                row.className = 'custom-field-row';
                const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
                formElement.firstChild.insertBefore(row, args.element.querySelector(".e-resources-row"));
                const container = document.createElement('div');
                container.className = 'custom-field-container';
                const inputEle = document.createElement('input');
                inputEle.className = 'e-field';
                inputEle.name = 'CalendarId';
                container.appendChild(inputEle);
                row.appendChild(container);
                const dropDownList = new DropDownList({
                    dataSource: extend([], this.calendars, null, true) as Record<string, any>[],
                    cssClass: "calendar-ddl",
                    fields: { text: "name", value: "id" },
                    value: args.data?.CalendarId || this.selectedCalendars?.ids[0] || this.calendars[0]?.id,
                    floatLabelType: "Always", placeholder: "Calendar"
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute("name", "CalendarId");
            } else {
                const calendarDDL: DropDownList = (args.element.querySelector(".calendar-ddl input") as EJ2Instance).ej2_instances[0] as DropDownList;
                calendarDDL.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
                calendarDDL.value = args.data?.CalendarId || this.selectedCalendars?.ids[0] || this.calendars[0]?.id;
            }
        } else if (args.type === "QuickInfo" && isNullOrUndefined(args.data.Id)) {
            args.cancel = true;
        }
    };

    private eventRendered = (args: EventRenderedArgs): void => {
        const categoryColor: string = this.selectedCalendars.items[this.selectedCalendars.ids.indexOf(args.data.CalendarId)].color;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    };

    private dialogContent = () => {
        return (
            <div className="dialogContent">
                <div>Calendar Name</div><div className="dialog-content"><TextBoxComponent ref={(calendarName: TextBoxComponent) => this.calendarNameObj = calendarName} id="text-box" placeholder="Enter the calender name" /><ColorPickerComponent ref={(colorPickerObj: ColorPickerComponent) => this.colorPickerObj = colorPickerObj} id="color-picker" /></div>
            </div>
        );
    };

    private dialogFooterTemplate = () => {
        return (
            <button id="saveButton" ref={(saveButton: HTMLButtonElement) => this.saveButtonRef = saveButton } className="e-control e-btn e-primary" data-ripple="true" onClick={this.updateTextValue}></button>
        );
    };

    private unplannedSidebarClosed = () => {
        const unplannedElement: HTMLElement = this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
        if (unplannedElement) {
            unplannedElement.style.display = 'block';
        }
    };

    private unplannedSideBarCreated = () => {
        if (this.unPlannedSidebarObj) {
            const open: HTMLElement = this.unPlannedSidebarObj.element.parentElement.querySelector('#plannedOpen');
            const unplannedElement: HTMLElement = this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
            if (open) {
                open.onclick = (): void => {
                    this.unPlannedSidebarObj.show();
                    this.filteredData = this.getFilteredData();
                    this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
                    if (unplannedElement) {
                        unplannedElement.style.display = 'none';
                    }
                }
            }
        }
    };

    private unplannedSideBarCollapse = () => {
        if (this.unPlannedSidebarObj.isOpen) {
            this.unPlannedSidebarObj.hide();
            const unplannedElement: HTMLElement = this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
            if (unplannedElement) {
                unplannedElement.style.display = 'block';
            }
        }
    };
    
    public render() {
        return (
            <div id="event-calendar-sample" className="control-section event-calendar-control-section" >
                <div className="control-wrapper">
                    <div>
                        <ToolbarComponent ref={(toolbar: ToolbarComponent) => this.toolbarObj = toolbar} cssClass="event-calendar-toolbar" id='toolbar' clicked={this.onToolbarItemClicked} style={{ 'border': '1px solid #e5e5e5', 'marginBottom': '8px' }}>
                            <ItemsDirective>
                                <ItemDirective tooltipText="Menu" prefixIcon="e-menu" cssClass='e-menu-btn' />
                                <ItemDirective prefixIcon="e-chevron-left" tooltipText='Previous Week' cssClass='e-previous' />
                                <ItemDirective prefixIcon="e-chevron-right" tooltipText='Next Week' cssClass='e-next' />
                                <ItemDirective text={new Date().toLocaleDateString()} cssClass='e-date-range' />
                                <ItemDirective text="Create" align='Right' prefixIcon="e-plus" cssClass='e-create' />
                                <ItemDirective type='Separator' align='Right' />
                                <ItemDirective text='Today' align='Right' cssClass='e-today' />
                                <ItemDirective type='Separator' align='Right' />
                                <ItemDirective text='Day' align='Right' cssClass='e-day' />
                                <ItemDirective text='Week' align='Right' cssClass='e-week' />
                                <ItemDirective text='Month' align='Right' cssClass='e-month' />
                                <ItemDirective text='Agenda' align='Right' cssClass='e-agenda' />
                                <ItemDirective text='Timeline' align='Right' cssClass='e-timeline' />
                                <ItemDirective text='Year' align='Right' cssClass='e-year' />
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                    <div className="leftside">
                    </div>
                    <SidebarComponent id="sidebar-left" className="sidebar-treeview" ref={(sidebar: SidebarComponent) => this.calendarSidebarObj = sidebar} width={'320px'} height={'550px'}
                        target={'.main-content'} mediaQuery={'(min-width: 600px)'} isOpen={true}>
                        <div className="table-content">
                            <CalendarComponent ref={(calendar: CalendarComponent) => this.calendarObj = calendar} id="calendar" value={this.currentDate} change={this.valueChanged} cssClass='selected-date-calendar' />
                            <div className="calendar-list-container">
                                <ListViewComponent ref={(calendarsObj: ListViewComponent) => this.calendarsListObj = calendarsObj} id='listview-def' dataSource={this.calendars} showCheckBox={true} fields={{ id: 'id', text: 'name', isChecked: 'isSelected' }} showHeader={true} headerTemplate={this.listHeaderTemplate}
                                    template={this.listTemplate} select={this.onCalendarListChange} actionComplete={this.onListActionComplete}></ListViewComponent>
                            </div>
                        </div>
                    </SidebarComponent>
                    <div className="main-content" id="main-text">
                        <div className="sidebar-content">
                            <div className="schedule-container">
                                <ScheduleComponent id="Schedule" ref={(schedule: ScheduleComponent) => this.scheduleObj = schedule} height='550px' selectedDate={this.currentDate} showHeaderBar={false}
                                    eventSettings={this.eventSettings} eventRendered={this.eventRendered} popupOpen={this.schedulePopupOpen} created={this.updateDateRange}
                                    actionComplete={this.onScheduleActionComplete}>

                                    <ResourcesDirective>
                                        <ResourceDirective field='ResourceId' title='Resources' name='Resources' allowMultiple={true} dataSource={this.resourceData} textField='name' idField='id' colorField='color' />
                                    </ResourcesDirective>
                                    <ViewsDirective>
                                        <ViewDirective option='Day' />
                                        <ViewDirective option='Week' />
                                        <ViewDirective option='Month' />
                                        <ViewDirective option='Agenda' />
                                        <ViewDirective option='TimelineMonth' group={{ resources: ['Resources'] }}  />
                                        <ViewDirective option='Year' />
                                    </ViewsDirective>
                                    <Inject services={[Day, Week, WorkWeek, Month, Agenda, TimelineMonth, Year]} />
                                </ScheduleComponent>
                            </div>
                            <div className="unplanned-container">
                                <div id="plannedOpen" className="e-icons e-chevron-left-double"></div>
                                <SidebarComponent ref={(rightSidebarObj: SidebarComponent) => this.unPlannedSidebarObj = rightSidebarObj} id="sidebar-right" position={'Right'} width={'300px'} target={'.main-content'} type="Push" isOpen={false} created={this.unplannedSideBarCreated} close={this.unplannedSidebarClosed}>
                                <div id="unplanned-events-toolbar">
                                    <button className="e-icons e-exit-full-screen" title="Open/Close Sidebar" onClick={this.unplannedSideBarCollapse}></button>
                                    <h4 id="headerText">Unplanned Events</h4>
                                    </div>
                                    <div className="unplanned-text-containers">
                                        <GridComponent ref={(grid: GridComponent) => this.gridObj = grid} dataSource={extend([], this.filteredData.unplanned, null, true)}>
                                            <ColumnsDirective>
                                                <ColumnDirective field='Subject' headerText="Event" width='120px' textAlign="Left" />
                                                <ColumnDirective field='StartTime' headerText="Date" width='140px' format={'dd MMMM yyyy'} />
                                            </ColumnsDirective>
                                        </GridComponent>
                                    </div>
                                </SidebarComponent>
                                <div className="unplanned-text-container">Unplanned events</div>
                            </div>
                        </div>
                    </div>
                    <DialogComponent ref={(dialog: DialogComponent) => this.dialogObj = dialog} id='dialog' className='calendar-edit-dialog' header={"New Calender"} width={'320px'} content={this.dialogContent} footerTemplate={this.dialogFooterTemplate}
                        showCloseIcon={true} isModal={true} animationSettings={{ effect: 'Zoom' }} visible={false}> </DialogComponent>
                </div>
                <div id="action-description">
                    <p>This demo showcases the way to organize and filter multiple types of events such as Personal, Birthdays, Work,
                        and Holidays in the scheduler.</p>
                </div>
                <div id="description">
                    <p>In this example the multiple type of appointments such as Personal, Birthdays, Work,
                        and Holidays organized with filter option in a single scheduler. It helps the user to view a
                        specific or multiple type of appointments at one place.</p>
                    <p>The left sidebar helps the user to navigate between the scheduler dates and filter the appointments based
                        on their type.</p>
                    <p>The Schedule component is configured to show the appointments in colors based on their type to identify
                        the appointment type.</p>
                    <p>The right sidebar displays the list of unplanned events, which can be useful for the user to plan them later.</p>
                </div>
            </div >
        );
    }
}