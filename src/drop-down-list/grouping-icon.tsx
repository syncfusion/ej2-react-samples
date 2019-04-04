/**
 * DropDownList Grouping and Icons Samples
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './icons.css';
import * as data from './dataSource.json';

export class Grouping extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
  private temp:string = 'vegetableData';
  //define the data with category
  private vegetableData: { [key: string]: Object }[] =data[this.temp];
  // map the groupBy field with Category column
  private groupFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
  private tempData:string = 'socialMedia';
  //define the data with icon class
  private socialMediaData: { [key: string]: Object }[] =data[this.tempData];
  // map the iconCss field with Class column
  private iconFields: Object = { text: 'SocialMedia', value: 'Id', iconCss: 'Class' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id='dropIcon'>
          <div className='col-lg-6'>
            <div id="group">
              <h4>Grouping</h4>
              <DropDownListComponent id="vegetables" dataSource={this.vegetableData} fields={this.groupFields} placeholder="Select a vegetable" popupHeight="220px" />
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="icon">
              <h4> Icons</h4>
              <DropDownListComponent id="icons" dataSource={this.socialMediaData} fields={this.iconFields} placeholder="Select a social media" popupHeight="220px" />
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the grouping and icons supports of the DropDownList. Click the DropDownList element and select an item from the categorized list/icons list.</p>
        </div>
        
        <div id="description">
            <p>The DropDownList allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
        
            <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
        
            <p>The 2nd DropDownList is populated with icons that is rendered by mapping the <code>iconCss</code> field.</p>
            <p>More information on the grouping feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/grouping.html" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}