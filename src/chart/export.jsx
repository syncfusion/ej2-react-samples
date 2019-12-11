/**
 * Sample for chart export
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Category, ColumnSeries, Inject, Legend, Export } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { fabricColors, bootstrapColors, materialColors, highContrastColors } from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
    { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
    { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #btn-control {
        width: 100%;
        text-align: center;
    }
    .e-play-icon::before {
        content: "\\e720";
    }`;
export class ChartExport extends SampleBase {
    constructor() {
        super(...arguments);
        this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' }
        ];
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} primaryXAxis={{
            title: 'Countries',
            valueType: 'Category',
            majorGridLines: { width: 0 }
        }} chartArea={{ border: { width: 0 } }} primaryYAxis={{
            title: 'Measurements',
            labelFormat: '{value}GW',
            minimum: 0,
            maximum: 40,
            interval: 10,
            majorGridLines: { width: 0 }
        }} pointRender={this.labelRender.bind(this)} load={this.load.bind(this)} title="Top 10 Countries Using Solar Power" loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true }}>
                            <Inject services={[ColumnSeries, Category, Legend, Export]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} type='Column'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "30%" }}>
                                        Export Type:
                            </td>
                                    <td style={{ width: "30%" }}>
                                        <DropDownListComponent width={120} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG"/>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "40%" }}>
                                        File Name:
                            </td>
                                    <td style={{ width: "40%" }}>
                                        <div className="e-float-input" style={{ width: 120, 'margin-top': '0px' }}>
                                            <input type="text" defaultValue="Chart" id="fileName" style={{ "margin-left": "-10px" }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id="btn-control" style={{ 'margin-left': '60px' }}>
                                            <ButtonComponent onClick={this.onClick.bind(this)} iconCss='e-icons e-play-icon' cssClass='e-flat' isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates the export feature in chart. By clicking <code>Export</code>, you can export the chart in PNG or JPEG format.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the export. The rendered chart can be exported as either JPEG or PNG format. It can be achieved using Blob and it's supported only in modern browsers.
            </p>
                    <p>
                        More information on the export can be found in this
                <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
            </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    labelRender(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        }
        else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        }
        else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        }
        else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    }
    onClick(e) {
        let fileName = document.getElementById('fileName').value;
        this.chartInstance.exportModule.export(this.mode.value, fileName);
    }
}
