import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './style.css';

export class Grouping extends SampleBase<{}, {}> {

  private listObj: MultiSelectComponent;
  //define the data with category
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
    // map the groupBy field with category column
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
        <div id="action-description">
            <p>This sample demonstrates the grouping functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the categorized list.</p>
        </div>
        
        <div id="description">
            <p>The MultiSelect allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
        
            <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
        
            <p>More information on the grouping feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/multi-select/grouping.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}