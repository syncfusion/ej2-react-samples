import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './checkbox.css';
import * as data from './dataSource.json';

export class SelectionLimit extends SampleBase<{}, {}> {

  private temp:string = 'countries';
  //define the data with category
  private countries: { [key: string]: Object; }[] = data[this.temp];
  // maps the appropriate column to fields property
  private checkFields: Object = { text: 'Name', value: 'Code' };

  public mulObj: MultiSelectComponent;

  public applyRange(): void {
    let value: number = parseFloat((document.getElementById('length') as HTMLInputElement).value);
    this.mulObj.value = null;
    this.mulObj.maximumSelectionLength = value;
  }

  render() {
    return (
      <div id="multichecbox" className='control-pane'>
        <div className='control-section col-lg-8'>
          <div id="multigroup" className="control-styles">
            <h4>Selection Limit</h4>
            <MultiSelectComponent id="checkbox" cssClass="e-specific" ref={(scope) => { this.mulObj = scope; }} dataSource={this.countries}
              fields={this.checkFields} placeholder="Select countries" mode="CheckBox"
              showDropDownIcon={true} maximumSelectionLength={3} filterBarPlaceholder="Search countries" popupHeight="350px">
              <Inject services={[CheckBoxSelection]} />
            </MultiSelectComponent>
          </div>
        </div>
        <div className='col-lg-4 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                <td>
                  <div>Selection Limit </div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent id='length' format="n0" max={this.countries.length} value={3} min={1}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div>
                    <ButtonComponent id="buttonApply" cssClass='e-btn e-control e-outline' style={{ marginBottom: '10px', marginLeft: '100px' }} onClick={this.applyRange.bind(this)}>Apply</ButtonComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the maximum selection limit functionalities with checkbox of the MultiSelect. MultiSelect value
        can set restrictions based on the maximum selection length that can be selected.</p>
        </div>

        <div id="description">
          <p>The MultiSelect has built-in support to limit the value selected in Multiselect component, when the <code>maximumSelectionLength</code>        property is set as <code>3</code>, maximum of only 3 value will be selected in the MultiSelect.</p>

          <p>The selection limit sample illustrates using the countries data.</p>

        </div>
      </div>
    );
  }
}