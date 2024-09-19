import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-react-heatmap';
import { ITooltipEventArgs, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './default-table-data-source.json';
import { SampleBase } from '../common/sample-base';

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}
#source{
    float: right; margin-right: 10p
}`;
// custom code end
export class TooltipTemplate extends SampleBase<{}, {}> {
    render() {
        return (
            <main><div className='control-pane'>
                {/* custom code start */}
                <style>
                    {SAMPLE_CSS}
                </style>
                {/* custom code end */}
                <div className='control-section'>
                    <HeatMapComponent id='heatmap-container'
                        titleSettings={{
                            text: 'Crude Oil Production of Non-OPEC Countries (in Million barrels per day)',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }}
                        xAxis={{
                            labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA'],
                            labelRotation: 45,
                            labelIntersectAction: 'None',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        yAxis={{
                            labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        dataSource={(data as any).defaultTableDataSource}
                        cellSettings={{
                            border: {
                                width: 0
                            },
                            format: '{value} M',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        legendSettings={{
                            visible: false,
                        }}
                        tooltipSettings= {{
                            fill: '#265259',
                            textStyle: {
                                color: '#FFFFFF',
                                size:"12px",
                                fontFamily: 'inherit'
                            },
                            border:{
                                width:1,
                                color:"#98BABF"
                            }               
                        }}
                
                        paletteSettings={{
                            palette: [{ value: 0, color: '#C2E7EC' },
                            { value: 0.6, color: '#AEDFE6' },
                            { value: 0.75, color: '#9AD7E0' },
                            { value: 1, color: '#86CFDA' },
                            { value: 1.5, color: '#72C7D4' },
                            { value: 2, color: '#5EBFCE' },
                            { value: 2.5, color: '#4AB7C8' },
                            { value: 3, color: '#36AFC2' },
                            { value: 3.5, color: '#309DAE' },
                            { value: 5, color: '#2B8C9B' },
                            { value: 5.5, color: '#257A87' },
                            { value: 6, color: '#206974' },
                            { value: 8, color: '#1B5761' },
                            { value: 9, color: '#15464D' },
                            { value: 9.5, color: '#000000' },
                            ],
                            type: 'Fixed'
                        }}
                        load={this.load.bind(this)}>
                        <Inject services={[Legend, Tooltip]} />
                    </HeatMapComponent>
                </div>
            </div >
                <section id="action-description" aria-label="Description of HeatMap sample">
                    <p>
                        This sample visualizes the crude oil production of the non-OPEC countries over the years. The data point values
                        displayed are in million barrels per day units.
                    </p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                        In this example, you can see how to customize the tooltip content in the HeatMap. You can customize the tooltip content by using the <a href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip#tooltip-template" target="_blank">template</a> property.
                    </p>
                    <p>
                        The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.
                    </p>
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
