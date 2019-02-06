/**
 * Tooltip default sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent, Position } from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

interface tooltipComponentProps {
  position : string;
}
interface tooltipComponentState {
  position : string;
}
export class Default extends SampleBase<tooltipComponentProps, tooltipComponentState> {
  
  constructor(props) { 
    super(props);
    this.state = { position: 'TopCenter'};
    }
  //Handle tooltip position based on drop-down value change
  private change(args): void {
    this.setState({
      position : args.currentTarget.value as Position
    });
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8' style={{ minHeight: '350px' }}>

            {/* Tooltip element */}
            <TooltipComponent content='Lets go green & Save Earth !!!' position={this.state.position} tabIndex={0} style={{ display: 'block', position: 'absolute', left: 'calc( 50% - 60px)', top: '45%' }}>

              {/* Button element */}
              <ButtonComponent tabIndex={-1}>Show Tooltip</ButtonComponent>
            </TooltipComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                <td style={{ width: '30%', paddingTop: '4px'  }}>
                <div>Position</div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <select id='ddl' name='ddl' onChange={this.change.bind(this)} className='form-control' style={{ padding: '6px' }} >
                        <option value="TopLeft">Top Left</option>
                        <option value="TopCenter" selected>Top Center</option>
                        <option value="TopRight">Top Right</option>
                        <option value="BottomLeft">Bottom Left</option>
                        <option value="BottomCenter">Bottom Center</option>
                        <option value="BottomRight">Bottom Right</option>
                        <option value="LeftTop">Left Top</option>
                        <option value="LeftCenter">Left Center</option>
                        <option value="LeftBottom">Left Bottom</option>
                        <option value="RightTop">Right Top</option>
                        <option value="RightCenter">Right Center</option>
                        <option value="RightBottom">Right Bottom</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the Tooltip which will open by Hover or Touch-hold action on button and displayed in 12 different positions.</p>
        </div>

        <div id="description">
          <p>
            This sample illustrates a tooltip, that gets opened on hovering the target labelled “Show Tooltip”. The tooltip can be shown
        on 12 possible positions, by selecting the appropriate position values provided in the dropdown. The applicable tooltip
        positions are as follows:
          </p>
          <ul>
            <li><code>TopLeft</code></li>
            <li><code>TopCenter</code></li>
            <li><code>TopRight</code></li>
            <li><code>BottomLeft</code></li>
            <li><code>BottomCenter</code></li>
            <li><code>BottomRight</code></li>
            <li><code>LeftTop</code></li>
            <li><code>LeftCenter</code></li>
            <li><code>LeftBottom</code></li>
            <li><code>RightTop</code></li>
            <li><code>RightCenter</code></li>
            <li><code>RightBottom</code></li>
          </ul>
          <p>In case, if the tooltip needs to be opened on mobile devices, tap hold on the target labelled “Show Tooltip” instead of hovering
        and by default, it closes after 1.5 seconds on lift.</p>
          <p>More information on the Tooltip instantiation can be found in the
        <a href="http://ej2.syncfusion.com/react/documentation/tooltip/getting-started.html" target="_blank"> documentation section</a>.
        </p>
        </div>
      </div>
    )
  }
}