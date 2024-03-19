
/**
 * Marker sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, MapsTooltip, Marker, MarkersDirective, MarkerDirective
} from '@syncfusion/ej2-react-maps';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
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

export class MarkerMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    // Code for Property Panel
    private shapeChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.mapInstance.layers[0].markerSettings[0].shapeValuePath = 'shape';
        } else {
            this.mapInstance.layers[0].markerSettings[0].shapeValuePath = null;
        }
        this.mapInstance.refresh();
    }
    private colorChange(args: ChangeEventArgs) {
        if (args.checked) {
            this.mapInstance.layers[0].markerSettings[0].colorValuePath = 'color';
        } else {
            this.mapInstance.layers[0].markerSettings[0].colorValuePath = null;
        }
        this.mapInstance.refresh();
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-9 control-section'>
                    <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                        useGroupingSeparator={true}
                        format={"n"}
                        zoomSettings={{
                            enable: false
                        }}
                        titleSettings={{
                            text: 'Top 25 populated cities in the world',
                            textStyle: {
                                size: '16px'
                            }
                        }}
                    >
                        <Inject services={[Marker, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap}
                                shapePropertyPath='name'
                                shapeDataPath='Country'
                                dataSource={datasource.population}
                                shapeSettings={{
                                    fill: '#C3E6ED'
                                }}
                            ><MarkersDirective>
                                    <MarkerDirective visible={true}
                                        animationDuration={0}
                                        shape='Circle'
                                        fill='white'
                                        width={10}
                                        border={{
                                            color: '#285255',
                                            width: 2
                                        }}
                                        dataSource={datasource.population}
                                        tooltipSettings={{
                                            template: '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
                                                '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' +
                                                '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                                                '<div><span style="font-size:13px;color:#cccccc">Country : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Country}</span></div>' +
                                                '<div><span style="font-size:13px;color:#cccccc">Continent : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Continent}</span></div>' +
                                                '<div><span style="font-size:13px;color:#cccccc">Population : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${population}</span></div></div>',
                                            visible: true,
                                            valuePath: 'population'
                                        }}
                                    >
                                    </MarkerDirective>
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    {/* Source Link */}
                    <div style={{ float: 'right', marginRight: '10px' }}>Source:
                        <a href="http://www.citymayors.com/statistics/largest-cities-population-125.html" target="_blank">www.citymayors.com</a>
                    </div>
                </div>
                {/* Property Panel */}
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px', marginTop: '10px' }}>
                          <tbody>  
                            <tr style={{ }}>
                                <td style={{ width: "70%" }}>
                                    <div className="property-text" style={{ padding: '0px' }}>Bind markers shape from data source</div>
                                </td>
                                <td style={{ width: "30%" }} >
                                    <div className="col" style={{ paddingTop: '0px', marginTop: '-10px' }}>
                                        <CheckBoxComponent id="shapeCheckBox" change={this.shapeChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ }}>
                                <td style={{ width: "70%" }}>
                                    <div className="property-text" style={{ padding: '0px' }}>Bind markers color from data source</div>
                                </td>
                                <td style={{ width: "30%" }}>
                                    <div className="col" style={{ paddingTop: '0px', marginTop: '-10px' }}>
                                        <CheckBoxComponent id="colorCheckBox" change={this.colorChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the top 25 populated cities in the world by displaying the markers in their locations.
               </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render the markers in a map. Markers are used to indicate or mark a particular location on
                    the map with desired symbols. Also, options have been provided to bind the shapes and colors to the markers based on the continent
                    from the data source. This is achieved using the <code>shapeValuePath</code> and <code>colorValuePath</code> properties of the marker.
                </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a data label, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method.
                </p>
                </div>
            </div>
        )
    }
    public onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };
    
}