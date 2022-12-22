/**
 * Legend sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    TreeMapComponent, LegendMode, Inject, TreeMapLegend, TreeMapTooltip, LegendPosition,
    ILoadedEventArgs, TreeMapTheme
} from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import * as data from './treemap-data/election-data.json';
import { IResizeEventArgs } from "@syncfusion/ej2-charts";
let datasource: any = data as any;
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function Legend() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let treemapInstance: TreeMapComponent;
    let legendElement: DropDownListComponent;
    let legendPositionElement: DropDownListComponent;
    // Code for Property Panel
    let droplist: { [key: string]: Object }[] = [
        { text: 'Default', value: 'Default' },
        { text: 'Interactive', value: 'Interactive' },
    ];

    let positionList: { [key: string]: Object }[] = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' },
        { text: 'Left', value: 'Left' },
        { text: 'Right', value: 'Right' },
        { text: 'Auto', value: 'Auto' }
    ];

    function legendChange() {
        treemapInstance.legendSettings.mode = legendElement.value as LegendMode;
        if (legendElement.value === 'Interactive') {
            if (treemapInstance.legendSettings.orientation === 'Horizontal' || treemapInstance.legendSettings.orientation === 'None') {
                treemapInstance.legendSettings.height = '10';
                treemapInstance.legendSettings.width = '';
            } else {
                treemapInstance.legendSettings.height = '70%';
                treemapInstance.legendSettings.width = '10';
            }
        } else {
            treemapInstance.legendSettings.height = '';
            treemapInstance.legendSettings.width = '';
        }
        treemapInstance.refresh();
    }

    function legendPositionChange() {
        treemapInstance.legendSettings.position = legendPositionElement.value as LegendPosition;
        if (legendPositionElement.value === 'Left' || legendPositionElement.value === 'Right') {
            treemapInstance.legendSettings.orientation = 'Vertical';
            if (treemapInstance.legendSettings.mode === 'Interactive') {
                treemapInstance.legendSettings.height = '70%';
                treemapInstance.legendSettings.width = '10';
            } else {
                treemapInstance.legendSettings.height = '';
                treemapInstance.legendSettings.width = '';
            }
        } else if (legendPositionElement.value === 'Auto') {
            if (treemapInstance.availableSize.width > treemapInstance.availableSize.height) {
                treemapInstance.legendSettings.orientation = 'Vertical';
                if (treemapInstance.legendSettings.mode === 'Interactive') {
                    treemapInstance.legendSettings.height = '70%';
                    treemapInstance.legendSettings.width = '10';
                } else {
                    treemapInstance.legendSettings.height = '';
                    treemapInstance.legendSettings.width = '';
                }
            } else {
                treemapInstance.legendSettings.orientation = 'Horizontal';
                if (treemapInstance.legendSettings.mode === 'Interactive') {
                    treemapInstance.legendSettings.height = '10';
                    treemapInstance.legendSettings.width = '';
                } else {
                    treemapInstance.legendSettings.height = '';
                    treemapInstance.legendSettings.width = '';
                }
            }
        }
        else {
            treemapInstance.legendSettings.orientation = 'Horizontal';
            if (treemapInstance.legendSettings.mode === 'Interactive') {
                treemapInstance.legendSettings.height = '10';
                treemapInstance.legendSettings.width = '';
            }
        }
        treemapInstance.refresh();
    }

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as TreeMapTheme;
        // custom code end
    }

    function resize(args: IResizeEventArgs): void {
        if (args.currentSize.width > args.currentSize.height && treemapInstance.legendSettings.position === 'Auto') {
            treemapInstance.legendSettings.orientation = 'Vertical';
            if (treemapInstance.legendSettings.mode === 'Interactive') {
                treemapInstance.legendSettings.height = '70%';
                treemapInstance.legendSettings.width = '10';
            } else {
                treemapInstance.legendSettings.height = '';
                treemapInstance.legendSettings.width = '';
            }
        } else if (legendPositionElement.value === 'Auto') {
            if (treemapInstance.availableSize.width > treemapInstance.availableSize.height) {
                treemapInstance.legendSettings.orientation = 'Vertical';
                if (treemapInstance.legendSettings.mode === 'Interactive') {
                    treemapInstance.legendSettings.height = '70%';
                    treemapInstance.legendSettings.width = '10';
                } else {
                    treemapInstance.legendSettings.height = '';
                    treemapInstance.legendSettings.width = '';
                }
            } else {
                treemapInstance.legendSettings.orientation = 'Horizontal';
                if (treemapInstance.legendSettings.mode === 'Interactive') {
                    treemapInstance.legendSettings.height = '10';
                    treemapInstance.legendSettings.width = '';
                } else {
                    treemapInstance.legendSettings.height = '';
                    treemapInstance.legendSettings.width = '';
                }
            }
        }
    }


    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className='col-md-9'>
                    <TreeMapComponent load={load.bind(this)} id='treemap-container' ref={m => treemapInstance = m}
                        titleSettings={{			//To config title for treemap
                            text: 'US presidential election result - 2016',
                            textStyle: { size: '15px' }
                        }}
                        dataSource={datasource.election}
                        weightValuePath='Population'
                        tooltipSettings={{			// To config tooltip for treemap
                            visible: true,
                            format: ' <b>${Winner}</b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %'
                        }}
                        legendSettings={{			// To config legend for treemap
                            visible: true,
                            position: 'Top',
                            shape: 'Rectangle',
                            height: '10'
                        }}
                        format={"n"}
                        useGroupingSeparator={true}
                        rangeColorValuePath='WinPercentage'
                        equalColorValuePath='Winner'
                        leafItemSettings={{			// To config leafitem customization for treemap
                            labelPath: 'State',
                            fill: '#6699cc',
                            border: { color: 'white', width: 0.5 },
                            colorMapping: [
                                {
                                    value: 'Trump', color: '#D84444'
                                },
                                {
                                    value: 'Clinton', color: '#316DB5'
                                }
                            ]
                        }}>
                        <Inject services={[TreeMapLegend, TreeMapTooltip]} />
                    </TreeMapComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source:
                        <a href=" https://en.wikipedia.org/wiki/United_States_presidential_election,_2016" target="_blank">en.wikipedia.org</a>
                    </div>
                </div>
                {/* Property Panel */}
                <div className='col-md-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                            <tr>
                                <td style={{ paddingTop: '15px', width: '30%' }}>
                                    <div style={{ paddingLeft: '0px' }}>Type</div>
                                </td>
                                <td style={{ paddingTop: '15px' }}>
                                    <div>
                                        <DropDownListComponent id="legendmode" width="100%" index={0} change={legendChange.bind(this)} ref={d => legendElement = d} dataSource={droplist} fields={{ text: 'text', value: 'value' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '30%' }}>
                                    <div style={{ paddingLeft: '0px' }}>Position</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="legendPosition" width="100%" index={0} change={legendPositionChange.bind(this)} ref={d => legendPositionElement = d} dataSource={positionList} fields={{ text: 'text', value: 'value' }} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the 2016 United States presidential election results. The type and position of the legends can be changed using the Type and Position options in the properties panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see the type of legend available in TreeMap. The equal color mapping is applied based on certain value.
                    <br /><br />
                    The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
                </p>
                <br />
                <p className='description-header'>Injecting Module</p>
                <p>
                    The TreeMap component features are segregated into individual  modules by feature. To use a legend, inject the <code>Legend</code> module using the <code>TreeMap.Inject(TreeMapLegend)</code> method.
                </p>
            </div>
        </div>
    )
}
export default Legend;