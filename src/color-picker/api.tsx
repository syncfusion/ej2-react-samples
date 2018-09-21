import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ColorPickerComponent, ColorPickerMode, Input, ColorPickerEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import './api.css';

export class Api extends SampleBase<{}, {}> {
  private defaultObj: ColorPickerComponent;

  private listObj: DropDownListComponent;

  private type: { [key: string]: Object }[] = [
    { mode: 'Picker' },
    { mode: 'Palette' }
  ];

  private ddlFields: object = { text: 'mode', value: 'mode' };

  public onDdlChange(args: ChangeEventArgs): void {
    this.defaultObj.mode = this.listObj.value as ColorPickerMode;
  }

  public onDisableChange(args: ChangeEventArgs): void {
    this.defaultObj.disabled = args.checked;
  }

  public onButtonChange(args: any): void {
    this.defaultObj.showButtons = args.checked;
  }

  public onModeChange(args: any): void {
    this.defaultObj.modeSwitcher = args.checked;
  }

  public changeValue(e: Event): void {
    this.defaultObj.value = (e.target as HTMLInputElement).value;
  }

  public onChange(args: ColorPickerEventArgs): void {
    (document.getElementById('hex-input') as HTMLInputElement).value = args.currentValue.hex;
  }

  public rendereComplete(): void {
    /**custom render complete function */
    let ele: HTMLInputElement = (document.getElementById('hex-input') as HTMLInputElement);
    ele.value = '#0db1e7';
    Input.createInput({ element: ele });
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='api-control' className='col-lg-8'>
            <h4>Choose a color</h4>
            <ColorPickerComponent id='color-picker' value='#0db1e7' ref={(scope) => { this.defaultObj = scope; }} change={this.onChange.bind(this)} ></ColorPickerComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div>Value</div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '0px' }}>
                      <div style={{ maxWidth: '200px' }}>
                        <input id="hex-input" type="text" onChange={this.changeValue.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div>Mode</div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '0px' }}>
                      <div style={{ maxWidth: '200px' }}>
                        <DropDownListComponent id="ddlelement" dataSource={this.type} ref={(dropdownlist) => { this.listObj = dropdownlist }} fields={this.ddlFields} value='Picker' change={this.onDdlChange.bind(this)} popupHeight="220px" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%', paddingTop: '13px' }}>
                      <div>Disable</div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '0px', paddingTop: '13px' }}>
                      <CheckBoxComponent id="disabled" checked={false} change={this.onDisableChange.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%', paddingTop: '15px' }}>
                      <div>Show Buttons</div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '0px', paddingTop: '15px' }}>
                      <CheckBoxComponent id="button" checked={true} change={this.onButtonChange.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%', paddingTop: '15px', paddingBottom: '10px' }}>
                      <div>Mode Switcher</div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '0px', paddingTop: '15px', paddingBottom: '10px' }}>
                      <CheckBoxComponent id="mode-switch" checked={true} change={this.onModeChange.bind(this)} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>

        <div id='action-description'>
        <p>This sample demonstrates customization of the ColorPicker component by using its properties from the property pane. Select
        any combination of properties from the property pane to customize the ColorPicker component.</p>
        </div>

        <div id='description'>
          <p>
            The ColorPicker is a user interface to select and adjust color values. This supports various color specifications like RGB
            (Red Green Blue), HSV (Hue Saturation Value), and Hex codes.</p>
          <p>In this sample, ColorPicker is rendered with default configuration.</p>
          <p>This sample can be customized further with the combination of ColorPicker properties from the property pane. For example,</p>
          <ul>
            <li>Control (apply/cancel) buttons can be enabled or disabled using
            <i>Show Buttons</i> checkbox from the property pane.</li>
            <li>You can select the color by entering the color value in the property pane
            <i>Value</i> textbox.</li>
            <li>You can switch to 'Picker' and 'Palette' modes by clicking and selecting the mode from
            <i>Select Mode</i> dropdownlist.</li>
            <li>you can enable or disable the ColorPicker using
            <i>Disabled</i> checkbox from property pane.</li>
            <li>you can enable or disable the mode switcher using
            <i>Mode Switcher</i> checkbox from property pane.</li>
          </ul>
          <p>
            More information about ColorPicker can be found in this
            <a target="_blank" href="http://ej2.syncfusion.com/documentation/colorpicker/getting-started.html">
              documentation section</a>.</p>
        </div>
      </div >
    )
  }
}
