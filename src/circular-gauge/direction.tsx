/**
 * Sample for direction compass
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs, GaugeTheme,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Direction extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    public pointerColor: DropDownList; public labelColor: DropDownList;
    private loaded: boolean = false;
    public onLabelRender(args: IAxisLabelRenderEventArgs): void {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }
    
    // Code for Property Panel
    public onChartLoad(args: {}): void {
        if (!this.loaded) {
            this.loaded = true;
            this.pointerColor = new DropDownList({
                index: 0,
                placeholder: 'Select Range Bar Color',
                width: '100%',
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
                width: '100%',
                change: () => {
                    let rangeColor: string = this.labelColor.value.toString();
                    this.gauge.axes[0].labelStyle.font.color = rangeColor;
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
                        <CircularGaugeComponent load={this.load.bind(this)} id='direction-gauge' ref={gauge => this.gauge = gauge}
                            axisLabelRender={this.onLabelRender.bind(this)} loaded={this.onChartLoad.bind(this)}>
                            <AxesDirective>
                                <AxisDirective radius='70%' startAngle={0} endAngle={360}
                                    minimum={0} maximum={8}
                                    majorTicks={{
                                        height: 15,
                                        interval: 1
                                    }} lineStyle={{ width: 10 }}
                                    minorTicks={{
                                        height: 10,
                                        interval: 0.5
                                    }} labelStyle={{
                                        font: {
                                            size: '12px', fontFamily: 'Roboto'
                                        },
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
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: '-10px' }}>
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
                <div id="action-description">
                <p>
                This sample illustrates how to make a direction compass by using the features in gauge. 
                Color of the needle and direction labels can be customized by using options.
            </p>
                </div>
                <div id="description">
                    <p>
                        Circular gauge can be customized as per a user requirement.
                        In this example, a direction compass has been depicted by adding <code>needles</code> and by customizing the <code>labels</code> to show the direction.
                    </p>
                    <p>
                        More information on the needle and labels can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
