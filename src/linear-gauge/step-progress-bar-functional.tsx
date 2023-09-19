/**
 * Sample to design step progress bar using the Linear Gauge
 */
import * as React from "react";
import { useEffect } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, LinearGaugeTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

export let range: string[] = ['#30b32d', '#ffdd00', '#f03e3e'];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const StepProgressBar = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => {
        if (args.text == "5")
            args.text = "Ordered";
        else if (args.text == "10")
            args.text = "Packed";
        else if (args.text == "15")
            args.text = "Shipped";
        else if (args.text == "20")
            args.text = "Delivered";
        else
            args.text = " ";
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <LinearGaugeComponent load={load} axisLabelRender={axisLabelRender} id='gauge' background='transparent' orientation='Horizontal'>
                    <AxesDirective>
                        <AxisDirective minimum={5} maximum={20} opposedPosition={true} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }} line={{ width: 5 }} labelStyle={{ offset: 20, font: { size: '16px', fontFamily: 'inherit' } }}>
                            <PointersDirective>
                                <PointerDirective value={5} height={25} width={25} placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/tick-icon.png' />
                                <PointerDirective value={10} height={25} width={25} placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/tick-icon.png' />
                                <PointerDirective value={15} height={25} width={25} placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/tick-icon.png' />
                                <PointerDirective value={20} height={25} width={15} placement='Center' position='Cross' color='#D1D9DD' offset={-2} markerType='Circle' />
                            </PointersDirective>
                            <RangesDirective>
                                <RangeDirective start={5} end={10} startWidth={5} endWidth={5} color='#1FAC8A' />
                                <RangeDirective start={10} end={15} startWidth={5} endWidth={5} color='#1FAC8A' />
                                <RangeDirective start={15} end={20} startWidth={5} endWidth={5} color='#D1D9DD' />
                            </RangesDirective>
                        </AxisDirective>
                    </AxesDirective>
                </LinearGaugeComponent>
            </div>
            <div id="action-description">
                <p>This sample shows a linear gauge that resembles a step progress bar and indicates shipment status.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a new step progress bar using the linear gauge. This can be accomplished by combining axis, multiple pointers, and multiple ranges.</p>
                <p>
                    More information on the linear gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default StepProgressBar; 