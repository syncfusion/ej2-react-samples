import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';

const slidercss = `  
.content-wrapper {
  width: 40%;
  margin: 0 auto;
  min-width: 185px;
}

.e-bigger .content-wrapper {
  width: 80%;
}

.sliderwrap label {
  padding-bottom: 26px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 15px;
}

.userselect {
  -webkit-user-select: none;
  /* Safari 3.1+ */
  -moz-user-select: none;
  /* Firefox 2+ */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Standard syntax */
}
`
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper">
            <style>{slidercss}</style>
            <div className='sliderwrap'>
              <label className='labeltext'>Default Slider</label>
              {/* Initialize Slider component */}
              <SliderComponent value={30} />
            </div>
            <div className='sliderwrap'>
              <label className='labeltext'>MinRange Slider</label>
              {/* Set the type to render MinRange slider */}
              <SliderComponent value={30} type='MinRange' />
            </div>
            <div className='sliderwrap'>
              <label className='labeltext'>Range Slider</label>
              {/* Set the initial range values for slider */}
              <SliderComponent value={[30, 70]} type='Range' />
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the default rendering of Slider component. Drag the thumb over the bar for selecting the values
            between min and max.
          </p>
        </div>
        <div id="description">
          <p>The Slider component allows the user to select a value or range of values in-between a min and max range, by dragging the thumb over the slider bar. There are three types of sliders available:</p>
          <ul>
            <li>Default - allows us to select a single value</li>
            <li>MinRange – allows us to select a single value, but highlights with a range selection from the min value to the current handle value</li>
            <li>Range – allows us to select a range of values with two handles, where the handles was connected with a range selection</li>
            <p>In this demo we can see the Default, MinRange and Range slider types.</p>
            <p>
              More information on the Slider instantiation can be found in this
                <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/range-slider/getting-started.html">
                documentation section</a>
            </p>
          </ul>
        </div>
      </div>
    )
}
export default Default;