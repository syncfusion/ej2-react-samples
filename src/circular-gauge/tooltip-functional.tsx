import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import { CircularGaugeComponent, AxesDirective, ILoadedEventArgs, GaugeTheme, AxisDirective, Inject, PointersDirective, PointerDirective, RangesDirective, RangeDirective, GaugeTooltip, IPointerDragEventArgs } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';
import { useEffect, useRef } from 'react';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #templateWrap img {
        border-radius: 30px;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }
	 #templateWrap {
        background: #fff;
        padding: 3px;
        border-radius: 2px;
    }
    #templateWrap .des {
        float: right;
        padding-left: 10px;
        line-height: 30px;
    }`;

const Tooltip = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge = useRef<CircularGaugeComponent>(null);

    const onChartLoad = (args: ILoadedEventArgs): void => {
        document.getElementById('tooltip-container').setAttribute('title', '');
    };

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const dragEnd = (args: IPointerDragEventArgs): void => {
        if (args.currentValue >= 0 && args.currentValue <= 50) {
            args.pointer.color = "#3A5DC8";
            args.pointer.cap.border.color = "#3A5DC8";
        } else {
            args.pointer.color = "#33BCBD";
            args.pointer.cap.border.color = "#33BCBD";
        }
        args.pointer.value = args.currentValue;
        args.pointer.animation.enable = false;
        gauge.current.refresh();
    };

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-12'>
                    <CircularGaugeComponent background='transparent' animationDuration={2000} loaded={onChartLoad.bind(this)} dragEnd={dragEnd.bind(this)} id='tooltip-container' ref={gauge} enablePointerDrag={true} load={load.bind(this)} tooltip={{ enable: true, type: ['Range', 'Pointer'], showAtMousePosition: true, format: 'Current Value:  {value}', enableAnimation: false, textStyle: { size: '13px', fontFamily: 'inherit' }, rangeSettings: { showAtMousePosition: true, format: "Start Value: {start} <br/> End Value: {end}", textStyle: { size: '13px', fontFamily: 'inherit' } } }}>
                        <Inject services={[GaugeTooltip]} />
                        <AxesDirective>
                            <AxisDirective startAngle={240} endAngle={120} radius='90%' minimum={0} maximum={120} majorTicks={{ color: 'white', offset: -4, height: 10 }} lineStyle={{ width: 0 }} minorTicks={{ width: 0 }} labelStyle={{ useRangeColor: true, font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective value={70} radius='60%' cap={{ radius: 10, border: { color: '#33BCBD', width: 5 } }} animation={{ enable: true, duration: 1500 }} color='#33BCBD' />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={50} radius='102%' color='#3A5DC8' startWidth={10} endWidth={10} />
                                    <RangeDirective start={50} end={120} radius='102%' color='#33BCBD' startWidth={10} endWidth={10} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Circular Gauge sample">
                <p>This sample helps in visualizing the tooltip of the pointer and the range in a circular gauge.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to display the tooltip for the pointer and the range in a circular gauge. The <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tooltipSettingsModel/'>tooltip</a> settings is used to enable and customize the tooltip. To see the tooltip in action, hover your mouse over the pointer or the range, or tap them on touch-enabled devices.
                </p>
                <p>
                    More information on the tooltip can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-user-interaction/">documentation section</a>.
                </p>
            </section>
        </main>
        
    )
}
export default Tooltip;