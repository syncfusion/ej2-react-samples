import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, PivotFieldListComponent, Inject, CalculatedField, PivotChart, Toolbar, PivotActionBeginEventArgs, FieldList } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { Browser, setStyleAttribute, enableRipple } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { Switch } from '@syncfusion/ej2-buttons';

/**
 * Pivot Chart Field List default sample
 */

const SAMPLE_CSS = `
#PivotViewcontainerwrapper {
    height: auto !important;
}

.e-bigger .e-tbar-btn .tb-icons {
    font-size: 20px;
}

.e-tbar-btn .tb-icons {
    font-family: 'e-icons';
    speak: none;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
}

.e-tbar-menu-icon:before {
    content: "\e725";
}

#layout_switch {
    align-items: center;
    display: flex;
    gap: 10px;
}

.label_option {
    margin-bottom: unset;
}

.toolbar-temp {
    margin-left: 10px;
}

.display_label {
    margin-right: 10px;
}

#pivot_sidebar .e-sidebar.e-right {
    border-left: unset !important;
}

.default-sidebar {
    width: 35% !important;
}

.e-bigger .default-sidebar {
    width: 0% !important;
}

#defaultToolbar .sb-icons {
    font-size: 20px !important;
}

.pivot-fieldList{
    display: none !important;
}`;
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let displayOptionDropDown: DropDownList;
let primaryViewDropDown: DropDownList;
let sideObj: SidebarComponent;
let toolbarObj: ToolbarComponent;
let displayOption = 'Both';
let preference = 'Chart';
let dataSourceSettings: IDataOptions = {
    dataSource: Pivot_Data,
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

function PivotChartFieldList () {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
        setTimeout(() => {
            if (pivotObj) {
                if (Browser.isDevice) {
                    sideObj.isOpen = false;
                    toolbarObj.items[3].prefixIcon = 'sb-icons sb-icon-Next pivot-fieldList';
                    pivotObj.toolbar = ['Grid', 'Chart',  'FieldList'];
                }
                pivotObj.layoutRefresh();
            }
        }, 700);
    }, [])

    let fieldlistObj: PivotFieldListComponent;
    let pivotObj: PivotViewComponent;
    let isInitial = false;
    let isChecked = true;
    let toolbarOptions: any = ['Grid', 'Chart'];
    let toolbarItems: any = [
      {
        template: '<div class="toolbar-template" id="layout_switch"><label for="toolbar-switch" class="label_option">Show/hide Toolbar:</label><div id="toolbar-switch"></div></div>',
        id: 'layout'
      },
      {
        template: '<div class="toolbar-template toolbar-temp"><label class="label_option display_label">Display Option:</label><select id="displayOptionddl" name="ddl-display-option"><option value="Both">Both</option><option value="Table">Table</option><option value="Chart">Chart</option></select></div>',
        id: 'display'
      },
      {
        template: '<div class="toolbar-template toolbar-temp"><label class="label_option display_label">Primary View:</label><select id="primaryViewddl" name="ddl-primary-view"><option value="Table">Table</option><option value="Chart">Chart</option></select></div>',
        id: 'preference'
      },
      { prefixIcon: "sb-icons sb-icon-Next", id: 'fieldlist', tooltipText: "Collapse FieldList", align: 'Right' },
    ];

    function afterPopulate(): void {
        if (fieldlistObj && pivotObj) {
            fieldlistObj.updateView(pivotObj);
        }
    }
    function afterPivotPopulate(): void {
        if (!Browser.isDevice && fieldlistObj && pivotObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function actionBegin(args: PivotActionBeginEventArgs): void {
        if (args.actionName == "Show table view") {
            primaryViewDropDown.value = 'Table';
        } else if (args.actionName == "Show chart view") {
            primaryViewDropDown.value = 'Chart';
        }
    }
    function rendereComplete(): void {
        if (fieldlistObj) {
            fieldlistObj.updateView(pivotObj);
            fieldlistObj.update(pivotObj);
        }
    }
    function onPivotDataBound(): void {
        if (pivotObj && document.getElementById('displayOptionddl') && document.getElementById('displayOptionddl') && document.getElementById('toolbar-switch') && !isInitial) {
            isInitial = true;
            displayOptionDropDown = new DropDownList({
                floatLabelType: 'Auto',
                width: 100,
                value: displayOption,
                change: (args: any) => {
                    displayOption = args.value;
                    if (args.value !== 'Both') {
                        primaryViewDropDown.readonly = true;
                        pivotObj.displayOption = { view: args.value as any };
                    } else if (args.value == 'Both') {
                        primaryViewDropDown.readonly = false;
                        pivotObj.displayOption = {
                            view: args.value,
                            primary: primaryViewDropDown.value as any,
                        };
                    }
                    pivotObj.refresh();
                }
            });
            displayOptionDropDown.appendTo('#displayOptionddl');
            primaryViewDropDown = new DropDownList({
                floatLabelType: 'Auto',
                width: 100,
                value: preference,
                change: (args: any) => {
                    preference = args.value;
                    if (pivotObj.displayOption.view == 'Both') {
                        pivotObj.displayOption = { view: 'Both', primary: args.value as any };
                        pivotObj.refresh();
                    }
                }
            });
            primaryViewDropDown.appendTo('#primaryViewddl');
            let layoutSwitch = new Switch({
                checked: isChecked,
                cssClass: 'pivot-toolbar-switch',
                change: (args: any) => {
                    isChecked = args.checked;
                    pivotObj.showToolbar = !pivotObj.showToolbar;
                    pivotObj.refresh();
                }
            });
            layoutSwitch.appendTo('#toolbar-switch');
        }
    }
    function onDataBound(): void {
        if (pivotObj) {
            if (Browser.isDevice) {
                pivotObj.element.style.width = '100%';
                pivotObj.allowCalculatedField = true;
                pivotObj.showFieldList = true;
            }
            pivotObj.tooltip.destroy();
            pivotObj.refresh();
        }
    }
    function onLoad(): void {
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
    function ToolbarCliked(args: any): void {
        if (args.item.id == 'fieldlist') {
            sideObj.toggle();
            toolbarObj.items[3].prefixIcon = sideObj.isOpen ? 'sb-icons sb-icon-Next' : 'sb-icons sb-icon-Previous';
            toolbarObj.items[3].tooltipText = sideObj.isOpen ? 'Collapse FieldList' : 'Expand FieldList';
        }
        if (Browser.isDevice) {
            sideObj.isOpen = false;
            toolbarObj.items[3].prefixIcon = 'sb-icons sb-icon-Next pivot-fieldList';
        }
    }
    function beforeCreate(): void {
        if (pivotObj) {
            isInitial = false;
            pivotObj.layoutRefresh();
        }
    }
    function onChange(): void {
        if (!sideObj.isOpen) {
            document.getElementById('pivot_container').style.width = '100%';
        } else {
            document.getElementById('pivot_container').style.width = '64%';
        }
        setTimeout(() => {
            if (pivotObj) {
                pivotObj.layoutRefresh();
            }
        }, 700);
    }
    function chartOnLoad(args: ILoadedEventArgs): void {
        let selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }

    return (
        <div className="control-pane">
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section" style={{ overflow: 'auto' }}>
                <div style={{ width: '100%'}}>
                    <ToolbarComponent
                        ref={d => toolbarObj = d}
                        id="defaultToolbar"
                        height="50px"
                        clicked={ToolbarCliked}
                        items={toolbarItems}
                        beforeCreate={() => beforeCreate()}
                    ></ToolbarComponent>
                </div>
                <div id='pivot_sidebar' className='maincontent' style={{ width: '100%', height: '720px'}}>
                    <div id='pivot_container' style={{ width: '64%'}}>
                        <PivotViewComponent id='PivotView' ref={d => pivotObj = d} enginePopulated={afterPivotPopulate.bind(this)} actionBegin={actionBegin.bind(this)} dataBound={onPivotDataBound} width={'100%'} height={'350'} gridSettings={{ columnWidth: 140 }}
                        chartSettings={{ title: 'Sales Analysis', chartSeries: { type: 'Column' }, load: chartOnLoad.bind(this) }} displayOption={{ view: 'Both', primary: 'Chart' }} toolbar={toolbarOptions} showToolbar={true}>
                            <Inject services={[PivotChart, Toolbar, FieldList]} />
                        </PivotViewComponent>
                    </div>
                </div>
                <aside>
                    <SidebarComponent
                        ref={d => sideObj = d}
                        height={'100%'}
                        id='defaultSidebar'
                        className='default-sidebar'
                        target=".maincontent"
                        type="Auto"
                        isOpen={true}
                        position="Right"
                        enableGestures={false}
                        change={() => onChange()}
                    >
                        <PivotFieldListComponent id='PivotFieldList' ref={d => fieldlistObj = d} enginePopulated={afterPopulate.bind(this)} dataSourceSettings={dataSourceSettings} renderMode={"Fixed"} allowCalculatedField={true} enableFieldSearching={true} load={onLoad} dataBound={onDataBound}>
                            <Inject services={[CalculatedField]} />
                        </PivotFieldListComponent>
                    </SidebarComponent>
                </aside>
            </div>
            <div id="action-description">
                <p>This sample demonstrates rendering a pivot table and pivot chart along with the Excel-like field list feature. It
                    also provides interactive controls to toggle the toolbar and dynamically switch between different display modes.
                </p>
            </div>
            <div id="description">
                <p>
                    This example showcases the Syncfusion Pivot Table component alongside a Pivot Chart and a field list rendered
                    statically within a sidebar layout. The static field list allows users to configure and customize the report by
                    dragging and dropping fields into the appropriate sections such as rows, columns, values, and filters—without
                    relying on a popup interface. This enhances accessibility and usability, especially in wide-screen or dashboard
                    environments.
                </p>
                <p>
                    The Pivot Table component supports three display modes, which are implemented in this sample and can be
                    configurable using the <a target="_blank" 
                    href="https://ej2.syncfusion.com/react/documentation/api/pivotview/displayOptionModel/#view">displayOption.view</a> property:
                </p>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Table :</code>
                            </td>
                            <td>Displays only the pivot table (default).</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Chart :</code>
                            </td>
                            <td>Displays only the pivot chart.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Both :</code>
                            </td>
                            <td>Displays both the pivot table and pivot chart.</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <p>
                    A <strong>Primary View</strong> dropdown lets users choose whether to prioritize the chart or table when both
                    are shown.</p>
                <p>
                    Additionally, the <strong>Show/Hide Toolbar</strong> toggle controls the visibility of the built-in toolbar,
                    which includes
                    options for switching views and chart types.</p><br />
                <p>
                    <strong>Injecting Module:</strong>
                </p>
                <p>
                    The pivot table features are segregated into individual modules. To take advantage of chart and toolbar support, we need
                    to inject the
                                <code> PivotChart</code> module and <code> Toolbar</code> module into the
                                <code> services</code>.
                </p><br />
                <p>
                    More information on the pivot chart can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/pivot-chart">
                        documentation section</a>.
                </p>
            </div>
        </div>
    );
}

export default PivotChartFieldList;