import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CircularGaugeComponent, AxesDirective, AxisDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, GaugeTheme,
    ILoadedEventArgs
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class RangeColorAxis extends SampleBase<{}, {}> {

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent animationDuration={2000} load={this.load.bind(this)} id='range-color' background='transparent'>
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={0} radius='100%' direction='AntiClockWise'
                                majorTicks={{
                                    position: 'Outside',
                                    width: 1,
                                    height: 25,
                                    interval: 10,
                                    useRangeColor: true
                                }} lineStyle={{ width: 0 }}
                                minorTicks={{
                                    position: 'Outside',
                                    width: 1,
                                    height: 8,
                                    interval: 2,
                                    useRangeColor: true
                                }} labelStyle={{
                                    offset: 2,
                                    position: 'Outside',
                                    useRangeColor: true,
                                    hiddenLabel: 'First',
                                    font: { fontFamily: 'inherit' }
                                }}>
                                <PointersDirective>
                                    <PointerDirective radius='0%' cap={{ radius: 0 }} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={35} radius='90%' color='#F8A197' startWidth={55} endWidth={55} />
                                    <RangeDirective start={35} end={70} radius='90%' color='#C45072' startWidth={55} endWidth={55} />
                                    <RangeDirective start={70} end={100} radius='90%' color='#1B679F' startWidth={55} endWidth={55} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows the basic rendering of the circular gauge, which includes an axis and a range. Here, the appropriate range color is applied to its respective axis labels, minor ticks, and major ticks.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the range and axis in the circular gauge with the same color. To accomplish this, set the <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/#userangecolor'>useRangeColor</a> property in <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/'>labelStyle</a>, <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/'>majorTicks</a> and <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/'>minorTicks</a>  to <b>true</b>.
                    </p>
                </div>
            </div>
        )
    }
}