// custom code start
// tslint:disable
// custom code end

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective } from '@syncfusion/ej2-react-circulargauge';
import { ILoadedEventArgs } from '@syncfusion/ej2-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
#apple-watch-rings .panel {
    width: 200px !important;
    height: 70px !important;
    margin-left: 5% !important;
    margin-top: 10% !important;
    border-color: lightgray;
    float: left;
    background-color: transparent;
}

#apple-watch-rings .content {
    float: left !important;
    margin-left: 62px !important;
    margin-top: -65px !important;
    text-align: left !important;
    border: 0px solid #dddddd;
    min-height: auto;
    width: 150px;
    height: auto;
}

@media screen and (max-width: 1160px) {
    #apple-watch-rings .panel {
        width: 165px !important;
    }

    #apple-watch-rings .firstcontent {
        font-size: 13px !important;
    }

    #apple-watch-rings .secondcontent {
        font-size: 15px !important;
    }

    #apple-watch-rings .content {
        margin-top: -60px !important;
    }

    #apple-watch-rings .divide {
        margin-left: 0%;
    }
}

@media screen and (max-width: 990px) {
    #apple-watch-rings .panel {
       width: 190px !important;
       height: 70px !important;
       margin-left: 100% !important;
       margin-top: 10px !important;
    }

    #apple-watch-rings .subgauge {
        margin-left: 0% !important;
        margin-top: 1% !important;
    }

    #apple-watch-rings .content {
        margin-left: 63px !important;
        margin-top: -60px !important;
    }

    #apple-watch-rings .firstcontent {
        font-size: 16px !important;
    }

    #apple-watch-rings .secondcontent {
        font-size: 18px !important;
    }

    #apple-watch-rings .divide {
        margin-left: 0%;
    }
}

@media screen and (min-width: 768px) {
    #apple-watch-rings .divide{
        margin-left: 10%;
    }
}

@media only screen and (max-width: 480px) {
    #apple-watch-rings .col-xs-4 {
        width: 31.3333%;
    }
}

@media screen and (max-width: 410px) {
    #apple-watch-rings .divide{
        margin-left: 10%;
    }

    #apple-watch-rings #column1 {
        margin-left: -9% !important;
    }

    #apple-watch-rings .subgauge {
        margin-left: 3% !important;
    }

    #apple-watch-rings .content {
        margin-top: -33% !important;
    }
}

#gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
}

.tailwind #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .tailwind-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 4px;
}

.material #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .material-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-top: 1px;
}

.fabric #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .fabric-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 2px;
    margin-top: -3px;
}

.bootstrap #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .bootstrap-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .bootstrap4 #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-top: 2px;
}

#gaugeThree_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 1px;
}

.tailwind #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .tailwind-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 4px;
}

.material #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .material-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-top: 2px;
}

.fabric #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .fabric-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 2px;
    margin-bottom: 4px;
}

.bootstrap #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .bootstrap-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .bootstrap4 #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 1px;
    margin-top: 2px;
}

#gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-top: -2px;
    margin-left: 0px;
}

.tailwind #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .tailwind-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-top: -7px;
    margin-left: 1px;
}

.fabric #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .fabric-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 1px;
    margin-top: -7px;
}

.bootstrap #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .bootstrap-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .bootstrap4 #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 0.5px;
    margin-top: 0px;
}

