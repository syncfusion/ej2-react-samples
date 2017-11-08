import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from './sample-base';


export class RTL extends SampleBase<{}, {}> {

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
        <ListViewComponent id='sample-list' dataSource={this.data} headerTitle='اسم الدولة' enableRtl={true} showHeader={true}></ListViewComponent>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<RTL />, document.getElementById('sample'));