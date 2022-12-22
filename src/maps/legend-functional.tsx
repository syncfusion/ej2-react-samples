/**
 * Legend sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    Legend, MapsTooltip, ITooltipRenderEventArgs, LegendMode, LegendPosition
} from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
import * as data from './map-data/legend-datasource.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
function LegendMaps() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let mapInstance: MapsComponent;
    let legendElement: DropDownListComponent;
    let legendPositionElement: DropDownListComponent;

    let droplist: { [key: string]: Object }[] =[
        { text: 'Default', value: 'Default' },
        { text: 'Interactive', value: 'Interactive' },
    ];

    let positionList: { [key: string]: Object }[] =[
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' },
        { text: 'Left', value: 'Left' },
        { text: 'Right', value: 'Right' },
    ];

    function legendChange() {
        mapInstance.legendSettings.mode = legendElement.value as LegendMode;
        if (legendElement.value === 'Interactive') {
            if (mapInstance.legendSettings.orientation === 'Horizontal' || mapInstance.legendSettings.orientation === 'None') {
                mapInstance.legendSettings.height = '10';
                mapInstance.legendSettings.width = '';
            } else {
                mapInstance.legendSettings.height = '70%';
                mapInstance.legendSettings.width = '10';
            }
        } else {
            mapInstance.legendSettings.height = '';
            mapInstance.legendSettings.width = '';
        }
        mapInstance.refresh();
    }

    function legendPositionChange() {
        mapInstance.legendSettings.position = legendPositionElement.value as LegendPosition;
        if (legendPositionElement.value === 'Left' || legendPositionElement.value === 'Right') {
            mapInstance.legendSettings.orientation = 'Vertical';
            if (mapInstance.legendSettings.mode === 'Interactive') {
                mapInstance.legendSettings.height = '70%';
                mapInstance.legendSettings.width = '10';
            } else {
                mapInstance.legendSettings.height = '';
                mapInstance.legendSettings.width = '';
            }
        } else {
            mapInstance.legendSettings.orientation = 'Horizontal';
            if (mapInstance.legendSettings.mode === 'Interactive') {
                mapInstance.legendSettings.height = '10';
                mapInstance.legendSettings.width = '';
            }
        }
        mapInstance.refresh();
    }

    function dataChange(args: ChangeEventArgs) {
        if (args.checked) {
            mapInstance.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
            mapInstance.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
        } else {
            mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
        }
        mapInstance.refresh();
    }

    function toggleLegendChange(args: ChangeEventArgs) {
        mapInstance.legendSettings.toggleLegendSettings.enable = args.checked;
        mapInstance.refresh();
    }

    function onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };
    //tslint:disable

    function tooltip(args: ITooltipRenderEventArgs): void {
        if (!args.options['data']) {
            args.cancel = true;
        }
    }


    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='col-lg-8 control-section'>
                <MapsComponent id="maps" tooltipRender={tooltip} loaded={onMapsLoad.bind(this)} load={load} ref={m => mapInstance = m}
                    zoomSettings={{
                        enable: false
                    }}
                    legendSettings={{
                        visible: true,
                        position: 'Top'
                    }}
                    titleSettings={{
                        text: 'Population density (per square kilometer) - 2015',
                        textStyle: {
                            size: '16px'
                        }
                    }}>
                    <Inject services={[Legend, MapsTooltip]} />
                    <LayersDirective>
                        <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')}
                            shapePropertyPath='name'
                            shapeDataPath='name'
                            dataSource={datasource.legend}
                            tooltipSettings={{
                                visible: true,
                                valuePath: 'name',
                                format: '${name} : ${density}'
                            }}
                            shapeSettings={{
                                colorValuePath: 'density',
                                colorMapping: [
                                    {
                                        from: 0.00001, to: 100, color: 'rgb(153,174,214)', label: '<100'
                                    },
                                    {
                                        from: 100, to: 200, color: 'rgb(115,143,199)', label: '100 - 200'
                                    },
                                    {
                                        from: 200, to: 300, color: 'rgb(77,112,184)', label: '200 - 300'
                                    },
                                    {
                                        from: 300, to: 500, color: 'rgb(38,82,168)', label: '300 - 500'
                                    },
                                    {
                                        from: 500, to: 19000, color: 'rgb(0,51,153)', label: '>500'
                                    },
                                    {
                                        color: null, label: null
                                    }
                                ]
                            }}
                        >
                        </LayerDirective>
                    </LayersDirective>
                </MapsComponent>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>Source:
                    <a href="https://simple.wikipedia.org/wiki/List_of_countries_by_population_density" target="_blank">simple.wikipedia.org</a>
                </div>
            </div>
            {/* Property Panel */}
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                        <tr>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Legend mode</div>
                            </td>
                            <td>
                                <div style={{ marginLeft: '0px' }}>
                                    <DropDownListComponent id="legendmode" width="100%" index={0} change={legendChange.bind(this)} ref={d => legendElement = d} dataSource={droplist} fields={{ text: 'text', value: 'value' }} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Legend position </div>
                            </td>
                            <td>
                                <div style={{ marginLeft: '0px' }}>
                                    <DropDownListComponent id="legendPosition" width="100%" index={0} change={legendPositionChange.bind(this)} ref={d => legendPositionElement = d} dataSource={positionList} fields={{ text: 'text', value: 'value' }} />
                                </div>
                            </td>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td>
                                <div className="property-text" style={{ padding: "0px" }}>Show legend for remaining data source items</div>
                            </td>
                            <td>
                                <div className="col" style={{ marginLeft: '0px', paddingLeft: '0px', marginTop: '-19px' }}>
                                    <CheckBoxComponent id="datasource" change={dataChange.bind(this)} style={{ paddingLeft: '0px' }} />
                                </div>
                            </td>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td>
                                <div className="property-text" style={{ padding: "0px" }}>Show population density when the legend item is toggled</div>
                            </td>
                            <td>
                                <div className="col" style={{ marginLeft: '0px', paddingLeft: '0px', marginTop: '-19px' }}>
                                    <CheckBoxComponent id="toggleLegend" change={toggleLegendChange.bind(this)} style={{ paddingLeft: '0px' }} />
                                </div>
                            </td>
                        </tr>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a legend in the maps. A legend item denotes the value of a shape. Any number of legend items can be added to the legend. You can bind the desired colors to the shapes, if its values are within the specified range using the ColorMapping property. You can also show or hide color mapping related to population density when toggling the legend item
                </p>
                <p>
                    Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
                </p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method.
                </p>
            </div>
        </div>
    )
}

export default LegendMaps;