/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Zoom, Legend, DataLabel,
    ProjectionType, MapsTooltip, SmartLabelMode, IntersectAction
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class LabelMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private dropElement1: DropDownListComponent;
    private dropElement2: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { text: 'Trim', value: 'Trim' },
        { text: 'None', value: 'None' },
        { text: 'Hide', value: 'Hide' }
    ];
    private showlabel(): void {
        let element: HTMLInputElement = (document.getElementById('select')) as HTMLInputElement;
        this.mapInstance.layers[0].dataLabelSettings.visible = element.checked;
        this.mapInstance.refresh();
    }
    private intersectaction(): void {
        this.mapInstance.layers[0].dataLabelSettings.intersectionAction = this.dropElement1.value as IntersectAction;
        this.mapInstance.refresh();
    }
    private smartlabel(): void {
        this.mapInstance.layers[0].dataLabelSettings.smartLabelMode = this.dropElement2.value as SmartLabelMode;
        this.mapInstance.refresh();
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            zoomSettings={{
                                enable: false
                            }}
                        >
                            <Inject services={[DataLabel,MapsTooltip]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/usa.json')}
                                    dataLabelSettings={{
                                        visible: true,
                                        labelPath: 'name',
                                        smartLabelMode: 'Trim',
                                        intersectionAction: 'None'
                                    }}
                                    shapeSettings={{
                                        autofill: true
                                    }}
                                    tooltipSettings={{
                                        visible: true,
                                        valuePath: 'name'
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '110%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Show Labels</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" onClick={this.showlabel.bind(this)} defaultChecked={true} id="select" style={{ marginTop: '15px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Smart label mode</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" index={0} change={this.smartlabel.bind(this)} ref={d => this.dropElement2 = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} placeholder='Select smartlabel mode' />
                                        </div>
                                    </td>
                                </tr><tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Intersect action</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" index={1} change={this.intersectaction.bind(this)} ref={d => this.dropElement1 = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} placeholder='Select intersect action' />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                  This sample visualizes the names of all the states in USA in data labels. Options have been provided to change the intersect action and smart labels mode of the data labels.
                </p>
                </div>
                <div id="description">
                <p>
                   In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker templates are used to display the names for shapes and mark specific locations. Legend is enabled in this example to represent each continent.
                </p>
                <p>
            Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
                </p>
            <br/>
                <p style={{fontweight: 500}}>Injecting Module</p>
                <p>
                   Maps component features are segregated into individual feature-wise modules. To use a marker, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method, and use a legend by injecting the <code>Legend</code> module.
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