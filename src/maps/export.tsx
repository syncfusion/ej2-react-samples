/**
 * Export sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ProjectionType, MapsComponent, MapsTooltip, ExportType, Marker, MarkersDirective, MarkerDirective,
    PdfExport, ImageExport, Inject, LayersDirective, LayerDirective, ILoadedEventArgs, MapsTheme
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import * as worldMap from './map-data/world-map.json';
const SAMPLE_CSS = `
#btn-control {
    width: 100%;
    text-align: center;
    text-transform:none !important;
}

.e-play-icon::before {
    content: '\\e728';
}

.e-view.fluent .e-play-icon::before, .e-view.fluent-dark .e-play-icon::before {
    content: '\\e72e';
}

.e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before  {
    content: '\\e710';
}

.e-view.bootstrap4 .e-play-icon::before {
    content: '\\e780';
}

.e-view.tailwind-dark .e-play-icon::before, .e-view.tailwind .e-play-icon::before {
    content: '\\e7bf';
}

.e-view.highcontrast .e-play-icon::before {
    content: '\\e710';
}

.e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {
    content: '\\e72e';
}`;
export class ExportMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private mode: DropDownListComponent;
    private mapType: DropDownListComponent;
    private textElement: TextBoxComponent;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'PDF' },
        { value: 'SVG' }
    ];
    private maptype: { [key: string]: Object }[] = [
        { value: 'Geometry' },
        { value: 'OSM' }
    ];
    private mapTypeChange(): void {
        if (this.mapType.value === 'OSM') {
            this.mapInstance.layers[0].urlTemplate = "https://tile.openstreetmap.org/level/tileX/tileY.png";
            this.mapInstance.layers[0].shapeData = null;
            if (this.mode.value === 'SVG') {
                this.mode.value = 'JPEG';
            }
            this.mode.dataSource = this.type.slice(0, 3);
        } else {
            this.mapInstance.layers[0].shapeData = worldMap;
            this.mapInstance.layers[0].urlTemplate = '';
            this.mode.dataSource = this.type;
        }
        this.mapInstance.refresh();
    }
    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <MapsComponent allowPdfExport={true} allowImageExport={true} id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            titleSettings={{
                                text: 'Location of the Wonders in the World',
                                textStyle: {
                                    size: '16px'
                                },
                            }}
                        >
                            <Inject services={[Marker, MapsTooltip, PdfExport, ImageExport]} />
                            <LayersDirective>
                                <LayerDirective shapeData={worldMap}
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
                        {/* Source Link */}
                        <div style={{ float: 'right', marginRight: '10px' }}>Source:
                <a href="http://www.emapsworld.com/world-seven-wonder-map.html" target="_blank">en.wikipedia.org</a>
                        </div>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                              <tbody>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "20%" }}>
                                        <div style={{marginLeft: '-10px'}}>Map Type</div>
                        </td>
                                    <td style={{ width: "30%" }}>
                                        <div>
                                        <DropDownListComponent width={'100%'} id="maptype" value="Geometry" change={this.mapTypeChange.bind(this)} ref={d => this.mapType = d} dataSource={this.maptype} fields={{ text: 'value', value: 'value' }} placeholder="Geometry" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "20%" }}>
                                        <div style={{marginLeft: '-10px'}}>Export Type</div>
                        </td>
                                    <td style={{ width: "30%" }}>
                                    <div>
                                        <DropDownListComponent width={'100%'} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </div>    
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                       <div style={{marginLeft: '-10px'}}>FileName</div>
                        </td>
                                    <td>
                                        <div style={{ marginTop: '0px' }}>
                                            <TextBoxComponent className="e-input" value='1' style={{ width: '100%', padding: '0px', paddingLeft: '5px' }} id="fileName" ref={d => this.textElement = d}></TextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '60px' }}>
                                    <td>
                                        <div id="btn-control" style={{ marginLeft: '50%' }}>
                                        <ButtonComponent onClick={this.onClick.bind(this)} style={{ width: '100px' }} isPrimary={true}>Export</ButtonComponent>
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
                    <p>
                        This sample illustrates the exporting feature in Maps. You can modify the map type to geometric or OSM using the Map type dropdown list in this sample. By clicking the Export button, you can export the map in PNG, JPEG, SVG or in PDF formats.
                </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                    <p>
                    In this example, you can see how to render and configure the export functionality. The rendered map
                        can be exported as either JPEG, PNG, SVG and PDF formats. Also this sample visualizes the locations of
                        the wonders in the world using markers. Export functionality is done by <code>export</code> method
                        when <code>allowImageExport</code> and <code>allowPdfExport</code> is set as true.
                        <br/><br/>
                        <b>Injecting Module</b><br/><br/>
                        Maps component features are segregated into individual feature-wise modules. To use a marker, inject
                        the Marker module using the <code> Marker </code> module into the <code> services </code>. To make use of the export support, we need
                        to inject the <code>Maps</code> module using the <code> ImageExport
                        </code> and <code> PdfExport </code> modules into the <code> services </code>.
                </p>
                <p>
                   More information on export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/maps/print/#export">documentation section</a>.
                  </p>

                </section>
            </main>
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
    
    public onClick(e: Event): void {
        let fileName: string = this.textElement.value;
        this.mapInstance.export((this.mode.value as ExportType), fileName);
    }
}
