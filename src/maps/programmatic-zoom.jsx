/**
 * Projection sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, MapsTooltip, Marker, MarkersDirective, MarkerDirective, Zoom } from '@syncfusion/ej2-react-maps';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/southamerica-country-capitals.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class ProgrammaticZoomMaps extends SampleBase {
    // Code for Property Panel
    zoomChange(args) {
        this.mapInstance.zoomSettings.shouldZoomInitially = args.checked;
        this.mapInstance.refresh();
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-9 control-section'>
                    <MapsComponent id="maps" load={this.load} loaded={this.onMapsLoad.bind(this)} ref={m => this.mapInstance = m} useGroupingSeparator={true} format={"n"} zoomSettings={{
            enable: true,
            mouseWheelZoom: false,
            pinchZooming: false
        }} titleSettings={{
            text: 'Capitals of South American countries',
            textStyle: {
                size: '16px'
            }
        }}>
                        <Inject services={[Marker, MapsTooltip, Zoom]}/>
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} shapePropertyPath='name' shapeDataPath='Country' dataSource={datasource.southAmericaCountryCapitals} shapeSettings={{
            fill: '#C3E6ED',
            border: {
                color: 'black',
                width: .3
            }
        }}><MarkersDirective>
                                    <MarkerDirective visible={true} animationDuration={0} height={20} width={20} shape='Image' imageUrl='src/maps/images/ballon.png' dataSource={datasource.southAmericaCountryCapitals} tooltipSettings={{
            format: '<b>Capital</b> : ${name}<br><b>Country</b> : ${Country}',
            visible: true,
            valuePath: 'name'
        }}>
                                    </MarkerDirective>
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    
                    <div style={{ float: 'right', marginright: '10px' }}>Source:
                        <a href="https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_South_America#Sovereign_states" target="_blank">www.wikipedia.com</a>
                    </div>
                </div>
                
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "70%" }}>
                                    <div className="property-text" style={{ padding: "0px;" }}>Zoom to fit all the makers in maps</div>
                                </td>
                                <td style={{ width: "20%" }}>
                                    <div className="col">
                                        <CheckBoxComponent id="zoomCheckBox" change={this.zoomChange.bind(this)}/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the capitals of all the countries in the South America continent by displaying the markers in their locations.
               </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to zoom the maps dynamically based on the location of the markers in the map. The map is scaled and the center position
                    is changed based on the markers location. This is achieved by setting true to the <code>shouldZoomInitially</code> property in <code>zoomSettings</code>.
                </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                </p>
                    <br />
                    <p style={{ fontweight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a data label, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method.
                </p>
                </div>
            </div>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    }
    ;
}
