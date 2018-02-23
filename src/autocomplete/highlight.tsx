/**
 * AutoComplete Highlight Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent, ChangeEventArgs, DropDownListComponent, FilterType} from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './highlight.css';

export class Highlight extends SampleBase<{}, {}> {

  private listObj: AutoCompleteComponent;
  // define the JSON of data
  private countries: { [key: string]: Object; }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }
  ];
  // maps the appropriate column to fields property
  private fields: object = { value: 'Name' };
  // define the array of data
  private filterData: string[] = ['Contains', 'StartsWith', 'EndsWith'];
  // bind change event to modify the filter type of AutoComplete.
  public onChange(args: ChangeEventArgs): void {
    this.listObj.filterType = args.itemData as FilterType;
  }
  // set width size of DropDownList element.
  public width: string = '150px';

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8 control-wrappers'>
            <div id='highlight'>
              <AutoCompleteComponent id="country" dataSource={this.countries} ref={(autocomplete) => { this.listObj = autocomplete }} fields={this.fields} placeholder="e.g. Australia" highlight={true} />
            </div>
          </div>
          <div className='col-lg-4 property-section' id="filter-property">
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" style={{ width: "100%", marginTop: "15px" }}>
                <tr>
                  <td style={{ width: "50%" }}>FilterType :</td>
                  <td> <DropDownListComponent id="filter-type" dataSource={this.filterData} change={this.onChange.bind(this)} placeholder="Select a type" text='Contains' />
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">    
            <p>This sample demonstrates the highlight functionalities of the AutoComplete. Type a character(s) in the autocomplete element and the typed characters are highlighted in the suggestion list.
            By default, <code>Contains</code> filter type is set in this sample and provided with the options to choose different filter type in the property panel.</p>    
        </div>
        
        <div id="description">
            <p>The AutoComplete has built-in support to highlight the searched characters on the suggested list items when <code>highlight</code> is enabled.</p>
        
            <p>This sample illustrates that, the searched characters on the country suggestion list items are highlighted.</p>
            <p> More information on the highlight search feature configuration can be found in the
                <a href="http://ej2.syncfusion.com/react/documentation/auto-complete/how-to.html#custom-highlight-search" target="_blank"> documentation section</a>.
            </p>
        </div>
      </div>
    );
  }
}