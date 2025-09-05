import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Browser, setStyleAttribute } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { PivotViewComponent, IDataOptions, IDataSet, PivotFieldListComponent, Inject, CalculatedField, PivotChart, Toolbar, PivotActionBeginEventArgs, FieldList } from '@syncfusion/ej2-react-pivotview';
import { SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { Switch } from '@syncfusion/ej2-buttons';

/**
 * Pivot Field List default sample
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

export class PivotChartFieldList extends SampleBase<{}, {}> {
    public fieldlistObj: PivotFieldListComponent;
    public pivotObj: PivotViewComponent;
    public sideObj: SidebarComponent;
    public toolbarObj: ToolbarComponent;
    public isInitial = false;
    public isChecked = true;
    public toolbarOptions: any = ['Grid', 'Chart'];
    public toolbarItems: any = [
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

    componentDidMount() {
        setTimeout(() => {
            if(this.pivotObj) {
                if (Browser.isDevice) {
                    this.sideObj.isOpen = false;
                    this.toolbarObj.items[3].prefixIcon = 'sb-icons sb-icon-Next pivot-fieldList';
                    this.pivotObj.toolbar = ['Grid', 'Chart', 'FieldList'];
                }
                this.pivotObj.layoutRefresh();
            }
        }, 700);
    }
    afterPopulate(): void {
        if (this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
    }
    afterPivotPopulate(): void {
        if (!Browser.isDevice && this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.update(this.pivotObj);
        }
    }
    actionBegin(args: PivotActionBeginEventArgs): void {
        if (args.actionName == "Show table view") {
            primaryViewDropDown.value = 'Table';
        } else if (args.actionName == "Show chart view") {
            primaryViewDropDown.value = 'Chart';
        }
    }
    rendereComplete(): void {
        this.fieldlistObj.updateView(this.pivotObj);
        this.fieldlistObj.update(this.pivotObj);
    }
    onPivotDataBound(): void {
        if (this.pivotObj && document.getElementById('displayOptionddl') && document.getElementById('displayOptionddl') && document.getElementById('toolbar-switch') && !this.isInitial) {
            this.isInitial = true;
            displayOptionDropDown = new DropDownList({
                floatLabelType: 'Auto',
                width: 100,
                value: displayOption,
                change: (args: any) => {
                    displayOption = args.value;
                    if (args.value !== 'Both') {
                         primaryViewDropDown.readonly = true;
                        this.pivotObj.displayOption = { view: args.value as any };
                    } else if (args.value == 'Both') {
                        primaryViewDropDown.readonly = false;
                        this.pivotObj.displayOption = {
                            view: args.value,
                            primary: primaryViewDropDown.value as any,
                        };
                    }
                    this.pivotObj.refresh();
                }
            });
            displayOptionDropDown.appendTo('#displayOptionddl');
            primaryViewDropDown = new DropDownList({
                floatLabelType: 'Auto',
                width: 100,
                value: preference,
                change: (args: any) => {
                    preference = args.value;
                    if (this.pivotObj.displayOption.view == 'Both') {
                        this.pivotObj.displayOption = { view: 'Both', primary: args.value as any };
                        this.pivotObj.refresh();
                    }
                }
            });
            primaryViewDropDown.appendTo('#primaryViewddl');
            let layoutSwitch = new Switch({
                checked: this.isChecked,
                cssClass: 'pivot-toolbar-switch',
                change: (args: any) => {
                    this.isChecked = args.checked;
                    this.pivotObj.showToolbar = !this.pivotObj.showToolbar;
                    this.pivotObj.refresh();
                }
            });
            layoutSwitch.appendTo('#toolbar-switch');
        }
    }
    onDataBound(): void {
        if (this.pivotObj) {
            if (Browser.isDevice) {
                this.pivotObj.element.style.width = '100%';
                this.pivotObj.allowCalculatedField = true;
                this.pivotObj.showFieldList = true;
            }
            this.pivotObj.tooltip.destroy();
            this.pivotObj.refresh();
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
    ToolbarCliked(args: any): void {
        if (args.item.id == 'fieldlist') {
            this.sideObj.toggle();
            this.toolbarObj.items[3].prefixIcon = this.sideObj.isOpen ? 'sb-icons sb-icon-Next' : 'sb-icons sb-icon-Previous';
            this.toolbarObj.items[3].tooltipText = this.sideObj.isOpen ? 'Collapse FieldList' : 'Expand FieldList';
        }
        if (Browser.isDevice) {
            this.sideObj.isOpen = false;
            this.toolbarObj.items[3].prefixIcon = 'sb-icons sb-icon-Next pivot-fieldList';
        }
    }
    beforeCreate(): void {
        if (this.pivotObj) {
            this.isInitial = false;
            this.pivotObj.layoutRefresh();
        }
    }
    onChange(): void {
        if (!this.sideObj.isOpen) {
            document.getElementById('pivot_container').style.width = '100%';
        } else {
            document.getElementById('pivot_container').style.width = '64%';
        }
        setTimeout(() => {
            this.pivotObj.layoutRefresh();
        }, 700);
    }
    chartOnLoad(args: ILoadedEventArgs): void {
        let selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }

    render() {
        return (
            <div className="control-pane">
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section" style={{ overflow: 'auto' }}>
                    <div style={{ width: '100%'}}>
                        <ToolbarComponent
                            id="defaultToolbar"
                            ref={d => this.toolbarObj = d}
                            height="50px"
                            clicked={this.ToolbarCliked}
                            items={this.toolbarItems}
                            beforeCreate={() => this.beforeCreate()}
                        ></ToolbarComponent>
                    </div>
                    <div id='pivot_sidebar' className='maincontent' style={{ width: '100%', height: '720px'}}>
                         <div id='pivot_container' style={{ width: '64%'}}>
                            <PivotViewComponent id='PivotView' ref={d => this.pivotObj = d} enginePopulated={this.afterPivotPopulate.bind(this)} actionBegin={this.actionBegin.bind(this)} dataBound={this.onPivotDataBound} width={'100%'} height={'350'} gridSettings={{ columnWidth: 140 }}
                            chartSettings={{ title: 'Sales Analysis', chartSeries: { type: 'Column' }, load: this.chartOnLoad.bind(this) }} displayOption={{ view: 'Both', primary: 'Chart' }} toolbar={this.toolbarOptions} showToolbar={true}>
                            <Inject services={[PivotChart, Toolbar, FieldList]} />
                            </PivotViewComponent>
                         </div>
                    </div>
                    <aside>
                        <SidebarComponent
                            ref={d => this.sideObj = d}
                            height={'100%'}
                            id='defaultSidebar'
                            className='default-sidebar'
                            target=".maincontent"
                            type="Auto"
                            isOpen={true}
                            position="Right"
                            enableGestures={false}
                            change={() => this.onChange()}
                        >
                            <PivotFieldListComponent id='PivotFieldList' ref={d => this.fieldlistObj = d} enginePopulated={this.afterPopulate.bind(this)} dataSourceSettings={dataSourceSettings} renderMode={"Fixed"} allowCalculatedField={true} enableFieldSearching={true} load={this.onLoad} dataBound={this.onDataBound}>
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
}