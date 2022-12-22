/**
 * Drilldown sample for treemap
 */
import * as React from "react";
import {
    TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapTooltip, TreeMapAjax,
    ILoadedEventArgs, TreeMapTheme, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs
} from '@syncfusion/ej2-react-treemap';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { Alignment } from "@syncfusion/ej2-charts";
import * as data from './treemap-data/drilldown-sample.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
         }`;

function Drilldown() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let treemapInstance: TreeMapComponent;
    let nameElement: HTMLInputElement;
    let headerElement: DropDownListComponent;
    let labelElement: DropDownListComponent;
    let breadCrumbElement: CheckBoxComponent;
    let drillviewElement: CheckBoxComponent;
    function drillViewChange(args: ChangeEventArgs) {
        let value: boolean = args.checked;
        treemapInstance.drillDownView = value;
        treemapInstance.refresh();
    }
    function breadCrumbChange(args: ChangeEventArgs) {
        let value: boolean = args.checked;
        treemapInstance.enableBreadcrumb = value;
        treemapInstance.refresh();
    }
    function breadCrumbTextChange(args: ChangeEventArgs) {
        let value: string = (document.getElementById('breadCrumbText') as HTMLInputElement).value;
        treemapInstance.breadcrumbConnector = value;
        treemapInstance.refresh();
    }
    function headerChange() {
        for (let i = 0; i < treemapInstance.levels.length - 1; i++) {
            treemapInstance.levels[i].headerAlignment = headerElement.value as Alignment;
        }
        treemapInstance.refresh();
    }
    function labelChange() {
        treemapInstance.levels[2].headerAlignment = labelElement.value as Alignment;
        treemapInstance.refresh();
    }
    let headerAlign: { [key: string]: Object }[] = [
        { text: 'Near', value: 'Near' },
        { text: 'Far', value: 'Far' },
        { text: 'Center', value: 'Center' }
    ];
    let labelAlign: { [key: string]: Object }[] = [
        { text: 'Near', value: 'Near' },
        { text: 'Far', value: 'Far' },
        { text: 'Center', value: 'Center' }
    ];
    function load(args: ILoadedEventArgs): void {
        //custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as TreeMapTheme;
        // custom code end
    }
    /* tslint:disable:no-string-literal */
    function drillStart(args: IDrillStartEventArgs): void {
        if (args.item[Object.keys(args.item)[0]].length === 1) {
            args.treemap.levels[2].showHeader = true;
        } else {
            args.treemap.levels[2].showHeader = false;
        }
    }

    function tooltipRendering(args: ITreeMapTooltipRenderEventArgs): void {
        if (args.item['groupIndex'] !== 2) {
            args.cancel = true;
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className='col-md-9'>
                    <TreeMapComponent drillStart={drillStart.bind(this)} tooltipRendering={tooltipRendering.bind(this)} load={load.bind(this)} id='treemap-container'
                        ref={m => treemapInstance = m}
                        palette={['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66']}
                        titleSettings={{			//To config title for treemap
                            text: 'List of countries by population',
                            textStyle: { size: '15px' }
                        }}
                        enableDrillDown={true}
                        format={"n"}
                        useGroupingSeparator={true}
                        dataSource={datasource.drilldown}
                        weightValuePath='Population'
                        tooltipSettings={{			// To config tooltip for treemap
                            visible: true,
                            format: '${Name} : ${Population}'
                        }}
                        leafItemSettings={{         // To config leafitem customization for treemap
                            labelPath: 'Name',
                            showLabels: false,
                            labelStyle: { size: '0px' },
                            border: { color: 'black', width: 0.5 }
                        }}>
                        <Inject services={[TreeMapTooltip]} />
                        <LevelsDirective>
                            <LevelDirective groupPath='Continent' fill='#336699' border={{ color: 'black', width: 0.5 }} />
                            <LevelDirective groupPath='States' fill='#336699' border={{ color: 'black', width: 0.5 }} />
                            <LevelDirective groupPath='Region' showHeader={true} fill='#336699' border={{ color: 'black', width: 0.5 }} />
                        </LevelsDirective>
                    </TreeMapComponent>
                </div>
                {/* Property Panel */}
                <div className='col-md-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ paddingLeft: '0px' }}>Drill Down View</div>
                                </td>
                                <td>
                                    <div style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                                        <CheckBoxComponent id='drillView' checked={false} change={drillViewChange.bind(this)} ref={d => drillviewElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ paddingLeft: '0px' }}>Enable Bread Crumb</div>
                                </td>
                                <td>
                                    <div style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                                        <CheckBoxComponent id='breadCrumb' checked={false} change={breadCrumbChange.bind(this)} ref={d => breadCrumbElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ paddingLeft: '0px' }}>Bread Crumb Text</div>
                                </td>
                                <td>
                                    <div style={{ marginLeft: '10px' }} >
                                        <input id="breadCrumbText" ref={d => nameElement = d} type='text' defaultValue=' - ' style={{ width: '100%' }} onChange={breadCrumbTextChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ paddingLeft: '0px' }}>Header Alignment</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="header" width="100%" index={0} dataSource={headerAlign} fields={{ text: 'text', value: 'value' }} change={headerChange.bind(this)} ref={d => headerElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ paddingLeft: '0px' }}>Label Alignment</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="label" width="100%" index={0} dataSource={labelAlign} fields={{ text: 'text', value: 'value' }} change={labelChange.bind(this)} ref={d => labelElement = d} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div style={{ float: 'right', marginRight: '10px' }}>Source:
                <a href="https://en.wikipedia.org/wiki/List_of_continents_by_population" target="_blank">en.wikipedia.org</a>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates drill-down with the continents at the top level followed by regions and countries. By clicking a continent, you can view all the countries available in that continent clearly. Customizations can be done in the treemap, by using the options in the properties panel
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a TreeMap with multiple items and drill it further. Change the drill down view and enable the breadcrumb using the options available in the properties panel.
                </p>
                <p>
                    The tooltip is enabled in this example.
                    To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices.
                </p>
            </div>
        </div>
    )
}
export default Drilldown;