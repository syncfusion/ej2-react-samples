import * as React from 'react';
import './table-reservation.css';
import { ScheduleComponent, TimelineViews, Agenda, Inject, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, ResourceDetails, TimeScaleModel, EventRenderedArgs, PopupCloseEventArgs, ActionEventArgs, PopupOpenEventArgs, Week, Day, ToolbarItemsDirective, ToolbarItemDirective, CellClickEventArgs, FieldModel } from '@syncfusion/ej2-react-schedule';
import { addClass, closest, extend, Internationalization, isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { DragAndDropEventArgs, SelectingEventArgs, TabComponent, TabItemDirective, TabItemsDirective, TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DateTimePickerComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import * as dataSource from './datasource.json';
import { SampleBase } from '../common/sample-base';

export class TableReservation extends SampleBase<{}, {}> {
  private scheduleRef: React.RefObject<ScheduleComponent> = React.createRef<ScheduleComponent>();
  private slotTabRef: React.RefObject<TabComponent> = React.createRef<TabComponent>();
  private allWaitingDataTreeViewRef: React.RefObject<TreeViewComponent> = React.createRef<TreeViewComponent>();
  private breakfastWaitingDataTreeViewRef: React.RefObject<TreeViewComponent> = React.createRef<TreeViewComponent>();
  private lunchWaitingDataTreeViewRef: React.RefObject<TreeViewComponent> = React.createRef<TreeViewComponent>();
  private dinnerWaitingDataTreeViewRef: React.RefObject<TreeViewComponent> = React.createRef<TreeViewComponent>();
  private alertDialogRef: React.RefObject<DialogComponent> = React.createRef<DialogComponent>();
  private startDateTimePickerRef: React.RefObject<DateTimePickerComponent> = React.createRef<DateTimePickerComponent>();
  private endDateTimePickerRef: React.RefObject<DateTimePickerComponent> = React.createRef<DateTimePickerComponent>();
  private intl: Internationalization = new Internationalization();
  private isDraggedItemDropped: boolean = false;
  private draggedItemId: number;
  private startDateTimeValue: Date;
  private selectedDate: Date = new Date(2025, 2, 16);
  private animationSettings: AnimationSettingsModel = { effect: 'None' };
  private eventsData: Record<string, any>[] = extend([], (dataSource as Record<string, any>).TableReservationData, null, true) as Record<string, any>[];
  private breakfastWaitingData: Record<string, any>[] = extend([], (dataSource as Record<string, any>).BreakfastWaitingData, null, true) as Record<string, any>[];
  private lunchWaitingData: Record<string, any>[] = extend([], (dataSource as Record<string, any>).LunchWaitingData, null, true) as Record<string, any>[];
  private dinnerWaitingData: Record<string, any>[] = extend([], (dataSource as Record<string, any>).DinnerWaitingData, null, true) as Record<string, any>[];
  private allWaitingData: Record<string, any>[] = this.breakfastWaitingData.concat(this.lunchWaitingData, this.dinnerWaitingData);

  private tableCategory: Record<string, any>[] = [
    { category: 'Standard Table', id: 1 },
    { category: 'Family Table', id: 2 },
    { category: 'VIP Table', id: 3, IsExpand: false },
    { category: 'Outdoor Table', id: 4 }
  ];

  private tables: Record<string, any>[] = [
    { name: 'Table1', id: 1, groupId: 1, seats: '2', notes: 'Cozy booth near the entrance, ideal for quick meals or solo diners' },
    { name: 'Table2', id: 2, groupId: 1, seats: '4', notes: 'Window-side table with natural lighting, great for small talk or business lunch' },
    { name: 'Table3', id: 3, groupId: 1, seats: '8', notes: 'Quiet corner, perfect for couples or peaceful solo dining' },
    { name: 'Table4', id: 4, groupId: 2, seats: '6', notes: 'Kid-friendly zone, near high chairs and restrooms for family convenience' },
    { name: 'Table5', id: 5, groupId: 2, seats: '10', notes: 'Extra space for strollers or baby seats' },
    { name: 'Table6', id: 6, groupId: 3, seats: '4', notes: 'Private booth with dim lighting, great for romantic dinners' },
    { name: 'Table7', id: 7, groupId: 3, seats: '8', notes: 'Scenic view (overlooks the city or garden), premium decor' },
    { name: 'Table8', id: 8, groupId: 4, seats: '4', notes: 'Garden-side table with umbrella shade, great for brunch' },
    { name: 'Table9', id: 9, groupId: 4, seats: '6', notes: 'Pet-friendly table, smoking allowed, close to outdoor heater (for chilly nights)' }
  ];

  private allWaitingDataTreeFields: { dataSource: Record<string, any>[]; id: string; text: string } = { dataSource: this.allWaitingData, id: 'Id', text: 'CustomerName' };
  private breakfastWaitingDataTreeFields: { dataSource: Record<string, any>[]; id: string; text: string } = { dataSource: this.breakfastWaitingData, id: 'Id', text: 'CustomerName' };
  private lunchWaitingDataTreeFields: { dataSource: Record<string, any>[]; id: string; text: string } = { dataSource: this.lunchWaitingData, id: 'Id', text: 'CustomerName' };
  private dinnerWaitingDataTreeFields: { dataSource: Record<string, any>[]; id: string; text: string } = { dataSource: this.dinnerWaitingData, id: 'Id', text: 'CustomerName' };

  private scheduleFields: FieldModel = {
    id: 'Id',
    subject: { name: 'Status', title: 'Status' },
    startTime: { name: 'StartTime', title: 'Form' },
    endTime: { name: 'EndTime', title: 'To' },
    description: { name: 'Notes', title: 'Notes' }
  };

  private slotData: string[] = ['Breakfast', 'Lunch', 'Dinner'];

  private alertDialogButtons: ButtonPropsModel[] = [
    {
      click: () => {
        this.alertDialogRef.current.hide();
      },
      buttonModel: {
        isPrimary: true,
        content: 'OK',
      },
    },
  ];

  private getMealPeriod = (date: Date): string => {
    const hours: number = date.getHours();
    if (hours >= 7 && hours < 12) return 'Breakfast';
    if (hours >= 12 && hours < 17) return 'Lunch';
    if (hours >= 17 && hours <= 22) return 'Dinner';
    return '';
  }

  private formatTimeRange = (startHour: number, endHour: number, date: Date): string => {
    const startTime: Date = new Date(date);
    startTime.setHours(startHour, 0, 0);
    const endTime: Date = new Date(date);
    endTime.setHours(endHour, 0, 0);
    return `${this.intl.formatDate(startTime, { skeleton: 'hm' })} to ${this.intl.formatDate(endTime, { skeleton: 'hm' })}`;
  }

  private getMealPeriodTimeRange = (date: Date): string => {
    const hours: number = date.getHours();
    if (hours >= 7 && hours < 12) return this.formatTimeRange(7, 12, date);
    if (hours >= 12 && hours < 17) return this.formatTimeRange(12, 17, date);
    if (hours >= 17 && hours <= 22) return this.formatTimeRange(17, 22, date);
    return '';
  }

  private majorSlotTemplate = (props: any): JSX.Element => {
    const hours: number = props.date.getHours();
    const minutes: number = props.date.getMinutes();
    const mealPeriod: string = this.getMealPeriod(props.date);
    const showTimeRange: boolean = (hours === 7 && minutes === 0) || (hours === 12 && minutes === 0) || (hours === 17 && minutes === 0);
    const timeRange: string = showTimeRange ? this.getMealPeriodTimeRange(props.date) : '';
    return (
      <div className="custom-slot-template">
        <div className="meal-period-indicator">{mealPeriod}</div>
        {showTimeRange && <div className="time-text">{timeRange}</div>}
      </div>
    );
  }

  private timeScale: TimeScaleModel = {
    enable: true,
    interval: 300,
    slotCount: 5,
    majorSlotTemplate: this.majorSlotTemplate
  };

  private getTableName = (value: ResourceDetails): string => {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField as string] as string;
  }

  private getTableSeats = (value: ResourceDetails): string => {
    return (value as ResourceDetails).resourceData.seats as string;
  }

  private resourceHeaderTemplate = (props: any): JSX.Element => {
    if (props.resource.name === 'Category') {
      return (
        <div className="e-resource-text">{props.resourceData.category}</div>
      );
    } else {
      return (
        <div className="template-wrap">
          <div className="resource-header-template">
            <div className="table-name">{this.getTableName(props)}</div>
            <div className="table-seat-capacity">
              <span className='e-icons seat-capacity-icon'></span>
              <span className='seat-capacity'>{this.getTableSeats(props)}</span>
            </div>
          </div>
        </div>
      );
    }
  }

  private toggleWaitingListElement = (): void => {
    let settingsPanel: HTMLElement = document.querySelector('.waiting-list-container');
    let toggleButton: HTMLElement = this.scheduleRef.current?.element.querySelector('.e-show-waiting-list') || this.scheduleRef.current?.element.querySelector('.e-hide-waiting-list');
    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-hide-waiting-list', 'e-show-waiting-list');
    }
    else {
      addClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-show-waiting-list', 'e-hide-waiting-list');
    }
    this.scheduleRef.current?.refreshEvents();
  }

  private agendaTemplate = (props: any): JSX.Element => {
    return (
      <div className="agenda-event">
        <div className="agenda-item">
          {props.Status === 'Cancelled' && (
            <div className="status-badge">Cancelled</div>
          )}
          <div className="table-info">
            <span className="table-label appointment-item">Table : </span>
            <span className="table-name">{this.tables.find(table => table.id === props.TableId)?.name}</span>
          </div>
          {props.Status === 'Blocked' || props.Status === 'Not Available' ? (
            <div className="time-size-details">
              <div className="time-section">
                <span className="time-icon e-icons"></span>
                <span className="time-value appointment-item">
                  {this.getTimeString(props.StartTime)} - {this.getTimeString(props.EndTime)}
                </span>
                <span className="slot-duration appointment-item">
                  {props.Status} - {this.getDuration(props.StartTime, props.EndTime)}
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="customer-name">{props.CustomerName}</div>
              <div className="time-size-details">
                <div className="time-section">
                  <span className="time-icon e-icons"></span>
                  <span className="time-value appointment-item">
                    {this.getTimeString(props.StartTime)} - {this.getTimeString(props.EndTime)}
                  </span>
                </div>
                <div className="slot-duration-details">
                  <span className="slot-duration appointment-item">
                    {props.slot} - {this.getDuration(props.StartTime, props.EndTime)}
                  </span>
                </div>
                <div className="party-details">
                  <span className="party-icon e-icons"></span>
                  <span className="party-size appointment-item">
                    Guest Count : {props.GuestCount}
                  </span>
                </div>
              </div>
              <div className="contact-details">
                <span className="phone-icon e-icons tr-icon-telephone"></span>
                <span className="phone-number appointment-item">
                  {props.contactNumber}
                </span>
              </div>
              {props.Notes && (
                <div className="notes-details">
                  <span className="notes-icon e-icons"></span>
                  <span className="notes appointment-item">{props.Notes}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  private getTimeString = (value: Date): string => {
    return this.intl.formatDate(value, { skeleton: 'hm' });
  }

  private getBackgroundColorByTime = (startHour: number): string => {
    let backgroundColor: string = '';
    if (startHour >= 7 && startHour < 12) {
      backgroundColor = '#0F6CBD';
    } else if (startHour >= 12 && startHour < 17) {
      backgroundColor = '#2E7D32';
    } else if (startHour >= 17 && startHour <= 22) {
      backgroundColor = '#4E342E';
    }
    return backgroundColor;
  }

  private getQuickInfoHeaderStyle = (data: any): { [key: string]: Object } => {
    const startHour: number = data.StartTime.getHours();
    let backgroundColor: string = this.getBackgroundColorByTime(startHour);
    return { background: backgroundColor, color: '#FFFFFF' };
  }

  private getQuickInfoDurationText = (data: Record<string, any>): string => {
    return this.intl.formatDate(data.StartTime, { skeleton: 'yMMMEd' }) + ' (' +
      this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
  }

  private quickInfoHeader = (props: Record<string, any>): JSX.Element => {
    return (
      <div className="e-event-header e-popup-header">
        <div className="e-header-icon-wrapper">
          <button id="close" className="e-close e-icons e-close-icon e-btn e-lib e-flat e-round e-small e-icon-btn" title="CLOSE" onClick={() => { this.scheduleRef.current?.closeQuickInfoPopup(); }} />
        </div>
        <div className="quick-info-header-content" style={this.getQuickInfoHeaderStyle(props)}>
          <div className="quick-info-title">{props.CustomerName}</div>
          <div className="duration-text">{this.getQuickInfoDurationText(props)}</div>
        </div>
      </div>
    );
  }

  private quickInfoContent = (props: any): JSX.Element => {
    const tableName: string = this.tables.filter((table) => table.id === props.TableId)[0].name;
    const tableType: string = this.tableCategory.filter((table) => table.id === props.CategoryId)[0].category;
    return (
      <div className="quick-info-content">
        <div className="event-content">
          <div className="e-table e-content-item">
            <label>Table</label>
            <span className='e-content'>: {tableType} ({tableName})</span>
          </div>
          <div className="e-time e-content-item">
            <label>Time period</label>
            <span className='e-content'>: {props.slot} - {this.getDuration(props.StartTime, props.EndTime)}</span>
          </div>
          <div className="e-party-size e-content-item">
            <label>Party size</label>
            <span className='e-content'>: {props.GuestCount}</span>
          </div>
          <div className="e-contact-number e-content-item">
            <label>Contact number</label>
            <span className='e-content'>: {props.contactNumber}</span>
          </div>
          {props.Notes && props.Notes.length > 0 && (
            <div className="e-notes e-content-item e-notes-row">
              <label className="e-notes-label">Note</label>
              <span className='e-notes-colon'>:</span>
              <div className='e-content'>{props.Notes}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  private onEventRendered = (args: EventRenderedArgs): void => {
    const eventData: Record<string, any> = args.data;
    if (eventData) {
      let status: string = eventData.Status.toLowerCase();
      args.element.classList.add('e-' + (status.toLowerCase().replace(' ', '-')));
      if (args.element && !args.element.matches('.e-agenda-item.e-agenda-view') && status !== 'cancelled' && status !== 'blocked' && status !== 'not available') {
        const startHour: number = eventData.StartTime.getHours();
        let backgroundColor: string = this.getBackgroundColorByTime(startHour);
        if (args.element) {
          args.element.style.backgroundColor = backgroundColor;
        }
      }
    }
  }

  private onActionBegin = (args: ActionEventArgs): void => {
    if (args.requestType === 'eventCreate') {
      let formData: Record<string, any> = args.addedRecords[0] as Record<string, any>;
      args.addedRecords[0].StartTime = new Date(formData.StartTime).toISOString();
      args.addedRecords[0].EndTime = new Date(formData.EndTime).toISOString();
      args.addedRecords[0].CustomerName = args.addedRecords[0].CustomerName || formData.Subject;
      args.addedRecords[0].Status = args.addedRecords[0].Status || "Reserved";
    }
  }

  private editorHeaderTemplate = (props: any): JSX.Element => {
    return (
      <div id="event-editor-header">New Reservation</div>
    );
  }

  private stratDateTimeChange = (args: ChangedEventArgs): void => {
      const previousStartDateTime: Date = this.startDateTimeValue;
      const startDateTime: Date = new Date(this.startDateTimePickerRef.current!.value as Date);
      let difference: number = 0;
      if (startDateTime > previousStartDateTime) {
        difference = startDateTime.getTime() - previousStartDateTime.getTime();
      } else {
        difference = startDateTime.getTime() - previousStartDateTime.getTime();
      }
      const endDateTime: Date = new Date(this.endDateTimePickerRef.current!.value as Date);
      const newEndDateTime: Date = new Date(endDateTime.getTime() + difference);
      this.endDateTimePickerRef.current!.value = newEndDateTime;
      this.startDateTimeValue = startDateTime;
  }

  private editorTemplate = (props: any): React.ReactNode => {
    this.startDateTimeValue = new Date(props.StartTime || props.startTime);
    return (
      <div className="custom-event-editor">
        <div className="form-row ready-only-item">
          <div className="form-group first-item">
            <label className="e-textlabel">Name</label>
            <div className="e-field-wrapper">
              <input
                id="Subject"
                className="e-field e-input"
                type="text"
                name="Subject"
                data-name="Subject"
                defaultValue={props.Subject || ''}
              />
            </div>
          </div>
          <div className="form-group half-width">
            <label className="e-textlabel">Table category</label>
            <div className="e-field-wrapper">
              <DropDownListComponent
                id="CategoryId"
                dataSource={this.tableCategory}
                fields={{ text: 'category', value: 'id' }}
                value={props.CategoryId}
                className="e-field"
                data-name="CategoryId"
              />
            </div>
          </div>
        </div>
        <div className="form-row ready-only-item">
          <div className="form-group first-item">
            <label className="e-textlabel">Party size</label>
            <div className="e-field-wrapper">
              <NumericTextBoxComponent
                id="GuestCount"
                value={props.GuestCount || 4}
                min={1}
                max={20}
                format="n0"
                showSpinButton={true}
                className="e-field"
                data-name="GuestCount"
              />
            </div>
          </div>
          <div className="form-group half-width">
            <label className="e-textlabel">Table</label>
            <div className="e-field-wrapper">
              <DropDownListComponent
                id="TableId"
                dataSource={this.tables}
                fields={{ text: 'name', value: 'id' }}
                value={props.TableId}
                className="e-field"
                data-name="TableId"
              />
            </div>
          </div>
        </div>
        <div className="form-row e-start-end-time">
          <div className="form-group first-item">
            <label className="e-textlabel">Start</label>
            <div className="e-field-wrapper">
              <DateTimePickerComponent
              ref={this.startDateTimePickerRef}
                id="StartTime"
                format="M/dd/yy h:mm a"
                data-name="StartTime"
                value={this.startDateTimeValue}
                className="e-field"
                change={this.stratDateTimeChange}
              />
            </div>
          </div>
          <div className="form-group half-width ready-only-item">
            <label className="e-textlabel">End</label>
            <div className="e-field-wrapper">
              <DateTimePickerComponent
              ref={this.endDateTimePickerRef}
                id="EndTime"
                format="M/dd/yy h:mm a"
                data-name="EndTime"
                value={new Date(props.EndTime || props.endTime)}
                className="e-field"
              />
            </div>
          </div>
        </div>
        <div className="form-row ready-only-item">
          <div className="form-group first-item">
            <label className="e-textlabel">Time period (In-hour)</label>
            <div className="e-field-wrapper">
              <DropDownListComponent
                id="Duration"
                dataSource={['1 hour', '1.5 hours', '2 hours', '2.5 hours', '3 hours']}
                value={props.Duration || '2 hours'}
                className="e-field"
                data-name="Duration"
              />
            </div>
          </div>
          <div className="form-group half-width">
            <label className="e-textlabel">Meal slot</label>
            <div className="e-field-wrapper">
              <DropDownListComponent
                id="slot"
                dataSource={['Breakfast', 'Lunch', 'Dinner']}
                value={props.slot || 'Breakfast'}
                className="e-field"
                data-name="slot"
              />
            </div>
          </div>
        </div>
        <div className="form-row ready-only-item">
          <div className="form-group e-contact-number">
            <label className="e-textlabel">Contact number</label>
            <div className="e-field-wrapper">
              <TextBoxComponent
                id="contactNumber"
                placeholder="Enter contact number"
                value={props.contactNumber || ''}
                className="e-field"
                data-name="contactNumber"
              />
            </div>
          </div>
        </div>
        <div className="form-row ready-only-item">
          <div className="form-group e-note">
            <label className="e-textlabel">Note</label>
            <div className="e-field-wrapper">
              <textarea
                id="Notes"
                className="e-field e-input"
                name="Notes"
                data-name="Notes"
                rows={3}
                defaultValue={props.Notes || ''}
                style={{ width: '100%', height: '80px', resize: 'vertical' }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private isDataSourceEmpty = (dataSource: Record<string, any>[]): boolean => {
    return !dataSource || dataSource.length === 0;
  }

  private handleEmptyDataSourceDisplay = (treeViewRef: any, dataSource: Record<string, any>[]): void => {
    const noEventsElement: HTMLElement = document.querySelector('.no-waiting-list-message');
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

  private onCellClick = (args: CellClickEventArgs): void => {
    args.cancel = true;
  }

  private onPopupOpen = (args: PopupOpenEventArgs): void => {
    const { type, data, element } = args;
    const isQuickInfoPopup = type === 'QuickInfo' || type === 'ViewEventInfo';
    const isEditorPopup = type === 'Editor';
    if (isQuickInfoPopup) {
      if (data?.Status === 'Blocked' || data?.Status === 'Not Available') {
        args.cancel = true;
        return;
      }
      element.classList.add('table-reservation-quick-popup');
    } else if (isEditorPopup) {
      if (!this.isDraggedItemDropped) {
        args.cancel = true;
        return;
      }
      element.classList.add('table-reservation-editor-popup');
    }
  }

  private onPopupClose = (args: PopupCloseEventArgs): void => {
    if (args.type === 'Editor') {
      const targetElement: HTMLElement = args.event.target as HTMLElement;
      const isSaveAction: boolean = targetElement.classList.contains('e-event-save') || targetElement.classList.contains('e-save-icon');
      if (isSaveAction) {
        const startTime: Date = args.data.StartTime;
        const endTime: Date = args.data.EndTime;
        const startHour: number = startTime.getHours();
        const endtHour: number = endTime.getHours();
        const slot: string = args.data.slot;
        const isCorrectTimeSlot: boolean = startTime.getDate() === endTime.getDate() && ((slot === 'Breakfast' && startHour >= 7 && endtHour < 12) || (slot === 'Lunch' && startHour >= 12 && endtHour < 17) || (slot === 'Dinner' && startHour >= 17 && endtHour <= 22));
        if (!isCorrectTimeSlot) {
          let timeElement: Element = args.element.querySelector('.e-start-end-time');
          if (!args.element.querySelector('.time-alert')) {
            const newDiv: Element = document.createElement('div');
            newDiv.classList.add('time-alert');
            newDiv.textContent = 'Select a time between ' + (slot === 'Breakfast' ? '7 a.m. and 12 p.m.' : (slot === 'Lunch' ? '12 p.m. and 5 p.m.' : '5 p.m. and 10 p.m.'));
            timeElement.insertAdjacentElement('afterend', newDiv);
          }
          args.cancel = true;
          return;
        } else {
          if (args.element.querySelector('.capacity-alert')) {
            args.element.querySelector('.capacity-alert').remove();
          }
        }
        let waitingListTreeViewRefs: React.RefObject<TreeViewComponent>[] = [this.allWaitingDataTreeViewRef, this.breakfastWaitingDataTreeViewRef, this.lunchWaitingDataTreeViewRef, this.dinnerWaitingDataTreeViewRef];
        let currentTreeViewRef: TreeViewComponent = waitingListTreeViewRefs[this.slotTabRef.current.selectedItem].current;
        let currentTreeViewData: { [key: string]: Object }[] = currentTreeViewRef.fields.dataSource as { [key: string]: Object }[];
        const updatedData: { [key: string]: Object }[] = currentTreeViewData.filter((item: any) => item.Id !== this.draggedItemId);
        currentTreeViewRef.fields.dataSource = updatedData;
        this.allWaitingData = this.allWaitingData.filter(
          item => item.Id !== this.draggedItemId
        );
        this.handleEmptyDataSourceDisplay(currentTreeViewRef, updatedData);
      }
      this.isDraggedItemDropped = false;
    }
  }

  private getDuration = (startTime: Date, endTime: Date): string => {
    const durationMs: number = endTime.getTime() - startTime.getTime();
    const durationHours: number = durationMs / (1000 * 60 * 60);
    const roundedHours: number = Math.round(durationHours * 10) / 10;
    const displayHours: string = roundedHours % 1 === 0 ?
      roundedHours.toString() :
      roundedHours.toFixed(1);
    return `${displayHours} hour${roundedHours !== 1 ? 's' : ''}`;
  }

  private eventTemplate = (props: any): JSX.Element => {
    if (props.Status === 'Not Available' || props.Status === 'Blocked') {
      let durationText: string = '';
      if (props.Status === 'Blocked') {
        durationText = `(${this.getDuration(props.StartTime, props.EndTime)})`;
      }
      return (
        <div className="template-wrap">
          <div className={`${props.Status.toLowerCase().replace(' ', '-')}`}>
            {props.Status} {durationText}
          </div>
        </div>
      );
    }
    return (
      <div className="template-wrap reservation-card">
        {props.Status === 'Cancelled' && (
          <div className="status-badge">Cancelled</div>
        )}
        <div className="customer-details">
          <span className="customer-name">{props.CustomerName}</span>
          <div className="guest-info">
            <span className="guest-icon e-icons appointment-icon"></span>
            <span className="guest-count">{props.GuestCount}</span>
          </div>
        </div>
        <div className="time-details">
          <span className="time-icon e-icons appointment-icon"></span>
          <span className="time-slot">
            {props.slot} - {this.getDuration(props.StartTime, props.EndTime)}
          </span>
        </div>
        <div className="contact-info">
          <span className="contact-info-icon e-icons tr-icon-telephone appointment-icon"></span>
          <span className="contact-info-number">{props.contactNumber}</span>
        </div>
      </div>
    );
  }

  private treeTemplate = (props: any): JSX.Element => {
    return (
      <div className="template-wrap waiting-list-card">
        <div className="customer-header">
          <div className="customer-name-section">
            <span className="customer-name">{props.CustomerName}</span>
            <div className="guest-info">
              <span className="guest-icon e-icons"></span>
              <span className="guest-count list-item">{props.GuestCount}</span>
            </div>
          </div>
          <div className="contact-info">
            <span className="contact-info-icon e-icons tr-icon-telephone"></span>
            <span className="contact-info-number list-item">{props.contactInfo}</span>
          </div>
        </div>
        <div className="time-details">
          <span className="time-icon e-icons"></span>
          <span className="time-slot list-item">{props.Slot} - {props.Duration}</span>
        </div>
        <div className="notes-details">
          <span className="notes-icon e-icons"></span>
          <span className="notes list-item">{props.Notes}</span>
        </div>
        <div className="table-category">
          <span className="category-label list-item">Table Category :</span>
          <span className="category-value">{props.Table}</span>
        </div>
      </div>
    );
  }

  private unplannedEventsUpdatedData = (dataSource: Record<string, any>[], selectedTabIndex: number): Record<string, any>[] => {
    return dataSource.filter((data) => data.Slot === this.slotData[selectedTabIndex - 1]);
  }

  private onTabSelecting = (args: SelectingEventArgs): void => {
    let waitingListTreeViewRefs: React.RefObject<TreeViewComponent>[] = [this.allWaitingDataTreeViewRef, this.breakfastWaitingDataTreeViewRef, this.lunchWaitingDataTreeViewRef, this.dinnerWaitingDataTreeViewRef];
    const previousTabIndex: number = args.selectedIndex;
    const selectedTabIndex: number = args.selectingIndex;
    waitingListTreeViewRefs[selectedTabIndex].current.fields.dataSource =
      selectedTabIndex === 0 ? (this.breakfastWaitingDataTreeViewRef.current.fields.dataSource as any).concat(this.lunchWaitingDataTreeViewRef.current.fields.dataSource, this.dinnerWaitingDataTreeViewRef.current.fields.dataSource) : this.unplannedEventsUpdatedData(this.allWaitingData, selectedTabIndex);
      waitingListTreeViewRefs[previousTabIndex].current.element.style.display = 'none';
      waitingListTreeViewRefs[selectedTabIndex].current.element.style.display = '';
      this.handleEmptyDataSourceDisplay(waitingListTreeViewRefs[selectedTabIndex].current, waitingListTreeViewRefs[selectedTabIndex].current.fields.dataSource as any);
    }
  
    private showAlertMessage = (message: string): void => {
      if (this.alertDialogRef.current) {
        this.alertDialogRef.current.content = message;
        this.alertDialogRef.current.show();
      }
    }
  
    private onTreeDragStart = () => {
      document.body.classList.add('e-disble-not-allowed');
    }
  
    private onTreeDragging = (event: DragAndDropEventArgs): void => {
      document.body.classList.add('table-reservation-dragging');
      const targetElement: HTMLElement = event.target;
      const cancelledAppointment: Element = closest(targetElement, '.e-appointment.e-cancelled');
      const allElements: NodeListOf<Element> = document.querySelectorAll('.not-allowed-cursor');
      allElements.forEach(el => el.classList.remove('not-allowed-cursor'));
      if ((targetElement.classList.contains('e-work-cells') && !targetElement.classList.contains('e-resource-group-cells')) ||
        cancelledAppointment) {
        if (cancelledAppointment) {
          const allChildren: NodeListOf<Element> = cancelledAppointment.querySelectorAll('*');
          allChildren.forEach(child => child.classList.remove('not-allowed-cursor'));
        }
      } else {
        targetElement.classList.add('not-allowed-cursor');
      }
    }
  
    private onTreeDragStop = (event: any) => {
      document.body.classList.remove('table-reservation-dragging');
      const dropNotAllowedElements: NodeListOf<Element> = document.querySelectorAll('.not-allowed-cursor');
      dropNotAllowedElements.forEach(element => {
        element.classList.remove('not-allowed-cursor');
      });
      let treeElement: Element = closest(event.target, '.e-treeview');
      let classElement: HTMLElement = this.scheduleRef.current?.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (!treeElement) {
        event.cancel = true;
        let scheduleElement: Element = closest(event.target, '.e-content-wrap');
        if (scheduleElement) {
          let targetElement: Element = event.target;
          const filteredData: Record<string, any>[] = this.allWaitingData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
          const targetIsCell: boolean = targetElement.classList.contains('e-work-cells') && !targetElement.classList.contains('e-resource-group-cells');
          const targetIsCancelledEvent: boolean = !isNullOrUndefined(closest(event.target, '.e-appointment.e-cancelled'));
          let eventData: Record<string, any>;
          let tableId: number;
          let StartTime: Date;
          let groupIndex: number;
          let EndTime: Date;
          if (targetIsCell) {
            let cellData: any = this.scheduleRef.current?.getCellDetails(event.target);
            tableId = cellData.groupIndex > 10 ? (cellData.groupIndex - 3) : (cellData.groupIndex > 7 ? (cellData.groupIndex - 2) : (cellData.groupIndex > 4 ? (cellData.groupIndex - 1) : cellData.groupIndex));
            groupIndex = cellData.groupIndex;
            StartTime = cellData.startTime;
          } else if (targetIsCancelledEvent) {
            targetElement = closest(targetElement, '.e-appointment.e-cancelled');
            eventData = this.scheduleRef.current?.getEventDetails(targetElement);
            tableId = eventData.TableId;
            groupIndex = tableId;
            StartTime = eventData.StartTime;
          } else {
            return;
          }
          const { CustomerName, GuestCount, Table, contactInfo, Slot, Duration, ReservationType, Notes, BookingSource } = filteredData[0];
          const tableData: Record<string, any> = this.tables.filter((table) => table.id === tableId)[0];
          const tableType: string = this.tableCategory.filter((tableGroup) => tableGroup.id === tableData.groupId)[0].category.split(' ')[0];
          if (tableType !== Table) {
            this.showAlertMessage(`Table category mismatch. This reservation requires a ${Table} table, but you selected a ${tableType} table.`);
            return;
          } else if (parseInt(tableData.seats, 10) < GuestCount) {
            this.showAlertMessage(`Insufficient seating capacity. This reservation requires seating for ${GuestCount} guests, but the selected table only seats ${tableData.seats}.`);
            return;
          }
          const durationValue: number = parseFloat((Duration as any).split(' ')[0]);
          const durationUnit: string = (Duration as any).split(' ')[1];
          let endTime: Date = new Date(StartTime);
          if (durationUnit === 'hour' || durationUnit === 'hours') {
            const hours: number = Math.floor(durationValue);
            const minutes: number = Math.round((durationValue - hours) * 60);
            endTime.setHours(endTime.getHours() + hours);
            endTime.setMinutes(endTime.getMinutes() + minutes);
          } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
            endTime.setMinutes(endTime.getMinutes() + durationValue);
          }
          EndTime = endTime;
          const hour: number = StartTime.getHours();
          const isCorrectTimeSlot: boolean = (Slot === 'Breakfast' && hour >= 7 && hour < 12) || (Slot === 'Lunch' && hour >= 12 && hour < 17) || (Slot === 'Dinner' && hour >= 17 && hour <= 22);
          if (!isCorrectTimeSlot) {
            this.showAlertMessage(`Time slot mismatch. This reservation is for ${Slot}, but you're trying to schedule it during ${hour < 12 ? 'Breakfast' : hour < 17 ? 'Lunch' : 'Dinner'} hours.`);
            return;
          }
          const startDate: number = StartTime.getDate();
          const endDate: number = EndTime.getDate();
          const endHour: number = EndTime.getHours();
          const isSlotAvailable: boolean = this.scheduleRef.current?.isSlotAvailable(StartTime, EndTime, groupIndex) && startDate === endDate && endHour <= 22;
          if (!isSlotAvailable && targetIsCell) {
            this.showAlertMessage('This time slot is already booked. Please select another time or table.');
            return;
          }
          let updatedEventData: Record<string, any> = targetIsCancelledEvent ? eventData : {};
          updatedEventData.Status = 'Reserved';
          updatedEventData.Subject = CustomerName;
          updatedEventData.GuestCount = GuestCount;
          updatedEventData.TableId = tableId;
          updatedEventData.CategoryId = tableData.groupId;
          updatedEventData.CustomerName = CustomerName;
          updatedEventData.StartTime = StartTime;
          updatedEventData.EndTime = EndTime;
          updatedEventData.Duration = Duration;
          updatedEventData.slot = Slot;
          updatedEventData.contactNumber = contactInfo;
          updatedEventData.ReservationType = ReservationType;
          updatedEventData.BookingSource = BookingSource;
          updatedEventData.Notes = Notes;
          this.scheduleRef.current?.openEditor(updatedEventData, targetIsCell ? 'Add' : 'EditOccurrence', targetIsCell);
          this.isDraggedItemDropped = true;
          this.draggedItemId = parseInt(event.draggedNodeData.id as string, 10);
        }
      }
      document.body.classList.remove('e-disble-not-allowed');
    }
  
    render() {
      return (
        <div className='control-section table-reservation-control-section'>
          <div className='control-wrapper table-reservation-wrapper'>
            <ScheduleComponent
              ref={this.scheduleRef}
              cssClass='schedule-table-reservation'
              width='100%'
              height='550px'
              selectedDate={this.selectedDate}
              group={{ enableCompactView: false, resources: ['Category', 'Tables'] }}
              resourceHeaderTemplate={this.resourceHeaderTemplate}
              startHour="07:00"
              endHour='22:00'
              timeScale={this.timeScale}
              allowOverlap={false}
              eventSettings={{
                dataSource: this.eventsData,
                fields: this.scheduleFields,
                template: this.eventTemplate
              }}
              actionBegin={this.onActionBegin}
              editorHeaderTemplate={this.editorHeaderTemplate}
              editorTemplate={this.editorTemplate}
              eventRendered={this.onEventRendered}
              cellClick={this.onCellClick}
              popupOpen={this.onPopupOpen}
              popupClose={this.onPopupClose}
              quickInfoTemplates={{ header: this.quickInfoHeader, content: this.quickInfoContent }}
            >
              <ViewsDirective>
                <ViewDirective option='TimelineDay' />
                <ViewDirective option='Agenda' eventTemplate={this.agendaTemplate} />
              </ViewsDirective>
              <ResourcesDirective>
                <ResourceDirective
                  field="CategoryId"
                  title="Category"
                  name="Category"
                  cssClassField='table-category'
                  allowMultiple={false}
                  dataSource={this.tableCategory}
                  textField="category"
                  idField="id"
                />
                <ResourceDirective
                  field="TableId"
                  title="Tables"
                  name="Tables"
                  cssClassField='table-name'
                  allowMultiple={true}
                  dataSource={this.tables}
                  textField="name"
                  idField="id"
                  groupIDField='groupId'
                />
              </ResourcesDirective>
              <ToolbarItemsDirective>
                <ToolbarItemDirective name='Previous' align='Left'></ToolbarItemDirective>
                <ToolbarItemDirective name='Next' align='Left'></ToolbarItemDirective>
                <ToolbarItemDirective name='DateRangeText' align='Left'></ToolbarItemDirective>
                <ToolbarItemDirective name='Views' align='Right'></ToolbarItemDirective>
                <ToolbarItemDirective type='Separator' align='Right' cssClass='toolbar-post-agenda' />
                <ToolbarItemDirective name='Custom' type='Button'
                  prefixIcon='e-icons e-show-waiting-list' align='Right'
                  showTextOn='Overflow' overflow='Show'
                  id="overview_toolbar_settings_waiting_list"
                  click={this.toggleWaitingListElement} cssClass='toolbar-post-agenda' />
              </ToolbarItemsDirective>
              <Inject services={[TimelineViews, Week, Day, Agenda]} />
            </ScheduleComponent>
            <div className="waiting-list-container">
              <div className="title-container">
                <div className="title-text">Waiting List</div>
              </div>
              <div id="list-container">
                <div className="slot-tabs">
                  <TabComponent ref={this.slotTabRef} id="draggableTab" selecting={this.onTabSelecting}>
                    <TabItemsDirective>
                      <TabItemDirective header={{ text: "All" }} />
                      <TabItemDirective header={{ text: "Breakfast" }} />
                      <TabItemDirective header={{ text: "Lunch" }} />
                      <TabItemDirective header={{ text: "Dinner" }} />
                    </TabItemsDirective>
                  </TabComponent>
                </div>
                <TreeViewComponent
                  ref={this.allWaitingDataTreeViewRef}
                  id="allWaitingDataTreeView"
                  style={{ display: "" }}
                  cssClass='table-reservation-treeview'
                  dragArea=".table-reservation-wrapper .e-content-wrap"
                  nodeTemplate={this.treeTemplate}
                  fields={this.allWaitingDataTreeFields}
                  nodeDragStart={this.onTreeDragStart}
                  nodeDragging={this.onTreeDragging}
                  nodeDragStop={this.onTreeDragStop}
                  allowDragAndDrop={true}
                />
                <TreeViewComponent
                  ref={this.breakfastWaitingDataTreeViewRef}
                  id='breakfastWaitingDataTreeView'
                  style={{ display: "none" }}
                  cssClass='table-reservation-treeview'
                  dragArea=".table-reservation-wrapper .e-content-wrap"
                  nodeTemplate={this.treeTemplate}
                  fields={this.breakfastWaitingDataTreeFields}
                  nodeDragStart={this.onTreeDragStart}
                  nodeDragging={this.onTreeDragging}
                  nodeDragStop={this.onTreeDragStop}
                  allowDragAndDrop={true}
                />
                <TreeViewComponent
                  ref={this.lunchWaitingDataTreeViewRef}
                  id='lunchWaitingDataTreeView'
                  style={{ display: "none" }}
                  cssClass='table-reservation-treeview'
                  dragArea=".table-reservation-wrapper .e-content-wrap"
                  nodeTemplate={this.treeTemplate}
                  fields={this.lunchWaitingDataTreeFields}
                  nodeDragStart={this.onTreeDragStart}
                  nodeDragging={this.onTreeDragging}
                  nodeDragStop={this.onTreeDragStop}
                  allowDragAndDrop={true}
                />
                <TreeViewComponent
                  ref={this.dinnerWaitingDataTreeViewRef}
                  id='dinnerWaitingDataTreeView'
                  style={{ display: "none" }}
                  cssClass='table-reservation-treeview'
                  dragArea=".table-reservation-wrapper .e-content-wrap"
                  nodeTemplate={this.treeTemplate}
                  fields={this.dinnerWaitingDataTreeFields}
                  nodeDragStart={this.onTreeDragStart}
                  nodeDragging={this.onTreeDragging}
                  nodeDragStop={this.onTreeDragStop}
                  allowDragAndDrop={true}
                />
                <div className="no-waiting-list-message hidden">No customers are waiting</div>
              </div>
            </div>
            <div id="target">
              <DialogComponent
                id="modalDialog"
                cssClass='alert-dialog'
                isModal={true}
                buttons={this.alertDialogButtons}
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
            <p>This demo showcases a restaurant table reservation system using the Scheduler component, where tables are organized by categories and meal periods. The system has a drag-and-drop feature for booking table reservations.</p>
          </div>
          <div id="description">
            <p>This example demonstrates how to implement a restaurant table reservation system using the Scheduler component. The application includes the following features:</p>
            <ul>
              <li>Tables organized into categories (Standard, Family, VIP, and Outdoor) with specific seating capacities.</li>
              <li>Meal slots maintained as three distinct periods: breakfast (7 a.m. to 12 p.m.), lunch (12 p.m. to 5 p.m.), and dinner (5 p.m. to 10 p.m.). Reservations are color-coded to differentiate among meal types. Other reservation statuses, such as cancelled, blocked, and not available, are also visually distinguished with different indicators.</li>
              <li>An external waiting list panel that displays customers waiting for tables, categorized by meal period (breakfast, lunch, dinner).</li>
              <li>Drag-and-drop functionality to create table reservations by moving customers from the waiting list to available time slots or the cancelled appointments list.</li>
              <li>Checks for table category compatibility, seating capacity, meal period alignment, and time slot availability while creating reservations for waiting customers.</li>
            </ul>
          </div>
        </div>
      );
    }
  }