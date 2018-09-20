import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, PivotFieldListComponent, Inject, CalculatedField, dataBound } from '@syncfusion/ej2-react-pivotview';
import { Browser, setStyleAttribute, prepend } from '@syncfusion/ej2-base';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';

/**
 * Pivot Field List default sample
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 58%;
    height: 100%;
    float: left;
}
.e-pivotfieldlist {
    width: 42%;
    height: 100%;
    float: right;
}
.e-pivotfieldlist .e-static {
    width: 100% !important;
}`;

let dataSource: IDataOptions = {
    data: Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowValueFilter: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};

export class FieldList extends SampleBase<{}, {}> {
    private fieldlistObj: PivotFieldListComponent;
    private pivotGridObj: PivotViewComponent;
    afterPopulate(): void {
        if (this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.updateView(this.pivotGridObj);
        }
    }
    afterPivotPopulate(): void {
        if (this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.update(this.pivotGridObj);
        }
    }
    rendereComplete(): void {
        this.fieldlistObj.updateView(this.pivotGridObj);
        if (Browser.isDevice) {
            prepend([document.getElementById('PivotFieldList')], document.getElementById('PivotView'));
        }
        this.fieldlistObj.update(this.pivotGridObj);
    }
    ondataBound(): void {
        this.pivotGridObj.toolTip.destroy();
        this.pivotGridObj.refresh();
    }
    onLoad(): void {
        if (Browser.isDevice) {
            (this as any).renderMode = 'Popup';
            (this as any).target = '.control-section';
            document.getElementById('PivotFieldList').removeAttribute('style');
            setStyleAttribute(document.getElementById('PivotFieldList'), {
                'height': 0,
                'float': 'left'
            });
        }
    }
    render() {
        return (
            <div className="control-pane">
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <PivotViewComponent id='PivotView' ref={d => this.pivotGridObj = d} enginePopulated={this.afterPivotPopulate.bind(this)} width={'99%'} height={'530'} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                    <PivotFieldListComponent id='PivotFieldList' ref={d => this.fieldlistObj = d} enginePopulated={this.afterPopulate.bind(this)} dataSource={dataSource} renderMode={"Fixed"} allowCalculatedField={true} load={this.onLoad} dataBound={this.ondataBound.bind(this)}>
                        <Inject services={[CalculatedField]} />
                    </PivotFieldListComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the field list feature of the pivotgrid widget. In this sample, fields are automatically populated
                        from the bound data source and can be used to create a pivot view at runtime.</p>
                </div>
                <div id="description">
                    <p>The pivotgrid widget provides a built-in field list very similar to Microsoft Excel. The top section of the field list
                        allows the user to add and remove fields. The bottom section of the field list allows the user to rearrange the fields
                        between different axes, including column, row, value, and filter along with filter and sort options.
                        <br />
                        <br /> To show the field list independently, create as separate widget namely
                        <code> PivotFieldList</code> and assign JSON data source to its
                        <code> dataSource->data</code> property. Simultaneously pivotgrid will be populated by passing its instance in the updateView method, inside the
                        <code> enginePopulated</code> event of field list.
                        <br />
                        <br />
                        Additionally, user interface for calculated field, label filter, and value filter features have been enabled in this demo by setting the properties
                        <code> allowCalculatedField</code>,
                        <code> dataSource->allowLabelFilter</code> and <code> dataSource->allowValueFilter</code> to true.
                    </p>
                    <p>
                        <strong>NOTE:</strong> To enable calculated field, inject
                        <code> CalculatedField</code>
                    </p>
                </div>
            </div>
        );
    }
}