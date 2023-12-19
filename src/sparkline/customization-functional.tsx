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
import { updateSampleSection } from '../common/sample-base';
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

function Customization() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let percentage: SparklineComponent;
    let sales: SparklineComponent;
    let sparklineElement: DropDownListComponent;
    let allElement: CheckBoxComponent;
    let negativeElement: CheckBoxComponent;
    let firstElement: CheckBoxComponent;
    let lastElement: CheckBoxComponent;
    let highElement: CheckBoxComponent;
    let lowElement: CheckBoxComponent;
    let markerElement: CheckBoxComponent;
    let datalabelElement: CheckBoxComponent;
    let tooltipElement: CheckBoxComponent;
    let tracklineElement: CheckBoxComponent;
    let axislineElement: CheckBoxComponent;
    let axisElement: SliderComponent;
    let rtlElement: CheckBoxComponent;
    // Code for Property Panel
    let droplist: { [key: string]: Object }[] = [
        { value: 'Sales Percentage' },
        { value: 'Sales Count' },
    ];

    function sparklineChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        if (element1.value === 'Sales Percentage') {
            axisElement.value = percentage.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 10;
        } else {
            axisElement.value = sales.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 5000000;
        }
        if ((element1.value === 'Sales Percentage' && percentage.markerSettings.visible.length) ||
            (element1.value === 'Sales Count' && sales.markerSettings.visible.length)) {
            markerElement.checked = true;
        } else {
            markerElement.checked = false;
        }

        markerChange();

        if ((element1.value === 'Sales Percentage' && percentage.dataLabelSettings.visible.length) ||
            (element1.value === 'Sales Count' && sales.dataLabelSettings.visible.length)) {
            datalabelElement.checked = true;
        } else {
            datalabelElement.checked = false;
        }

        let all: CheckBoxComponent = allElement;
        let negative: CheckBoxComponent = negativeElement;
        let first: CheckBoxComponent = firstElement;
        let last: CheckBoxComponent = lastElement;
        let high: CheckBoxComponent = highElement;
        let low: CheckBoxComponent = lowElement;
        let label: CheckBoxComponent = datalabelElement;
        let marker: CheckBoxComponent = markerElement;
        let rtl: CheckBoxComponent = rtlElement;
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;

        if (!marker.checked && !label.checked) {
            all.checked = false;
            negative.checked = false;
            first.checked = false;
            last.checked = false;
            high.checked = false;
            low.checked = false;
        }
        if (marker.checked) {
            let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
            all.checked = spark.markerSettings.visible.indexOf('All') > -1;
            negative.checked = spark.markerSettings.visible.indexOf('Negative') > -1;
            first.checked = spark.markerSettings.visible.indexOf('Start') > -1;
            last.checked = spark.markerSettings.visible.indexOf('End') > -1;
            high.checked = spark.markerSettings.visible.indexOf('High') > -1;
            low.checked = spark.markerSettings.visible.indexOf('Low') > -1;
        }
        if (label.checked) {
            let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
            all.checked = spark.dataLabelSettings.visible.indexOf('All') > -1;
            negative.checked = spark.dataLabelSettings.visible.indexOf('Negative') > -1;
            first.checked = spark.dataLabelSettings.visible.indexOf('Start') > -1;
            last.checked = spark.dataLabelSettings.visible.indexOf('End') > -1;
            high.checked = spark.dataLabelSettings.visible.indexOf('High') > -1;
            low.checked = spark.dataLabelSettings.visible.indexOf('Low') > -1;
        }

        datalabelChange();

        if ((element1.value === 'Sales Percentage' && percentage.tooltipSettings.visible === true) ||
            (element1.value === 'Sales Count' && sales.tooltipSettings.visible === true)) {
            tooltipElement.checked = true;
        } else {
            tooltipElement.checked = false;
        }

        tooltipChange();

        if ((element1.value === 'Sales Percentage' && percentage.tooltipSettings.trackLineSettings.visible === true) ||
            (element1.value === 'Sales Count' && sales.tooltipSettings.trackLineSettings.visible === true)) {
            tracklineElement.checked = true;
        } else {
            tracklineElement.checked = false;
        }

        tracklineChange();

        if ((element1.value === 'Sales Percentage' && percentage.axisSettings.lineSettings.visible === true) ||
            (element1.value === 'Sales Count' && sales.axisSettings.lineSettings.visible === true)) {
            axislineElement.checked = true;
        } else {
            axislineElement.checked = false;
        }

        axislineChange();

        rtlChange();

        if ((element1.value === 'Sales Percentage' && percentage.enableRtl === true) ||
            (element1.value === 'Sales Count' && sales.enableRtl === true)) {
            rtlElement.checked = true;
        } else {
            rtlElement.checked = false;
        }

        if (element1.value === 'Sales Percentage' && percentage.axisSettings.value !== 0) {
            axisElement.value = percentage.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 10;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + percentage.axisSettings.value;
        }
        if (element1.value === 'Sales Count' && sales.axisSettings.value !== 0) {
            axisElement.value = sales.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 5000000;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + sales.axisSettings.value;
        }

        axisChange();

        all.checked = !(negative.checked || high.checked || low.checked || first.checked || last.checked);
        negative.disabled = high.disabled = low.disabled = first.disabled = last.disabled = all.checked;
    }

    function allColorChange() {
        let negative: CheckBoxComponent = negativeElement;
        let first: CheckBoxComponent = firstElement;
        let last: CheckBoxComponent = lastElement;
        let high: CheckBoxComponent = highElement;
        let low: CheckBoxComponent = lowElement;

        if (allElement.checked == true) {
            negativeElement.disabled = true;
            firstElement.disabled = true;
            lastElement.disabled = true;
            highElement.disabled = true;
            lowElement.disabled = true;
        } else {
            negativeElement.disabled = false;
            firstElement.disabled = false;
            lastElement.disabled = false;
            highElement.disabled = false;
            lowElement.disabled = false;
        }

        let marker: CheckBoxComponent = markerElement;
        let label: CheckBoxComponent = datalabelElement;
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.markerSettings.visible = (true && marker.checked) ? ['All'] : (marker.checked) ? getVisible() : [];
        spark.dataLabelSettings.visible = (true && label.checked) ? ['All'] : (label.checked) ? getVisible() : [];
        spark.refresh();
    }

    function colorChange() {
        processMarkerLabel();
    }

    function processMarkerLabel() {
        let marker: CheckBoxComponent = markerElement;
        let label: CheckBoxComponent = datalabelElement;
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        if (marker.checked) {
            spark.markerSettings.visible = getVisible();
            spark.refresh();
        }
        if (label.checked) {
            spark.dataLabelSettings.visible = getVisible();
            spark.refresh();
        }
    }

    function getVisible(): VisibleType[] {
        let visible: VisibleType[] = [];
        if (allElement.checked)
            return ['All'];
        else {
            if (negativeElement.checked)
                visible.push("Negative");
            if (firstElement.checked)
                visible.push("Start");
            if (lastElement.checked)
                visible.push("End");
            if (firstElement.checked)
                visible.push("High");
            if (lowElement.checked)
                visible.push("Low");
        }
        return visible;
    }

    function markerChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.markerSettings.visible = markerElement.checked ? getVisible() : [];
        spark.refresh();
    }

    function datalabelChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.dataLabelSettings.visible = datalabelElement.checked ? getVisible() : [];
        spark.refresh();
    }

    function rtlChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.enableRtl = rtlElement.checked ? true : false;
        spark.refresh();
    }

    function tooltipChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.tooltipSettings.visible = tooltipElement.checked;
        spark.tooltipSettings.format = '${xval}: ${yval}';
        spark.refresh();
    }

    function tracklineChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.tooltipSettings.trackLineSettings.visible = tracklineElement.checked;
        spark.tooltipSettings.trackLineSettings.color = 'red';
        spark.tooltipSettings.trackLineSettings.width = 1;
        spark.refresh();
    }

    function axislineChange() {
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.axisSettings.lineSettings.visible = axislineElement.checked;
        spark.axisSettings.lineSettings.color = 'red';
        spark.axisSettings.lineSettings.width = 2;
        spark.refresh();
    }

    function axisChange() {
        let value: number = parseInt(axisElement.value.toString(), 10);
        let element1: HTMLInputElement = (document.getElementById('spark') as HTMLInputElement);
        let spark: SparklineComponent = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.axisSettings.value = value;
        document.getElementById('axisval').innerHTML = "Axis Value <span>" + value;
        spark.refresh();
    }

    function load(args: ISparklineLoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as SparklineTheme;
    }


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
                                        <SparklineComponent load={load.bind(this)} ref={m => percentage = m} id='spark1-container'
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
                                        <SparklineComponent load={load.bind(this)} ref={m => sales = m} id='spark2-container'
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
                <div style={{ "float": "right", "marginRight": "10px" }}>Source: <a href=" http://carsalesbase.com/global-car-sales-2017" target="_blank">carsalesbase.com</a>
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
                                        <DropDownListComponent id="spark" width="100%" index={0} change={sparklineChange.bind(this)} ref={d => sparklineElement = d} dataSource={droplist} fields={{ text: 'value', value: 'value' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> Special Points </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ "padding": "5px" }}>All</td>
                                            <td>
                                                <CheckBoxComponent change={allColorChange.bind(this)} ref={d => allElement = d} id='all' checked={true} />
                                            </td>
                                            <td style={{ "padding": "5px" }}>Negative</td>
                                            <td>
                                                <CheckBoxComponent change={colorChange.bind(this)} ref={d => negativeElement = d} id='negative' disabled={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ "padding": "5px" }}>First</td>
                                            <td>
                                                <CheckBoxComponent change={colorChange.bind(this)} ref={d => firstElement = d} id='first' disabled={true} />
                                            </td>
                                            <td style={{ "padding": "5px" }}>Last</td>
                                            <td>
                                                <CheckBoxComponent change={colorChange.bind(this)} ref={d => lastElement = d} id='last' disabled={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ "padding": "5px" }}>High</td>
                                            <td>
                                                <CheckBoxComponent change={colorChange.bind(this)} ref={d => highElement = d} id='high' disabled={true} />
                                            </td>
                                            <td style={{ "padding": "5px" }}>Low</td>
                                            <td>
                                                <CheckBoxComponent change={colorChange.bind(this)} ref={d => lowElement = d} id='low' disabled={true} />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> Marker </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent change={markerChange.bind(this)} ref={d => markerElement = d} id='marker' disabled={false} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> Data Label </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent change={datalabelChange.bind(this)} ref={d => datalabelElement = d} id='datalabel' disabled={false} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> EnableRTL </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent change={rtlChange.bind(this)} ref={d => rtlElement = d} id='rtl' disabled={false} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> Tooltip </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent change={tooltipChange.bind(this)} ref={d => tooltipElement = d} id='tooltip' disabled={false} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> Track Line </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent change={tracklineChange.bind(this)} ref={d => tracklineElement = d} id='trackline' disabled={false} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ "height": "30px" }}>
                                <td style={{ "width": "50%" }}>
                                    <div> Axis Line </div>
                                </td>
                                <td style={{ "width": "50%" }}>
                                    <div>
                                        <CheckBoxComponent change={axislineChange.bind(this)} ref={d => axislineElement = d} id='axis1' disabled={false} />
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
                                        <SliderComponent change={axisChange.bind(this)} ref={(slider) => axisElement = slider} type='MinRange' step={1} id="axis" value={0} min={0} max={10} style={{ width: '100px' }} disabled={false} />
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
export default Customization;