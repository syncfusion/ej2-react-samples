/**
 * Sample for Funnel Series
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  Inject, AccumulationLegend, FunnelSeries, AccumulationTooltip, IAccLoadedEventArgs,
  AccumulationDataLabel, IAccResizeEventArgs, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
export let data1: any[] = [{ x: "Hired", y: 55, text: "Hired: 55" },
{ x: "Personal Interview", y: 58, text: "Personal Interview: 58" },
{ x: "Telephonic Interview", y: 85, text: "Telephonic Interview: 85" },
{ x: "Screening", y: 105, text: "Screening: 105" },
{ x: "Initial Validation", y: 145, text: "Initial Validation: 145" },
{ x: "Candidates Applied", y: 250, text: "Candidates Applied: 250" },
];
export class Funnel extends SampleBase<{}, {}> {
  public funnel: AccumulationChartComponent;
  private slider: HTMLInputElement;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
            <AccumulationChartComponent   legendSettings={{ visible: false }} id='funnel-chart' ref={funnel => this.funnel = funnel} title='Recruitment Process' load={this.load.bind(this)} tooltip={{ enable: false, format: '${point.x} : <b>${point.y}</b>' }}  loaded={this.onChartLoad.bind(this)}>
              <Inject services={[FunnelSeries, AccumulationTooltip, AccumulationDataLabel,AccumulationLegend]} />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' type='Funnel' width='45%' height='80%' neckWidth='15%' gapRatio={0.03} neckHeight='18%' explode={false} dataLabel={{
                  name: 'text', visible: true, position: 'Inside',font:{fontWeight:'600'}
                }}>
                </AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
        </div>
        <div id="action-description">
        <p>
        This React Funnel Chart example shows a funnel chart for recruitment process. Datalabels show information about the points.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render and configure a funnel chart. The labels are smartly arranged to avoid overlapping. The width and height of the funnel chart can be customized using the <code>NeckWidth</code> and <code>NeckHeight</code> properties.</p>
          <p> <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Chart component features are segregated into individual feature-wise modules. To use Funnel series, we need to inject
                       <code>FunnelSeries</code> module into <code>services</code>.
                  </p>
                  <p>
                  More information about the funnel series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/funnel/">documentation section</a>.
                  </p>
        </div>
      </div>
    )
  }
 


  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('funnel-chart').setAttribute('title', '');
  };

  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as AccumulationTheme;
   
  };

 
}