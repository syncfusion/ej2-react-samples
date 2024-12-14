import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme, AccumulationDataLabel, IAccPointRenderEventArgs, PieSeries, SelectionPattern
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const data = [
    { x: 'Internet Explorer', y: 6.12, text: Browser.isDevice ? 'Internet Explorer:<br> 6.12%' : 'Internet Explorer: 6.12%' },
    { x: 'Chrome', y: 57.28, text: Browser.isDevice ? 'Chrome:<br> 57.282%' : 'Chrome: 57.28%' },
    { x: 'Safari', y: 4.73, text: Browser.isDevice ? 'Safari:<br> 4.73%' : 'Safari: 4.73%' },
    { x: 'QQ', y: 5.96, text: Browser.isDevice ? 'QQ:<br>5.96%' : 'QQ: 5.96%' },
    { x: 'UC Browser', y: 4.37, text: Browser.isDevice ? 'UC Browser:<br>4.37%' : 'UC Browser: 4.37%' },
    { x: 'Edge', y: 7.48, text: Browser.isDevice ? 'Edge:<br> 7.48%' : 'Edge: 7.48%' },
    { x: 'Others', y: 14.06, text: Browser.isDevice ? 'Others:<br> 14.06%' : 'Others: 14.06%' }
];

export class PieWithPattern extends SampleBase<{}, {}> {

    public onPointRender: EmitType<IAccPointRenderEventArgs> = (args: IAccPointRenderEventArgs): void => {
        if (args.point.index == 0) {
            args.pattern = 'DiagonalBackward'

        }
        else if (args.point.index == 1) {
            args.pattern = 'DiagonalForward'

        }
        else if (args.point.index == 2) {
            args.pattern = 'HorizontalStripe'

        }
        else if (args.point.index == 3) {
            args.pattern = 'VerticalStripe'

        }
        else if (args.point.index == 4) {
            args.pattern = 'HorizontalDash'

        }
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        if (selectedTheme.indexOf('dark') > -1) {
            if (selectedTheme.indexOf('material') > -1) {
                args.border.color = '#303030';

            }
            else if (selectedTheme.indexOf('bootstrap5') > -1) {
                args.border.color = '#212529';

            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';

            }
            else if (selectedTheme.indexOf('fabric') > -1) {
                args.border.color = '#201f1f';

            }
            else if (selectedTheme.indexOf('fluent') > -1) {
                args.border.color = '#252423';

            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';

            }
            else if (selectedTheme.indexOf('tailwind') > -1) {
                args.border.color = '#1F2937';

            }
            else {
                args.border.color = '#222222';

            }
        }
        else if (selectedTheme.indexOf('highcontrast') > -1) {
            args.border.color = '#000000';

        }
        else if (selectedTheme.indexOf('fluent2-highcontrast') > -1) {
            args.border.color = '#000000';

        }
        else {
            args.border.color = '#FFFFFF';

        }
    }

    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
    }

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <AccumulationChartComponent
                        id='pie-chart'
                        title='Browser Market Share'
                        style={{ textAlign: 'center' }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}
                        enableBorderOnMouseMove={false}
                        pointRender={this.onPointRender.bind(this)}
                        tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true }}
                        legendSettings={{ visible: false }}
                    >
                        <Inject services={[AccumulationTooltip, AccumulationDataLabel, PieSeries]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective
                                dataSource={data}
                                xName='x'
                                yName='y'
                                applyPattern={true}
                                type='Pie'
                                dataLabel={{
                                    visible: true,
                                    position: 'Outside',
                                    name: 'text',
                                    font: { fontWeight: '600' },
                                    connectorStyle: { length: '20px', type: 'Curve' }
                                }}
                                border={{ width: 2 }}
                            >
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Mobile Browser Market Share using a pie chart with various patterns.
                    </p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure a pie chart with different patterns. The pie chart is a circular graphic ideal for displaying categories as a proportion or percentage of the whole. You can apply different patterns to the pie slices using the <code>applyPattern</code> property in the series and the <code>pointRender</code> event.</p>
                    <p>
                        More information on the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/accumulation-chart/pie-dough-nut/#pie-chart"
                            aria-label="Navigate to the documentation for Pie Chart in TypeScript Accumulation Chart control">documentation
                            section</a>.
                    </p>
                </div>
            </div>
        );
    }
}
