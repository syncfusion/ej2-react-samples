import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
import * as data from './data.json';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}
#source{
    float: right; margin-right: 10p
}`;
// custom code end
/**
 * Schedule Default sample
 */
export class BubbleTypes extends SampleBase<{}, {}> {
    private heatmap: HeatMapComponent;
    private dropElement: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Size' },
        { value: 'Color' },
        { value: 'Sector' }
    ];
    private change(e: Event): void {
        let type: any = document.getElementById('LegendPosition');
        this.heatmap.cellSettings.bubbleType = type.value;
        this.heatmap.refresh();
    }
    render() {
        return (
            <div>
                <div className='col-md-9 control-section'>
                    {/* custom code start */}
                    <style>
                        {SAMPLE_CSS}
                    </style>
                    {/* custom code end */}
                    <HeatMapComponent id='heatmap-container' ref={t => this.heatmap = t}
                        titleSettings={{
                            text: 'Female Participation Rate in Labor Force for the Countries',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'Segoe UI'
                            }
                        }}
                        xAxis={{
                            labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
                            labelRotation: 45,
                            labelIntersectAction: 'None'
                        }}
                        yAxis={{
                            labels: ['1995', '2000', '2005', '2010', '2015']
                        }}
                        dataSource={(data as any).tableBubbleData}
                        cellSettings={{
                            border: {
                                width: 1
                            },
                            showLabel: false,
                            tileType: 'Bubble',
                            bubbleType: 'Size'
                        }}
                        tooltipRender={this.legendTooltip}
                        paletteSettings={{
                            palette: [{ value: 35, color: '#50A3B1' },
                            { value: 45, color: '#78D1BD' },
                            { value: 55, color: '#CAE8B4' },
                            { value: 65, color: '#EDF8B6' },
                            { value: 78, color: '#FFFFDA' }
                            ],
                        }}
                        load={this.load.bind(this)}
                        legendSettings={{
                            visible: true,
                        }}>
                        <Inject services={[Legend, Tooltip]} />
                    </HeatMapComponent>
                    <div id="source">Source:
                        <a href="https://data.worldbank.org" target='_blank'>https://data.worldbank.org/</a>
                    </div>
                </div>
                <div className="col-md-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <div>Bubble Type:</div>
                                    </td>
                                    <td style={{ width: '60%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="LegendPosition" change={this.change.bind(this)}
                                                ref={d => this.dropElement = d} dataSource={this.droplist}
                                                fields={{ text: 'value', value: 'value' }} text="Size" value="Size" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the female participation rate of the total female population in the country’s work force. In Bubble Heatmap, the data points can be visualized using bubble size, bubble shade and sector view types. In property panel, the options are available to change the view of the data points in the bubble Heatmap by means of dropdown.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to display the data points in bubble heatmap using multiple views such as bubble size, bubble shade and the sector. You can change the cell type to bubble by using the <code>tileType</code> property in <code>cellSettings</code>, and you can change the view of the bubble heatmap by using the bubbleType property in cellSettings.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are segregated into individual feature-wise modules. To use a tooltip,
                        inject the <code>Tooltip </code>  module using the <code>Heatmap.Inject(Tooltip) </code> method, and use a
                        legend by injecting the <code>Legend </code>  module using the <code>Heatmap.Inject(Legend) </code>  method.
                    </p>
                </div>
            </div >
        );
    }

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as HeatMapTheme;
    };
    private legendTooltip(args: ITooltipEventArgs): void {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + ' %'];
    };
}
