import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class CustomPointer extends SampleBase<{}, {}> {
    private textWidget: LinearGaugeComponent;
    private iconWidget: LinearGaugeComponent;
    private multipleWidget: LinearGaugeComponent;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    public horizontalGauge(e: Event): void {
        this.textWidget.width = this.iconWidget.width = this.multipleWidget.width = '450px';
        this.textWidget.height = this.iconWidget.height = this.multipleWidget.height = '150px';
        this.textWidget.orientation = this.iconWidget.orientation = this.multipleWidget.orientation = "Horizontal";
        this.textWidget.axes[0].pointers[0].offset = 2;
        this.multipleWidget.axes[0].pointers[0].offset = 2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerText').className = document.getElementById('containerIcon').className =
                document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    }

    public verticalGauge(e: Event): void {
        this.textWidget.width = this.iconWidget.width = this.multipleWidget.width = '170px';
        this.textWidget.height = this.iconWidget.height = this.multipleWidget.height = '350px';
        this.textWidget.orientation = this.iconWidget.orientation = this.multipleWidget.orientation = "Vertical";
        this.textWidget.axes[0].pointers[0].offset = -2;
        this.multipleWidget.axes[0].pointers[0].offset = -2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerText').className = document.getElementById('containerIcon').className =
                document.getElementById('containerMultiple').className =
                "col-xs-5 col-sm-5 col-lg-4 col-md-4";
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
                    <div id="containerText" className="col-xs-5 col-sm-5 col-lg-4 col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} id='textWidget' title='Text widget' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={textWidget => this.textWidget = textWidget}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective line={{ width: 20 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={30} color='#173BBB' markerType='Circle' position='Cross' placement='Center' offset={-2} value={55}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective axisIndex={0} axisValue={55} x={0} y={0} zIndex='1' content='<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px"> 55 </div>'>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id="containerIcon" className="col-xs-5 col-sm-5 col-lg-4 col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Icon widget' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='iconWidget' orientation='Vertical' width='150px' height='350px' background='transparent' ref={iconWidget => this.iconWidget = iconWidget}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 20 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={45} height={30} value={90} placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/thumb-icon.png'>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id="containerMultiple" className="col-xs-5 col-sm-5 col-lg-4 col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Multiple widget pointers' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleWidget' orientation='Vertical' width='170px' height='350px' background='transparent' ref={multipleWidget => this.multipleWidget = multipleWidget}>
                            <Inject services={[Annotations]} />
                            <AxesDirective>
                                <AxisDirective line={{ width: 20 }} minorTicks={{ interval: 10, height: 3 }} majorTicks={{ interval: 20, height: 7, width: 1 }} labelStyle={{ font: { fontFamily: 'inherit', fontWeight: '499' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={30} color='#173BBB' position='Cross' placement='Center' markerType='Circle' value={60} offset={-2}>
                                        </PointerDirective>
                                        <PointerDirective width={45} height={30} color='#173BBB' placement='Near' markerType='Image' imageUrl='src/linear-gauge/images/thumb-icon.png' value={30}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective axisIndex={0} axisValue={60} x={0} zIndex='1' y={0} content='<div style="margin-top: -2px;font-size: 12px;color: white;margin-left: -2px;margin-top:-1px"> 60 </div>'>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the inclusion of text and image pointers in the linear gauge. Additionally, multiple pointer support is enabled.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure text and image pointers in the linear gauge. The properties available in  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/">PointerDirective</a> and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/annotationModel/">AnnotationDirective</a> help in the customization of the text and image pointers in the linear gauge.
                    </p>
                    <p>
                        More information on the pointers can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
