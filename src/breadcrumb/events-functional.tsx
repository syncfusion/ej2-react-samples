import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { BreadcrumbComponent, BreadcrumbItemsDirective, BreadcrumbItemDirective } from '@syncfusion/ej2-react-navigations';
import { BreadcrumbClickEventArgs, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { getComponent, createElement } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './events.css';

const Events = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const [eventLog, setEventLog] = useState('');
  let breadObj = useRef<BreadcrumbComponent>(null);
  const eventObj = useRef(null);
  const clearLog = () => {
    setEventLog('');
  };

  const createdHandler = (): void => {
    logEvent('created');
  }

  const clickHandler = (args: BreadcrumbClickEventArgs): void => {
    logEvent(args.name);
  }

  const beforeItemRenderHandler = (args: BreadcrumbBeforeItemRenderEventArgs): void => {
    logEvent(args.name);
  }

  const logEvent = (eventName: string) => {
    setEventLog(prevLog => `Breadcrumb <b>${eventName}</b> event is triggered<hr>${prevLog}`);
  }

  const btnClick = (): void => {
    let breadcrumbInst, breadcrumb = breadObj.current.element;
    breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as BreadcrumbComponent);
    breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
  }
  useEffect(() => {
    const eventEle = eventObj.current;
    eventEle.innerHTML = eventLog;
  }, [eventLog])

  return (
    <div className='control-pane'>
      <div className="col-lg-8 control-section">
        <div className="content-wrapper breadcrumb-control-wrapper">
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5 style={{ display: "inline-block" }}>Breadcrumb with Events</h5>
              <ButtonComponent cssClass='e-small reset-btn' onClick={btnClick}>Reset State</ButtonComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons">
              <BreadcrumbComponent created={createdHandler} itemClick={clickHandler} ref={breadObj} beforeItemRender={beforeItemRenderHandler}>
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
                <div className="eventarea" ref={eventObj} style={{ height: "245px", overflow: "auto" }}>
                  <span className="EventLog" id="EventLog" style={{ wordBreak: "normal" }} dangerouslySetInnerHTML={{ __html: eventLog }}></span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="evtbtn" style={{ paddingBottom: "10px" }}>
                  <button className="e-btn" onClick={clearLog} id="clear">Clear Log</button>
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
export default Events;