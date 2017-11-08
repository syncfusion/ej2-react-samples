/**
 * ListView RTL Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';

export class RTL extends SampleBase<{}, {}> {

  //Define an array of JSON data
  public data: {[key:string]: string}[] = [
    { text: 'الجیریا', id: 'list-01'},
    { text: 'ارمینیا', id: 'list-02'},
    { text: 'بنگلا دیش', id: 'list-03'},
    { text: 'کیوبا', id: 'list-04'},
    { text: 'فن لینڈ', id: 'list-05'},
    { text: 'بھارت', id: 'list-06'},
    { text: 'مصر', id: 'list-07'},
    { text: 'ڈنمارک', id: 'list-08'},
    { text: 'ملائیشیا', id: 'list-09'},
    { text: 'نیوزی لینڈ', id: 'list-10'},
    { text: 'ناروے', id: 'list-11'}
];

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>

        {/* ListView element */}
        <ListViewComponent id='sample-list' dataSource={this.data} headerTitle='اسم الدولة' enableRtl={true} showHeader={true}></ListViewComponent>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the RTL functionalities of the ListView. Click any list item to select and highlight an item.</p>
        </div>

        <div id="description">
          <p>This sample is rendered with Arabic language, and written from right to left. To enable this RTL support in ListView set <code>enableRTL</code> property as <code>true</code>.</p>
        </div>
      </div>
    )
  }
}