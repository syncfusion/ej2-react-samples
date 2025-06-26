/**
 * Sample for Drill down in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, indexFinder, Index,
    Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries, IAccLoadedEventArgs, IAccTextRenderEventArgs,
    IMouseEventArgs, AccumulationAnnotation, AccumulationTheme,
} from '@syncfusion/ej2-react-charts';
import { loadAccumulationChartTheme } from './theme-color';

const SAMPLE_CSS = `
    #category:hover {
        cursor: pointer;
    }`;

export class Drilldown extends SampleBase<{}, {}> {
    private data: Object[] = [
        { x: 'Asia-Pacific', y: 45 }, { x: 'Europe', y: 25 }, { x: 'North America', y: 20 }, {x: 'Latin America', y: 7},
        { x: 'Middle East & Africa', y: 3 }
    ];
    private AsiaPacific: Object = [
        { x: 'China', y: 66.7 }, { x: 'Japan', y: 17.8 }, { x: 'India', y: 11.1 }, { x: 'South Korea', y: 3.3 }, { x: 'Others', y: 1.1 }
    ];
    private Europe: Object = [
        { x: 'Germany', y: 32 }, { x: 'UK', y: 20 }, { x: 'France', y: 16 }, { x: 'Italy', y: 12 }, { x: 'Spain', y: 8 }, { x: 'Others', y: 12 }
    ];
    private NorthAmerica: Object = [
        { x: 'USA', y: 75 }, { x: 'Canada', y: 15 }, { x: 'Mexico', y: 10 }
    ];
    private LatinAmerica: Object = [
        { x: 'Brazil', y: 57.1 }, { x: 'Argentina', y: 21.4 }, { x: 'Chile', y: 14.3 }, { x: 'Others', y: 7.1 }
    ];
    private MiddleEastAfrica: Object = [
        { x: 'South Africa', y: 33.3 }, { x: 'Egypt', y: 26.7 }, { x: 'UAE', y: 23.3 }, { x: 'Others', y: 16.7 }
    ];
    private dataLabel: Object = {
        visible: true, position: 'Outside', enableRotation: false, connectorStyle: { type: 'Curve', length: Browser.isDevice ? '5%' : '10%' }, font: { fontWeight: '600', color: 'black', size: Browser.isDevice ? '6px' : '12px' }
    };
    private title: string = 'Automobile Sales by Region - 2023';
    private pie: AccumulationChartComponent;
    private isparent: boolean = true;
    private visibility: 'visible' | 'hidden' = 'hidden';

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div id="link">
                        <a id="category" onClick={this.onClick.bind(this)} style={{ visibility: this.visibility, display: 'inline-block' }}>
                            Sales by Category
                        </a>
                        <p style={{ visibility: this.visibility, display: 'inline-block' }} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                        <p id="text" style={{ visibility: this.visibility, display: 'inline-block' }}></p>
                    </div>
                    <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
                        title={this.title} enableSmartLabels={false} subTitle='Source: wikipedia.org' legendSettings={{ visible: false }}
                        enableBorderOnMouseMove={false}
                        tooltip={{ enable: false, format: '${point.x} <br> ${point.y} %' }}
                        chartMouseClick={this.onChartMouseClick.bind(this)}
                        textRender={this.onTextRender.bind(this)}
                        load={this.load.bind(this)}
                        loaded={this.onChartLoad.bind(this)}
                    >
                        <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries, AccumulationAnnotation]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={this.data} xName='x' yName='y' name='Automobile Sales' dataLabel={this.dataLabel} radius='70%'
                                startAngle={-30} endAngle={330} borderRadius={3} border={{color:'#ffffff', width: 1}} explode={false} >
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates a drill down chart with a pie for automobiles sales by region. Selecting a category navigates to its sub-categories, where sales are further broken down by country.
                    </p>
                </div>
                <div id="description">
                    <p> In this example, you can see how to achieve the drilldown concept using a pie chart. Automobile sales are shown in different categories. By clicking each category, you can navigate to the next level, which shows the sales by categories made by each company. <code>Datalabels</code> are used in this sample to show information about the data points.</p>
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p> Accumulation chart component features are segregated into individual feature-wise modules. To use datalabel, we need to inject DataLabel module <code>AccumulationDataLabel</code> into services </p>
                    <p>
                        More information on the pie series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart" aria-label="Navigate to the documentation for Pie Chart in React Accumulation Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }

    private onTextRender(args: IAccTextRenderEventArgs): void {
        args.text = args.point.x + ' ' + args.point.y + '%';
    }

    private onChartMouseClick(args: IMouseEventArgs): void {
        let index: Index = indexFinder(args.target);
        if (this.isparent && document.getElementById('pie-chart_Series_' + index.series + '_Point_' + index.point)) {
            this.isparent = false;
            switch (index.point) {
                case 0:
                    this.pie.series[0].dataSource = this.AsiaPacific;
                    this.pie.title = 'Automobile Sales in the Asia-Pacific region';
                    document.getElementById('text')!.innerHTML = 'Asia-Pacific';
                    break;
                case 1:
                    this.pie.series[0].dataSource = this.Europe;
                    this.pie.title = 'Automobile Sales in the Europe region';
                    document.getElementById('text')!.innerHTML = 'Europe';
                    break;
                case 2:
                    this.pie.series[0].dataSource = this.NorthAmerica;
                    this.pie.title = 'Automobile Sales in the North America region';
                    document.getElementById('text')!.innerHTML = 'North America';
                    break;
                case 3:
                    this.pie.series[0].dataSource = this.LatinAmerica;
                    this.pie.title = 'Automobile Sales in the Latin America region';
                    document.getElementById('text')!.innerHTML = 'Latin America';
                    break;
                case 4:
                    this.pie.series[0].dataSource = this.MiddleEastAfrica;
                    this.pie.title = 'Automobile Sales in the Middle East & Africa region';
                    document.getElementById('text')!.innerHTML = 'Middle East & Africa';
                    break;
            }
            if (this.pie.theme === 'HighContrast' || this.pie.theme.indexOf('Dark') > -1) {
                this.pie.annotations = [{
                    content: '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>', region: 'Series', x: '50%', y: '50%'
                }];
            } else {
                this.pie.annotations = [{
                    content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' +
                        '<img src="./src/chart/images/back.png" id="imgback" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
                }];
            }
            this.pie.series[0].innerRadius = '40%';
            this.pie.series[0].radius = '80%';
            this.pie.series[0].explode = false;
            this.pie.series[0].animation!.enable = false;
            this.pie.series[0].dataLabel!.connectorStyle!.length = Browser.isDevice ? '5%' : '10%';
            this.pie.series[0].dataLabel!.position = Browser.isDevice ? 'Inside' : 'Outside';
            this.pie.series[0].dataLabel!.enableRotation = Browser.isDevice ? true : false;
            this.pie.series[0].dataLabel!.font!.color = '';
            this.pie.legendSettings.visible = false;
            this.pie.visibleSeries[0].explodeIndex = null;
            this.pie.enableSmartLabels = true;
            this.pie.refresh();
            this.visibility = 'visible';
            document.getElementById('category')!.style.visibility = 'visible';
            document.getElementById('symbol')!.style.visibility = 'visible';
            document.getElementById('text')!.style.visibility = 'visible';
        }
        if (args.target.indexOf('back') > -1) {
            this.hide(document.getElementById(args.target));
        }
    }
    public onClick(e: MouseEvent): void {
        this.hide(e.target as Element);
    }
    public hide(target: Element): void {
        this.pie.series[0].dataSource = this.data;
        this.pie.series[0].innerRadius = '0%';
        this.pie.series[0].radius = '70%';
        this.pie.series[0].animation!.enable = false;
        this.isparent = true;
        this.pie.series[0].explode = false;
        this.pie.annotations = [];
        this.pie.annotationModule['annotations'] = [];
        this.pie.series[0].dataLabel = this.dataLabel;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        this.pie.enableSmartLabels = true;
        this.pie.refresh();
        (target as HTMLButtonElement).style.visibility = 'hidden';
        this.visibility = 'hidden';
        document.getElementById('category')!.style.visibility = 'hidden';
        document.getElementById('symbol')!.style.visibility = 'hidden';
        document.getElementById('text')!.style.visibility = 'hidden';
    }

    private onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart')!.setAttribute('title', '');
    }

    private load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = loadAccumulationChartTheme(args);
        if (selectedTheme.indexOf('HighContrast') || selectedTheme.indexOf('Dark') > -1) {
            args.accumulation.series[0]!.dataLabel!.font!.color = "white";
            if (args.accumulation.annotations[0] && !this.isparent) {
                args.accumulation.annotations[0].content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>';
            }
        }
    }
}