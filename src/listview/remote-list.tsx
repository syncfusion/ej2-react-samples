/**
 * ListView Remote Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import {DataManager, Query } from '@syncfusion/ej2-data';
import './listview.css';

export class Remote extends SampleBase<{}, {}> {

    //Initialize dataSource with the DataManager instance.
    public dataSource: DataManager = new DataManager({
      url: 'https://services.syncfusion.com/react/production/api/',
      crossDomain: true
  });

    //Initialize query with the Query instance to get specified set of data
    public query:Query= new Query().from('ListView').select('EmployeeID,FirstName').take(10);

    //Map the appropriate columns to fields property
    private fields: {[key:string]: string} ={
      id: 'EmployeeID', text: 'FirstName'
    };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>

        {/* ListView element */}
        <ListViewComponent id='sample-list' dataSource={this.dataSource} fields={this.fields} query={this.query} headerTitle='Employees' showHeader={true}></ListViewComponent>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the remote data functionalities of the ListView. Click any item from the list to select and highlight it.</p>
        </div>

        <div id="description">
          <p>The ListView supports <b>data binding</b> and the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#datasource'>dataSource</a></code> property can be assigned with the instance of <code>DataManager</code> to bind remote the data.</p>

          <p>The <code>DataManager</code> that acts as an interface between the service endpoint and ListView will require the following minimal information to interact with the service endpoint properly.</p>

          <p>DataManager-&gt;url - Defines the service endpoint to fetch the data.</p>

          <p>DataManager-&gt;adaptor - Defines the adaptor option. By default, the ODataAdaptor is used for remote binding.</p>

          <p>Adaptor is responsible for processing response and request from/to the service endpoint. <code>@syncfusion/ej2-data</code> namespace provides some predefined adaptors that are designed to interact with the particular service endpoints. They are:</p>

            <ul>
    
              <li>UrlAdaptor - Used to interact with any remote services. This is the base adaptor for all remote based adaptors.</li>
              <li>ODataAdaptor - Used to interact with OData endpoints.</li>       
              <li>ODataV4Adaptor - Used to interact with OData V4 endpoints.</li>       
              <li>WebApiAdaptor - Used to interact with Web API created under OData standards.</li>        
              <li>WebMethodAdaptor - Used to interact with web methods.</li>

            </ul>

          <p>In this sample, the remote data is bound to be a collection of <b>Products</b> data as an instance of <code>DataManager</code>.</p>
        </div>
      </div>
    )
  }
}