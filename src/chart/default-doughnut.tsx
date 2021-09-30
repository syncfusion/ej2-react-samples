/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, AccumulationSelection, Inject,
  IAccLoadedEventArgs, AccumulationChart, AccumulationTheme, Selection
} from '@syncfusion/ej2-react-charts';
import { Browser, getInstance } from '@syncfusion/ej2-base';
export let data1: any[] = [
  { 'x': 'Net-tution and Fees', y: 21, text: '21%' },
  { 'x': 'Self-supporting Operations', y: 21, text: '21%' },
  { 'x': 'Private Gifts', y: 8, text: '8%' },
  { 'x': 'All Other', y: 8, text: '8%' },
  { 'x': 'Local Revenue', y: 4, text: '4%' },
  { 'x': 'State Revenue', y: 21, text: '21%' },
  { 'x': 'Federal Revenue', y: 16, text: '16%' }
];
let count: number = 0;
export class Doughnut extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <AccumulationChartComponent id='pie-chart2' ref={pie => this.pie = pie}
            title='Education Institutional Revenue'
            legendSettings={{
              visible: true, toggleVisibility: false,
              position: 'Right', height: '28%', width: '44%'
            }}
            enableSmartLabels={true}
            selectionMode={'Point'}
            load={this.load.bind(this)}
            animationComplete={this.onAnimationComplete.bind(this)}
            tooltip={{ enable: false, header: '<b>${point.x}</b>', format: 'Composition: <b>${point.y}%</b>' }}
            textRender={this.onTextRender.bind(this)}
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, Selection]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective  name='Revenue' dataSource={data1} xName='x' yName='y' innerRadius='40%' startAngle={0}
                endAngle={360}
                dataLabel={{
                  visible: true, position: 'Inside',
                  name: '${point.y}',
                  font: { color: 'white', fontWeight: '600', size: '14px' }
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
          <div id="center_title" style={{ visibility: 'hidden', position: 'absolute' }}>Expenses in Year</div>
        </div>
        <div id="action-description">
        <p>
        This sample illustrates an educational institute’s revenue by using the pie with legend series. The legend will be displayed at right side of the chart.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render doughnut chart. You can use <code>radius</code> and <code>innerRadius</code> properties to render the doughnut and also use <code>border</code>, <code>fill</code> properties to customize the point. <code>dataLabel</code> is used to represent individual data and its value.</p>
          <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
          </p>
        </div>
      </div>
    )
  }
  public onAnimationComplete(args: IAccAnimationCompleteEventArgs): void {
    let centerTitle: HTMLDivElement = document.getElementById('center_title') as HTMLDivElement;
    centerTitle.style.fontSize = this.getFontSize(args.accumulation.initialClipRect.width);
    let rect: ClientRect = centerTitle.getBoundingClientRect();
    centerTitle.style.top = (args.accumulation.origin.y + args.accumulation.element.offsetTop - (rect.height / 2)) + 'px';
    centerTitle.style.left = (args.accumulation.origin.x + args.accumulation.element.offsetLeft - (rect.width / 2)) + 'px';
    centerTitle.style.visibility = 'visible';
    let points: AccPoints[] = args.accumulation.visibleSeries[0].points;
    for (let point of points) {
      if (point.labelPosition === 'Outside' && point.labelVisible) {
        let label: Element = document.getElementById('pie-chart2_datalabel_Series_0_text_' + point.index);
        label.setAttribute('fill', 'black');
      }
    }
    this.pie.animateSeries = false;
  };
  public getFontSize(width: number): string {
    if (width > 300) {
      return '13px';
    } else if (width > 250) {
      return '8px';
    } else {
      return '6px';
    }
  };
  public onTextRender(args: IAccTextRenderEventArgs): void {
    let pie: AccumulationChart = getInstance('#pie-chart2', AccumulationChart) as AccumulationChart;
    args.series.dataLabel.font.size = this.getFontSize(pie.initialClipRect.width);
    args.text = args.text + '%';
  };
  public onChartLoad(args: IAccLoadedEventArgs): void {
    let pie: AccumulationChart = getInstance('#pie-chart2', AccumulationChart) as AccumulationChart;
    document.getElementById('pie-chart2').setAttribute('title', '');
    pie.loaded = null;
    let pieinterval = setInterval(
        () => {
            if (document.getElementById('pie-chart2')) {
                if (count === 0) {
                    pie.series[0].dataSource = [{ 'x': 'Net-tution and Fees', y: 10 }, { 'x': 'Self-supporting Operations', y: 10 },
                    { 'x': 'Private Gifts', y: 13 }, { 'x': 'All Other', y: 14 },
                    { 'x': 'Local Revenue', y: 9 }, { 'x': 'State Revenue', y: 13 },
                    { 'x': 'Federal Revenue', y: 8 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 1) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 120 }, { 'x': 'Self-supporting Operations', y: 31 },
                        { 'x': 'Private Gifts', y: 6 }, { 'x': 'All Other', y: 12 },
                        { 'x': 'Local Revenue', y: 25 }, { 'x': 'State Revenue', y: 11 },
                        { 'x': 'Federal Revenue', y: 12 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 2) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 6 }, { 'x': 'Self-supporting Operations', y: 22 },
                        { 'x': 'Private Gifts', y: 11 }, { 'x': 'All Other', y: 15 },
                        { 'x': 'Local Revenue', y: 13 }, { 'x': 'State Revenue', y: 10 },
                        { 'x': 'Federal Revenue', y: 8 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 3) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 15 }, { 'x': 'Self-supporting Operations', y: 10 },
                        { 'x': 'Private Gifts', y: 18 }, { 'x': 'All Other', y: 20 },
                        { 'x': 'Local Revenue', y: 30 }, { 'x': 'State Revenue', y: 20 },
                        { 'x': 'Federal Revenue', y: 25 }
                    ];
                    pie.animate();
                    count++;
                }
                else if (count === 4) {
                    pie.series[0].dataSource = [
                        { 'x': 'Net-tution and Fees', y: 21 }, { 'x': 'Self-supporting Operations', y: 10 },
                        { 'x': 'Private Gifts', y: 15 }, { 'x': 'All Other', y: 15 },
                        { 'x': 'Local Revenue', y: 11 }, { 'x': 'State Revenue', y: 20 },
                        { 'x': 'Federal Revenue', y: 60 }
                    ];
                    pie.animate();
                    count = 0;
                }
            } else {
                clearInterval(pieinterval);
            }
        },
        3000);
  };
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
    replace(/light/i, "Light") as AccumulationTheme;
  };
     
}