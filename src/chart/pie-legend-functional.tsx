/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, Inject, IAccLoadedEventArgs, AccumulationTheme, Selection, AccumulationAnnotationsDirective, AccumulationAnnotationDirective, ChartAnnotation, AccumulationAnnotation, IPointRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
export let data1: any[] = [
    { 'x': 'Chrome', y: 57.28, text: '57.28%' },
    { 'x': 'UC Browser', y: 4.37, text: '4.37%' },
    { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
    { 'x': 'QQ', y: 5.96, text: '5.96%' },
    { 'x': 'Edge', y: 7.48, text: '7.48%' },
    { 'x': 'Others', y: 14.06, text: '18.76%' },
] 
let content = Browser.isDevice ? " " : "<div style='font-Weight:600;font-size:14px'>Browser<br>Market<br>Share</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart2 {
        align :center
    }`;
const Doughnut = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let fluent2Colors: string[] = ["#6200EE", "#09AF74", "#0076E5", "#CB3587", "#E7910F", "#66CD15", "#F3A93C", "#107C10",
        "#C19C00"];
    let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        if (selectedTheme === 'fluent2') {
            args.fill = fluent2Colors[args.point.index % 10];
        }
    };
    const load = (args: IAccLoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <AccumulationChartComponent id='pie-chart2'  title = { Browser.isDevice ? "Browser Market Share" : '' } load={load.bind(this)} legendSettings={{ visible: true, toggleVisibility: false, position: 'Bottom', maximumColumns: Browser.isDevice ? 2 : 3, fixedWidth: true }} enableSmartLabels={true} enableAnimation={false} selectionMode={'Point'} center={{ x: '50%', y: '50%' }} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:"", enableHighlight: true, pointRender: labelRender }}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, Selection, ChartAnnotation, AccumulationAnnotation]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' explode={false} explodeOffset='10%' explodeIndex={0} startAngle={30} innerRadius='50%' dataLabel={{
                            visible: true, position: 'Inside',
                            font: { fontWeight: '600', color: '#ffffff' }, name: 'y', connectorStyle: { length: '20px', type: 'Curve' }
                        }} radius={Browser.isDevice ? '80%' : '85%'} />
                    </AccumulationSeriesCollectionDirective>
                    <AccumulationAnnotationsDirective>
                        <AccumulationAnnotationDirective content={content} region="Series" x="52%" y="50%" />
                    </AccumulationAnnotationsDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates a donut chart showcasing mobile browser usage statistics, with legends displayed at the bottom of the chart.</p>
            </div>
            <div id="description">
                <p> This example demonstrates how to render a donut chart with legends positioned at the bottom. The legend can be arranged in horizontal, vertical, or auto layout modes. Using the <code>maximumColumns</code> property, you can define the maximum number of columns in auto layout. Additionally, a fixed width option ensures uniform legend sizes for a polished appearance.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
                </p>
                <p>
                    More information about the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/legend" aria-label="Navigate to the documentation for Legend in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Doughnut;