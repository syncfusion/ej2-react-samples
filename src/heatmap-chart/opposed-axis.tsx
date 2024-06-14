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
}
.opposedCheckBox {
    padding-left: 0px !important;
    margin-left: 0px;
}
.e-view.fluent2 #property .opposedCheckBox, .e-view.fluent2-dark #property .opposedCheckBox {
    padding-left: 0px; margin-left: -7px;
}`;
// custom code end
export class OpposedAxis extends SampleBase<{}, {}> {
    private heatmap: HeatMapComponent;
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
                                text: 'Monthly Flight Traffic at JFK Airport',
                                textStyle: {
                                    size: '15px',
                                    fontWeight: '500',
                                    fontStyle: 'Normal',
                                    fontFamily: 'inherit'
                                }
                            }}
                            xAxis={{
                                labels: ['2007', '2008', '2009', '2010', '2011',
                                    '2012', '2013', '2014', '2015', '2016', '2017'],
                                opposedPosition: true,
                                labelRotation: 45,
                                labelIntersectAction: 'None',
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            tooltipSettings={{
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            yAxis={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                                    'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                                opposedPosition: true,
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
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
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft:-10 }}>
                            <tbody>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <div className="opposedCheckBox">
                                            <CheckBoxComponent id='XOpposedPosition' checked={true} label='Change X-Axis Position'
                                                change={this.valueXChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <div className="opposedCheckBox">
                                            <CheckBoxComponent id='YOpposedPosition' checked={true} label='Change Y-Axis Position'
                                                change={this.valueYChange.bind(this)} ></CheckBoxComponent>
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
                        This sample illustrates the monthly flight arrivals at JFK international airport, New York.
                        The data label is disabled in this sample, the tooltip displays the data point values.  In property panel,
                        the options are available to change the position of the axes by means of checkbox for each axis.
                    </p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                      In this example, you can see how to change the display position of the axis. You can change the display position of axes by enabling the
                      <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/axisModel/#opposedposition" target="_blank"> opposedPosition</a> property for each axis.
                    </p>
                    <p>
                      The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.
                    </p>
                    <br></br>
                    <p> <b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> module using the <code>{'<Inject services={[Tooltip]} />'}</code> method.
                    </p>
                </section>
            </main>
        );
    }

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
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
