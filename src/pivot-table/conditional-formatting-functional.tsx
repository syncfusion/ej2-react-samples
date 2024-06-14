import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, FieldList, Inject, ConditionalFormatting, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';

/**
 * PivotView Sample with Calculated Fields.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}
#conditional-formatting-btn {
    width: 80%;
    margin-left: 20px;
}
#reset-format {
    width: 80%;
    margin-left: 20px;
}
.e-control.e-btn.e-lib.e-small.e-round.e-format-condition-button.e-icon-btn.e-flat {
    padding: 0 0 4px 0 !important;
}
#PivotViewcontainerwrapper {
    height: auto !important;
}`;
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' },
    { name: 'Sold', caption: 'Units Sold' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    conditionalFormatSettings: [
        {
            measure: 'In_Stock',
            value1: 5000,
            conditions: 'LessThan',
            style: {
                backgroundColor: '#80cbc4',
                color: 'black',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            }
        },
        {
            value1: 3400,
            value2: 40000,
            measure: 'Sold',
            conditions: 'Between',
            style: {
                backgroundColor: '#f48fb1',
                color: 'black',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            }
        }
    ]
};

function ConditionalFormattingClass () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: PivotViewComponent;

    function applyFormat(): void {
        pivotObj.conditionalFormattingModule.showConditionalFormattingDialog();
    }

    function resetFormat(): void {
        if (pivotObj.dataSourceSettings.conditionalFormatSettings.length > 0) {
            pivotObj.setProperties({ dataSourceSettings: { conditionalFormatSettings: [] } }, true);
            pivotObj.renderPivotGrid();
        }
        pivotObj.conditionalFormattingModule.destroy();
        document.getElementById('reset-format').blur();
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className='col-lg-9 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} showFieldList={true} width={'100%'} height={'300'} allowConditionalFormatting={true} gridSettings={{ columnWidth: 100 }}>
                        <Inject services={[ConditionalFormatting, FieldList]} />
                    </PivotViewComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <ButtonComponent id='conditional-formatting-btn' cssClass='e-primary' onClick={applyFormat.bind(this)}>APPLY FORMAT</ButtonComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <ButtonComponent id='reset-format' cssClass='e-primary' onClick={resetFormat.bind(this)}>RESET ALL</ButtonComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>

            </div>
            <div id="action-description">
                <p>This sample demonstrates formatting the appearance of pivot table cells with user-defined styles based on applied conditions. The <b>Conditional Formatting</b> dialog is invoked to add conditions and styles for the conditions. The formatting can be added, removed, and reset dynamically as well.</p>
            </div>
            <div id="description">
                <p>Conditional formatting works only for cells with values,
                    allowing the users to change its appearance such as background color, font color, font family, and font size based on specific conditions.
                    Conditional formatting can be applied either through UI or code behind. To enable this option in UI, set
                    <code> allowConditionalFormatting</code> to true and invoke
                    <code> showConditionalFormattingDialog</code> method to view the UI.
                    To achieve this in code-behind, set
                    <code> allowConditionalFormatting</code> to true and use the
                    <code> conditionalFormatSettings</code> object in the pivot table along with the following properties.
                    Both options are enabled in this sample.</p>
                <table>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>measure :</code>
                        </td>
                        <td>Specifies the value field name for which style will be applied.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>condition :</code>
                        </td>
                        <td>Specifies the operator type like equals, greater than, less than, etc.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>value1 :</code>
                        </td>
                        <td>Specifies the start value.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>value2 :</code>
                        </td>
                        <td>Specifies the end value.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>style :</code>
                        </td>
                        <td>Specifies the style for the cell.</td>
                    </tr>
                </table>
                <br />
                <p>Also, user can clear the entire style applied for the value cell using reset all option.</p>
                <br />
                <p>
                <strong>Injecting Module:</strong>
                </p>
                <p>
                    The pivot table features are segregated into individual modules.
                    To enable conditional formatting, inject
                    <code> ConditionalFormatting</code> module using the
                    <code> services</code> tag.
                </p><br />
                <p>
                    More information on the conditional formatting can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/conditional-formatting">
                    documentation section</a>.
                </p>
            </div>
        </div>
    );
}

export default ConditionalFormattingClass;