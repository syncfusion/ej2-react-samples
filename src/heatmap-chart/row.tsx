import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
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
export class ArrayRow extends SampleBase<{}, {}> {
    private arrayRowData: Object = [
        [9.5, 2.2, 4.2, 8.2, -0.5, 3.2, 5.4, 7.4, 6.2, 1.4],
        [4.3, 8.9, 10.8, 6.5, 5.1, 6.2, 7.6, 7.5, 6.1, 7.6],
        [3.9, 2.7, 2.5, 3.7, 2.6, 5.1, 5.8, 2.9, 4.5, 5.1],
        [2.4, -3.7, 4.1, 6.0, 5.0, 2.4, 3.3, 4.6, 4.3, 2.7],
        [2.0, 7.0, -4.1, 8.9, 2.7, 5.9, 5.6, 1.9, -1.7, 2.9],
        [5.4, 1.1, 6.9, 4.5, 2.9, 3.4, 1.5, -2.8, -4.6, 1.2],
        [-1.3, 3.9, 3.5, 6.6, 5.2, 7.7, 1.4, -3.6, 6.6, 4.3],
        [-1.6, 2.3, 2.9, -2.5, 1.3, 4.9, 10.1, 3.2, 4.8, 2.0],
        [10.8, -1.6, 4.0, 6.0, 7.7, 2.6, 5.6, -2.5, 3.8, -1.9],
        [6.2, 9.8, -1.5, 2.0, -1.5, 4.3, 6.7, 3.8, -1.2, 2.4],
        [1.2, 10.9, 4.0, -1.4, 2.2, 1.6, -2.6, 2.3, 1.7, 2.4],
        [5.1, -2.4, 8.2, -1.1, 3.5, 6.0, -1.3, 7.2, 9.0, 4.2]
    ];
    render() {
        return (
            <div className='control-pane'>
                {/* custom code start */}
                <style>
                    {SAMPLE_CSS}
                </style>
                {/* custom code end */}
                <div className='control-section'>
                    <HeatMapComponent id='heatmap-container'
                        titleSettings={{
                            text: 'GDP Growth Rate for Major Economies (in Percentage)',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }}
                        xAxis={{
                            labels: ['China', 'India', 'Australia', 'Mexico', 'Canada', 'Brazil',
                                'USA', 'UK', 'Germany', 'Russia', 'France', 'Japan'],
                            labelRotation: 45,
                            labelIntersectAction: 'None',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        yAxis={{
                            labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        paletteSettings={{
                            palette: [{ value: -1, color: '#F0D6AD' },
                            { value: 0, color: '#9da49a' },
                            { value: 3.5, color: '#d7c7a7' },
                            { value: 6.0, color: '#6e888f' },
                            { value: 7.5, color: '#466f86' },
                            { value: 10, color: '#19547B' },
                            ],
                        }}
                        tooltipSettings={{
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        cellSettings={{
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        legendSettings={{
                            visible: false
                        }}
                        load={this.load.bind(this)}
                        tooltipRender={this.tooltipTemplate}
                        dataSource={this.arrayRowData}>
                        <Inject services={[Tooltip]} />
                    </HeatMapComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the GDP growth rate for the countries which are the world’s major economies over the years.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to bind array object as data source for heatmap and configure the Heatmap using
                        the data adaptor support. You can directly bind the array object to the Heatmap data source with default property
                        settings.
                    </p>
                    <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                    <br></br>
                    <p> <b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> module using the <code>{'<Inject services={[Tooltip]} />'}</code> method.
                    </p>
                </div>
            </div >
        );
    }

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
    };
    private tooltipTemplate(args: ITooltipEventArgs): void {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
    };
}
