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
export let data1: any[] = [{ x: 'Renewed', y: 18.20, text: '18.20%' },
{ x: 'Subscribed', y: 27.3, text: '27.3%' },
{ x: 'Support', y: 55.9, text: '55.9%' },
{ x: 'Downloaded', y: 76.8, text: '76.8%' },
{ x: 'Visited', y: 100, text: '100%' }];
export class Funnel extends SampleBase<{}, {}> {
  public funnel: AccumulationChartComponent;
  private slider: HTMLInputElement;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-9'>
            <AccumulationChartComponent id='funnel-chart' ref={funnel => this.funnel = funnel}
              title='Website Visitors'
              legendSettings={{ toggleVisibility: false }}
              load={this.load.bind(this)}
              tooltip={{ enable: true, format: '${point.x} : <b>${point.y}%</b>' }}
              resized={this.onChartResized.bind(this)}
              loaded={this.onChartLoad.bind(this)}
            >
              <Inject services={[AccumulationLegend, FunnelSeries, AccumulationTooltip, AccumulationDataLabel]} />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' type='Funnel' width='60%' height='80%'
                  neckWidth='15%' gapRatio={0.03} neckHeight='18%' explode={true}
                  dataLabel={{
                    name: 'text', visible: true, position: 'Inside', font: {
                      fontWeight: '600'
                    }
                  }}
                >
                </AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Neck Width:
                        <p id="neckWidth" style={{ fontWeight: 'normal' }}>15%</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pyramidneckWidth.bind(this)} ref={s => this.slider = s} id="pyramidNeckWidth" defaultValue="15" min="0" max="45" style={{ width: '90%' }} />
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Neck Height:
                                <p id="neckHeight" style={{ fontWeight: 'normal' }}>18%</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pyramidneckHeight.bind(this)} ref={s => this.slider = s} id="pyramidNeckHeight" defaultValue="0" min="0" max="50" style={{ marginLeft: '-5px' }} />
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
        <p>
        This sample visualizes the data about website visitors by using default funnel series. Datalabel shows the Information about the points.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render and configure the funnel chart. <code>dataLabel</code> is used to represent individual data and its value.</p>
          <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Chart component features are segregated into individual feature-wise modules. To use Funnel series, we need to inject
                       <code>FunnelSeries</code> module into <code>services</code>.
                  </p>
        </div>
      </div>
    )
  }
  public pyramidneckWidth(e: Event): void {
    let neckWidth: string = (document.getElementById('pyramidNeckWidth') as HTMLSelectElement).value;
    this.funnel.series[0].neckWidth = neckWidth + '%';
    document.getElementById('neckWidth').innerHTML = neckWidth + '%';
    this.funnel.removeSvg();
    this.funnel.refreshSeries();
    this.funnel.refreshChart();
  };
  public pyramidneckHeight(e: Event): void {
    let neckHeight: string = (document.getElementById('pyramidNeckHeight') as HTMLSelectElement).value;
    this.funnel.series[0].neckHeight = neckHeight + '%';
    document.getElementById('neckHeight').innerHTML = neckHeight + '%';
    this.funnel.series[0].animation.enable = false;
    this.funnel.removeSvg();
    this.funnel.refreshSeries();
    this.funnel.refreshChart();
  };

  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('funnel-chart').setAttribute('title', '');
  };
    // custom code start
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme =(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    replace(/-dark/i, "Dark") as AccumulationTheme;
    if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
      args.accumulation.series[0].width = '80%';
      args.accumulation.series[0].height = '70%';
    }
  };
      // custom code end

  public onChartResized(args: IAccResizeEventArgs): void {
    let bounds: ClientRect = document.getElementById('funnel-chart').getBoundingClientRect();
    if (bounds.width < bounds.height) {
      args.accumulation.series[0].width = '80%';
      args.accumulation.series[0].height = '70%';
    } else {
      args.accumulation.series[0].width = '60%';
      args.accumulation.series[0].height = '80%';
    }
  }
}