/**
 * Sample for grouping in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationTooltip,
  IAccTextRenderEventArgs, AccumulationTheme, Inject, AccumulationDataLabel, IAccPointRenderEventArgs, IAccLoadedEventArgs, GroupModes
} from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
export let data1: any[] = [
  { 'x': 'China', y: 26, text: 'China: 26' },
  { 'x': 'Russia', y: 19, text: 'Russia: 19' },
  { 'x': 'Germany', y: 17, text: 'Germany: 17' },
  { 'x': 'Japan', y: 12, text: 'Japan: 12' },
  { 'x': 'France', y: 10, text: 'France: 10' },
  { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
  { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
  { 'x': 'Italy', y: 8, text: 'Italy: 8' },
  { 'x': 'Australia', y: 8, text: 'Australia: 8' },
  { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
  { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
  { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
  { 'x': 'Spain', y: 7, text: 'Spain: 7' },
  { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
];

export class Grouping extends SampleBase<{}, {}> {
  public pie: AccumulationChartComponent;
  private slider: HTMLInputElement;
  private dropElement: DropDownListComponent;
  private change(): void {
    this.pie.series[0].groupMode = this.dropElement.value as GroupModes;
    let currentValue: number = this.dropElement.value === 'Point' ? 9 : 8;
    this.pie.series[0].groupTo = currentValue.toString();
    this.pie.series[0].animation.enable = false;
    document.getElementById('clubtext').innerHTML = currentValue.toString();
    this.slider.value = currentValue.toString();
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
  private droplist: { [key: string]: Object }[] = [
    { value: 'Point' },
    { value: 'Value' }
  ];
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
        <div className='col-lg-9'>
            <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
              title='Rio Olympic Gold Medals'
              load={this.load.bind(this)}
              tooltip={{ enable: true ,format:"<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>"}}
              legendSettings={{ visible: false }}
              textRender={this.onTextRender.bind(this)}
              pointRender={this.onPointRender.bind(this)}
              enableSmartLabels={true}
              loaded={this.onChartLoad.bind(this)}
              enableBorderOnMouseMove={false}
            >
              <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective  dataSource={data1} xName='x' yName='y' animation={{ enable: true } } explode={true}
                  radius='70%'
                  groupTo='9' groupMode='Point' startAngle={0}
                  endAngle={360}
                  innerRadius='0%'
                  dataLabel={{
                    visible: true,
                    position: 'Outside',
                    connectorStyle: { type: 'Line', length: '5%' },
                    font: {
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
                  <td style={{ width: '50%' }}>
                    <div>Mode: </div>
                  </td>
                  <td style={{ padding: 10, width: '50%' }}>
                    <DropDownListComponent width={120} id="modes" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Point" />
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '60%' }}>
                    <div>Group To:
                        <p id="clubtext" style={{ fontWeight: 'normal' }}>9</p>
                    </div>
                  </td>
                  <td style={{ width: '40%' }}>
                    <div>
                      <input type="range" name="clubvalue" onChange={this.onClubvalue.bind(this)} ref={slider => this.slider = slider} defaultValue="9" min="0" max="27" id="clubvalue" style={{ marginLeft: '-5px' }} />
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
      </div>
      </div>
        <div id="action-description">
          <p>
          This sample shows the gold medal count scored by each country at the Rio Olympic Games, along with the pie series grouping functionality.
    </p>
        </div>
        <div id="description">
          <p>In this example, you can see how to group points based on count and values. The slice can be grouped based on the number of points by specifying the <code>GroupMode</code> to Point. For example, if the <code>GroupTo</code> property is set to 10, the chart will display the first 10 points and the remaining entries from the collection will be grouped as a single point. The slice can also be grouped based on values by specifying the <code>GroupMode</code> to Value. For example, if the <code>GroupTo</code> is set to 10, the first 10 points with a lower value will be grouped together and shown as a single point while the others as a slice.</p>
          
          <p> A tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.</p>
        <p>
                        More information on the pie series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart">documentation section</a>.
                  </p>
        </div>
      
      </div>
    )
  }
  public onTextRender(args: IAccTextRenderEventArgs): void {
    args.text = args.point.x + ' ' + args.point.y;
  };
  public onPointRender(args: IAccPointRenderEventArgs): void {
    if (args.point.isClubbed || args.point.isSliced) {
      args.fill = '#D3D3D3';
    }
  };
  public onChartLoad(args: IAccLoadedEventArgs): void {
    document.getElementById('pie-chart').setAttribute('title', '');
  };
  public onClubvalue(e: Event): void {
    let clubvalue: string = (document.getElementById('clubvalue') as HTMLSelectElement).value;
    this.pie.series[0].groupTo = clubvalue;
    this.pie.series[0].animation.enable = false;
    document.getElementById('clubtext').innerHTML = clubvalue;
    this.pie.removeSvg();
    this.pie.refreshSeries();
    this.pie.refreshChart();
  };
      
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as AccumulationTheme;
  };
      
}