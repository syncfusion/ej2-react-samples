/**
 * Dropdown Tree Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as dataSource from './default-data.json';

export class Default extends SampleBase<{}, {}> {
  data = dataSource as any;
  private ddTree: DropDownTreeComponent;
  private fields: object = { dataSource: this.data.defaultData, value: 'id', text: 'name', child: 'subChild' };

  public onChange(): void {
    let value: Element = document.getElementById('value');
    let text: Element = document.getElementById('text');
    // update the text and value property values in property panel based on selected item in Dropdown Tree
    value.innerHTML = this.ddTree.value && this.ddTree.value.length > 0 ? this.ddTree.value[0] : '';
    text.innerHTML = this.ddTree.text;
  }
  // call the change event's function after initialized the component.
  public rendereComplete(): void {
    this.onChange();
  }

  render() {
    return (
      <div className='control-pane dropdowntree-default'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <div id="default">
              <DropDownTreeComponent ref={(dropdowntree) => { this.ddTree = dropdowntree }} fields={this.fields} change={this.onChange.bind(this)} changeOnBlur={false} placeholder="Select a folder or file" popupHeight="200px" />
            </div>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '25%' }}>Value</td>
                    <td>:<span id='value' style={{ paddingLeft: '10px' }}></span></td>
                  </tr>
                  <tr>
                    <td style={{ width: '25%' }}>Text</td>
                    <td>:<span id='text' style={{ paddingLeft: '10px' }}></span></td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample explains you about the default functionalities of the Dropdown Tree component.
            Click the Dropdown Tree element, and then select an item from the hierarchical structure <code>options</code>
            list.
            The selected item's <code>value</code> and <code>text</code> property values will be shown in the property
            panel.</p>
        </div>

        <div id="description">
          <p>The <code>Dropdown Tree</code> component contains a hierarchical structure list of pre-defined values from that
            the user can choose a single value.</p>
          <p>The default sample explains you about the use of Dropdown Tree that allows the end-users to select an item from the hierarchical structure <code>options</code> list. The selected item's <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#value">value</a> and
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#text">text</a> property values will be displayed in the property panel.
          </p>
        </div>
      </div>
    );
  }
}