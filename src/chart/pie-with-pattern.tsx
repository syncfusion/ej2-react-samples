import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationTooltip, AccumulationDataLabel, PieSeries, IAccPointRenderEventArgs, IAccLoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { accpatternPointRender, loadAccumulationChartTheme } from './theme-color';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const data: Object[] = [
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
        accpatternPointRender(args);
    }

    public load(args: IAccLoadedEventArgs): void {
        loadAccumulationChartTheme(args);
    }

    render() {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">

                    <AccumulationChartComponent
                        id='pie-chart'
                        style={{ textAlign: 'center' }}
                        title='Browser Market Share'
                        load={this.load.bind(this)}
                        enableBorderOnMouseMove={false}
                        width={Browser.isDevice ? '100%' : '75%'}
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
                                type='Pie'
                                applyPattern={true}
                                dataLabel={{
                                    visible: true,
                                    position: 'Outside',
                                    name: 'text',
                                    font: { fontWeight: '600' },
                                    connectorStyle: { length: '20px', type: 'Curve' }
                                }}
                                border={{ width: 2 }}
                            />
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
