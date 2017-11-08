import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from './sample-base';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
export class Default extends SampleBase<{}, {}>{

  public formValidator: FormValidatorModel;

  public rendereComplete(): void {
    let customFunction: (args: Object) => boolean = (args: {}) => {
      return (args as { value: string[] }).value.length <= 5;
    };
    this.formValidator = {
      rules: {
        Required: { required: true },
        Email: { required: true, email: true },
        Url: { url: true },
        Date: { date: true },
        DateISO: { dateIso: true },
        Number: { number: true },
        Digits: { digits: true },
        MaxLength: { maxLength: 5 },
        MinLength: { minLength: 5 },
        RangeLength: { rangeLength: [5, 10] },
        Range: { range: [5, 10] },
        Max: { max: 5 },
        Min: { min: 5 },
        Regex: { regex: ['^[A-z]+$', 'Allowed only alphabets'] },
        Custom: { custom: [customFunction, 'Allowed char length is 5'] }
      },
      customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
        inputElement.parentElement.appendChild(errorElement);
      },
    };

    let formObj: FormValidator;
    formObj = new FormValidator('#htmlFormId', this.formValidator);
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='content-wrapper' style={{ marginBottom: '25px' }}>
            <form id='htmlFormId' className='htmlForm-horizontal'>
              <div className='e-float-input'>
                <input type='text' id='required' name='Required' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='required'>Required</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='email' name='Email' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='email'>Email</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='url' name='Url' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='url'>URL</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='date' name='Date' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='date'>Date</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='dateIso' name='DateISO' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='dateIso'>Date ISO (YYYY-MM-DD)</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='number' name='Number' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='number'>Integer or Decimal</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='digits' name='Digits' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='digits'>Positive Integer</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='maxlen' name='MaxLength' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='maxlen'>Maximum 5 characters</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='minlen' name='MinLength' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='minlen'>Minimum 5 characters</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='rangelen' name='RangeLength' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='rangelen'>Characters length between 5 to 10</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='range' name='Range' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='range'>Value between 5 to 10</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='max' name='Max' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='max'>Max (maximum value 5)</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='min' name='Min' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='min'>Min (minimum value 5)</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='regex' name='Regex' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='regex'>Regex (accepts alphabets only)</label>
              </div>
              <div className='e-float-input'>
                <input type='text' id='custom' name='Custom' required />
                <span className='e-float-line'></span>
                <label className='e-float-text' htmlFor='custom'>Custom Function (maximum 5 characters)</label>
              </div>
              <div className='row'>
                <div style={{ float: 'left', margin: '0 10% 0 30%' }}>
                  <button id='validateSubmit' className='e-btn' style={{ height: '35px' }} type='submit'>Submit</button>
                </div>
                <div>
                  <button id='resetbtn' className='e-btn' style={{ height: '35px' }} type='reset'>Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));