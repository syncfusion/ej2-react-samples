import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, Gradient, PointerDirective, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const BarPointer = () => {
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

    let pointerLinearGradient: Object = {
        startValue: "0%",
        endValue: "100%",
        colorStop: [
            { color: "#FB7D55", offset: "0%", opacity: 1 },
            { color: "#ECC85B", offset: "50%", opacity: 1 },
            { color: "#6FC78A", offset: "100%", opacity: 1 }
        ]
    };

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
                <div id='containerOutside' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={2000} id='outsideBar' title='Outside' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Outside' color='#0074E3' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerCross' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Cross' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='crossBar' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Cross' color='#0074E3' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerInside' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Inside' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='insideBar' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Inside' color='#0074E3' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerGradient' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Gradient shader' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gradientBar' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <Inject services={[Gradient]} />
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Outside' offset={2} animationDuration={1500} linearGradient={pointerLinearGradient} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerMultiple' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} title='Multiple bar pointers' animationDuration={2000} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleBar' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={10} height={5} width={5} placement='Near' type='Bar' position='Inside' color='#0074E3' animationDuration={1500} />
                                    <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Outside' color='red' animationDuration={1500} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
        </div >
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample shows the various bar pointer shapes available in the linear gauge. Additionally, multiple bar pointer and animation support are enabled.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to render and configure bar pointer in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointersDirective</a> collection is useful for displaying multiple pointers. The properties available in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointerDirective</a> help in the customization of the bar pointer in the linear gauge.
                </p>
                <p>
                    More information on the bar pointer can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/#bar-pointer">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default BarPointer;