import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './opposed-axis-data.json';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from "../common/property-pane";

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
export class OpposedAxis extends SampleBase<{}, {}> {
    private heatmap: HeatMapComponent;
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
                                text: 'Monthly Flight Traffic at JFK Airport',
                                textStyle: {
                                    size: '15px',
                                    fontWeight: '500',
                                    fontStyle: 'Normal',
                                    fontFamily: 'Segoe UI'
                                }
                            }}
                            xAxis={{
                                labels: ['2007', '2008', '2009', '2010', '2011',
                                    '2012', '2013', '2014', '2015', '2016', '2017'],
                                opposedPosition: true,
                                labelRotation: 45,
                                labelIntersectAction: 'None',
                            }}
                            yAxis={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                                    'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                                opposedPosition: true
                            }}
                            dataSource={(data as any).opposedAxisData}
                            legendSettings={{
                                visible: false
                            }}
                            load={this.load.bind(this)}
                            cellSettings={{
                                showLabel: false,
                                border: {
                                    width: 0,
                                },
                                format: '{value} flights'
                            }}>
                            <Inject services={[Tooltip]} />
                        </HeatMapComponent>
                </div>
                <div className="col-md-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <CheckBoxComponent id='XOpposedPosition' checked={true} label='Change X-Axis Position'
                                            change={this.valueXChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <CheckBoxComponent id='YOpposedPosition' checked={true} label='Change Y-Axis Position'
                                            change={this.valueYChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the monthly flight arrivals at JFK international airport, New York.
                        The data label is disabled in this sample, the tooltip displays the data point values.  In property panel,
                        the options are available to change the position of the axes by means of checkbox for each axis.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to change the display position of the axis. You can change the display position of
                        axes by enabling the <code>opposedPosition </code> property for each axis.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a
                        point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the
                        <code>Tooltip </code> module using the <code>Heatmap.Inject(Tooltip) </code> method.
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

    private valueXChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.heatmap.xAxis.opposedPosition = true;
        } else {
            this.heatmap.xAxis.opposedPosition = false;
        }
        this.heatmap.dataBind();
    }

    private valueYChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.heatmap.yAxis.opposedPosition = true;
        } else {
            this.heatmap.yAxis.opposedPosition = false;
        }
        this.heatmap.dataBind();
    }
}
