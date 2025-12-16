/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  StackingColumnSeries,
  Category,
  Legend,
  Tooltip, DataLabel,
  ILoadedEventArgs,
  ChartTheme,
  ChartAnnotation,
  AnnotationsDirective,
  AnnotationDirective
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

// Data
const olympicsGoldData = [
  { Country: 'USA', Count: 40 },
  { Country: 'China', Count: 40 },
  { Country: 'Great Britain', Count: 14 },
  { Country: 'France', Count: 16 },
  { Country: 'Australia', Count: 18 },
  { Country: 'Japan', Count: 20 },
  { Country: 'Italy', Count: 12 },
  { Country: 'Netherlands', Count: 15 },
  { Country: 'Germany', Count: 12 },
  { Country: 'South Korea', Count: 13 }
];

const olympicsSilverData = [
  { Country: 'USA', Count: 44 },
  { Country: 'China', Count: 27 },
  { Country: 'Great Britain', Count: 22 },
  { Country: 'France', Count: 26 },
  { Country: 'Australia', Count: 19 },
  { Country: 'Japan', Count: 12 },
  { Country: 'Italy', Count: 13 },
  { Country: 'Netherlands', Count: 7 },
  { Country: 'Germany', Count: 13 },
  { Country: 'South Korea', Count: 9 }
];

const olympicsBronzeData = [
  { Country: 'USA', Count: 42 },
  { Country: 'China', Count: 24 },
  { Country: 'Great Britain', Count: 29 },
  { Country: 'France', Count: 22 },
  { Country: 'Australia', Count: 16 },
  { Country: 'Japan', Count: 13 },
  { Country: 'Italy', Count: 15 },
  { Country: 'Netherlands', Count: 12 },
  { Country: 'Germany', Count: 8 },
  { Country: 'South Korea', Count: 10 }
];
let content = '<img style="margin-top:15px;height:150px;width:240px;opacity:0.5" src="src/chart/images/medals.png" alt="Medals" />';

const SAMPLE_CSS = `
  .control-section { padding: 0 !important; }
  .light-bg {
    color: #000000;
  }
  .dark-bg {
    color: #ffffff;
  }
`;

export class AxisLabelTemplate extends SampleBase<{}, {}> {
  public xAxisLabelTemplate(props): any {
    return (
      <div id="labelTemplate" className="light-bg" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '3px', width: '130px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '12px', width: '18px', textAlign: 'right', display: 'inline-block' }}>{(props.value + 1) + '.'}</span>
          <span style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.label}</span>
        </div>
        <img src={`src/chart/images/labelTemplate/${props.label}.png`} alt={`${props.label} flag`} width={22} height={22} style={{ borderRadius: '50%' }} />
      </div>
    );
  }

  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent
            id="container"
            style={{ textAlign: 'center' }}
            title={"Olympic medal standings 2024"}
            subTitle={'Source: www.olympics.com'}
            titleStyle={{ textOverflow: 'Wrap' }}
            subTitleStyle={{ textOverflow: 'Wrap' }}
            width={Browser.isDevice ? '100%' : '75%'}
            legendSettings={{ visible: true }}
            isTransposed={true} chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            loaded={this.onChartLoad.bind(this)}
            load={this.load.bind(this)}
            primaryXAxis={{
              valueType: 'Category',
              majorGridLines: { width: 0 }, lineStyle: { width: 0 },
              majorTickLines: { width: 0 }, isInversed: true,
              // Provide a React function template
              labelTemplate: this.xAxisLabelTemplate.bind(this)
            }}
            primaryYAxis={{ visible: false, maximum: 130 }} >
            <Inject services={[StackingColumnSeries, Category, Legend, Tooltip, DataLabel, ChartAnnotation]} />
            <AnnotationsDirective>
              <AnnotationDirective content={content} coordinateUnits="Point" x="Netherlands" y="110"></AnnotationDirective>
            </AnnotationsDirective>
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={olympicsGoldData} xName="Country" yName="Count" type="StackingColumn" name="Gold" fill="#FFD700" legendShape="Rectangle" marker={{ dataLabel: { visible: true, position: 'Middle' } }} />
              <SeriesDirective dataSource={olympicsSilverData} xName="Country" yName="Count" type="StackingColumn" name="Silver" fill="#C0C0C0" legendShape="Rectangle" marker={{ dataLabel: { visible: true, position: 'Middle' } }} />
              <SeriesDirective dataSource={olympicsBronzeData} xName="Country" yName="Count" type="StackingColumn" name="Bronze" fill="#CD7F32" legendShape="Rectangle" marker={{ dataLabel: { visible: true, position: 'Middle' } }} />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>

        <div id="action-description">
          <p>
            This sample shows the 2024 Olympic medal standings for the top 10 countries using a stacked Column chart. The x-axis uses label templates to display each country’s rank and name (with flag), enabling quick comparison of Gold, Silver, and Bronze totals.
          </p>
        </div>
        <div id="description">
          <p>
            Use the axis label template feature to customize axis labels via the <code>labelTemplate</code> property on the chart axis. Templates can include HTML markup, conditional styling, and embedded icons or images (for example, country flags). This sample binds rank and country to the template while the series plot medal counts.
          </p>
          <p>
            More information on axis labels can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/axis-customization/" style={{ marginLeft: 4 }}>
              documentation section
            </a>.
          </p>
        </div>
      </div>
    );
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
      replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
  };

  public onChartLoad(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
      replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    const isDark = selectedTheme.includes('Dark') || selectedTheme.includes('HighContrast');
    const labels = document.querySelectorAll('#labelTemplate');
    for (var i = 0; i < labels.length; i++) {
      let element = labels[i];
      element.classList.remove('dark-bg');
      element.classList.remove('light-bg');
      element.classList.add(isDark ? 'dark-bg' : 'light-bg');
    }
  };
}