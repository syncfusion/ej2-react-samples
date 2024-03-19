/**
 * Sample for Semi pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationDataLabel, PieSeries, Inject, IAccLoadedEventArgs, AccumulationTheme, AccumulationAnnotationsDirective, AccumulationAnnotationDirective, ChartAnnotation, AccumulationAnnotation, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2/base';
export let data1: any[] = [
  { x: 'Chrome', y: 100, text: 'Chrome (100M)<br>40%', tooltipMappingName: '40%'},
  { x: 'UC Browser', y: 40, text: 'UC Browser (40M)<br>16%', tooltipMappingName: '16%' },
  { x: 'Opera', y: 30, text: 'Opera (30M)<br>12%', tooltipMappingName: '12%' },
  { x: 'Safari', y: 30, text: 'Safari (30M)<br>12%', tooltipMappingName: '12%' },
  { x: 'Firefox', y: 25, text: 'Firefox (25M)<br>10%', tooltipMappingName: '10%' },
  { x: 'Others', y: 25, text: 'Others (25M)<br>10%', tooltipMappingName: '10%' }
];
let content = Browser.isDevice ? "<div style='font-Weight:700; font-size:11px;'>Browser<br>Market<br>Shares</div>" : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .pie-chart {
            align :center
        }`;
export class SemiPie extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  private slider: HTMLInputElement;
  render() {
    return (
      <div className='control-pane'>
      <style>{SAMPLE_CSS}</style>
      <div className='control-section row'>
          <AccumulationChartComponent id='pie-chart' ref={pie => pie = pie} legendSettings={{ visible: false }} enableBorderOnMouseMove={false} load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, format: "<b>${point.x}</b><br>Browser Share: <b>${point.tooltip}</b>", header:'' }}>
              <Inject services={[AccumulationDataLabel, PieSeries, AccumulationTooltip, ChartAnnotation, AccumulationAnnotation]} />
              <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective dataSource={data1} tooltipMappingName='tooltipMappingName' xName='x' yName='y' startAngle={270} endAngle={90} explode={false} radius = {Browser.isDevice ? '85%' : '100%'} innerRadius='40%' dataLabel={{ visible: true, position: 'Inside' , enableRotation: true, connectorStyle: { length: '10%' }, name: 'text', font: { fontWeight: '600', size: Browser.isDevice ? '8px' : '11px', color: '#ffffff' } }} />
              </AccumulationSeriesCollectionDirective>
              <AccumulationAnnotationsDirective>
                  <AccumulationAnnotationDirective content={content} region="Series" x= { Browser.isDevice ? "52%" : "50%"} y={ Browser.isDevice ? "82%" : "85%" } />
              </AccumulationAnnotationsDirective>
          </AccumulationChartComponent>
      </div>
      <div id="action-description">
          <p>This example demonstrates a semi-pie chart for mobile browsers usage statistics.</p>
      </div>
      <div id="description">
          <p> 
              In this example, you can see how to render a semi pie chart using <code>StartAngle</code> and <code>EndAngle</code> properties. Data labels are wrapped to fit inside the pie slice.
          </p>                
          <p>
              More information on the data labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/data-label/">documentation section</a>.
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
    replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as AccumulationTheme;
  };
      
}