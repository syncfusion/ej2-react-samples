import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, Adaptor } from '@syncfusion/ej2-react-heatmap';
import { SampleBase } from '../common/sample-base';
// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}`;
// custom code end
/**
 * Heatmap Default sample
 */

export class Default extends SampleBase<{}, {}> {
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
                            text: 'Sales Revenue per Employee (in 1000 US$)',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'Segoe UI'
                            }
                        }}
                        xAxis={{
                            labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert',
                                'Laura', 'Anne', 'Paul', 'Karin', 'Mario']
                        }}
                        yAxis={{
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        }}
                        load={this.load.bind(this)}
                        dataSource={this.getDatasource().dataSource}>
                        <Inject services={[Legend, Tooltip, Adaptor]} />
                    </HeatMapComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the sales revenue of items sold by the employees in a week, where the revenue
                        for the day is displayed in 1000 USD as cell data.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render a heat map with the provided data source. The palette color is applied
                        to the items in heat map. The default legend is enabled in this example to represent the items.
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
    public getDatasource(): any {
        let temp: any = {};
        temp.dataSource = [];
        temp.xAis = [];
        temp.yAis = [];
        for (let x: number = 0; x < 12; x++) {
            temp.dataSource.push([]);
            temp.xAis.push(x);
            temp.yAis.push(x);
            for (let y: number = 0; y < 6; y++) {
                temp.dataSource[x].push(this.getRndInteger(0, 100));
            }
        }
        return temp;
    }
    public getRndInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
