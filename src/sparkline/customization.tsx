/**
 * Customization samples for sparkline
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PropertyPane } from '../common/property-pane';
import { SliderComponent } from "@syncfusion/ej2-react-inputs";
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { SparklineComponent, SparklineTheme, VisibleType, ISparklineLoadedEventArgs, SparklineTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #axis > * {
        padding: 0px !important;
    }`;
const slidercss = `  
    .content-wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 170px;
    }`;

export class Customization extends SampleBase<{}, {}> {
    private percentage: SparklineComponent;
    private sales: SparklineComponent;
    private sparklineElement: DropDownListComponent;
    private allElement: CheckBoxComponent;
    private negativeElement: CheckBoxComponent;
    private firstElement: CheckBoxComponent;
    private lastElement: CheckBoxComponent;
    private highElement: CheckBoxComponent;
    private lowElement: CheckBoxComponent;
    private markerElement: CheckBoxComponent;
    private datalabelElement: CheckBoxComponent;
    private tooltipElement: CheckBoxComponent;
    private tracklineElement: CheckBoxComponent;
    private axislineElement: CheckBoxComponent;
    private axisElement: SliderComponent;
    private rtlElement: CheckBoxComponent;
    // Code for Property Panel
    private droplist: { [key: string]: Object }[] = [
        { value: 'Sales Percentage' },
        { value: 'Sales Count' },
    ];

    private sparklineChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        if (element1.value === 'Sales Percentage') {
            this.axisElement.value = this.percentage.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 10;
        } else {
            this.axisElement.value = this.sales.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 5000000;
        }
        if ((element1.value === 'Sales Percentage' && this.percentage.markerSettings.visible.length) ||
            (element1.value === 'Sales Count' && this.sales.markerSettings.visible.length)) {
            this.markerElement.checked = true;
        } else {
            this.markerElement.checked = false;
        }

        this.markerChange();

        if ((element1.value === 'Sales Percentage' && this.percentage.dataLabelSettings.visible.length) ||
            (element1.value === 'Sales Count' && this.sales.dataLabelSettings.visible.length)) {
            this.datalabelElement.checked = true;
        } else {
            this.datalabelElement.checked = false;
        }

        let all: CheckBoxComponent = this.allElement;
        let negative: CheckBoxComponent = this.negativeElement;
        let first: CheckBoxComponent = this.firstElement;
        let last: CheckBoxComponent = this.lastElement;
        let high: CheckBoxComponent = this.highElement;
        let low: CheckBoxComponent = this.lowElement;
        let label: CheckBoxComponent = this.datalabelElement;
        let marker: CheckBoxComponent = this.markerElement;
        let rtl: CheckBoxComponent = this.rtlElement;
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;

        if (!marker.checked && !label.checked) {
            all.checked = false;
            negative.checked = false;
            first.checked = false;
            last.checked = false;
            high.checked = false;
            low.checked = false;
        }
        if (marker.checked) {
            let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            all.checked = spark.markerSettings.visible.indexOf('All') > -1;
            negative.checked = spark.markerSettings.visible.indexOf('Negative') > -1;
            first.checked = spark.markerSettings.visible.indexOf('Start') > -1;
            last.checked = spark.markerSettings.visible.indexOf('End') > -1;
            high.checked = spark.markerSettings.visible.indexOf('High') > -1;
            low.checked = spark.markerSettings.visible.indexOf('Low') > -1;
        }
        if (label.checked) {
            let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            all.checked = spark.dataLabelSettings.visible.indexOf('All') > -1;
            negative.checked = spark.dataLabelSettings.visible.indexOf('Negative') > -1;
            first.checked = spark.dataLabelSettings.visible.indexOf('Start') > -1;
            last.checked = spark.dataLabelSettings.visible.indexOf('End') > -1;
            high.checked = spark.dataLabelSettings.visible.indexOf('High') > -1;
            low.checked = spark.dataLabelSettings.visible.indexOf('Low') > -1;
        }

        this.datalabelChange();

        if ((element1.value === 'Sales Percentage' && this.percentage.tooltipSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.tooltipSettings.visible === true)) {
            this.tooltipElement.checked = true;
        } else {
            this.tooltipElement.checked = false;
        }

        this.tooltipChange();

        if ((element1.value === 'Sales Percentage' && this.percentage.tooltipSettings.trackLineSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.tooltipSettings.trackLineSettings.visible === true)) {
            this.tracklineElement.checked = true;
        } else {
            this.tracklineElement.checked = false;
        }

        this.tracklineChange();

        if ((element1.value === 'Sales Percentage' && this.percentage.axisSettings.lineSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.axisSettings.lineSettings.visible === true)) {
            this.axislineElement.checked = true;
        } else {
            this.axislineElement.checked = false;
        }

        this.axislineChange();

		this.rtlChange();
		
        if ((element1.value === 'Sales Percentage' && this.percentage.enableRtl === true) ||
            (element1.value === 'Sales Count' && this.sales.enableRtl === true)) {
            this.rtlElement.checked = true;
        } else {
            this.rtlElement.checked = false;
        }        

        if (element1.value === 'Sales Percentage' && this.percentage.axisSettings.value !== 0) {
            this.axisElement.value = this.percentage.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 10;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + this.percentage.axisSettings.value;
        }
        if (element1.value === 'Sales Count' && this.sales.axisSettings.value !== 0) {
            this.axisElement.value = this.sales.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 5000000;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + this.sales.axisSettings.value;
        }

        this.axisChange();

        all.checked = !(negative.checked || high.checked || low.checked || first.checked || last.checked);
        negative.disabled = high.disabled = low.disabled = first.disabled = last.disabled = all.checked;
    }

    private allColorChange() {
        let negative: CheckBoxComponent = this.negativeElement;
        let first: CheckBoxComponent = this.firstElement;
        let last: CheckBoxComponent = this.lastElement;
        let high: CheckBoxComponent = this.highElement;
        let low: CheckBoxComponent = this.lowElement;

        if (this.allElement.checked == true) {
            this.negativeElement.disabled = true;
            this.firstElement.disabled = true;
            this.lastElement.disabled = true;
            this.highElement.disabled = true;
            this.lowElement.disabled = true;
        } else {
            this.negativeElement.disabled = false;
            this.firstElement.disabled = false;
            this.lastElement.disabled = false;
            this.highElement.disabled = false;
            this.lowElement.disabled = false;
        }

        let marker: CheckBoxComponent = this.markerElement;
        let label: CheckBoxComponent = this.datalabelElement;
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.markerSettings.visible = (true && marker.checked) ? ['All'] : (marker.checked) ? this.getVisible() : [];
        spark.dataLabelSettings.visible = (true && label.checked) ? ['All'] : (label.checked) ? this.getVisible() : [];
        spark.refresh();
    }

    private colorChange() {
        this.processMarkerLabel();
    }

    private processMarkerLabel() {
        let marker: CheckBoxComponent = this.markerElement;
        let label: CheckBoxComponent = this.datalabelElement;
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        if (marker.checked) {
            spark.markerSettings.visible = this.getVisible();
            spark.refresh();
        }
        if (label.checked) {
            spark.dataLabelSettings.visible = this.getVisible();
            spark.refresh();
        }
    }

    private getVisible(): VisibleType[] {
        let visible: VisibleType[] = [];
        if (this.allElement.checked)
            return ['All'];
        else {
            if (this.negativeElement.checked)
                visible.push("Negative");
            if (this.firstElement.checked)
                visible.push("Start");
            if (this.lastElement.checked)
                visible.push("End");
            if (this.firstElement.checked)
                visible.push("High");
            if (this.lowElement.checked)
                visible.push("Low");
        }
        return visible;
    }

    private markerChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.markerSettings.visible = this.markerElement.checked ? this.getVisible() : [];
        spark.refresh();
    }

    private datalabelChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.dataLabelSettings.visible = this.datalabelElement.checked ? this.getVisible() : [];
        spark.refresh();
    }

    private rtlChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.enableRtl = this.rtlElement.checked ? true : false;
        spark.refresh();
    }

    private tooltipChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.tooltipSettings.visible = this.tooltipElement.checked;
        spark.tooltipSettings.format = '${xval}: ${yval}';
        spark.refresh();
    }

    private tracklineChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.tooltipSettings.trackLineSettings.visible = this.tracklineElement.checked;
        spark.tooltipSettings.trackLineSettings.color = 'red';
        spark.tooltipSettings.trackLineSettings.width = 1;
        spark.refresh();
    }

    private axislineChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.axisSettings.lineSettings.visible = this.axislineElement.checked;
        spark.axisSettings.lineSettings.color = 'red';
        spark.axisSettings.lineSettings.width = 2;
        spark.refresh();
    }

    private axisChange() {
        let value: number = parseInt(this.axisElement.value.toString(), 10);
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.axisSettings.value = value;
        document.getElementById('axisval').innerHTML = "Axis Value <span>" + value;
        spark.refresh();
    }
    
    public load(args: ISparklineLoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as SparklineTheme;
    }
    
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="col-lg-8 control-section">
                    <div id="spark-container" className="row">
                        <div className="cols-sample-area" style={{ "margin": "auto", "textAlign": "center" }}>
                            <p style={{ "fontSize": "18px" }}> Worldwide car sales by brand - 2017</p>
                            <table style={{ "width": "100%", "margin": "auto" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ "margin": "auto" }}>Sales Percentage</td>
                                        <td>
                                            <SparklineComponent load={this.load.bind(this)} ref={m => this.percentage = m} id='spark1-container'
                                                height='200px' width='200px' lineWidth={1} type='Column' valueType='Category'
                                                tooltipSettings={{
                                                    format: '${xval} : ${yval}',
                                                    trackLineSettings: {
                                                        color: 'red',
                                                        width: 1
                                                    }
                                                }}
                                                markerSettings={{
                                                    fill: 'red',
                                                    size: 5
                                                }}
                                                axisSettings={{
                                                    lineSettings: {
                                                        color: 'red',
                                                        width: 2
                                                    }
                                                }}
                                                dataSource={[
                                                    { x: 0, xval: 'AUDI', yval: 1 },
                                                    { x: 1, xval: 'BMW', yval: 5 },
                                                    { x: 2, xval: 'BUICK', yval: -1 },
                                                    { x: 3, xval: 'CETROEN', yval: -6 },
                                                    { x: 4, xval: 'CHEVROLET', yval: 0 },
                                                    { x: 5, xval: 'FIAT', yval: 1 },
                                                    { x: 6, xval: 'FORD', yval: -2 },
                                                    { x: 7, xval: 'HONDA', yval: 7 },
                                                    { x: 8, xval: 'HYUNDAI', yval: -9 },
                                                    { x: 9, xval: 'JEEP', yval: 0 },
                                                    { x: 10, xval: 'KIA', yval: -10 },
                                                    { x: 11, xval: 'MAZDA', yval: 3 },
                                                    { x: 12, xval: 'MERCEDES', yval: 13 },
                                                    { x: 13, xval: 'NISSAN', yval: 5 },
                                                    { x: 14, xval: 'OPEL/VHALL', yval: -6 },
                                                    { x: 15, xval: 'PEUGEOT', yval: 0 },
                                                    { x: 16, xval: 'RENAULT', yval: 7 },
                                                    { x: 17, xval: 'SKODA', yval: 5 },
                                                    { x: 18, xval: 'SUBARU', yval: 5 },
                                                    { x: 19, xval: 'SUZUKI', yval: 11 },
                                                    { x: 20, xval: 'TOYOTA', yval: 5 },
                                                    { x: 21, xval: 'VOLKSWAGEN', yval: 3 },
                                                ]}
                                                xName='xval' yName='yval'>
                                                <Inject services={[SparklineTooltip]} />
                                            </SparklineComponent>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ "margin": "auto" }}>Sales Count</td>
                                        <td>
                                            <SparklineComponent load={this.load.bind(this)} ref={m => this.sales = m} id='spark2-container'
                                                height='200px' width='200px' lineWidth={1} type='Column' valueType='Category'
                                                tooltipSettings={{
                                                    format: '${xval} : ${yval}',
                                                    trackLineSettings: {
                                                        color: 'red',
                                                        width: 1
                                                    }
                                                }}
                                                markerSettings={{
                                                    fill: 'red',
                                                    size: 5
                                                }}
                                                axisSettings={{
                                                    lineSettings: {
                                                        color: 'red',
                                                        width: 2
                                                    }
                                                }}
                                                dataSource={[
                                                    { x: 0, xval: 'AUDI', yval: 1847613 },
                                                    { x: 1, xval: 'BMW', yval: 2030331 },
                                                    { x: 2, xval: 'BUICK', yval: 1465823 },
                                                    { x: 3, xval: 'CETROEN', yval: 999888 },
                                                    { x: 4, xval: 'CHEVROLET', yval: 3857388 },
                                                    { x: 5, xval: 'FIAT', yval: 1503806 },
                                                    { x: 6, xval: 'FORD', yval: 5953122 },
                                                    { x: 7, xval: 'HONDA', yval: 4967689 },
                                                    { x: 8, xval: 'HYUNDAI', yval: 3951176 },
                                                    { x: 9, xval: 'JEEP', yval: 1390130 },
                                                    { x: 10, xval: 'KIA', yval: 2511293 },
                                                    { x: 11, xval: 'MAZDA', yval: 1495557 },
                                                    { x: 12, xval: 'MERCEDES', yval: 2834181 },
                                                    { x: 13, xval: 'NISSAN', yval: 4834694 },
                                                    { x: 14, xval: 'OPEL/VHALL', yval: 996559 },
                                                    { x: 15, xval: 'PEUGEOT', yval: 1590300 },
                                                    { x: 16, xval: 'RENAULT', yval: 2275227 },
                                                    { x: 17, xval: 'SKODA', yval: 1180672 },
                                                    { x: 18, xval: 'SUBARU', yval: 1050390 },
                                                    { x: 19, xval: 'SUZUKI', yval: 2891415 },
                                                    { x: 20, xval: 'TOYOTA', yval: 7843423 },
                                                    { x: 21, xval: 'VOLKSWAGEN', yval: 6639250 },
                                                ]}
                                                xName='xval' yName='yval'>
                                                <Inject services={[SparklineTooltip]} />
                                            </SparklineComponent>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Source Link */}
                    <div style={{ "float": "right", "marginRight": "10px" }}>Source: <a href=" http://carsalesbase.com/global-car-sales-2017" target="_blank" aria-label="Navigate to the documentation for car sales base">carsalesbase.com</a>
                    </div>
                </div>

                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ "height": "30px" }}>
                                    <td>
                                        <div> Sparkline </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <DropDownListComponent id="spark" width="100%" index={0} change={this.sparklineChange.bind(this)} ref={d => this.sparklineElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> Special Points </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <table>
                                            <tr>
                                                <td style={{ "padding": "5px" }}>All</td>
                                                <td>
                                                    <CheckBoxComponent change={this.allColorChange.bind(this)} ref={d => this.allElement = d} id='all' checked={true} />
                                                </td>
                                                <td style={{ "padding": "5px" }}>Negative</td>
                                                <td>
                                                    <CheckBoxComponent change={this.colorChange.bind(this)} ref={d => this.negativeElement = d} id='negative' disabled={true} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ "padding": "5px" }}>First</td>
                                                <td>
                                                    <CheckBoxComponent change={this.colorChange.bind(this)} ref={d => this.firstElement = d} id='first' disabled={true} />
                                                </td>
                                                <td style={{ "padding": "5px" }}>Last</td>
                                                <td>
                                                    <CheckBoxComponent change={this.colorChange.bind(this)} ref={d => this.lastElement = d} id='last' disabled={true} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ "padding": "5px" }}>High</td>
                                                <td>
                                                    <CheckBoxComponent change={this.colorChange.bind(this)} ref={d => this.highElement = d} id='high' disabled={true} />
                                                </td>
                                                <td style={{ "padding": "5px" }}>Low</td>
                                                <td>
                                                    <CheckBoxComponent change={this.colorChange.bind(this)} ref={d => this.lowElement = d} id='low' disabled={true} />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> Marker </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <CheckBoxComponent change={this.markerChange.bind(this)} ref={d => this.markerElement = d} id='marker' disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> Data Label </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <CheckBoxComponent change={this.datalabelChange.bind(this)} ref={d => this.datalabelElement = d} id='datalabel' disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> EnableRTL </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <CheckBoxComponent change={this.rtlChange.bind(this)} ref={d => this.rtlElement = d} id='rtl' disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> Tooltip </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <CheckBoxComponent change={this.tooltipChange.bind(this)} ref={d => this.tooltipElement = d} id='tooltip' disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> Track Line </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <CheckBoxComponent change={this.tracklineChange.bind(this)} ref={d => this.tracklineElement = d} id='trackline' disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ "height": "30px" }}>
                                    <td style={{ "width": "50%" }}>
                                        <div> Axis Line </div>
                                    </td>
                                    <td style={{ "width": "50%" }}>
                                        <div>
                                            <CheckBoxComponent change={this.axislineChange.bind(this)} ref={d => this.axislineElement = d} id='axis1' disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id='axisval'>Axis Value <span>&nbsp;&nbsp;&nbsp;0</span> </div>
                                    </td>
                                    <td>
                                        <div className="content-wrapper">
                                            <style> {slidercss} </style>
                                            <SliderComponent change={this.axisChange.bind(this)} ref={(slider) => this.axisElement = slider} type='MinRange' step={1} id="axis" value={0} min={0} max={10} style={{ width: '100px' }} disabled={false} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample depicts the various customization options available in sparklines.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices.
                     </p>
                </div>
            </div>
        )
    }
}