/**
 * ListView Virtualization Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { ListViewComponent, ListView, Inject, Virtualization } from '@syncfusion/ej2-react-lists';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { Browser } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './virtualization.css';

const UiVirtualization = () => {
   useEffect(() => {
       updateSampleSection();
   }, [])

   const [time, setTime] = useState("0 ms");
   const mobile = Browser.isDevice ? "ui-mobile" : "";
   let listviewInstance = useRef<ListViewComponent>(null);
   let commonData: { [key: string]: string | object }[] = [];
   let dataSource: { [key: string]: { [key: string]: string | object }[] } = {};
   let startTime: Date;
   let endTime: Date;
   let liElement: HTMLElement;
   commonData = [
       { name: 'Nancy', icon: 'N', id: '0', },
       { name: 'Andrew', icon: 'A', id: '1' },
       { name: 'Janet', icon: 'J', id: '2' },
       { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3' },
       { name: 'Steven', icon: 'S', id: '4' },
       { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5' },
       { name: 'Robert', icon: 'R', id: '6' },
       { name: 'Michael', icon: 'M', id: '7' },
       { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8' },
       { name: 'Nolan', icon: 'N', id: '9' }
   ];

   [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']].forEach((ds: string[] | number[]) => {
       let data: { [key: string]: string | object }[] = commonData.slice();
       let index: number;
       let spyIndex: number;
       for (let i: number = 10; i <= (ds[0] as number); i++) {
           while (index === spyIndex) {
               index = parseInt((Math.random() * 10).toString(), 10);
           }
           data.push({ name: data[index].name, icon: data[index].icon, imgUrl: data[index].imgUrl, id: i.toString() });
           spyIndex = index;
       }
       dataSource[ds[1]] = data;
   });
   // Set customized list template
    function template(data: any) {
        return (
            <div className="e-list-wrapper e-list-avatar">
                <span className={`e-avatar e-avatar-circle ${data.icon} ${data.imgUrl ? 'hideUI' : 'showUI'}`}>{data.icon}</span>
                <img className={`e-avatar e-avatar-circle ${data.imgUrl ? 'showUI' : 'hideUI'}`} src={data.imgUrl ? data.imgUrl : ' '} />
                <span className="e-list-content">{data.name}</span>
            </div>
        );
    }
   // Set dropdown list data
   let ddlDatasource = [
       { value: '1', text: '1k' },
       { value: '5', text: '5k' },
       { value: '10', text: '10k' },
       { value: '25', text: '25k' }
   ];
   //Map the appropriate columns to DropDownList fields property
   let ddlFields: Object = { text: 'text', value: 'value' };
   //Map the appropriate columns to ListView fields property
   let fields: Object = { text: 'name' };

   const onActionComplete = () => {
       createSpinner({
           target: liElement
       });
       endTime = new Date();
       setTime(endTime.getTime() - startTime.getTime() + " ms");
   }

   const onActionBegin = () => {
       startTime = new Date();
   }

   const onChange = (e: ChangeEventArgs) => {
       showSpinner(liElement);
       startTime = new Date();
       listviewInstance.current.dataSource = dataSource['data' + e.value];
       listviewInstance.current.dataBind();
       endTime = new Date();
       setTime(endTime.getTime() - startTime.getTime() + " ms");
       hideSpinner(liElement);
   }
   return (
       <div className='control-pane'>
           <div className='ui-control-section control-section'>
               <div className='col-lg-8'>
                   <div className="content-wrapper" >
                       {/* ListView element */}
                       <ListViewComponent id='ui-list' className={mobile} dataSource={dataSource.data1} enableVirtualization={true} headerTitle="Contacts" fields={fields} cssClass="e-list-template" height={500} template={template} actionComplete={onActionComplete.bind(this)} ref={listviewInstance} actionBegin={onActionBegin.bind(this)} showHeader={true} >
                           <Inject services={[Virtualization]} />
                       </ListViewComponent>
                   </div>
               </div>
               <div id="#slider_event" className='col-lg-4 property-section'>
                   <PropertyPane title='Properties'>
                       <table id="Properties" title="Tooltip" className='property-panel-table' style={{ width: '100%' }}>
                           <tbody>
                               <tr>
                                   <td style={{ width: '50%' }}>
                                       <div className="userselect">Load data</div>
                                   </td>
                                   <td style={{ width: '50%', paddingRight: '10px' }} >
                                       <div>
                                           {/* DropDownList element */}
                                           <DropDownListComponent id='ddl' dataSource={ddlDatasource} fields={ddlFields} index={0} change={onChange.bind(this)} placeholder="Select a range" popupHeight="200px" />
                                       </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td style={{ width: '50%' }}>
                                       <div className="userselect">Time taken</div>
                                   </td>
                                   <td style={{ width: '50%', paddingRight: '10px' }}>
                                       <div style={{ paddingLeft: '10px' }}>
                                           <span id="time">{time}</span>
                                       </div>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </PropertyPane>
               </div>
           </div>
           <div id="action-description">
               <p>This sample demonstrates the default functionalities of UI virtualization. Scroll list item to experience UI virtualization.</p>
           </div>
           <div id="description">
               <p>
                   UI virtualization is an optimization technique to avoid unnecessarily constructing and rendering objects for list items by loading only visible list items in a view port. This helps improve ListView performance when loading a large number of items. The
                   list items are updated dynamically while users scroll the list. The virtualization can be enabled by using the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#enablevirtualization'>enableVirtualization</a></code> API in Listview.
               </p>
           </div>
       </div>
   )
}
export default UiVirtualization;