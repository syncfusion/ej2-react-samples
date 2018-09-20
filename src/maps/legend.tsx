/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, Legend, MapsTooltip, ITooltipRenderEventArgs
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class LegendMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" tooltipRender={this.tooltip} loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            zoomSettings={{
                                enable: false
                            }}
                            legendSettings={{
                                visible: true,
                                position: 'Top'
                            }}
                            titleSettings={{
                                text: 'Population density (per square kilometers) - 2015',
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                        >
                            <Inject services={[Legend, MapsTooltip]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax(location.origin + location.pathname + 'src/maps/map-data/world-map.json')}
                                    shapePropertyPath='name'
                                    shapeDataPath='name'
                                    dataSource={new MapAjax(location.origin + location.pathname + 'src/maps/map-data/legend-datasource.json')}
                                    tooltipSettings={{
                                        visible: true,
                                        valuePath: 'name',
                                        format: '${name} : ${density} per square kms'
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
                                            }
                                        ]
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                <div style={{float: 'right', marginright: '10px' }}>Source: 
                <a href="https://simple.wikipedia.org/wiki/List_of_countries_by_population_density" target="_blank">simple.wikipedia.org</a>
    </div>
                <div id="action-description">
                    <p>
                    This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.
                    </p>
                </div>
                <div id="description">
                    <p>
                       In this example, you can see how to render a legend in the maps. A legend item denotes the value of a shape. Any number of legend items can be added to the legend. You can bind the desired colors to the shapes, if its values are within the specified range using the ColorMapping property.
                    </p>
	                    <p>
                            Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
	                    </p>
                        <br/>
                             <p style={{fontweight: 500}}>Injecting Module</p>
                                <p>
                                     Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method.
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
    //tslint:disable
    public tooltip(args: ITooltipRenderEventArgs): void {
        if (!args.options['data']) {
            args.cancel = true;
        }
    }
}