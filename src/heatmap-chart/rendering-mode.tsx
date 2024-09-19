import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './render-mode-data.json';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { RadioButtonComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}
#source{
    float: right; margin-right: 10p
}`;
// custom code end
export class RenderMode extends SampleBase<{}, {}> {
    private heatmap: HeatMapComponent;
    private svg(args: ChangeEventArgs): void {
        this.heatmap.renderingMode = 'SVG';
        this.heatmap.dataBind();
    }
    private canvas(args: ChangeEventArgs): void {
        this.heatmap.renderingMode = 'Canvas';
        this.heatmap.dataBind();
    }
    render() {
        return (
            <main><div>
                <div className='col-md-9 control-section'>
                    {/* custom code start */}
                    <style>
                        {SAMPLE_CSS}
                    </style>
                    {/* custom code end */}
                        <HeatMapComponent id='heatmap-container' ref={t => this.heatmap = t}
                            titleSettings={{
                                text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
                                textStyle: {
                                    size: '15px',
                                    fontWeight: '500',
                                    fontStyle: 'Normal',
                                    fontFamily: 'inherit'
                                }
                            }}
                            xAxis={{
                                labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland',
                                    'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
                                labelRotation: -90,
                                labelIntersectAction: 'None',
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            yAxis={{
                                labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                                    '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            dataSource={(data as any).renderModeData}
                            paletteSettings={{
                                palette: [{ color: '#C06C84' },
                                { color: '#355C7D' }
                                ],
                            }}
                            renderingMode={'SVG'}
                            cellSettings={{
                                border: {
                                    width: 0
                                },
                                showLabel: false,
                                format: '{value} %'
                            }}
                            tooltipSettings={{
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            load={this.load.bind(this)}
                            legendSettings={{
                                position: 'Bottom',
                                width: '200px',
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}>
                            <Inject services={[Legend, Tooltip]} />
                        </HeatMapComponent>
                </div>
                <div className="col-md-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: -10 }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Rendering Mode:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div className='row'>
                                            <RadioButtonComponent id='svg' checked={true} label='SVG' name='renderingmode'
                                                value="SVG" change={this.svg.bind(this)}></RadioButtonComponent>
                                        </div>
                                        <div className='row'>
                                            <RadioButtonComponent id='canvas' label='Canvas' name='renderingmode'
                                                value="Canvas" change={this.canvas.bind(this)}></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div >
                <section id="action-description" aria-label="Description of HeatMap sample">
                    <p>
                        This sample visualizes the net migration rate for the northern European countries over the years. The data label
                        is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are
                        available to change the rendering mode between Canvas and SVG means of radio button.
                    </p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                        In this example, you can see how to change the rendering mode between <code>Canvas</code> and <code>SVG</code> types in Heatmap. You can change the rendering mode using the <a href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/rendering-mode" target="_blank">renderingMode</a> property.
                    </p>
                    <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                            Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                    </p>
                </section>
            </main>
        );
    }

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as HeatMapTheme;
        // custom code end
    };
}
