/**
 * Sample for Pointers
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations,
    AnnotationDirective, AnnotationsDirective, GaugeTheme,
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    
export class Pointers extends SampleBase<{}, {}> {
    private gauge4: CircularGaugeComponent;
    private gauge6: CircularGaugeComponent;
    public tooltipInterval1: Object;
    public tooltipInterval2: Object;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
    }
    // custom code end
    public onChartLoad(args: ILoadedEventArgs): void {
        let id: string = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (id === 'pointer4-container') {
            this.tooltipInterval1 = setInterval(
                (): void => {
                    let newVal: number = Math.random() * (90 - 20) + 20;
                    if (document.getElementById('pointer4-container')) {
                        this.gauge4.setPointerValue(0, 0, newVal);
                    } else {
                        clearInterval(+this.tooltipInterval1);
                    }
                },
                1000
            );
        }

        if (id === 'pointer6-container') {
            this.tooltipInterval2 = setInterval(
                (): void => {
                    let newVal: number = Math.random() * (80 - 30) + 30;
                    if (document.getElementById('pointer6-container')) {
                        this.gauge6.setPointerValue(0, 0, newVal);
                        this.gauge6.setPointerValue(0, 1, newVal);
                    } else {
                        clearInterval(+this.tooltipInterval1);
                    }
                },
                1000
            );
        }
    };
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-4">
                                    <CircularGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} loaded={this.onChartLoad.bind(this)} id='pointer1-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 3, color: '#01aebe'
                                                }}
                                                majorTicks={{
                                                    width: 1,
                                                    height: 0,
                                                    interval: 100
                                                }}
                                                minorTicks={{
                                                    height: 0,
                                                    width: 0,
                                                }} labelStyle={{
                                                    position: 'Outside',
                                                    font: { size: '0px', color: '#01aebe' }
                                                }}>
                                                <PointersDirective>
                                                    <PointerDirective value={80} radius='100%' color='rgb(0,171,169)' type="Marker" markerShape="InvertedTriangle" markerHeight={15} markerWidth={15} />
                                                </PointersDirective>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective content='<div style="color:#757575; font-family:Roboto; font-size:14px;">Marker</div>'
                                                        angle={180} zIndex='1' radius='20%'></AnnotationDirective>
                                                </AnnotationsDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                                <div className="col-sm-4">
                                    <CircularGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} loaded={this.onChartLoad.bind(this)} id='pointer2-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 3, color: '#ff5985'
                                                }}
                                                majorTicks={{
                                                    width: 1,
                                                    height: 0,
                                                    interval: 100
                                                }}
                                                minorTicks={{
                                                    height: 0,
                                                    width: 0,
                                                }} labelStyle={{
                                                    position: 'Outside',
                                                    font: { size: '0px', color: '#ff5985' }
                                                }}>
                                                <PointersDirective>
                                                    <PointerDirective value={66} radius='90%' color='#ff5985' type="RangeBar" pointerWidth={10} />
                                                </PointersDirective>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective content='<div style="color:#757575; font-family:Roboto; font-size:14px;">Range Bar</div>'
                                                        angle={180} zIndex='1' radius='20%'></AnnotationDirective>
                                                </AnnotationsDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                                <div className="col-sm-4">
                                <CircularGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} ref={gauge => this.gauge4 = gauge} loaded={this.onChartLoad.bind(this)} id='pointer4-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 3, color: '#9250e6'
                                                }}
                                                majorTicks={{
                                                    width: 1,
                                                    height: 0,
                                                    interval: 100
                                                }}
                                                minorTicks={{
                                                    height: 0,
                                                    width: 0,
                                                }} labelStyle={{
                                                    position: 'Outside',
                                                    font: { size: '0px', color: '#9250e6' }
                                                }}>
                                                <PointersDirective>
                                                    <PointerDirective value={70}
                                                        animation={{
                                                            enable: true, duration: 900
                                                        }}
                                                        radius='100%' color='#923C99' pointerWidth={6}
                                                        cap={{
                                                            radius: 0
                                                        }}
                                                        needleTail={{ length: '4%', color: '#923C99' }} />
                                                </PointersDirective>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective content='<div style="color:#757575; font-family:Roboto; font-size:14px;">Needle</div>'
                                                        angle={180} zIndex='1' radius='20%'></AnnotationDirective>
                                                </AnnotationsDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-4">
                                <CircularGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} centerY="40%" loaded={this.onChartLoad.bind(this)} id='pointer3-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 3, color: '#1E7145'
                                                }}
                                                majorTicks={{
                                                    width: 1,
                                                    height: 0,
                                                    interval: 100
                                                }}
                                                minorTicks={{
                                                    height: 0,
                                                    width: 0,
                                                }} labelStyle={{
                                                    position: 'Outside',
                                                    font: { size: '0px', color: '#1E7145' }
                                                }}>
                                                <PointersDirective>
                                                    <PointerDirective value={70} radius='80%' color='green' pointerWidth={2} needleStartWidth={4} needleEndWidth={4}
                                                     cap={{
                                                        radius: 8,
                                                        color: 'green'
                                                    }}
                                                    needleTail={{
                                                        length: '0%'
                                                    }}
                                                    />
                                                </PointersDirective>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective content='<div style="color:#757575; font-family:Roboto; font-size:14px; padding-top: 26px">Customized Needle</div>'
                                                        angle={180} zIndex='1' radius='20%'></AnnotationDirective>
                                                </AnnotationsDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                   
                                </div>
                                <div className="col-sm-4">
                                    <CircularGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} centerY="40%" loaded={this.onChartLoad.bind(this)} id='pointer5-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 3, color: '#e3a21a'
                                                }}
                                                majorTicks={{
                                                    width: 1,
                                                    height: 0,
                                                    interval: 100
                                                }}
                                                minorTicks={{
                                                    height: 0,
                                                    width: 0,
                                                }} labelStyle={{
                                                    position: 'Outside',
                                                    font: { size: '0px', color: '#e3a21a' }
                                                }}>
                                                <PointersDirective>
                                                    <PointerDirective value={80}
                                                        radius='80%' color='#e3a21a' pointerWidth={10}
                                                        cap={{
                                                            radius: 8,
                                                            color: 'white',
                                                            border: {
                                                                color: '#e3a21a',
                                                                width: 1
                                                            }
                                                        }}
                                                        needleTail={{
                                                            length: '20%',
                                                            color: '#e3a21a'
                                                        }} />
                                                    <PointerDirective value={40}
                                                        radius='60%' color='#ffb133' pointerWidth={10}
                                                        cap={{
                                                            radius: 8, color: 'white',
                                                            border: {
                                                                color: '#ffb133',
                                                                width: 1
                                                            }
                                                        }}
                                                        needleTail={{
                                                            length: '20%',
                                                            color: '#e3a21a'
                                                        }} />
                                                </PointersDirective>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective content='<div style="color:#757575; font-family:Roboto; font-size:14px;">Multiple Needles</div>'
                                                        angle={180} zIndex='1' radius='25%'></AnnotationDirective>
                                                </AnnotationsDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                                <div className="col-sm-4">
                                    <CircularGaugeComponent load={this.load.bind(this)} style={{ height: "250px" }} ref={gauge => this.gauge6 = gauge} centerY="40%" loaded={this.onChartLoad.bind(this)} id='pointer6-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={270} endAngle={90} radius='90%' minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 0
                                                }}
                                                majorTicks={{
                                                    width: 1,
                                                    height: 0,
                                                    interval: 100
                                                }}
                                                minorTicks={{
                                                    height: 0,
                                                    width: 0,
                                                }} labelStyle={{
                                                    position: 'Outside',
                                                    font: { size: '0px', color: '#067bc2' }
                                                }}>
                                                <PointersDirective>
                                                    <PointerDirective value={40}
                                                        animation={{
                                                            enable: true, duration: 900
                                                        }}
                                                        radius='100%' color='#067bc2' pointerWidth={6}
                                                        cap={{
                                                            radius: 0
                                                        }}
                                                        needleTail={{ length: '4%', color: '#067bc2' }} />
                                                    <PointerDirective value={40} type="RangeBar"
                                                        animation={{
                                                            enable: true, duration: 900
                                                        }}
                                                        color='#067bc2' pointerWidth={5} />
                                                </PointersDirective>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective content='<div style="color:#757575; font-family:Roboto; font-size:14px;">Live Update</div>'
                                                        angle={180} zIndex='1' radius='20%'></AnnotationDirective>
                                                </AnnotationsDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="action-description">
                    <p>
                    This sample visualizes the different types of pointers which are available in the gauge.
                </p>
                    </div>
                    <div id="description">
                        <p>
                            In this example, you can see how to customize the pointer for an axis in the circular gauge. Gauge supports different types
                                of pointers like <code>marker</code>, <code>image</code>, <code>needle</code>, <code>rangeBar</code>.
                        </p>
                        <br />
                        <p>
                            Gauge with all type of pointer is used in this sample.
                        </p>
                        <p>
                            More information on the pointers can be found in this
                            <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}