.material #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .material-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {
    height: 17px;
    width: 17px;
    margin-left: 0px;
    margin-top: 0px;
}
`;

const AppleWatchGauge = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const loadRedGauge = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;margin-left:1px" src="src/circular-gauge/images/image4.svg" /></div>';
        }
        // custom code end
    }

    const loadGreenGauge = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:15px;height:15px;;margin-left:1px" src="src/circular-gauge/images/image5.svg" /></div>';
        }
        // custom code end
    }

    const loadBlueGauge = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;;margin-top:-2px" src="src/circular-gauge/images/image6.svg" /></div>';
        }
        // custom code end
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section' id="apple-watch-rings">
                <div className="col-xs-10 col-sm-10 col-lg-8 col-md-8">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularGaugeComponent load={load.bind(this)} id='gaugeOne' background='transparent' height={"400px"} width={"400px"}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{ font: { size: '0px', color: 'transparent' }, position: 'Inside', useRangeColor: true }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                    <AnnotationsDirective>
                                        <AnnotationDirective content='<div id="annotation1"><img style="width:22px;height:22 px;" src="src/circular-gauge/images/image1.svg" /></div>' angle={8} radius='80%' zIndex='1' />
                                        <AnnotationDirective content='<div id="annotation2"><img style="width:22px;height:22px;" src="src/circular-gauge/images/image2.svg" /></div>' angle={11} radius='58%' zIndex='1' />
                                        <AnnotationDirective content='<div id="annotation3"><img style="width:22px;height:22px;" src="src/circular-gauge/images/image3.svg" /></div>' angle={16} radius='36%' zIndex='1' />
                                    </AnnotationsDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={100} radius='90%' startWidth={40} endWidth={40} color='#fa114f' opacity={0.2} />
                                        <RangeDirective start={0} end={100} radius='68%' startWidth={40} endWidth={40} color='#99ff01' opacity={0.2} />
                                        <RangeDirective start={0} end={100} radius='46%' startWidth={40} endWidth={40} color='#00d8fe' opacity={0.2} />
                                    </RangesDirective>
                                    <PointersDirective>
                                        <PointerDirective animation={{ enable: true }} value={65} radius='90%' color='#fa114f' pointerWidth={40} type='RangeBar' roundedCornerRadius={25} />
                                        <PointerDirective animation={{ enable: true }} value={43} radius='68%' color='#99ff01' pointerWidth={40} type='RangeBar' roundedCornerRadius={25} />
                                        <PointerDirective animation={{ enable: true }} value={58} radius='46%' color='#00d8fe' pointerWidth={40} type='RangeBar' roundedCornerRadius={25} />
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ marginTop: "3%" }}>
                    <div className="panel">
                        <div className="subgauge" style={{ float: "left", marginTop: "1%" }}>
                            <CircularGaugeComponent load={loadRedGauge.bind(this)} id='gaugeTwo' background='transparent' height={"65px"} width={"65px"}>
                                <Inject services={[Annotations]} />
                                <AxesDirective>
                                    <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{ font: { size: '0px', color: 'transparent' }, position: 'Inside', useRangeColor: true }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                        <AnnotationsDirective>
                                            <AnnotationDirective content='<div id="annotation1"><img class="firstAnnotation" src="src/circular-gauge/images/image1.svg" /></div>' angle={0} radius='0%' zIndex='1' />
                                        </AnnotationsDirective>
                                        <RangesDirective>
                                            <RangeDirective start={0} end={100} radius='100%' startWidth={8} endWidth={8} color='#fa114f' opacity={0.2} />
                                        </RangesDirective>
                                        <PointersDirective>
                                            <PointerDirective animation={{ enable: true }} value={65} radius='100%' color='#fa114f' pointerWidth={8} type='RangeBar' roundedCornerRadius={5} />
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
                    <div className="panel">
                        <div className="subgauge" style={{ float: "left", marginTop: "1%" }}>
                            <CircularGaugeComponent load={loadGreenGauge.bind(this)} id='gaugeThree' background='transparent' height={"65px"} width={"65px"} >
                                <Inject services={[Annotations]} />
                                <AxesDirective>
                                    <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{ font: { size: '0px', color: 'transparent' }, position: 'Inside', useRangeColor: true }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                        <AnnotationsDirective>
                                            <AnnotationDirective content='<div id="annotation1"><img class="secondAnnotation" src="src/circular-gauge/images/image2.svg" /></div>' angle={0} radius='0%' zIndex='1' />
                                        </AnnotationsDirective>
                                        <RangesDirective>
                                            <RangeDirective start={0} end={100} radius='100%' startWidth={8} endWidth={8} color='#99ff01' opacity={0.2} />
                                        </RangesDirective>
                                        <PointersDirective>
                                            <PointerDirective animation={{ enable: true }} value={43} radius='100%' color='#99ff01' pointerWidth={8} type='RangeBar' roundedCornerRadius={5} />
                                        </PointersDirective>
                                    </AxisDirective>
                                </AxesDirective>
                            </CircularGaugeComponent>
                        </div>
                        <div className="content">
                            <span className="firstcontent" style={{ fontSize: "18px" }}>EXERCISE</span>
                            <span className="firstcontent" style={{ fontSize: "18px", color: "#a6ff00" }}>&nbsp;43%</span><br />
                            <span className="secondcontent" style={{ color: "#a6ff00", fontSize: "19px" }}>13/30 MIN</span>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="subgauge" style={{ float: "left", marginTop: "1%" }}>
                            <CircularGaugeComponent load={loadBlueGauge.bind(this)} id='gaugeFour' background='transparent' height={"65px"} width={"65px"} >
                                <Inject services={[Annotations]} />
                                <AxesDirective>
                                    <AxisDirective startAngle={0} endAngle={360} minimum={0} maximum={100} lineStyle={{ width: 0 }} labelStyle={{ font: { size: '0px', color: 'transparent' }, position: 'Inside', useRangeColor: true }} majorTicks={{ height: 0 }} minorTicks={{ height: 0 }}>
                                        <AnnotationsDirective>
                                            <AnnotationDirective content='<div id="annotation1"><img class="thirdAnnotation" src="src/circular-gauge/images/image3.svg" /></div>' angle={0} radius='0%' zIndex='1' />
                                        </AnnotationsDirective>
                                        <RangesDirective>
                                            <RangeDirective start={0} end={100} radius='100%' startWidth={8} endWidth={8} color='#00d8fe' opacity={0.2} />
                                        </RangesDirective>
                                        <PointersDirective>
                                            <PointerDirective animation={{ enable: true }} value={58} radius='100%' color='#00d8fe' pointerWidth={8} type='RangeBar' roundedCornerRadius={5} />
                                        </PointersDirective>
                                    </AxisDirective>
                                </AxesDirective>
                            </CircularGaugeComponent>
                        </div>
                        <div className="content">
                            <span className="firstcontent" style={{ fontSize: "18px" }}>STAND</span>
                            <span className="firstcontent" style={{ fontSize: "18px", color: "#00d8fe" }}>&nbsp;58%</span><br />
                            <span className="secondcontent" style={{ color: "#00d8fe", fontSize: "19px" }}>7/12 HR</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample resembles the appearance of Apple watch rings. This is similar to an activity tracker, which records the specifics of each move, exercise, and stand.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to make the circular gauge look like the Apple watch rings. Ranges have rounded corners and annotations are used to indicate the move, exercise, and stand values.</p>
                <p>
                    More information on the annotations can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-annotations/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default AppleWatchGauge;