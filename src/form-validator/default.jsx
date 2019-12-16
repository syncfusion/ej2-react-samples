import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FormValidator } from '@syncfusion/ej2-inputs';
export class Default extends SampleBase {
    rendereComplete() {
        // Initialize the custom function
        let customFunction = (args) => {
            return args.value.length <= 5;
        };
        this.formValidator = {
            // Defines the validation rules
            rules: {
                Required: { required: true },
                Email: { required: true, email: true },
                Url: { required: true, url: true },
                Date: { required: true, date: true },
                DateISO: { required: true, dateIso: true },
                Number: { required: true, number: true },
                Digits: { required: true, digits: true },
                MaxLength: { required: true, maxLength: 5 },
                MinLength: { required: true, minLength: 5 },
                RangeLength: { required: true, rangeLength: [5, 10] },
                Range: { required: true, range: [5, 10] },
                Max: { required: true, max: 5 },
                Min: { required: true, min: 5 },
                Regex: { required: true, regex: ['^[A-z]+$', 'Allowed only alphabets'] },
                Custom: { required: true, custom: [customFunction, 'Allowed char length is 5'] }
            },
            // Initialize the custom placement
            customPlacement: (inputElement, errorElement) => {
                inputElement.parentElement.appendChild(errorElement);
            },
        };
        // Initialize the form-validator
        let formObj;
        formObj = new FormValidator('#htmlFormId', this.formValidator);
    }
    render() {
        return (<div className='control-pane'>
        <div className='col-lg-12 control-section'>
          <div className='content-wrapper' style={{ marginBottom: '25px' }}>
            <form id='htmlFormId' className='htmlForm-horizontal'>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='required' name='Required' required data-msg-containerid='requiredError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='required'>Required</label>
                </div>
                <div id='requiredError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='email' name='Email' required data-msg-containerid='emailError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='email'>Email</label>
                </div>
                <div id='emailError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='url' name='Url' required data-msg-containerid='urlError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='url'>URL</label>
                </div>
                <div id='urlError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='date' name='Date' required data-msg-containerid='dateError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='date'>Date</label>
                </div>
                <div id='dateError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='dateIso' name='DateISO' required data-msg-containerid='dateisoError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='dateIso'>Date ISO (YYYY-MM-DD)</label>
                </div>
                <div id='dateisoError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='number' name='Number' required data-msg-containerid='numberError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='number'>Integer or Decimal</label>
                </div>
                <div id='numberError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='digits' name='Digits' required data-msg-containerid='digitError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='digits'>Positive Integer</label>
                </div>
                <div id='digitError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='maxlen' name='MaxLength' required data-msg-containerid='maxlenError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='maxlen'>Maximum 5 characters</label>
                </div>
                <div id='maxlenError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='minlen' name='MinLength' required data-msg-containerid='minlenError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='minlen'>Minimum 5 characters</label>
                </div>
                <div id='minlenError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='rangelen' name='RangeLength' required data-msg-containerid='rangelenError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='rangelen'>Characters length between 5 to 10</label>
                </div>
                <div id='rangelenError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='range' name='Range' required data-msg-containerid='rangeError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='range'>Value between 5 to 10</label>
                </div>
                <div id='rangeError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='max' name='Max' required data-msg-containerid='maxError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='max'>Max (maximum value 5)</label>
                </div>
                <div id='maxError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='min' name='Min' required data-msg-containerid='minError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='min'>Min (minimum value 5)</label>
                </div>
                <div id='minError'></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='regex' name='Regex' required data-msg-containerid='regexError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='regex'>Regex (accepts alphabets only)</label>
                </div>
                <div id="regexError"></div>
              </div>
              <div className='form-group'>
                <div className='e-float-input'>
                  <input type='text' id='custom' name='Custom' required data-msg-containerid='customError'/>
                  <span className='e-float-line'></span>
                  <label className='e-float-text' htmlFor='custom'>Custom Function (maximum 5 characters)</label>
                </div>
                <div id='customError'></div>
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
        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the FormValidator. Type a values or characters in the input element.
            If the input values are correct format then the given input will be ready to submit otherwise error message will
            be shown until entering the input as correct format.
          </p>
        </div>
        <div id='description'>
          <div className="description-header">Description</div>
          <p>
            Form Validator can be used to validate the form input elements with the required validation rules.
      </p>
          <p>
            The above form is configured with the following rules and also, we have given the examples of valid values for each field.
      </p>
          <table style={{ width: '100%' }}>
            <tr>
              <th>Field</th>
              <th>Rule</th>
              <th>Example</th>
            </tr>
            <tr>
              <td>Required</td>
              <td>The field must have any value.</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>The input must have email format.</td>
              <td>info@syncfusion.com</td>
            </tr>
            <tr>
              <td>URL</td>
              <td>The input must have URL format.</td>
              <td>https://www.syncfusion.com/</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>The input must have JavaScript date format.</td>
              <td>04/13/2017</td>
            </tr>
            <tr>
              <td>Date ISO</td>
              <td>The input must have date ISO format.</td>
              <td>2017-04-13</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>The input must have number format. It allows float values.</td>
              <td>1 or 1.4</td>
            </tr>
            <tr>
              <td>Digits</td>
              <td>The input must have digit format.</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Max Length</td>
              <td>The input value must have less than 5 characters length.</td>
              <td>world</td>
            </tr>
            <tr>
              <td>Min Length</td>
              <td>The input value must have more than 5 characters length.</td>
              <td>syncfusion</td>
            </tr>
            <tr>
              <td>Range Length</td>
              <td>The input must have number value from 5 to 10 characters length.</td>
              <td>syncfusion</td>
            </tr>
            <tr>
              <td>Max</td>
              <td>The input must have number value less than or equal to 5.</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Min</td>
              <td>The input must have number value greater than or equal to 5.</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Regex</td>
              <td>You can use regex to validate the input. The input must be alphabets only.</td>
              <td>contact</td>
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
      </div>);
    }
}
