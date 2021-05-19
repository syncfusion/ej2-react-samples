/**
 * Sample for Pie with Various Radius
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  Inject, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
export let data1: any[] = [
  { x: 'Argentina', y: 505370, r: '50%' },
  { x: 'Belgium', y: 551500, r: '70%' },
  { x: 'Cuba', y: 312685, r: '84%' },
  { x: 'Dominican Republic', y: 350000, r: '97%' },
  { x: 'Egypt', y: 301000, r: '84%' },
  { x: 'Kazakhstan', y: 300000, r: '70%' },
  { x: 'Somalia', y: 357022, r: '90%' }
];
export class PieRadius extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
            legendSettings={{
              visible: true
            }}
            enableSmartLabels={true}
            enableAnimation={true}
            load={this.load.bind(this)}
            tooltip={{ enable: true }}
          >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='20%'
                dataLabel={{
                  visible: true, position: 'Outside', name: 'x'
                }}
                radius='r'
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>

          <div id="action-description">
            <p>
            This sample compares countries by population density and total area by using the various radius in pie series.
            </p>
          </div>
          <div id="description">
          <p> In this example, you can see how to render doughnut chart with different radius. You can use <code>radius</code> mapping property to achieve this feature.<code>dataLabel</code>  is used to represent individual data and its value.</p>
            <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
            <p><b>Injecting Module</b></p>
            <p>
              Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
            </p>
          </div>
        </div>
      </div>
    )
  }
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark") as AccumulationTheme;
  };
     
}