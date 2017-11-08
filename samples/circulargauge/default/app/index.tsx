import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from './sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Gauge default sample
 */
export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent id='gauge'>
                        <AxesDirective>
                            <AxisDirective radius='80%' startAngle={230} endAngle={130}
                                majorTicks={{ width: 0 }} lineStyle={{ width: 8, color: '#E0E0E0' }}
                                minorTicks={{ width: 0 }} labelStyle={{
                                    font: {
                                        color: '#424242',
                                        fontFamily: 'Roboto',
                                        size: '12px',
                                        fontWeight: 'Regular'
                                    },
                                    offset: -5
                                }}>
                                <PointersDirective>
                                    <PointerDirective value={60} radius='60%' color='#757575' pointerWidth={7} cap={{
                                        radius: 8,
                                        color: '#757575',
                                        border: { width: 0 }
                                    }} needleTail ={{
                                        length: '25%'
                                    }} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Default />, document.getElementById('sample'));