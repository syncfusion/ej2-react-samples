/**
 * Sample for Pyramid Chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, IAccLoadedEventArgs, AccumulationSelection, AccumulationTheme, AccumulationLegend, IAccResizeEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2/base';
export let data1: any[] = [
  { x: 'Milk, Youghnut, Cheese', y: 435, text: Browser.isDevice ? 'Milk, Youghnut,<br> Cheese:  435 cal' : 'Milk, Youghnut, Cheese: 435 cal' },
  { x: 'Vegetables', y: 470, text: 'Vegetables: 470 cal' },
  { x: 'Meat, Poultry, Fish', y: 475, text:  Browser.isDevice ? 'Meat, Poultry,<br> Fish: 475 cal' : 'Meat, Poultry, Fish: 475 cal' },
  { x: 'Rice, Pasta', y: 930, text: Browser.isDevice ? 'Rice, Pasta:<br> 930 cal' : ' Rice, Pasta: 930 cal' },
  { x: 'Fruits', y: 520, text: Browser.isDevice ? 'Fruits: <br> 520 cal' : 'Fruits: 520 cal' }];
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
                <AccumulationChartComponent legendSettings={{ visible: false }} id='pyramid-chart' ref={pyramid => pyramid = pyramid} title='Food Comparison Chart' load={this.load.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y} cal</b>', enableHighlight: true }} loaded={this.onChartLoad.bind(this)}>
                    <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection, AccumulationLegend]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' type='Pyramid' width={'45%'} height='80%'  neckWidth='15%'  gapRatio={0.03} explode={true} emptyPointSettings={{ mode: 'Drop', fill: 'red' }} dataLabel={{ visible: true, name: 'text', position: 'Outside', connectorStyle: {length: '20px'}, font: { fontWeight: '600' } }} />
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
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pyramid-chart').setAttribute('title', '');
  };
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
  };
}