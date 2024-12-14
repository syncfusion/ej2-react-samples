import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Page, Aggregate, Group, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { energyData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './grid-group-aggregate.css'

function AggregateGroup() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const filterSettings: FilterSettingsModel = {type: 'Excel'};
  const groupSettings: Object = { showDropArea: false, columns: ['ConsumptionCategory'], showGroupedColumn:true };
  function groupFooterSum(props):any{
    return(<span>Total Energy Produced: {props.Sum} KWh</span>)
  }
  function footerSum(props):any{
    return(<span>Total Energy Produced: {props.Sum} KWh</span>)
  }
  function footerAverage(props):any{
    return(<span>Average Energy Produced: {props.Average} KWh</span>)
  }
  function groupcFootertMaxMin(props):any{
    return(<div className="e-grid-group-caption-temp"><span className="e-minimum">Min: {props.Min}</span><span>||</span> <span className="e-maximum"> Max : {props.Max}</span></div>)
  }
  function energyHeaderTemplate(props): any{
    return(<div><span className="energy e-icons e-icon"></span>
    <span> Energy (KWh)</span></div>)
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
      <GridComponent id="group-aggregate-grid" dataSource={energyData} allowSorting={true} gridLines='Vertical' enableHover={false} allowMultiSorting={true} height={300} allowGrouping={true} groupSettings={groupSettings} allowFiltering={true} filterSettings={filterSettings}>
            <ColumnsDirective>             
            <ColumnDirective field='ID' visible={false} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='Month' headerText='Month' format='yMd' width='120' clipMode='EllipsisWithTooltip' type='date'></ColumnDirective>
              <ColumnDirective field='ConsumptionCategory' headerText='Category' width='130' textAlign='Left' ></ColumnDirective>
              <ColumnDirective  headerTemplate={energyHeaderTemplate} textAlign='Center' columns={[{ field: 'EnergyConsumed', headerText: 'Consumed', width: 150, textAlign: 'Right', clipMode:'EllipsisWithTooltip'},
            { field: 'EnergyProduced', headerText: 'Produced', width: 300, textAlign: 'Right'}]}></ColumnDirective>
              <ColumnDirective field='WeatherCondition' headerText='Weather' clipMode='EllipsisWithTooltip' width='120'></ColumnDirective>
              <ColumnDirective field='EnergyPrice' headerText='Price ($)' clipMode='EllipsisWithTooltip' textAlign='Right' width='130' format='C2'></ColumnDirective>
            </ColumnsDirective>
            <AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='EnergyProduced' format='N2' type='Sum' footerTemplate={footerSum}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                  </AggregateDirective>
                  <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='EnergyProduced' format='N2' type='Average' footerTemplate={footerAverage}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                  </AggregateDirective>          
                  <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='EnergyProduced' format='N2' type={["Min","Max"]} groupCaptionTemplate={groupcFootertMaxMin}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                </AggregateDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='EnergyProduced' format='N2' type='Sum' groupFooterTemplate={groupFooterSum}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Page,Aggregate, Group, Sort, Filter]} />
          </GridComponent>
          <div id="action-description">
        <p>This sample demonstrates the aggregate functionality of the Grid. In this sample, the “Energy Produced” column will displays its <code>sum</code> aggregate value in the group footer and the <code>min</code> and <code>max</code> aggregate values in group caption.</p>
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
            </a></code> property to perform the aggregation.
            The custom aggregate value can be accessed inside template using the key <code>custom</code>.</li>     
        </ul>    
        <p>
            In this demo, the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupfootertemplate">
            groupFooterTemplate</a></code> property is used to display the group footer aggregation for the <strong><i>Energy Produced</i></strong> column and the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate">
            groupCaptionTemplate</a></code> property is used to display its group caption aggregation.
        </p>    
        <p>    To enable group footer aggregation for the <strong><i>Energy Produced</i></strong> column, use the <code>Sum</code> aggregate type by setting the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
            type</a></code> and set the <code><a target="_blank" className="code"
    href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field">
            field</a></code> property to <strong><i>EnergyProduced</i></strong> which will be used to perform the aggregation.
            The aggregate value is accessed inside the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupfootertemplate">
            groupFooterTemplate</a></code> using its <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
            type</a></code> name (<code>Sum</code>).
        </p>
        <p>    To enable group caption aggregation for the <strong><i>Energy Produced</i></strong> column, the <code>max</code> and <code>min</code>aggregate types are used by setting the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
            type</a></code> and the <code><a target="_blank" className="code"
    href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field">
            field</a></code> property is set to <strong><i>EnergyProduced</i></strong>, which will be used to perform the aggregation.
            The aggregate value is accessed inside the<code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate">
            groupCaptionTemplate</a></code> using its <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type">
            type</a></code> name (<code>Max</code> and <code>Min</code>).
        </p>
        <p>In this sample, we use the <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate">
            groupCaptionTemplate</a></code> to show multiple aggregate values.</p>

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
