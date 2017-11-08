import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { SampleBase } from './sample-base';


export class CheckBox extends SampleBase<{}, {}> {
  public checkboxObj: CheckBoxComponent;

  // function to handle the CheckBox change event
   onChange(args: ChangeEventArgs): void {
        this.checkboxObj.label = 'CheckBox: ' + args.checked;
    }
  render() {
    return (
      <div className = 'control-pane'>
        <div className='control-section'>
            <div className='checkbox-control'>
                <div className='row'>
                    <CheckBoxComponent checked={true} label='CheckBox: true' ref={(scope) => { this.checkboxObj = scope; }} change={ this.onChange.bind(this) } ></CheckBoxComponent>
                </div>
                <div className='row'>
                    <CheckBoxComponent label='Checked, Disabled' disabled={true} checked={true} ></CheckBoxComponent>
                </div>
                <div className='row'>
                    <CheckBoxComponent label='Indeterminate, Disabled' indeterminate={true} disabled={true}></CheckBoxComponent>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

ReactDOM.render(<CheckBox />, document.getElementById('sample'));