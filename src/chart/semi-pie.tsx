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
  { x: 'Chrome', y: 60, text: 'Chrome: 60%' },
  { x: 'UC Browser', y: 10, text: 'UC Browser: 10%' },
  { x: 'Opera', y: 8, text: 'Opera: 8%' },
  { x: 'Safari', y: 15, text: 'Safari: 15%' },
  { x: 'InternetExplorer', y: 7, text: 'Internet Explorer: 7%' },
  { x: 'QQ', y: 10, text: 'QQ: 10%' },
];
let content = "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>";
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
  public startangle(e: Event): void {
    let rangeMin: string = (document.getElementById('range-min') as HTMLSelectElement).value;
    this.pie.series[0].startAngle = parseFloat(rangeMin);
    document.getElementById('startangle').innerHTML = rangeMin;
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public endangle(e: Event): void {
    let rangeMax: string = (document.getElementById('range-max') as HTMLSelectElement).value;
    this.pie.series[0].endAngle = parseFloat(rangeMax);
    document.getElementById('endangle').innerHTML = rangeMax;
    this.pie.series[0].animation.enable = false;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  public onChange(e: Event): void {
    let innerRadius: string = (document.getElementById('inner-radius') as HTMLSelectElement).value;
    this.pie.series[0].innerRadius = innerRadius + '%';
    document.getElementById('innerradius').innerHTML = (parseInt(innerRadius, 10) / 100).toFixed(2);
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
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as AccumulationTheme;
  };
      
}