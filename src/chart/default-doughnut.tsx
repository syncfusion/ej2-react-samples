/**
 * Default Doughnut Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, AccumulationSelection, Inject,
  IAccLoadedEventArgs, AccumulationChart, AccumulationTheme
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
export class Doughnut extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
            title='Education Institutional Revenue'
            legendSettings={{
              visible: true, toggleVisibility: false,
              position: 'Right', height: '28%', width: '44%'
            }}
            enableSmartLabels={true}
            load={this.load.bind(this)}
            animationComplete={this.onAnimationComplete.bind(this)}
            tooltip={{ enable: true, format: '${point.x} <br> Composition: ${point.y}%' }}
            textRender={this.onTextRender.bind(this)}
            loaded={this.onChartLoad.bind(this)}
            selectionMode={'Point'}
          >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='40%' startAngle={0}
                endAngle={360}
                dataLabel={{
                  visible: true, position: 'Inside',
                  name: 'text',
                  font: { color: 'white', fontWeight: '600', size: '14px' }
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
          <div id="center_title" style={{ visibility: 'hidden', position: 'absolute' }}>Expenses <br /> Year 2013</div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates doughnut chart for a educational institutional revenue with legends placed in chart.
          </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render doughnut chart. You can use <code>radius</code> and <code>innerRadius</code> properties to render the doughnut and also use <code>border</code>, <code>fill</code> properties to customize the point. <code>dataLabel</code> are used to represent individual data and its value.</p>
          <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
        </div>
      </div>
    )
  }
  public onAnimationComplete(args: IAccAnimationCompleteEventArgs): void {
    let centerTitle: HTMLDivElement = document.getElementById('center_title') as HTMLDivElement;
    centerTitle.style.fontSize = this.getFontSize(args.accumulation.initialClipRect.width);
    let rect: ClientRect = centerTitle.getBoundingClientRect();
    centerTitle.style.top = (args.accumulation.center.y + args.accumulation.element.offsetTop - (rect.height / 2)) + 'px';
    centerTitle.style.left = (args.accumulation.center.x + args.accumulation.element.offsetLeft - (rect.width / 2)) + 'px';
    centerTitle.style.visibility = 'visible';
    let points: AccPoints[] = args.accumulation.visibleSeries[0].points;
    for (let point of points) {
      if (point.labelPosition === 'Outside' && point.labelVisible) {
        let label: Element = document.getElementById('pie-chart_datalabel_Series_0_text_' + point.index);
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
    let pie: AccumulationChart = getInstance('#pie-chart', AccumulationChart) as AccumulationChart;
    args.series.dataLabel.font.size = this.getFontSize(pie.initialClipRect.width);
    pie.animateSeries = true;
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