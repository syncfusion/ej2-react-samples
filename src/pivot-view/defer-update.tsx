import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, PivotFieldListComponent, Inject, CalculatedField } from '@syncfusion/ej2-react-pivotview';
import { IDataSet } from '@syncfusion/ej2-react-pivotview';
import { Browser, setStyleAttribute, prepend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';

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
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSource: IDataOptions = {
    data: Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowValueFilter: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany', 'United States'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};

export class DeferUpdate extends SampleBase<{}, {}> {
    private fieldlistObj: PivotFieldListComponent;
    private pivotGridObj: PivotViewComponent;
    afterPopulate(): void {
        if (this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.updateView(this.pivotGridObj);
        }
        if (this.fieldlistObj && this.pivotGridObj && this.fieldlistObj.isRequiredUpdate) {
            this.fieldlistObj.updateView(this.pivotGridObj);
        }
        if (this.pivotGridObj){
            this.pivotGridObj.notify('ui-update', this.pivotGridObj);
        }
        if (!Browser.isDevice && this.fieldlistObj) {
            this.fieldlistObj.notify('tree-view-update', this.fieldlistObj);
        }
    }
    afterPivotPopulate(): void {
        if (!Browser.isDevice && this.fieldlistObj && this.pivotGridObj) {
            this.fieldlistObj.update(this.pivotGridObj);
        }
    }
    rendereComplete(): void {
        if (this.fieldlistObj) {
            this.fieldlistObj.updateView(this.pivotGridObj);
            this.fieldlistObj.update(this.pivotGridObj);
        }
    }
    ondataBound(): void {
        if (Browser.isDevice && this.pivotGridObj) {
            this.pivotGridObj.element.style.width = '100%';
            this.pivotGridObj.allowCalculatedField = true;
            this.pivotGridObj.showFieldList = true;
        }
        if (this.pivotGridObj) {
            this.pivotGridObj.onWindowResize();
        }
    }
    onLoad(): void {
        if (Browser.isDevice) {
            (this as any).renderMode = 'Popup';
            (this as any).target = '.control-section';
            setStyleAttribute(document.getElementById('PivotFieldList'), {
                'width': 0,
                'height': 0,
                'float': 'left',
                'display': 'none'
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
                    <PivotViewComponent id='PivotView' ref={d => this.pivotGridObj = d} enginePopulated={this.afterPivotPopulate.bind(this)} width={'99%'} height={'620'} allowDeferLayoutUpdate={true} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                    <PivotFieldListComponent id='PivotFieldList' ref={d => this.fieldlistObj = d} enginePopulated={this.afterPopulate.bind(this)} dataSource={dataSource} renderMode={"Fixed"} allowDeferLayoutUpdate={true} allowCalculatedField={true} load={this.onLoad} dataBound={this.ondataBound.bind(this)}>
                        <Inject services={[CalculatedField]} />
                    </PivotFieldListComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the defer layout update feature of the pivot grid widget.</p>
                </div>
                <div id="description">
                    <p>
                        Deferring a layout update can be useful when you need to remove or add multiple fields in a report and you don't want to update the pivot table after each change. Now, you can update a pivot table after performing all changes at the report level in the field list resulting in better performance.
                    </p>
                    <p>
                        In this sample, the <b>Defer Layout Update</b> option can be enabled or disabled via field list UI.
                    </p>
                    <p>
                        In general, this feature can be enabled by setting  <code>allowDeferLayoutUpdate</code> as true.
                    </p>
                </div>
            </div>
        );
    }
}