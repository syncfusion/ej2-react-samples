import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent, Position } from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';

export class Default extends SampleBase<{}, {}> {
  private dropElement: HTMLSelectElement;
  private tooltipInstance: TooltipComponent;
  private change(): void {
    this.tooltipInstance.position = this.dropElement.value as Position;
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8' style={{ minHeight: '350px' }}>
            <TooltipComponent ref={t => this.tooltipInstance = t} content='Lets go green & Save Earth !!!' tabIndex={0} style={{ display: 'block', position: 'absolute', left: 'calc( 50% - 60px)', top: '45%' }}>
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
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));