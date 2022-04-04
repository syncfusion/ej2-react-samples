/**
 * Slider sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import { Slider  } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    Annotations, MapsTooltip, ILoadEventArgs, AnnotationsDirective, AnnotationDirective
} from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { SliderComponent, SliderChangeEventArgs } from "@syncfusion/ej2-react-inputs";
import * as data from './map-data/population-growth.json';
let datasource: any = data as any;
let sliderVal: number | number[] = [-2 , 4];
let colorCodes: string[] = ['#7E9CDC', '#DCD57E', '#7EDCA2', '#6EB5D0', '#A6DC7E', '#DCA87E', '#d075c6'];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #mapannotation.e-control.e-slider .e-handle {
            background-color: #4B4B4B ;
        }
    .e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {
        background: -webkit-linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);
        background: linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);
        background: -moz-linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);
    }
    .e-limit-bar.e-limits {
        background-color: transparent !important;
    }
    .e-control-wrapper.e-slider-container.e-horizontal .e-range {
        height: 0px !important;
    }
    #mapannotation.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 5px;
    }`;
export class MapSlider extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private sliderElement: SliderComponent;
    // custom code start
    public load(args: ILoadEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
    };
    // custom code end
    
    public loaded(args: ILoadedEventArgs): void {
        if (!isNullOrUndefined(document.getElementById('mapslider_Annotation_0'))) {
            this.annotationRender(sliderVal);
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <MapsComponent id="maps" load={this.load.bind(this)} loaded={this.loaded.bind(this)} ref={m => this.mapInstance = m}
                        margin={{
                            bottom: 20
                        }}
                        titleSettings={{
                            text: 'Average annual population growth in North American countries',
                            textStyle: {
                                size: '16px'
                            }
                        }}
                        zoomSettings={{
                            enable: false
                        }}>
                        <AnnotationsDirective>
                            <AnnotationDirective
                                content='<div id="mapslider-annotation" style="display:none;"/>'
                                horizontalAlignment= 'Center' y= '93%'
                 />
                        </AnnotationsDirective>
                        <Inject services={[Annotations, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/north-america.json')}
                                shapePropertyPath='name'
                                shapeDataPath='name'
                                dataSource={datasource.population}
                                shapeSettings={{
                                    colorValuePath: 'population',
                                    colorMapping: [
                                        {
                                            from: -1.5, to: -0.75, color: '#7E9CDC'
                                        },
                                        {
                                            from: -0.75, to: 0, color: '#DCD57E'
                                        },
                                        {
                                            from: 0.1, to: 0.75, color: '#7EDCA2'
                                        },
                                        {
                                            from: 0.76, to: 1.5, color: '#6EB5D0'
                                        },
                                        {
                                            from: 1.5, to: 2.25, color: '#A6DC7E'
                                        },
                                        {
                                            from: 2.25, to: 3, color: '#DCA87E'
                                        },
                                        {
                                            from: 3, to: 3.75, color: '#d075c6'
                                        }                
                                    ]
                                }}
                                tooltipSettings={{
                                    visible: true,
                                    format: '${name} : ${population}'
                                }}>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                <SliderComponent id="mapannotation" style={{width: '300px', marginLeft: '300px'}} type='Range' min={-1.5} max={3.75} step={0.75} value={sliderVal} 
                    ticks={{ placement: 'After', largeStep: 0.75 }} change={ this.sliderChange.bind(this)} ref={d => this.sliderElement = d} />
                <div style={{float: 'right', marginRight: '10px' }}>Source: 
                    <a href="https://en.wikipedia.org/wiki/List_of_North_American_countries_by_population" target="_blank">Population growth in North America</a>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the average annual population growth of the countries in the North America continent.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, range color mapping is applied to the shapes based on their population growth percentage. EJ2 Slider control is place at the bottom of the map to control the minimum and maximum color range.
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                    </p>
                    <br/>
                    <p style={{fontWeight: 500}}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a marker, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method, and use a legend by injecting the <code>Legend</code> module.
                    </p>
                </div>
            </div>
        )
    }

    private sliderChange() {
        if (!isNaN(this.sliderElement.value[0]) && !isNaN(this.sliderElement.value[1])) {
            for (let i: number = 0; i < this.mapInstance.layers[0].shapeSettings.colorMapping.length; i++) {
                if (this.mapInstance.layers[0].shapeSettings.colorMapping[i].from < this.sliderElement.value[0] ||
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].to > this.sliderElement.value[1]) {
                        this.mapInstance.layers[0].shapeSettings.colorMapping[i].color = '#E5E5E5';
                } else {
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].color = colorCodes[i];
                }
            }
            sliderVal = this.sliderElement.value;
            this.mapInstance.refresh();
        }
    }
    
    private annotationRender(val: number | number[]): void {
        let slider: Slider = new Slider({
            min: -2, max: 4,
            value: val,
            type: 'Range',
            ticks: { placement: 'After', largeStep: 1, },
            change: (args: SliderChangeEventArgs) => {
                this.sliderChange();
            }
        });
        slider.appendTo('#mapannotation');
    }
}