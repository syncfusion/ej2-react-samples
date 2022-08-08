/**
 * Dynamic gauge
 */
//tslint:disable
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';
import { SliderComponent, SliderChangeEventArgs } from "@syncfusion/ej2-react-inputs";
import { ILoadedEventArgs, CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Slider  } from '@syncfusion/ej2-inputs';
import { SampleBase } from '../common/sample-base';
let sliderValue: number = 60;
const SAMPLE_CSS = `
.panel {
    width: 105% !important;
    height: 80px !important;
    margin-left: 5% !important;
    margin-top: 15% !important;
    border-color: lightgray;
    float: left;
    background-color: transparent;
}

.content {
    float: left !important;
    margin-left: 62px !important;
    margin-top: 6% !important;
    text-align: left !important;
    border: 0px solid #dddddd;
    min-height: auto;
    position: absolute;
}

@media screen and (max-width: 1160px) {
    .panel {
        width: 115% !important;
    }

    .firstcontent {
        font-size: 13px !important;
    }

    .secondcontent {
        font-size: 15px !important;
    }
}

@media screen and (max-width: 990px) {
    .panel {
        width: 50% !important;
        height: 80px !important;
        margin-left: 27% !important;
        margin-top: 0% !important;
    }

    .subgauge {
        margin-left: 8% !important;
        margin-top: 1% !important;
    }

    .content {
        margin-left: 18% !important;
        margin-top: 2% !important;
    }

    .firstcontent {
        font-size: 16px !important;
    }

    .secondcontent {
        font-size: 18px !important;
    }
}    

@media screen and (max-width: 410px) {
    #column1 {
        margin-left: -9% !important;
    }

    .subgauge {
        margin-left: 3% !important;
    }

    .panel {
        width: 52% !important;
    }

    .content {
        margin-top: 3% !important;
    }
}

#gauge2_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
}

.tailwind #gauge2_Axis_0_Annotation_0 .firstAnnotation, .tailwind-dark #gauge2_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 4px;
}

.material #gauge2_Axis_0_Annotation_0 .firstAnnotation, .material-dark #gauge2_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-top: 1px;
}

.fabric #gauge2_Axis_0_Annotation_0 .firstAnnotation, .fabric-dark #gauge2_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 2px;
    margin-top: -3px;
}

.bootstrap #gauge2_Axis_0_Annotation_0 .firstAnnotation, .bootstrap-dark #gauge2_Axis_0_Annotation_0 .firstAnnotation, .bootstrap4 #gauge2_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-top: 2px;
}

#gauge3_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 1px;
}

.tailwind #gauge3_Axis_0_Annotation_0 .secondAnnotation, .tailwind-dark #gauge3_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 4px;
}

.material #gauge3_Axis_0_Annotation_0 .secondAnnotation, .material-dark #gauge3_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-top: 2px;
}

.fabric #gauge3_Axis_0_Annotation_0 .secondAnnotation, .fabric-dark #gauge3_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 4px;
}

.bootstrap #gauge3_Axis_0_Annotation_0 .secondAnnotation, .bootstrap-dark #gauge3_Axis_0_Annotation_0 .secondAnnotation, .bootstrap4 #gauge3_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 1px;
    margin-top: 2px;
}

#gauge4_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-top: -2px;
    margin-left: 0px;
}

.tailwind #gauge4_Axis_0_Annotation_0 .thirdAnnotation, .tailwind-dark #gauge4_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-top: -7px;
    margin-left: 1px;
}

.fabric #gauge4_Axis_0_Annotation_0 .thirdAnnotation, .fabric-dark #gauge4_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 1px;
    margin-top: -7px;
}

.bootstrap #gauge4_Axis_0_Annotation_0 .thirdAnnotation, .bootstrap-dark #gauge4_Axis_0_Annotation_0 .thirdAnnotation, .bootstrap4 #gauge4_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 0.5px;
    margin-top: 0px;
}

.material #gauge4_Axis_0_Annotation_0 .thirdAnnotation, .material-dark #gauge4_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 0px;
    margin-top: 0px;
}
`;

