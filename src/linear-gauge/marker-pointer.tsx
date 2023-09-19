/**
 * Sample for marker pointer in the Linear Gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, IPointerDragEventArgs } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class MarkerPointer extends SampleBase<{}, {}> {
    private invertedPointer: LinearGaugeComponent;
    private circlePointer: LinearGaugeComponent;
    private diamondPointer: LinearGaugeComponent;
    private rectanglePointer: LinearGaugeComponent;
    private multiplePointer: LinearGaugeComponent;

    public horizontalGauge(e: Event): void {
        this.invertedPointer.width = this.circlePointer.width = this.diamondPointer.width = this.rectanglePointer.width = this.multiplePointer.width = '450px';
        this.invertedPointer.height = this.circlePointer.height = this.diamondPointer.height = this.rectanglePointer.height = this.multiplePointer.height = '150px';
        this.invertedPointer.orientation = this.circlePointer.orientation = this.diamondPointer.orientation = this.rectanglePointer.orientation = this.multiplePointer.orientation = "Horizontal";
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

    public verticalGauge(e: Event): void {
        this.invertedPointer.width = this.circlePointer.width = this.diamondPointer.width = this.rectanglePointer.width = this.multiplePointer.width = '150px';
        this.invertedPointer.height = this.circlePointer.height = this.diamondPointer.height = this.rectanglePointer.height = this.multiplePointer.height = '350px';
        this.invertedPointer.orientation = this.circlePointer.orientation = this.diamondPointer.orientation = this.rectanglePointer.orientation = this.multiplePointer.orientation = "Vertical";
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

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    public dragStartTriangle(args: IPointerDragEventArgs) {
        this.invertedPointer.axes[0].pointers[0].animationDuration = 0;
        this.invertedPointer.axes[0].pointers[1].animationDuration = 0;
    }
    public dragEndTriangle(args: IPointerDragEventArgs) {
        this.invertedPointer.axes[0].pointers[0].animationDuration = 1500;
        this.invertedPointer.axes[0].pointers[1].animationDuration = 1500;
    }
    public dragMoveTriangle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.invertedPointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndCircle(args: IPointerDragEventArgs): void {
        this.circlePointer.axes[0].pointers[0].animationDuration = 1500;
        this.circlePointer.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartCircle(args: IPointerDragEventArgs): void {
        this.circlePointer.axes[0].pointers[0].animationDuration = 0;
        this.circlePointer.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveCircle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.circlePointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndDiamond(args: IPointerDragEventArgs): void {
        this.diamondPointer.axes[0].pointers[0].animationDuration = 1500;
        this.diamondPointer.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartDiamond(args: IPointerDragEventArgs): void {
        this.diamondPointer.axes[0].pointers[0].animationDuration = 0;
        this.diamondPointer.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveDiamond(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.diamondPointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndRectangle(args: IPointerDragEventArgs): void {
        this.rectanglePointer.axes[0].pointers[0].animationDuration = 1500;
        this.rectanglePointer.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartRectangle(args: IPointerDragEventArgs): void {
        this.rectanglePointer.axes[0].pointers[0].animationDuration = 0;
        this.rectanglePointer.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveRectangle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.rectanglePointer.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.multiplePointer.axes[0].pointers[0].animationDuration = 1500;
            this.multiplePointer.axes[0].pointers[1].animationDuration = 1500;
        }
    }

    public dragStartMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.multiplePointer.axes[0].pointers[0].animationDuration = 0;
            this.multiplePointer.axes[0].pointers[1].animationDuration = 0;
        }
    }

    public dragMoveMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.multiplePointer.setPointerValue(0, 0, args.currentValue);
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
                    <div id="containerBox" className="row" style={{ float: 'left', padding: '4%' }}></div>
                    <div id='containerInverted' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent dragEnd={this.dragEndTriangle.bind(this)} dragStart={this.dragStartTriangle.bind(this)} dragMove={this.dragMoveTriangle.bind(this)} load={this.load.bind(this)} id='invertedMarker' title='Inverted triangle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={invertedPointer => this.invertedPointer = invertedPointer}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={40} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                        </PointerDirective>
                                        <PointerDirective value={40} enableDrag={true} height={15} width={15} placement='Near' markerType='Triangle' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerCircle' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent dragStart={this.dragStartCircle.bind(this)} dragEnd={this.dragEndCircle.bind(this)} dragMove={this.dragMoveCircle.bind(this)} load={this.load.bind(this)} title='Circle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='circleMarker' orientation='Vertical' width='150px' height='350px' background='transparent' ref={circlePointer => this.circlePointer = circlePointer}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={20} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                        </PointerDirective>
                                        <PointerDirective value={20} enableDrag={true} height={15} width={15} placement='Near' markerType='Circle' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerDiamond' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent dragStart={this.dragStartDiamond.bind(this)} dragEnd={this.dragEndDiamond.bind(this)} dragMove={this.dragMoveDiamond.bind(this)} load={this.load.bind(this)} title='Diamond' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='diamondMarker' orientation='Vertical' width='150px' height='350px' background='transparent' ref={diamondPointer => this.diamondPointer = diamondPointer}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={50} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                        </PointerDirective>
                                        <PointerDirective value={50} enableDrag={true} height={15} width={15} placement='Near' markerType='Diamond' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerRectangle' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent dragStart={this.dragStartRectangle.bind(this)} dragEnd={this.dragEndRectangle.bind(this)} dragMove={this.dragMoveRectangle.bind(this)} load={this.load.bind(this)} title='Rectangle' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='rectangleMarker' orientation='Vertical' width='150px' height='350px' background='transparent' ref={rectanglePointer => this.rectanglePointer = rectanglePointer}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={30} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
                                        </PointerDirective>
                                        <PointerDirective value={30} enableDrag={true} height={5} width={15} placement='Near' markerType='Rectangle' animationDuration={1500}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerMultiple' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent dragStart={this.dragStartMultiple.bind(this)} dragEnd={this.dragEndMultiple.bind(this)} dragMove={this.dragMoveMultiple.bind(this)} load={this.load.bind(this)} title='Multiple pointers' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleMarkers' orientation='Vertical' width='150px' height='350px' background='transparent' ref={multiplePointer => this.multiplePointer = multiplePointer}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective value={10} height={5} width={5} placement='Near' type='Bar' animationDuration={1500} offset='12' color='#0074E3'>
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
} 