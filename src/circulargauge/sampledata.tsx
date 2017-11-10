/**
 * Sample for data sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    Annotations, AnnotationDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .imageStyle {
        width: 16px;
        height: 16px;
        margin-top: 4px;
    }
        
    .fontDes {
        float: right;
        padding-left: 5px;
        color:#424242;
        font-size:20px;
        font-family:Roboto";
    }
    .fontDes1 {
        color:#9E9E9E;
        font-size:16px;
        font-family:Roboto";
    }
    `;
export class SampleData extends SampleBase<{}, {}> {
    private grid1: GridComponent;
    private sampleGauge1: CircularGaugeComponent;
    private sampleGauge2: CircularGaugeComponent;
    private sampleGauge3: CircularGaugeComponent;
    public dataInterval1: Object;
    public dataInterval2: Object;
    public orderData: Object[] = [
        {
            'Country': 'Germany',
            'Sales': 500,
            'Target': 400,
            'vsTarget': 300
        }, {
            'Country': 'USA',
            'Sales': 1000,
            'Target': 600,
            'vsTarget': 360
        }, {
            'Country': 'UK',
            'Sales': 600,
            'Target': 700,
            'vsTarget': -100
        }
    ];
    public onChartLoad(args: ILoadedEventArgs): void {

        this.dataInterval1 = setInterval(
            (): void => {
                let value1: number = Math.round(Math.random() * (90 - 55) + 55);
                let value2: number = Math.round(Math.random() * (75 - 60) + 60);
                let value3: number = Math.round(Math.random() * (40 - 10) + 10);
                let gridData1: number = 4 * value1;
                let gridData2: number = 6 * value2;
                let gridData3: number = 7 * value3;
                let newVal: number = Math.random() * (90 - 20) + 20;
                if (document.getElementById('sample1-container')) {
                    this.sampleGauge1.axes[0].pointers[0].animation.enable = true;
                    this.sampleGauge2.axes[0].pointers[0].animation.enable = true;
                    this.sampleGauge3.axes[0].pointers[0].animation.enable = true;
                    this.sampleGauge1.setPointerValue(0, 0, value1);
                    this.sampleGauge2.setPointerValue(0, 0, value2);
                    this.sampleGauge3.setPointerValue(0, 0, value3);
                    this.sampleGauge1.setAnnotationValue(0, 0, this.sampleGauge1.axes[0].annotations[0].content);
                    this.sampleGauge2.setAnnotationValue(0, 0, this.sampleGauge2.axes[0].annotations[0].content);
                    this.sampleGauge3.setAnnotationValue(0, 0, this.sampleGauge3.axes[0].annotations[0].content);
                    this.orderData = [
                        {
                            'Country': 'Germany',
                            'Sales': 500,
                            'Target': 400,
                            'vsTarget': gridData1
                        }, {
                            'Country': 'USA',
                            'Sales': 1000,
                            'Target': 600,
                            'vsTarget': gridData2
                        }, {
                            'Country': 'UK',
                            'Sales': 600,
                            'Target': 700,
                            'vsTarget': -gridData3
                        }];
                } else {
                    clearInterval(+this.dataInterval1);
                }
            },
            2000
        );
    };
    public onGridLoad(args: {}): void {
        this.dataInterval2 = setInterval(
            (): void => {
                if (document.getElementById('sample1-container')) {
                    this.grid1.dataSource = this.orderData;
                    this.grid1.refresh()
                } else {
                    clearInterval(+this.dataInterval2);
                }
            }, 2000)
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-4">
                                    <CircularGaugeComponent style={{ height: "250px" }} ref={gauge => this.sampleGauge1 = gauge} id='sample1-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={230} endAngle={130} minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 0
                                                }}
                                                majorTicks={{
                                                    width: 0
                                                }}
                                                minorTicks={{
                                                    width: 0
                                                }} labelStyle={{
                                                    font: { size: '0' }
                                                }}>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective
                                                        content='<div id="templateWrap"><img class="imageStyle" src="src/circulargauge/images/positive.png" /><div class="fontDes">${pointers[0].value}%</div></div></div>'
                                                        angle={180} zIndex='1'
                                                        radius='30%' />
                                                    <AnnotationDirective
                                                        content='<div class="fontDes1">Germany</div>'
                                                        angle={180} zIndex='1'
                                                        radius='65%' />
                                                </AnnotationsDirective>
                                                <RangesDirective>
                                                    <RangeDirective start={0} end={50} startWidth={15} endWidth={15} color='#EC121C' />
                                                    <RangeDirective start={50} end={100} startWidth={15} endWidth={15} color='#45EA0C' />
                                                </RangesDirective>
                                                <PointersDirective>
                                                    <PointerDirective value={75} radius='60%'
                                                        animation={{ enable: false }}
                                                        color='#777777' pointerWidth={5}
                                                        cap={{
                                                            radius: 6,
                                                            border: { width: 0 },
                                                            color: '#777777'
                                                        }}
                                                        needleTail={{
                                                            length: '25%'
                                                        }}>
                                                    </PointerDirective>
                                                </PointersDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                                <div className="col-sm-4">
                                    <CircularGaugeComponent style={{ height: "250px" }} ref={gauge => this.sampleGauge2 = gauge} id='sample2-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={230} endAngle={130} minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 0
                                                }}
                                                majorTicks={{
                                                    width: 0
                                                }}
                                                minorTicks={{
                                                    width: 0
                                                }} labelStyle={{
                                                    font: { size: '0' }
                                                }}>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective
                                                        content='<div id="templateWrap"><img class="imageStyle" src="src/circulargauge/images/positive.png" /><div class="fontDes">${pointers[0].value}%</div></div></div>'
                                                        angle={180} zIndex='1'
                                                        radius='30%' />
                                                    <AnnotationDirective
                                                        content='<div class="fontDes1">USA</div>'
                                                        angle={180} zIndex='1'
                                                        radius='65%' />
                                                </AnnotationsDirective>
                                                <RangesDirective>
                                                    <RangeDirective start={0} end={50} startWidth={15} endWidth={15} color='#EC121C' />
                                                    <RangeDirective start={50} end={100} startWidth={15} endWidth={15} color='#45EA0C' />
                                                </RangesDirective>
                                                <PointersDirective>
                                                    <PointerDirective value={60} radius='60%'
                                                        animation={{ enable: false }}
                                                        color='#777777' pointerWidth={5}
                                                        cap={{
                                                            radius: 6,
                                                            border: { width: 0 },
                                                            color: '#777777'
                                                        }}
                                                        needleTail={{
                                                            length: '25%'
                                                        }}>
                                                    </PointerDirective>
                                                </PointersDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                                <div className="col-sm-4">
                                    <CircularGaugeComponent style={{ height: "250px" }} ref={gauge => this.sampleGauge3 = gauge} loaded={this.onChartLoad.bind(this)} id='sample3-container'>
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective startAngle={230} endAngle={130} minimum={0} maximum={100}
                                                lineStyle={{
                                                    width: 0
                                                }}
                                                majorTicks={{
                                                    width: 0
                                                }}
                                                minorTicks={{
                                                    width: 0
                                                }} labelStyle={{
                                                    font: { size: '0' }
                                                }}>
                                                <AnnotationsDirective>
                                                    <AnnotationDirective
                                                        content='<div id="templateWrap"><img class="imageStyle" src="src/circulargauge/images/negative.png" /><div class="fontDes">${pointers[0].value}%</div></div></div>'
                                                        angle={180} zIndex='1'
                                                        radius='30%' />
                                                    <AnnotationDirective
                                                        content='<div class="fontDes1">UK</div>'
                                                        angle={180} zIndex='1'
                                                        radius='65%' />
                                                </AnnotationsDirective>
                                                <RangesDirective>
                                                    <RangeDirective start={0} end={50} startWidth={15} endWidth={15} color='#EC121C' />
                                                    <RangeDirective start={50} end={100} startWidth={15} endWidth={15} color='#45EA0C' />
                                                </RangesDirective>
                                                <PointersDirective>
                                                    <PointerDirective value={25} radius='60%'
                                                        animation={{ enable: false }}
                                                        color='#777777' pointerWidth={5}
                                                        cap={{
                                                            radius: 6,
                                                            border: { width: 0 },
                                                            color: '#777777'
                                                        }}
                                                        needleTail={{
                                                            length: '25%'
                                                        }}>
                                                    </PointerDirective>
                                                </PointersDirective>
                                            </AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <GridComponent dataBound={this.onGridLoad.bind(this)} ref={grid => this.grid1 = grid} dataSource={this.orderData.slice(0, 30)}>
                                    <ColumnsDirective>
                                        <ColumnDirective field='Country' headerText='Country' width='80'></ColumnDirective>
                                        <ColumnDirective field='Sales' headerText='Sales $' width='80'></ColumnDirective>
                                        <ColumnDirective field='Target' headerText='Target $' width='80' />
                                        <ColumnDirective field='vsTarget' headerText='vs Target' width='80' />
                                    </ColumnsDirective>
                                </GridComponent>
                            </div>
                        </div>
                    </div>
                    <div id="action-description">
                    <p>
                    This sample demonstrates the live data sample in circular gauge.
                </p>
                    </div>
                    <div id="description">
                        <p>
                            Pointer values in the gauge can be updated dynamically by using <code>setPointerValue</code> method.
                            In this example, a stock price changes over the countries, are showed by using a gauge.
                        </p>
                        <p>
                            More information on the gauge and its methods can be found in can be found in this
                            <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}
