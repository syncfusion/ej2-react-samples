/**
 * Sample for Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  Inject, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme,
  AccumulationDataLabel
} from '@syncfusion/ej2-react-charts';
export let data1: any[] = [
  { 'x': 'Chrome', y: 37.42, text: '37.42%' }, { 'x': 'UC Browser', y: 16.94, text: '16.94%' },
  { 'x': 'iPhone', y: 17.94, text: '17.94%' },
  { 'x': 'Others', y: 3.69, text: '3.69%' }, { 'x': 'Opera', y: 11.37, text: '11.37%' },
  { 'x': 'Android', y: 11.73, text: '11.73%' }
];
export class Pie extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  private slider: HTMLInputElement;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-9'>
            <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
              title='Mobile Browser Statistics'
              load={this.load.bind(this)}
              legendSettings={{ visible: false }}
              enableSmartLabels={true}
              tooltip={{ enable: true, format: '${point.x} <br> ${point.y} %' }}
              loaded={this.onChartLoad.bind(this)}
            >
              <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y'
                  explode={true} explodeOffset='10%' explodeIndex={0}
                  dataLabel={{
                    visible: true,
                    position: 'Inside', name: 'text',
                    font: {
                      fontWeight: '600',
                      color: '#ffffff'
                    }
                  }}
                  radius='70%'
                >
                </AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Pie Angle:
                        <p id="anglevalue" style={{ fontWeight: 'normal' }}>0</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieangle.bind(this)} ref={s => this.slider = s} id="pieangle" defaultValue="0" min="0" max="360" style={{ width: '90%' }} />
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Outer Radius:
                                <p id="radius" style={{ fontWeight: 'normal' }}>0.8</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieradius.bind(this)} ref={s => this.slider = s} id="pieradius" defaultValue="80" min="0" max="80" style={{ marginLeft: '-5px' }} />
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Explode Radius:
                                <p id="exploderadius" style={{ fontWeight: 'normal' }}>0.1</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieexploderadius.bind(this)} ref={s => this.slider = s} id="pieexploderadius" defaultValue="10" min="0" max="40" style={{ marginLeft: '-5px' }} />
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Explode Index:
                                <p id="explodeindex" style={{ fontWeight: 'normal' }}>5</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieexplodeindex.bind(this)} ref={s => this.slider = s} id="pieexplodeindex" defaultValue="5" min="0" max="6" style={{ marginLeft: '-5px' }} />
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
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
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pie-chart').setAttribute('title', '');
  };
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as AccumulationTheme;
  };
}
ReactDOM.render(<Pie />, document.getElementById('sample'));