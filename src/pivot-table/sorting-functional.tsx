import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Inject, FieldList, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './sorting.css';

/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};

function Sorting () {

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    let pivotObj: PivotViewComponent;
    let fieldsddl: DropDownListComponent;
    let orderddl: DropDownListComponent;
    let applyBtn: ButtonComponent;
    let checkBoxObj: CheckBoxComponent;
    let order: string[] = ['Ascending', 'Descending'];
    let fields: { [key: string]: Object }[] = [{ Field: 'Country', Order: 'Country_asc' },
    { Field: 'Products', Order: 'Products_asc' },
    { Field: 'Year', Order: 'Year_asc' },
    { Field: 'Order Source', Order: 'Order Source_asc' }];
    function onChange(e: ChangeEventArgs): void {
        if ((fieldsddl.dataSource as any)[fieldsddl.index].Order === (fieldsddl.dataSource as any)[fieldsddl.index].Field + '_asc') {
            orderddl.index = 0;
        } else {
            orderddl.index = 1;
        }
    }

    function onChangeOrder(args: ChangeEventArgs): void {
        if (args.value === 'Ascending') {
            (fieldsddl.dataSource as any)[fieldsddl.index].Order = (fieldsddl.dataSource as any)[fieldsddl.index].Field + '_asc';
        } else {
            (fieldsddl.dataSource as any)[fieldsddl.index].Order = (fieldsddl.dataSource as any)[fieldsddl.index].Field + '_desc';
        }
        fieldsddl.refresh();
    }

    function checkChange(args: Args): void {
        let ischecked: boolean = args.checked;
        fieldsddl.enabled = ischecked;
        orderddl.enabled = ischecked;
        applyBtn.disabled = !ischecked;
        pivotObj.dataSourceSettings.enableSorting = ischecked;
    }

    function onClick(): void {
        if (checkBoxObj.checked) {
            pivotObj.dataSourceSettings.enableSorting = true;
            pivotObj.dataSourceSettings.sortSettings = [
                { name: 'Country', order: (fieldsddl.dataSource as any)[0].Order === 'Country_asc' ? 'Ascending' : 'Descending' },
                { name: 'Products', order: (fieldsddl.dataSource as any)[1].Order === 'Products_asc' ? 'Ascending' : 'Descending' },
                { name: 'Year', order: (fieldsddl.dataSource as any)[2].Order === 'Year_asc' ? 'Ascending' : 'Descending' },
                { name: 'Order_Source', order: (fieldsddl.dataSource as any)[3].Order === 'Order Source_asc' ? 'Ascending' : 'Descending' }
            ];
        } else {
            pivotObj.dataSourceSettings.enableSorting = false;
            pivotObj.dataSourceSettings.sortSettings = [];
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section' style={{ overflow: 'auto' }}>
                <div className='col-lg-8 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='pivot-property-panel-table property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                        <div className='row' style={{ paddingLeft: 0, marginLeft: '-10px' }}>
                                            <CheckBoxComponent ref={(scope) => { checkBoxObj = scope; }} id='reorder' checked={true} label='Enable Sorting' labelPosition='After' change={checkChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div className='pivotHdrLabel'>
                                            Fields:
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ marginLeft: '-50px' }}>
                                            <DropDownListComponent enabled={true} ref={(scope) => { fieldsddl = scope; }} change={onChange.bind(this)} width={"98%"} id="etype" dataSource={fields} index={0} fields={{ text: 'Field', value: 'Order' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div className='pivotHdrLabel'>
                                            Order:
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ marginLeft: '-50px' }}>
                                            <DropDownListComponent enabled={true} ref={(scope) => { orderddl = scope; }} change={onChangeOrder.bind(this)} width={"98%"} id="etype" dataSource={order} index={0} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td></td>
                                    <td>
                                        <div className='row' style={{ float: 'right', paddingRight: '15px' }}>
                                            <ButtonComponent ref={(scope) => { applyBtn = scope; }} onClick={onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>

            </div>
            <div id="action-description">
                <p>This sample demonstrates ordering fields in row and column axes either in ascending or descending order.</p>
            </div>
            <div id="description">
                <p>In this sample, any field can be selected from the
                    <b> Fields</b> dropdown list and its order can be changed to display headers either in ascending or descending order.
                                    It can be enabled using the
                    <code> enableSorting</code> property and it can be configured using the
                    <code> name</code> and
                    <code> order</code> options inside the
                    <code> sortSettings</code> property in the pivot table.
                </p><br />
                <p>
                    More information on the sorting can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/sorting">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default Sorting;