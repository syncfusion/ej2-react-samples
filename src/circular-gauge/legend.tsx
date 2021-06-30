/**
 * Sample for Ranges
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    Annotations, AnnotationsDirective, AnnotationDirective, ILoadedEventArgs, GaugeTheme, LegendPosition, Alignment, GaugeShape, Legend
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    
export class Circle extends SampleBase<{}, {}> {
    private gauge: CircularGaugeComponent;
    private dropElement: DropDownListComponent;
    private alignElement: DropDownListComponent;
    private positionElement: DropDownListComponent;
    public legendPosition: DropDownList; public rangeColor: DropDownList; public pointerColor: DropDownList;
    private loaded: boolean = false;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as GaugeTheme;
    }
    // custom code end
    // Code for Property Panel

    private positionlist: { [key: string]: Object }[] = [
        { value: 'Top' },
        { value: 'Bottom' },
        { value: 'Left' },
        { value: 'Right' },
        { value: 'Auto' }
    ];
    private position(): void {
        this.gauge.legendSettings.position = this.positionElement.value as LegendPosition;
    }
    
    private alignlist: { [key: string]: Object }[] = [
        { value: 'Far' },
        { value: 'Center'},
        { value: 'Near' }
    ];
    private alignment(): void {
        this.gauge.legendSettings.alignment = this.alignElement.value as Alignment;
    }
    private shapelist: { [key: string]: Object }[] = [
        { value: 'Circle' },
        { value: 'Rectangle'},
        { value: 'Triangle' },
        { value: 'Diamond'},
        { value: 'InvertedTriangle'}
    ];
    private shape(): void {
        this.gauge.legendSettings.shape = this.dropElement.value as GaugeShape;
    }
    public enableToggleLegend(args: ChangeEventArgs): void {
        this.gauge.legendSettings.toggleVisibility = args.checked;

    }
    public enableLegend(args: ChangeEventArgs): void {
        this.gauge.legendSettings.visible = args.checked;
        this.gauge.refresh();
    }
    public colortObj: DropDownList;
    public listObj: DropDownList;
    render() {
        return (        
            <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={this.load.bind(this)} id='range-container' loaded={this.onChartLoad.bind(this)}
                    title='Measure of wind speed in Km/h' 
                    legendSettings={{visible: true, position:"Bottom"}} 
                    ref={gauge => this.gauge = gauge}>
                        <Inject services={[Annotations, Legend]} />                                           
                        <AxesDirective>
                            <AxisDirective startAngle={210} endAngle={150} radius='80%' minimum={0} maximum={120}
                                majorTicks={{
                                    color: '#9E9E9E', height: 16, interval: 20
                                }} lineStyle={{ width: 2}}
                                minorTicks={{
                                    height: 8, interval: 10
                                }} labelStyle={{
                                    position: 'Inside', useRangeColor: false,
                                    font: {
                                        size: '12px', color: '#424242', fontFamily: 'Roboto', fontStyle: 'Regular'
                                    }
                                }}>
                                <RangesDirective>
                                    <RangeDirective start={0} end={5} color='#ccffff' radius='110%' legendText='Light air' />
                                    <RangeDirective start={5} end={11} color='#99ffff' radius='110%' legendText='Light breeze'/>
                                    <RangeDirective start={11} end={19} color='#99ff99' radius='110%' legendText='Gentle breeze'/>
                                    <RangeDirective start={19} end={28} color='#79ff4d' radius='110%' legendText='Moderate breeze'/>
                                    <RangeDirective start={28} end={49} color='#c6ff1a' radius='110%' legendText='Strong breeze'/>
                                    <RangeDirective start={49} end={74} color='#e6ac00' radius='110%' legendText='Gale'/>
                                    <RangeDirective start={74} end={102} color='#ff6600' radius='110%' legendText='Storm'/>
                                    <RangeDirective start={102} end={120} color='#ff0000' radius='110%' legendText='Hurricane force'/>
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective value={70} radius='60%' pointerWidth={8} border={{
                                        width: 0,
                                        color: 'transparent'
                                    }}
                                    animation={{ enable: true }}
                                    cap={{
                                        radius: 7
                                    }}
                                    needleTail={{ length: '18%'}} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                               <tr style={{ height: '50px' }}>
                                    <td style={{ width: '20%' }}>
                                        <div id='enablePointer'>Show Legend</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{paddingTop: '0px'}}>
                                        <CheckBoxComponent id='enable' checked={true} change={this.enableLegend.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '20%' }}>
                                        <div id='enable'>Show range when the legend item is toggled</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{paddingTop: '0px'}}>
                                        <CheckBoxComponent id='enableToggle' checked={true} change={this.enableToggleLegend.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='position'>Position</div>
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent width="120px" index={0} change={this.position.bind(this)} ref={d => this.positionElement = d} dataSource={this.positionlist} fields={{ text: 'value', value: 'value' }} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='range'>Alignment</div>
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent width="120px" index={0} change={this.alignment.bind(this)} ref={d => this.alignElement = d} dataSource={this.alignlist} fields={{ text: 'value', value: 'value' }} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div id='pointColor'>Shape</div>
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent width="120px" index={0} change={this.shape.bind(this)} ref={d => this.dropElement = d} dataSource={this.shapelist} fields={{ text: 'value', value: 'value' }} />
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
            <p>
                This sample visualizes moving air types in the legend based on their speed. The visibility, shape, alignment and position of the legend can be changed using the properties panel options.
            </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render a legend in circular gauge. A legend item denotes the axis ranges. Any number of legend items can be added to a legend. You can bind the desired colors  and 
legend text to the corresponding ranges.
                </p>
                <p>
                    More information on the labels can be found in this
                    <a target="_blank" href="http://ej2.syncfusion.com/documentation"> documentation section</a>.
                </p>
                <br />
                    <p className='description-header'>Injecting Module</p>
                    <p>The circular gauge component features are segregated into individual modules by feature. To use a legend, inject the legend module using the <code>Legend</code> into <code>services</code>.
                    </p>
            </div>
        </div>
    )
}
public onChartLoad(args: {}): void {
    if (!this.loaded) {
        this.loaded = true;
        this.legendPosition = new DropDownList({
            index: 0,
            width: 130,
            change: () => {
                let position: string = this.legendPosition.value.toString();
            }
        });
        this.legendPosition.appendTo('#legendPosition');        
    }
}
}