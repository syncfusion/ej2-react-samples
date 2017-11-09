/**
 * AutoComplete Grouping & Icons Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './icons.css';

export class Grouping extends SampleBase<{}, {}> {

  private listObj: AutoCompleteComponent;
  // define the JSON of data
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
  // maps the appropriate column to grouping fields property
  private groupFields: Object = { groupBy: 'Category', value: 'Vegetable' };
  // define the JSON of data
  private socialMediaData: { [key: string]: Object }[] = [
    { Class: 'facebook', SocialMedia: 'Facebook', Id: 'media1' },
    { Class: 'google-plus', SocialMedia: 'Google Plus', Id: 'media2' },
    { Class: 'instagram', SocialMedia: 'Instagram', Id: 'media3' },
    { Class: 'linkedin', SocialMedia: 'LinkedIn', Id: 'media4' },
    { Class: 'skype', SocialMedia: 'Skype', Id: 'media5' },
    { Class: 'tumblr', SocialMedia: 'Tumblr', Id: 'media6' },
    { Class: 'twitter', SocialMedia: 'Twitter', Id: 'media7' },
    { Class: 'vimeo', SocialMedia: 'Vimeo', Id: 'media8' },
    { Class: 'whatsapp', SocialMedia: 'WhatsApp', Id: 'media9' },
    { Class: 'youtube', SocialMedia: 'YouTube', Id: 'media10' }
  ];
  // maps the appropriate column to icons fields property
  private iconFields: Object = { value: 'SocialMedia', iconCss: 'Class' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-6'>
            <div id="group">
              <h4>Grouping</h4>
              <AutoCompleteComponent id="vegetables" dataSource={this.vegetableData} fields={this.groupFields} placeholder="e.g. Cabbage" />
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="icon">
              <h4> Icons</h4>
              <AutoCompleteComponent id="icons" dataSource={this.socialMediaData} fields={this.iconFields} placeholder="e.g. Facebook" />
            </div>
          </div>
        </div>
        <div id="action-description">    
            <p>This sample demonstrates the grouping and icons supports of the AutoComplete. Type a character in the autocomplete element and choose an item from the categorized list/icons list.</p>     
        </div>
        
        <div id="description">
            <p>The AutoComplete allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
        
            <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
        
            <p>The 2nd AutoComplete is populated with icons which is rendered by mapping the <code>iconCss</code> field.</p>
            <p> More information on the grouping feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/auto-complete/grouping.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}