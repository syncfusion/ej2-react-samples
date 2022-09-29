/**
 * Sample for Remote data binding
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, IPointRenderEventArgs, ChartTheme,
    Legend, Category, ColumnSeries, Tooltip, IAxisLabelRenderEventArgs, ILoadedEventArgs, DataLabel
} from '@syncfusion/ej2-react-charts';
import { bootstrapColors, fabricColors, materialColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color'
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let dataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders'
});
export let query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
export let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.orientation === 'Horizontal') {
        args.text = args.text.split(' ')[0];
    }
};

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .waitingpopup {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        width: 50px;
        height: 50px;
    }
    
    .image {
        position: absolute;
        background-repeat: no-repeat;
        background-image: url('src/chart/images/Medium-36px-spin.gif');
        background-position: center;
        width: 50px;
        height: 50px;
        padding: 6px;
    }
    #control-container {
        padding: 0px !important;
    }`;
export class RemoteData extends SampleBase<{}, {}> {
    private loaded: number = 1;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div id="waitingpopup" className="waitingpopup" style={{ display: "none" }}>
                        <span id="gif" className="image"></span>
                    </div>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        load={this.load.bind(this)}
                        primaryXAxis={{
                            rangePadding: 'Additional',
                            valueType: 'Category',
                            title: 'Assignee',
                            majorGridLines: { width: 0 },
                        }}
                        primaryYAxis={{
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            labelStyle: {
                                color: 'transparent'
                            }
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        axisLabelRender={labelRender}
                        pointRender={this.pointRender.bind(this)}
                        title="Sprint Task Analysis"
                        loaded={this.onChartLoad.bind(this)}
                        legendSettings={{ visible: false }}
                        tooltip={{ enable: true }}>
                        <Inject services={[ColumnSeries, Legend, Category, Tooltip, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dataManager} xName='CustomerID' type='Column' yName='Freight' name='Story Point' query={query}
                                animation={{ enable: false }} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates how to retrieve remote the data for chart.
            </p>
                </div>
                <div id="description">
                    <p>The Chart supports data binding. The <code> dataSource</code> property can be assigned with the instance of <code><a target="_blank"
                        href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
                        DataManager</a></code> to bind remote data.</p>

                    <p>The DataManager, which will act as an interface between the service endpoint and the chart, will require the below minimal
                        information to interact with service endpoint properly.
                    </p>
                    <ul>
                        <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data</li>
                        <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                           remote binding.</li>
                    </ul>
                    <p>Adaptor is responsible for processing response and request from/to the service endpoint. <code>@syncfusion/ej2-data</code>        package provides some predefined adaptors which are designed to interact with particular service endpoints. They
                       are,</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services. This is the base adaptor for all remote based
                          adaptors.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p>In this demo, remote data is bound by assigning service data as an instance of <code><a target="_blank"
                        href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
                        DataManager</a></code> to the <code> dataSource
                          </code> property.</p>
                    <p>
                        More information about the remote data binding can be found in this  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#remote-data">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public pointRender(args: IPointRenderEventArgs) {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent') {
            args.fill = fluentColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent-dark') {
            args.fill = fluentDarkColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
        div.style.display = 'none';
        if (this.loaded) {
            this.loaded = 0;
            args.chart.refresh();
        }        
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let div: HTMLElement = document.getElementById('waitingpopup');
        div.style.display = 'block';
        let width: number = args.chart.element.offsetWidth;
        let height: number = args.chart.element.offsetHeight;
        div.style.top = (height ? height : 300 / 2 - 25) + 'px';
        div.style.left = (width / 2 - 25) + 'px';
        div.style.display = '';
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        
}
