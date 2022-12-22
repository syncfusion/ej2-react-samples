/**
 * ColorMapping sample
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
import { updateSampleSection } from '../common/sample-base';
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
    }
    .tailwind .opacityCheckbox, .tailwind-dark .opacityCheckbox, .fabric .opacityCheckbox, .fabric-dark .opacityCheckbox{
        margin-top: -7px;
    }`;
function ColorMap() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let mapInstance: MapsComponent;
    let typeElement: DropDownListComponent;
    let minOpacityElement: HTMLInputElement;
    let maxOpacityElement: HTMLInputElement;
    let opacityElement: CheckBoxComponent;
    let dropList: { [key: string]: Object }[] = [
        { text: 'Range', value: 'RangeColorMapping' },
        { text: 'Equal', value: 'EqualColorMapping' },
        { text: 'Desaturation', value: 'DesaturationColorMapping' }
    ];

    function minOpacityChange() {
        if (opacityElement.checked && !opacityElement.disabled) {
            let slider: HTMLInputElement = document.getElementById('minOpacity') as HTMLInputElement;
            let minOpacity: number = parseFloat(slider.value);
            mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = minOpacity;
            mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = minOpacity;
            mapInstance.refresh();
        }
    }

    function maxOpacityChange() {
        if (opacityElement.checked && !opacityElement.disabled) {
            let slider: HTMLInputElement = document.getElementById('maxOpacity') as HTMLInputElement;
            let maxOpacity: number = parseFloat(slider.value);
            mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = maxOpacity;
            mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = maxOpacity;
            mapInstance.refresh();
        }
    }

    function opacityChange(args: ChangeEventArgs) {
        let value: boolean = args.checked;
        if (value) {
            mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(minOpacityElement.value);
            mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacityElement.value);
            mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = parseFloat(minOpacityElement.value);
            mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = parseFloat(maxOpacityElement.value);
            minOpacityElement.disabled = false;
            maxOpacityElement.disabled = false;
        } else {
            mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
            mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = null;
            minOpacityElement.disabled = true;
            maxOpacityElement.disabled = true;
        }
        mapInstance.refresh();
    }

    function typeChange() {
        let value: string = typeElement.value.toString();
        if (value === 'RangeColorMapping') {
            opacityElement.disabled = true;
            mapInstance.layers[0].shapeSettings.colorValuePath = 'inches';
            mapInstance.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            mapInstance.layers[0].shapeSettings.colorMapping[0].to = 1;
            mapInstance.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            mapInstance.layers[0].shapeSettings.colorMapping[0].label = '0 - 1';
            mapInstance.layers[0].shapeSettings.colorMapping[0].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].from = 1;
            mapInstance.layers[0].shapeSettings.colorMapping[1].to = 2;
            mapInstance.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            mapInstance.layers[0].shapeSettings.colorMapping[1].label = '1 - 2';
            mapInstance.layers[0].shapeSettings.colorMapping[1].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].from = 2;
            mapInstance.layers[0].shapeSettings.colorMapping[2].to = 3;
            mapInstance.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            mapInstance.layers[0].shapeSettings.colorMapping[2].label = '2 - 3';
            mapInstance.layers[0].shapeSettings.colorMapping[2].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].from = 3;
            mapInstance.layers[0].shapeSettings.colorMapping[3].to = 4;
            mapInstance.layers[0].shapeSettings.colorMapping[3].color = '#547C84';
            mapInstance.layers[0].shapeSettings.colorMapping[3].label = '3 - 4';
            mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].from = 4;
            mapInstance.layers[0].shapeSettings.colorMapping[4].to = 5;
            mapInstance.layers[0].shapeSettings.colorMapping[4].color = '#CEBF93';
            mapInstance.layers[0].shapeSettings.colorMapping[4].label = '4 - 5';
            mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].from = 5;
            mapInstance.layers[0].shapeSettings.colorMapping[5].to = 6;
            mapInstance.layers[0].shapeSettings.colorMapping[5].color = '#a69d70';
            mapInstance.layers[0].shapeSettings.colorMapping[5].label = '5 - 6';
            mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            mapInstance.legendSettings.title.text = 'Inches';
            mapInstance.refresh();
        } else if (value === 'EqualColorMapping') {
            opacityElement.disabled = true;
            mapInstance.layers[0].shapeSettings.colorValuePath = 'value';
            mapInstance.layers[0].shapeSettings.colorMapping[0].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[0].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            mapInstance.layers[0].shapeSettings.colorMapping[0].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[0].value = 'Low';
            mapInstance.layers[0].shapeSettings.colorMapping[1].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].value = 'Moderate';
            mapInstance.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            mapInstance.layers[0].shapeSettings.colorMapping[1].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            mapInstance.layers[0].shapeSettings.colorMapping[2].value = 'High';
            mapInstance.layers[0].shapeSettings.colorMapping[2].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            mapInstance.legendSettings.title.text = 'Category';
            mapInstance.refresh();
        }
        if (value === 'DesaturationColorMapping') {
            if (opacityElement.checked) {
                mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(minOpacityElement.value);
                mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacityElement.value);
            } else {
                mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
                mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            }
            mapInstance.layers[0].shapeSettings.colorValuePath = 'inches';
            mapInstance.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            mapInstance.layers[0].shapeSettings.colorMapping[0].to = 6;
            mapInstance.layers[0].shapeSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
            mapInstance.layers[0].shapeSettings.colorMapping[0].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[0].label = '0 - 6';
            mapInstance.layers[0].shapeSettings.colorMapping[1].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[1].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[2].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].from = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].to = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            mapInstance.legendSettings.title.text = 'Inches';
            mapInstance.refresh();
            opacityElement.disabled = false;
        }
    }

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        let sliderMin: HTMLInputElement = document.getElementById('hideOne') as HTMLInputElement;
        let sliderMax: HTMLInputElement = document.getElementById('hideTwo') as HTMLInputElement;
        let opacityCheck: HTMLInputElement = document.getElementById('hideThree') as HTMLInputElement;
        let dropListValue: HTMLInputElement = document.getElementById('Type') as HTMLInputElement;
        let opacityChecked: HTMLInputElement = document.getElementById('opacity') as HTMLInputElement;
        if (dropListValue.value === 'Desaturation') {
            sliderMin.style.visibility = "visible";
            if (opacityChecked.checked) {
                sliderMax.style.visibility = "visible";
                opacityCheck.style.visibility = "visible";
            } else {
                sliderMax.style.visibility = "hidden";
                opacityCheck.style.visibility = "hidden";
            }
        } else {
            sliderMin.style.visibility = "hidden";
            sliderMax.style.visibility = "hidden";
            opacityCheck.style.visibility = "hidden";
        }
        //custom code end
    };

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='col-lg-8 control-section'>
                <MapsComponent id="maps" load={load} ref={m => mapInstance = m}
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
                            size: '18px',
                            color: '#757575'
                        },
                        textStyle: {
                            color: '#757575'
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
                                /*border: {
                                    color: 'black',
                                    width: 0.2
                                },*/
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
                <div style={{ float: 'right', marginRight: '10px' }}>Source:
                    <a href="https://simple.wikipedia.org/wiki/List_of_countries_by_population_density" target="_blank">simple.wikipedia.org</a>
                </div>
            </div>
            {/* Property Panel */}
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                        <tr>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Color Mapping Type</div>
                            </td>
                            <td>
                                <div>
                                    <DropDownListComponent id="Type" width="100%" index={0} change={typeChange.bind(this)} ref={d => typeElement = d} dataSource={dropList} fields={{ text: 'text', value: 'value' }} />
                                </div>
                            </td>
                        </tr>
                        <tr id="hideOne">
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Change Opacity</div>
                            </td>
                            <td>
                                <div className='opacityCheckbox' style={{ paddingLeft: '0px', marginTop: '-10px' }}>
                                    <CheckBoxComponent id='opacity' checked={false} change={opacityChange.bind(this)} ref={d => opacityElement = d} disabled={true} style={{ paddingLeft: '0px' }} />
                                </div>
                            </td>
                        </tr>
                        <tr id="hideTwo" style={{ height: '50px' }}>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Min Opacity</div>
                            </td>
                            <td>
                                <div>
                                    <input type="range" id='minOpacity' disabled onChange={minOpacityChange.bind(this)} ref={d => minOpacityElement = d} min="0" max="1" step="0.1" defaultValue="0.5" style={{ width: '100%' }} />
                                </div>
                            </td>
                        </tr>
                        <tr id="hideThree" style={{ height: '50px' }}>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Max Opacity</div>
                            </td>
                            <td>
                                <div>
                                    <input type="range" id='maxOpacity' disabled onChange={maxOpacityChange.bind(this)} ref={d => maxOpacityElement = d} min="0" max="1" step="0.1" defaultValue="1" style={{ width: '100%' }} />
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
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use the legend, inject the <code>Legend</code> module using the <code>Maps.Inject(Legend)</code> method.
                </p>
            </div>
        </div>
    )
}

export default ColorMap;