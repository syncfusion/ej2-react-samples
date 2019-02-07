/**
 * OSM sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    MarkersDirective, MarkerDirective, MapsTooltip, Bubble, Zoom, Marker
} from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
enableRipple(true);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #popuposm_dialog-content {
      display: none !important
    }
    #popuposm_title {
      font-size: 14px !important
    }
    .osmpopup {
      position:relative;
      background-color:white;
    }        
    .osmpopup:after {
        content:'';
        position: absolute;
        top: 170%;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -35px;
        border-top: solid 20px white;
        border-left: solid 20px transparent;
        border-right: solid 20px transparent;
    }
    #osmdialog .e-popup{
        min-width: 100px !important
    }`;

export class OSMMaps extends SampleBase<{}, {}> {
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
                                text: 'Headquarters of the United Nations',
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                            centerPosition={{
                                latitude: 40.7209,
                                longitude: -73.9680
                            }}
                            zoomSettings={{
                                zoomFactor: 9,
                                enable: false
                            }}>
                            <Inject services={[Bubble, MapsTooltip, Zoom, Marker]} />
                            <LayersDirective>
                                <LayerDirective layerType='OSM' animationDuration={0}>
                                    <MarkersDirective>
                                    <MarkerDirective visible={true}
                                        template='<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>'
                                        dataSource={data1}
                                        tooltipSettings={{
                                            visible: true,
                                            valuePath: 'name'
                                        }}>
                                    </MarkerDirective>
                                    </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                <div style={{float: 'right'}}>
                    <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
                </div>
                <br/>
                <div style={{float: 'right', marginright: '10px' }}>Source: 
                    <a href="https://en.wikipedia.org/wiki/Headquarters_of_the_United_Nations" target="_blank">en.wikipedia.org</a>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render the OpenStreetMap. Denoted the location of United Nations Headquarters using marker. EJ2 Dialog is displayed on the top of the marker. Also enabled zooming feature to zoom and pan the map for detailed analysis.
                    </p>
                    <br/>
                    <p style={{fontweight: 500}}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the <code>Maps.Inject(Marker)</code> method and zoom module using <code>maps.Inject(Zoom)</code> method.
                    </p>
                </div>
            </div>
        )
    }

    public load(args: ILoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)) as MapsTheme;
    };
}

setTimeout(
    function () {
        let dialogObj: Dialog = new Dialog({
            header: 'Manhattan,<br> New York, USA',
            animationSettings: { effect: 'FadeZoom' },
            showCloseIcon: true,
            height: '55px',
            width: '186px',
            target: document.getElementById('osmdialog')
        });
        dialogObj.appendTo('#popuposm');        
    },
500);

export let data1: any = [
    {
        name: 'Manhattan, New York, USA',
        latitude: 40.7488758,
        longitude: -73.9730091
    },
]