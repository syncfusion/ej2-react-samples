/**
 * Sample for marker pointer in the Linear Gauge
 */
import * as React from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, IPointerDragEventArgs } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function MarkerPointer() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let invertedPointer: LinearGaugeComponent;
    let circlePointer: LinearGaugeComponent;
    let diamondPointer: LinearGaugeComponent;
    let rectanglePointer: LinearGaugeComponent;
    let multiplePointer: LinearGaugeComponent;

    function horizontalGauge(e: Event): void {
        invertedPointer.width = circlePointer.width = diamondPointer.width = rectanglePointer.width = multiplePointer.width = '450px';
        invertedPointer.height = circlePointer.height = diamondPointer.height = rectanglePointer.height = multiplePointer.height = '150px';
        invertedPointer.orientation = circlePointer.orientation = diamondPointer.orientation = rectanglePointer.orientation = multiplePointer.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerInverted').className = document.getElementById('containerCircle').className =
                document.getElementById('containerDiamond').className = document.getElementById('containerRectangle').className =
                document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    }

    function verticalGauge(e: Event): void {
        invertedPointer.width = circlePointer.width = diamondPointer.width = rectanglePointer.width = multiplePointer.width = '150px';
        invertedPointer.height = circlePointer.height = diamondPointer.height = rectanglePointer.height = multiplePointer.height = '350px';
        invertedPointer.orientation = circlePointer.orientation = diamondPointer.orientation = rectanglePointer.orientation = multiplePointer.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerInverted').className = document.getElementById('containerCircle').className =
                document.getElementById('containerDiamond').className = document.getElementById('containerRectangle').className =
                document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "6%";
        }
    }

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    function dragStartTriangle(args: IPointerDragEventArgs) {
        invertedPointer.axes[0].pointers[0].animationDuration = 0;
        invertedPointer.axes[0].pointers[1].animationDuration = 0;
    }
    function dragEndTriangle(args: IPointerDragEventArgs) {
        invertedPointer.axes[0].pointers[0].animationDuration = 1500;
        invertedPointer.axes[0].pointers[1].animationDuration = 1500;
    }
    function dragMoveTriangle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            invertedPointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    function dragEndCircle(args: IPointerDragEventArgs): void {
        circlePointer.axes[0].pointers[0].animationDuration = 1500;
        circlePointer.axes[0].pointers[1].animationDuration = 1500;
    }

    function dragStartCircle(args: IPointerDragEventArgs): void {
        circlePointer.axes[0].pointers[0].animationDuration = 0;
        circlePointer.axes[0].pointers[1].animationDuration = 0;
    }

    function dragMoveCircle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            circlePointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    function dragEndDiamond(args: IPointerDragEventArgs): void {
        diamondPointer.axes[0].pointers[0].animationDuration = 1500;
        diamondPointer.axes[0].pointers[1].animationDuration = 1500;
    }

    function dragStartDiamond(args: IPointerDragEventArgs): void {
        diamondPointer.axes[0].pointers[0].animationDuration = 0;
        diamondPointer.axes[0].pointers[1].animationDuration = 0;
    }

    function dragMoveDiamond(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            diamondPointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    function dragEndRectangle(args: IPointerDragEventArgs): void {
        rectanglePointer.axes[0].pointers[0].animationDuration = 1500;
        rectanglePointer.axes[0].pointers[1].animationDuration = 1500;
    }

    function dragStartRectangle(args: IPointerDragEventArgs): void {
        rectanglePointer.axes[0].pointers[0].animationDuration = 0;
        rectanglePointer.axes[0].pointers[1].animationDuration = 0;
    }

    function dragMoveRectangle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            rectanglePointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    function dragEndMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            multiplePointer.axes[0].pointers[0].animationDuration = 1500;
            multiplePointer.axes[0].pointers[1].animationDuration = 1500;
        }
    }

    function dragStartMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            multiplePointer.axes[0].pointers[0].animationDuration = 0;
            multiplePointer.axes[0].pointers[1].animationDuration = 0;
        }
    }

    function dragMoveMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            multiplePointer.setPointerValue(0, 0, args.currentValue);
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
                <div id="containerBox" className="row" style={{ float: 'left', padding: '4%' }}></div>
                <div id='containerInverted' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent dragEnd={dragEndTriangle.bind(this)} dragStart={dragStartTriangle.bind(this)} dragMove={dragMoveTriangle.bind(this)} load={load.bind(this)} id='invertedMarker' title='Inverted triangle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={invertedPointerInstance => invertedPointer = invertedPointerInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={40} enableDrag={true} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                    </PointerDirective>
                                    <PointerDirective value={40} enableDrag={true} height={15} width={15} placement='Near' markerType='Triangle' animationDuration={1500}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerCircle' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent dragStart={dragStartCircle.bind(this)} dragEnd={dragEndCircle.bind(this)} dragMove={dragMoveCircle.bind(this)} load={load.bind(this)} title='Circle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='circleMarker' orientation='Vertical' width='150px' height='350px' background='transparent' ref={circlePointerInstance => circlePointer = circlePointerInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={20} enableDrag={true} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                    </PointerDirective>
                                    <PointerDirective value={20} enableDrag={true} height={15} width={15} placement='Near' markerType='Circle' animationDuration={1500}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerDiamond' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent dragStart={dragStartDiamond.bind(this)} dragEnd={dragEndDiamond.bind(this)} dragMove={dragMoveDiamond.bind(this)} load={load.bind(this)} title='Diamond' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='diamondMarker' orientation='Vertical' width='150px' height='350px' background='transparent' ref={diamondPointerInstance => diamondPointer = diamondPointerInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={50} enableDrag={true} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                    </PointerDirective>
                                    <PointerDirective value={50} enableDrag={true} height={15} width={15} placement='Near' markerType='Diamond' animationDuration={1500}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerRectangle' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent dragStart={dragStartRectangle.bind(this)} dragEnd={dragEndRectangle.bind(this)} dragMove={dragMoveRectangle.bind(this)} load={load.bind(this)} title='Rectangle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='rectangleMarker' orientation='Vertical' width='150px' height='350px' background='transparent' ref={rectanglePointerInstance => rectanglePointer = rectanglePointerInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={30} enableDrag={true} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                    </PointerDirective>
                                    <PointerDirective value={30} enableDrag={true} height={5} width={15} placement='Near' markerType='Rectangle' animationDuration={1500}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div id='containerMultiple' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearGaugeComponent dragStart={dragStartMultiple.bind(this)} dragEnd={dragEndMultiple.bind(this)} dragMove={dragMoveMultiple.bind(this)} load={load.bind(this)} title='Multiple pointers' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleMarkers' orientation='Vertical' width='150px' height='350px' background='transparent' ref={multiplePointerInstance => multiplePointer = multiplePointerInstance}>
                        <AxesDirective>
                            <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                <PointersDirective>
                                    <PointerDirective value={10} enableDrag={true} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                    </PointerDirective>
                                    <PointerDirective value={10} enableDrag={true} height={15} width={15} placement='Near' markerType='Triangle' animationDuration={1500}>
                                    </PointerDirective>
                                    <PointerDirective value={100} enableDrag={true} height={15} width={15} placement='Near' markerType='Diamond' animationDuration={1500}>
                                    </PointerDirective>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample shows the various marker pointer shapes available in the linear gauge. Additionally, multiple marker pointer, animation and drag support are enabled.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure marker pointer in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointersDirective</a> collection is useful for displaying multiple pointers. The properties available in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointerDirective</a> help in the customization of the marker pointer in the linear gauge. Drag pointers are assisted by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#dragstart">dragStart</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#dragend">dragEnd</a> events.
                </p>
                <p>
                    More information on the marker pointer can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/#marker-pointer">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default MarkerPointer;