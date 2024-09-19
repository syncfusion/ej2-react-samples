import * as React from "react";
import { useEffect, useState } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, Gradient, PointerDirective, RangesDirective, RangeDirective, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Ranges = () => {
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
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
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

    let rangeLinearGradient: Object = {
        startValue: "0%",
        endValue: "100%",
        colorStop: [
            { color: "#FB7D55", offset: "0%", opacity: 1 },
            { color: "#ECC85B", offset: "50%", opacity: 1 },
            { color: "#6FC78A", offset: "100%", opacity: 1 }
        ]
    };

    return (
        <main><div className='control-pane'>
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
                <div id="containerBox" style={{ float: 'left', padding: padding, display: display }}></div>
                <div id='containerDefault' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={2000} id='defaultRange' title='Default' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={100} startWidth={10} endWidth={10} color='#F45656' offset={5} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerExponential' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} animationDuration={2000} title='Exponential' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='exponentialRange' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={50} startWidth={2} endWidth={15} color='#F45656' offset={5} />
                                    <RangeDirective start={50} end={100} startWidth={15} endWidth={50} color='#F45656' offset={5} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerConcave' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Concave' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='concaveRange' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={50} color='#F45656' startWidth={50} endWidth={20} offset={5} />
                                    <RangeDirective start={50} end={100} color='#F45656' startWidth={20} endWidth={50} offset={5} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerGradient' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Gradient shader' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gradientRange' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <Inject services={[Gradient]} />
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={100} startWidth={50} endWidth={50} offset={5} linearGradient={rangeLinearGradient} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerMultiple' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Multiple ranges' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleRange' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={30} color='#FB7D55' startWidth={50} endWidth={50} offset={5} />
                                    <RangeDirective start={30} end={65} color='#ECC85B' startWidth={50} endWidth={50} offset={5} />
                                    <RangeDirective start={65} end={100} color='#6FC78A' startWidth={50} endWidth={50} offset={5} />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
        </div >
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample demonstrates the various customization options for the linear gauge's range. For example, an exponential appearance, a gradient color, and a multiple range.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to render and configure ranges in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/rangeModel/">RangesDirective</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/rangeModel/">RangeDirective</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/linearGradientModel/">linearGradient</a> are used to display multiple ranges, perform range customization, and apply gradient colors, respectively.
                </p>
                <p>
                    More information on the ranges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/ranges/">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default Ranges;