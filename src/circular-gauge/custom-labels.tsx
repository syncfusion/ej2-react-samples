import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Gradient, IAxisLabelRenderEventArgs,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, ILoadedEventArgs, GaugeTheme
} from '@syncfusion/ej2-react-circulargauge';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class CustomLabels extends SampleBase<{}, {}> {

    public textValues: string[] = ['0', '2', '5', '10', '20', '50', '100', '150', '200'];

    public rangeLinearGradient: Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9e40dc', offset: '0%', opacity: 1 },
            { color: '#d93c95', offset: '70%', opacity: 1 },
        ]
    };

    public pointerLinearGradient: Object = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9e40dc', offset: '0%', opacity: 0.2 },
            { color: '#9e40dc', offset: '70%', opacity: 0.5 }]
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        args.text = this.textValues[(args.value)];
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent load={this.load.bind(this)} animationDuration={2000} axisLabelRender={this.axisLabelRender.bind(this)} id='custom-labels' background='transparent'>
                        <Inject services={[Gradient]} />
                        <AxesDirective>
                            <AxisDirective startAngle={210} endAngle={150} radius='80%' minimum={0} maximum={8}
                                majorTicks={{
                                    width: 0, interval: 1
                                }} lineStyle={{ width: 0 }}
                                minorTicks={{
                                    width: 0
                                }} labelStyle={{
                                    offset: 10,
                                    font: {
                                        fontFamily: 'inherit'
                                    }
                                }}>
                                <PointersDirective>
                                    <PointerDirective pointerWidth={10} radius='85%' needleStartWidth={10} needleEndWidth={5} value={6.2} color='#E63B86'
                                        cap={{ radius: 0, border: { width: 0 } }}
                                        needleTail={{ length: '0%' }} animation={{ enable: false }}
                                        linearGradient={this.pointerLinearGradient}
                                    >
                                    </PointerDirective>
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={6.2} color='#E63B86' startWidth={22} endWidth={22}
                                        linearGradient={this.rangeLinearGradient}
                                    >
                                    </RangeDirective>
                                    <RangeDirective start={6.2} end={8} color='#E0E0E0' startWidth={22} endWidth={22}></RangeDirective>
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This example demonstrates how to introduce and position custom labels in a circular gauge. In addition, gradient colors are used on the circular gauge elements such as the pointer and range.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to render and configure custom labels in the circular gauge. The label text can be modified using the <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#axislabelrender'>axisLabelRender</a> event which will be triggered everytime when a label is rendered.
                    </p>
                    <p>
                        More information on the labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/#labels">documentation section</a>.
                    </p>
                </section>
        </main>
        )
    }
}
