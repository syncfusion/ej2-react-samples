/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, AccumulationSelection, Inject,
  IAccLoadedEventArgs, AccumulationChart, AccumulationTheme, Selection, AccumulationAnnotationsDirective, AccumulationAnnotationDirective, ChartAnnotation, AccumulationAnnotation,
  IPointRenderEventArgs,
  pointRender
} from '@syncfusion/ej2-react-charts';
import { Browser, EmitType, getInstance } from '@syncfusion/ej2-base';
export let data1: any[] = [
    { 'x': 'China', y: 35, text: '35%' },
    { 'x': 'India', y: 30, text: '30%' },
    { 'x': 'USA', y: 10.7, text: '10.7%' },
    { 'x': 'Indonesia', y: 7, text: '7%' },
    { 'x': 'Brazil', y: 5.3, text: '5.3%' },
    { 'x': 'Others', y: 12, text: '12%' },
];
let content = Browser.isDevice ? " " : "<div style='font-Weight:600;font-size:14px'>Internet Users <br> by Country<br>2025</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .pie-chart2 {
            align :center
        }`;

export class Doughnut extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
      <style>{SAMPLE_CSS}</style>
      <div className='control-section'>
          <AccumulationChartComponent id='pie-chart2' load={this.load.bind(this)} legendSettings={{ visible: true, toggleVisibility: false, position: 'Bottom', textWrap: 'Wrap' }} enableBorderOnMouseMove={false} selectionMode='Point' tooltip={{ enable: true, format: '<b>${point.x}</b><br>Percentage: <b>${point.y}%</b>', header: "" }}>
              <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, Selection, ChartAnnotation, AccumulationAnnotation]} />
              <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='50%' borderRadius={3} border={{ width: 1, color: '#ffffff' }} dataLabel={{ visible: false }} />
              </AccumulationSeriesCollectionDirective>
              <AccumulationAnnotationsDirective>
                  <AccumulationAnnotationDirective content={content} region="Series" x="50%" y="50%" />
              </AccumulationAnnotationsDirective>
          </AccumulationChartComponent>
      </div>
      <div id="action-description">
          <p>This sample shows statistics on internet usage by country using the donut chart with legends shown at the bottom of the chart.</p>
      </div>
      <div id="description">
          <p> In this example, you can see how to render a donut chart with legends. You can use <code>Radius</code> and <code>InnerRadius</code> properties to render the donut.</p>
          <p><b>Injecting Module</b></p>
          <p>
              Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
          </p>
          <p>
              More information about the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/legend" aria-label="Navigate to the documentation for Legend in React Accumulation Chart component">documentation section</a>.
          </p>
      </div>
  </div>
  )
  }
 
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
    replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
  };
     
}