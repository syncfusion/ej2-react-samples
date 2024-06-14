import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Page, Aggregate, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';

function AggregateDefault() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  function footerSum(props): any {
    return (<span>Sum: {props.Sum}</span>)
  }
  function footerAvg(props): any {
    return (<span>Average: {props.Average}</span>)
  }
  const pageSettings: Object = { pageCount: 5 };
  const filterSettings: FilterSettingsModel = {type: 'Excel'};
  const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const customeridRule: Object = { required: true, minLength: 5};
  const orderidRules: Object = { required: true, number: true };
  const freightRules: Object = { required: true, min: 0 };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit' ></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170' editType='datepickeredit'></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={footerSum}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='Freight' type='Average' format='C2' footerTemplate={footerAvg}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject services={[Page, Aggregate, Sort, Toolbar, Edit, Filter]} />
        </GridComponent>
        <div id="action-description">
          <p>This sample demonstrates aggregate functionality of the Grid. In this sample, the aggregate value for the column “Freight” is displayed in column footer.</p>
        </div>
        <div id="description">
          <p>The Grid supports aggregates which will be displayed at the footer, group footer and group caption of the Grid. The
            aggregate configurations can be provided by the <code><a target="_blank" className="code"
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
            </a></code> property to perform aggregation. The custom aggregate value can be accessed inside template using the
              key <code>custom</code></li>
          </ul>
          <p>
            In this demo, the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#footertemplate">
              footerTemplate</a></code> property is used to display four different aggregates in the Grid footer. In the first
            aggregate row, the <code>sum</code> aggregate type is used by setting the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
              type</a></code> and <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field">
                field</a></code> property as <strong><i>Freight</i></strong> which will be used to perform the aggregation. The
            aggregate value is accessed inside the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#footertemplate">
              footerTemplate</a></code> using its <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
                type</a></code> name (<code>sum</code>). The aggregate value will be formatted based on its <code><a target="_blank" className="code"
                  href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#format">
                  format</a></code> value(<strong><i>C2</i></strong>) before being displayed.
          </p>
          <p>Injecting Module:</p>
          <p>
            Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject
            <code>Aggregate</code> into the <code>provide</code> section.
          </p>
        </div>
      </div>
    </div>
  )
}
export default AggregateDefault;