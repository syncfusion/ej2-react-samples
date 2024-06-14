import * as React from "react";
import { useEffect, useState } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, IAxisLabelRenderEventArgs, Orientation } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Labels = () => {
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
    const [classStyle, setClassStyle] = useState<string>("col-xs-5 col-sm-5 col-lg-3 col-md-3");
    const [display, setDisplay] = useState<string>("flex");
    const [pointerColor, setPointerColor] = useState<string>("#E5E7EB");
    
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
        setPointerColor('#E5E7EB');
        if (args.gauge.theme === 'Fluent2Dark') {
            setPointerColor('#292827');
        }
    }

    const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => {
        if (args.text == "20")
            args.text = "Ordered";
        else if (args.text == "15")
            args.text = "Packed";
        else if (args.text == "10")
            args.text = "Shipped";
        else if (args.text == "5")
            args.text = "Delivered";
        else
            args.text = " ";
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
            setClassStyle("col-xs-5 col-sm-5 col-lg-3 col-md-3");
            setDisplay("flex");
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
                <div id="containerBox" style={{ float: 'left', display: display }}></div>
                <div id="containerCustom" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={1500} id='customLabelGauge' title='Custom labels' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 2.5, height: 3 }} majorTicks={{ interval: 5, height: 7, width: 1 }} labelStyle={{ format: '${value}', font: { fontFamily: 'inherit' } }} minimum={5} maximum={20} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerText" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent axisLabelRender={axisLabelRender} load={load} title='Text labels' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='textLabelGauge' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 2.5, height: 0 }} majorTicks={{ interval: 5, height: 0 }} labelStyle={{ offset: 10, font: { fontFamily: 'inherit' } }} minimum={5} maximum={20} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={15} height={15} value={20} color='#0DC9AB' placement="Near" markerType="Circle" offset={7} />
                                    <PointerDirective width={15} height={15} value={15} color='#0DC9AB' placement="Near" markerType="Circle" offset={7} />
                                    <PointerDirective width={15} height={15} value={10} color='#0DC9AB' placement="Near" markerType="Circle" offset={7} />
                                    <PointerDirective width={15} height={15} value={5} color={pointerColor} placement="Near" markerType="Circle" offset={7} />
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={15} end={20} startWidth={5} endWidth={5} color='#0DC9AB' />
                                    <RangeDirective start={10} end={15} startWidth={5} endWidth={5} color='#0DC9AB' />
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerOffset" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={1500} title='Label offset' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='offsetLabelGauge' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ offset: 5, font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerCustomized" className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load} animationDuration={1500} title='Label customization' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='customizedLabelGauge' orientation={gaugeOriention} width={gaugeWidth} height={gaugeHeight} background='transparent'>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { color: '#F93106', fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample demonstrates the various options for customizing the axis labels, such as styling, formatting, replacing text, and setting offset in the linear gauge.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>
                    In this example, you can see how to render and configure axis labels in the linear gauge. The properties in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#labelstyle">labelStyle</a> can be used to style, format, and offset the label, while the label's text can be changed dynamically via the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#axislabelrender">axisLabelRender</a> event.
                </p>
                <p>
                    More information on the axis labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#labels-customization">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default Labels;