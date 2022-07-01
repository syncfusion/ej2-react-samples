/**
 * Customization sample for smith chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { SliderComponent } from "@syncfusion/ej2-react-inputs";
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    SmithchartComponent, SmithchartSeriesCollectionDirective, Title, SmithchartSeriesDirective, SmithchartTheme, TooltipRender, Inject,
    ISmithchartLoadedEventArgs, SmithchartLegend, TitleModel
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
// custom code start
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #radius > * {
        padding: 0px !important;
    }`;
const slidercss = `  
    .content-wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 100px;
    }`;
// custom code end

export class Customization extends SampleBase<{}, {}> {
    // Code for Property Panel
    private smithchartInstance: SmithchartComponent;
    private radiusElement: SliderComponent;
    private positionElement: DropDownListComponent;

    private droplist: { [key: string]: Object }[] = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' },
        { text: 'Left', value: 'Left' },
        { text: 'Right', value: 'Right' },
    ];

    private radiusChange() {
        this.smithchartInstance.radius = parseInt(this.radiusElement.value.toString(), 10) / 10;
        document.getElementById('radius1').innerHTML = 'Radius <span>&nbsp;&nbsp;&nbsp;' + (parseInt(this.radiusElement.value.toString(), 10) / 10);
        this.smithchartInstance.refresh();
    }
    private markerChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.smithchartInstance.series[0].marker.visible = true;
            this.smithchartInstance.series[1].marker.visible = true;
        } else {
            this.smithchartInstance.series[0].marker.visible = false;
            this.smithchartInstance.series[1].marker.visible = false;
        }
        this.smithchartInstance.refresh();
    }
    private labelChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.smithchartInstance.series[0].marker.dataLabel.visible = true;
            this.smithchartInstance.series[1].marker.dataLabel.visible = true;
        } else {
            this.smithchartInstance.series[0].marker.dataLabel.visible = false;
            this.smithchartInstance.series[1].marker.dataLabel.visible = false;
        }
        this.smithchartInstance.refresh();
    }
    private animateChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.smithchartInstance.series[0].enableAnimation = true;
            this.smithchartInstance.series[1].enableAnimation = true;
        } else {
            this.smithchartInstance.series[0].enableAnimation = false;
            this.smithchartInstance.series[1].enableAnimation = false;
        }
        this.smithchartInstance.refresh();
    }
    private tooltipChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.smithchartInstance.series[0].tooltip.visible = true;
            this.smithchartInstance.series[1].tooltip.visible = true;
        } else {
            this.smithchartInstance.series[0].tooltip.visible = false;
            this.smithchartInstance.series[1].tooltip.visible = false;
        }
        this.smithchartInstance.refresh();
    }
    private legendChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.smithchartInstance.legendSettings.visible = true;
        } else {
            this.smithchartInstance.legendSettings.visible = false;
        }
        this.smithchartInstance.refresh();
    }
    private positionChange() {
        this.smithchartInstance.legendSettings.position = this.positionElement.value.toString();
        this.smithchartInstance.refresh();
    }
    
    public load(args: ISmithchartLoadedEventArgs): void {
        args.smithchart.title.text = 'Impedance Transmission';
        args.smithchart.title.visible = true;
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).
            replace(/-dark/i, "Dark") as SmithchartTheme;
    }
    
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-md-8 control-section'>
                    <SmithchartComponent load={this.load.bind(this)} id='container' ref={gauge => this.smithchartInstance = gauge}
                        horizontalAxis={{ minorGridLines: { visible: true } }}
                        radialAxis={{ minorGridLines: { visible: true } }}
                        radius={1}
                        legendSettings={{           // To config the legend for smithchart
                            visible: true,
                            shape: 'Circle',
                            position: 'Top'
                        }}>
                        <Inject services={[TooltipRender, SmithchartLegend]} />
                        <SmithchartSeriesCollectionDirective>
                            <SmithchartSeriesDirective
                                points={[
                                    { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                                    { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 4 },
                                    { resistance: 3.5, reactance: 3 }, { resistance: 2.5, reactance: 2 },
                                    { resistance: 2, reactance: 1.5 }, { resistance: 1.5, reactance: 1.25 },
                                    { resistance: 1, reactance: 0.9 }, { resistance: 0.5, reactance: 0.6 },
                                    { resistance: 0.3, reactance: 0.4 }, { resistance: 0, reactance: 0.15 },
                                ]} name='Transmission1' enableAnimation={false} width={2} tooltip={{ visible: true }}
                                enableSmartLabels={false} fill='#0F94C4'
                                marker={{ shape: 'rectangle', visible: true, border: { width: 2 } }}>
                            </SmithchartSeriesDirective>
                            <SmithchartSeriesDirective
                                points={[
                                    { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                                    { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                                    { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                                    { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.8 },
                                    { resistance: 3.5, reactance: -0.8 }, { resistance: 2.5, reactance: -0.4 },
                                    { resistance: 2, reactance: -0.2 }, { resistance: 1.5, reactance: 0 },
                                    { resistance: 1, reactance: 0.1 }, { resistance: 0.5, reactance: 0.2 },
                                    { resistance: 0.3, reactance: 0.15 }, { resistance: 0, reactance: 0.05 },
                                ]} name='Transmission2' enableAnimation={false} width={2} tooltip={{ visible: true }}
                                enableSmartLabels={false} fill='#EE0C88'
                                marker={{ shape: 'rectangle', visible: true, border: { width: 2 } }}>
                            </SmithchartSeriesDirective>
                        </SmithchartSeriesCollectionDirective>
                    </SmithchartComponent>
                </div>
                {/* Property Panel */}
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div id='radius1'>Radius <span>&nbsp;&nbsp;&nbsp;1</span> </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div className="content-wrapper">
                                        <style> {slidercss} </style>
                                        <SliderComponent id="radius" change={this.radiusChange.bind(this)} ref={(slider) => this.radiusElement = slider} name="radius" step={1} value={10} type='MinRange' min={0} max={10} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div>Marker</div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent id='marker' checked={true} change={this.markerChange.bind(this)}> </CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div>Data Label</div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent id='datalabel' change={this.labelChange.bind(this)}> </CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div>Animation</div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent id='animate' change={this.animateChange.bind(this)}> </CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div>Tooltip</div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent id='tooltip' checked={true} change={this.tooltipChange.bind(this)}> </CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div>Legend</div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent id='legend' checked={true} change={this.legendChange.bind(this)}> </CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "35px" }}>
                                <td style={{ "width": "70%" }}>
                                    <div>Legend Position</div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <DropDownListComponent id="mode" width="100px" index={0} change={this.positionChange.bind(this)} ref={d => this.positionElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes two transmissions in Smith chart. Rendering Smith chart can be changed by using the <code>Render Type</code> in properties panel.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render a Smith chart with multiple series. Legend has been enabled to denote the series in Smith chart.</p>
                    <br />

                    <b>Injecting Module</b><br /><br />
                    <p>
                        Smith chart component features are segregated into individual feature-wise modules. To use a tooltip, inject the <code>Tooltip</code> module using the <code>SmithChart.Inject(TooltipRender)</code> method, and use a legend by injecting the <code>Legend</code> module using the <code>SmithChart.Inject(Legend)</code> method.
                     </p>
                </div>
            </div>
        )
    }
}