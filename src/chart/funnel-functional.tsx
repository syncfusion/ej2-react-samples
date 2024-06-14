/**
 * Sample for Funnel Series
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser} from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, FunnelSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationDataLabel, IAccResizeEventArgs, AccumulationTheme } from '@syncfusion/ej2-react-charts';
export let data1: any[] = [
    { x: "Hired", y: 50, text: "Hired: 50" },
    { x: "Personal Interview", y: 58, text: Browser.isDevice ? "Personal <br> Interview: 58" :  "Personal Interview: 58" },
    { x: "Telephonic Interview", y: 85, text:  "Telephonic <br> Interview: 85"  },
    { x: "Screening", y: 105, text: "Screening: 105" },
    { x: "Initial Validation", y: 145, text: Browser.isDevice ?   "Initial <br> Validation: 145" :   "Initial Validation: 145" },
    { x: "Candidates Applied", y: 250, text: "Candidates Applied: 250" },
];
const Funnel = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let funnelObj = useRef<AccumulationChartComponent>(null);

    const onChartLoad = (args: IAccLoadedEventArgs): void => {
        document.getElementById('funnel-chart').setAttribute('title', '');
    };
    const load = (args: IAccLoadedEventArgs): void => {
        var funnelTheme = location.hash.split('/')[1];
        funnelTheme = funnelTheme ? funnelTheme : 'Material';
        args.accumulation.theme = (funnelTheme.charAt(0).toUpperCase() +
            funnelTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
    };
    const onChartResized = (args: IAccResizeEventArgs): void => {
        let bounds: ClientRect = funnelObj.current.element.getBoundingClientRect();
        if (bounds.width < bounds.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        } else {
            args.accumulation.series[0].width = '60%';
            args.accumulation.series[0].height = '80%';
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <AccumulationChartComponent ref={funnelObj} legendSettings={{ visible: false }} id='funnel-chart' title='Recruitment Process' load={load.bind(this)} tooltip={{ enable: false, format: '${point.x} : <b>${point.y}</b>' }} resized={onChartResized.bind(this)} loaded={onChartLoad.bind(this)}>
                    <Inject services={[FunnelSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationLegend]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' type='Funnel' width='45%' height='80%'  neckWidth='15%' gapRatio={0.03} neckHeight='18%' explode={false} dataLabel={{ connectorStyle: {length:'20px'},name: 'text', visible: true, position: 'Inside', font: { fontWeight: '600' } }} />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This React Funnel Chart example shows a funnel chart for recruitment process. Datalabels show information about the points.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a funnel chart. The labels are smartly arranged to avoid overlapping. The width and height of the funnel chart can be customized using the <code>NeckWidth</code> and <code>NeckHeight</code> properties.
                </p>
                <p> 
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Funnel series, we need to inject <code>FunnelSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the funnel series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/funnel/" aria-label="Navigate to the documentation for Funnel in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Funnel;