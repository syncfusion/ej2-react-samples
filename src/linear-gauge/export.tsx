/**
 * Sample for default gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective,
    Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations,
    AnnotationsDirective, ExportType, RangeDirective,RangesDirective,
    Print, PdfExport, ImageExport
} from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #btn-control {
        width: 100%;
        text-align: center;
        text-transform:none !important;
    }
     .e-play-icon::before {
         content: '\\e728';
    }
	.e-play-icon1::before {
        content: "\\e34b";
    }`;

export class Export extends SampleBase<{}, {}> {
    private gauge: LinearGaugeComponent;
    private mode: DropDownListComponent;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as LinearGaugeTheme;
    }
    // custom code end
    public onClickPrint(e: Event): void {
        this.gauge.print();
    }
    public onClickExport(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        this.gauge.export((this.mode.value as ExportType), fileName);
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-9'>
                        <LinearGaugeComponent load={this.load.bind(this)} id='gauge' allowPrint={true} allowPdfExport={true} allowImageExport={true} orientation='Horizontal' ref={gauge => this.gauge = gauge}>
                            <Inject services={[Annotations, Print, PdfExport, ImageExport]} />
                            <AxesDirective>
                                <AxisDirective minimum = {0} maximum = {120} line = {{ width: 0}}
                                                              
                                 minorTicks={{ height:7, width:0,interval: 4 }} 
                                 majorTicks={{ height:0, width:0, interval: 20}} 
                                 labelStyle={{ position: "Outside", font: { color: 'black'}, offset: 4   }}>
                                
                               <RangesDirective>
                                       <RangeDirective start={0} end={20} startWidth={15} endWidth={25}  color= '#82b944' >
                                       </RangeDirective>
                                       <RangeDirective start={20} end={40} startWidth={25} endWidth={35}  color= '#a1cb43' >
                                        </RangeDirective>
                                        <RangeDirective start={40} end={60} startWidth={35} endWidth={45}  color= '#ddec12' >
                                        </RangeDirective>
                                        <RangeDirective start={60} end={80} startWidth={45} endWidth={55}  color= '#ffbc00' >
                                        </RangeDirective>
                                        <RangeDirective start={80} end={100} startWidth={55} endWidth={65}  color= '#ff6000' >
                                        </RangeDirective>
                                        <RangeDirective start={100} end={120} startWidth={65} endWidth={75}  color= 'red' >
                                        </RangeDirective>
                                </RangesDirective>

                                 <PointersDirective>
                                        <PointerDirective value={80} height={23} width={35} offset={-55} markerType='Triangle' border={{ width:2,color:'white'}}>
                                        </PointerDirective>
                                    </PointersDirective> 
                                </AxisDirective>
                            </AxesDirective>
                            </LinearGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '90%' }}>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "20%" }}>
                                        Export Type:
                                    </td>
                                    <td style={{ width: "30%" }}>
                                        <DropDownListComponent width={80} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "30%" }}>
                                        FileName :
                                </td>
                                    <td style={{ width: "40%" }}>
                                        <div className="e-float-input" style={{ width: 90, 'margin-top': '0px' }}>
                                            <input type="text" defaultValue="Gauge" id="fileName" style={{ "margin-left": "-10px" }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id="btn-control" style={{ 'margin-left': '-25px' }}>
                                            <ButtonComponent onClick={this.onClickExport.bind(this)} style={{ width: '100px' }} iconCss='e-icons e-play-icon' cssClass='e-flat' isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="btn-control" style={{ 'margin-left': '-15px' }}>
                                            <ButtonComponent onClick={this.onClickPrint.bind(this)} style={{ width: '80px' }} iconCss='e-icons e-play-icon1' cssClass='e-flat' isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the print and export functionality of linear gauge.
                    </p>
                </div>
                <div id="description">
                <p>
                    In this example, you can see how to export and print the rendered linear gauge. The Linear Gauge can be
                    exported to JPEG, PNG, SVG, and PDF formats. Print functionality is done by <code>print</code>
                    method when <code>allowPrint</code> is set as true. Export functionality is done by 
                    <code>export</code> method when <code>allowImageExport</code> and 
                    <code>allowPdfExport</code> is set as true.
                    <br /><br/>
                    <b>Injecting Module:</b>
                    <br /><br/>
                    To make use of the print and export support, we need to inject the <code> Print </code>, <code> ImageExport </code> and
                    <code> PdfExport </code>modules into the <code> services </code>.
                </p>
                    <p>
                        More information about print and export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/linear-gauge/linear-gauge-print-and-export/">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    }
}
