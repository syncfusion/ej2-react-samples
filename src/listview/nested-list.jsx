/**
 * ListView Nested Sample
 */
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';
import { nestedListData } from './listData';
const FolderCss = `
.e-listview .e-list-icon {
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
}`;
export class Nested extends SampleBase {
    constructor() {
        super(...arguments);
        //Map appropriate columns to fields property
        this.fields = {
            iconCss: 'icon', tooltip: 'text'
        };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <style>
                {FolderCss}
            </style>

        
        <ListViewComponent id='listview' dataSource={nestedListData} fields={this.fields} headerTitle='Folders' showIcon={true} showHeader={true}></ListViewComponent>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the nested list functionalities, which allows to navigate to the sub list-items by click on any item and navigate back to list-item by using top left back icon.
           </p>
        </div>

        <div id="description">
            <p>ListView component supports Nested list. To achieve list navigation, the <code>child</code> property should be defined for the nested list in the array of JSON.</p>

            <p>This sample have Nested folder with the sub folders/files.</p>
        </div>
      </div>);
    }
}
