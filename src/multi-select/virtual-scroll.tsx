/**
 * MultiSelect Virtualization Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiSelectComponent, Inject, VirtualScroll, DropDownListComponent, visualMode, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import './virtual-scroll.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {

  public localObj: MultiSelectComponent;
  public remoteObj: MultiSelectComponent;
  public databindObj: MultiSelectComponent;
  public groupObj: MultiSelectComponent;
  public templateObj: MultiSelectComponent;
  public checkboxObj: CheckBoxComponent;

  // define the array of string
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
  // bind the DataManager instance to dataSource property
  public customerData: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/react/production/api/orders',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  // maps the appropriate column to fields property
  public fields: { [key: string]: string } = { text: 'text', value: 'id' };
  public customerField: { [key: string]: string } = { text: 'OrderID', value: 'OrderID' };
  public groupField: { [key: string]: string } = { groupBy: 'group', text: 'text', value: 'id' };
  private value =  ['id10', 'id50', 'id100', "custom"];
  private headerTemplate(data: any): JSX.Element {
    return (
      <div className="header"><span style={{ marginLeft: '17px' }}>Items Info</span></div>
    );
  }
  //set the value to item template
  private itemTemplate(data: any): JSX.Element {
    return (
      <div className="ename" style={{ height: '40px' }}> {data.text} </div>
    );
  }
  //set the value to value template
  private valueTemplate(data: any): JSX.Element {
    return (
      <div className="name"> {data.text} </div>
    );
  }

  onChange(args: ChangeEventArgs): void {
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    this.localObj.allowFiltering = args.checked;
    this.remoteObj.allowFiltering = args.checked;
    this.databindObj.allowFiltering = args.checked;
    this.groupObj.allowFiltering = args.checked;
    this.templateObj.allowFiltering = args.checked;
  }

  onChangeHide(args: ChangeEventArgs): void {
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    this.localObj.hideSelectedItem = args.checked;
    this.remoteObj.hideSelectedItem = args.checked;
    this.databindObj.hideSelectedItem = args.checked;
    this.groupObj.hideSelectedItem = args.checked;
    this.templateObj.hideSelectedItem = args.checked;
  }

  onChangeClose(args: ChangeEventArgs): void {
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    this.localObj.closePopupOnSelect = args.checked;
    this.remoteObj.closePopupOnSelect = args.checked;
    this.databindObj.closePopupOnSelect = args.checked;
    this.groupObj.closePopupOnSelect = args.checked;
    this.templateObj.closePopupOnSelect = args.checked;
  }

  onChangeCustom(args: ChangeEventArgs): void {
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    this.localObj.allowCustomValue = args.checked;
    this.remoteObj.allowCustomValue = args.checked;
    this.databindObj.allowCustomValue = args.checked;
    this.templateObj.allowCustomValue = args.checked;
  }

  // call the change event's function after initialized the component.
  public rendereComplete(): void {
  }

  render() {
    return (
      <div >
        <div className="control-section col-lg-8">
          <div className="multi-control-wrapper">
            <h4>Local Data</h4>
            <MultiSelectComponent id="local" ref={(scope) => { this.localObj = scope; }} dataSource={this.records} placeholder="e.g. Item 1" mode="Box" allowFiltering={true} enableVirtualization={true} allowCustomValue={true} showDropDownIcon={true} hideSelectedItem={true} closePopupOnSelect={true} fields={this.fields} popupHeight="200px" >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Remote Data</h4>
            <MultiSelectComponent id="remote" ref={(scope) => { this.remoteObj = scope; }} dataSource={this.customerData} placeholder="e.g. OrderID" mode="Delimiter" allowFiltering={true} enableVirtualization={true} allowCustomValue={true} showDropDownIcon={true} hideSelectedItem={true} closePopupOnSelect={true} fields={this.customerField} popupHeight="200px" >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Default Values</h4>
            <MultiSelectComponent id="databind" ref={(scope) => { this.databindObj = scope; }} dataSource={this.records} placeholder="e.g. Item 1" value={this.value} mode="Default" allowFiltering={true} enableVirtualization={true} allowCustomValue={true} showDropDownIcon={true} hideSelectedItem={true} closePopupOnSelect={true} fields={this.fields} popupHeight="200px" >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Grouping</h4>
            <MultiSelectComponent id="group" ref={(scope) => { this.groupObj = scope; }} dataSource={this.records} placeholder="e.g. Item 1" mode="CheckBox" allowFiltering={true} enableVirtualization={true} enableSelectionOrder={false} allowCustomValue={true} showDropDownIcon={true} hideSelectedItem={true} closePopupOnSelect={true} fields={this.groupField} popupHeight="200px" >
              <Inject services={[VirtualScroll, CheckBoxSelection]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Template</h4>
            <MultiSelectComponent id="Template" ref={(scope) => { this.templateObj = scope; }} dataSource={this.records} placeholder="e.g. Item 1" mode="Default" allowFiltering={true} enableVirtualization={true} allowCustomValue={true} showDropDownIcon={true} hideSelectedItem={true} closePopupOnSelect={true} fields={this.fields} popupHeight="200px" itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} headerTemplate={this.headerTemplate} >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
        </div>
        <div className='col-lg-4 property-section' style={{ left: '0px', width: '250px' }}>
          <PropertyPane title='Properties'>
            <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='AllowFiltering'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChange.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='AllowCustomValue'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChangeCustom.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='HideSelectedItem'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChangeHide.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='ClosePopupOnSelect'
                      ref={(scope) => { this.checkboxObj = scope; }} change={this.onChangeClose.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This example demonstrates the virtualization support of the MultiSelect. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.</p>
        </div>
        <div id="description">
          <p>The <code>MultiSelect</code> component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the <code>enableVirtualization</code> property to true. When virtualization is enabled, MultiSelect doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling.
            Virtualization works with both local and remote data.</p>
          <p>To perform the virtualization feature in the MultiSelect, the <code>VirtualScroll</code> module has to be injected at the application level.</p>
        </div>
      </div>
    );
  }
}
