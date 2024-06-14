import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, IPointerDragEventArgs, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const MarkerPointer = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [gaugeWidth, setGaugeWidth] = useState<string>("150px");
    const [gaugeTextWidth, setGaugeTextWidth] = useState<string>("168px");
    const [gaugeHeight, setGaugeHeight] = useState<string>("350px");
    const [gaugeOriention, setOrientation] = useState<Orientation>('Vertical');
    const [verticalColor, setVerticalColor] = useState<string>("white");
    const [verticalBgColor, setVerticalBgColor] = useState<string>("#0074E3");
    const [horizontalColor, setHorizontalColor] = useState<string>("black");
    const [horizontalBgColor, setHorizontalBgColor] = useState<string>("white");
    const [classStyle, setClassStyle] = useState<string>("col-xs-4 col-sm-4 col-lg-2 col-md-2");
    const [display, setDisplay] = useState<string>("flex");
    const [padding, setPadding] = useState<string>("4%");
    let invertedPointer = useRef<LinearGaugeComponent>(null);
    let circlePointer = useRef<LinearGaugeComponent>(null);
    let textPointer = useRef<LinearGaugeComponent>(null);
    let rectanglePointer = useRef<LinearGaugeComponent>(null);
    let multiplePointer = useRef<LinearGaugeComponent>(null);

    const horizontalGauge = (e: Event): void => {
        setGaugeWidth('450px');
        setGaugeTextWidth('450px'); 
        setGaugeHeight('150px');
        setOrientation("Horizontal");
        if (e.currentTarget != null) {
            setHorizontalColor("white");
            setHorizontalBgColor("#0074E3");
            setVerticalColor("black");
            setVerticalBgColor("white");
            setClassStyle("col-xs-12 col-sm-12 col-lg-12 col-md-12");
            setDisplay("");
            setPadding("0%");
        }
    }

    const verticalGauge = (e: Event): void => {
        setGaugeWidth('150px');
        setGaugeTextWidth('168px');
        setGaugeHeight('350px');
        setOrientation("Vertical");
        if (e.currentTarget != null) {
            setVerticalColor("white");
            setVerticalBgColor("#0074E3");
            setHorizontalColor("black");
            setHorizontalBgColor("white");
            setClassStyle("col-xs-4 col-sm-4 col-lg-2 col-md-2");
            setDisplay("flex");
            setPadding("4%");
        }
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    const dragStartTriangle = (args: IPointerDragEventArgs) => {
        invertedPointer.current.axes[0].pointers[0].animationDuration = 0;
        invertedPointer.current.axes[0].pointers[1].animationDuration = 0;
    }
    const dragEndTriangle = (args: IPointerDragEventArgs) => {
        invertedPointer.current.axes[0].pointers[0].animationDuration = 1500;
        invertedPointer.current.axes[0].pointers[1].animationDuration = 1500;
    }
    const dragMoveTriangle = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            invertedPointer.current.setPointerValue(0, 0, args.currentValue);
        }
    }

    const dragEndCircle = (args: IPointerDragEventArgs): void => {
        circlePointer.current.axes[0].pointers[0].animationDuration = 1500;
        circlePointer.current.axes[0].pointers[1].animationDuration = 1500;
    }

    const dragStartCircle = (args: IPointerDragEventArgs): void => {
        circlePointer.current.axes[0].pointers[0].animationDuration = 0;
        circlePointer.current.axes[0].pointers[1].animationDuration = 0;
    }

    const dragMoveCircle = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            circlePointer.current.setPointerValue(0, 0, args.currentValue);
        }
    }

    const dragEndText = (args: IPointerDragEventArgs): void => {
        textPointer.current.axes[0].pointers[0].animationDuration = 1500;
        textPointer.current.axes[0].pointers[1].animationDuration = 1500;
    }

    const dragStartText = (args: IPointerDragEventArgs): void => {
        textPointer.current.axes[0].pointers[0].animationDuration = 0;
        textPointer.current.axes[0].pointers[1].animationDuration = 0;
    }

    const dragMoveText = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            textPointer.current.axes[0].pointers[1].text = Math.round(args.currentValue).toString() + " Points";
            textPointer.current.setPointerValue(0, 0, args.currentValue);
        }
    }

    const dragEndRectangle = (args: IPointerDragEventArgs): void => {
        rectanglePointer.current.axes[0].pointers[0].animationDuration = 1500;
        rectanglePointer.current.axes[0].pointers[1].animationDuration = 1500;
    }

    const dragStartRectangle = (args: IPointerDragEventArgs): void => {
        rectanglePointer.current.axes[0].pointers[0].animationDuration = 0;
        rectanglePointer.current.axes[0].pointers[1].animationDuration = 0;
    }

    const dragMoveRectangle = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            rectanglePointer.current.setPointerValue(0, 0, args.currentValue);
        }
    }

    const dragEndMultiple = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            multiplePointer.current.axes[0].pointers[0].animationDuration = 1500;
            multiplePointer.current.axes[0].pointers[1].animationDuration = 1500;
        }
    }

    const dragStartMultiple = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            multiplePointer.current.axes[0].pointers[0].animationDuration = 0;
            multiplePointer.current.axes[0].pointers[1].animationDuration = 0;
        }
    }

    const dragMoveMultiple = (args: IPointerDragEventArgs): void => {
        if (args.pointerIndex == 1) {
            multiplePointer.current.setPointerValue(0, 0, args.currentValue);
        }
    }

    return (
        <main>
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ margin: 'auto', padding: '10px' }}>
                        <table role='none'>
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
                <div id="containerBox" className="row" style={{ float: 'left', padding: padding, display: display }}></div>
                <div id='containerInverted' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent animationDuration={2000} dragEnd={dragEndTriangle} dragStart={dragStartTriangle} dragMove={dragMoveTriangle} load={load} id='invertedMarker' title='Inverted triangle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent' ref={invertedPointer}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={40} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3' />
                                    <PointerDirective value={40} enableDrag={true} height={15} width={15} placement='Near' markerType='Triangle' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerCircle' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent animationDuration={2000} dragStart={dragStartCircle} dragEnd={dragEndCircle} dragMove={dragMoveCircle} load={load} title='Circle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='circleMarker' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent' ref={circlePointer}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={20} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3' />
                                    <PointerDirective value={20} enableDrag={true} height={15} width={15} placement='Near' markerType='Circle' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerRectangle' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent animationDuration={2000} dragStart={dragStartRectangle} dragEnd={dragEndRectangle} dragMove={dragMoveRectangle} load={load} title='Rectangle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='rectangleMarker' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent' ref={rectanglePointer}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={30} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3' />
                                    <PointerDirective value={30} enableDrag={true} height={5} width={15} placement='Near' markerType='Rectangle' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerText' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent dragStart={dragStartText} animationDuration={2000} dragEnd={dragEndText} dragMove={dragMoveText} load={load} title='Text' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='TextMarker' orientation={gaugeOriention} width={gaugeTextWidth} height={gaugeHeight} background='transparent' ref={textPointer}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={50} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3' />
                                    <PointerDirective value={50} enableDrag={true} height={15} width={15} placement='Near' offset={-10} markerType='Text' text="50 Points" animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerMultiple' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent animationDuration={2000} dragStart={dragStartMultiple} dragEnd={dragEndMultiple} dragMove={dragMoveMultiple} load={load} title='Multiple pointers' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleMarkers' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent' ref={multiplePointer}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={10} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3' />
                                    <PointerDirective value={10} enableDrag={true} height={15} width={15} placement='Near' markerType='Triangle' animationDuration={1500} />
                                    <PointerDirective value={100} enableDrag={true} height={15} width={15} placement='Near' markerType='Diamond' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample shows the various marker pointer shapes available in the linear gauge. Additionally, multiple marker pointer, animation and drag support are enabled.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to render and configure marker pointer in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointersDirective</a> collection is useful for displaying multiple pointers. The properties available in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointerDirective</a> help in the customization of the marker pointer in the linear gauge. Drag pointers are assisted by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#dragstart">dragStart</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#dragend">dragEnd</a> events.
                </p>
                <p>
                    More information on the marker pointer can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/#marker-pointer">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default MarkerPointer;