/**
 * Sample for Pyramid Chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, IAccLoadedEventArgs, AccumulationSelection, AccumulationTheme, AccumulationLegend, IAccResizeEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2/base';
export let data1: any[] = [
  { x: 'Oils', y: 2, text: 'Oils: 2%' },
  { x: 'Protein', y: 10, text: 'Protein: 10%' },
  { x: 'Fruits', y: 15, text: 'Fruits: 15%' },
  { x: 'Dairy', y: 23, text: 'Dairy: 23%' },
  { x: 'Vegetables', y: 23, text: 'Vegetables: 23%' },
  { x: 'Grains', y: 27, text: 'Grains: 27%' }];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .pyramid-chart {
            align :center
        }`;
export class Pyramid extends SampleBase<{}, {}> {
  public pyramid: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <AccumulationChartComponent legendSettings={{ visible: false }} id='pyramid-chart' ref={pyramid => pyramid = pyramid} title='Food Consumption Pyramid' subTitle='Source: wikipedia.org' load={this.load.bind(this)} tooltip={{ enable: true, format: '${point.x}: <b>${point.y}% of Daily Intake </b>', header: '', enableHighlight: true }} loaded={this.onChartLoad.bind(this)}>
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
                    In this example, you can see how to render and configure a pyramid chart. This chart is shaped like a triangle, with lines dividing it into sections of varying widths. Depending on the Y coordinate, the width indicates a level of hierarchy among other categories. The <code>DataLabel</code> represents individual data and its value.
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
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pyramid-chart').setAttribute('title', '');
  };
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
  };
}
