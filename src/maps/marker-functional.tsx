/**
 * Marker sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, MapsTooltip, Marker, MarkersDirective, MarkerDirective } from '@syncfusion/ej2-react-maps';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as data from './map-data/top-population.json';
import * as worldMap from './map-data/world-map.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    tr {
        height: 50px;
    }
    .tailwind tr, .tailwind-dark tr {
        height: 70px;
    }`;
const MarkerMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let mapInstance = useRef<MapsComponent>(null);
    let template: string = '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' + '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' + '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' + '<div><span style="font-size:13px;color:#cccccc">Country : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Country}</span></div>' + '<div><span style="font-size:13px;color:#cccccc">Continent : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Continent}</span></div>' + '<div><span style="font-size:13px;color:#cccccc">Population : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${population}</span></div></div>';
    const shapeChange = (args: ChangeEventArgs) => {
        if (args.checked) {
            mapInstance.current.layers[0].markerSettings[0].shapeValuePath = 'shape';
        } else {
            mapInstance.current.layers[0].markerSettings[0].shapeValuePath = null;
        }
        mapInstance.current.refresh();
    };
    const colorChange = (args: ChangeEventArgs) => {
        if (args.checked) {
            mapInstance.current.layers[0].markerSettings[0].colorValuePath = 'color';
        } else {
            mapInstance.current.layers[0].markerSettings[0].colorValuePath = null;
        }
        mapInstance.current.refresh();
    };
    const onMapsLoad = (): void => {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as MapsTheme;
        // custom code end
    };
    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-9'>
                    <MapsComponent id="maps" loaded={onMapsLoad} load={load} ref={mapInstance} useGroupingSeparator={true} format={"n"} zoomSettings={{ enable: false }} titleSettings={{ text: 'Top 25 populated cities in the world', textStyle: { size: '16px' } }}>
                        <Inject services={[Marker, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap} shapePropertyPath='name' shapeDataPath='Country' dataSource={datasource.population} shapeSettings={{ fill: '#C3E6ED' }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} animationDuration={0} shape='Circle' fill='white' width={10} border={{ color: '#285255', width: 2 }} dataSource={datasource.population} tooltipSettings={{ template: template, visible: true, valuePath: 'population' }} />
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    {/* Source Link */}
                    <div style={{ float: 'right', marginRight: '10px' }}>
                        Source: <a href="http://www.citymayors.com/statistics/largest-cities-population-125.html' target='_blank">www.citymayors.com</a>
                    </div>
                </div>

                {/* Property Panel */}
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px', marginTop: '10px' }}>
                            <tbody>
                                <tr style={{}}>
                                    <td style={{ width: "70%" }}>
                                        <div className='property-text' style={{ padding: '0px' }}>
                                            Bind markers shape from data source
                                        </div>
                                    </td>
                                    <td style={{ width: "30%" }}>
                                        <div className='col' style={{ paddingTop: '0px', marginTop: '-10px' }}>
                                            <CheckBoxComponent id="shapeCheckBox" change={shapeChange} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{}}>
                                    <td style={{ width: "70%" }}>
                                        <div className='property-text' style={{ padding: '0px' }}>
                                            Bind markers color from data source
                                        </div>
                                    </td>
                                    <td style={{ width: "30%" }}>
                                        <div className="col" style={{ paddingTop: '0px', marginTop: '-10px' }}>
                                            <CheckBoxComponent id="colorCheckBox" change={colorChange} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample visualizes the top 25 populated cities in the world by displaying the markers in their locations.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>
                    In this example, you can see how to render the markers in a map. Markers are used to indicate or mark a particular location on the map with desired symbols. Also, options have been provided to bind the shapes and colors to the markers based on the continent from the data source. This is achieved using the <code>shapeValuePath</code> and <code>colorValuePath</code> properties of the marker.
                </p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use a data label, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method.
                </p>
            </section>
        </main>
    )
}
export default MarkerMaps;