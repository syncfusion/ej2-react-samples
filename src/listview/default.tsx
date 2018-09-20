/**
 * ListView Default Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';

export class Default extends SampleBase<{}, {}> {

    //Define an array of JSON data
    public data: { [key: string]: Object }[] = [
        { text: 'Hennessey Venom', id: 'list-01' },
        { text: 'Bugatti Chiron', id: 'list-02' },
        { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
        { text: 'SSC Ultimate Aero', id: 'list-04' },
        { text: 'Koenigsegg CCR', id: 'list-05' },
        { text: 'McLaren F1', id: 'list-06' },
        { text: 'Aston Martin One- 77', id: 'list-07' },
        { text: 'Jaguar XJ220', id: 'list-08' },
        { text: 'McLaren P1', id: 'list-09' },
        { text: 'Ferrari LaFerrari', id: 'list-10' },
    ];

    //Define an array of JSON data
    public groupData: { [key: string]: Object }[] = [
        {
            'text': 'Audi A4',
            'id': '9bdb',
            'category': 'Audi'
        },
        {
            'text': 'Audi A5',
            'id': '4589',
            'category': 'Audi'
        },
        {
            'text': 'Audi A6',
            'id': 'e807',
            'category': 'Audi'
        },
        {
            'text': 'Audi A7',
            'id': 'a0cc',
            'category': 'Audi'
        },
        {
            'text': 'Audi A8',
            'id': '5e26',
            'category': 'Audi'
        },
        {
            'text': 'BMW 501',
            'id': 'f849',
            'category': 'BMW'
        },
        {
            'text': 'BMW 502',
            'id': '7aff',
            'category': 'BMW'
        },
        {
            'text': 'BMW 503',
            'id': 'b1da',
            'category': 'BMW'
        },
        {
            'text': 'BMW 507',
            'id': 'de2f',
            'category': 'BMW'
        },
        {
            'text': 'BMW 3200',
            'id': 'b2b1',
            'category': 'BMW'
        }
    ];

    //Map the appropriate columns to fields property
    public fields: Object = { groupBy: 'category' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div id="flat-list">
                <h4>Flat List</h4>

                {/* ListView element */}
                <ListViewComponent id="sample-list-flat" dataSource={this.data}></ListViewComponent>
            </div>
            <div id="group-list">
                <h4>Group List</h4>

                {/* Group ListView element */}
                <ListViewComponent id="sample-list-group" dataSource={this.groupData} fields={this.fields}></ListViewComponent>
            </div>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the default functionalities of the ListView. Click any list item to select and highlight an item.</p>
        </div>

        <div id="description" className="descriptionLayout">
            <p>ListView component represent data in interactive hierarchical structure interface across different layouts or views, that also has the features of data-binding, template rendering, and grouping.</p>

            <p>The group list allows to group the relevant items under a logical category by mapping the <code>groupBy</code> field.</p>

            <p>In this sample, <b>Cars</b> are grouped based on their <b>category</b>.</p>
        </div>
      </div>
    )
  }
}