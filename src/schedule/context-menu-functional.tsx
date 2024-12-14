import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { extend, closest, isNullOrUndefined, remove, removeClass } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, CellClickEventArgs,
  Day, Week, WorkWeek, Month, Agenda, Inject
} from '@syncfusion/ej2-react-schedule';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';
import './context-menu.css';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import { DateTime } from '@syncfusion/ej2-charts';

/**
 * Schedule Context Menu sample
 */
const ContextMenu = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
   
  let scheduleObj = useRef<ScheduleComponent>(null);
  let menuObj = useRef<ContextMenuComponent>(null);
  let eventObj: Record<string, any>;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  let selectedTarget: Element;
  const menuItems: MenuItemModel[] = [
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

  const onMenuItemSelect = (args: MenuEventArgs): void => {
    let selectedMenuItem: string = args.item.id;
    if (selectedTarget.classList.contains('e-appointment')) {
      eventObj = scheduleObj.current.getEventDetails(selectedTarget);
    }
    switch (selectedMenuItem) {
      case 'Today':
        scheduleObj.current.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        let selectedCells: Element[] = scheduleObj.current.getSelectedElements();
        let isRightClickInSelectedCells: boolean = selectedCells.some(cell => cell === selectedTarget);
        let activeCellsData: CellClickEventArgs = scheduleObj.current.getCellDetails(isRightClickInSelectedCells ? selectedCells : [selectedTarget]);
        if (selectedMenuItem === 'Add') {
          scheduleObj.current.openEditor(activeCellsData, 'Add');
        } else {
          scheduleObj.current.openEditor(activeCellsData, 'Add', null, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          eventObj = new DataManager(scheduleObj.current.eventsData).executeLocal(new Query().where(scheduleObj.current.eventFields.id, 'equal', eventObj[scheduleObj.current.eventFields.recurrenceID] as string | number))[0] as Record<string, any>;
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

  const onContextMenuBeforeOpen = (args: BeforeOpenCloseMenuEventArgs): void => {
    let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    scheduleObj.current.closeQuickInfoPopup();
    let targetElement: HTMLElement = args.event.target as HTMLElement;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' + '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (selectedTarget.classList.contains('e-appointment')) {
      eventObj = scheduleObj.current.getEventDetails(selectedTarget) as Record<string, any>;
      if (eventObj.RecurrenceRule) {
        menuObj.current.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        menuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        menuObj.current.showItems(['Save', 'Delete'], true);
        menuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    } else if ((selectedTarget.classList.contains('e-work-cells') || selectedTarget.classList.contains('e-all-day-cells')) &&
      !selectedTarget.classList.contains('e-selected-cell')) {
      removeClass([].slice.call(scheduleObj.current.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
      selectedTarget.setAttribute('aria-selected', 'true');
      selectedTarget.classList.add('e-selected-cell');
    }
    menuObj.current.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    menuObj.current.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }
  return (
    <div className='schedule-control-section'>
      <div className='control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent height='650px' ref={scheduleObj} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }}>
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
      <ContextMenuComponent cssClass='schedule-context-menu' ref={menuObj} target='.e-schedule' items={menuItems} beforeOpen={onContextMenuBeforeOpen} select={onMenuItemSelect} />
      <div id="action-description">
        <p>This example illustrates how to enable the context menu on Scheduler and perform its related actions based on the selected menu options.</p>
      </div>
      <div id="description">
        <p>
          In this example, we have integrated the ContextMenu control separately from application end and set its target
          to Scheduler control. Also, we have used the public methods <code>openEditor</code> through which the default event editor
          is set to open for saving or updating the appointments, <code>deleteEvent</code> to delete the selected appointment, and
          <code>selectedDate</code> to navigate to today's date. In mobile devices, the context menu will open when you tap hold on
          the cells or events.
        </p>
      </div>
    </div>
  );
}
export default ContextMenu;