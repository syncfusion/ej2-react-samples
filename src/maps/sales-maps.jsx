/**
 * sales map sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, MapsTooltip, Marker, MarkersDirective, MarkerDirective, Zoom } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/sales-map.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class SalesMaps extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <MapsComponent id="maps" load={this.load} useGroupingSeparator={true} tooltipDisplayMode={"Click"} format={"n"} zoomSettings={{
            enable: true,
            mouseWheelZoom: false,
            pinchZooming: false
        }} titleSettings={{
            text: 'Sales details of products in various countries',
            textStyle: {
                size: '16px'
            }
        }}>
                        <Inject services={[Marker, MapsTooltip, Zoom]}/>
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} shapePropertyPath='name' shapeDataPath='Country' dataSource={datasource.salesmap} shapeSettings={{
            fill: '#C3E6ED'
        }} markerClusterSettings={{
            allowClustering: true,
            allowClusterExpand: true,
            shape: 'Image',
            height: 40,
            width: 40,
            labelStyle: { color: 'white' },
            imageUrl: 'src/maps/images/cluster.svg'
        }}><MarkersDirective>
                                    <MarkerDirective visible={true} animationDuration={0} height={15} width={15} shape='Image' imageUrl='src/maps/images/ballon.png' dataSource={datasource.salesmap} tooltipSettings={{
            format: '<b>Name</b> : ${name}<br><b>Product</b> : ${product}<br><b>Total value</b> : ${worth}',
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
                <div id="action-description">
                    <p>
                        This sample illustrates the sales details of the products and users location by rendering the markers. Marker clustering is also enabled in this sample.
               </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render cluster for more number of markers if it is at the exact latitude and longitude values. On clicking the cluster, it will gets expanded.
                </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, click the mouse over the marker or tap a marker in touch-enabled devices.
                </p>
                    <br />
                    <p style={{ fontweight: 500 }}>Injecting Module</p>
                    <p>

                        Maps component features are segregated into individual feature-wise modules. To use a marker and cluster, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method.
                </p>
                </div>
            </div>);
    }
}
