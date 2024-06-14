/**
 * Dynamic Marker sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { NavigationLine, Zoom, IMouseEventArgs, MarkerType } from '@syncfusion/ej2-maps';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Marker, MarkerSettingsModel, MarkerSettings } from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
const SAMPLE_CSS = `
    .e-input[disabled] {
        border-bottom-color: inherit;
        background-image: none;
    }
    .dynamicCheckBox {
        padding-left: 0px;
        margin-left: 0px;
    }
    .e-view.fluent2 #property .dynamicCheckBox, .e-view.fluent2-dark #property .dynamicCheckBox {
        padding-left: 0px;
        margin-left: -10px !important;
    }`;
const DynamicMarker = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [isDropdownEnabled, setIsDropdownEnabled] = useState<boolean>(true);
    let mapInstance = useRef<MapsComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let connectLineInstance = useRef<CheckBoxComponent>(null);
    let buttonInstance = useRef<ButtonComponent>(null);
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
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as MapsTheme;
        // custom code end
    };
    const click = (args: IMouseEventArgs): void => {
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
            mapInstance.current.refresh();
            if (buttonInstance.current.disabled && (mapInstance.current.layers[0].markerSettings.length || mapInstance.current.layers[0].navigationLineSettings.length)) {
                setIsButtonDisabled(false);
            }
        }
    };
    const markerChange = (args: ChangeEventArgs) => {
        markerCheck = args.checked;
        setIsDropdownEnabled(args.checked);
    };
    const lineChange = (args: ChangeEventArgs) => {
        lineCheck = args.checked;
        if (args.checked) {
            connectLineInstance.current.disabled = false;
            connectLineInstance.current.checked = false;
            textElement.enabled = true;
        } else {
            connectLineCheck = args.checked;
            emptySavedLinePositions();
            connectLineInstance.current.disabled = true;
            connectLineInstance.current.checked = false;
            textElement.enabled = false;
        }
    };
    const connectLineChange = (args: ChangeEventArgs) => {
        connectLineCheck = args.checked;
        if (!args.checked) {
            emptySavedLinePositions();
        }
    };
    const buttonClick = (args: Event): void => {
        mapInstance.current.layers[0].markerSettings = [];
        mapInstance.current.layers[0].navigationLineSettings = [];
        navigationLines = [];
        emptySavedLinePositions();
        setIsButtonDisabled(true);
    };
    const addMarker = (args: any) => {
        if (args['latitude'] !== null && args['longitude'] !== null) {
            let layerIndex: number = args.target.indexOf('_LayerIndex_') !== -1 ? parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
            let marker: MarkerSettingsModel[];
            let dynamicMarker: MarkerSettingsModel[] = mapInstance.current.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new MarkerSettings(mapInstance.current, 'markerSettings', marker));
            let markerIndex: number = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = dropElement.current.value !== 'Image' ? dropElement.current.value as MarkerType : 'Image';
            dynamicMarker[markerIndex].height = dropElement.current.value !== 'Image' ? 12 : 20;
            dynamicMarker[markerIndex].width = dropElement.current.value !== 'Image' ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = dropElement.current.value !== 'Image' ? '' : 'src/maps/images/ballon.png';
        }
    };
    const addLine = (lineArgs: any, lineWidth: any, connectiveLine?: boolean) => {
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
            mapInstance.current.layers[0].navigationLineSettings = navigationLines;
            if (!connectiveLine) {
                emptySavedLinePositions();
            }
        }
    };
    return (
        <main><div className='control-panel'>
            <style>{SAMPLE_CSS}</style>
            <div className='col-lg-9 control-section'>
                <MapsComponent id="container" load={load} click={click.bind(this)} ref={mapInstance} zoomSettings={{ enable: true }}>
                    <Inject services={[Marker, NavigationLine, Zoom]} />
                    <LayersDirective>
                        <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png" />
                    </LayersDirective>
                </MapsComponent>
                <div>
                    <i>
                        <div>
                            <p id="content" style={{ fontSize: '16px', color: 'grey', textAlign: 'center' }}>Click on the maps to add marker/navigation line</p>
                        </div>
                    </i>
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <PropertyPane title='Properties'>
                    <table id="property" role='none' title="Properties" style={{ width: '100%', marginTop: '5px' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '50%' }}>
                                    <div style={{ padding: '0px', display: 'inline-block' }}>Marker</div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div className="dynamicCheckBox" style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                        <CheckBoxComponent id='marker' change={markerChange.bind(this)} checked />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '50%' }}>
                                    <div style={{ padding: '0px' }}>Line</div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div className="dynamicCheckBox" style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                        <CheckBoxComponent id='line' change={lineChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '50%' }}>
                                    <div style={{ padding: '0px' }}>Connecting line</div>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <div className="dynamicCheckBox" style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                        <CheckBoxComponent id='connect' change={connectLineChange.bind(this)} ref={connectLineInstance} disabled />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '15px' }}></tr>
                            <tr style={{ height: '35px' }}>
                                <td style={{ width: '50%' }}>Marker type</td>
                                <td style={{ width: '50%', marginLeft: '20px' }}>
                                    <div>
                                        <DropDownListComponent id='type' fields={{ text: 'value', value: 'value' }} enabled={isDropdownEnabled} ref={dropElement} dataSource={droplist} index={0} placeholder='Select marker shape' width={'100%'}></DropDownListComponent>
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
                                        <ButtonComponent id='togglebtn' cssClass='e-info' isPrimary={true} onClick={buttonClick.bind(this)} style={{ textTransform: 'none', width: '80px', marginTop: '2px' }} ref={buttonInstance} disabled={isButtonDisabled}>Clear</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample shows how custom markers and lines can be dynamically added to our maps with UI interaction. Marker or line can be chosen from the properties panel.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>Using UI interaction, the markers or line can be added as follows: You can get the currently clicked geo location by passing "PointerEvent" or "MouseEvent" argument and layer index to the "getGeoLocation" method. Then, use that geo position to place the marker or line in the appropriate position.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    The features of maps component are segregated into individual feature-wise modules. To use navigation lines and marker, you need to inject the <code>NavigationLine </code> and <code>Marker </code> module using the <code>Maps.Inject(NavigationLine, Marker)</code> method.
                </p>
            </section>
        </main>
    )
}
export default DynamicMarker;