import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, Inject, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
    DropDownListComponent, CheckBoxSelection, MultiSelectComponent, SelectEventArgs,
    RemoveEventArgs, PopupEventArgs
} from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './summary-customization.css';

/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    showGrandTotals: true,
    grandTotalsPosition: 'Bottom',
};

let values: { [key: string]: Object }[] = [
    { Name: 'Country' },
    { Name: 'Year' }
];

let options: { [key: string]: Object; }[] = [
    { value: 'grandTotals', text: 'Grand Totals' },
    { value: 'subTotals', text: 'Sub-totals' }
];

let field: any = { text: 'Name' };
let placeholder: string = "Select fields to hide its sub-totals";

function SummaryCustomization() {

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    let pivotObj: any;
    let optionsdll: DropDownListComponent;

    function onChange(args: any): void {
        if (args.value === 'None') {
            pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: false } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            pivotObj.dataSourceSettings.showGrandTotals = true;
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            if (args.value === 'Column') {
                pivotObj.dataSourceSettings.showColumnGrandTotals = false;
            } else if (args.value === 'Row') {
                pivotObj.dataSourceSettings.showRowGrandTotals = false;
            } else if (args.value === 'Both') {
                pivotObj.dataSourceSettings.showGrandTotals = false;
            }
        }
        pivotObj.refreshData();
    }

    function onChange0(args: any): void {
        (document.getElementById('grandsum') as HTMLElement).style.display = 'none';
        (document.getElementById('subsum') as HTMLElement).style.display = 'none';
        if (args.value == 'grandTotals') {
            (document.getElementById('grandsum') as HTMLElement).style.display = '';
        } else if (args.value == 'subTotals') {
            (document.getElementById('subsum') as HTMLElement).style.display = '';
        }
    }

    function onChange1(args: any): void {
        if (args.value === 'Top') {
            pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
            pivotObj.dataSourceSettings.grandTotalsPosition = 'Top';
        }
        else if (args.value === 'Bottom') {
            pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
            pivotObj.dataSourceSettings.grandTotalsPosition = 'Bottom';
        }
        pivotObj.refreshData();
    }

    function onChange2(args: any): void {
        if (args.value === 'None') {
            pivotObj.setProperties({ dataSourceSettings: { showSubTotals: false } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            pivotObj.dataSourceSettings.showSubTotals = true;
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { showSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            if (args.value === 'Column') {
                pivotObj.dataSourceSettings.showColumnSubTotals = false;
            } else if (args.value === 'Row') {
                pivotObj.dataSourceSettings.showRowSubTotals = false;
            } else if (args.value === 'Both') {
                pivotObj.dataSourceSettings.showSubTotals = false;
            }
        }
        pivotObj.refreshData();
    }

    function onChange3(args: any): void {
        if (args.value === 'Top') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Top' } }, true);
        }
        else if (args.value === 'Bottom') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Bottom' } }, true);
        }
        else if (args.value === 'Auto') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Auto' } }, true);
        }
        pivotObj.refreshData();
    }

    function select(args: SelectEventArgs): void {
        for (let i: number = 0; i < pivotObj.dataSourceSettings.columns.length; i++) {
            if ((pivotObj.dataSourceSettings.columns[i].name || pivotObj.dataSourceSettings.columns[i].caption) === (args.itemData as any).Name) {
                pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
            }
        }
        for (let i: number = 0; i < pivotObj.dataSourceSettings.rows.length; i++) {
            if ((pivotObj.dataSourceSettings.rows[i].name || pivotObj.dataSourceSettings.rows[i].caption) === (args.itemData as any).Name) {
                pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
            }
        }
        pivotObj.refreshData();
    }
    function removed(args: RemoveEventArgs): void {
        for (let i: number = 0; i < pivotObj.dataSourceSettings.columns.length; i++) {
            if ((pivotObj.dataSourceSettings.columns[i].name || pivotObj.dataSourceSettings.columns[i].caption) === (args.itemData as any).Name) {
                pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
            }
        }
        for (let i: number = 0; i < pivotObj.dataSourceSettings.rows.length; i++) {
            if ((pivotObj.dataSourceSettings.rows[i].name || pivotObj.dataSourceSettings.rows[i].caption) === (args.itemData as any).Name) {
                pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
            }
        }
        pivotObj.refreshData();
    }
    function open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }

    return (
        <div className='control-pane'>
            <div className='col-lg-9 control-section'>
                <PivotViewComponent id='PivotView' ref={(scope) => { pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'500'} gridSettings={{ columnWidth: 140 }}>
                </PivotViewComponent>
            </div>
            <div className="col-lg-3 property-section pivot-table-property-section">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" style={{ width: '100%', height: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: 'auto' }}>
                                    <div className="total-options" style={{ paddingLeft: 0, marginRight: '10px' }}>Totals:
                                    </div>
                                </td>
                                <td style={{ width: 'auto' }}>
                                    <div>
                                        <DropDownListComponent enabled={true} ref={(scope) => { optionsdll = scope; }}
                                            change={onChange0.bind(this)} width={"100%"} id="options" type='text' tabIndex={1}
                                            dataSource={options} fields={{ value: 'value', text: 'text' }} value="grandTotals" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="grandsum">
                        <table className="property-panel-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
                                            Grand totals position
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio5" change={onChange1.bind(this)} label='Top' name='position' value="Top"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio6" checked={true} change={onChange1.bind(this)} label='Bottom' name='position' value="Bottom"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' }}>
                                                Hide grand totals
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio1" change={onChange.bind(this)} label='Row' name='Total' value="Row"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio2" change={onChange.bind(this)} label='Column' name='Total' value="Column"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio3" change={onChange.bind(this)} label='Both' name='Total' value="Both"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio4" checked={true} change={onChange.bind(this)} label='None' name='Total' value="None"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="subsum" style={{ display: 'none' }}>
                        <table className="property-panel-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
                                            Sub-totals position
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio7" change={onChange3.bind(this)} label='Top' name='position1' value="Top"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio8" change={onChange3.bind(this)} label='Bottom' name='position1' value="Bottom"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio9" checked={true} change={onChange3.bind(this)} label='Auto' name='position1' value="Auto"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' }}>
                                                Hide sub-totals
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio10" change={onChange2.bind(this)} label='Row' name='Total1' value="Row"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio11" change={onChange2.bind(this)} label='Column' name='Total1' value="Column"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio12" change={onChange2.bind(this)} label='Both' name='Total1' value="Both"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 0 }}>
                                            <RadioButtonComponent id="radio13" checked={true} change={onChange2.bind(this)} label='None' name='Total1' value="None"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' }}>
                                                Hide specific sub-totals
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div>
                                            <MultiSelectComponent id="summary-values" dataSource={values} fields={field} mode="CheckBox"
                                                showClearButton={true} enableSelectionOrder={false} showDropDownIcon={true} placeholder={placeholder}
                                                select={select.bind(this)} removed={removed.bind(this)} open={open.bind(this)}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates showing and hiding grand totals and sub-totals, as well as change their position in
                    rows, columns, or both at runtime. Also, end users can specify and hide sub-totals of specific fields.</p>
            </div>
            <div id="description">
                <p>
                    In this sample, you can control the position and visibility of the grand totals and sub-totals by selecting
                    options from the Totals drop-down list. The following options will be displayed based on the drop-down
                    selection:
                </p>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0', width: '180px' }}><code>Grand totals position</code></td>
                            <td style={{ padding: '4px 0' }}>: Allows to display the grand totals either at top or bottom of the row and
                                column axes by selecting the appropriate radio button options.
                                To display the grand totals at top, set the property <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#grandtotalsposition">
                                    grandTotalsPosition</a> as <b>Top</b>. And, to display the grand
                                totals at bottom, set the property <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#grandtotalsposition">
                                    grandTotalsPosition</a> as <b>Bottom</b>.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}><code>Hide grand totals</code></td>
                            <td style={{ padding: '4px 0' }}>: Allows to hide grand totals in row, column, or both by selecting the
                                appropriate radio button options. To hide grand totals in both row and column, set the property<a
                                    target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showgrandtotals">
                                    showGrandTotals</a> as <b>false</b>. To hide the row and column
                                grand totals separately,
                                set the property <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showrowgrandtotals">
                                        showRowGrandTotals</a> and <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showcolumngrandtotals">
                                        showColumnGrandTotals</a> as <b>false</b>.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}><code>Sub-totals position</code></td>
                            <td style={{ padding: '4px 0' }}>: Allows to display the sub-totals at top, bottom, or default position of
                                the row and column axes by selecting the appropriate radio button options.
                                To display the sub-totals at top, set the property <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#subtotalsposition">
                                    subTotalsPosition</a> as <b>Top</b>. And, to display the
                                sub-totals at bottom, set the property <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#subtotalsposition">
                                    subTotalsPosition</a> as <b>Bottom</b>.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}><code>Hide sub-totals</code></td>
                            <td style={{ padding: '4px 0' }}>: Allows to hide sub-totals in row, column, or both by selecting the
                                appropriate radio button options. To hide sub-totals in both row and column, set the property<a
                                    target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showsubtotals">
                                    showSubTotals</a> as <b>false</b>. To hide the row and column
                                sub-totals separately,
                                set the property <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showrowsubtotals">
                                        showRowSubTotals</a> and <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showcolumnsubtotals">
                                        showColumnSubTotals</a> as <b>false</b>.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}><code>Hide sub-totals for specific field(s)</code></td>
                            <td style={{ padding: '4px 0' }}>: Allows to hide sub-totals for specific fields in row and column by
                                selecting appropriate fields from the multi-select drop-down.
                                To hide sub-totals for a specific field, set the <a target="_blank"
                                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/fieldOptionsModel/#showsubtotals">
                                        showSubTotals</a> property as <b>false</b> inside the field definition.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SummaryCustomization;