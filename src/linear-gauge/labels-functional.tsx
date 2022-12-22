/**
 * Sample for labels in the Linear Gauge
 */
import * as React from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function Labels() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let customLabelGauge: LinearGaugeComponent;
    let textLabelGauge: LinearGaugeComponent;
    let offsetLabelGauge: LinearGaugeComponent;
    let customizedLabelGauge: LinearGaugeComponent;

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    function axisLabelRender(args: IAxisLabelRenderEventArgs): void {
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

    function horizontalGauge(e: Event): void {
        customLabelGauge.width = textLabelGauge.width = offsetLabelGauge.width = customizedLabelGauge.width = '450px';
        customLabelGauge.height = textLabelGauge.height = offsetLabelGauge.height = customizedLabelGauge.height = '150px';
        customLabelGauge.orientation = textLabelGauge.orientation = offsetLabelGauge.orientation = customizedLabelGauge.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerCustom').className = document.getElementById('containerText').className =
                document.getElementById('containerOffset').className = document.getElementById('containerCustomized').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    }

    function verticalGauge(e: Event): void {
        customLabelGauge.width = textLabelGauge.width = offsetLabelGauge.width = customizedLabelGauge.width = '150px';
        customLabelGauge.height = textLabelGauge.height = offsetLabelGauge.height = customizedLabelGauge.height = '350px';
        customLabelGauge.orientation = textLabelGauge.orientation = offsetLabelGauge.orientation = customizedLabelGauge.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerCustom').className = document.getElementById('containerText').className =
                document.getElementById('containerOffset').className = document.getElementById('containerCustomized').className =
                "col-xs-5 col-sm-5 col-lg-3 col-md-3";
            document.getElementById('containerBox').style.display = "flex";
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section">
                <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ margin: 'auto', padding: '10px' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div id='horizontal' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: 'black', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: 'white', textAlign: 'center' }} onClick={horizontalGauge.bind(this)}>Horizontal</div>
                                    </td>
                                    <td>
                                        <div id='vertical' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: 'white', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: '#0074E3', textAlign: 'center' }} onClick={verticalGauge.bind(this)}>Vertical</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <pre style={{ border: 'hidden', backgroundColor: 'inherit' }}></pre>
                <div id="containerBox" style={{ float: 'left' }}></div>
                <div id="containerCustom" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} id='customLabelGauge' title='Custom labels' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={customLabelGaugeInstance => customLabelGauge = customLabelGaugeInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 2.5, height: 3 }} majorTicks={{ interval: 5, height: 7, width: 1 }} labelStyle={{ format: '${value}', font: { fontFamily: 'inherit' } }} minimum={5} maximum={20} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerText" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent axisLabelRender={axisLabelRender.bind(this)} load={load.bind(this)} title='Text labels' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='textLabelGauge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={textLabelGaugeInstance => textLabelGauge = textLabelGaugeInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 2.5, height: 0 }} majorTicks={{ interval: 5, height: 0 }} labelStyle={{ offset: 10, font: { fontFamily: 'inherit' } }} minimum={5} maximum={20} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={15} height={15} value={20} color='#0DC9AB' placement="Near" markerType="Circle" offset={7}>
                                    </PointerDirective>
                                    <PointerDirective width={15} height={15} value={15} color='#0DC9AB' placement="Near" markerType="Circle" offset={7}>
                                    </PointerDirective>
                                    <PointerDirective width={15} height={15} value={10} color='#0DC9AB' placement="Near" markerType="Circle" offset={7}>
                                    </PointerDirective>
                                    <PointerDirective width={15} height={15} value={5} color='#E5E7EB' placement="Near" markerType="Circle" offset={7}>
                                    </PointerDirective>
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={15} end={20} startWidth={5} endWidth={5} color='#0DC9AB'></RangeDirective>
                                    <RangeDirective start={10} end={15} startWidth={5} endWidth={5} color='#0DC9AB'></RangeDirective>
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerOffset" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Label offset' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='offsetLabelGauge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={offsetLabelGaugeInstance => offsetLabelGauge = offsetLabelGaugeInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ offset: 5, font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerCustomized" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Label customization' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='customizedLabelGauge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={customizedLabelGaugeInstance => customizedLabelGauge = customizedLabelGaugeInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { color: '#F93106', fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the various options for customizing the axis labels, such as styling, formatting, replacing text, and setting offset in the linear gauge.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure axis labels in the linear gauge. The properties in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#labelstyle">labelStyle</a> can be used to style, format, and offset the label, while the label's text can be changed dynamically via the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#axislabelrender">axisLabelRender</a> event.
                </p>
                <p>
                    More information on the axis labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#labels-customization">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Labels;