export class AppleWatchGauge extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }
    public load1(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;margin-left:1px" src="src/circular-gauge/images/image4.svg" /></div>';
        }
    }
    public load2(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:15px;height:15px;;margin-left:1px" src="src/circular-gauge/images/image5.svg" /></div>';
        }
    }
    public load3(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;;margin-top:-2px" src="src/circular-gauge/images/image6.svg" /></div>';
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div id="gauge" className="row">
                <div className="cols-sample-area">
                <div  className="col-lg-9 col-md-9" style={{ marginLeft: '5%'}}>
                    <CircularGaugeComponent  load={this.load.bind(this)} id='gauge1' height= {"400px"} width={"400px"}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective  startAngle={0} endAngle={360} minimum={0} maximum={100}
                                lineStyle={{ width: 0 }}
                                labelStyle={{
                                    font: {
                                        fontWeight: 'Roboto',
                                        fontStyle: 'Regular',
                                        size: '0px',
                                        color: 'white'
                                    },
                                    position: 'Inside',
                                    useRangeColor: true
                                }}
                                majorTicks={{ height: 0 }}
                                minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        content='<div id="annotation1"><img style="width:22px;height:22 px;" src="src/circular-gauge/images/image1.svg" /></div>'
                                        angle={8} radius='80%' zIndex='1' />
                                    <AnnotationDirective content='<div id="annotation2"><img style="width:20px;height:20px;" src="src/circular-gauge/images/image2.svg" /></div>'
                                        angle={11} radius='58%' zIndex='1'/>
                                    <AnnotationDirective content='<div id="annotation3"><img style="width:22px;height:22px;" src="src/circular-gauge/images/image3.svg" /></div>'
                                        angle={16} radius='36%' zIndex='1'/>
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective
                                        start={0} end={100} radius='90%' startWidth={40}
                                        endWidth={40} color='#fa114f' opacity={0.2} >
                                    </RangeDirective>
                                    <RangeDirective
                                        start={0} end={100} radius='68%' startWidth={40}
                                        endWidth={40} color='#99ff01' opacity={0.2} >
                                    </RangeDirective>
                                    <RangeDirective
                                        start={0} end={100} radius='46%' startWidth={40}
                                        endWidth={40} color='#00d8fe' opacity={0.2} >
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{enable: true}} value={65} radius='90%' color='#fa114f' pointerWidth={40}
                                        type='RangeBar' roundedCornerRadius={25} />
                                    <PointerDirective animation={{enable: true}} value={43} radius='68%' color='#99ff01' pointerWidth={40}
                                        type='RangeBar' roundedCornerRadius={25} />
                                    <PointerDirective animation={{enable: true}} value={58} radius='46%' color='#00d8fe' pointerWidth={40}
                                        type='RangeBar' roundedCornerRadius={25} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="col-lg-3 col-md-3" style={{marginLeft: "-15%"}}>
                <div className="panel">
                    <div className="subgauge" style={{float: "left",marginTop: "3%"}}>
                    <CircularGaugeComponent  load={this.load1.bind(this)} id='gauge2' height= {"65px"} width={"65px"} >
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective  startAngle={0} endAngle={360} minimum={0} maximum={100}
                                lineStyle={{ width: 0 }}
                                labelStyle={{
                                    font: {
                                        fontWeight: 'Roboto',
                                        fontStyle: 'Regular',
                                        size: '0px',
                                        color: 'white'
                                    },
                                    position: 'Inside',
                                    useRangeColor: true
                                }}
                                majorTicks={{ height: 0 }}
                                minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        content='<div id="annotation1"><img class="firstAnnotation" src="src/circular-gauge/images/image1.svg" /></div>'
                                        angle={0} radius='0%' zIndex='1' />
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective
                                        start={0} end={100} radius='100%' startWidth={8}
                                        endWidth={8} color='#fa114f' opacity={0.2}>
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{enable: true}} value={65} radius='100%' color='#fa114f' pointerWidth={8}
                                        type='RangeBar' roundedCornerRadius={5} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="content">
                        <span className="firstcontent" style={{fontSize: "18px"}}>MOVE</span>
                        <span className="firstcontent" style={{fontSize: "18px",color: "#f4104d"}}>&nbsp;65%</span><br/>
                        <span className="secondcontent" style={{color: "#f4104d",fontSize: "19px"}}>338/520 CAL</span>
                    </div>
                </div>
                <div className="panel">
                    <div className="subgauge" style={{float: "left",marginTop:"3%"}}>
                    <CircularGaugeComponent  load={this.load2.bind(this)} id='gauge3' height= {"65px"} width={"65px"} >
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective  startAngle={0} endAngle={360} minimum={0} maximum={100}
                                lineStyle={{ width: 0 }}
                                labelStyle={{
                                    font: {
                                        fontWeight: 'Roboto',
                                        fontStyle: 'Regular',
                                        size: '0px',
                                        color: 'white'
                                    },
                                    position: 'Inside',
                                    useRangeColor: true
                                }}
                                majorTicks={{ height: 0 }}
                                minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        content='<div id="annotation1"><img class="secondAnnotation" src="src/circular-gauge/images/image2.svg" /></div>'
                                        angle={0} radius='0%' zIndex='1' />
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective
                                        start={0} end={100} radius='100%' startWidth={8}
                                        endWidth={8} color='#99ff01' opacity={0.2} >
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{enable: true}} value={43} radius='100%' color='#99ff01' pointerWidth={8}
                                        type='RangeBar' roundedCornerRadius={5} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="content">
                        <span className="firstcontent" style={{fontSize: "18px"}}>EXERCISE</span>
                        <span className="firstcontent" style={{fontSize: "18px",color: "#f4104d"}}>&nbsp;6%</span><br/>
                        <span className="secondcontent" style={{color: "#a6ff00",fontSize: "19px"}}>9/30 MIN</span>
                    </div>
                    </div>
                    <div className="panel">
                    <div className="subgauge" style={{float: "left",marginTop: "3%"}}>
                    <CircularGaugeComponent  load={this.load3.bind(this)} id='gauge4' height= {"65px"} width={"65px"} >
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective  startAngle={0} endAngle={360} minimum={0} maximum={100}
                                lineStyle={{ width: 0 }}
                                labelStyle={{
                                    font: {
                                        fontWeight: 'Roboto',
                                        fontStyle: 'Regular',
                                        size: '0px',
                                        color: 'white'
                                    },
                                    position: 'Inside',
                                    useRangeColor: true
                                }}
                                majorTicks={{ height: 0 }}
                                minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        content='<div id="annotation1"><img class="thirdAnnotation" src="src/circular-gauge/images/image3.svg" /></div>'
                                        angle={0} radius='0%' zIndex='1' />
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective
                                        start={0} end={100} radius='100%' startWidth={8}
                                        endWidth={8} color='#00d8fe' opacity={0.2} >
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{enable: true}} value={58} radius='100%' color='#00d8fe' pointerWidth={8}
                                        type='RangeBar' roundedCornerRadius={5} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="content">
                        <span className="firstcontent" style={{fontSize: "18px"}}>STAND</span>
                        <span className="firstcontent" style={{fontSize: "18px",color: "#f4104d"}}>&nbsp;66%</span><br/>
                        <span className="secondcontent" style={{color: "#a6ff00",fontSize: "19px"}}>7/12 HR</span>
                    </div>
                    </div>
                </div>
                    </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample resembles the appearance of Apple watch rings, it is similar to an activity tracker which denotes the move, exercise and stand details.
                    </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to make the circular gauge look like the Apple watch rings. Ranges are rendered with rounded corners and annotations are placed to denote the move, exercise, and stand values.
                    </p>
                    <p>
                    For more information on ranges, refer to this <a target="_blank" href="https://ej2.syncfusion.com/documentation/circular-gauge/gauge-ranges">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}