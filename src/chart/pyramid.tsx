/**
 * Sample for Pyramid Chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, IAccAnimationCompleteEventArgs, AccPoints,
  IAccTextRenderEventArgs, Inject, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, IAccLoadedEventArgs, AccumulationSelection,
  IAccResizeEventArgs, AccumulationTheme, AccumulationLegend
} from '@syncfusion/ej2-react-charts';
export let data1: any[] = [
{ x: 'Milk, Youghnut, Cheese', y: 435, text: 'Milk, Youghnut, Cheese: 435 cal' },
{ x: 'Vegetables', y: 470, text: 'Vegetables: 470 cal' },
{ x: 'Meat, Poultry, Fish', y: 475, text: 'Meat, Poultry, Fish: 475 cal' },
{ x: 'Fruits', y: 520, text: 'Fruits: 520 cal' },
{ x: 'Bread, Rice, Pasta', y: 930, text: 'Bread, Rice, Pasta: 930 cal' }];
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
            <style>
                    {SAMPLE_CSS}
                </style>
        <div className='control-section'>
          <AccumulationChartComponent   legendSettings={{ visible: false }} id='pyramid-chart' ref={pyramid => this.pyramid = pyramid}
            title='Food Comparison Chart'
            load={this.load.bind(this)}
            tooltip={{ enable: true, format: '${point.x} : <b>${point.y} cal</b>' }}
            loaded={this.onChartLoad.bind(this)}
            resized={this.chartResized.bind(this)}
          >
            <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries,AccumulationSelection,AccumulationLegend]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' type='Pyramid' width='45%' 
                neckWidth='10%'neckHeight='15%' gapRatio={0.03} explode={true} emptyPointSettings={{ mode: 'Drop', fill: 'red' }}
                dataLabel={{
                  visible: true,
                  name: 'text',
                  position: 'Outside',
                  font: {
                    fontWeight: '600',
                }
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This React Pyramid Chart visualizes food comparison data by using pyramid series.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render and configure a pyramid chart. This chart is shaped like a triangle, with lines dividing it into sections of varying widths. Depending on the Y coordinate, the width indicates a level of hierarchy among other categories. The <code>DataLabel</code>  represents individual data and its value.</p>
          <p> <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Chart component features are segregated into individual feature-wise modules. To use Pyramid series, we need to inject
                       <code>PyramidSeries</code> module into <code>services</code>.
                  </p>
                  <p>
                        More information on the pyramid series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/pyramid/">documentation section</a>.
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
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as AccumulationTheme;
    if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
      args.accumulation.series[0].width = '80%';
      args.accumulation.series[0].height = '70%';
    }
  };
    
  public chartResized(args: IAccResizeEventArgs): void {
    let bounds: ClientRect = document.getElementById('pyramid-chart').getBoundingClientRect();
    if (bounds.width < bounds.height) {
      args.accumulation.series[0].width = '80%';
      args.accumulation.series[0].height = '70%';
    } else {
      args.accumulation.series[0].width = '60%';
      args.accumulation.series[0].height = '80%';
    }
  }
}