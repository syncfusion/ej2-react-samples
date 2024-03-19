/**
 * DropDownList Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent, Inject, VirtualScroll, DropDownListComponent, visualMode, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import './virtual-scroll.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // define the array of string
    let records: { [key: string]: Object }[] = [];
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
        records.push(item);
    }
    const headerTemplate = useCallback(() => {
        return (
            <div className="header"><span style={{ marginLeft: '17px' }}>Items Info</span></div>
        );
    }, []);
    //set the value to item template
    const itemTemplate = useCallback((data: any) => {
        return (
            <div className="ename" style={{ height: '40px' }}> {data.text} </div>
        );
    }, []);
    //set the value to value template
    const valueTemplate = useCallback((data: any) => {
        return (
            <div className="name"> {data.text} </div>
        );
    }, []);
    
    const [allowFiltering, setAllowFiltering] = useState<boolean>(true);
    const [allowCustomValue, setAllowCustomValue] = useState<boolean>(true);
    const [hideSelectedItem, setHideSelectedItem] = useState<boolean>(true);
    const [closePopupOnSelect, setClosePopupOnSelect] = useState<boolean>(true);
    // bind the DataManager instance to dataSource property
    const customerData: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/react/production/api/orders',
        adaptor: new WebApiAdaptor ,
        crossDomain: true
    });
    const onChange = (args: ChangeEventArgs) => {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setAllowFiltering(args.checked);
    }
    const onChangeHide = (args: ChangeEventArgs) => {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setHideSelectedItem(args.checked);
    }
    const onChangeClose = (args: ChangeEventArgs) => {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setClosePopupOnSelect(args.checked);
    }
    const onChangeCustom = (args: ChangeEventArgs) => {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setAllowCustomValue(args.checked);
    }
    
    // maps the appropriate column to fields property
    const fields: { [key: string]: string } = { text: 'text', value: 'id' };
    const value =  ["20003", "10025", "10044", "custom"];
    const customerField: { [key: string]: string } = { text: 'OrderID', value: 'OrderID' };
    const groupField: { [key: string]: string } = {  groupBy: 'group', text: 'text', value: 'id' };
    return (
        <div id="dropdowndefault" className='control-pane'>
        <div className="control-section col-lg-8">
          <div className="multi-control-wrapper">
            <h4>Local Data</h4>
            <MultiSelectComponent id="local" dataSource={records} placeholder="e.g. Item 1" mode="Box" allowFiltering={allowFiltering} enableVirtualization={true} allowCustomValue={allowCustomValue} showDropDownIcon={true} hideSelectedItem={hideSelectedItem} closePopupOnSelect={closePopupOnSelect} fields={fields} popupHeight="200px" >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Remote Data</h4>
            <MultiSelectComponent id="remote" dataSource={customerData} placeholder="e.g. OrderID" mode="Delimiter" allowFiltering={allowFiltering} enableVirtualization={true} allowCustomValue={allowCustomValue} showDropDownIcon={true} hideSelectedItem={hideSelectedItem} closePopupOnSelect={closePopupOnSelect} fields={customerField} popupHeight="200px" >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Default Values</h4>
            <MultiSelectComponent id="databind" value={value} dataSource={customerData} placeholder="e.g. OrderID" mode="Default" allowFiltering={allowFiltering} enableVirtualization={true} allowCustomValue={allowCustomValue} showDropDownIcon={true} hideSelectedItem={hideSelectedItem} closePopupOnSelect={closePopupOnSelect} fields={customerField} popupHeight="200px" >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Grouping</h4>
            <MultiSelectComponent id="group" dataSource={records} placeholder="e.g. Item 1" mode="CheckBox" allowFiltering={allowFiltering} enableSelectionOrder={false} enableVirtualization={true} allowCustomValue={allowCustomValue} showDropDownIcon={true} fields={groupField} popupHeight="200px" >
              <Inject services={[VirtualScroll, CheckBoxSelection]} />
            </MultiSelectComponent>
          </div>
          <div className="multi-control-wrapper">
            <h4>Template</h4>
            <MultiSelectComponent id="Template" dataSource={records} placeholder="e.g. Item 1" mode="Default" allowFiltering={allowFiltering} enableVirtualization={true} allowCustomValue={allowCustomValue} showDropDownIcon={true} hideSelectedItem={hideSelectedItem} closePopupOnSelect={closePopupOnSelect} fields={fields} popupHeight="200px" itemTemplate={itemTemplate} valueTemplate={valueTemplate} headerTemplate={headerTemplate} >
              <Inject services={[VirtualScroll]} />
            </MultiSelectComponent>
          </div>
        </div>
        <div className='col-lg-4 property-section'  style={{ left: '0px' , width: '250px' }}>
          <PropertyPane title='Properties'>
            <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='AllowFiltering'
                      change={onChange.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='AllowCustomValue'
                      change={onChangeCustom.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='HideSelectedItem'
                      change={onChangeHide.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <CheckBoxComponent checked={true} label='ClosePopupOnSelect'
                      change={onChangeClose.bind(this)} ></CheckBoxComponent>
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
export default Default;