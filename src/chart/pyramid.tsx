/**
 * Sample for Pyramid Chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, IAccAnimationCompleteEventArgs, AccPoints,
  IAccTextRenderEventArgs, Inject, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, IAccLoadedEventArgs, AccumulationSelection,
  IAccResizeEventArgs, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
export let data1: any[] = [{ x: 'Sweet Treats', y: 120, text: '120 cal' },
{ x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
{ x: 'Vegetables', y: 470, text: '470 cal' },
{ x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
{ x: 'Fruits', y: 520, text: '520 cal' },
{ x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' }];
export class Pyramid extends SampleBase<{}, {}> {
  public pyramid: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <AccumulationChartComponent id='pyramid-chart' ref={pyramid => this.pyramid = pyramid}
            title='Food Comparison Chart'
            legendSettings={{
              visible: false,
            }}
            load={this.load.bind(this)}
            tooltip={{ enable: true, format: '${point.x} : <b>${point.y} cal</b>' }}
            loaded={this.onChartLoad.bind(this)}
            resized={this.chartResized.bind(this)}
          >
            <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationLegend, AccumulationSelection]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective name='Food' dataSource={data1} xName='x' yName='y' type='Pyramid' width='45%' height='80%'
                neckWidth='15%' gapRatio={0.03} explode={true} emptyPointSettings={{ mode: 'Drop', fill: 'red' }}
                dataLabel={{
                  visible: true, position: 'Inside',
                  name: 'text',
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This sample visualizes food comparison data by using pyramid series. 
        Datalabel shows the Information about the points.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render pyramid chart. <code>dataLabel</code> is used to represent individual data and its value.</p>
          <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
          <p> <code>Legends</code> are disabled in this example, the information about it can be read using <code>Tooltip</code>.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Chart component features are segregated into individual feature-wise modules. To use Pyramid series, we need to inject
                       <code>PyramidSeries</code> module into <code>services</code>.
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
    replace(/-dark/i, "Dark") as AccumulationTheme;
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