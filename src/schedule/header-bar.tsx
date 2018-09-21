import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Month, Inject,
  ActionEventArgs, ToolbarActionArgs, EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';
import './header-bar.css';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-react-navigations';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 *  Schedule header customization sample
 */

export class HeaderBar extends SampleBase<{}, {}> {
  public scheduleObj: ScheduleComponent;
  private checkboxObj: CheckBoxComponent;
  private profilePopup: Popup;
  private data: Object[] = extend([], employeeEventData, null, true) as Object[];

  private onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      let userIconItem: ItemModel = {
        align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon'
      };
      args.items.push(userIconItem);
    }
  }
  private onActionComplete(args: ActionEventArgs): void {
    let scheduleElement: HTMLInputElement = document.getElementById('schedule') as HTMLInputElement;
    if (args.requestType === 'toolBarItemRendered') {
      let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
      userIconEle.onclick = () => {
        this.profilePopup.relateTo = userIconEle;
        this.profilePopup.dataBind();
        if (this.profilePopup.element.classList.contains('e-popup-close')) {
          this.profilePopup.show();
        } else {
          this.profilePopup.hide();
        }
      };
    }
    let userContentEle: HTMLElement = createElement('div', {
      className: 'e-profile-wrapper'
    });
    scheduleElement.parentElement.appendChild(userContentEle);

    let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
    let getDOMString: (data: object) => HTMLCollection = compile('<div class="profile-container"><div class="profile-image">' +
      '</div><div class="content-wrap"><div class="resource-name">Nancy</div>' +
      '<div class="destination">Product Manager</div><div class="status">' +
      '<div class="status-icon"></div>Online</div></div></div>');
    let output: HTMLCollection = getDOMString({});
    this.profilePopup = new Popup(userContentEle, {
      content: output[0] as HTMLElement,
      relateTo: userIconEle,
      position: { X: 'left', Y: 'bottom' },
      collision: { X: 'flip', Y: 'flip' },
      targetType: 'relative',
      viewPortElement: scheduleElement,
      width: 185,
      height: 80
    });
    this.profilePopup.hide();
  }
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  // function to handle the CheckBox change event
  private onChange(args: ChangeEventArgs): void {
    this.profilePopup.hide();
    this.scheduleObj.showHeaderBar = args.checked;
    this.scheduleObj.dataBind();
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-header-bar' width='100%' height='650px' id='schedule' ref={t => this.scheduleObj = t}
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}
              actionBegin={this.onActionBegin.bind(this)} actionComplete={this.onActionComplete.bind(this)}
              eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Month, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '90%' }}>
                    <div className='headerbar'>
                      <CheckBoxComponent id='headerbar' checked={true} label='Show/Hide Header bar' ref={(scope) => {
                        this.checkboxObj = scope;
                      }} change={this.onChange.bind(this)} ></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo shows the way of adding custom items into the Schedule header bar. Here, an employee image is added to the
          header bar, clicking on which will open the popup showing that person's short profile information.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, a popup has been designed separately with a person’s profile info and kept in a hidden state initially. A custom
          item has been added to the Schedule header bar within the <code>actionBegin</code> event by checking for the request type as
        <code>toolbarItemRendering</code> which triggers at the time of header bar items rendering on the Schedule.
          </p>
          <p>
            Once the items are added,
            the click action is being bound to it in the <code>actionComplete</code> event by checking for
            the request type as <code>toolbarItemRendered</code> which triggers after the items are rendered on the Schedule.
            The appropriate action of showing or hiding the popup on clicking the custom item has been done within it.
          </p>
          <p>
            In case, if the header bar of Schedule needs to be hidden,
            it can be done by setting false to <code>showHeaderBar</code> property.
          </p>
        </div>
      </div>
    );
  }
}