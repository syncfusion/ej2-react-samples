/**
 * Samples for Smart Labels in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  Inject, AccumulationLegend, AccumulationDataLabel, PieSeries, IAccLoadedEventArgs, AccumulationTheme,
  AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data1: any[] = [
  { 'x': 'USA', y: 46, text: 'United States of America: 46' }, 
  { 'x': 'China', y: 26, text: 'China: 26' },
  { 'x': 'Russia', y: 19, text: 'Russia: 19' },
  { 'x': 'Germany', y: 17, text: 'Germany: 17' },
  { 'x': 'Japan', y: 12, text: 'Japan: 12' },
  { 'x': 'France', y: 10, text: 'France: 10' },
  { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
  { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
  { 'x': 'Italy', y: 8, text: 'Italy: 8' },
  { 'x': 'Australia', y: 8, text: 'Australia: 8' },
  { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
  { 'x': 'NewZealand', y: 4, text: 'New Zealand: 4' },
  { 'x': 'Uzbekistan', y: 4, text: 'Uzbekistan: 4' },
  { 'x': 'Kazakhstan', y: 3, text: 'Kazakhstan: 3' },
  { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
  { 'x': 'Switzerland', y: 3, text: 'Switzerland: 3' },
  { 'x': 'Argentina', y: 3, text: 'Argentina: 3' },
  { 'x': 'South Africa', y: 2, text: 'South Africa: 2' },
  { 'x': 'North Korea', y: 2, text: 'North Korea: 2' }
];
export class SmartLabels extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <AccumulationChartComponent id='pie-chart'
            title='RIO Olympics Gold'
            tooltip={{ enable: true, format: '${point.x} : <b>${point.y}%</b>' }}
            load={this.load.bind(this)}
            legendSettings={{
              visible: false
            }}
            loaded={this.onChartLoad.bind(this)}>
            <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective name='RIO' dataSource={data1} xName='x' yName='y'
                dataLabel={{
                  visible: true, position: 'Outside',
                  connectorStyle: { length: '10%' }, name: 'text',
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This sample illustrates the Rio Olympic’s gold medal count by using smart labels in the chart. The smart label placement for a series can be shown, when it contains more of points.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to arrange the labels smartly without overlapping with each other. You can use <code>enableSmartLabels</code> property to enable or disable the action. Legend with paging is enabled in this sample.</p>
          <p style={{ fontWeight: 500 }}> Injecting Module </p>
          <p> Accumulation chart component features are segregated into individual feature-wise modules. To use AccumulationDataLabel, we need to inject <code>AccumulationDataLabel</code> into <code>services</code>.</p>
        </div>
      </div>
    )
  }
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pie-chart').setAttribute('title', '');
  };
      // custom code start
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark") as AccumulationTheme;
  };
      // custom code end
}