/**
 * Dynamic Marker sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { NavigationLine, Zoom, IMouseEventArgs, MarkerType } from '@syncfusion/ej2-maps';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Marker, MarkerSettingsModel,
    MarkerSettings
} from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .e-input[disabled] {
        border-bottom-color: inherit;
        background-image: none;
    }`;
export class DynamicMarker extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private dropElement: DropDownListComponent;
    private connectLineInstance: CheckBoxComponent;
    private buttonInstance: ButtonComponent; 
    private markerCheck: boolean = true;
    private lineCheck: boolean;
    private connectLineCheck: boolean;
    private navigationLines: Object[] = [];
    private latitude: number[] = [];
    private longitude: number[] = [];
    private textElement: TextBoxComponent;

    private droplist: { [key: string]: Object }[] = [
        { value: 'Image' },
        { value: 'Circle' },
        { value: 'Diamond' },
        { value: 'Star' },
        { value: 'Triangle' }
    ];

    render() {
        return (
            <div className='control-panel'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-9 control-section'>
                    <MapsComponent id="container" load={this.load} click={this.click.bind(this)} ref={m => this.mapInstance = m}
                        zoomSettings={{
                            enable: true
                        }}>
                        <Inject services={[Marker, NavigationLine, Zoom]} />
                        <LayersDirective>
                            <LayerDirective layerType='OSM'>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    <div>
                        <p>
                            <i>
                                <div>
                                    <p id="content" style={{ fontSize: '16px', color: 'grey', textAlign: 'center' }}>Click on the maps to add marker/navigation line</p>
                                </div>
                            </i>
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', marginTop: '5px' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px', display: 'inline-block' }}>Marker</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div style={{marginLeft: '0px', marginTop: '-2px'}}>
                                            <CheckBoxComponent id='marker' change={this.markerChange.bind(this)} checked></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px' }}>Line</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div style={{marginLeft: '0px', marginTop: '-2px'}}>
                                            <CheckBoxComponent id='line' change={this.lineChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div  style={{ padding: '0px' }}>Connecting line</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div style={{marginLeft: '0px', marginTop: '-2px'}}>
                                            <CheckBoxComponent id='connect' change={this.connectLineChange.bind(this)} ref={d => this.connectLineInstance = d} disabled></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '15px' }}></tr>
                                <tr style={{ height: '35px' }}>
                                    <td style={{ width: '50%' }}>
                                        Marker type
                                </td>
                                    <td style={{ width: '50%', marginLeft: '20px' }}>
                                        <div>
                                        <DropDownListComponent id='type' fields={{ text: 'value', value: 'value' }} ref={d => this.dropElement = d}
                                            dataSource={this.droplist} index={0} placeholder='Select marker shape' width={'100%'}></DropDownListComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '15px' }}></tr>
                                <tr style={{ height: '35px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px' }}>Width</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div style= {{'width': '100%' }}>
                                        <TextBoxComponent className="e-input" value='1' style={{ width: '100%' }} id="width" ref={d => this.textElement = d} disabled></TextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height:'60px' }}>
                                    <td>
                                        <div style={{ marginLeft: '50%', width: '100%', textAlign: 'center' }}>
                                            <ButtonComponent id='togglebtn' cssClass='e-info' isPrimary={true} onClick={this.buttonClick.bind(this)}
                                                style={{ textTransform: 'none', width: '80px', marginTop: '2px' }} ref={d => this.buttonInstance = d}>Clear</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows how custom markers and lines can be dynamically added to our maps with UI interaction. Marker or line can be chosen from the properties panel. </p>
                </div>
                <div id="description">
                    <p>
                        Using UI interaction, the markers or line can be added as follows: You can get the currently clicked geo location by passing "PointerEvent" or "MouseEvent" argument and layer index to the "getGeoLocation" method. Then, use that geo position to place the marker or line in the appropriate position.
            </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        The features of maps component are segregated into individual feature-wise modules. To use navigation lines and marker, you need to inject the <code>NavigationLine </code> and <code>Marker </code> module using the <code>Maps.Inject(NavigationLine, Marker)</code> method.
            </p>
                </div>
            </div >
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
    
    public click(args: IMouseEventArgs): void {
        if (this.markerCheck) {
            this.addMarker(args);
        }
        if (this.lineCheck && !this.connectLineCheck) {
            this.addLine(args, this.textElement.value);
        }
        if (this.connectLineCheck) {
            this.addLine(args, this.textElement.value, true);
        }
        if (this.markerCheck || this.lineCheck || this.connectLineCheck) {
            this.mapInstance.refresh();
            if (this.buttonInstance.disabled && (this.mapInstance.layers[0].markerSettings.length ||
                this.mapInstance.layers[0].navigationLineSettings.length)) {
                this.buttonInstance.disabled = false;
            }
        }
    };
    private markerChange(args: ChangeEventArgs) {
        this.markerCheck = args.checked;
        this.dropElement.enabled = args.checked;
    };
    private lineChange(args: ChangeEventArgs) {
        this.lineCheck = args.checked;
        if(args.checked) {
            this.connectLineInstance.disabled = false;
            this.connectLineInstance.checked = false;
            this.textElement.enabled= true;
        } else {
            this.connectLineCheck = args.checked;
            this.emptySavedLinePositions();
            this.connectLineInstance.disabled = true;
            this.connectLineInstance.checked = false;
            this.textElement.enabled = false;
        }
    };
    private connectLineChange(args: ChangeEventArgs) {
        this.connectLineCheck = args.checked;
        if (!args.checked) {
            this.emptySavedLinePositions();
        }
    };

    public buttonClick(args: Event): void {
        this.mapInstance.layers[0].markerSettings = [];
        this.mapInstance.layers[0].navigationLineSettings = [];
        this.navigationLines = [];
        this.emptySavedLinePositions();
        this.mapInstance.refresh();
        this.buttonInstance.disabled = true;
    };

    public emptySavedLinePositions: any = () => {
        this.latitude = [];
        this.longitude = [];
    };

    public addMarker: any = (args: any) => {
        if (args['latitude'] !== null && args['longitude'] !== null){
            let layerIndex: number = (args.target.indexOf('_LayerIndex_') !== -1) ?
            parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
            let marker: MarkerSettingsModel[];
            let dynamicMarker: MarkerSettingsModel[] = this.mapInstance.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new MarkerSettings(this.mapInstance, 'markerSettings', marker));
            let markerIndex: number = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = (this.dropElement.value !== 'Image') ? this.dropElement.value as MarkerType : 'Image';
            dynamicMarker[markerIndex].height = (this.dropElement.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].width = (this.dropElement.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = (this.dropElement.value !== 'Image') ? '' : 'src/maps/images/ballon.png';
        }     
    };
    public addLine: any = (lineArgs: any, lineWidth: number, connectiveLine?: boolean) => {
        if (lineArgs.latitude != null && lineArgs.longitude != null) {
            this.latitude.push(lineArgs.latitude);
            this.longitude.push(lineArgs.longitude);
        }
        if (this.latitude.length >= 2) {
            this.navigationLines.push({
                'visible': true,
                'latitude': [this.latitude[(this.latitude.length - 2)], this.latitude[(this.latitude.length - 1)]],
                'longitude': [this.longitude[(this.longitude.length - 2)], this.longitude[(this.longitude.length - 1)]],
                'angle': 0,
                'color': 'blue',
                'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
            });
            this.mapInstance.layers[0].navigationLineSettings = this.navigationLines;
            if (!connectiveLine) {
                this.emptySavedLinePositions();
            }
        }
    };
}

