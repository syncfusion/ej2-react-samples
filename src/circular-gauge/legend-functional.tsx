/**
 * Samples for legend in the Circular Gauge
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, RangesDirective, RangeDirective, Annotations, ILoadedEventArgs, GaugeTheme, LegendPosition, Alignment, GaugeShape, Legend } from '@syncfusion/ej2-react-circulargauge';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

const Circle = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge = useRef<CircularGaugeComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let alignElement = useRef<DropDownListComponent>(null);
    let positionElement = useRef<DropDownListComponent>(null);
    let legendPosition: DropDownList;
    let loaded: boolean = false;

    let positionlist: { [key: string]: Object }[] = [
        { value: 'Bottom' },
        { value: 'Top' },
        { value: 'Left' },
        { value: 'Right' },
        { value: 'Auto' }
    ];

    let alignlist: { [key: string]: Object }[] = [
        { value: 'Center' },
        { value: 'Far' },
        { value: 'Near' }
    ];

    let shapelist: { [key: string]: Object }[] = [
        { value: 'Circle', text: 'Circle' },
        { value: 'Rectangle', text: 'Rectangle' },
        { value: 'Triangle', text: 'Triangle' },
        { value: 'Diamond', text: 'Diamond' },
        { value: 'InvertedTriangle', text: 'Inverted Triangle' }
    ];

    const position = (): void => {
        gauge.current.legendSettings.position = positionElement.current.value as LegendPosition;
    }

    const alignment = (): void => {
        gauge.current.legendSettings.alignment = alignElement.current.value as Alignment;
    }

    const shape = (): void => {
        gauge.current.legendSettings.shape = dropElement.current.value as GaugeShape;
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    const onChartLoad = (args: {}): void => {
        if (!loaded) {
            loaded = true;
            legendPosition = new DropDownList({
                index: 0,
                width: 130,
                change: () => {
                    let position: string = legendPosition.value.toString();
                }
            });
            legendPosition.appendTo('#legendPosition');
        }
    }

    const enableToggleLegend = (args: ChangeEventArgs): void => {
        gauge.current.legendSettings.toggleVisibility = args.checked;

    }

    const enableLegend = (args: ChangeEventArgs): void => {
        gauge.current.legendSettings.visible = args.checked;
        gauge.current.refresh();
    }

    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <CircularGaugeComponent load={load.bind(this)} background='transparent' id='range-container' loaded={onChartLoad.bind(this)} title='Measure of wind speed in km/h' titleStyle={{ fontFamily: 'inherit' }} legendSettings={{ visible: true, position: "Bottom", textStyle: { fontFamily: 'inherit', size: '12px' } }} ref={gauge}>
                        <Inject services={[Annotations, Legend]} />
                        <AxesDirective>
                            <AxisDirective startAngle={210} endAngle={150} radius='80%' minimum={0} maximum={120} majorTicks={{ color: '#9E9E9E', height: 16, interval: 20 }} lineStyle={{ width: 2 }} minorTicks={{ height: 8, interval: 10 }} labelStyle={{ position: 'Inside', useRangeColor: false, font: { fontFamily: 'inherit' } }}>
                                <RangesDirective>
                                    <RangeDirective start={0} end={5} color='#ccffff' radius='110%' legendText='Light Air' />
                                    <RangeDirective start={5} end={11} color='#99ffff' radius='110%' legendText='Light Breeze' />
                                    <RangeDirective start={11} end={19} color='#99ff99' radius='110%' legendText='Gentle Breeze' />
                                    <RangeDirective start={19} end={28} color='#79ff4d' radius='110%' legendText='Moderate Breeze' />
                                    <RangeDirective start={28} end={49} color='#c6ff1a' radius='110%' legendText='Strong Breeze' />
                                    <RangeDirective start={49} end={74} color='#e6ac00' radius='110%' legendText='Gale' />
                                    <RangeDirective start={74} end={102} color='#ff6600' radius='110%' legendText='Storm' />
                                    <RangeDirective start={102} end={120} color='#ff0000' radius='110%' legendText='Hurricane Force' />
                                </RangesDirective>
                                <PointersDirective>
                                    <PointerDirective value={70} radius='60%' pointerWidth={8} animation={{ enable: true }} cap={{ radius: 7 }} needleTail={{ length: '18%' }} />
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
                {/* Property Panel */}
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: '-10px' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '20%' }}>
                                        <div id='enablePointer' style={{ fontSize: "14px" }}>Show Legend</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ paddingTop: '0px', marginLeft: "0px", marginTop: "3px" }}>
                                            <CheckBoxComponent id='enable' checked={true} change={enableLegend.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '20%' }}>
                                        <div id='enable' style={{ fontSize: "14px" }}>Show range when the legend item is toggled</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ paddingTop: '0px', marginLeft: "0px", marginTop: "3px" }}>
                                            <CheckBoxComponent id='enableToggle' checked={true} change={enableToggleLegend.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id='position' style={{ fontSize: "14px" }}>Position</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '20px' }}>
                                            <DropDownListComponent width="100%" index={0} change={position.bind(this)} ref={positionElement} dataSource={positionlist} fields={{ text: 'value', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id='range' style={{ fontSize: "14px" }}>Alignment</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '20px' }}>
                                            <DropDownListComponent width="100%" index={0} change={alignment.bind(this)} ref={alignElement} dataSource={alignlist} fields={{ text: 'value', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id='pointColor' style={{ fontSize: "14px" }}>Shape</div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '20px' }}>
                                            <DropDownListComponent width="100%" index={0} change={shape.bind(this)} ref={dropElement} dataSource={shapelist} fields={{ text: 'text', value: 'value' }} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample directs the visualization of moving wind types based on their speed via the legend of the circular gauge component. The visibility, shape, alignment, and position of the legend can all be customized.</p>
            </div>
            <div id="description">
                <p>The legend provides useful information for interpreting what the circular gauge's axis range displays, and it can be represented in a variety of colors, shapes, and other identifiers depending on the data. To do so, use the <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/legendSettingsModel/'>legendSettings</a> and its properties.</p>
                <p>
                    More information on the legend can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-legend/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Circle;