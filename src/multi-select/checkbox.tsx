import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import './checkbox.css';

export class CheckBox extends SampleBase<{}, {}> {

  //define the data with category
  private countries: { [key: string]: Object; }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }
  ];
  // maps the appropriate column to fields property
  private checkFields: Object = { text: 'Name', value: 'Code' };

  public checkboxObj: CheckBoxComponent;

  public mulObj: MultiSelectComponent;

  // function to handle the CheckBox change event
  onChange(args: ChangeEventArgs): void {
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    this.mulObj.showSelectAll = args.checked;
  }
  // function to handle the CheckBox change event
  onChangeDrop(args: ChangeEventArgs): void {
    // enable or disable the Dropdown button in multiselect on CheckBox checked state
    this.mulObj.showDropDownIcon = args.checked;
  }
  // function to handle the CheckBox change event
  onChangeLimit(args: ChangeEventArgs): void {
    // enable or disable the selection limit in multiselect on CheckBox checked state
    this.mulObj.enableSelectionOrder = args.checked;
  }

  render() {
    return (
      <div id="multichecbox" className='control-pane'>
        <div className='control-section col-lg-8'>
          <div id="multigroup" className="control-styles">
            <h4>CheckBox</h4>
            <MultiSelectComponent id="checkbox" ref={(scope) => { this.mulObj = scope; }} dataSource={this.countries}
              fields={this.checkFields} placeholder="Select countries" mode="CheckBox" showSelectAll={true}
              showDropDownIcon={true} filterBarPlaceholder="Search countries" popupHeight="350px">
              <Inject services={[CheckBoxSelection]} />
            </MultiSelectComponent>
          </div>
        </div>
        <div className='col-lg-4 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='Show Select All'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChange.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='DropDown Button'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChangeDrop.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='Selection Reorder'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChangeLimit.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the checkbox functionalities of the MultiSelect. Click the MultiSelect element and then type
        a character in the search box. It will display the filtered list items based on the typed characters and then select
        the multiple values through the checkbox.</p>
        </div>

        <div id="description">
          <p>The MultiSelect has built-in support to select the multiple values through checkbox, when the <code>mode</code> property is set
          as <code>CheckBox</code>. To perform the checkbox feature in MultiSelect, the <code>CheckBoxSelection</code> module
        have to be injected in the application end.</p>

          <p>In this sample, the local data is bound to a collection of countries data. Also, provided options for the following:
        <p> To enable/disable <code>Select All</code>feature in the property panel.</p>
            <p> To enable/disable <code>DropDown Button</code>feature in the property panel.</p>
            <p> To enable/disable <code>Selection Reorder</code>feature in the property panel.</p>
          </p>

          <p>The checkbox sample illustrates using the countries data. </p>

        </div>
      </div >
    );
  }
}