import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Aggregate,
AggregatesDirective, AggregateDirective, AggregateColumnDirective, AggregateColumnsDirective } from '@syncfusion/ej2-react-treegrid';
import { getObject } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { summaryData } from './data';
import { SampleBase } from '../common/sample-base';
{/* custom code start */}
const SAMPLE_CSS = `
  .e-input {
    padding-bottom: 1px !important;
  }

  .e-summarycell.e-templatecell {
    pointer-events:visible !important;
  }`;
{/* custom code end */}
export class CustomAggregate extends SampleBase<{}, {}> {
  public item: string = 'Frozen seafood'; 

  public treegridObj: TreeGridComponent;

  public listObj: DropDownList;

  public foods:  { [key: string]: Object }[] = [
    { food : 'Frozen seafood'},
    { food : 'Dairy'},
    { food : 'Edible'},
    { food : 'Solid crystals'},
  ];

  public customAggregateFn(data: Object): any{
    let sampleData: Object[] = getObject('result', data);
    let countLength: number; countLength = 0;
    sampleData.filter((record: Object) => {
        let data: string = getObject('category', record);
        let value: string = this.item;
        if (data === value) {
            countLength++;
        }
    });
    return countLength;
  }

  public custom(props):any{
    return(<span> Count of <input type="text" id="customers" />: {props.Custom}</span>)
  }

  public dataBound(): void {
    if (!isNullOrUndefined(this.listObj)) {
      this.listObj.destroy();
    }
    this.listObj = new DropDownList({
        dataSource: this.foods,
        fields: { value: 'food' },
        placeholder: 'Select a Category',
        width: '130px',
        value: this.item,
        change: () => {
            setTimeout(
                () => {
                  this.item = this.listObj.value.toString();
                  this.treegridObj.refresh();
                },300);
          }
      });
      this.listObj.appendTo('#customers');
  }

  render() {
    return (
      <div className='control-pane'>
      {/* custom code start */}
        <style>
          {SAMPLE_CSS}
        </style>
        {/* custom code end */}
        <div className='control-section'>
            <TreeGridComponent dataSource={summaryData} treeColumnIndex={1} childMapping='subtasks' height='400'
                ref={treegrid=> this.treegridObj = treegrid} dataBound={this.dataBound.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='ID' headerText='S.No' width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='Name' headerText='Shipment Name' width='220'></ColumnDirective>
                <ColumnDirective field='category' headerText='Category' width='230' />
                <ColumnDirective field='units' headerText='Total Units' width='130' textAlign='Right' type='number' />
                <ColumnDirective field='unitPrice' headerText='Unit Price($)' width='130' textAlign='Right' type='number' format='C2' />
                <ColumnDirective field='price' headerText='Price($)' width='90' textAlign='Right' type='number' format='C0' />
              </ColumnsDirective>
              <AggregatesDirective>
                <AggregateDirective showChildSummary={false}>
                  <AggregateColumnsDirective>
                  <AggregateColumnDirective columnName='category' type='Custom'
                        customAggregate={this.customAggregateFn.bind(this)} footerTemplate={this.custom}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                  </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Aggregate]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates custom aggregate functionality of the Tree Grid. In this sample, the custom aggregate
              value for the columns “Category” is displayed in column footer with dropdown to display the count of selected
              category name.</p>
</div>
<div id="description">
    <p>The Tree Grid supports aggregates which will be displayed at the footer and every hierarchy level.
    The aggregate configurations can be provided by the <code>aggregates</code> property.</p>
    <p>The built-in aggregates are,</p>
    <ul>
        <li><code>Sum</code></li>
        <li><code>Average</code></li>
        <li><code>Min</code></li>
        <li><code>Max</code></li>
        <li><code>Count</code></li>
        <li><code>TrueCount</code></li>
        <li><code>FalseCount</code></li>
        <li><code>Custom</code> - Requires the <code>customAggregate</code> property to perform aggregation.
            The custom aggregate value can be accessed inside template using the key <code>${'Custom'}</code></li>
    </ul>
    <p>
        In this demo, the footerTemplate property shows the custom aggregate value for the columns “Category” in column
        footer to display the count of category name.
    </p>
    <p>The template expression should be provided inside <code>${'...'}</code> the interpolation syntax.</p>
    <p>Injecting Module:</p>
    <p>
        Tree Grid features are segregated into individual feature-wise modules.
        To use aggregate feature, we need to inject <code>Aggregate</code> module in this services.
    </p>
    <p>
        More information about aggregate can be found in this documentation section.
    </p>
     </div>
    </div>
    )
  }
}