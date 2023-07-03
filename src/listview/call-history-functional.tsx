/**
 * ListView CallHistory Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TabComponent, SelectEventArgs, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { callHistoryData } from './listData';
import './call-history.css';

const CallHistory = () => {
   useEffect(() => {
       updateSampleSection();
   }, [])

   const [deviceLayout, setDeviceLayout] = useState("layoutWrapper");
   const [visibleLayer, setVisibleLayer] = useState("tabContainer");
   //Map the appropriate columns to fields property
   let fields: Object = { text: 'text', groupBy: 'category' };
   let styleNone = { display: "none" };
   // Set customized list template
   const listTemplate = (data: any) => {
       return (
           <div className="e-list-wrapper e-list-avatar e-list-multi-line">
               <span className="e-avatar e-icon"></span>
               <span className="e-list-item-header">{data.text}</span> <span className={`${data.type} e-list-content`}>{data.group}, {data.time}</span>
           </div>
       );
   }

   let allInstance = useRef<ListViewComponent>(null);
   let receivedInstance = useRef<ListViewComponent>(null);
   let missedInstance = useRef<ListViewComponent>(null);
   let listObjects: any = [];
   let headerText: any = [
       { "text": "All" },
       { "text": "Received" },
       { "text": "Missed" }];
   let type: string[] = ['', 'received', 'missed'];
   // EventHandler to filter data while selecting tab
   const filterData = (dataSource: any, value: any): any => {
       let newData: any = [];
       dataSource.filter((data: any) => {
           if ((data.id).indexOf(value) !== -1) {
               newData.push(data);
           }
       });
       return newData;
   }
   // EventHandler to check the device mode
   const onCreated = () => {
       if (!Browser.isDevice) {
           setDeviceLayout("layoutWrapper e-device-layout");
       } else {
           setVisibleLayer("tabContainer e-visbile-layer");
       }
   }
   // EventHandler to select the tab
   const selectedHanlder = (args: SelectEventArgs) => {
       if (allInstance !== undefined) {
           listObjects = [allInstance, receivedInstance, missedInstance];
           let newData: any;
           newData = filterData(callHistoryData, type[args.selectedIndex]); // Filter the data while selecting tab
           listObjects[args.selectedIndex].dataSource = newData; // Append the filtered data
       }
   }

   return (
       <div className='control-pane'>
           <div className='slider-call-history col-lg-12 control-section'>
               <div className={deviceLayout}>
                   <div className="speaker">
                       <div className="camera"></div>
                   </div>
                   <div className="layout">
                       <div id="list-container">
                           <div className={visibleLayer}>
                               {/* Tab element */}
                               <TabComponent id="tab" selected={selectedHanlder.bind(this)} created={onCreated}>
                                   <TabItemsDirective>
                                       <TabItemDirective header={headerText[0]} content={"#all"} />
                                       <TabItemDirective header={headerText[1]} content={"#received"} />
                                       <TabItemDirective header={headerText[2]} content={"#missed"} />
                                   </TabItemsDirective>
                               </TabComponent>
                           </div>
                           {/* ListView element */}
                           <ListViewComponent id="all" dataSource={callHistoryData} fields={fields} style={styleNone} cssClass='e-list-template' template={listTemplate as any} ref={(listview: any) => { allInstance = listview }} ></ListViewComponent>
                           <ListViewComponent id="received" dataSource={callHistoryData} fields={fields} style={styleNone} cssClass='e-list-template' template={listTemplate as any} ref={(listview: any) => { receivedInstance = listview }}></ListViewComponent>
                           <ListViewComponent id="missed" dataSource={callHistoryData} fields={fields} style={styleNone} cssClass='e-list-template' template={listTemplate as any} ref={(listview: any) => { missedInstance = listview }}></ListViewComponent>
                       </div>
                   </div>
                   <div className="outerButton"></div>
               </div>
           </div>
           <div id="action-description">
               <p>This sample demonstrates the call history application using ListView. Click the checklist to filter the data in contacts list.</p>
           </div>
           <div id="description" className="descriptionLayout">
               <p>
                   This sample filters out the data from ListView based on the data selected from the checklist. Here, ListView utilizes the
                   <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#template'>template</a></code> and 
                   <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#showicon'>showIcon</a></code> properties 
                   to repesent the call history application. The Tab component is used in this sample for navigation purposes. 
               </p>
           </div>
       </div>
   )
}
export default CallHistory;