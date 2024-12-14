/**
 * print and export sample for smith chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    SmithchartComponent, SmithchartSeriesCollectionDirective, SmithchartSeriesDirective, SmithchartTheme,
    ISmithchartLoadedEventArgs, SmithchartExportType, Inject, TooltipRender, SmithchartLegend
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
// custom code start
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     #btn-control {
         width: 100%;
         text-align: center;
         text-transform:none !important;
     }
     .e-print-icon::before {
        content: '\\e34b';
    }
 
    .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before {
        content: '\\e7df';
    }
 
    .e-view.bootstrap .e-print-icon::before {
        content: '\\ebd2';
    }
 
   .e-view.bootstrap4 .e-print-icon::before {
        content: '\\e743';
    }
 
   .e-view.tailwind3 .e-print-icon::before, .e-view.tailwind3-dark .e-print-icon::before {
          content: '\\e76c';
    }
    
    .e-view.tailwind3 .e-export-icon::before, .e-view.tailwind3-dark .e-export-icon::before {
          content: '\\e7bf';
    }
 
    .e-view.highcontrast .e-print-icon::before {
        content: '\\ebf9';
    }
 
    .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {
        content: '\\e75d';
    }
 
    .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {
        content: '\\e75d';
    }
    .e-view.fluent2 .e-print-icon::before, .e-view.fluent2-dark .e-print-icon::before, .e-view.fluent2-highcontrast .e-print-icon::before {
        content: '\\e75d';
    }
    .e-view.material3 .e-print-icon::before, .e-view.material3-dark .e-print-icon::before {
        content: '\\e75d';
    }
    .e-export-icon::before {
        content: '\\e728';
    }
 
    .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before {
        content: '\\e710';
    }
 
    .e-view.bootstrap4 .e-icons.e-export::before {
        content: '\\e7bf';
    }

.e-view.tailwind\x03-dark .e-export-icon::before, .e-view.tailwind\x03 .e-export-icon::before {
        content: '\e7bf';
    }
 
    .e-view.highcontrast .e-export-icon::before {
        content: '\\e710';
    }
 
    .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {
            content: '\\e728';
    }
    .e-view.fluent .e-export-icon::before, .e-view.fluent-dark .e-export-icon::before {
        content: '\\e72e';
    }
    .e-view.fluent2 .e-export-icon::before, .e-view.fluent2-dark .e-export-icon::before, .e-view.fluent2-highcontrast .e-export-icon::before {
        content: '\\e72e';
    }
    .e-view.material3 .e-export-icon::before, .e-view.material3-dark .e-export-icon::before {
        content: '\\e72e';
    }`;
// custom code end
function Print() {
    React.useEffect(() => {
        updateSampleSection();
        const exportbutton = document.getElementById('smith-export');
        exportbutton.addEventListener('click', onClick1);
        const printbutton = document.getElementById('smith-print');
        printbutton.addEventListener('click', onClick2);
    }, [])

    // Code for Property Panel
    let smithchartInstance: SmithchartComponent;
    let positionElement: HTMLInputElement;
    let mode: DropDownListComponent;
    let nameElement: HTMLInputElement;

    let droplist: { [key: string]: Object }[] = [
        { text: 'JPEG', value: 'JPEG' },
        { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' },
        { text: 'PDF', value: 'PDF' },
    ];

    function onClick2(e: Event): void {
        smithchartInstance.print();
    }
    function onClick1(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        smithchartInstance.export((mode.value as SmithchartExportType), fileName);
    }
    function load(args: ISmithchartLoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Fluent2';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as SmithchartTheme;
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='col-lg-9 control-section'>
                <SmithchartComponent load={load.bind(this)} id='container' ref={gauge => smithchartInstance = gauge}
                    horizontalAxis={{ minorGridLines: { visible: true } }}
                    legendSettings={{ visible: true, shape: 'Circle' }}             //To config the legend for smithchart                        
                    radialAxis={{ minorGridLines: { visible: true } }}>
                    <Inject services={[TooltipRender, SmithchartLegend]} />
                    <SmithchartSeriesCollectionDirective>
                        <SmithchartSeriesDirective
                            points={[
                                { resistance: 0.15, reactance: 0 }, { resistance: 0.15, reactance: 0.15 },
                                { resistance: 0.18, reactance: 0.3 }, { resistance: 0.2, reactance: 0.4 },
                                { resistance: 0.25, reactance: 0.6 }, { resistance: 0.38, reactance: 0.95 },
                                { resistance: 0.6, reactance: 1.25 }, { resistance: 1, reactance: 1.6 },
                                { resistance: 1.65, reactance: 1.9 }, { resistance: 2.75, reactance: 2 },
                                { resistance: 4.5, reactance: 0 }, { resistance: 3, reactance: -2 },
                                { resistance: 1.65, reactance: -1.95 }, { resistance: 1, reactance: -1.65 },
                                { resistance: 0.6, reactance: -1.25 }, { resistance: 0.35, reactance: -0.9 },
                                { resistance: 0.25, reactance: -0.6 }, { resistance: 0.25, reactance: -0.4 },
                                { resistance: 0.25, reactance: -0.3 }, { resistance: 0.25, reactance: -0.15 },
                                { resistance: 0.25, reactance: 0 },
                            ]}
                            name='Transmission' enableAnimation={true} tooltip={{ visible: true }}
                            marker={{ shape: 'Circle', visible: true, border: { width: 2 } }}>
                        </SmithchartSeriesDirective>
                    </SmithchartSeriesCollectionDirective>
                </SmithchartComponent>
            </div>
            {/* Property Panel*/}
            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                    <tbody>
                        <tr style={{ 'height': '50px' }}>
                            <td style={{ 'width': '40%' }}>
                                <div>Export Type</div>
                            </td>
                            <td style={{ 'width': '60%' }}>
                                <div style={{ 'marginLeft': '-10px' }}>
                                    <DropDownListComponent id="mode" width="100px" index={0} placeholder="JPEG" ref={d => mode = d} dataSource={droplist} fields={{ text: 'text', value: 'value' }} />
                                </div>
                            </td>
                        </tr>
                        <tr style={{ 'height': '50px' }}>
                            <td style={{ 'width': '40%' }}>
                                <div id="filename">File Name</div>
                            </td>
                            <td style={{ 'width': '60%' }}>
                                <div className="e-float-input" style={{ 'marginTop': '0px', 'marginLeft': '-10px' }}>
                                    <input id="fileName" ref={d => nameElement = d} type="text" defaultValue="Smith chart" style={{ "width": "100px" }} aria-labelledby="Smith Chart"/>
                                </div>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <div id="btn-control" style={{ 'marginLeft': '50%' }}>
                                    <ButtonComponent id="smith-export" isPrimary={true} iconCss='e-icons e-export-icon'>Export</ButtonComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="btn-control" style={{ 'marginLeft': '50%' }}>
                                    <ButtonComponent id="smith-print"  isPrimary={true} iconCss='e-icons e-print-icon'>Print</ButtonComponent>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample explores the exporting and printing functionality in Smith chart.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to export and print the rendered Smith chart. Smith chart can be exported to JPEG, PNG, SVG, and PDF formats.
                </p>
            </div>
        </div>
    )

}
export default Print;