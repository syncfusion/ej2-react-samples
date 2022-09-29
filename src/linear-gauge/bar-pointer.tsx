/**
 * Sample for bar pointer in the Linear Gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, Gradient, PointerDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class BarPointer extends SampleBase<{}, {}> {
    private outsideBar: LinearGaugeComponent;
    private crossBar: LinearGaugeComponent;
    private insideBar: LinearGaugeComponent;
    private gradientBar: LinearGaugeComponent;
    private multipleBar: LinearGaugeComponent;

    public pointerLinearGradient: Object = {
        startValue: "0%",
        endValue: "100%",
        colorStop: [
            { color: "#FB7D55", offset: "0%", opacity: 1 },
            { color: "#ECC85B", offset: "50%", opacity: 1 },
            { color: "#6FC78A", offset: "100%", opacity: 1 }
        ]
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    public horizontalGauge(e: Event): void {
        this.outsideBar.width = this.crossBar.width = this.insideBar.width = this.gradientBar.width = this.multipleBar.width = '450px';
        this.outsideBar.height = this.crossBar.height = this.insideBar.height = this.gradientBar.height = this.multipleBar.height = '150px';
        this.outsideBar.orientation = this.crossBar.orientation = this.insideBar.orientation = this.gradientBar.orientation = this.multipleBar.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerGradient').className =
                document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    }

    public verticalGauge(e: Event): void {
        this.outsideBar.width = this.crossBar.width = this.insideBar.width = this.gradientBar.width = this.multipleBar.width = '150px';
        this.outsideBar.height = this.crossBar.height = this.insideBar.height = this.gradientBar.height = this.multipleBar.height = '350px';
        this.outsideBar.orientation = this.crossBar.orientation = this.insideBar.orientation = this.gradientBar.orientation = this.multipleBar.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerGradient').className =
                document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
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
                    <div id="containerBox" style={{ float: 'left', padding: '4%' }}></div>
                    <div id='containerOutside' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} id='outsideBar' title='Outside' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={outsideBar => this.outsideBar = outsideBar}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Outside' color='#0074E3' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerCross' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} title='Cross' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='crossBar' orientation='Vertical' width='150px' height='350px' background='transparent' ref={crossBar => this.crossBar = crossBar}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Cross' color='#0074E3' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerInside' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} title='Inside' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='insideBar' orientation='Vertical' width='150px' height='350px' background='transparent' ref={insideBar => this.insideBar = insideBar}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Inside' color='#0074E3' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerGradient' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} title='Gradient shader' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gradientBar' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gradientBar => this.gradientBar = gradientBar}>
                            <Inject services={[Gradient]} />
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Outside' offset={2} animationDuration={1500} linearGradient={this.pointerLinearGradient}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerMultiple' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} title='Multiple bar pointers' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleBar' orientation='Vertical' width='150px' height='350px' background='transparent' ref={multipleBar => this.multipleBar = multipleBar}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={10} height={5} width={5} placement='Near' type='Bar' position='Inside' color='#0074E3' animationDuration={1500}>
                                        </PointerDirective>
                                        <PointerDirective value={70} height={5} width={5} placement='Near' type='Bar' position='Outside' color='red' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows the various bar pointer shapes available in the linear gauge. Additionally, multiple bar pointer and animation support are enabled.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure bar pointer in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointersDirective</a> collection is useful for displaying multiple pointers. The properties available in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointerDirective</a> help in the customization of the bar pointer in the linear gauge.
                    </p>
                    <p>
                        More information on the bar pointer can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/#bar-pointer">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    }
} 