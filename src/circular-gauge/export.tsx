/**
 * Sample for Gauge default sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    GaugeTheme, ILoadedEventArgs, ExportType, Print, PdfExport, ImageExport
} from '@syncfusion/ej2-react-circulargauge';
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
    }

    .e-view.fluent .e-play-icon::before, .e-view.fluent-dark .e-play-icon::before {
        content: '\\e72e';
    }

    .e-view.fluent .e-play-icon1::before, .e-view.fluent-dark .e-play-icon1::before {
        content: '\\e75d';
    }

    .e-view.fabric .e-play-icon1::before, .e-view.fabric-dark .e-play-icon1::before {
        content: '\\e7df';
    }

    .e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before {
        content: '\\e710';
    }

    .e-view.bootstrap .e-play-icon1::before {
        content: '\\ebd2';
    }

    .e-view.bootstrap4 .e-play-icon::before {
        content: '\\e780';
    }

    .e-view.bootstrap4 .e-play-icon1::before {
        content: '\\e743';
    }

    .e-view.tailwind .e-play-icon1::before, .e-view.tailwind-dark .e-play-icon1::before {
        content: '\\e76c';
    }

    .e-view.tailwind .e-play-icon::before, .e-view.tailwind-dark .e-play-icon::before {
        content: '\\e7bf';
    }

    .e-view.highcontrast .e-play-icon1::before {
        content: '\\ebf9';
    }

    .e-view.highcontrast .e-play-icon::before {
        content: '\\e710';
    }
    
    .e-view.bootstrap5 .e-play-icon1::before, .e-view.bootstrap5-dark .e-play-icon1::before {
        content: '\\e75d';
    }
    
    .e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {
        content: '\\e72e';
    }`;

export class Export extends SampleBase<{}, {}> {
    private mode: DropDownListComponent;
    private gauge: CircularGaugeComponent;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }
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
                    <div className='col-lg-8'>
                        <CircularGaugeComponent load={this.load.bind(this)} id='gauge' allowPrint={true} allowPdfExport={true} allowImageExport={true} ref={gauge => this.gauge = gauge}>
                        <Inject services={[Print, PdfExport, ImageExport]} />
                            <AxesDirective>
                                <AxisDirective radius='80%' startAngle={0} endAngle={0} direction={'AntiClockWise'}
                                    majorTicks={{ width: 1, height: 25, interval: 10, position:"Outside", useRangeColor: true }}
                                    lineStyle={{ width: 0 }}
                                    minorTicks={{ width: 1, height: 8, interval: 2, position:"Outside", useRangeColor: true }}
                                    labelStyle={{
                                        hiddenLabel: 'Last',
                                        font : { size: '12px', fontFamily:'Roboto', color:'#424242', fontWeight:'Regular'},
                                        position: 'Outside',
                                     useRangeColor: true 
                                    }}>
                                       <RangesDirective>
                                    <RangeDirective start={0} end={32} radius='90%' startWidth={10} endWidth={35} color='#F8A197' opacity={1}>
                                    </RangeDirective>
                                    <RangeDirective start={32} end={70} radius='90%' startWidth={10} endWidth={35} color='#C45072' opacity={1}>
                                    </RangeDirective>
                                    <RangeDirective start={70} end={100} radius='90%' startWidth={10} endWidth={35} color='#1B679F' opacity={1}>
                                    </RangeDirective>
                                </RangesDirective>
                                    <PointersDirective>
                                    <PointerDirective radius='0%' type='RangeBar' pointerWidth={0} />
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                        <div style={{ paddingLeft: '0px' }}>Export Type</div>
                                    </td>
                                    <td>
                                        <div>
                                        <DropDownListComponent width={'100%'} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                        <div style={{ paddingLeft: '0px' }}>File Name</div>
                                </td>
                                    <td>
                                        <div className="e-float-input" style={{ 'marginTop': '0px' }}>
                                            <input type="text" defaultValue="Gauge" id="fileName" style={{ "width" : "100%", padding: '0px', paddingLeft: '5px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '60px' }}>
                                    <td  style={{ width: "50%" }}>
                                        <div id="btn-control">
                                            <ButtonComponent onClick={this.onClickExport.bind(this)} style={{ width: '90px' }} isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                    <td  style={{ width: "50%" }}> 
                                           <div id="btn-control">
                                            <ButtonComponent onClick={this.onClickPrint.bind(this)} style={{ width: '90px' }} isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the print and export functionality of circular gauge.
              </p>
                </div>
                <div id="description">
                <p>
                    In this example, you can see how to export and print the rendered circular gauge. The Circular Gauge can be
                    exported to JPEG, PNG, SVG, and PDF formats. Print functionality is done by <code>print</code>
                    method when <code>allowPrint</code> is set as true. Export functionality is done by 
                    <code>export</code> method when <code>allowImageExport</code> and 
                    <code>allowPdfExport</code> is set as true.
                    <br /><br/>
                    <b>Injecting Module:</b>
                    <br /><br/>
                    To make use of the print and export support, we need to inject the <code>Print</code>, <code>ImageExport</code> and
                    <code>PdfExport</code> module into services.
                </p>
                    <p>
                        More information about print and export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/circular-gauge/gauge-print-and-export/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
