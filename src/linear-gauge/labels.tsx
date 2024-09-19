import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

export class Labels extends SampleBase<{}, {}> {
    private customLabelGauge: LinearGaugeComponent;
    private textLabelGauge: LinearGaugeComponent;
    private offsetLabelGauge: LinearGaugeComponent;
    private customizedLabelGauge: LinearGaugeComponent;
    private pointerColor: string = '#E5E7EB';

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
        // custom code end
    }
    public textLabelLoad(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
        // custom code end
        this.pointerColor = '#E5E7EB';
        if (args.gauge.theme === 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
            this.pointerColor  = '#292827';
        } else if (args.gauge.theme === 'Bootstrap5Dark'){
            this.pointerColor  = '#343A40'
        }
    }

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
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

    public horizontalGauge(e: Event): void {
        this.customLabelGauge.width = this.textLabelGauge.width = this.offsetLabelGauge.width = this.customizedLabelGauge.width = '450px';
        this.customLabelGauge.height = this.textLabelGauge.height = this.offsetLabelGauge.height = this.customizedLabelGauge.height = '150px';
        this.customLabelGauge.orientation = this.textLabelGauge.orientation = this.offsetLabelGauge.orientation = this.customizedLabelGauge.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerCustom').className = document.getElementById('containerText').className =
                document.getElementById('containerOffset').className = document.getElementById('containerCustomized').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    }

    public verticalGauge(e: Event): void {
        this.customLabelGauge.width = this.textLabelGauge.width = this.offsetLabelGauge.width = this.customizedLabelGauge.width = '150px';
        this.customLabelGauge.height = this.textLabelGauge.height = this.offsetLabelGauge.height = this.customizedLabelGauge.height = '350px';
        this.customLabelGauge.orientation = this.textLabelGauge.orientation = this.offsetLabelGauge.orientation = this.customizedLabelGauge.orientation = "Vertical";
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

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ margin: 'auto', padding: '10px' }}>
                            <table role='none'>
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
                    <div id="containerCustom" className="col-xs-5 col-sm-5 col-lg-3 col-md-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={1500} id='customLabelGauge' title='Custom labels' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={customLabelGauge => this.customLabelGauge = customLabelGauge}>
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
                        <LinearGaugeComponent axisLabelRender={this.axisLabelRender.bind(this)} load={this.textLabelLoad.bind(this)} title='Text labels' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='textLabelGauge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={textLabelGauge => this.textLabelGauge = textLabelGauge}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 2.5, height: 0 }} majorTicks={{ interval: 5, height: 0 }} labelStyle={{ offset: 10, font: { fontFamily: 'inherit' } }} minimum={5} maximum={20} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={15} height={15} value={20} color='#0DC9AB' placement="Near" markerType="Circle" offset={7}>
                                        </PointerDirective>
                                        <PointerDirective width={15} height={15} value={15} color='#0DC9AB' placement="Near" markerType="Circle" offset={7}>
                                        </PointerDirective>
                                        <PointerDirective width={15} height={15} value={10} color='#0DC9AB' placement="Near" markerType="Circle" offset={7}>
                                        </PointerDirective>
                                        <PointerDirective width={15} height={15} value={5} color={this.pointerColor} placement="Near" markerType="Circle" offset={7}>
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
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={1500} title='Label offset' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='offsetLabelGauge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={offsetLabelGauge => this.offsetLabelGauge = offsetLabelGauge}>
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
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={1500} title='Label customization' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='customizedLabelGauge' orientation='Vertical' width='150px' height='350px' background='transparent' ref={customizedLabelGauge => this.customizedLabelGauge = customizedLabelGauge}>
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
            </div>
                <section id="action-description" aria-label="Description of Linear Gauge sample">
                    <p>
                        This sample demonstrates the various options for customizing the axis labels, such as styling, formatting, replacing text, and setting offset in the linear gauge.
                    </p>
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
}