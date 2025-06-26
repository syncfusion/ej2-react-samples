/**
 * Sample for Pyramid Chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, IAccLoadedEventArgs, AccumulationSelection, AccumulationTheme, AccumulationLegend } from '@syncfusion/ej2-react-charts';
import { loadAccumulationChartTheme } from './theme-color';
export let data1: any[] = [
    { x: 'Oils', y: 2, text: 'Oils: 2%' },
    { x: 'Protein', y: 10, text: 'Protein: 10%' },
    { x: 'Fruits', y: 15, text: 'Fruits: 15%' },
    { x: 'Dairy', y: 23, text: 'Dairy: 23%' },
    { x: 'Vegetables', y: 23, text: 'Vegetables: 23%' },
    { x: 'Grains', y: 27, text: 'Grains: 27%' }
];
   
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pyramid-chart {
        align :center
    }`;
const Pyramid = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: IAccLoadedEventArgs): void => {
        document.getElementById('pyramid-chart').setAttribute('title', '');
    };
    const load = (args: IAccLoadedEventArgs): void => {
        loadAccumulationChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <AccumulationChartComponent legendSettings={{ visible: false }} id='pyramid-chart' ref={pyramid => pyramid = pyramid} title='Food Consumption Pyramid' subTitle='Source: wikipedia.org' load={load.bind(this)} tooltip={{ enable: true, format: '${point.x}: <b>${point.y}% of Daily Intake </b>', header: '', enableHighlight: true }} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection, AccumulationLegend]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='Food' type='Pyramid' width={'45%'} height='80%'  neckWidth='15%'  gapRatio={0.03} explode={false} dataLabel={{ visible: true, name: 'text', position: 'Outside', connectorStyle: {length: Browser.isDevice ? '10px' : '20px'}, font: { size: Browser.isDevice ? '7px' : '12px', fontWeight: '600' } }} />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This React Pyramid Chart visualizes food comparison data by using pyramid series.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a pyramid chart. This chart is shaped like a triangle, with lines dividing it into sections of varying widths. Depending on the Y coordinate, the width indicates a level of hierarchy among other categories. The <code>DataLabel</code>  represents individual data and its value.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Pyramid series, we need to inject <code>PyramidSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the pyramid series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/pyramid/" aria-label="Navigate to the documentation for Pyramid in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Pyramid;