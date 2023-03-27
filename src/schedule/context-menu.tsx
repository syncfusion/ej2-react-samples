import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend, closest, isNullOrUndefined, remove, removeClass } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, CellClickEventArgs,
  Day, Week, WorkWeek, Month, Agenda, Inject
} from '@syncfusion/ej2-react-schedule';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';
import './context-menu.css';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule Context Menu sample
 */

export class ContextMenu extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private menuObj: ContextMenuComponent;
  private eventObj: Record<string, any>;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  private selectedTarget: Element;
  private menuItems: MenuItemModel[] = [
    { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
    { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
    { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
    { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
    {
      text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit', items: [
        { text: 'Edit Occurrence', id: 'EditOccurrence' },
        { text: 'Edit Series', id: 'EditSeries' }
      ]
    },
    { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
    {
      text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash', items: [
        { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
        { text: 'Delete Series', id: 'DeleteSeries' }
      ]
    }
  ];

  private onMenuItemSelect(args: MenuEventArgs): void {
    let selectedMenuItem: string = args.item.id;
    if (this.selectedTarget.classList.contains('e-appointment')) {
      this.eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
    }
    switch (selectedMenuItem) {
      case 'Today':
        this.scheduleObj.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        let selectedCells: Element[] = this.scheduleObj.getSelectedElements();
        let activeCellsData: CellClickEventArgs =
          this.scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget);
        if (selectedMenuItem === 'Add') {
          this.scheduleObj.openEditor(activeCellsData, 'Add');
        } else {
          this.scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          this.eventObj = new DataManager(this.scheduleObj.eventsData).executeLocal(new Query().where(this.scheduleObj.eventFields.id,
            'equal', this.eventObj[this.scheduleObj.eventFields.recurrenceID] as string | number))[0] as Record<string, any>;
        }
        this.scheduleObj.openEditor(this.eventObj, selectedMenuItem);
        break;
      case 'Delete':
        this.scheduleObj.deleteEvent(this.eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        this.scheduleObj.deleteEvent(this.eventObj, selectedMenuItem);
        break;
    }
  }

  private onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    this.scheduleObj.closeQuickInfoPopup();
    let targetElement: HTMLElement = args.event.target as HTMLElement;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (this.selectedTarget.classList.contains('e-appointment')) {
      this.eventObj = this.scheduleObj.getEventDetails(this.selectedTarget) as Record<string, any>;
      if (this.eventObj.RecurrenceRule) {
        this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        this.menuObj.showItems(['Save', 'Delete'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    } else if ((this.selectedTarget.classList.contains('e-work-cells') || this.selectedTarget.classList.contains('e-all-day-cells')) &&
      !this.selectedTarget.classList.contains('e-selected-cell')) {
      removeClass([].slice.call(this.scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
      this.selectedTarget.setAttribute('aria-selected', 'true');
      this.selectedTarget.classList.add('e-selected-cell');
    }
    this.menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='650px' ref={t => this.scheduleObj = t} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: this.data }}>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Month' />
                <ViewDirective option='Agenda' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
        <ContextMenuComponent cssClass='schedule-context-menu' ref={menu => this.menuObj = menu} target='.e-schedule' items={this.menuItems} beforeOpen={this.onContextMenuBeforeOpen.bind(this)} select={this.onMenuItemSelect.bind(this)} />
        <div id="action-description">
          <p>This example illustrates how to enable the context menu on Scheduler and perform its related actions based on the selected menu options.</p>
        </div>
        <div id="description">
          <p>
            In this example, we have integrated the ContextMenu control separately from application end and set its target
            to Scheduler control. Also, we have used the public methods <code>openEditor</code> through which the default event editor
            is set to open for saving or updating the appointments, <code>deleteEvent</code> to delete the selected appointment, and
            <code>selectedDate</code> to navigate to today's date. In mobile devices, the context menu will open when you tap hold on
            the cells or events.</p>
        </div>
      </div>
    );
  }
}