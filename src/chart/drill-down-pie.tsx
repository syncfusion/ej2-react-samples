/**
 * Sample for Drill down in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, indexFinder, Index,
    Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries, IAccLoadedEventArgs, IAccTextRenderEventArgs,
    IMouseEventArgs, AccumulationAnnotation, AccumulationTheme,
} from '@syncfusion/ej2-react-charts';
const SAMPLE_CSS = `
#category:hover {
    cursor: pointer;
}`;
let content: string = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" /><div>';
export class Drilldown extends SampleBase<{}, {}> {
    public data: Object[] = [
        { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
        { x: 'Minivan', y: 23 }
    ];
    public suvs: Object = [{ x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
    { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }];

    public cars: Object = [{ x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 },
    { x: 'Tata', y: 10 },
    { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }];

    public pickups: Object = [{ x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
    { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }];

    public minivans: Object = [{ x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 },
    { x: 'Jaguar', y: 9 },
    { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }];

    public dataLabel: Object = {
        visible: true, position: 'Inside', connectorStyle: { type: 'Curve', length: '5%' }, font: { size: '14px', color: 'white' }
    };

    public startAngle: number = 0;
    public explodeIndex: number = 2;
    public endAngle: number = 360;
    public title: string = 'Automobile Sales by Category';
    public pie: AccumulationChartComponent;
    public isparent: boolean = true;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div id="link">
                        <a id="category" onClick={this.onClick.bind(this)} style={{ visibility: 'hidden', display: 'inline-block' }}>
                            Sales by Category
		</a>
                        <p style={{ visibility: 'hidden', display: 'inline-block' }} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                        <p id="text" style={{ display: 'inline-block' }}></p>
                    </div>
                    <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie}
                        title='Automobile Sales by Category' enableSmartLabels={false} legendSettings={{ visible: false }}
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
                This sample demonstrates drill down sample with pie chart for a automobiles sales by category. By clicking one category, you can navigate to other sub-category by which companies are differentiated.
            </p>
                </div>
                <div id="description">
                    <p> In this example, you can see how to achieve <code>drilldown</code> concept using pie control. An automobile sales has been shown by different category, on clicking each category, you can navigate to next level, which shows the sales of those category
                    in terms of company.</p>
                    <p> Legend and datalabel is used in this sample.</p>
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p> Accumulation chart component features are segregated into individual feature-wise modules. To use datalabel, we need to inject DataLabel module <code>AccumulationDataLabel</code> into services </p>
                </div>
            </div>
        )
    }
    public onTextRender(args: IAccTextRenderEventArgs): void {
        args.text = args.point.x + ' ' + args.point.y + ' %';
    }
    public onChartMouseClick(args: IMouseEventArgs): void {
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
            this.pie.annotations = [{
                content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' +
                '<img src="./src/chart/images/back.png" id="imgback" />', region: 'Series', x: '50%', y: '50%'
            }];
            this.pie.series[0].innerRadius = '30%';
            this.pie.series[0].explode = false;
            this.pie.series[0].dataLabel.position = 'Outside';
            this.pie.series[0].dataLabel.font.color = 'black';
            this.pie.legendSettings.visible = true;
            this.pie.visibleSeries[0].explodeIndex = null;
            this.pie.enableSmartLabels = true;
            this.pie.refresh();
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
        this.isparent = true;
        this.pie.annotations = [];
        this.pie.annotationModule['annotations'] = [];
        this.pie.series[0].dataLabel = this.dataLabel;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        this.pie.enableSmartLabels = false;
        this.pie.refresh();
        (target as HTMLButtonElement).style.visibility = 'hidden';
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    }
    public onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as AccumulationTheme;
        if (selectedTheme === 'highcontrast'){
            args.accumulation.series[0].dataLabel.font.color="white";
            args.accumulation.annotations[0].content = content;
         }
    };
}