/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, MapsTooltip, Legend
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { world_cup } from './MapData/SouthAmerica_Countries';
import { World_Map } from './MapData/WorldMap';
import { ITooltipRenderEventArgs } from "@syncfusion/ej2-react-circulargauge";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class TooltipMaps extends SampleBase<{}, {}> {
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
                                mode: 'Interactive',
                                position: 'Left',
                                orientation: 'Vertical',
                                height: '70%',
                                width: '10'
                            }}
                            titleSettings={{
                                text: 'Finalist in Cricket World Cup',
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                        >
                            <Inject services={[MapsTooltip, Legend]} />
                            <LayersDirective>
                                <LayerDirective shapeData={World_Map}
                                    shapePropertyPath='name'
                                    shapeDataPath='name'
                                    dataSource={world_cup}
                                    tooltipSettings={{
                                        visible: true,
                                        valuePath: 'name',
                                        template: '<div id="template" style="  max-width: 90px;background: rgba(53, 63, 76, 0.90); width:50px; opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding-bottom: 10px;padding-top: 10px;padding-left: 10px;padding-right: 10px;border: 1px #abb9c6">'+
                                            '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${country}</center></div>'+
                                            '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">'+
                                            '<div><span style="font-size:13px;color:#cccccc">Finalist : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${value1}</span></div>'+
                                            '<div><span style="font-size:13px;color:#cccccc">Win : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${value2}</span></div></div>',
                                    }}
                                    shapeSettings={{
                                        fill: 'lightgrey',
                                        colorMapping: [
                                            {
                                                value: '1',
                                                color: '#b3daff'
                                            },
                                            {
                                                color: '#80c1ff',
                                                value: '2'
                                            },
                                            {
                                                color: '#1a90ff',
                                                value: '3'
                                            },
                                            {
                                                color: '#005cb3',
                                                value: '7'
                                            }
                                        ],
                                        colorValuePath: 'value1'
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                <div style={{float: 'right', marginright: '10px'}}>Source: 
       <a href="https://en.wikipedia.org/wiki/List_of_Cricket_World_Cup_finals" target="_blank">en.wikipedia.org</a>
    </div>
                <div id="action-description">
                    <p>
                    This sample depicts the countries that were appeared in the finals of Cricket World Cup and their counts. By hovering the mouse over the shapes, county name, finalist count, and winning count will be displayed in the tooltip template.
                    </p>
                </div>
                <div id="description">
                <p>
                 In this example, you can see how to render the custom HTML element as tooltip. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices. Also, the interactive legend has been placed at the left of the map. 
               </p>
               <br/>
             <p style={{fontweight: 500}}>Injecting Module</p>
             <p>
               Maps component features are segregated into individual feature-wise modules. To use a tooltip, inject the Tooltip module using the Maps.Inject(Tooltip) method.
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
    public tooltip(args: ITooltipRenderEventArgs): void {
        if (args.content.toString().indexOf('undefined') > -1) {
            args.cancel = true;
        }
    }
}