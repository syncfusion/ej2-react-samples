/**
 * Sample for track in the Linear Gauge
 */
import * as React from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

function Track() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let gaugeDefault: LinearGaugeComponent;
    let gaugeEdge: LinearGaugeComponent;
    let gaugeRangeColor: LinearGaugeComponent;
    let gaugeInversed: LinearGaugeComponent;
    let gaugeOpposed: LinearGaugeComponent;
    let classStyle: string = 'col-xs-4 col-sm-4 col-lg-2 col-md-2';

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    function horizontalGauge(e: Event): void {
        gaugeDefault.width = gaugeEdge.width = gaugeRangeColor.width = gaugeInversed.width = gaugeOpposed.width = '450px';
        gaugeDefault.height = gaugeEdge.height = gaugeRangeColor.height = gaugeInversed.height = gaugeOpposed.height = '150px';
        gaugeDefault.orientation = gaugeEdge.orientation = gaugeRangeColor.orientation = gaugeInversed.orientation = gaugeOpposed.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerEdge').className =
                document.getElementById('containerRangeColor').className = document.getElementById('containerInversed').className =
                document.getElementById('containerOpposed').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    }

    function verticalGauge(e: Event): void {
        gaugeDefault.width = gaugeEdge.width = gaugeRangeColor.width = gaugeInversed.width = gaugeOpposed.width = '150px';
        gaugeDefault.height = gaugeEdge.height = gaugeRangeColor.height = gaugeInversed.height = gaugeOpposed.height = '350px';
        gaugeDefault.orientation = gaugeEdge.orientation = gaugeRangeColor.orientation = gaugeInversed.orientation = gaugeOpposed.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerEdge').className =
                document.getElementById('containerRangeColor').className = document.getElementById('containerInversed').className =
                document.getElementById('containerOpposed').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
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
                <div id="containerBox" style={{ float: 'left', padding: '4%' }}></div>
                <div id='containerDefault' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} id='gaugeDefault' title='Default axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeDefaultInstance => gaugeDefault = gaugeDefaultInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerEdge' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Edge style' container={{ width: 20, roundedCornerRadius: 10, type: 'RoundedRectangle', border: { width: 1 } }} titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeEdge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeEdgeInstance => gaugeEdge = gaugeEdgeInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 0 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerRangeColor' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Range color for axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeRangeColor' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeRangeColorInstance => gaugeRangeColor = gaugeRangeColorInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 0 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ useRangeColor: true, font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={30} color='#F45656' startWidth={5} endWidth={5} offset={-5}></RangeDirective>
                                    <RangeDirective start={30} end={60} color='#FFC93E' startWidth={5} endWidth={5} offset={-5}></RangeDirective>
                                    <RangeDirective start={60} end={100} color='#0DC9AB' startWidth={5} endWidth={5} offset={-5}></RangeDirective>
                                </RangesDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerInversed' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Inversed axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeInversed' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeInversedInstance => gaugeInversed = gaugeInversedInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} isInversed={true} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective width={0}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerOpposed' className={classStyle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent load={load.bind(this)} title='Opposed axis' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gaugeOpposed' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gaugeOpposedInstance => gaugeOpposed = gaugeOpposedInstance}>
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
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the basic axis, its edge style, range color for axis, inversed and opposed axis.
                </p>
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