import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Page, Aggregate, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { OverallData } from './data';
import { SampleBase } from '../common/sample-base';
import './grid-aggregate-default.css';

export class AggregateDefault extends SampleBase<{}, {}> {
  public footerSum(props) {
    return (<div>Total: {props.Sum}</div>);
  }
  public footerSumNewCustomers(props) {
    return (<div>New Customers: {props.Sum}</div>);
  }
  public footerSumReturnCustomers(props) {
    return (<div>Total: {props.Sum}</div>);
  }
  public footerAvg(props) {
    return (<div>Average: {props.Average}</div>);
  }
  public footerMin(props) {
    return (<div>Min: {props.Min}</div>);
  }
  public footerMax(props) {
    return (<div >Max: {props.Max}</div>);
  }
  public filterSettings: FilterSettingsModel = { type: 'Excel' };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent id="default-aggregate-grid" dataSource={OverallData} enableHover={false} height='300' gridLines='Vertical' allowSorting={true} allowMultiSorting={true} allowFiltering={true} filterSettings={this.filterSettings} >
            <ColumnsDirective>
              <ColumnDirective field='Month' headerText='Time Stamp' textAlign='Left' width='140' isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='Sales' headerText='Sales' width='150' textAlign='Right' format='C2'></ColumnDirective>
              <ColumnDirective field='MarketingSpend' headerText='Marketing Spent' width='190' format='C2' textAlign='Right' editType='dropdownedit' ></ColumnDirective>
              <ColumnDirective field='NewCustomers' headerText='New Customers' width='180' textAlign='Right' ></ColumnDirective>
              <ColumnDirective field='ReturningCustomers' headerText='Returning Customers' width='220' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='WebTraffic' headerText='Web Traffic' width='160' textAlign='Right'></ColumnDirective>
            </ColumnsDirective>
            <AggregatesDirective>
              <AggregateDirective>
                <AggregateColumnsDirective>
                  <AggregateColumnDirective field='Sales' type='Sum' footerTemplate={this.footerSum} format='C2'> </AggregateColumnDirective>
                  <AggregateColumnDirective field='MarketingSpend' type='Sum' footerTemplate={this.footerSum} format='C2'> </AggregateColumnDirective>
                  <AggregateColumnDirective field='NewCustomers' type='Sum' footerTemplate={this.footerSumNewCustomers} format='N'> </AggregateColumnDirective>
                  <AggregateColumnDirective field='ReturningCustomers' type='Sum' footerTemplate={this.footerSumReturnCustomers} format='N'> </AggregateColumnDirective>
                </AggregateColumnsDirective>
              </AggregateDirective>
              <AggregateDirective>
                <AggregateColumnsDirective>
                  <AggregateColumnDirective field='Sales' type='Average' footerTemplate={this.footerAvg} format='C2'> </AggregateColumnDirective>
                  <AggregateColumnDirective field='MarketingSpend' type='Average' footerTemplate={this.footerAvg} format='C2'> </AggregateColumnDirective>
                  <AggregateColumnDirective field='WebTraffic' type='Max' footerTemplate={this.footerMax} format='N'> </AggregateColumnDirective>
                </AggregateColumnsDirective>
              </AggregateDirective>
              <AggregateDirective>
                <AggregateColumnsDirective>
                  <AggregateColumnDirective field='WebTraffic' type='Min' footerTemplate={this.footerMin} format='N'> </AggregateColumnDirective>
                </AggregateColumnsDirective>
              </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Page, Aggregate, Sort, Toolbar, Edit, Filter]} />
          </GridComponent>
          <div id="action-description">
            <p>This sample demonstrates the aggregate functionality of the Grid. In this sample, the aggregate values for the columns
            are displayed in the column footer.</p>
          </div>
          <div id="description">
            <p>The Grid supports displaying aggregates in its footer, group footer and group caption.
                The aggregate configurations can be provided by the <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/#aggregates">
                        aggregates
                    </a></code> property.</p>
            <p>Built-in aggregates:</p>
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
                        </a></code> property to perform aggregation.
                    The custom aggregate value can be accessed inside template using the key <code>custom</code>.</li>
            </ul>
            <p>
                In this demo, the <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#footertemplate">
                        footerTemplate</a></code> property is used to display four different aggregates (<code>Sum</code>, <code>Average</code>, <code>Max</code> and <code>Min</code>) in the Grid footer.
                        Each aggregate type is specified using the <code><a target="_blank"
                        className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
                        type</a></code> and <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field">
                        field</a></code> properties accessed in the footerTemplate with its type name.
                The aggregate value will be formatted based on its <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#format">
                        format</a></code> value (<strong><i>N2</i></strong> or <strong><i>C2</i></strong>) before being displayed.
            </p>
            <p>Injecting Module:</p>
            <p>
              Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject
              <code>Aggregate</code> into the <code>provide</code> section.
            </p>
            <p> More information on the Stacked Header feature configuration can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/aggregates/footer-aggregate'> documentation section</a>.
          </p>
          </div>
        </div>
      </div>
    )
  }
}
