/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Zoom, Marker,
    ProjectionType, MarkersDirective, MarkerDirective
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
.pulse-css {
    width: 20px;
    height: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    background:#E94430;
    position: relative;
  }
  .pulse-css:before, .pulse-css:after {
    content: '';
    width: 20px;
    height: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    background-color: #E94430;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transform: scale(0.5);
    transform-origin: center center;
    animation: pulse-me 3s linear infinite;
  }
  .pulse-css:after {
    animation-delay: 2s;
  }
  @keyframes pulse-me {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    70% {
      opacity: 0.1;
    }
    100% {
      transform: scale(5);
      opacity: 0;
    }
  }
  
    `;
let marketTemp: string = '<div id="template"> <div class="pulse-container"><div class="pulse-box"><div class="pulse-css"></div></div></div></div>'
export class EarthquakeMaps extends SampleBase<{}, {}> {
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
                            zoomSettings={{
                                enable: false,
                                zoomFactor: 7
                            }}
                            mapsArea={{
                                background: '#AEE2FA'
                            }}
                            titleSettings={{
                                text: '7.6 Magnitude earthquake strikes Sumatra - 2009',
                                textStyle: {
                                    size: '18px'
                                }
                            }}
                            centerPosition={{
                                latitude: 1.5053645409602877,
                                longitude: 105.14038085937499
                            }}
                        >
                            <Inject services={[Zoom, Marker]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/asia.json')}
                                    shapePropertyPath='name'
                                    shapeDataPath='name'
                                    shapeSettings={{
                                        fill: '#FFFDCF',
                                        border: {
                                            color: '#3497C3',
                                            width: 0.5
                                        }
                                    }}
                                >
                                    <MarkersDirective>
                                        <MarkerDirective visible={true} height={100} width={100}
                                            animationDuration={0}
                                            template = {marketTemp}
                                            dataSource={[{
                                                latitude: 1.625758360412755, longitude: 106.5693359375
                                            }]}
                                        >
                                        </MarkerDirective>
                                    </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    {/* Source Link */}
                    <div style={{float: 'right', marginRight: '10px'}}>Source: 
                        <a href="https://en.wikipedia.org/wiki/2009_Sumatra_earthquakes" target="_blank">en.wikipedia.org</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                    This sample demonstrates the earth quack occurred in Sumatra, Indonesia in the year 2009.
               </p>
            </div>
            <div id="description">
                <p>
                   In this example, you can see how to render a custom HTML element as marker and place it on a specific location.
                </p>
            <br/>
                <p style={{fontWeight: 500}}>Injecting Module</p>
                <p>
                   Maps component features are segregated into individual feature-wise modules. To use marker template, you need to inject <code>Marker</code> module using <code>Maps.Inject(Marker)</code> method.
                </p>
            </div>
            </div>
        )
    }
    public onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
    };
    // custom code end
}