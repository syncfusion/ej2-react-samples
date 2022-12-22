/**
 * Sample to design Arc Gauge using the Circular Gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';
import { SliderComponent } from "@syncfusion/ej2-react-inputs";
import { ILoadedEventArgs } from '@syncfusion/ej2-circulargauge';
import { updateSampleSection } from '../common/sample-base';

let sliderValue: number = 60;

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .sliderwrap {
        margin-top: 0px;
        width: 300px;            
        align-self: center;
    }
    #slider.e-control.e-slider .e-handle {
        background-color: #fff;
        border: 2px solid #666;
        width:15px;
        height:15px;
    }
    .e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {
        background: -webkit-linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%);
        background: linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%);
        background: -moz-linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%); 
    }
    .e-limit-bar.e-limits {
        background-color: transparent !important;
    }
    .e-control-wrapper.e-slider-container.e-horizontal .e-range {
        height: 0px !important;
    }
    #slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 5px;
    }
    #circular_gauge_sample .e-slider-container {
        display: flex;
        flex-direction: column;
    }`;

function ArcGauge() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge: CircularGaugeComponent;
    let sliderElement: SliderComponent;

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    function sliderChange() {
        sliderValue = sliderElement.value as number;
        if (!isNaN(sliderValue)) {
            gauge['isProtectedOnChange'] = true;
            if (sliderValue >= 0 && sliderValue < 20) {
                gauge.axes[0].pointers[0].color = '#ea501a';
            } else if (sliderValue >= 20 && sliderValue < 40) {
                gauge.axes[0].pointers[0].color = '#f79c02';
            } else if (sliderValue >= 40 && sliderValue < 60) {
                gauge.axes[0].pointers[0].color = '#e5ce20';
            } else if (sliderValue >= 60 && sliderValue < 80) {
                gauge.axes[0].pointers[0].color = '#a1cb43';
            } else if (sliderValue >= 80 && sliderValue < 100) {
                gauge.axes[0].pointers[0].color = '#82b944';
            }
            gauge.setPointerValue(0, 0, sliderValue);
            if (document.getElementById('pointervalue')) {
                document.getElementById('pointervalue').innerHTML = gauge.axes[0].pointers[0].value.toString() + '/100';
            }
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div id='circular_gauge_sample' className='control-section'>
                <CircularGaugeComponent title='Progress Tracker' background='transparent' titleStyle={{ fontFamily: 'inherit' }} load={load.bind(this)} ref={g => gauge = g} id='gauge'>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective radius='80%' startAngle={200} endAngle={160} minimum={1} maximum={100}
                            lineStyle={{ width: 0 }}
                            labelStyle={{
                                font: {
                                    fontFamily: 'inherit',
                                    size: '0px',
                                },
                            }}
                            majorTicks={{ height: 0 }}
                            minorTicks={{ height: 0 }}>
                            <AnnotationsDirective>
                                <AnnotationDirective
                                    content='<div id="pointervalue" style="font-size:35px;width:120px;text-align:center;margin-top:-15px;">60/100</div>'
                                    angle={0} radius='0%' zIndex='1' />
                                <AnnotationDirective content='<div id="slider" style="height:70px;width:250px;"></div>'
                                    angle={0} radius='-100%' zIndex='1' />
                            </AnnotationsDirective>
                            <RangesDirective>
                                <RangeDirective
                                    start={1} end={100} radius='90%' startWidth={30}
                                    endWidth={30} color='#E0E0E0' roundedCornerRadius={20}>
                                </RangeDirective>
                            </RangesDirective>
                            <PointersDirective>
                                <PointerDirective animation={{ enable: false }} value={60} radius='90%' color='#e5ce20' pointerWidth={30}
                                    type='RangeBar' roundedCornerRadius={20}
                                    border={{
                                        width: 0
                                    }} />
                            </PointersDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
                <SliderComponent className='sliderwrap' id="slider" style={{ width: '250px', marginTop: '-45px' }} type='MinRange' min={0} max={100} value={sliderValue}
                    limits={{ enabled: true, minStart: 0, minEnd: 100 }} change={sliderChange.bind(this)} ref={d => sliderElement = d} />
            </div>
            <div id="action-description">
                <p>
                    This sample shows the work progress using a circular gauge and a range bar pointer with rounded corners.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render the range and range bar pointer with rounded corners. A slider is placed at the bottom of the circular gauge using annotation to change the range bar pointer value. Based on the value, the color of the pointer can also be changed.
                </p>
                <p>
                    More information on the ranges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default ArcGauge;