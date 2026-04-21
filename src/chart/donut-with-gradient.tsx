/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, IAccLoadedEventArgs, AccumulationDataLabel, Inject, AccumulationTheme, AccumulationAnnotation, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

import { Browser } from '@syncfusion/ej2-base';

export let GradientDonutData: any[] = [
    { Country: "Austria", Share: 38.03, DataLabelMappingName: "Austria: 38.03%" },
    { Country: "Belgium", Share: 33.7, DataLabelMappingName: "Belgium: 33.7%" },
    { Country: "Germany", Share: 31.27, DataLabelMappingName: "Germany: 31.27%" },
    { Country: "The Netherlands", Share: 29.71, DataLabelMappingName: "The Netherlands: 29.71%" },
    { Country: "Lithuania", Share: 27.72, DataLabelMappingName: "Lithuania: 27.72%" },
    { Country: "Czechia", Share: 27.37, DataLabelMappingName: "Czechia: 27.37%" },
    { Country: "Poland", Share: 22.1, DataLabelMappingName: "Poland: 22.1%" },
    { Country: "Ireland", Share: 18.87, DataLabelMappingName: "Ireland: 18.87%" },
    { Country: "Croatia", Share: 14.88, DataLabelMappingName: "Croatia: 14.88%" },
];

const baseColors = ['#39B9E6', '#2E79CF', '#4960CF', '#5E47C6', '#8A44C9', '#C24F86', '#D8584E', '#E07245', '#F09A4A'];

export class DonutWithGradient extends SampleBase<{}, {}> {
    public pie: AccumulationChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AccumulationChartComponent id="container"
                        ref={chart => this.pie = chart}
                        load={this.load.bind(this)}
                        loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true, header: '', format: '${point.x} : <b>${point.y}%</b>' }}
                        legendSettings={{ visible: true, position: 'Right' }}
                        title='Share of E-commerce Orders by Country - 2025'
                        subTitle='Source: Data provided by Eurostat European Statistics'
                        titleStyle={{ position: 'Custom', x: Browser.isDevice ? 120 : 370, y: 15 }}
                        enableSmartLabels={true}
                        pointRender={this.onPointRender.bind(this)}
                        legendRender={this.onLegendRender.bind(this)}>
                        <Inject services={[PieSeries, AccumulationDataLabel, AccumulationAnnotation, AccumulationLegend, AccumulationTooltip]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={GradientDonutData} xName='Country' yName='Share'
                                type='Pie' innerRadius='65%' radius='70%' name='Share by country'
                                dataLabel={{
                                    visible: true, name: 'DataLabelMappingName', position: 'Outside',
                                    connectorStyle: { length: '10px' }, font: { size: '12px' }
                                }}
                                legendShape='Rectangle' />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
            <div id="action-description">
                <p>This donut chart example shows the latest percentage share of e-commerce orders by country using a
                    donut series with radial gradient fills. Data labels annotate each slice, and the legend on the right
                    lists the exact percentages.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a donut chart with a gradient. To apply a
                    gradient to each point in the pie series, we use the <a href="https://ej2.syncfusion.com/react/documentation/api/accumulation-chart/iaccpointrendereventargs">pointRender</a> event. Through this event, you can customize the color of each point in the donut chart.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    The Charts component's features are segregated into individual feature modules. To use pie chart, we need to inject <code>PieSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the donut series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/" aria-label="Navigate to the documentation for Donut Chart in React accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
        )
    }

    public onPointRender(args: any): void {
        const idx = args.point.index;
        const base = baseColors[idx % baseColors.length];
        args.radialGradient = {
            cx: 0.5, cy: 0.5, fx: 0.5, fy: 0.5, r: 0.6,
            gradientColorStop: [
                { offset: 0, color: base, opacity: 1, brighten: 0.2, lighten: 0 },
                { offset: 45, color: base, opacity: 1, brighten: 0.1, lighten: 0 },
                { offset: 70, color: base, opacity: 1, brighten: 0, lighten: 0 },
                { offset: 85, color: base, opacity: 1, brighten: -0.1, lighten: 0 },
                { offset: 100, color: base, opacity: 1, brighten: -0.2, lighten: 0 }
            ]
        };
    }

    public onLegendRender(args: any): void {
        const country = args.text;
        const dataPoint = GradientDonutData.find(d => d.Country === country);
        if (dataPoint) { args.text = dataPoint.DataLabelMappingName; }
    }

    public onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('container').setAttribute('title', '');
    };

    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast')   as AccumulationTheme;
    };
        
}