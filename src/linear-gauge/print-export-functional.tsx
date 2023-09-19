/**
 * Sample for print and export in the Linear Gauge
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, Annotations, ExportType, RangeDirective, RangesDirective, Print, PdfExport, ImageExport } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';
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

    .e-view.fabric .e-play-icon1::before, .e-view.fabric-dark .e-play-icon1::before
    {
        content: '\\e7df';
    }

    .e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before 
    {
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

    .e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {
        content: '\\e72e';
    }

    .e-view.bootstrap5 .e-play-icon1::before, .e-view.bootstrap5-dark .e-play-icon1::before {
        content: '\\e75d';
    }`;

const Export = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge = useRef<LinearGaugeComponent>(null);
    let mode = useRef<DropDownListComponent>(null);
    let fileName = useRef<HTMLInputElement>(null);

    let type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as LinearGaugeTheme;
        // custom code end
    }

    const onClickPrint = (): void => {
        gauge.current.print();
    }

    const onClickExport = (): void => {
        gauge.current.export((mode.current.value as ExportType), fileName.current.value);
    }

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <LinearGaugeComponent load={load.bind(this)} id='gauge' background='transparent' allowPrint={true} allowPdfExport={true} allowImageExport={true} title='Speedometer' titleStyle={{ fontFamily: 'inherit' }} orientation='Horizontal' ref={gauge}>
                        <Inject services={[Annotations, Print, PdfExport, ImageExport]} />
                        <AxesDirective>
                            <AxisDirective minimum={0} maximum={120} line={{ width: 0 }} minorTicks={{ height: 7, width: 0, interval: 4 }} majorTicks={{ height: 0, width: 0, interval: 20 }} labelStyle={{ position: "Outside", font: { fontFamily: 'inherit' }, offset: 4 }}>
                                <RangesDirective>
                                    <RangeDirective start={0} end={20} startWidth={15} endWidth={25} color='#82b944' />
                                    <RangeDirective start={20} end={40} startWidth={25} endWidth={35} color='#a1cb43' />
                                    <RangeDirective start={40} end={60} startWidth={35} endWidth={45} color='#ddec12' />
                                    <RangeDirective start={60} end={80} startWidth={45} endWidth={55} color='#ffbc00' />
                                    <RangeDirective start={80} end={100} startWidth={55} endWidth={65} color='#ff6000' />
                                    <RangeDirective start={100} end={120} startWidth={65} endWidth={75} color='red' />
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective value={80} height={23} width={35} offset={-55} markerType='Triangle' border={{ width: 2, color: 'white' }} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ width: '80%', marginLeft: '-10px' }}>Export Type</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent width={'100%'} id="etype" value="JPEG" ref={mode} dataSource={type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ width: '80%', marginLeft: '-10px' }}>File Name</div>
                                </td>
                                <td>
                                    <div className="e-float-input" style={{ 'marginTop': '0px' }}>
                                        <input type="text" defaultValue="Linear Gauge" id="fileName" style={{ "width": "100%", padding: "0px", paddingLeft: '5px' }} ref={fileName} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '60px' }}>
                                <td style={{ width: '50%' }}>
                                    <div id="btn-control">
                                        <ButtonComponent onClick={onClickExport} style={{ marginLeft: '30%' }} isPrimary={true}>Export</ButtonComponent>
                                    </div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div id="btn-control">
                                        <ButtonComponent onClick={onClickPrint} style={{ marginLeft: '-20%' }} isPrimary={true}>Print</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the print and export functionalities of the linear gauge.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to print and export the rendered linear gauge. You can add print functionality by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#print">print</a> method when <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowprint">allowPrint</a> is set as <b>true</b>. Also, you can add export functionality by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#export">export</a> method when <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowimageexport">allowImageExport</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowpdfexport">allowPdfExport</a> are set as <b>true</b>. The linear gauge can be exported to JPEG, PNG, SVG, and PDF formats.
                </p>
                <p>
                    More information about print and export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/print-and-export/">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default Export;