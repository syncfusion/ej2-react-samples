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
            title='Rio Olympics Gold'
            tooltip={{ enable: true, format:'<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>' }}
            load={this.load.bind(this)}
            enableBorderOnMouseMove={false}
            legendSettings={{
              visible: false
            }}
            loaded={this.onChartLoad.bind(this)}>
            <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective  dataSource={data1} xName='x' yName='y' startAngle={60}
                dataLabel={{
                  visible: true, position: 'Outside',
                  connectorStyle: { length: '20px', type: 'Curve' }, name: 'text',
                  font:  {fontWeight: '600' }
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This sample shows the gold medal count scored by each country at the Rio Olympic Games using smart labels on the chart.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how the labels can be arranged smartly without overlapping. You can use the <code>EnableSmartLabels</code> property to enable or disable the support.</p>
          <p style={{ fontWeight: 500 }}> Injecting Module </p>
          <p> Accumulation chart component features are segregated into individual feature-wise modules. To use DataLabel, we need to inject <code>AccumulationDataLabel</code> into <code>services</code>.</p>
          <p>
                        More information on the pie series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/data-label/#smart-labels">documentation section</a>.
                  </p>
        </div>
       
      </div>
    )
  }
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pie-chart').setAttribute('title', '');
  };
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as AccumulationTheme;
  };
      
}