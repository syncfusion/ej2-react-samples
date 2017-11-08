import * as React from "react";
import * as ReactDOM from "react-dom";
import { PropertyPane } from './property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from './sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    /**
     * Gauge direction sample
     */
export class Direction extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    public pointerColor: DropDownList; public labelColor: DropDownList;
    private loaded: boolean = false;
    public onLabelRender(args: IAxisLabelRenderEventArgs): void {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    };
    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.pointerColor = new DropDownList({
                index: 0,
                placeholder: 'Select Range Bar Color',
                width: 100,
                change: () => {
                    let rangeColor: string = this.pointerColor.value.toString();
                    this.gauge.axes[0].pointers[0].color = rangeColor;
                    this.gauge.setPointerValue(0, 0, this.gauge.axes[0].pointers[0].value);
                }
            });
            this.pointerColor.appendTo('#poiterColor');

            this.labelColor = new DropDownList({
                index: 0,
                placeholder: 'Select Range Bar Color',
                width: 100,
                change: () => {
                    let rangeColor: string = this.labelColor.value.toString();
                    this.gauge.axes[0].ranges[0].color = rangeColor;
                    this.gauge.refresh();
                }
            });
            this.labelColor.appendTo('#labelColor');
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent id='direction-gauge' ref={gauge => this.gauge = gauge}
                            axisLabelRender={this.onLabelRender.bind(this)} loaded={this.onChartLoad.bind(this)}>
                            <AxesDirective>
                                <AxisDirective radius='70%' startAngle={0} endAngle={360}
                                    minimum={0} maximum={8}
                                    majorTicks={{
                                        height: 15,
                                        interval: 1,
                                        color: '#9E9E9E'
                                    }} lineStyle={{ width: 10, color: '#E0E0E0' }}
                                    minorTicks={{
                                        height: 10,
                                        interval: 0.5,
                                        color: '#9E9E9E'
                                    }} labelStyle={{
                                        font: {
                                            size: '12px', color: '#333333', fontFamily: 'Roboto'
                                        },
                                        useRangeColor: true,
                                        autoAngle: true,
                                        hiddenLabel: 'Last'
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={7} radius='50%' color='#f03e3e' pointerWidth={20} cap={{
                                            radius: 0
                                        }} animation={{
                                            enable: false
                                        }} />
                                        <PointerDirective value={3} radius='50%' color='#9E9E9E' pointerWidth={20} cap={{
                                            radius: 0
                                        }} animation={{
                                            enable: false
                                        }} />
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={7} end={7} color='#f03e3e' />
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id=''>Pointer Color</div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="poiterColor" className="form-control">
                                                    <option value="#f03e3e">#f03e3e</option>
                                                    <option value="#4472c4">#4472c4</option>
                                                    <option value="#ed7d31">#ed7d31</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id=''>Label Color</div>
                                        </td>
                                        <td>
                                            <div>
                                                <select id="labelColor" className="form-control">
                                                    <option value="#f03e3e">#f03e3e</option>
                                                    <option value="#4472c4">#4472c4</option>
                                                    <option value="#ed7d31">#ed7d31</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Direction />, document.getElementById('sample'));