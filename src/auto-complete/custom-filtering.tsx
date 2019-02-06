/**
 * AutoComplete Custom Filtering Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AutoCompleteComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as Fuse from 'fuse.js';
import './custom-filtering.css';
import * as data from './dataSource.json';

export class CustomFiltering extends SampleBase<{}, {}> {

  private temp:string = 'booksData';
  private booksData: { [key: string]: Object; }[] = data[this.temp];
  // maps the appropriate column to fields property
  private fields: object = { value: 'BookName' };
  //Bind the filter event
  private onFiltering(e: FilteringEventArgs) {
    let options: Object = {
      keys: ['BookName'],
      includeMatches: true,
      findAllMatches: true
    };
    // create object from Fuse constructor
    let fuse: Fuse = new Fuse(this.booksData, options);
    // store the search result data based on typed characters
    let result: any = fuse.search(e.text);
    let data: { [key: string]: Object; }[] = [];
    for (let i: number = 0; i < result.length; i++) {
      data.push(result[i].item as any);
    }
    // pass the filter data source to updateData method.
    e.updateData(data, null);
    let lists: any = document.getElementById('books_popup').querySelectorAll('.e-list-item');
    // For highlight the typed characters, pass the result data and list items to highlightSearch method.
    this.highlightSearch(lists, result as any);
  }
  private highlightSearch(listItems: Element[], result: any): void {
    if (result.length > 0) {
      for (let i: number = 0; i < listItems.length; i++) {
        let innerHTML: string = listItems[i].innerHTML;
        for (let j: number = result[i].matches[0].indices.length - 1; j >= 0; j--) {
          let indexes: number[] = result[i].matches[0].indices[j];
          innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
            innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
          listItems[i].innerHTML = innerHTML;
        }
      }
    }
  }
  render() {
    return (
      <div id='autocustom' className='control-pane'>
        <div className='control-section'>
          <div id='custom-filtering'>
            <AutoCompleteComponent id="books" dataSource={this.booksData} filtering={this.onFiltering.bind(this)} fields={this.fields} placeholder="e.g. Node.js Succinctly" />
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the custom filtering functionalities of the AutoComplete. You can choose
              an item from the suggestion list that filtered items based on approximate string matching technique.</p>
        </div>

        <div id="description">
          <p> The AutoComplete can be customized to showcase the suggestion list by using <code>filtering</code> event.
          In that, you can use your own libraries to filter the data and update it to AutoComplete suggestion list via <code>updateData</code> method.
          </p>

          <p>In this sample, used Fuse.js library for custom filtering of books data.</p>
          <p>
            For more information about Fuse.js can be found in this <a href="http://fusejs.io/" target="_blank"> reference link</a>.
          </p>
        </div>
      </div>
    );
  }
}