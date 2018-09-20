import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './local-data.css';
const SAMPLE_CSS = `
.control-section {
    overflow: auto;
}`;

export class LocalData extends SampleBase<{}, {}> {
// Hierarchical data source for TreeView component
public continents: { [key: string]: Object; }[] = [
    {
        code: 'NA', name: 'North America', expanded: true, countries: [
            { code: 'USA', name: 'United States of America', selected: true },
            { code: 'CUB', name: 'Cuba' },
            { code: 'MEX', name: 'Mexico' }
        ]
    },
    {
        code: 'AF', name: 'Africa', countries: [
            { code: 'NGA', name: 'Nigeria' },
            { code: 'EGY', name: 'Egypt' },
            { code: 'ZAF', name: 'South Africa' }
        ]
    },
    {
        code: 'AS', name: 'Asia', countries: [
            { code: 'CHN', name: 'China' },
            { code: 'IND', name: 'India' },
            { code: 'JPN', name: 'Japan' }
        ]
    },
    {
        code: 'EU', name: 'Europe', countries: [
            { code: 'DNK', name: 'Denmark' },
            { code: 'FIN', name: 'Finland' },
            { code: 'AUT', name: 'Austria' }
        ]
    },
    {
        code: 'SA', name: 'South America', countries: [
            { code: 'BRA', name: 'Brazil' },
            { code: 'COL', name: 'Colombia' },
            { code: 'ARG', name: 'Argentina' }
        ]
    },
    {
        code: 'OC', name: 'Oceania', countries: [
            { code: 'AUS', name: 'Australia' },
            { code: 'NZL', name: 'New Zealand' },
            { code: 'WSM', name: 'Samoa' }
        ]
    },
    {
        code: 'AN', name: 'Antarctica', countries: [
            { code: 'BVT', name: 'Bouvet Island' },
            { code: 'ATF', name: 'French Southern Lands' }
        ]
    },
];
private fields: object = { dataSource: this.continents, id: 'code', text: 'name', child: 'countries' };

// Self-referential list data source for TreeView component
public localData: { [key: string]: Object }[] = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles', selected: true },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' },
    { id: 11, name: 'Categories', hasChild: true },
    { id: 12, pid: 11, name: 'Songs' },
    { id: 13, pid: 11, name: 'Bestselling Albums' },
    { id: 14, pid: 11, name: 'New Releases' },
    { id: 15, pid: 11, name: 'Bestselling Songs' },
    { id: 16, name: 'MP3 Albums', hasChild: true },
    { id: 17, pid: 16, name: 'Rock' },
    { id: 18, pid: 16, name: 'Gospel' },
    { id: 19, pid: 16, name: 'Latin Music' },
    { id: 20, pid: 16, name: 'Jazz' },
    { id: 21, name: 'More in Music', hasChild: true },
    { id: 22, pid: 21, name: 'Music Trade-In' },
    { id: 23, pid: 21, name: 'Redeem a Gift Card' },
    { id: 24, pid: 21, name: 'Band T-Shirts' },
    { id: 25, name: 'Fiction Book Lists', hasChild: true },
    { id: 26, pid: 25, name: 'To Kill a Mockingbird' },
    { id: 27, pid: 25, name: 'Pride and Prejudice' },
    { id: 28, pid: 25, name: 'Harry Potter' },
    { id: 29, pid: 25, name: 'The Hobbit' },
];
private listfields: object = { dataSource: this.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild'};

  render() {
    return (       
      <div className = 'control-pane'>
        <style>
            {SAMPLE_CSS}
        </style>
        <div className='control-section'>
          <div className='col-lg-6 nested-data'>
            <div className='content'>
              <h4>Hierarchical Data</h4>
              <TreeViewComponent id='tree' fields={this.fields} />
            </div>
          </div>
          <div className='col-lg-6 list-data'>
            <div className='content'>
              <h4>List Data</h4>
              <TreeViewComponent id='listtree' fields={this.listfields} />
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the binding of local data to the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it.</p>
        </div>
        <div id="description">
            <p>The TreeView component loads the data through the <code>dataSource</code> property, where the data can be either local data or remote data. In case of local data, the data structure can be hierarchical data or list data (with self-referential format i.e., mapped with the <b>id</b> and <b>parentID</b> fields).</p>
            <p>In this demo, the first TreeView is bound with the hierarchical data that contains array of nested objects. And the second TreeView is bound with the list type data where the parent-child relation is referred by the <b>id</b> and <b>parentID</b> mapping fields.</p>
            <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/data-binding.html" target="_blank">Data Binding</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}
