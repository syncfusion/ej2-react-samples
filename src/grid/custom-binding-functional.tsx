import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Grid, GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Sorts, DataResult, Sort, Inject, DataStateChangeEventArgs } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from '../common/sample-base';
import { Ajax } from '@syncfusion/ej2-base';
import { logWithIn } from '@syncfusion/ej2-charts';

function CustomBinding() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  let grid: Grid;
  let data;
  const BASE_URL: string = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';

  function rendereComplete() {
    let state = { skip: 0, take: 10 };
    dataStateChange(state);
  }

  function dataStateChange(state: DataStateChangeEventArgs) {
    execute(state).then((gridData) => { grid.dataSource = gridData });
  }

  const ajax: Ajax = new Ajax({
    type: 'GET', mode: true,
    onFailure: (e: Error) => { return false; }
  });

  function execute(state: DataStateChangeEventArgs): Promise<DataResult> {
    return getData(state);
  }

  function getData(state: DataStateChangeEventArgs): Promise<DataResult> {
    const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
    let sortQuery: string = '';

    if ((state.sorted || []).length) {
      sortQuery = `&$orderby=` + (state).sorted.map((obj: Sorts) => {
        return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
      }).reverse().join(',');
    }

    ajax.url = `${BASE_URL}?${pageQuery}${sortQuery}&$count=true`;

    return ajax.send().then((response: any) => {
      let data: any = JSON.parse(response);
      return { result: data['value'], count: parseInt(data['@odata.count'], 10) };
    });
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={data} ref={g => grid = g} allowPaging={true} allowSorting={true} pageSettings={{ pageCount: 4, pageSize: 10 }} allowGrouping={true} dataStateChange={dataStateChange.bind(this)}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='120'></ColumnDirective>
            <ColumnDirective field='CustomerID' headerText='Customer Name' width='150'></ColumnDirective>
            <ColumnDirective field='ShipName' headerText='Ship Name' width='120' />
            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Page, Group, Sort]} />
        </GridComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the usage of grid with AJAX. Paging, sorting and grouping can be performed in this sample.</p>
      </div>
      <div id="description">
        <p>
          Grid can be bound with data from external API.
          In this demo, the external data communication is done using AJAX and the grid is resolved with the response data.
          When performing grid actions such as paging, sorting and grouping etc.
          the <code>dataStateChange</code> event will be triggered and we need perform the request and assign the new grid data.
        </p>
        <p>
          In this demo, simply select the paging and click the column header to sort a column, multiple sorting is also enabled.
          To group a specify column, drag and drop the column in the group drop area.
          To enable paging, sorting and grouping, set the <code><a target="_blank" className="code"
            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowpaging">
            allowPaging
          </a></code> , <code><a target="_blank" className="code"
            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowsorting">
            allowSorting </a></code> and <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowgrouping">
              allowGrouping</a></code> as true.
        </p>
        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        <p>
          Grid component features are segregated into individual feature-wise modules. To use the paging ,sorting and grouping features,
          inject the <code>Page</code>, <code>Sort</code> and <code>Group</code> respectively into the
          <code>services</code>.
        </p>
      </div>
    </div>
  )
}
export default CustomBinding;