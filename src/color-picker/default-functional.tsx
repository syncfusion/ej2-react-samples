import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from "react";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div id='default-control'>
          <h4>Choose a color</h4>
          <ColorPickerComponent id='color-picker'></ColorPickerComponent>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the default functionalities of the color picker/palette with default colors and predefined styles.</p>
      </div>
      <div id="description">
        <p>
          The ColorPicker component is a user interface to select and adjust color values. This supports various color specifications like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes.</p>
        <p>
          In this sample, the ColorPicker popup contains picker area, slider to adjust hue and opacity value, input textarea, and control buttons.</p>
          <ul>
            <li>Drag the handle in the picker area to select your favorite color.</li>
            <li>You can manually set the color by typing the color values in the input text boxes.</li>
            <li>By clicking the format switching icon at the right side of the input text area, switch between palette and picker mode.</li>
            <li>By clicking the mode switching icon at the left bottom of the popup, switch between palette and picker mode.</li>
            <li>Using the
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/color-picker/#value"><code>value
              </code></a> property, set the color value to picker and palette initially.
            </li>
          </ul>
          <p>In mobile mode, the popup opens at the center of the viewport.</p>
          <p>
            More information about ColorPicker can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/color-picker/getting-started"> documentation section</a>.</p>
      </div>
    </div>
  )
}
export default Default;
