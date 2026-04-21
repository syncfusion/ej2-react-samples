
    import * as React from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    ColumnSeries, Category, Tooltip, Legend,
    ILegendRenderEventArgs, ILoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

const MedalData: any[] = [
    { Country: 'Argentina', Gold: 22, Silver: 27, Bronze: 31 },
    { Country: 'Austria',   Gold: 22, Silver: 35, Bronze: 44 },
    { Country: 'Ethiopia',  Gold: 24, Silver: 16, Bronze: 22 },
    { Country: 'Iran',      Gold: 27, Silver: 29, Bronze: 32 },
    { Country: 'India',     Gold: 10, Silver: 10, Bronze: 21 }
];

const legendTemplate: string =
    '<div style="display:flex;align-items:center;gap:' + (Browser.isDevice ? '1px' : '8px') + ';opacity:1;">' +
    '<img src="" width="20" height="20" />' +
    '<span style="font-size:' + (Browser.isDevice ? '9px' : '14px') + ';"></span>' +
    '</div>';

const SAMPLE_CSS = `
    .control-fluid { padding: 0px !important; }
`;

export class ChartLegendTemplate extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='legendTemplate' ref={chart => this.chartInstance = chart}
                        style={{ textAlign: 'center' }}
                        primaryXAxis={{
                            valueType: 'Category',
                            labelPlacement: 'OnTicks',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            interval: 10,
                            minimum: 0,
                            maximum: 50,
                            title: 'Medal Count',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        tooltip={{
                            enable: true,
                            header: '<b>${point.x}</b>',
                            format: '${series.name} Medals : <b>${point.y}</b>'
                        }}
                        title='All-Time Summer Olympic Medal Count by Country'
                        subTitle='Source: Wikipedia.org'
                        legendSettings={{
                            visible: true,
                            position: 'Right',
                            template: legendTemplate
                        }}
                        legendRender={this.legendRender.bind(this)}
                        load={this.load.bind(this)}
                        loaded={this.loaded.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}>
                        <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={MedalData} xName='Country' yName='Gold' name='Gold' type='Column' columnSpacing={0.1} animation={{ enable: false }} />
                            <SeriesDirective dataSource={MedalData} xName='Country' yName='Silver' name='Silver' type='Column' columnSpacing={0.1} animation={{ enable: false }} />
                            <SeriesDirective dataSource={MedalData} xName='Country' yName='Bronze' name='Bronze' type='Column' columnSpacing={0.1} animation={{ enable: false }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates customizable legend templates using all-time Summer Olympic medal data.
                        It displays Gold, Silver, and Bronze medal counts for five countries — Argentina, Austria,
                        Ethiopia, Iran, and India. Each legend entry features a medal icon rendered through a custom
                        legend template to enhance visual clarity and data interpretation.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample shows how to render and configure a custom legend template in a Column chart.
                        The legend items are customized using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/legendSettings/#template"
                            aria-label="Navigate to the documentation for template in LegendSettings in the EJ2 Chart control"><code>template</code></a> property of
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/legendSettings/"
                            aria-label="Navigate to the documentation for LegendSettings in the EJ2 Chart control"> <code>legendSettings</code></a>,
                        which allows embedding custom HTML content such as medal images and styled text into each legend item.
                    </p>
                    <p>
                        The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/#legendrender"
                            aria-label="Navigate to the documentation for legendRender event in EJ2 Chart control"><code>legendRender</code></a> event
                        is used to dynamically update the template content for each series — setting the medal icon image and label text per series.
                    </p>
                    <p>
                        <code>Tooltip</code> is enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to
                        inject <code>ColumnSeries</code>, <code>Category</code>, <code>Tooltip</code>, and <code>Legend</code> modules into <code>services</code>.
                    </p>
                    <p>
                        More information on chart legends can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/legend"
                            aria-label="Navigate to the documentation for Legend in TypeScript Chart control">documentation</a>.
                    </p>
                </div>
            </div>
        );
    }

    public legendRender(args: ILegendRenderEventArgs): void {
        const chart = this.chartInstance as any;
        const matchedSeries: any = chart && chart.series
            ? chart.series.find((s: any) => s.name === args.text)
            : null;
        const opacity: string = matchedSeries && !matchedSeries.visible ? '0.5' : '1';
        (args as any).template = (args as any).template
            .replace('opacity:1;', 'opacity:' + opacity + ';')
            .replace('src=""', 'src="src/chart/images/' + args.text.toLowerCase() + '-medal.png"')
            .replace('font-size:', 'color:' + (args as any).fill + ';font-weight:bold;font-size:')
            .replace('></span>', '>' + args.text + '</span>');
    }

    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    }

    public loaded(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('legendTemplate');
        chart.setAttribute('title', '');
    };
}
