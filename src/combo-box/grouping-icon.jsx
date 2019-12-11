import * as React from 'react';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './icons.css';
import * as data from './dataSource.json';
export class Grouping extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'vegetableData';
        //define the data with category
        this.vegetableData = data[this.temp];
        // map the groupBy field with Category column
        this.groupFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
        this.tempData = 'socialMedia';
        //define the data with icon class
        this.socialMediaData = data[this.tempData];
        // map the iconCss field with Class column
        this.iconFields = { text: 'SocialMedia', value: 'Id', iconCss: 'Class' };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section' id='comboIcon'>
          <div className='col-lg-6'>
            <div id="group">
              <h4>Grouping</h4>
              <ComboBoxComponent id="grouping" dataSource={this.vegetableData} fields={this.groupFields} placeholder="Select a vegetable" popupHeight="220px"/>
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="icon">
              <h4> Icons</h4>
              <ComboBoxComponent id="icons" dataSource={this.socialMediaData} fields={this.iconFields} placeholder="Select a social media" popupHeight="220px"/>
            </div>
          </div>
        </div>
        <div id="action-description">    
            <p>This sample demonstrates the grouping and icons supports of the ComboBox. Type a character in the ComboBox element or click on the drodown icon to choose an item from the categorized list/icons list.</p>     
        </div>
        
        <div id="description">
            <p>The ComboBox allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
        
            <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
        
            <p>The 2nd ComboBox is populated with icons that is rendered by mapping the <code>iconCss</code> field.</p>
            <p> More information on the grouping feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/combo-box/grouping.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>);
    }
}
