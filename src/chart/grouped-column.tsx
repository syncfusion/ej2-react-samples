/**
 * Sample for grouped Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel, ITooltipRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { loadChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: Object[] = [
  { x: '2016', y: 104 },
  { x: '2020', y: 121 },
  { x: '2024', y: 113 }
];
export let data2: Object[] = [
  { x: '2016', y: 46 },
  { x: '2020', y: 46 },
  { x: '2024', y: 39 }
];
export let data3: Object[] = [
  { x: '2016', y: 65 },
  { x: '2020', y: 67 },
  { x: '2024', y: 65 }
];
export let data4: Object[] = [
  { x: '2016', y: 29 },
  { x: '2020', y: 27 },
  { x: '2024', y: 22 }
];
export let data5: Object[] = [
  { x: '2016', y: 91 },
  { x: '2020', y: 70 },
  { x: '2024', y: 88 }
];
export let data6: Object[] = [
  { x: '2016', y: 38 },
  { x: '2020', y: 26 },
  { x: '2024', y: 38 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class GroupedColumn extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane'>
        <style>{SAMPLE_CSS}</style>
        <div className='control-section'>
          <ChartComponent id="charts" style={{ textAlign: 'center' }} load={this.load.bind(this)} tooltipRender={this.tooltipRender.bind(this)} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Number of Medals Won' }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} tooltip={{ enable: true, enableHighlight: true, header: '<b>${point.x}</b>', format: '${series.groupName} : <b>${point.y} Gold</b>' }} width={Browser.isDevice ? '100%' : '75%'} title="Olympic Medal Trends by Country and Year" subTitle="A Historical Overview of Medal Counts Across Nations" legendSettings={{ visible: true, shapeWidth: 9, shapeHeight: 9 }} loaded={this.onChartLoad.bind(this)}>
            <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={data1} xName="x" yName="y" name="USA Total Medals" type="Column" groupName="USA" columnWidth={0.7} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'></SeriesDirective>
              <SeriesDirective dataSource={data2} xName="x" yName="y" name="USA Gold Medals" type="Column" groupName="USA" columnWidth={0.5} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'></SeriesDirective>
              <SeriesDirective dataSource={data3} xName="x" yName="y" name="UK Total Medals" type="Column" groupName="UK" columnWidth={0.7} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'></SeriesDirective>
              <SeriesDirective dataSource={data4} xName="x" yName="y" name="UK Gold Medals" type="Column" groupName="UK" columnWidth={0.5} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'></SeriesDirective>
              <SeriesDirective dataSource={data5} xName="x" yName="y" name="China Total Medals" type="Column" groupName="China" columnWidth={0.7} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'></SeriesDirective>
              <SeriesDirective dataSource={data6} xName="x" yName="y" name="China Gold Medals" type="Column" groupName="China" columnWidth={0.5} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} cornerRadius={{ topLeft: 4, topRight: 4 }} legendShape='Rectangle'></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
        <div id="action-description">
          <p>This sample visualizes the Olympics medal count using a grouped column series. Data labels are used to display the values of data points.</p>
        </div>
        <div id="description">
          <p>
            In this example, you can see how to render and configure the column type charts.
            Column type charts are used for comparing the frequency, count, total or average of data in different categories.
            You can group the column series by using <code>groupName</code> property.
          </p>
          <p>
            <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
          </p>
          <p><b>Injecting Module</b></p>
          <p>
            Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject <code>ColumnSeries</code> module using <code>services</code>.
          </p>
          <br />
          <p>
            More information about the grouped column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column#grouped-column" aria-label="Navigate to the documentation for Grouped Column in React Chart component">documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
  public onChartLoad(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('charts');
    chart.setAttribute('title', '');
  };

  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  };

  public tooltipRender(args: ITooltipRenderEventArgs): void {
    const seriesName: string = args.series.name;
    const groupName: string = (args.series as { groupName?: string }).groupName ?? '';
    const value: number = args.point.y as number;
    args.text = seriesName.includes('Gold') ? `${groupName}: <b>${value} Gold</b>` : `${groupName}: <b>${value} Total</b>`;
  };

}
