import * as React from 'react';
import { AutoCompleteComponent, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './highlight.css';
import * as data from './dataSource.json';
export class Highlight extends SampleBase {
    constructor() {
        super(...arguments);
        this.temp = 'countries';
        // define the JSON of data
        this.countries = data[this.temp];
        // maps the appropriate column to fields property
        this.fields = { value: 'Name' };
        // define the array of data
        this.filterData = ['Contains', 'StartsWith', 'EndsWith'];
        // set width size of DropDownList element.
        this.width = '150px';
    }
    // bind change event to modify the filter type of AutoComplete.
    onChange(args) {
        this.listObj.filterType = args.itemData.value;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8 control-wrappers'>
            <div id='highlight'>
              <AutoCompleteComponent id="country" dataSource={this.countries} ref={(autocomplete) => { this.listObj = autocomplete; }} fields={this.fields} placeholder="e.g. Australia" highlight={true}/>
            </div>
          </div>
          <div className='col-lg-4 property-section' id="filter-property">
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" style={{ width: "100%", marginTop: "15px" }}>
                <tr>
                  <td style={{ width: "50%" }}>FilterType :</td>
                  <td> <DropDownListComponent id="filter-type" dataSource={this.filterData} change={this.onChange.bind(this)} placeholder="Select a type" text='Contains'/>
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
      </div>);
    }
}
