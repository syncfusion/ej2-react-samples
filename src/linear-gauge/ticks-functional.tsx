/**
 * Sample for ticks in Linear Gauge
 */
import * as React from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function Ticks() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let gaugeOutsideTick: LinearGaugeComponent;
    let gaugeCrossTick: LinearGaugeComponent;
    let gaugeInsideTick: LinearGaugeComponent;
    let gaugeOffsetTick: LinearGaugeComponent;

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    function horizontalGauge(e: Event): void {
        gaugeOutsideTick.width = gaugeCrossTick.width = gaugeInsideTick.width = gaugeOffsetTick.width = '450px';
        gaugeOutsideTick.height = gaugeCrossTick.height = gaugeInsideTick.height = gaugeOffsetTick.height = '150px';
        gaugeOutsideTick.orientation = gaugeCrossTick.orientation = gaugeInsideTick.orientation = gaugeOffsetTick.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    }

    function verticalGauge(e: Event): void {
        gaugeOutsideTick.width = gaugeCrossTick.width = gaugeInsideTick.width = gaugeOffsetTick.width = '150px';
        gaugeOutsideTick.height = gaugeCrossTick.height = gaugeInsideTick.height = gaugeOffsetTick.height = '350px';
        gaugeOutsideTick.orientation = gaugeCrossTick.orientation = gaugeInsideTick.orientation = gaugeOffsetTick.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className =
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
                <div id="containerOutside" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} id='gaugeOutsideTick' title='Outside ticks' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeOutsideTickInstance => gaugeOutsideTick = gaugeOutsideTickInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerCross" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Cross ticks' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeCrossTick' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeCrossTickInstance => gaugeCrossTick = gaugeCrossTickInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Cross' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Cross' }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerInside" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Inside ticks' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeInsideTick' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeInsideTickInstance => gaugeInsideTick = gaugeInsideTickInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Inside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Inside' }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} isInversed={true} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id="containerOffset" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Ticks with offset' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeOffsetTick' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeOffsetTickInstance => gaugeOffsetTick = gaugeOffsetTickInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Inside', offset: 10 }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Inside', offset: 10 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} isInversed={true} opposedPosition={true}>
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
                    This sample shows ticks in various positions such as inside, middle, and outside. Additionally, the position of the ticks can be customized using offset.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure ticks in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/#position">position</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/#offset">offset</a> properties in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/">majorTicks</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/">minorTicks</a> are used to position the ticks as well as provide offset.
                </p>
                <p>
                    More information on the ticks can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#ticks-customization">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default Ticks; 