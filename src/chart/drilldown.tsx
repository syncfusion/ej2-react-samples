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
        { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
        { x: 'Minivan', y: 23 }
    ];
    private suvs: Object = [
        { x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
        { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }
    ];
    private cars: Object = [
        { x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 }, { x: 'Tata', y: 10 },
        { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }
    ];
    private pickups: Object = [
        { x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
        { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }
    ];
    private minivans: Object = [
        { x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 }, { x: 'Jaguar', y: 9 },
        { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }
    ];
    private dataLabel: Object = {
        visible: true, position: 'Inside', enableRotation: false, connectorStyle: { type: 'Curve', length: '5%' }, font: { fontWeight: '600', color: 'white' }
    };
    private title: string = 'Automobile Sales by Category';
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
                        title={this.title} enableSmartLabels={false} legendSettings={{ visible: false }}
                        enableBorderOnMouseMove={false}
                        tooltip={{ enable: false, format: '${point.x} <br> ${point.y} %' }}
                        chartMouseClick={this.onChartMouseClick.bind(this)}
                        textRender={this.onTextRender.bind(this)}
                        load={this.load.bind(this)}
                        loaded={this.onChartLoad.bind(this)}
                    >
                        <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries, AccumulationAnnotation]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={this.data} xName='x' yName='y' dataLabel={this.dataLabel} radius='70%'
                                explode={false} >
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates a drill down chart with a pie for automobiles sales by category. By clicking one category, you can navigate to other sub-categories where companies are differentiated.
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
                    this.pie.series[0].dataSource = this.suvs;
                    this.pie.title = 'Automobile Sales in the SUV Segment';
                    document.getElementById('text').innerHTML = 'SUV';
                    break;
                case 1:
                    this.pie.series[0].dataSource = this.cars;
                    this.pie.title = 'Automobile Sales in the Car Segment';
                    document.getElementById('text').innerHTML = 'Car';
                    break;
                case 2:
                    this.pie.series[0].dataSource = this.pickups;
                    this.pie.title = 'Automobile Sales in the Pickup Segment';
                    document.getElementById('text').innerHTML = 'Pickup';
                    break;
                case 3:
                    this.pie.series[0].dataSource = this.minivans;
                    this.pie.title = 'Automobile Sales in the Minivan Segment';
                    document.getElementById('text').innerHTML = 'Minivan';
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
            this.pie.series[0].innerRadius = '30%';
            this.pie.series[0].radius = Browser.isDevice ? '90%' : '80%';
            this.pie.series[0].explode = false;
            this.pie.series[0].animation.enable = false;
            this.pie.series[0].dataLabel.connectorStyle.length = '20px';
            this.pie.series[0].dataLabel.position = Browser.isDevice ? 'Inside' : 'Outside';
            this.pie.series[0].dataLabel.enableRotation = true;
            this.pie.series[0].dataLabel.font.color = '';
            this.pie.legendSettings.visible = false;
            this.pie.visibleSeries[0].explodeIndex = null;
            this.pie.enableSmartLabels = true;
            this.pie.refresh();
            this.visibility = 'visible';
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('symbol').style.visibility = 'visible';
            document.getElementById('text').style.visibility = 'visible';
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
        this.pie.series[0].animation.enable = false;
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
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    }

    private onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    }

    private load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = loadAccumulationChartTheme(args);
        if (selectedTheme === 'HighContrast' || selectedTheme.indexOf('Dark') > -1) {
            args.accumulation.series[0].dataLabel.font.color = "white";
            if (args.accumulation.annotations[0] && !this.isparent) {
                args.accumulation.annotations[0].content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>';
            }
        }
    }
}