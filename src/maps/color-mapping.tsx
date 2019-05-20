/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    Legend, MapsTooltip,
} from '@syncfusion/ej2-react-maps';
import * as data from './map-data/color-mapping.json';
let datasource: any = data as any;
import { SampleBase } from '../common/sample-base';
// custom code start
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .toolback {
        border-radius: 4px;
        border: 1px #abb9c6;
        opacity: 90%;
        background: rgba(53, 63, 76, 0.90);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);
        padding-bottom: 10px;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        width: 140px;
    }
    .listing1 {
         font-size:13px;
         color:#cccccc
    }
    .listing2 {
         font-size:13px;
         color:#ffffff;
         font-weight: 500;
    }`;
    // custom code end
export class ColorMap extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private typeElement: DropDownListComponent;
    private minOpacityElement: HTMLInputElement;
    private maxOpacityElement: HTMLInputElement;
    private opacityElement: CheckBoxComponent;
    // Code for Property Panel
	private dropList: { [key: string]: Object }[] = [
		{ text: 'Range', value: 'RangeColorMapping' },
		{ text: 'Equal', value: 'EqualColorMapping' },
		{ text: 'Desaturation', value: 'DesaturationColorMapping' }
    ];
    
    private minOpacityChange() {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            let slider: HTMLInputElement = document.getElementById('minOpacity') as HTMLInputElement;
            let minOpacity: number = parseFloat(slider.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = minOpacity;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = minOpacity;
            this.mapInstance.refresh();
        }
    }
    
    private maxOpacityChange() {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            let slider: HTMLInputElement = document.getElementById('maxOpacity') as HTMLInputElement;
            let maxOpacity: number = parseFloat(slider.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = maxOpacity;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = maxOpacity;
            this.mapInstance.refresh();
        }
    }

	private opacityChange(args: ChangeEventArgs) {
        let value: boolean = args.checked;
        if(value) {
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(this.minOpacityElement.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(this.maxOpacityElement.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = parseFloat(this.minOpacityElement.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = parseFloat(this.maxOpacityElement.value);
            this.minOpacityElement.disabled = false;
            this.maxOpacityElement.disabled = false;
        } else {
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = null;
            this.minOpacityElement.disabled = true;
            this.maxOpacityElement.disabled = true;
        }
        this.mapInstance.refresh();
    }
    
    private typeChange() {
        let value: string = this.typeElement.value.toString();
        if (value === 'RangeColorMapping') {
            this.opacityElement.disabled = true;
            this.mapInstance.layers[0].shapeSettings.colorValuePath = 'inches';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].to = 1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].label = '0 - 1';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].from = 1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].to = 2;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].label = '1 - 2';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].from = 2;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].to = 3;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].label = '2 - 3';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].from = 3;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].to = 4;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].color = '#547C84';
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].label = '3 - 4';
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].from = 4;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].to = 5;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].color = '#CEBF93';
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].label = '4 - 5';
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].from = 5;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].to = 6;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = '#a69d70';
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = '5 - 6';
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            this.mapInstance.legendSettings.title.text = 'Inches';
            this.mapInstance.refresh();
        } else if (value === 'EqualColorMapping') {
            this.opacityElement.disabled = true;
            this.mapInstance.layers[0].shapeSettings.colorValuePath = 'value';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].value = 'Low';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].value = 'Moderate';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].value = 'High';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            this.mapInstance.legendSettings.title.text = 'Category';
            this.mapInstance.refresh();
        }
        if (value === 'DesaturationColorMapping') {
            if (this.opacityElement.checked) {
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(this.minOpacityElement.value);
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(this.maxOpacityElement.value);
            } else {
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            }
            this.mapInstance.layers[0].shapeSettings.colorValuePath = 'inches';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].to = 6;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].label = '0 - 6';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            this.mapInstance.legendSettings.title.text = 'Inches';
            this.mapInstance.refresh();
            this.opacityElement.disabled = false;
        }
    }
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as MapsTheme;
        let sliderMin: HTMLInputElement = document.getElementById('hideOne') as HTMLInputElement;
        let sliderMax: HTMLInputElement = document.getElementById('hideTwo') as HTMLInputElement;
        let opacityCheck: HTMLInputElement = document.getElementById('hideThree') as HTMLInputElement;
        let dropListValue: HTMLInputElement = document.getElementById('Type') as HTMLInputElement;
        let opacityChecked: HTMLInputElement = document.getElementById('opacity') as HTMLInputElement;
        if(dropListValue.value === 'Desaturation'){
            sliderMin.style.visibility = "visible";
            if(opacityChecked.checked){
                sliderMax.style.visibility = "visible";
                opacityCheck.style.visibility = "visible";
            } else{
                sliderMax.style.visibility = "hidden";
                opacityCheck.style.visibility = "hidden";
            }           
        } else{
            sliderMin.style.visibility = "hidden";
            sliderMax.style.visibility = "hidden";
            opacityCheck.style.visibility = "hidden";        
        }      
    };
    //custom code end
    
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-9 control-section'>
                    <MapsComponent id="maps" load={this.load} ref={m => this.mapInstance = m}                            
                        titleSettings={{
                            text: 'Spring Precipitation Averages of US States',
                            textStyle: {
                                size: '16px'
                            }
                        }}
                        zoomSettings={{
                            enable: false
                        }}
                        legendSettings={{
                            visible: true,
                            position: 'Bottom', height: '10',
                            width: '80%', mode: 'Interactive',
                            titleStyle: {
                                size: '18px'
                            },
                            title: { text: 'Inches' }
                        }}>
                        <Inject services={[Legend, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective dataSource={datasource.color}
                                shapeDataPath='State'
                                shapeData={new MapAjax('./src/maps/map-data/usa.json')}
                                shapePropertyPath='name'
                                shapeSettings={{
                                    colorValuePath: 'inches',
                                    fill: '#E5E5E5',
                                    border: {
                                        color: 'black',
                                        width: 0.2
                                    },
                                    colorMapping: [
                                        {
                                            from: 0.1, to: 1, color: '#DEEBAE', label: '0 - 1'
                                        },
                                        {
                                            from: 1, to: 2, color: '#A4D6AD', label: '1 - 2'
                                        },
                                        {
                                            from: 2, to: 3, color: '#37AFAB', label: '2 - 3'
                                        },
                                        {
                                            from: 3, to: 4, color: '#547C84', label: '3 - 4'
                                        },
                                        {
                                            from: 4, to: 5, color: '#CEBF93', label: '4 - 5'
                                        },
                                        {
                                            from: 5, to: 6, color: '#a69d70', label: '5 - 6'
                                        },
                                    ],
                                }}
                                tooltipSettings={{
                                    visible: true,
                                    valuePath: 'State',
                                    template: '<div id="template"><div class="toolback"><div class="listing2"><center>${State}</center></div>' +
                                        '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"/><div><center>  <span class="listing1">Inches : </span>' +
                                        '<span class="listing2">${inches}</span></center></div><div><center>  <span class="listing1">Category : </span>' + 
                                        '<span class="listing2">${value}</span> </center></div></div></div>'
                                }}>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    {/* Source Link */}
                <div style={{float: 'right', marginright: '10px' }}>Source: 
                    <a href="https://simple.wikipedia.org/wiki/List_of_countries_by_population_density" target="_blank">simple.wikipedia.org</a>
                </div>
                </div>
                {/* Property Panel */}
					<div className='col-lg-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '110%', marginBottom: '20px' }}>
                                <tr>
									<td>
										<div>Color MappingType</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="Type" width="120px" index={0} change={this.typeChange.bind(this)} ref={d => this.typeElement = d} dataSource={this.dropList} fields={{ text: 'text', value: 'value' }} />
										</div>
									</td>
								</tr>
								<tr id="hideOne">
									<td>
										<div>Change Opacity</div>
									</td>
									<td>
										<div>
											<CheckBoxComponent id='opacity' checked={false} change={this.opacityChange.bind(this)} ref={d => this.opacityElement = d} disabled={true} />
										</div>
									</td>
								</tr>
								<tr id="hideTwo">
									<td>
										<div>Min Opacity</div>
									</td>
									<td>
										<div>
											<input type="range" id='minOpacity' disabled onChange={this.minOpacityChange.bind(this)} ref={d => this.minOpacityElement = d} min="0" max="1" step="0.1" defaultValue="0.5" />
										</div>
									</td>
								</tr>
								<tr id="hideThree">
									<td>
										<div>Max Opacity</div>
									</td>
									<td>
										<div>
											<input type="range" id='maxOpacity' disabled onChange={this.maxOpacityChange.bind(this)} ref={d => this.maxOpacityElement = d} min="0" max="1" step="0.1" defaultValue="1" />
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
                <div id="action-description">
                    <p>
                       This sample shows the average amount of rainfall and snowfall in spring season of all the states in US. Color mapping is applied to the shapes.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render a map with color mapping. Range color mapping and desaturation color mapping groups the shapes based on the inches value, where the equal color mapping groups based on the category (low, moderate or high) values. Legend is enabled in this example to represent each color mapping.
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                    </p>
                    <br/>
                    <p style={{fontweight: 500}}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use the legend, inject the <code>Legend</code> module using the <code>Maps.Inject(Legend)</code> method.
                    </p>
                </div>
            </div>
        )
    }
}