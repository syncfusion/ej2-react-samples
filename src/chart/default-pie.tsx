/**
 * Sample for Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  Inject, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme,
  AccumulationDataLabel
} from '@syncfusion/ej2-react-charts';
export let data1: any[] = [
  { 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' }, 
  { 'x': 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
  { 'x': 'Opera', y: 3.12, text: 'Opera: 3.12%' },
  { 'x': 'Sogou Explorer', y:1.73, text: 'Sogou Explorer: 1.73%' },
  { 'x': 'QQ', y: 3.96, text: 'QQ: 3.96%' },
  { 'x': 'Safari', y:4.73, text: 'Safari: 4.73%' },
  { 'x': 'Internet Explorer', y:6.12, text: 'Internet Explorer: 6.12%' },
  { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
  { 'x': 'Others', y: 9.57, text: 'Others: 9.57%' }, 
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .pie-chart {
            align :center
        }`;
export class Pie extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  private slider: HTMLInputElement;
  render() {
    return (
      <div className='control-pane'>
            <style>
                    {SAMPLE_CSS}
                </style>
        <div className='control-section row'>
            <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
              title='Browser Market Share'
              load={this.load.bind(this)}
              legendSettings={{ visible: false }}
              enableSmartLabels={true}
              enableAnimation={false}
              center={{x: '50%', y: '50%'}}
              enableBorderOnMouseMove={false}
              tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:"" }}
              loaded={this.onChartLoad.bind(this)}
            >
              <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y'
                  explode={true} explodeOffset='10%' explodeIndex={0} startAngle={30}
                  dataLabel={{
                    visible: true,
                    position: 'Outside', name: 'text',
                    font: {
                      fontWeight: '600'
                    }
                  }}
                  radius='70%'
                >
                </AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This React Pie Chart example demonstrates a pie chart for mobile browsers usage statistics. Datalabels show information about the points.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render and configure a pie chart. The pie chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole . The radius of the pie chart can be customized using the <code>Radius</code> property.</p>
          <p>
                        More information on the pie series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart">documentation section</a>.
                  </p>
        </div>
      </div>
    )
  }
  public pieangle(e: Event): void {
    let angle: string = (document.getElementById('pieangle') as HTMLSelectElement).value;
    this.pie.series[0].startAngle = parseFloat(angle);
    this.pie.series[0].endAngle = parseFloat(angle);
    this.pie.series[0].animation.enable = false;
    document.getElementById('anglevalue').innerHTML = angle;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public pieradius(e: Event): void {
    let radius: string = (document.getElementById('pieradius') as HTMLSelectElement).value;
    this.pie.series[0].radius = radius + '%';
    document.getElementById('radius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public pieexploderadius(e: Event): void {
    let radius: string = (document.getElementById('pieexploderadius') as HTMLSelectElement).value;
    this.pie.visibleSeries[0].explodeOffset = radius + '%';
    document.getElementById('exploderadius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public pieexplodeindex(e: Event): void {
    let index: number = +(document.getElementById('pieexplodeindex') as HTMLSelectElement).value;
    this.pie.visibleSeries[0].explodeIndex = index;
    document.getElementById('explodeindex').innerHTML = index.toString();
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public piecenterx(e: Event): void {
    let x: string = (document.getElementById('x') as HTMLSelectElement).value;
    this.pie.center.x = x + '%';
    document.getElementById('xvalue').innerHTML = x + '%';
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public piecentery(e: Event): void {
    let y: string = (document.getElementById('y') as HTMLSelectElement).value;
    this.pie.center.y = y + '%';
    document.getElementById('yvalue').innerHTML = y + '%';
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pie-chart').setAttribute('title', '');
  };
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
    replace(/light/i, "Light").replace(/contrast/i,'Contrast') as AccumulationTheme;
  };
      
}