import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Page, Aggregate, Group, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { categoryData } from './data';
import { updateSampleSection } from '../common/sample-base';

function AggregateGroup() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const pageSettings: Object = { pageCount: 5 };
  const filterSettings: FilterSettingsModel = {type: 'Excel'};
  const groupSettings: Object = { showDropArea: false, columns: ['CategoryName'] };
  function groupFooterSum(props): any {
    return (<span>Total units: {props.Sum}</span>)
  }
  function groupFootertCount(props): any {
    return (<span>Discontinued: {props.TrueCount}</span>)
  }
  function groupcFootertMax(props): any {
    return (<span>Maximum: {props.Max}</span>)
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={categoryData} allowPaging={true} pageSettings={pageSettings} allowGrouping={true} groupSettings={groupSettings} allowSorting={true} allowFiltering={true} filterSettings={filterSettings}>
          <ColumnsDirective>
            <ColumnDirective field='CategoryName' headerText='Category Name' width='70'></ColumnDirective>
            <ColumnDirective field='ProductName' headerText='Product Name' width='150'></ColumnDirective>
            <ColumnDirective field='QuantityPerUnit' headerText='Quantity per unit' width='180' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='Discontinued' headerText='Discontinued' displayAsCheckBox={true} width='150' textAlign='Center'></ColumnDirective>
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='UnitsInStock' type='Sum' groupFooterTemplate={groupFooterSum}> </AggregateColumnDirective>
                <AggregateColumnDirective field='Discontinued' type='TrueCount' groupFooterTemplate={groupFootertCount}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='UnitsInStock' type='Max' groupCaptionTemplate={groupcFootertMax}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject services={[Page, Aggregate, Group, Sort, Filter]} />
        </GridComponent>
        <div id="action-description">
          <p>This sample demonstrates Aggregate functionality of the Grid. In this sample, both “Unit In Stock” and “Discontinued” columns are displayed their aggregate value in group footer.
            “Unit In Stock” column displayed its aggregate value in group caption also. </p>
        </div>
        <div id="description">
          <p>The Grid supports aggregates which will be displayed at the footer, group footer and group caption of the Grid.
            The aggregate configurations can be provided by the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid#aggregates">
              aggregates
            </a></code> property.</p>
          <p>The built-in aggregates are,</p>
          <ul>
            <li><code>Sum</code></li>
            <li><code>Average</code></li>
            <li><code>Min</code></li>
            <li><code>Max</code></li>
            <li><code>Count</code></li>
            <li><code>TrueCount</code></li>
            <li><code>FalseCount</code></li>
            <li><code>Custom</code> - Requires the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#customaggregate">
              customAggregate
            </a></code> property to perform the aggregation.
              The custom aggregate value can be accessed inside template using the key <code>Custom</code></li>
          </ul>
          <p>
            In this demo, the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupfootertemplate">
              groupFooterTemplate</a></code> property is used to display the group footer aggregation for the <strong><i>Unit In Stocks</i></strong> and <strong><i>Discontinued</i></strong> columns and <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate">
                groupCaptionTemplate</a></code> property is used to display the group caption aggregation for the <strong><i>Unit In Stocks</i></strong> column.
          </p>
          <p>    To enable group footer aggregation for <strong><i>Unit In Stocks</i></strong> column, the <code>Sum</code> aggregate type is used by setting the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
            type</a></code> and the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field">
              field</a></code> property is set as <strong><i>UnitsInStock</i></strong> which will be used to perform the aggregation.
            The aggregate value is accessed inside the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupfootertemplate">
              groupFooterTemplate</a></code> using its <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
                type</a></code> name (<code>Sum</code>).
          </p>
          <p>    To enable group caption aggregation for <strong><i>Unit In Stocks</i></strong> column, the <code>Max</code> aggregate type is used by setting the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
            type</a></code> and <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field-string">
              field</a></code> property is set as <strong><i>UnitsInStock</i></strong> which will be used to perform the aggregation.
            The aggregate value is accessed inside the<code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate">
              groupCaptionTemplate</a></code> using its <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
                type</a></code> name (<code>Max</code>).
          </p>

          <p>Injecting Module:</p>
          <p>
            Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject
            <code>Aggregate</code> into the <code>provide</code> section.  Since grouping feature is required
            to show group aggreations, we also need to inject <code>Group</code> module.
          </p>
        </div>
      </div>
    </div>
  )
}
export default AggregateGroup;