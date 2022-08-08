/**
 * HeatMap sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, MapsTooltip, Legend, Marker, MarkersDirective, MarkerDirective
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/heatmap-datasource.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
let colormapping: object[] = [{
    from: 60000, to: 400000, color: '#9fdfdf', label: '<0.4M'
},
{
    from: 400000, to: 10000000, color: '#79d2d2', label: '0.4-10M'
},
{
    from: 10000000, to: 20000000, color: '#53C6C6', label: '10-20M'
},
{
    from: 20000000, to: 70000000, color: '#39acac', label: '20-70M'
},
{
    from: 70000000, to: 100000000, color: '#339999', label: '70-100M'
},
{
    from: 100000000, to: 200000000, color: '#2d8686', label: '>100M'
}
];
export class HeatMaps extends SampleBase<{}, {}> {
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
                            useGroupingSeparator = {true}
                            format = {"n"}
                            zoomSettings={{
                                enable: false
                            }}
                            legendSettings={{
                                visible: true,
                                mode: 'Interactive',
                                position: 'Bottom',
                                height: '10',
                                width: '350',
                                alignment: 'Center',
                                labelDisplayMode: 'Trim',
                                textStyle: {
                                    color: '#757575'
                                }
                            }}
                            titleSettings={{
                                text: "State wise India's population - 2011",
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                        >
                            <Inject services={[Marker, MapsTooltip, Legend]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/india.json')}
                                    shapePropertyPath='NAME_1'
                                    shapeDataPath='Name'
                                    dataSource={datasource.heatmap}
                                    tooltipSettings={{
                                        visible: true,
                                        valuePath:'population',
                                        format: 'State: ${Name} <br> Population: ${population}'
                                    }}
                                    shapeSettings={{
                                        /*border: {
                                            width: 0.2,
                                            color: 'white'
                                        },*/
                                        colorValuePath: 'population',
                                        colorMapping:colormapping
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                {/* Source Link */}
                <div style={{float: 'right', marginRight: '10px'}}>Source: 
       <a href="https://en.wikipedia.org/wiki/List_of_states_and_union_territories_of_India_by_population" target="_blank">en.wikipedia.org</a>
    </div>
                <div id="action-description">
                    <p>
                    This sample visualizes the state wise population of India in the year 2011. Color for each state will be applied based on its value.
                    </p>
                </div>
                <div id="description">
                <p>
                     In this example, you can see how to apply the desired colors for the shapes, if its value is within the specified range using the ColorMapping property. Also, the interactive legend has been placed at the bottom of the map.
                </p>
	                <p>
	                    Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
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
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };
    
}