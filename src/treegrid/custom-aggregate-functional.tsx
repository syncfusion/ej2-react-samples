import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Aggregate,
  AggregatesDirective, AggregateDirective, AggregateColumnDirective, AggregateColumnsDirective
} from '@syncfusion/ej2-react-treegrid';
import { getObject } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { summaryData } from './data';
import { updateSampleSection } from '../common/sample-base';
{/* custom code start */ }
const SAMPLE_CSS = `
  .e-input {
    padding-bottom: 1px !important;
  }

  .e-summarycell.e-templatecell {
    pointer-events:visible !important;
  }
  
  .e-treegrid .e-summarycell.e-templatecell .e-input-group input.e-control.e-dropdownlist.e-lib.e-input {
    padding-left: 6px !important;
  }`;
{/* custom code end */ }
const CustomAggregate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let item: string = "Frozen seafood";
  let treegridObj = useRef<TreeGridComponent>(null);
  let listObj: DropDownList;
  const foods: { [key: string]: Object }[] = [
    { food: "Frozen seafood" },
    { food: "Dairy" },
    { food: "Edible" },
    { food: "Solid crystals" },
  ];
  const customAggregateFn = (data: Object): any => {
    let sampleData: Object[] = getObject("result", data);
    let countLength: number;
    countLength = 0;
    sampleData.filter((record: Object) => {
      let data: string = getObject("category", record);
      let value: string = item;
      if (data === value) {
        countLength++;
      }
    });
    return countLength;
  };
  const custom = (props): any => {
    return (
      <span>
        {" "}
        Count of <input type="text" id="customers" />: {props.Custom}
      </span>
    );
  };
  const dataBound = (): void => {
    setTimeout(() => {
      if (!isNullOrUndefined(listObj)) {
        listObj.destroy();
      }
      listObj = new DropDownList({
        dataSource: foods,
        fields: { value: "food" },
        placeholder: "Select a Category",
        width: "165px",
        value: item,
        change: () => {
          setTimeout(() => {
            item = listObj.value.toString();
            treegridObj.current.refresh();
          }, 300);
        },
      });
      listObj.appendTo("#customers");
    })
  };
  return (
    <div className="control-pane">
      {/* custom code start */}
      <style>{SAMPLE_CSS}</style>
      {/* custom code end */}
      <div className="control-section">
        <TreeGridComponent
          dataSource={summaryData}
          treeColumnIndex={1}
          childMapping="subtasks"
          height="400"
          ref={treegridObj}
          dataBound={dataBound.bind(this)}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="ID"
              headerText="S.No"
              width="90"
              textAlign="Right"
            ></ColumnDirective>
            <ColumnDirective
              field="Name"
              headerText="Shipment Name"
              width="220"
            ></ColumnDirective>
            <ColumnDirective
              field="category"
              headerText="Category"
              width="460"
              minWidth="270"
            />
            <ColumnDirective
              field="units"
              headerText="Total Units"
              width="130"
              textAlign="Right"
              type="number"
            />
            <ColumnDirective
              field="unitPrice"
              headerText="Unit Price($)"
              width="130"
              textAlign="Right"
              type="number"
              format="C2"
            />
            <ColumnDirective
              field="price"
              headerText="Price($)"
              width="90"
              textAlign="Right"
              type="number"
              format="C0"
            />
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective showChildSummary={false}>
              <AggregateColumnsDirective>
                <AggregateColumnDirective
                  columnName="category"
                  type="Custom"
                  customAggregate={customAggregateFn.bind(this)}
                  footerTemplate={custom}
                >
                  {" "}
                </AggregateColumnDirective>
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject services={[Aggregate]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates custom aggregate functionality of the Tree
          Grid. In this sample, the custom aggregate value for the columns
          “Category” is displayed in column footer with dropdown to display the
          count of selected category name.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid supports aggregates which will be displayed at the
          footer and every hierarchy level. The aggregate configurations can be
          provided by the <code>aggregates</code> property.
        </p>
        <p>The built-in aggregates are,</p>
        <ul>
          <li>
            <code>Sum</code>
          </li>
          <li>
            <code>Average</code>
          </li>
          <li>
            <code>Min</code>
          </li>
          <li>
            <code>Max</code>
          </li>
          <li>
            <code>Count</code>
          </li>
          <li>
            <code>TrueCount</code>
          </li>
          <li>
            <code>FalseCount</code>
          </li>
          <li>
            <code>Custom</code> - Requires the <code>customAggregate</code>{" "}
            property to perform aggregation. The custom aggregate value can be
            accessed inside template using the key <code>${"Custom"}</code>
          </li>
        </ul>
        <p>
          In this demo, the footerTemplate property shows the custom aggregate
          value for the columns “Category” in column footer to display the count
          of category name.
        </p>
        <p>
          The template expression should be provided inside{" "}
          <code>${"..."}</code> the interpolation syntax.
        </p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise
          modules. To use aggregate feature, we need to inject{" "}
          <code>Aggregate</code> module in this services.
        </p>
        <p>
          More information about aggregate can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/aggregates/custom-aggregate">documentation section</a>.
        </p>
      </div>
    </div>
  );
}
export default CustomAggregate;
