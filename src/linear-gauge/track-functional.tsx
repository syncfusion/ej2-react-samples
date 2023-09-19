/**
 * Sample for track in the Linear Gauge
 */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Track = () => {
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
    const [classStyle, setClassStyle] = useState<string>("col-xs-4 col-sm-4 col-lg-2 col-md-2");
    const [padding, setPadding] = useState<string>("4%");
    const [display, setDisplay] = useState<string>("flex");

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
                <div id="containerBox" style={{ float: 'left', padding: padding, display: display }}></div>
                <div id='containerDefault' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} id='gaugeDefault' title='Default axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerEdge' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Edge style' container={{ width: 20, roundedCornerRadius: 10, type: 'RoundedRectangle', border: { width: 1 } }} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeEdge' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 0 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerRangeColor' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Range color for axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeRangeColor' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 0 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ useRangeColor: true, font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={30} color='#F45656' startWidth={5} endWidth={5} offset={-5} />
                                    <RangeDirective start={30} end={60} color='#FFC93E' startWidth={5} endWidth={5} offset={-5} />
                                    <RangeDirective start={60} end={100} color='#0DC9AB' startWidth={5} endWidth={5} offset={-5} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerInversed' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Inversed axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeInversed' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} isInversed={true} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerOpposed' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Opposed axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeOpposed' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the basic axis, its edge style, range color for axis, inversed and opposed axis.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure axis in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/containerModel/#roundedcornerradius"> roundedCornerRadius</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/labelModel/#userangecolor"> useRangeColor</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#isinversed"> isInversed</a>, and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#opposedposition"> opposedPosition</a> properties can be used to set the edge style, range color for axis, inversed and opposed axis respectively.
                </p>
                <p>
                    More information on the axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#axis-in-react-linear-gauge">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default Track;