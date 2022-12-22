/**
 * Sample for Bubble Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    BubbleSeries, Tooltip, IPointRenderEventArgs, ILoadedEventArgs, ChartTheme, DataLabel
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors, bubbleFabricColors, bubbleMaterialDarkColors, bubbleMaterialColors, bubbleBootstrap5DarkColors, bubbleBootstrapColors, bubbleHighContrastColors, bubbleFluentDarkColors, bubbleFluentColors, bubbleTailwindDarkColors, bubbleTailwindColors, pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, bubbleBootstrap5Colors, pointBootstrap5Colors } from './theme-color';
import { SampleBase } from '../common/sample-base';
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = bubbleFabricColors[args.point.index % 10];
        args.border.color = pointFabricColors[args.point.index % 10];;
    } else if (selectedTheme === 'material-dark') {
        args.fill = bubbleMaterialDarkColors[args.point.index % 10];
        args.border.color = pointMaterialDarkColors[args.point.index % 10];;
    } else if (selectedTheme === 'material') {
        args.fill = bubbleMaterialColors[args.point.index % 10];
        args.border.color = pointMaterialColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = bubbleBootstrap5DarkColors[args.point.index % 10];
        args.border.color = pointBootstrap5DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5') {
            args.fill = bubbleBootstrap5Colors[args.point.index % 10];
            args.border.color = pointBootstrap5Colors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    } 
    else if (selectedTheme === 'bootstrap4') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    } 
    else if (selectedTheme === 'bootstrap-dark') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = bubbleHighContrastColors[args.point.index % 10];
        args.border.color =  pointHighContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = bubbleFluentDarkColors[args.point.index % 10];
        args.border.color = pointFluentDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = bubbleFluentColors[args.point.index % 10];
        args.border.color =  pointFluentColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind-dark') {
        args.fill = bubbleTailwindDarkColors[args.point.index % 10];
        args.border.color = pointTailwindDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind') {
        args.fill = bubbleTailwindColors[args.point.index % 10];
        args.border.color = pointTailwindColors[args.point.index % 10];
    } 
};
export let data: any[] = [
    { x: 92.2, y: 7.8, size: 1.347, text: 'China',r:'China' },
    { x: 74, y: 6.5, size: 1.241, text: 'India',r:'India' },
    { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia',r: Browser.isDevice ? 'ID' : 'Indonesia' },
    { x: 99.4, y: 2.2, size: 0.312, text: 'United States' ,r:'US'},
    { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' ,r: Browser.isDevice ? 'BR' : 'Brazil'},
    { x: 99, y: 0.7, size: 0.0818, text: 'Germany' ,r: Browser.isDevice ? 'DE' : 'Germany'},
    { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' ,r: Browser.isDevice ? 'EG' : 'Egypt'},
    { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' ,r: Browser.isDevice ? 'RUS' : 'Russia' },
    { x: 96.5, y: 0.2, size: 0.128, text: 'Japan' ,r: Browser.isDevice ? 'JP' : 'Japan'},
    { x: 86.1, y: 4.0, size: 0.115, text: 'MeLiteracy Ion' ,r:'MLI'},
    { x: 92.6, y: 5.2, size: 0.096, text: 'Philippines' ,r:'PH'},
    { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria' ,r:'Nigeria'},
    { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong' ,r: Browser.isDevice ? 'HK' : 'Hong Kong'},
    { x: 79.2, y: 4.9, size: 0.162, text: 'Netherland' ,r:'NL'},
    { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan' ,r:'Jordan'},
    { x: 81, y: 2.5, size: 0.21, text: 'Australia' ,r: Browser.isDevice ? 'AU' : 'Australia'},
    { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia' ,r:'MN'},
    { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan' ,r: Browser.isDevice ? 'TW' : 'Taiwan'}
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    ellipse[id*=_Trackball_0] {

        stroke-width: 1 !important;
    } 
`;
    
/**
 * Bubble sample
 */
export class Bubble extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            minimum: 65,
                            maximum: 102,
                            interval: 5,
                            crossesAt: 5
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            minimum: 0,
                            maximum: 10,
                            crossesAt: 85,
                            interval: 2.5
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        title='World Countries Details' pointRender={pointRender}
                        legendSettings={{ visible: false }} loaded={this.onChartLoad.bind(this)}
                        tooltip={{
                            enableMarker: false,
                            enable: true,
                            header: "<b>${point.tooltip}</b>",
                            format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>"
                        }}>
                        <Inject services={[BubbleSeries, Tooltip, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} type='Bubble' minRadius={3}
                                maxRadius={8}  tooltipMappingName='text'
                                border={{width:2}} xName='x' yName='y' size='size'
                                marker={{ dataLabel: { visible: true,name: 'r', position: 'Middle', font: { fontWeight: '500', color: '#ffffff' } } }} >
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React bubble chart example visualizes the literacy rates and GDP growth rates of countries. A tooltip shows more information about the countries.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the bubble chart. The bubble chart is a type of chart that shows three dimensions of the data. Each point is drawn as a bubble, where the bubble's size depends on the <code>Size</code> property. You can also use the <code>Fill</code> property to customize the data appearance.
                  </p>
                    <p>
                    <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                  </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use bubble series, we need to inject
                       <code>BubbleSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the bubble series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#bubble-chart">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
        
}