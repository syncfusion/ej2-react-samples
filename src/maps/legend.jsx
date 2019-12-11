/**
 * Projection sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Legend, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/legend-datasource.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class LegendMaps extends SampleBase {
    constructor() {
        super(...arguments);
        // Code for Property Panel
        this.droplist = [
            { text: 'Default', value: 'Default' },
            { text: 'Interactive', value: 'Interactive' },
        ];
        this.positionList = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' },
            { text: 'Left', value: 'Left' },
            { text: 'Right', value: 'Right' },
        ];
    }
    legendChange() {
        this.mapInstance.legendSettings.mode = this.legendElement.value;
        if (this.legendElement.value === 'Interactive') {
            if (this.mapInstance.legendSettings.orientation === 'Horizontal' || this.mapInstance.legendSettings.orientation === 'None') {
                this.mapInstance.legendSettings.height = '10';
                this.mapInstance.legendSettings.width = '';
            }
            else {
                this.mapInstance.legendSettings.height = '70%';
                this.mapInstance.legendSettings.width = '10';
            }
        }
        else {
            this.mapInstance.legendSettings.height = '';
            this.mapInstance.legendSettings.width = '';
        }
        this.mapInstance.refresh();
    }
    legendPositionChange() {
        this.mapInstance.legendSettings.position = this.legendPositionElement.value;
        if (this.legendPositionElement.value === 'Left' || this.legendPositionElement.value === 'Right') {
            this.mapInstance.legendSettings.orientation = 'Vertical';
            if (this.mapInstance.legendSettings.mode === 'Interactive') {
                this.mapInstance.legendSettings.height = '70%';
                this.mapInstance.legendSettings.width = '10';
            }
            else {
                this.mapInstance.legendSettings.height = '';
                this.mapInstance.legendSettings.width = '';
            }
        }
        else {
            this.mapInstance.legendSettings.orientation = 'Horizontal';
            if (this.mapInstance.legendSettings.mode === 'Interactive') {
                this.mapInstance.legendSettings.height = '10';
                this.mapInstance.legendSettings.width = '';
            }
        }
        this.mapInstance.refresh();
    }
    dataChange(args) {
        if (args.checked) {
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
        }
        else {
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
        }
        this.mapInstance.refresh();
    }
    toggleLegendChange(args) {
        this.mapInstance.legendSettings.toggleLegendSettings.enable = args.checked;
        this.mapInstance.refresh();
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-8 control-section'>
                    <MapsComponent id="maps" tooltipRender={this.tooltip} loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
            enable: false
        }} legendSettings={{
            visible: true,
            position: 'Top'
        }} titleSettings={{
            text: 'Population density (per square kilometer) - 2015',
            textStyle: {
                size: '16px'
            }
        }}>
                        <Inject services={[Legend, MapsTooltip]}/>
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource.legend} tooltipSettings={{
            visible: true,
            valuePath: 'name',
            format: '${name} : ${density}'
        }} shapeSettings={{
            colorValuePath: 'density',
            colorMapping: [
                {
                    from: 0.00001, to: 100, color: 'rgb(153,174,214)', label: '<100'
                },
                {
                    from: 100, to: 200, color: 'rgb(115,143,199)', label: '100 - 200'
                },
                {
                    from: 200, to: 300, color: 'rgb(77,112,184)', label: '200 - 300'
                },
                {
                    from: 300, to: 500, color: 'rgb(38,82,168)', label: '300 - 500'
                },
                {
                    from: 500, to: 19000, color: 'rgb(0,51,153)', label: '>500'
                },
                {
                    color: null, label: null
                }
            ]
        }}>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    
                    <div style={{ float: 'right', marginright: '10px' }}>Source: 
                        <a href="https://simple.wikipedia.org/wiki/List_of_countries_by_population_density" target="_blank">simple.wikipedia.org</a>
                    </div>
                </div>
                
					<div className='col-lg-4 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Legend mode</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendmode" width="120px" index={0} change={this.legendChange.bind(this)} ref={d => this.legendElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Legend position </div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendPosition" width="120px" index={0} change={this.legendPositionChange.bind(this)} ref={d => this.legendPositionElement = d} dataSource={this.positionList} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr style={{ height: "50px" }}>
                                    <td style={{ width: "80%" }}>
                                        <div className="property-text" style={{ padding: "0px;" }}>Show legend for remaining data source items</div>
                                    </td>
                                    <td style={{ width: "20%" }}>
                                        <div className="col">
											<CheckBoxComponent id="datasource" change={this.dataChange.bind(this)}/>
										</div>
									</td>
								</tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "70%" }}>
                                        <div className="property-text" style={{ padding: "0px;" }}>Show population density when the legend item is toggled</div>
                                    </td>
                                    <td style={{ width: "20%" }}>
                                        <div className="col">
											<CheckBoxComponent id="toggleLegend" change={this.toggleLegendChange.bind(this)}/>
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
                <div id="action-description">
                    <p>
                        This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.
                    </p>
                </div>
                <div id="description">
                    <p>
                       In this example, you can see how to render a legend in the maps. A legend item denotes the value of a shape. Any number of legend items can be added to the legend. You can bind the desired colors to the shapes, if its values are within the specified range using the ColorMapping property. You can also show or hide color mapping related to population density when toggling the legend item
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
                    </p>
                    <br />
                    <p style={{ fontweight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method.
                    </p>
                </div>
            </div>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    }
    ;
    tooltip(args) {
        if (!args.options['data']) {
            args.cancel = true;
        }
    }
}
