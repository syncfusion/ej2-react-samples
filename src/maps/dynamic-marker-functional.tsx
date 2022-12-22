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
import { updateSampleSection } from '../common/sample-base';
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
function DynamicMarker() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let mapInstance: MapsComponent;
    let dropElement: DropDownListComponent;
    let connectLineInstance: CheckBoxComponent;
    let buttonInstance: ButtonComponent;
    let markerCheck: boolean = true;
    let lineCheck: boolean;
    let connectLineCheck: boolean;
    let navigationLines: Object[] = [];
    let latitude: number[] = [];
    let longitude: number[] = [];
    let textElement: TextBoxComponent;

    let droplist: { [key: string]: Object }[] = [
        { value: 'Image' },
        { value: 'Circle' },
        { value: 'Diamond' },
        { value: 'Star' },
        { value: 'Triangle' }
    ];

    let emptySavedLinePositions: any = () => {
        latitude = [];
        longitude = [];
    };

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };

    function click(args: IMouseEventArgs): void {
        if (markerCheck) {
            addMarker(args);
        }
        if (lineCheck && !connectLineCheck) {
            addLine(args, textElement.value);
        }
        if (connectLineCheck) {
            addLine(args, textElement.value, true);
        }
        if (markerCheck || lineCheck || connectLineCheck) {
            mapInstance.refresh();
            if (buttonInstance.disabled && (mapInstance.layers[0].markerSettings.length ||
                mapInstance.layers[0].navigationLineSettings.length)) {
                buttonInstance.disabled = false;
            }
        }
    };

    function markerChange(args: ChangeEventArgs) {
        markerCheck = args.checked;
        dropElement.enabled = args.checked;
    };

    function lineChange(args: ChangeEventArgs) {
        lineCheck = args.checked;
        if (args.checked) {
            connectLineInstance.disabled = false;
            connectLineInstance.checked = false;
            textElement.enabled = true;
        } else {
            connectLineCheck = args.checked;
            emptySavedLinePositions();
            connectLineInstance.disabled = true;
            connectLineInstance.checked = false;
            textElement.enabled = false;
        }
    };

    function connectLineChange(args: ChangeEventArgs) {
        connectLineCheck = args.checked;
        if (!args.checked) {
            emptySavedLinePositions();
        }
    };

    function buttonClick(args: Event): void {
        mapInstance.layers[0].markerSettings = [];
        mapInstance.layers[0].navigationLineSettings = [];
        navigationLines = [];
        emptySavedLinePositions();
        mapInstance.refresh();
        buttonInstance.disabled = true;
    };

    function addMarker(args: any) {
        if (args['latitude'] !== null && args['longitude'] !== null) {
            let layerIndex: number = (args.target.indexOf('_LayerIndex_') !== -1) ?
                parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
            let marker: MarkerSettingsModel[];
            let dynamicMarker: MarkerSettingsModel[] = mapInstance.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new MarkerSettings(mapInstance, 'markerSettings', marker));
            let markerIndex: number = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = (dropElement.value !== 'Image') ? dropElement.value as MarkerType : 'Image';
            dynamicMarker[markerIndex].height = (dropElement.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].width = (dropElement.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = (dropElement.value !== 'Image') ? '' : 'src/maps/images/ballon.png';
        }
    };

    function addLine(lineArgs: any, lineWidth: any, connectiveLine?: boolean) {
        if (lineArgs.latitude != null && lineArgs.longitude != null) {
            latitude.push(lineArgs.latitude);
            longitude.push(lineArgs.longitude);
        }
        if (latitude.length >= 2) {
            navigationLines.push({
                'visible': true,
                'latitude': [latitude[(latitude.length - 2)], latitude[(latitude.length - 1)]],
                'longitude': [longitude[(longitude.length - 2)], longitude[(longitude.length - 1)]],
                'angle': 0,
                'color': 'blue',
                'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
            });
            mapInstance.layers[0].navigationLineSettings = navigationLines;
            if (!connectiveLine) {
                emptySavedLinePositions();
            }
        }
    };
    return (
        <div className='control-panel'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='col-lg-9 control-section'>
                <MapsComponent id="container" load={load} click={click.bind(this)} ref={m => mapInstance = m}
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
                                    <div style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                        <CheckBoxComponent id='marker' change={markerChange.bind(this)} checked></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '50%' }}>
                                    <div style={{ padding: '0px' }}>Line</div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                        <CheckBoxComponent id='line' change={lineChange.bind(this)}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '50%' }}>
                                    <div style={{ padding: '0px' }}>Connecting line</div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                        <CheckBoxComponent id='connect' change={connectLineChange.bind(this)} ref={d => connectLineInstance = d} disabled></CheckBoxComponent>
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
                                        <DropDownListComponent id='type' fields={{ text: 'value', value: 'value' }} ref={d => dropElement = d}
                                            dataSource={droplist} index={0} placeholder='Select marker shape' width={'100%'}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '15px' }}></tr>
                            <tr style={{ height: '35px' }}>
                                <td style={{ width: '50%' }}>
                                    <div style={{ padding: '0px' }}>Width</div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div style={{ 'width': '100%' }}>
                                        <TextBoxComponent className="e-input" value='1' style={{ width: '100%' }} id="width" ref={d => textElement = d} disabled></TextBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '60px' }}>
                                <td>
                                    <div style={{ marginLeft: '50%', width: '100%', textAlign: 'center' }}>
                                        <ButtonComponent id='togglebtn' cssClass='e-info' isPrimary={true} onClick={buttonClick.bind(this)}
                                            style={{ textTransform: 'none', width: '80px', marginTop: '2px' }} ref={d => buttonInstance = d}>Clear</ButtonComponent>
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

export default DynamicMarker;

