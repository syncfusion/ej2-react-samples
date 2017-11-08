import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
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
        <div id='description'>
          <p>
            FormValidator can be used to validate form input elements with the required validation rules.
    </p>
          <br />
          <p>
            The above form is configured with following rules and also we have given example valid values for each field.
    </p>
          <table style={{ width: '100%' }}>
            <tr>
              <th>Field</th>
              <th>Rule</th>
              <th>Example</th>
            </tr>
            <tr>
              <td>Required</td>
              <td>The field must have any value</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>The input must have email format</td>
              <td>test@syncfusion.com</td>
            </tr>
            <tr>
              <td>URL</td>
              <td>The input must have URL format</td>
              <td>https://www.google.co.in/</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>The input must have javascript date format</td>
              <td>04/13/2017</td>
            </tr>
            <tr>
              <td>Date ISO</td>
              <td>The input must have date ISO format</td>
              <td>2017-04-13</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>The input must have number format. It allows float values.</td>
              <td>1 or 1.4</td>
            </tr>
            <tr>
              <td>Digits</td>
              <td>The input must have digit format</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Max Length</td>
              <td>The input value must have less than 5 characters length</td>
              <td>test</td>
            </tr>
            <tr>
              <td>Min Length</td>
              <td>The input value must have more than 5 characters length</td>
              <td>testing</td>
            </tr>
            <tr>
              <td>Range Length</td>
              <td>The input must have number value from 5 to 10 characters length</td>
              <td>testing</td>
            </tr>
            <tr>
              <td>Max</td>
              <td>The input must have number value less than or equal to 5</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Min</td>
              <td>The input must have number value greater than or equal to 5</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Regex</td>
              <td>You can use regex to validate the input. The input must be alphabets</td>
              <td>abc</td>
            </tr>
            <tr>
              <td>Custom Function</td>
              <td>You can use custom function to validate the input. The input must have less than or equal to 5 character length
            </td>
              <td>test</td>
            </tr>
          </table>
          <br />
          <p>
            You can enter the above values in the corresponding input elements and click the subit button to validate the form. The reset
        button can wipe out all the input values in the form.
    </p>
        </div>
      </div>
    )
  }
}