/**
 * Dynamic gauge
 */
//tslint:disable
import * as React from "react";
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective } from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
let sliderValue = 60;
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
}`;
export class AppleWatchGauge extends SampleBase {
    load1(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image4.svg" /></div>';
        }
    }
    load2(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:15px;height:15px;" src="src/circular-gauge/images/image5.svg" /></div>';
        }
    }
    load3(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image6.svg" /></div>';
        }
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ align: "center" }}>
                <div id="gauge" className="row">
                <div className="cols-sample-area" style={{ align: "center" }}>
                <div className="col-lg-9 col-md-9" style={{ marginLeft: '5%' }}>
                    <CircularGaugeComponent load={this.load.bind(this)} id='gauge1' height={"400px"} width={"400px"}>
                        <Inject services={[Annotations]}/>
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{
            font: {
                fontWeight: 'Roboto',
                fontStyle: 'Regular',
                size: '0px',
                color: 'white'
            },
            position: 'Inside',
            useRangeColor: true
        }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div id="annotation1"><img style="width:22px;height:22 px;" src="src/circular-gauge/images/image1.svg" /></div>' angle={8} radius='80%' zIndex='1'/>
                                    <AnnotationDirective content='<div id="annotation2"><img style="width:20px;height:20px;" src="src/circular-gauge/images/image2.svg" /></div>' angle={11} radius='58%' zIndex='1'/>
                                    <AnnotationDirective content='<div id="annotation3"><img style="width:22px;height:22px;" src="src/circular-gauge/images/image3.svg" /></div>' angle={16} radius='36%' zIndex='1'/>
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={100} radius='90%' startWidth={40} endWidth={40} color='#E30219' opacity={0.2}>
                                    </RangeDirective>
                                    <RangeDirective start={0} end={100} radius='68%' startWidth={40} endWidth={40} color='#3EDE00' opacity={0.2}>
                                    </RangeDirective>
                                    <RangeDirective start={0} end={100} radius='46%' startWidth={40} endWidth={40} color='#18F8F6' opacity={0.2}>
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{ enable: true }} value={65} radius='90%' color='#E2011A' pointerWidth={40} type='RangeBar' roundedCornerRadius={25}/>
                                    <PointerDirective animation={{ enable: true }} value={43} radius='68%' color='#3FE000' pointerWidth={40} type='RangeBar' roundedCornerRadius={25}/>
                                    <PointerDirective animation={{ enable: true }} value={58} radius='46%' color='#00C9E6' pointerWidth={40} type='RangeBar' roundedCornerRadius={25}/>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="col-lg-3 col-md-3" style={{ marginLeft: "-15%" }}>
                <div className="panel" style={{ "align": "center" }}>
                    <div className="subgauge" style={{ float: "left", marginTop: "3%" }}>
                    <CircularGaugeComponent load={this.load1.bind(this)} id='gauge2' height={"65px"} width={"65px"}>
                        <Inject services={[Annotations]}/>
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{
            font: {
                fontWeight: 'Roboto',
                fontStyle: 'Regular',
                size: '0px',
                color: 'white'
            },
            position: 'Inside',
            useRangeColor: true
        }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div id="annotation1"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image1.svg" /></div>' angle={0} radius='0%' zIndex='1'/>
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={100} radius='100%' startWidth={8} endWidth={8} color='#E30219' opacity={0.2}>
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{ enable: true }} value={65} radius='100%' color='#E2011A' pointerWidth={8} type='RangeBar' roundedCornerRadius={5}/>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="content">
                        <span className="firstcontent" style={{ fontSize: "18px" }}>MOVE</span>
                        <span className="firstcontent" style={{ fontSize: "18px", color: "#f4104d" }}>&nbsp;65%</span><br />
                        <span className="secondcontent" style={{ color: "#f4104d", fontSize: "19px" }}>338/520 CAL</span>
                    </div>
                </div>
                <div className="panel" style={{ "align": "center" }}>
                    <div className="subgauge" style={{ float: "left", marginTop: "3%" }}>
                    <CircularGaugeComponent load={this.load2.bind(this)} id='gauge3' height={"65px"} width={"65px"}>
                        <Inject services={[Annotations]}/>
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{
            font: {
                fontWeight: 'Roboto',
                fontStyle: 'Regular',
                size: '0px',
                color: 'white'
            },
            position: 'Inside',
            useRangeColor: true
        }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div id="annotation1"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image2.svg" /></div>' angle={0} radius='0%' zIndex='1'/>
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={100} radius='100%' startWidth={8} endWidth={8} color='#3EDE00' opacity={0.2}>
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{ enable: true }} value={43} radius='100%' color='#3FE000' pointerWidth={8} type='RangeBar' roundedCornerRadius={5}/>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="content">
                        <span className="firstcontent" style={{ fontSize: "18px" }}>EXERCISE</span>
                        <span className="firstcontent" style={{ fontSize: "18px", color: "#f4104d" }}>&nbsp;6%</span><br />
                        <span className="secondcontent" style={{ color: "#a6ff00", fontSize: "19px" }}>9/30 MIN</span>
                    </div>
                    </div>
                    <div className="panel" style={{ "align": "center" }}>
                    <div className="subgauge" style={{ float: "left", marginTop: "3%" }}>
                    <CircularGaugeComponent load={this.load3.bind(this)} id='gauge4' height={"65px"} width={"65px"}>
                        <Inject services={[Annotations]}/>
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{
            font: {
                fontWeight: 'Roboto',
                fontStyle: 'Regular',
                size: '0px',
                color: 'white'
            },
            position: 'Inside',
            useRangeColor: true
        }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                <AnnotationsDirective>
                                    <AnnotationDirective content='<div id="annotation1"><img style="width:25px;height:25px;" src="src/circular-gauge/images/image3.svg" /></div>' angle={0} radius='0%' zIndex='1'/>
                                </AnnotationsDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={100} radius='100%' startWidth={8} endWidth={8} color='#18F8F6' opacity={0.2}>
                                    </RangeDirective>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective animation={{ enable: true }} value={58} radius='100%' color='#00C9E6' pointerWidth={8} type='RangeBar' roundedCornerRadius={5}/>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    </div>
                    <div className="content">
                        <span className="firstcontent" style={{ fontSize: "18px" }}>STAND</span>
                        <span className="firstcontent" style={{ fontSize: "18px", color: "#f4104d" }}>&nbsp;66%</span><br />
                        <span className="secondcontent" style={{ color: "#a6ff00", fontSize: "19px" }}>7/12 HR</span>
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
            </div>);
    }
}
