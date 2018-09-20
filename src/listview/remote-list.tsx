/**
 * ListView Remote Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import {DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import './listview.css';

export class Remote extends SampleBase<{}, {}> {

    //Initialize dataSource with the DataManager instance.
    public dataSource: DataManager = new DataManager({
      url: '//js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/',
      crossDomain: true
  });

    //Initialize query with the Query instance to get specified set of data
    public query:Query= new Query().from('Products').select('ProductID,ProductName').take(10);

    //Map the appropriate columns to fields property
    private fields: {[key:string]: string} ={
      id: 'ProductID', text: 'ProductName'
    };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>

        {/* ListView element */}
        <ListViewComponent id='remote-list' dataSource={this.dataSource} fields={this.fields} query={this.query} headerTitle='Products' showHeader={true}></ListViewComponent>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the Remote-data functionalities of the ListView. Click any list item to select and highlight an item.</p>
        </div>

        <div id="description">
          <p>ListView supports <b>data binding</b> and the <code>dataSource</code> property can be assigned with the instance of <code>DataManager</code> to bind remote the data.</p>

          <p>The <code>DataManager</code> that act as an interface between the service endpoint, and ListView will require the following minimal information to interact with the service endpoint properly.</p>

          <p>DataManager->url - Defines the service endpoint to fetch data.</p>

          <p>DataManager->adaptor - Defines the adaptor option. By default, ODataAdaptor is used for remote binding.</p>

          <p>Adaptor is responsible for processing response and request from/to the service endpoint. <code>@syncfusion/ej2-data</code> package provides some predefined adaptors that are designed to interact with the particular service endpoints. They are,</p>

          <ul>
            <li>UrlAdaptor - Use this to interact any remote services. This is the base adaptor for all remote based adaptors.</li>
            <li>ODataAdaptor - Use this to interact with OData endpoints.</li>
            <li>ODataV4Adaptor - Use this to interact with OData V4 endpoints.</li>
            <li>WebApiAdaptor - Use this to interact with Web API created under OData standards.</li>
            <li>WebMethodAdaptor - Use this to interact with web methods.</li>
          </ul>

          <p>In this sample, the remote data is bound to be a collection of <b>Products</b> data as an instance of <code>DataManager</code>.</p>
        </div>
      </div>
    )
  }
}