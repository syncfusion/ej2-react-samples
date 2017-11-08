/**
 * Internationalization NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
import * as numbers from './common/cldr-data/main/de/numbers.json';
import * as currencies from './common/cldr-data/main/de/currencies.json';
import * as zhNumbers from './common/cldr-data/main/zh/numbers.json';
import * as zhCurrencies from './common/cldr-data/main/zh/currencies.json';
import * as numberingSystems from './common/cldr-data/supplemental/numberingSystems.json';
import * as currencyData from './common/cldr-data/supplemental/currencyData.json';


// Loading English, German and Chinese cultures
L10n.load({
  'en': {
    'numerictextbox': { incrementTitle: 'Increment value', decrementTitle: 'Decrement value' }
  },
  'de': {
    'numerictextbox': { incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert' }
  },
  'zh': {
    'numerictextbox': { incrementTitle: '增值', decrementTitle: '遞減值' }
  }
});

loadCldr(numbers, currencies, zhNumbers, zhCurrencies, numberingSystems, currencyData);

export class Internationalization extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className=' col-lg-8'>
            <div className="content-wrapper format-wrapper sample-numeric" style={{ width: '43%', marginBottom: '20px' }}>
              {/* Render the Numeric Textbox */}
              <NumericTextBoxComponent locale='de' value={10} placeholder='Geben Sie den Wert ein' ref={numeric => this.numericInstance = numeric} floatLabelType='Always' >
              </NumericTextBoxComponent>
              {/* Render the Percentage Textbox */}
              <NumericTextBoxComponent format='p2' locale='de' value={0.5} min={0} max={1} step={0.01} placeholder='Geben Sie den Prozentsatz ein' ref={numeric => this.percentInstance = numeric} floatLabelType='Always' >
              </NumericTextBoxComponent>
              {/* Render the Currency Textbox */}
              <NumericTextBoxComponent format='c2' locale='de' value={100} currency='EUR' placeholder='Geben Sie die Währung ein' ref={numeric => this.currencyInstance = numeric} floatLabelType='Always' >
              </NumericTextBoxComponent>
            </div>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Culture</div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <select id="cultures" className="form-control" onChange={this.changeLocale.bind(this)} >
                        <option value="de">de</option>
                        <option value="zh">zh</option>
                        <option value="en">en</option>
                      </select>
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
  private percentInstance: NumericTextBoxComponent;
  private currencyInstance: NumericTextBoxComponent;

  // While changing culture 'locale', 'currency' and 'placeholder' values will be modified.
  public changeLocale(): void {
    let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
    this.numericInstance.locale = culture;
    this.percentInstance.locale = culture;
    this.currencyInstance.locale = culture;
    if (culture === 'zh') {
      this.currencyInstance.currency = 'CNY';
      this.numericInstance.placeholder = '输入值';
      this.currencyInstance.placeholder = '输入货币';
      this.percentInstance.placeholder = '输入百分比';
    } else if (culture === 'de') {
      this.currencyInstance.currency = 'EUR';
      this.numericInstance.placeholder = 'Geben Sie den Wert ein';
      this.currencyInstance.placeholder = 'Geben Sie die Währung ein';
      this.percentInstance.placeholder = 'Geben Sie den Prozentsatz ein';
    } else {
      this.currencyInstance.currency = 'USD';
      this.numericInstance.placeholder = 'Enter the value';
      this.currencyInstance.placeholder = 'Enter the currency';
      this.percentInstance.placeholder = 'Enter the percentage';
    }
  }
}

ReactDOM.render(<Internationalization />, document.getElementById('sample'));