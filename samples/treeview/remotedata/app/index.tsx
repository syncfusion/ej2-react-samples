import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from './sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';


export class RemoteData extends SampleBase<{}, {}> {

// Use data manager to get tree data from remote source
public data: DataManager = new DataManager({
    url: 'http://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor,
    crossDomain: true,
});

// Set queries to filter and fetch remote data
public query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
public query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
public fields: object = { dataSource: this.data, query: this.query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
child: { dataSource: this.data, query: this.query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
};

// Show loading message, while loading tree data
public show(): void {
  let popup: HTMLElement = document.getElementById('loading');
  popup.style.display = '';
}

// Hide loading message, after tree data has been loaded
public hide(): void {
  let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
  popup.style.display = 'none';
}

  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
        <div className='control_wrapper'>
            <span id="loading">Loading...</span>
            <TreeViewComponent fields={this.fields} dataBound={this.hide.bind(this)} created={this.show.bind(this)} />
        </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<RemoteData />, document.getElementById('sample'));