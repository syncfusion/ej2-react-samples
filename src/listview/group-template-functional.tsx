/**
 * ListView GroupTemplate Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './group-template.css';
import { groupDataSource } from './listData';

const GroupTemplate = () => {
   useEffect(() => {
       updateSampleSection();
   }, [])
   //Map the appropriate columns to fields property
   let fields: Object = { text: 'Name', groupBy: 'order' };

   //Set customized list template
   const listTemplate = (data: any) => {
       return(
           <div className="settings e-list-wrapper e-list-multi-line e-list-avatar">
               <span className={`icon ${data.class} e-avatar`}></span>
               <span className="e-list-item-header">{data.Name}</span>
               <span className="e-list-content">{data.content}</span>
           </div>
       );
   }

   //Set customized group-header template
   const groupTemplate = (data: any) => {
       return(
           <div className="e-list-wrapper"><span className="e-list-item-content">{data.items[0].category}</span></div>
       );
   }
   return (
       <div className='control-pane'>
           <div className='control-section'>
               {/* ListView element */}
               <ListViewComponent id='groupedList' dataSource={groupDataSource} headerTitle='Settings' showHeader={true} fields={fields} cssClass="e-list-template" template={listTemplate as any} groupTemplate={groupTemplate as any}></ListViewComponent>
           </div>
           <div id="action-description">
               <p>This sample demonstrates the group template functionalities of ListView. Click any list item from the settings option to select and highlight an option.</p>
           </div>
           <div id="description" className="descriptionLayout">
               <p>The ListView component has an option to custom design the group header title with the help of <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#grouptemplate'>groupTemplate</a></code> property.</p>
               <p>
                   In this example, both the group header and list items are customized using the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#grouptemplate'>groupTemplate</a></code>
                   and <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#template'>template</a></code>
                   property.
               </p>
           </div>
       </div>
   )
}
export default GroupTemplate;