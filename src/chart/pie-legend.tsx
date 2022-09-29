/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, AccumulationSelection, Inject,
  IAccLoadedEventArgs, AccumulationChart, AccumulationTheme, Selection, AccumulationAnnotationsDirective, AccumulationAnnotationDirective, ChartAnnotation, AccumulationAnnotation
} from '@syncfusion/ej2-react-charts';
import { Browser, getInstance } from '@syncfusion/ej2-base';
export let data1: any[] = [
  { 'x': 'Net-tution', y: 21, text: '21%' },
  { 'x': 'Private Gifts', y: 8, text: '8%' },
  { 'x': 'All Other', y: 9, text: '9%' },
  { 'x': 'Local Revenue', y: 4, text: '4%' },
  { 'x': 'State Revenue', y: 21, text: '21%' },
  { 'x': 'Federal Revenue', y: 16, text: '16%' },
  { 'x': 'Self-supporting Operations', y: 21, text: '21%' },
];
let content = "<div style='font-Weight:600;font-size:15px'>Expenses in Year</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .pie-chart2 {
            align :center
        }`;
let count: number = 0;
export class Doughnut extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
          <style>
                    {SAMPLE_CSS}
                </style>
        <div className='control-section'>
          <AccumulationChartComponent id='pie-chart2'  style={{ textAlign: "center" }} ref={pie => this.pie = pie}
            legendSettings={{
              visible: true, toggleVisibility: false,
              position: 'Right', height: '28%', width: '44%',
              textWrap:'Wrap',
              maximumLabelWidth:100,
            }}
            enableSmartLabels={true}
            selectionMode={'Point'}
            enableBorderOnMouseMove={false}
            load={this.load.bind(this)}
            tooltip={{ enable: false, header: '<b>${point.x}</b>', format: 'Composition: <b>${point.y}%</b>' }}
            
          >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, Selection, ChartAnnotation,AccumulationAnnotation ]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective  name='Revenue' dataSource={data1} xName='x' yName='y' innerRadius='40%' startAngle={0}
                endAngle={360}
                dataLabel={{
                  visible: true, position: 'Inside',
                  name: 'text',
                  font: { color: 'white', fontWeight: '600', size: '14px' }
                }}
              >
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
            <AccumulationAnnotationsDirective>
                <AccumulationAnnotationDirective content={content}
                region="Series"
                x="52%"
                y="50%">
                </AccumulationAnnotationDirective>
              </AccumulationAnnotationsDirective>
          </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This sample shows statistics on expenditure made in a year using the donut chart with legends shown at the right side of the chart.
    </p>
        </div>
        <div id="description">
          <p>In this example, you can see how to render a doughnut chart with legends. You can use <code>Radius</code> and InnerRadius properties to render the doughnut. Here, the legend text is wrapped using the <code>TextWrap</code> property.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
          </p>
          <p>
                        More information about the pie series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#various-radius-pie-chart">documentation section</a>.
                  </p>
        </div>
      </div>
    )
  }
 
  public getFontSize(width: number): string {
    if (width > 300) {
      return '13px';
    } else if (width > 250) {
      return '8px';
    } else {
      return '6px';
    }
  };
 
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
    replace(/light/i, "Light") as AccumulationTheme;
  };
     
}