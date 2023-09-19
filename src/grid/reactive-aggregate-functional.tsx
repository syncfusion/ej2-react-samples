import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Aggregate, Edit, Toolbar, Group, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';

function ReactiveAggregate() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  function footerSum(props): any {
    return (<span>Sum: {props.Sum}</span>)
  }
  function groupFooterSum(props): any {
    return (<span>Sum: {props.Sum}</span>)
  }
  function groupcFooterAvg(props): any {
    return (<span>Average: {props.Average}</span>)
  }
  const pageSettings: Object = { pageCount: 5 };
  const groupSettings: Object = { showDropArea: false, columns: ['CustomerID'] };
  const toolbarOptions: any = ['Delete', 'Update', 'Cancel'];
  const editSettings: any = { allowEditing: true, allowDeleting: true, mode: 'Batch' };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings} toolbar={toolbarOptions} editSettings={editSettings} allowGrouping={true} groupSettings={groupSettings}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Customer Name' isPrimaryKey={true} width='150'></ColumnDirective>
            <ColumnDirective field='CustomerID' headerText='Customer ID' width='150'></ColumnDirective>
            <ColumnDirective field='Freight' headerText='Freight' editType='numericedit' width='120' format='C2' textAlign='Right' ></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170' ></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' editType='dropdownedit' width='150'></ColumnDirective>
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={footerSum}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='Freight' type='Sum' format='C2' groupFooterTemplate={groupFooterSum}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field='Freight' type='Average' format='C2' groupCaptionTemplate={groupcFooterAvg}> </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject services={[Page, Aggregate, Edit, Toolbar, Group, Edit]} />
        </GridComponent>
        <div id="action-description">
          <p>This sample demonstrates reactive aggregate update on data change functionality of the Grid. In this sample, the batch editing  is enabled and the corresponding aggregate values will be refreshed when 'Freight' cell value is changed.</p>
        </div>
        <div id="description">
          <p>The Grid supports aggregates which will be displayed at the footer, group footer and group caption of the Grid.
            The aggregate configurations can be provided by the <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/#aggregates">
              aggregates
            </a></code> property.</p>
          <p>
            In this demo, the batch editing  is enabled and the corresponding aggregate values will be refreshed when <strong><i>Freight</i></strong> cell value is changed.
          </p>
          <p>
            By default, reactive aggregate update is not supported by inline and dialog edit modes. But, we can refresh aggregates manually. Please refer to the <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/grid/aggregates/reactive-aggregate#refresh-aggregate-values-in-inline-editing">
              documentation.</a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default ReactiveAggregate;