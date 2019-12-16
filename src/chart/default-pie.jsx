import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
export let data1 = [
    { 'x': 'Chrome', y: 37, text: '37%' }, { 'x': 'UC Browser', y: 17, text: '17%' },
    { 'x': 'iPhone', y: 19, text: '19%' },
    { 'x': 'Others', y: 4, text: '4%' }, { 'x': 'Opera', y: 11, text: '11%' },
    { 'x': 'Android', y: 12, text: '12%' }
];
export class Pie extends SampleBase {
    render() {
        return (<div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-9'>
            <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie} title='Mobile Browser Statistics' load={this.load.bind(this)} legendSettings={{ visible: false }} enableSmartLabels={true} enableAnimation={false} center={{ x: '50%', y: '50%' }} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}%</b>' }} loaded={this.onChartLoad.bind(this)}>
              <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]}/>
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y' explode={true} explodeOffset='10%' explodeIndex={0} dataLabel={{
            visible: true,
            position: 'Inside', name: 'text',
            font: {
                fontWeight: '600'
            }
        }} radius='70%'>
                </AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Pie Angle:
                        <p id="anglevalue" style={{ fontWeight: 'normal' }}>0</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieangle.bind(this)} ref={s => this.slider = s} id="pieangle" defaultValue="0" min="0" max="360" style={{ width: '90%' }}/>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Outer Radius:
                                <p id="radius" style={{ fontWeight: 'normal' }}>0.8</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieradius.bind(this)} ref={s => this.slider = s} id="pieradius" defaultValue="80" min="0" max="80" style={{ marginLeft: '-5px' }}/>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Explode Radius:
                                <p id="exploderadius" style={{ fontWeight: 'normal' }}>0.1</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieexploderadius.bind(this)} ref={s => this.slider = s} id="pieexploderadius" defaultValue="10" min="0" max="40" style={{ marginLeft: '-5px' }}/>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Explode Index:
                                <p id="explodeindex" style={{ fontWeight: 'normal' }}>5</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.pieexplodeindex.bind(this)} ref={s => this.slider = s} id="pieexplodeindex" defaultValue="5" min="0" max="6" style={{ marginLeft: '-5px' }}/>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Center X
                                <p id="xvalue" style={{ fontWeight: 'normal' }}>50%</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.piecenterx.bind(this)} ref={s => this.slider = s} id="x" defaultValue="50" min="0" max="100" style={{ marginLeft: '-5px' }}/>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div>Center Y
                                <p id="yvalue" style={{ fontWeight: 'normal' }}>50%</p>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div data-role="rangeslider">
                      <input type="range" name="range-min" onChange={this.piecentery.bind(this)} ref={s => this.slider = s} id="y" defaultValue="50" min="0" max="100" style={{ marginLeft: '-5px' }}/>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
        <p>
        This sample demonstrates pie chart for mobile browser usage statistics. <code>Datalabel</code> shows the Information about the points.
        While hovering on the slice, border will be highlighted.
    </p>
        </div>
        <div id="description">
          <p> In this example, you can see how to render and configure the pie chart. You can use <code>border</code>, <code>fill</code> properties to customize the pie point. <code>dataLabel</code> is used to represent individual data and its value.</p>
          <p> <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
          <p><b>Injecting Module</b></p>
          <p>
            Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject <code>PieSeries</code> into <code>services</code>.
          </p>
        </div>
      </div>);
    }
    pieangle(e) {
        let angle = document.getElementById('pieangle').value;
        this.pie.series[0].startAngle = parseFloat(angle);
        this.pie.series[0].endAngle = parseFloat(angle);
        this.pie.series[0].animation.enable = false;
        document.getElementById('anglevalue').innerHTML = angle;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    }
    ;
    pieradius(e) {
        let radius = document.getElementById('pieradius').value;
        this.pie.series[0].radius = radius + '%';
        document.getElementById('radius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    }
    ;
    pieexploderadius(e) {
        let radius = document.getElementById('pieexploderadius').value;
        this.pie.visibleSeries[0].explodeOffset = radius + '%';
        document.getElementById('exploderadius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    }
    ;
    pieexplodeindex(e) {
        let index = +document.getElementById('pieexplodeindex').value;
        this.pie.visibleSeries[0].explodeIndex = index;
        document.getElementById('explodeindex').innerHTML = index.toString();
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    }
    ;
    piecenterx(e) {
        let x = document.getElementById('x').value;
        this.pie.center.x = x + '%';
        document.getElementById('xvalue').innerHTML = x + '%';
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    }
    ;
    piecentery(e) {
        let y = document.getElementById('y').value;
        this.pie.center.y = y + '%';
        document.getElementById('yvalue').innerHTML = y + '%';
        this.pie.series[0].animation.enable = false;
        this.pie.removeSvg();
        this.pie.refreshSeries();
        this.pie.refreshChart();
    }
    ;
    onChartLoad(args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    }
    ;
}
