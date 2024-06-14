/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import {
  ChartComponent, SeriesCollectionDirective, SeriesDirective,Highlight, ILoadedEventArgs, ChartTheme, Inject, Tooltip, Category, AreaSeries, Legend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data1 = [
  { x: 'Onion', y: 3000 }, { x: 'Potato', y: 4000 },
  { x: 'Tomato', y: -4000 }, { x: 'Corn', y: -2000 },
  { x: 'Carrot', y: 5000 }
];
export let data2 = [
  { x: 'Onion', y: 2000 }, { x: 'Potato', y: 3000 },
  { x: 'Tomato', y: 4000 }, { x: 'Corn', y: 2000 },
  { x: 'Carrot', y: 3000 }
];
export let data3 = [
  { x: 'Onion', y: 2000 }, { x: 'Potato', y: -1000 },
  { x: 'Tomato', y: -3000 }, { x: 'Corn', y: 4000 },
  { x: 'Carrot', y: 1000 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
/**
 * Area empty sample
 */
export class AreaNegative extends SampleBase<{}, {}> {
  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent
            id="charts"
            style={{ textAlign: 'center' }}
            primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }}
            primaryYAxis={{labelFormat: '${value}', minimum: -4000, maximum: 8000, interval: 2000, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
            chartArea={{ border: { width: 0 } }}
            legendSettings={{ enableHighlight :true }}
            load={this.load.bind(this)}
            margin={{left : Browser.isDevice ? 2 : 10 ,  right : Browser.isDevice ? 2 : 10, top : Browser.isDevice ? 2 : 10, bottom : Browser.isDevice ? 2 : 10}}
            width={Browser.isDevice ? '100%' : '75%'}
            title="Profit and Loss"
            tooltip={{ enable: true }}
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject services={[AreaSeries, Category, Tooltip, Legend, Highlight]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={data1} xName="x" yName="y" name="Company A" opacity={0.75} marker={{ visible: true, shape: 'Circle', isFilled: true, width: 7, height: 7 }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
              <SeriesDirective dataSource={data2} xName="x" yName="y" name="Company B" opacity={0.75} marker={{ visible: true, shape: 'Diamond', isFilled: true, width: 7, height: 7 }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
              <SeriesDirective dataSource={data3} xName="x" yName="y" name="Company C" opacity={0.75} marker={{ visible: true, shape: 'Rectangle', isFilled: true, width: 5, height: 5 }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
           </div>
                <div id="action-description">
                <p>
                This sample illustrates an area series with negative values. Data points with negative values are shown here.
                </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render an area series with negative values. Similar to line type series, but the area gets closed and filled with series color. You can use <a target="_blank" href=" https://ej2.syncfusion.com/react/documentation/api/chart/series/#border" aria-label="Navigate to the border property reference for React Chart component">border</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/series/#fill" aria-label="Navigate to the fill property reference for React Chart component">fill </a> properties to customize the area. Also, the legend is enabled with the shape of the series type.
                   </p>
                    <br></br>
                    <p>
                    More information on the area negative points can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data#empty-points" aria-label="Navigate to the documentation for Empty points in React Chart component">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
    
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    
}