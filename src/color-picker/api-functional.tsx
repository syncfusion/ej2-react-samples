import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { ColorPickerComponent, ColorPickerMode, ColorPickerEventArgs } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, ChangeEventArgs as DdlChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import './api.css';

interface ApiSample {
  colorValue: string
  mode: ColorPickerMode;
  disabled: boolean;
  showButtons: boolean;
  modeSwitcher: boolean;
}

const Api = () => {
  useEffect(() => {
    hexInput.current.value = state.colorValue;
    updateSampleSection();
  }, [])
  const [state, setState] = useState<ApiSample>({
    colorValue: "#0db1e7",
    mode: "Picker",
    disabled: false,
    showButtons: true,
    modeSwitcher: true,
  });
  let hexInput = useRef<HTMLInputElement>(null);
  let type: { [key: string]: Object }[] = [{ mode: 'Picker' }, { mode: 'Palette' }];
  let ddlFields: object = { text: 'mode', value: 'mode' };
  const onDdlChange = (args: DdlChangeEventArgs): void => {
    setState({ ...state, mode: args.value as ColorPickerMode });
  }
  const onDisableChange = (args: ChangeEventArgs): void => {
    setState({ ...state, disabled: args.checked });
  }
  const onButtonChange = (args: ChangeEventArgs): void => {
    setState({ ...state, showButtons: args.checked });
  }
  const onModeChange = (args: ChangeEventArgs): void => {
    setState({ ...state, modeSwitcher: args.checked });
  }
  const changeValue = (e: Event): void => {
    const val: string = (e.target as HTMLInputElement).value;
    // Sets to color picker default color value if user types the invalid hex code.
    setState({ ...state, colorValue: val && val.length > 2 ? (val[0] !== '#' ? `#${val}` : val) : '#008000' });
  }
  const onChange = (args: ColorPickerEventArgs): void => {
    hexInput.current.value = args.currentValue.hex;
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div id='api-control' className='col-lg-8'>
          <h4>Choose a color</h4>
          <ColorPickerComponent id='color-picker' mode={state.mode as ColorPickerMode} disabled={state.disabled} showButtons={state.showButtons} value={state.colorValue} modeSwitcher={state.modeSwitcher} change={onChange}></ColorPickerComponent>
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
                      <input id="hex-input" aria-label="Value" ref={hexInput} type="text" className="e-input" maxLength={9} onInput={changeValue.bind(hexInput)} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%' }}>
                    <div>Mode</div>
                  </td>
                  <td style={{ width: '50%', paddingRight: '0px' }}>
                    <div style={{ maxWidth: '200px' }}>
                      <DropDownListComponent id="ddlelement" dataSource={type} fields={ddlFields} value='Picker' change={onDdlChange} popupHeight="220px" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%', paddingTop: '13px' }}>
                    <div>Disable</div>
                  </td>
                  <td style={{ width: '50%', paddingRight: '0px', paddingTop: '13px' }}>
                    <CheckBoxComponent id="disabled" aria-label="Disable" checked={false} change={onDisableChange} />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%', paddingTop: '15px' }}>
                    <div>Show Buttons</div>
                  </td>
                  <td style={{ width: '50%', paddingRight: '0px', paddingTop: '15px' }}>
                    <CheckBoxComponent id="button" aria-label="Show Buttons" checked={true} change={onButtonChange} />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%', paddingTop: '15px', paddingBottom: '10px' }}>
                    <div>Mode Switcher</div>
                  </td>
                  <td style={{ width: '50%', paddingRight: '0px', paddingTop: '15px', paddingBottom: '10px' }}>
                    <CheckBoxComponent id="mode-switch" aria-label="Mode Switcher" checked={true} change={onModeChange} />
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
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/color-picker/">documentation section</a>.</p>
      </div>
    </div >
  )
}
export default Api;
