import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    /**
     * Linear gauge style sample
     */
export class Style extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row">
                        <LinearGaugeComponent style={{ height: "150px" }} id='gauge1' orientation='Horizontal'>
                            <AxesDirective>
                                <AxisDirective line={{ color: '#9E9E9E' }} majorTicks={{ interval: 10, color: '#9E9E9E' }} minorTicks={{ color: '#9E9E9E' }} labelStyle={{ font: { color: '#424242' } }}>
                                    <PointersDirective>
                                        <PointerDirective value={80}
                                            offset={10}
                                            height={13}
                                            width={13}
                                            color='#424242'>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className="row">
                        <LinearGaugeComponent style={{ height: "150px" }} id='gauge2' orientation='Horizontal' container={{ width: 30, backgroundColor: '#e0e0e0', border: { width: 0 }, offset: -20 }}>
                            <AxesDirective>
                                <AxisDirective majorTicks={{ interval: 10 }} line={{ offset: 30 }} labelStyle={{ font: { color: '#424242' }, offset: 50 }}>
                                    <PointersDirective>
                                        <PointerDirective value={10} placement='Near'
                                            offset={-50}
                                            height={15}
                                            width={15}
                                            color='#424242'
                                            markerType='Triangle'>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={10} startWidth={30} endWidth={30} color='#30b32d'>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className="row">
                        <LinearGaugeComponent style={{ height: "150px" }} id='gauge3' orientation='Horizontal'>
                            <AxesDirective>
                                <AxisDirective majorTicks={{ interval: 10, color: '#9E9E9E' }} minorTicks={{ color: '#9E9E9E' }} line={{ offset: -20, color: '#9E9E9E' }} labelStyle={{ font: { color: '#424242' } }}>
                                    <PointersDirective>
                                        <PointerDirective value={70}
                                            offset={20}
                                            height={13}
                                            width={13}
                                            color='#424242'>
                                        </PointerDirective>
                                        <PointerDirective value={70} type='Bar'
                                            height={10}
                                            color='red'>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div className="row">
                        <LinearGaugeComponent style={{ height: "150px" }} id='gauge4' orientation='Horizontal' container={{ width: 30, backgroundColor: '#e0e0e0' }}>
                            <AxesDirective>
                                <AxisDirective majorTicks={{ height: 0 }} minorTicks={{ height: 0 }} line={{ width: 0 }} labelStyle={{ font: { color: '#424242' }, offset: 60 }}>
                                    <PointersDirective>
                                        <PointerDirective value={60} placement='Near'
                                            offset={-55}
                                            height={15}
                                            width={15}
                                            color='#424242'
                                            markerType='Triangle'>
                                        </PointerDirective>
                                        <PointerDirective type='Bar' value={60}
                                            color='#ff9200'
                                            height={30}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates customizing sample in linear gauge.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this sample, we have indicated a value in various styles using bar and marker pointers. You can display any number of
                    pointers in an axis.
    </p>
                    <p>
                        More information about linear gauge can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/documentation">documentation section</a>.
    </p>
                </div>
            </div >
        )
    }
}
