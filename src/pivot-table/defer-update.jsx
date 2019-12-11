import * as React from 'react';
import { PivotViewComponent, PivotFieldListComponent, Inject, CalculatedField } from '@syncfusion/ej2-react-pivotview';
import { Browser, setStyleAttribute } from '@syncfusion/ej2-base';
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
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    dataSource: Pivot_Data,
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
export class DeferUpdate extends SampleBase {
    afterPopulate() {
        if (this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
        if (this.fieldlistObj && this.pivotObj && this.fieldlistObj.isRequiredUpdate) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
        this.pivotObj.notify('ui-update', this.pivotObj);
        if (!Browser.isDevice) {
            this.fieldlistObj.notify('tree-view-update', this.fieldlistObj);
        }
    }
    afterPivotPopulate() {
        if (!Browser.isDevice && this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.update(this.pivotObj);
        }
    }
    rendereComplete() {
        this.fieldlistObj.updateView(this.pivotObj);
        this.fieldlistObj.update(this.pivotObj);
    }
    ondataBound() {
        this.pivotObj.tooltip.destroy();
        if (Browser.isDevice) {
            this.pivotObj.element.style.width = '100%';
            this.pivotObj.allowCalculatedField = true;
            this.pivotObj.showFieldList = true;
        }
        this.pivotObj.refresh();
    }
    onLoad() {
        if (Browser.isDevice) {
            this.renderMode = 'Popup';
            this.target = '.control-section';
            setStyleAttribute(document.getElementById('PivotFieldList'), {
                'width': 0,
                'height': 0,
                'float': 'left',
                'display': 'none'
            });
        }
    }
    render() {
        return (<div className="control-pane">
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <PivotViewComponent id='PivotView' ref={d => this.pivotObj = d} enginePopulated={this.afterPivotPopulate.bind(this)} width={'99%'} height={'620'} allowDeferLayoutUpdate={true} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                    <PivotFieldListComponent id='PivotFieldList' ref={d => this.fieldlistObj = d} enginePopulated={this.afterPopulate.bind(this)} dataSourceSettings={dataSourceSettings} renderMode={"Fixed"} allowDeferLayoutUpdate={true} allowCalculatedField={true} load={this.onLoad} dataBound={this.ondataBound.bind(this)}>
                        <Inject services={[CalculatedField]}/>
                    </PivotFieldListComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the defer layout update feature of the pivot table. The defer layout update allows users to refresh the pivot table on-demand instead of during every UI interaction.</p>
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
            </div>);
    }
}
