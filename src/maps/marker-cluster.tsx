/**
 * Marker cluster map sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, Marker, Legend, Zoom, MapsTooltip
} from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/marker-cluster.json';
import * as worldMap from './map-data/world-map.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class MarkerCluster extends SampleBase<{}, {}> {

    render() {
        return (
            <main><div className='control-panel'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <MapsComponent id="maps" load={this.load} useGroupingSeparator={true} format='n'
                        zoomSettings={{
                            enable: true
                        }}
                        titleSettings={{
                            text: 'Top 50 largest cities in the World',
                            textStyle: {
                                size: '16px'
                            }
                        }}>
                        <Inject services={[Marker, MapsTooltip, Zoom]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap}
                                shapeSettings={{
                                    fill: '#C1DFF5'
                                }}
                                markerClusterSettings={{
                                    allowClustering: true,
                                    shape: 'Image',
                                    height: 40,
                                    width: 40,
                                    labelStyle: { color: 'white' },
                                    imageUrl: 'src/maps/images/cluster.svg'
                                }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true}
                                        dataSource={datasource.cluster}
                                        shape='Image'
                                        imageUrl='src/maps/images/ballon.png'
                                        tooltipSettings={{
                                            visible: true,
                                            valuePath: 'area',
                                            template: '<div id="template" style="width: 140px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">'+
                                            '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${city}</center></div>'+
                                            '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">'+
                                            '<div><span style="font-size:13px;color:#cccccc">Rank : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Rank}</span></div>'+
                                            '<div><span style="font-size:13px;color:#cccccc">Area : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${area} sq kms</span></div></div>',
                                        }}
                                        height={20}
                                        width={20}
                                        animationDuration={0}>
                                    </MarkerDirective>
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>Source:
       <a href="http://www.citymayors.com/statistics/largest-cities-population-125.html" target="_blank">www.citymayors.com</a>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Maps sample">
                    <p>
                        This sample illustrates the world's top 50 cities by showing the markers in their locations and clustering the markers to avoid intersecting. </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                    <p>
                        In this example, you can see how to display multiple markers in the same region without intersecting each other. If a marker intersects, it will be clustered and the total number of markers will be displayed over the cluster. When zooming in, the number of clusters will be decreased, and the individual marker will be displayed. When zooming out, markers that intersect will again be clustered. You can use the "clusterSettings" property in "layer" to enable marker clustering.
            </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch-enabled devices.
        </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a marker and cluster, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method.
            </p>
                </section>
            </main>
        )
    }
    
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };
    
}