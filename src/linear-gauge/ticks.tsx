import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class Ticks extends SampleBase<{}, {}> {
    private gaugeOutsideTick: LinearGaugeComponent;
    private gaugeCrossTick: LinearGaugeComponent;
    private gaugeInsideTick: LinearGaugeComponent;
    private gaugeOffsetTick: LinearGaugeComponent;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    public horizontalGauge(e: Event): void {
        this.gaugeOutsideTick.width = this.gaugeCrossTick.width = this.gaugeInsideTick.width = this.gaugeOffsetTick.width = '450px';
        this.gaugeOutsideTick.height = this.gaugeCrossTick.height = this.gaugeInsideTick.height = this.gaugeOffsetTick.height = '150px';
        this.gaugeOutsideTick.orientation = this.gaugeCrossTick.orientation = this.gaugeInsideTick.orientation = this.gaugeOffsetTick.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    }

    public verticalGauge(e: Event): void {
        this.gaugeOutsideTick.width = this.gaugeCrossTick.width = this.gaugeInsideTick.width = this.gaugeOffsetTick.width = '150px';
        this.gaugeOutsideTick.height = this.gaugeCrossTick.height = this.gaugeInsideTick.height = this.gaugeOffsetTick.height = '350px';
        this.gaugeOutsideTick.orientation = this.gaugeCrossTick.orientation = this.gaugeInsideTick.orientation = this.gaugeOffsetTick.orientation = "Vertical";
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

    render() {
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
                                            <div id='horizontal' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: 'black', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: 'white', textAlign: 'center' }} onClick={this.horizontalGauge.bind(this)}>Horizontal</div>
                                        </td>
                                        <td>
                                            <div id='vertical' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: 'white', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: '#0074E3', textAlign: 'center' }} onClick={this.verticalGauge.bind(this)}>Vertical</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <pre style= {{ border: 'hidden', backgroundColor: 'inherit' }}></pre>
                    <div id="containerBox" style={{ float: 'left' }}></div>
                    <div id="containerOutside" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} id='gaugeOutsideTick' title='Outside ticks' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeOutsideTick => this.gaugeOutsideTick = gaugeOutsideTick}>
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
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Cross ticks' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeCrossTick' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeCrossTick => this.gaugeCrossTick = gaugeCrossTick}>
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
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Inside ticks' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeInsideTick' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeInsideTick => this.gaugeInsideTick = gaugeInsideTick}>
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
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Ticks with offset' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeOffsetTick' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeOffsetTick => this.gaugeOffsetTick = gaugeOffsetTick}>
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
}
