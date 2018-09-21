/**
 * Export sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Zoom, Legend,
    ProjectionType, MapsTooltip, ExportType, Marker, MarkersDirective, MarkerDirective
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
#btn-control {
    width: 100%;
    text-align: center;
}
.e-play-icon::before {
    content: "\\e728";
}`;
export class ExportMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private mode: DropDownListComponent;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            titleSettings={{
                                text: 'Location of the Wonders in the World',
                                textStyle: {
                                    size: '16px'
                                },
                            }}
                        >
                            <Inject services={[Marker, MapsTooltip]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax(location.origin + location.pathname + 'src/maps/map-data/world-map.json')}
                                    shapeSettings=
                                    {{
                                        fill: 'lightgrey',
                                        border: { color: 'black', width: 0.1 }
                                    }}>
                                    <MarkersDirective>
                                        <MarkerDirective visible={true}
                                            animationDuration={0}
                                            shape="Balloon"
                                            fill='#E13E40'
                                            width={15}
                                            height={20}
                                            dataSource={[
                                                { 'longitude': 116.5703749, 'latitude': 40.4319077, 'name': 'The Great Wall of China, China ' },
                                                { 'longitude': 35.4443622, 'latitude': 30.3284544, 'name': 'Petra, Jorden' },
                                                { 'longitude': 78.0421552, 'latitude': 27.1750151, 'name': 'Taj Mahal, Agra, India' },
                                                { 'longitude': 12.4922309, 'latitude': 41.8902102, 'name': 'The Roman Colosseum, Rome, Italy' },
                                                { 'longitude': -88.5677826, 'latitude': 20.6842849, 'name': 'The Chichen Itza, Mexico' },
                                                { 'longitude': -72.5449629, 'latitude': -13.1631412, 'name': 'Machu Picchu, Peru' },
                                                { 'longitude': -43.2104872, 'latitude': -22.951916, 'name': 'Christ Redeemer, Rio de janeiro, Brazil' },
                                            ]}
                                            tooltipSettings={{
                                                visible: true,
                                                valuePath: 'name'
                                            }}>
                                        </MarkerDirective >
                                    </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                        <div style={{ float: 'right', marginright: '10px' }}>Source:
                <a href="http://www.emapsworld.com/world-seven-wonder-map.html" target="_blank">en.wikipedia.org</a>
                        </div>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '90%' }}>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "20%" }}>
                                        Export Type:
                        </td>
                                    <td style={{ width: "30%" }}>
                                        <DropDownListComponent width={80} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "30%" }}>
                                        FileName :
                        </td>
                                    <td style={{ width: "40%" }}>
                                        <div className="e-float-input" style={{ width: 90, 'margin-top': '0px' }}>
                                            <input type="text" defaultValue="Maps" id="fileName" style={{ "margin-left": "-10px" }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id="btn-control" style={{ 'margin-left': '60px' }}>
                                            <ButtonComponent onClick={this.onClick.bind(this)} iconCss='e-icons e-play-icon' cssClass='e-flat' isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the exporting feature in Maps. By clicking the Export button, you can export the map in PNG, JPEG, SVG or in PDF formats.
                </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the export. The rendered map can be exported as either JPEG, PNG, SVG and PDF formats. It can be achieved using Blob and it is supported only in modern browsers. Also this sample visualizes the locations of the wonders in the world using markers.
                </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                    </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a marker, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method.
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
    public onClick(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        this.mapInstance.export((this.mode.value as ExportType), fileName);
    }
}
