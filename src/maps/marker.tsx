
/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, MapsTooltip, Marker, MarkersDirective, MarkerDirective
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/top-population.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class MarkerMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            useGroupingSeparator = {true}
                            format = {"n"}
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
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')}
                                    shapePropertyPath='name'
                                    shapeDataPath='Country'
                                    dataSource={ datasource.population }
                                    shapeSettings={{
                                        fill: '#C3E6ED'
                                    }}
                                ><MarkersDirective>
                                        <MarkerDirective visible={true}
                                            animationDuration={0}
                                                shape='Circle'
                                                fill= 'white'
                                                width= {4}
                                                border= {{
                                                   color: '#285255',
                                                   width: 2
                                                }}
                                            dataSource={ datasource.population }
                                            tooltipSettings={{
                                                template: '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">'+
                                                '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>'+
                                                '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">'+
                                                '<div><span style="font-size:13px;color:#cccccc">Country : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Country}</span></div>'+
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
                    </div>
                    <div style={{float: 'right', marginright: '10px'}}>Source: 
                        <a href="http://www.citymayors.com/statistics/largest-cities-population-125.html" target="_blank">www.citymayors.com</a>
                    </div>
                    <div>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the top 25 populated cities in the world by displaying the markers in their locations.
               </p>
                </div>
                <div id="description">
                <p>
                   In this example, you can see how to render the data labels for each shape in a map. Data labels are used to display the values of the shapes. You can use the <code>autoFill</code> property in the <code>shapeSettings</code> to apply the default palette colors to the shapes.
            
                </p>
                <p>
                Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
                </p>
            <br/>
                <p style={{fontweight: 500}}>Injecting Module</p>
                <p>
                 Maps component features are segregated into individual feature-wise modules. To use a data label, inject the <code>DataLabel</code> module using the <code>Maps.Inject(DataLabel)</code> method.
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as MapsTheme;
    };
}