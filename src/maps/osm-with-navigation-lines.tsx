/**
 * OSM With Navigation Line sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { enableRipple } from '@syncfusion/ej2-base';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, AnnotationDirective,
    MarkersDirective, MarkerDirective, MapsTooltip, NavigationLine, Bubble, Zoom, Marker, ILoadEventArgs, NavigationLineDirective, NavigationLinesDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
enableRipple(true);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class OSMNavigation extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" load={this.load} ref={m => this.mapInstance = m}
                            titleSettings={{
                                text: 'Flight route from Los Angeles to Mexico city',
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                            centerPosition={{
                                latitude: 27.0902,
                                longitude: -105.7129
                            }}
                            zoomSettings={{
                                zoomFactor: 5,
                                enable: false
                            }}>
                            <Inject services={[Bubble, MapsTooltip, Zoom, Marker, NavigationLine]} />
                            <LayersDirective>
                                <LayerDirective layerType='OSM'>
                                    <MarkersDirective>
                                    <MarkerDirective visible={true}
                                        template='<div><img src="src/maps/images/group.svg" style="height:15px;width:15px;"></img></div>'
                                        dataSource={[{
                                            name: 'Mexico City',
                                            latitude: 23.6445,
                                            longitude: -102.832
                                        }]}
                                        tooltipSettings={{
                                            visible: true,
                                            valuePath: 'name'
                                        }}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                        template='<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>'
                                        dataSource={[{
                                            name: 'Mexico City',
                                            latitude: 24.2005,
                                            longitude: -102.832
                                        }]}
                                        tooltipSettings={{
                                            visible: true,
                                            valuePath: 'name'
                                        }}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                        template='<div style= "font-weight:500; font-size: 13px; text-align: left">Mexico</div>'
                                        dataSource={[{
                                            name: 'Mexico City',
                                            latitude: 24.0005,
                                            longitude: -101.200
                                        }]}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                        template='<div><img src="src/maps/images/oval.svg" style="height:15px;width:15px;"></img></div>'
                                        dataSource={[{                                            
                                            name: 'Los Angeles',
                                            latitude: 34.0522,
                                            longitude: -118.2437
                                        }]}
                                        tooltipSettings={{
                                            visible: true,
                                            valuePath: 'name'
                                        }}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                        template='<div><div style="text-align: right; font-weight:500; font-size: 13px;">Los Angeles</br>International Airport</div></div>'
                                        dataSource={[{                                            
                                            name: 'Los Angeles City',
                                            latitude: 34.7000,
                                            longitude: -121.5000
                                        }]}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                        template='<div><img src="src/maps/images/map-tooltip.svg" style="height:50px;width:100px;"></img></div>'
                                        dataSource={[{
                                            latitude: 28.5,
                                            longitude: -110.400            
                                        }]}>
                                    </MarkerDirective>
                                    </MarkersDirective>
                                    <NavigationLinesDirective>
                                        <NavigationLineDirective width={8} 
                                            visible={true}
                                            angle={-0.05}
                                            color='#00ace6'
                                            latitude={[ 23.6445, 34.0522 ]}
                                            longitude={[ -102.832, -118.2437 ]}>
                                        </NavigationLineDirective>
                                    </NavigationLinesDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                <div style={{float: 'right'}}> 
                    <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
                </div>
                <br/>
                {/* Source Link */}
                <div style={{float: 'right', marginRight: '10px' }}>Source: 
                    <a href="https://www.google.co.in/maps/dir/Los+Angeles,+CA,+USA/Mexico+City,+Mexico/@26.3645122,-117.6940069,5z/data=!4m14!4m13!1m5!1m1!1s0x80c2c75ddc27da13:0xe22fdf6f254608f4!2m2!1d-118.2436849!2d34.0522342!1m5!1m1!1s0x85ce0036b1352927:0xdefd9e4ee8d18a5b!2m2!1d-99.1013498!2d19.2464696!3e4?hl=en" target="_blank">www.google.co.in/maps</a>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the flight route from Los Angeles to Mexico City using Navigation lines feature in the OpenStreetMap.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render the navigation lines on the OpenStreetMap. Also denoted the source and destination locations using marker template.
                    </p>
                    <br/>
                    <p style={{fontWeight: 500}}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the <code>Maps.Inject(Marker)</code> method.
                    </p>
                </div>
            </div>
        )
    }
    
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = ((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };
    
}