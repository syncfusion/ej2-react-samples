import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const CustomPointer = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [gaugeWidth, setGaugeWidth] = useState<string>("150px");
    const [gaugeHeight, setGaugeHeight] = useState<string>("350px");
    const [gaugeOriention, setOrientation] = useState<Orientation>('Vertical');
    const [verticalColor, setVerticalColor] = useState<string>("white");
    const [verticalBgColor, setVerticalBgColor] = useState<string>("#0074E3");
    const [horizontalColor, setHorizontalColor] = useState<string>("black");
    const [horizontalBgColor, setHorizontalBgColor] = useState<string>("white");
    const [classStyle, setClassStyle] = useState<string>("col-xs-5 col-sm-5 col-lg-4 col-md-4");
    const [display, setDisplay] = useState<string>("flex");

    let textWidget = useRef<LinearGaugeComponent>(null);
    let multipleWidget = useRef<LinearGaugeComponent>(null);

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    const horizontalGauge = (e: Event): void => {
        setGaugeWidth('450px');
        setGaugeHeight('150px');
        setOrientation("Horizontal");
        textWidget.current.axes[0].pointers[0].offset = 2;
        multipleWidget.current.axes[0].pointers[0].offset = 2;
        if (e.currentTarget != null) {
            setHorizontalColor("white");
            setHorizontalBgColor("#0074E3");
            setVerticalColor("black");
            setVerticalBgColor("white");
            setClassStyle("col-xs-12 col-sm-12 col-lg-12 col-md-12");
            setDisplay("");
        }
    }

    const verticalGauge = (e: Event): void => {
        setGaugeWidth('150px');
        setGaugeHeight('350px');
        setOrientation("Vertical");
        textWidget.current.axes[0].pointers[0].offset = -2;
        multipleWidget.current.axes[0].pointers[0].offset = -2;
        if (e.currentTarget != null) {
            setVerticalColor("white");
            setVerticalBgColor("#0074E3");
            setHorizontalColor("black");
            setHorizontalBgColor("white");
            setClassStyle("col-xs-5 col-sm-5 col-lg-4 col-md-4");
            setDisplay("flex");
        }
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ margin: 'auto', padding: '10px' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div id='horizontal' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: horizontalColor, fontSize: '15px', border: '1px solid #0074E3', backgroundColor: horizontalBgColor, textAlign: 'center' }} onClick={horizontalGauge.bind(this)}>Horizontal</div>
                                    </td>
                                    <td>
                                        <div id='vertical' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: verticalColor, fontSize: '15px', border: '1px solid #0074E3', backgroundColor: verticalBgColor, textAlign: 'center' }} onClick={verticalGauge.bind(this)}>Vertical</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <pre style={{ border: 'hidden', backgroundColor: 'inherit' }}></pre>
                <div id="containerBox" style={{ float: 'left', display: display }}></div>
                <div id="containerText" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={2000} id='textWidget' title='Text widget' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent' ref={textWidget}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective line={{ width: 20 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={30} color='#173BBB' markerType='Circle' position='Cross' placement='Center' offset={-2} value={55} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective axisIndex={0} axisValue={55} x={0} y={0} zIndex='1' content='<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px"> 55 </div>' />
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerIcon" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={2000} title='Icon widget' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='iconWidget' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 20 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={45} height={30} value={90} placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/thumb-icon.png' />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerMultiple" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={2000} title='Multiple widget pointers' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleWidget' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent' ref={multipleWidget}>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective line={{ width: 20 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit', fontWeight: '499' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={30} color='#173BBB' position='Cross' placement='Center' markerType='Circle' value={60} offset={-2} />
                                    <PointerDirective width={45} height={30} color='#173BBB' placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/thumb-icon.png' value={30} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective axisIndex={0} axisValue={60} x={0} zIndex='1' y={0} content='<div style="margin-top: -2px;font-size: 12px;color: white;margin-left: -2px;margin-top:-1px"> 60 </div>' />
                        </AnnotationsDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the inclusion of text and image pointers in the linear gauge. Additionally, multiple pointer support is enabled.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure text and image pointers in the linear gauge. The properties available in  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointerDirective</a> and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/annotationModel/">AnnotationDirective</a> help in the customization of the text and image pointers in the linear gauge.
                </p>
                <p>
                    More information on the pointers can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default CustomPointer;