import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent, BreadcrumbItemsDirective, BreadcrumbItemDirective } from '@syncfusion/ej2-react-navigations';
import { BreadcrumbClickEventArgs, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { ButtonComponent} from '@syncfusion/ej2-react-buttons';
import { getComponent} from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './events.css';

export class Events extends SampleBase<{}, {}> {
  clearLog() {
    document.getElementById('EventLog').innerHTML = '';
  };

  createdHandler(): void {
    this.logEvent('created');
  }

  clickHandler(args: BreadcrumbClickEventArgs): void {
    this.logEvent(args.name);
  }

  beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
    this.logEvent(args.name);
  }

  logEvent(eventName: string): void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = 'Breadcrumb <b>' + eventName  + '</b> event is triggered<hr>';
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  }

  btnClick(): void {
    let breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
    for (let i = 0; i < breadcrumbs.length; i++) {
        breadcrumb = breadcrumbs[i];
        breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as BreadcrumbComponent);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper breadcrumb-control-wrapper">
            <div className="row material2">
              <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <h5 style={{ display: "inline-block" }}>Breadcrumb with Events</h5>
                <ButtonComponent cssClass='e-small reset-btn'
                    onClick={ this.btnClick.bind(this) }>Reset State</ButtonComponent>
              </div>
            </div>
            <div className="row material2">
              <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons">
                <BreadcrumbComponent created={this.createdHandler.bind(this)} itemClick={this.clickHandler.bind(this)} beforeItemRender={this.beforeItemRenderHandler.bind(this)}>
                  <BreadcrumbItemsDirective>
                    <BreadcrumbItemDirective text="Program Files" iconCss="e-bicons e-folder"></BreadcrumbItemDirective>
                    <BreadcrumbItemDirective text="Commom Files" iconCss="e-bicons e-folder"></BreadcrumbItemDirective>
                    <BreadcrumbItemDirective text="Services" iconCss="e-bicons e-folder"></BreadcrumbItemDirective>
                    <BreadcrumbItemDirective text="Config.json" iconCss="e-bicons e-file"></BreadcrumbItemDirective>
                  </BreadcrumbItemsDirective>
                </BreadcrumbComponent>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 property-section">
        <PropertyPane title='Event Trace'>
          <table id="property" title="Event Trace">
            <tr>
              <td>
                <div className="eventarea" style={{ height: "245px", overflow: "auto" }}>
                  <span className="EventLog" id="EventLog" style={{ wordBreak: "normal" }}></span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="evtbtn" style={{ paddingBottom: "10px" }}>
                  <button className="e-btn" onClick={this.clearLog} id="clear">Clear Log</button>
                </div>
              </td>
            </tr>
          </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the events that have been triggered on <code>Breadcrumb</code> actions. The event details are showcased in the event trace panel.</p>
        </div>
        <div id='description'>
          <p>In this demo, <code>Breadcrumb</code> performs following actions which can be traced by event trace panel:</p>
          <ul>
            <li>created - Triggers when the Breadcrumb is created.</li>
            <li>itemClick - Triggers when a Breadcrumb item is clicked.</li>
            <li>beforeItemRender - Triggers while rendering each Breadcrumb item and separator.</li>
          </ul>
          <p>More information about Breadcrumb component can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/">documentation section</a>.</p>
        </div>
      </div>
    );
  }
}