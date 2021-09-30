import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject } from '@syncfusion/ej2-react-heatmap';
import { Adaptor, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
import { SampleBase } from '../common/sample-base';
import * as data from './large-data.json';
import { Internationalization } from "@syncfusion/ej2-base";

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}`;
// custom code end
/**
 * Heatmap Large data sample
 */

export class LargeData extends SampleBase<{}, {}> {
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
                            text: 'Annual Flight Traffic Report',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'Segoe UI'
                            }
                        }}
                        xAxis={{
                            minimum: new Date(2017, 0, 1),
                            maximum: new Date(2017, 11, 31),
                            intervalType: 'Days',
                            valueType: 'DateTime',
                            labelFormat: 'MMM',
                            showLabelOn: 'Months'
                        }}
                        yAxis={{
                            labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8::00', '9:00', '10:00', '11:00',
                            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
                            '22:00', '23:00', '24:00']
                        }}
                        paletteSettings={{
                            palette: [  { value: 150, color: '#A6DC7E' },
                            { value: 250, color: '#DCD57E' },
                            { value: 300, color: '#DC8D7E' },
                            ],
                            type:'Gradient'
                        }}
                        cellSettings={{
                                border: { width: 0 },
                        }}
                        renderingMode={'Canvas'}
                        legendSettings={{
                          visible:false
                        }}
                        load={this.load.bind(this)}
                        tooltipRender={this.tooltipTemplate}
                        dataSource={(data as any).largeData}>
                        <Inject services={[Legend, Tooltip, Adaptor]} />
                    </HeatMapComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the annual traffic report of an airport with the number of flight arrivals in a year.
                        The data label is disabled in this sample, the tooltip displays the data point values.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to switch the Heatmap to canvas rendering mode.The rendering performance will be
                        better in <code>Canvas</code> rendering mode, while loading large datasets. You can switch the rendering mode for
                        Heatmap between <code>SVG</code> and <code>Canvas</code> using the <code>renderingMode </code> property. When the
                        <code>renderingMode</code> property is set to <code>Auto</code> the rendering mode will be switched automatically
                        based of the size of data source to improve the rendering performance.
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item
                        in touch enabled devices.
                   </p>
                    <br></br>
                    <p> <b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the
                        <code>Tooltip</code> module using the <code>Heatmap.Inject(Tooltip)</code> method, and use a legend by injecting the
                        <code>Legend</code> module using the <code>Heatmap.Inject(Legend)</code> method.
                    </p>
                </div>
            </div >
        );
    }

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
    };
    private tooltipTemplate(args: ITooltipEventArgs): void {
        let intl = new Internationalization();
        let format: Function = intl.getDateFormat({ format: "MMM dd, yyyy" });
        let value : string = format(args.xValue);
        args.content = [value + " " + args.yLabel + " : " + args.value + " flight arrivals"];
    };
}
