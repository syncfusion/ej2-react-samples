/**
 * Sample for Remote data binding
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, IPointRenderEventArgs, ChartTheme, Legend, Category, ColumnSeries, Tooltip, IAxisLabelRenderEventArgs, ILoadedEventArgs, DataLabel } from '@syncfusion/ej2-react-charts';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointBootstrap5Colors, pointMaterial3Colors, pointMaterial3DarkColors, fluent2Colors, fluent2HighContrastColors, pointTailwind3Colors, pointTailwind3DarkColors } from './theme-color';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let dataManager = new DataManager({
    url: 'https://services.syncfusion.com/react/production/api/orders'
});
export let query: Query = new Query().take(5);
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
const RemoteData = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let waitingpopref = useRef<HTMLDivElement>(null)
    let loaded: number = 1;
    const pointRender = (args: IPointRenderEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = pointFabricColors[args.point.index % 10];;
        } else if (selectedTheme === 'material-dark') {
            args.fill = pointMaterialDarkColors[args.point.index % 10];;
        } else if (selectedTheme === 'material') {
            args.fill = pointMaterialColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5-dark') {
            args.fill = pointBootstrap5DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5') {
            args.fill = pointBootstrap5Colors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap4') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap-dark') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = pointHighContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent-dark') {
            args.fill = pointFluentDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent') {
            args.fill = pointFluentColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'material3-dark') {
            args.fill = pointMaterial3DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'material3') {
            args.fill = pointMaterial3Colors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2') {
            args.fill = fluent2Colors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
            args.fill = fluent2HighContrastColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        } 
        else if (selectedTheme === 'tailwind3') {
            args.fill = pointTailwind3Colors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3-dark') {
            args.fill = pointTailwind3DarkColors[args.point.index % 10];
        }
    }
    const onChartLoad = (args: ILoadedEventArgs): void => {
        waitingpopref.current.style.display = 'none';
        if (loaded) {
            loaded = 0;
            args.chart.refresh();
        }
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const tooltipRender = (args: any): void => {
        args.text = args.data.pointX + ': ' + '<b>' + '$' + args.data.pointY * 1000 + '</b>';
    };
    const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '' + args.value * 1000;
        }
    };
    const load = (args: ILoadedEventArgs): void => {
        waitingpopref.current.style.display = 'block';
        let width: number = args.chart.element.offsetWidth;
        let height: number = args.chart.element.offsetHeight;
        waitingpopref.current.style.top = (height ? height : 300 / 2 - 25) + 'px';
        waitingpopref.current.style.left = (width / 2 - 25) + 'px';
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div id="waitingpopup" ref={waitingpopref} className="waitingpopup" style={{ display: 'none', top: '0 px', left: '0 px' }}>
                    <span id="gif" className="image"></span>
                </div>
                <ChartComponent id='charts' style={{ textAlign: "center" }} load={load.bind(this)} primaryXAxis={{ rangePadding: 'Additional', valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: {width: 0} }} primaryYAxis={{ majorGridLines: { width: 1 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Freight rate in U.S. dollars' }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} axisLabelRender={axisLabelRender.bind(this)} pointRender={pointRender.bind(this)} tooltipRender={tooltipRender.bind(this)} title="Container freight rate" loaded={onChartLoad.bind(this)} legendSettings={{ visible: false }} tooltip={{ enable: true, header: "<b>Freight rate</b>"}}>
                    <Inject services={[ColumnSeries, Legend, Category, Tooltip, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={dataManager} xName='CustomerID' type='Column' yName='Freight' name='Story Point' query={query} animation={{ enable: false }} marker={{ dataLabel: { visible: true, position: 'Top',format: "{value}K", font: { fontWeight: '600', color: '#ffffff' },} }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the way in which the Charts component can be bound to a remote service. The data source of the chart is bound to remote data using the DataManager component.</p>
            </div>
            <div id="description">
                <p>
                    The Chart supports data binding. The <code> dataSource</code> property can be assigned with the instance of <code><a target="_blank"
                    href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html" aria-label="Navigate to the reference for DataManager">DataManager</a></code> to bind remote data.
                </p>
                <p>The DataManager, which will act as an interface between the service endpoint and the chart, will require the below minimal information to interact with service endpoint properly.</p>
                <ul>
                    <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data</li>
                    <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for remote binding.</li>
                </ul>
                <p>
                    Adaptor is responsible for processing response and request from/to the service endpoint. <code>@syncfusion/ej2-data</code> package provides some predefined adaptors which are designed to interact with particular service endpoints. They
                    are,
                </p>
                <ul>
                    <li><code>UrlAdaptor</code> - Use this to interact any remote services. This is the base adaptor for all remote based adaptors.</li>
                    <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                    <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                    <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                    <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                </ul>
                <p>
                    In this demo, remote data is bound by assigning service data as an instance of <code><a target="_blank"
                    href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html" aria-label="Navigate to the reference for DataManager">DataManager</a></code> to the <code> dataSource</code> property.
                </p>
                <p>
                    More information about the remote data binding can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#remote-data" aria-label="Navigate to the documentation for Remote Data binding in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default RemoteData;

