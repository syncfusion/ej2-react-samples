/**
 * ListView Nested Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';

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
}`
export class Nested extends SampleBase<{}, {}> {

    //Define an array of JSON data
    private dataSource: { [key: string]: Object }[] = [
        {
            id: '01', text: 'Music', icon: 'folder',
            child: [
                { id: '01-01', text: 'Gouttes.mp3', icon: 'file' }
            ]
        },
        {
            id: '02', text: 'Videos', icon: 'folder',
            child: [
                { id: '02-01', text: 'Naturals.mp4', icon: 'file' },
                { id: '02-02', text: 'Wild.mpeg', icon: 'file' },
            ]
        },
        {
            id: '03', text: 'Documents', icon: 'folder',
            child: [
                { id: '03-01', text: 'Environment Pollution.docx', icon: 'file' },
                { id: '03-02', text: 'Global Water, Sanitation, & Hygiene.docx', icon: 'file' },
                { id: '03-03', text: 'Global Warming.ppt', icon: 'file' },
                { id: '03-04', text: 'Social Network.pdf', icon: 'file' },
                { id: '03-05', text: 'Youth Empowerment.pdf', icon: 'file' },
            ]
        },
        {
            id: '04', text: 'Pictures', icon: 'folder',
            child: [
                {
                    id: '04-01', text: 'Camera Roll', icon: 'folder',
                    child: [
                        { id: '04-01-01', text: 'WIN_20160726_094117.JPG', icon: 'file' },
                        { id: '04-01-02', text: 'WIN_20160726_094118.JPG', icon: 'file' },
                        { id: '04-01-03', text: 'WIN_20160726_094119.JPG', icon: 'file' }
                    ]
                },
                {
                    id: '04-02', text: 'Wind.jpg', icon: 'file'
                },
                {
                    id: '04-02', text: 'Stone.jpg', icon: 'file'
                },
                {
                    id: '04-02', text: 'Home.jpg', icon: 'file'
                },
                {
                    id: '04-02', text: 'Bridge.png', icon: 'file'
                }
            ]
        },
        {
            id: '05', text: 'Downloads', icon: 'folder',
            child: [
                { id: '05-01', text: 'UI-Guide.pdf', icon: 'file' },
                { id: '05-02', text: 'Tutorials.zip', icon: 'file' },
                { id: '05-03', text: 'Game.exe', icon: 'file' },
                { id: '05-04', text: 'TypeScript.7z', icon: 'file' },
            ]
        },
    ];

    //Map appropriate columns to fields property
    private fields: {[key:string]: string} ={
        iconCss: 'icon', tooltip: 'text'
    };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <style>
                {FolderCss}
            </style>

        {/* ListView element */}
        <ListViewComponent id='listview' dataSource={this.dataSource} fields={this.fields} headerTitle='Folders' showIcon={true} showHeader={true} ></ListViewComponent>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the nested list functionalities, which allows to navigate to the sub list-items by click on any item and navigate back to list-item by using top left back icon.
           </p>
        </div>

        <div id="description">
            <p>ListView component supports Nested list. To achieve list navigation, the <code>child</code> property should be defined for the nested list in the array of JSON.</p>

            <p>This sample have Nested folder with the sub folders/files.</p>
        </div>
      </div>
    )
  }
}