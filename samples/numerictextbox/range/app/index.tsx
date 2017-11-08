/**
 * Min-Max Range NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';


export class Range extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className=' col-lg-8'>
            <div className="content-wrapper format-wrapper sample-numeric">
              <div className="control-label">Numeric TextBox
              </div>
              {/* Render numeric textbox with restriction in entering values */}
              <NumericTextBoxComponent min={10} max={100} value={15} ref={numeric => this.numericInstance = numeric} >
              </NumericTextBoxComponent>
            </div>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Min Value </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <input id="min" type="number" inputMode="numeric" className="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Max Value </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <input id="max" type="number" inputMode="numeric" className="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Increment Step </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <input id="step" type="number" inputMode="numeric" max={100} min={0} className="form-control" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div>
                      <button id="buttonApply" className="e-btn-small btn btn-primary" style={{ marginBottom: '10px' }} onClick={this.applyRange.bind(this)}>Apply</button>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        
      </div >
    )
  }
  private numericInstance: NumericTextBoxComponent;

  public rendereComplete(): void {
    /**custom render complete function */
    (document.getElementById('min') as HTMLInputElement).value = '10';
    (document.getElementById('max') as HTMLInputElement).value = '100';
    (document.getElementById('step') as HTMLInputElement).value = '1';
  }

  public applyRange(): void {
    let min: number = parseFloat((document.getElementById('min') as HTMLInputElement).value);
    let max: number = parseFloat((document.getElementById('max') as HTMLInputElement).value);
    let step: number = parseFloat((document.getElementById('step') as HTMLInputElement).value);

    this.numericInstance.min = min;
    this.numericInstance.max = max;
    this.numericInstance.step = step;
  }
}
ReactDOM.render(<Range />, document.getElementById('sample'));