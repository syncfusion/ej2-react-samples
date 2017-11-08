/**
 * Tooltip default sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent, Position } from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class Default extends SampleBase<{}, {}> {
  private dropElement: HTMLSelectElement;
  private tooltipInstance: TooltipComponent;

  //Handle tooltip position based on drop-down value change
  private change(): void {
    this.tooltipInstance.position = this.dropElement.value as Position;
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8' style={{ minHeight: '350px' }}>

            {/* Tooltip element */}
            <TooltipComponent ref={t => this.tooltipInstance = t} content='Lets go green & Save Earth !!!' tabIndex={0} style={{ display: 'block', position: 'absolute', left: 'calc( 50% - 60px)', top: '45%' }}>

              {/* Button element */}
              <ButtonComponent tabIndex={-1}>Show Tooltip</ButtonComponent>
            </TooltipComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Position</div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <select id='ddl' name='ddl' onChange={this.change.bind(this)} className='form-control' style={{ padding: '6px' }} ref={d => this.dropElement = d}>
                        <option value="top left">Top Left</option>
                        <option value="top center" selected>Top Center</option>
                        <option value="top right">Top Right</option>
                        <option value="bottom left">Bottom Left</option>
                        <option value="bottom center">Bottom Center</option>
                        <option value="bottom right">Bottom Right</option>
                        <option value="left top">Left Top</option>
                        <option value="left center">Left Center</option>
                        <option value="left bottom">Left Bottom</option>
                        <option value="right top">Right Top</option>
                        <option value="right center">Right Center</option>
                        <option value="right bottom">Right Bottom</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the Tooltip. Hover the button to open the tooltip. For Mobile devices, touch and hold the button to open the tooltip. Change the position of the tooltip by choosing 12 different position.</p>
        </div>

        <div id="description">
          <p>
            This sample illustrates a tooltip, that gets opened on hovering the target labelled “Show Tooltip”. The tooltip can be shown
        on 12 possible positions, by selecting the appropriate position values provided in the dropdown. The applicable tooltip
        positions are as follows:
          </p>
          <ul>
            <li><code>top left</code></li>
            <li><code>top center</code></li>
            <li><code>top right</code></li>
            <li><code>bottom left</code></li>
            <li><code>bottom center</code></li>
            <li><code>bottom right</code></li>
            <li><code>left top</code></li>
            <li><code>left center</code></li>
            <li><code>left bottom</code></li>
            <li><code>right top</code></li>
            <li><code>right center</code></li>
            <li><code>right bottom</code></li>
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