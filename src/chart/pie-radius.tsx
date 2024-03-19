/**
 * Sample for Pie with Various Radius
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  Inject, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2/base';
export let data1: any[] = [
  { x: 'Argentina', y: 505370, r: Browser.isDevice ? '110' : '100', text: 'Argentina'},
  { x: 'Belgium', y: 551500, r: Browser.isDevice ? '120' : '118.7', text: 'Belgium' },
  { x: 'Dominican Republic', y: 312685, r: '137.5', text: Browser.isDevice ? 'Dominican <br> Republic' :  'Dominican Republic'  },
  { x: 'Cuba', y: 350000, r: '124.6', text: 'Cuba' },
  { x: 'Egypt', y: 301000, r: '150.8', text: 'Egypt' },
  { x: 'Kazakhstan', y: 300000, r: '155.5',text: 'Kazakhstan'   },
  { x: 'Somalia', y: 357022, r: '160.6' , text: 'Somalia' }
];
export class PieRadius extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  render() {
    return (
      <div className='control-pane'>
      <div className='control-section'>
          <AccumulationChartComponent id='pie-chart' legendSettings={{ visible: true, reverse: true }} enableSmartLabels={true} title='Pie with different Radius' enableBorderOnMouseMove={false} enableAnimation={true} load={this.load.bind(this)} tooltip={{ enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>' }}>
              <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
              <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='20%' tooltipMappingName='r' dataLabel={{ visible: true, position: Browser.isDevice ? 'Inside' : 'Outside', name: 'text',enableRotation: true, font: { fontWeight: '600' }, connectorStyle:{length : '20px' ,type: 'Curve'} }} radius='r' />
              </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
          <div id="action-description">
              <p>This sample compares countries by population density and total area using various radius in a pie series.</p>
          </div>
          <div id="description">
              <p>In this example, you can see how to render a doughnut chart with different radius. You can use the <code>Radius</code> mapping property to achieve this feature. <code>DataLabels</code> are used to represent individual data and its values. In addition, the sample shows how to change the order of legends for the doughnut chart by using the <code>Reverse</code> property.</p>
              <p><b>Injecting Module</b></p>
              <p>
                  Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>AccumulationLegend</code> into <code>services</code>.
              </p>
              <p>
                  More information about the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#various-radius-pie-chart">documentation section</a>.
              </p>
          </div>
      </div>
  </div>
    )
  }
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as AccumulationTheme;
  };
     
}