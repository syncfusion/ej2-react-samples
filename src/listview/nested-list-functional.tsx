/**
 * ListView Nested Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './listview.css';
import{ nestedListData } from './listData'

const FolderCss = `
.e-listview .e-list-icon,
.e-bigger .e-listview .e-list-icon {
    height: 24px;
    width: 30px;
}
#listview {
    max-width: 500px;
    margin: auto;
    border: 1px solid #dddddd;
    border-radius: 3px;
}
.folder {
    background-repeat: no-repeat;
    background-image: url('./src/listview/images/file_icons.png');
    background-position: -5px -466px;
    background-size: 302%;
}

.file {
    background-repeat: no-repeat;
    background-image: url('./src/listview/images/file_icons.png');
    background-position: -5px -151px;
    background-size: 302%;
}`

const Nested = () => {
   useEffect(() => {
       updateSampleSection();
   }, [])

   //Map appropriate columns to fields property
   let fields: {[key:string]: string} ={
       iconCss: 'icon', tooltip: 'text'
   };

   return (
       <div className='control-pane'>
           <div className='control-section'>
               <style>{FolderCss}</style>
               {/* ListView element */}
               <ListViewComponent id='listview' dataSource={nestedListData} fields={fields} headerTitle='Folders' showIcon={true} showHeader={true} ></ListViewComponent>
           </div>
           <div id="action-description">
               <p>This sample demonstrates the nested list functionalities, which allows you to navigate to the sub list items by clicking any item and navigating back to the list item using the back icon at the top left.</p>
           </div>
           <div id="description">
               <p>The ListView component supports nested list. To achieve list navigation, the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view/fieldSettings/#child'>child</a></code> property should be defined for the nested list in the array of JSON.</p>
               <p>This sample have nested folder with the sub folders or files.</p>
           </div>
       </div>
   )
}
export default Nested;