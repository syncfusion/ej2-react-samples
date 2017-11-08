import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from './sample-base';


export class Grouping extends SampleBase<{}, {}> {

  private listObj: MultiSelectComponent;
   private vegetableData: { [key: string]: Object }[] = [
        { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
        { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item2' },
        { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item3' },
        { Vegetable: 'Green bean', Category: 'Beans', Id: 'item4' },
        { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item5' },
        { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item6' },
        { Vegetable: 'Onion', Category: 'Bulb and Stem', Id: 'item7' },
        { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item8' },
        { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item9' },
        { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item10' },
        { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item11' }
    ];
    private groupFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div id="multigroup" className="control-styles">
              <h4>Grouping</h4>
              <MultiSelectComponent id="grouping" dataSource={this.vegetableData} fields={this.groupFields} placeholder="Select vegetables" />
            </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Grouping />, document.getElementById('sample'));