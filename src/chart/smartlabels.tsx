/**
 * Samples for Smart Labels in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, PieSeries, IAccLoadedEventArgs, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadAccumulationChartTheme } from './theme-color';

export let data1: any[] = [
  { x: 'USA', y: 40, text: Browser.isDevice ? 'USA: 40' : 'United States of America: 40' },
  { x: 'China', y: 40, text: 'China: 40' },
  { x: 'Japan', y: 20, text: 'Japan: 20' },
  { x: 'Australia', y: 18, text: Browser.isDevice ? 'AU: 18' : 'Australia: 18' },
  { x: 'France', y: 16, text: 'France: 16' },
  { x: 'Netherlands', y: 15, text: Browser.isDevice ? 'NL: 15' : 'Netherlands: 15' },
  { x: 'Great Britain', y: 14, text: Browser.isDevice ? 'GB: 14' : 'Great Britain: 14' },
  { x: 'South Korea', y: 13, text: Browser.isDevice ? 'SK: 13' : 'South Korea: 13' },
  { x: 'Germany', y: 12, text: Browser.isDevice ? 'GE: 12' : 'Germany: 12' },
  { x: 'Italy', y: 12, text: 'Italy: 12' },
  { x: 'NewZealand', y: 10, text: Browser.isDevice ? 'NZ: 10' : 'New Zealand: 10' },
  { x: 'Canada', y: 9, text: Browser.isDevice ? 'CA: 9' : 'Canada: 9' },
  { x: 'Uzbekistan', y: 8, text: Browser.isDevice ? 'UZB: 8' : 'Uzbekistan: 8' },
  { x: 'Hungary', y: 6, text: Browser.isDevice ? 'HU: 6' : 'Hungary: 6' },
  { x: 'Kenya', y: 4, text: Browser.isDevice ? 'KE: 4' : 'Kenya: 4' },
  { x: 'Georgia', y: 3, text: Browser.isDevice ? 'GE: 3' : 'Georgia: 3' },
  { x: 'North Korea', y: 2, text: Browser.isDevice ? 'NK: 2' : 'North Korea: 2' },
  { x: 'Hong Kong', y: 2, text: Browser.isDevice ? 'HK: 2' : 'South Africa: 2' }
];

export class SmartLabels extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <AccumulationChartComponent id='pie-chart' title='Summer Olympics 2024 - Gold Medals' subTitle='Source: wikipedia.org' tooltip={{ enable: true, format: '<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>', enableHighlight: true, header:"" }} load={this.load.bind(this)} enableBorderOnMouseMove={false} enableSmartLabels={true} legendSettings={{ visible: false }} loaded={this.onChartLoad.bind(this)}>
            <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='RIO' startAngle={60} innerRadius='0%' dataLabel={{ visible: true, textWrap: Browser.isDevice ? 'Wrap' : 'Normal',  position: 'Outside', connectorStyle: { length: Browser.isDevice ? '2px' : '20px', type: 'Curve' }, name: 'text', font: { size: Browser.isDevice ? '7px' : '12px', fontWeight: '600' } }} radius={Browser.isDevice ? '40%' : '65%'} />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div id="action-description">
          <p>This sample shows the gold medal count scored by each country at the summer olympics 2024 games using smart labels on the chart.</p>
        </div>
        <div id="description">
          <p>
            In this example, you can see how the labels can be arranged smartly without overlapping. You can use the <code>EnableSmartLabels</code> property to enable or disable the support.
          </p>
          <p>
              <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
          </p>
          <p style={{ fontWeight: 500 }}> Injecting Module </p>
          <p> Accumulation chart component features are segregated into individual feature-wise modules. To use DataLabel, we need to inject <code>AccumulationDataLabel</code> into <code>services</code>.</p>
          <p>
            More information on the smart labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/data-label#smart-labels" aria-label="Navigate to the documentation for Smart Labels in React Accumulation Chart component">documentation section</a>.
          </p>
        </div>
      </div>
    )
  }

  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pie-chart').setAttribute('title', '');
  };

  public load(args: IAccLoadedEventArgs): void {
    loadAccumulationChartTheme(args);
  };
}