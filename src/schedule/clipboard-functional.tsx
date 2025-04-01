import * as React from 'react';
import { useRef, useEffect } from 'react';
import { extend, closest, isNullOrUndefined, removeClass, remove } from '@syncfusion/ej2-base';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Resize, DragAndDrop, TimelineViews, TimelineMonth, Inject } from '@syncfusion/ej2-react-schedule';
import { ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-react-navigations';
import * as dataSource from './datasource.json';
import './context-menu.css';
import { updateSampleSection } from '../common/sample-base';

const ClipboardSchedule = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const menuObj = useRef<ContextMenuComponent>(null);
  let selectedTarget: Element;
  let targetElement: HTMLElement;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];

  const menuItems: MenuItemModel[] = [
    { text: 'Cut Event', iconCss: 'e-icons e-cut', id: 'Cut' },
    { text: 'Copy Event', iconCss: 'e-icons e-copy', id: 'Copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste', id: 'Paste' }
  ];

  const onContextMenuBeforeOpen = (args: BeforeOpenCloseMenuEventArgs): void => {
    let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
    }
    scheduleObj.current.closeQuickInfoPopup();
    targetElement = args.event.target as HTMLElement;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (selectedTarget.classList.contains('e-appointment')) {
      menuObj.current.showItems(['Cut', 'Copy'], true);
      menuObj.current.hideItems(['Paste'], true);
    } else {
      menuObj.current.showItems(['Paste'], true);
      menuObj.current.hideItems(['Cut', 'Copy'], true);
    }
  }

  const onMenuItemSelect = (args: MenuEventArgs): void => {
    let selectedMenuItem: string = args.item.id;
    switch (selectedMenuItem) {
      case 'Cut':
        scheduleObj.current.cut([selectedTarget] as HTMLElement[]);
        break;
      case 'Copy':
        scheduleObj.current.copy([selectedTarget] as HTMLElement[]);
        break;
      case 'Paste':
        scheduleObj.current.paste(targetElement);
        break;
    }
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='content-wrapper'>
          <div className='schedule-container'>
            <ScheduleComponent width='100%' height='550px' ref={scheduleObj}
              selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }}
              allowClipboard={true} showQuickInfo={false}>
              <ViewsDirective>
                <ViewDirective option='Week' />
                <ViewDirective option='Day' />
                <ViewDirective option='Month' />
                <ViewDirective option='TimelineDay' />
                <ViewDirective option='TimelineWeek' />
                <ViewDirective option='TimelineWorkWeek' />
                <ViewDirective option='TimelineMonth' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
            </ScheduleComponent>
            <ContextMenuComponent target='.e-schedule' items={menuItems}
              beforeOpen={onContextMenuBeforeOpen} select={onMenuItemSelect}
              cssClass='schedule-context-menu' ref={menuObj} />
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This example demonstrates how to integrate clipboard functionality (cut, copy, paste) and a custom context menu into the Scheduler control.</p>
      </div>

      <div id="description">
        <p>In this example, the <code>allowClipboard</code> property is set to <code>true</code> to enable clipboard functionality. This property allows the following keyboard shortcuts:</p>
        <ul>
            <li><strong>Ctrl + X:</strong> To cut the selected appointment from the scheduler.</li>
            <li><strong>Ctrl + C:</strong> To copy the selected appointment.</li>
            <li><strong>Ctrl + V:</strong> To paste the cut/copied appointment.</li>
        </ul>
        <p>Additionally, we have integrated the ContextMenu control separately from the application end and set its target to the Scheduler control. Also, we have used the following Scheduler's public methods in the context menu handlers:</p>
        <ul>
            <li><strong>cut()</strong> method to remove the selected appointment.</li>
            <li><strong>copy()</strong> method to duplicate the selected appointment.</li>
            <li><strong>paste()</strong> method to insert the appointment into the target time slot.</li>
        </ul>
        <p>On mobile devices, the context menu will open when you tap and hold on the cells or events.</p>
      </div>
    </div>
  );
}

export default ClipboardSchedule;
