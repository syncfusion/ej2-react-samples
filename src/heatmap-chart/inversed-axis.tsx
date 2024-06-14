import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './inversed-axis-data.json';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}
#source{
    float: right; margin-right: 10p
}
.inversedCheckBox{
    padding-left: 0px !important;
    margin-left: 0px;
}
.e-view.fluent2 #property .inversedCheckBox, .e-view.fluent2-dark #property .inversedCheckBox {
    padding-left: 0px; margin-left: -6px;
}`;
// custom code end
export class InversedAxis extends SampleBase<{}, {}> {
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
                                text: 'Population Growth Rate of the most Populous Countries',
                                textStyle: {
                                    size: '15px',
                                    fontWeight: '500',
                                    fontStyle: 'Normal',
                                    fontFamily: 'inherit'
                                }
                            }}
                            xAxis={{
                                labels: ['China', 'India', 'USA', 'Indonesia', 'Brazil', 'Pakistan',
                                    'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
                                labelRotation: 45,
                                labelIntersectAction: 'None',
                                isInversed: true,
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            yAxis={{
                                labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                                    '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
                                isInversed: true,
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            dataSource={(data as any).inveredAxisData}
                            cellSettings={{
                                border: { width: 0 },
                                showLabel: false,
                                format: '{value} %'
                            }}
                            tooltipSettings={{
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            }}
                            paletteSettings={{
                                palette: [{ value: 0, color: '#4b7287' },
                                { value: 0.5, color: '#b5b29f' },
                                { value: 1, color: '#F0D6AD' },
                                { value: 1.5, color: '#9da49a' },
                                { value: 2, color: '#466f86' },
                                { value: 2.5, color: '#d7c7a7' },
                                { value: 3, color: '#6e888f' },
                                ],
                            }}
                            load={this.load.bind(this)}
                            legendSettings={{
                                visible: false
                            }}>
                            <Inject services={[Legend, Tooltip]} />
                        </HeatMapComponent>
                        <div id="source">Source:
                            <a href="https://en.wikipedia.org/wiki/List_of_countries_by_oil_production"
                            target="_blank">https://en.wikipedia.org/ </a>
                        </div>
                </div>
                <div className="col-md-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft:-10 }}>
                            <tbody>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <div className="inversedCheckBox">
                                            <CheckBoxComponent id='XOpposedPosition' checked={true} label='Reverse X-Axis Origin'
                                                change={this.valueXChange.bind(this)}> </CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '40%' }}>
                                        <div className="inversedCheckBox">
                                            <CheckBoxComponent id='YOpposedPosition' checked={true} label='Reverse Y-Axis Origin'
                                                change={this.valueYChange.bind(this)} > </CheckBoxComponent>
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
                        This sample illustrates the population growth rate of the most populous countries over the years.
                        The data label is disabled in this sample, the tooltip displays the data point values.  In property panel,
                        the options are available to reverse the origin of the axes by means of checkbox for each axis.
                    </p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                    In this example, you can see how to reverse the axis origin for both axes, once the axis origin has been reversed
                    the axis data will be displayed inverted. You can reverse the axis origin by enabling the
                    <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/axisModel/#isinversed" target="_blank"> isInversed </a> property for each axis. 
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
            this.heatmap.xAxis.isInversed = true;
        } else {
            this.heatmap.xAxis.isInversed = false;
        }
        this.heatmap.dataBind();
    }

    private valueYChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.heatmap.yAxis.isInversed = true;
        } else {
            this.heatmap.yAxis.isInversed = false;
        }
        this.heatmap.dataBind();
    }
}
