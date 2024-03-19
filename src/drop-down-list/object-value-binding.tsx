/**
 * DropDownList Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {

  private listObj: DropDownListComponent;
  private records: { [key: string]: Object }[] = [];
  constructor(props: {}) {
    super(props);
    for (let i = 1; i <= 150; i++) {
      let item: { [key: string]: Object } = {};
      item.id = 'id' + i;
      item.text = `Item ${i}`;

      // Generate a random number between 1 and 4 to determine the group
      const randomGroup = Math.floor(Math.random() * 4) + 1;
      switch (randomGroup) {
        case 1:
          item.group = 'Group A';
          break;
        case 2:
          item.group = 'Group B';
          break;
        case 3:
          item.group = 'Group C';
          break;
        case 4:
          item.group = 'Group D';
          break;
        default:
          break;
      }
      this.records.push(item);
    }
  }
  public onChange(args: any): void {
    let value: Element = document.getElementById('value');
    // update the text and value property values in property panel based on selected item in DropDownList
    value.innerHTML = "Selected value : " + JSON.stringify(args.value);
  }

  // maps the appropriate column to fields property
  public fields: { [key: string]: string } = { text: 'text', value: 'id' };  

  render() {
    return (
      <div >
        <div className="col-lg-8 control-section">
          <div className="control-wrapper">
            <div id="default" style={{ paddingTop: '75px' }}>
              <DropDownListComponent id="games" dataSource={this.records} ref={(dropdownlist) => { this.listObj = dropdownlist }} allowObjectBinding={true} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select a Item" popupHeight="220px" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 property-section">
          <textarea id="value" title="Properties" style={{ width: '100%', marginTop: '90px', height: '60px' }} readOnly >Selected value : </textarea>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the object value binding functionalities of the DropDownList. Click the DropDownList
            element and select an item from the <code>options</code> list.The corresponding object value of the selected
            item is then assigned to the value property.</p>
          In the property panel, the <code>value</code> property of the selected item's will be displayed.
        </div>
        <div id="description">
        <p>The <code>DropDownList</code> component allows users to select single value from a predefined list. 
          Upon selection, the associated object value is automatically assigned 
          to the <code>value</code> property, enabled by the <code>allowObjectBinding</code> feature.</p>
        </div>
      </div>
    );
  }
}
