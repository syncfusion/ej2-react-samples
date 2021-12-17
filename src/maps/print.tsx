/**
 * Print sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    ProjectionType, MapsTooltip, LayersDirective, MapsTheme, ILoadedEventArgs, LayerDirective, MapsComponent, Inject, Legend, SmartLabelMode, IntersectAction, ITooltipRenderEventArgs, Print
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as data from './map-data/print-datasource.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
.e-play-icon::before {
    content: "\\e34b";
}

.e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before
{
    content: '\\e7df';
}

.e-view.bootstrap .e-play-icon::before {
    content: '\\ebd2';
}

.e-view.bootstrap4 .e-play-icon::before {
    content: '\\e743';
}

.e-view.tailwind .e-play-icon::before, .e-view.tailwind-dark .e-play-icon::before {
    content: '\\e76c';
}

.e-view.highcontrast .e-play-icon::before {
    content: '\\ebf9';
}

.e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {
    content: '\\e75d';
}`

export class PrintMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                    <MapsComponent id="maps" tooltipRender={this.tooltipRender.bind(this)} loaded={this.onMapsLoad.bind(this)} load={this.load} allowPrint={true} ref={m => this.mapInstance = m}
                            useGroupingSeparator={true}
                            format={"n"}
                            legendSettings={{
                                visible: true,
                                mode: 'Interactive',
                                position: 'Bottom',
                                height: '10',
                                width: '350',
                                labelDisplayMode: 'Trim',
                                alignment: 'Center',
                                textStyle: {
                                    color: '#757575'
                                },
                            }}

                            titleSettings={{
                                text: 'State-wise US population - 2010',
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                        >
                            <Inject services={[Legend, MapsTooltip, Print]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/usa.json')}
                                    shapePropertyPath='name'
                                    shapeDataPath='name'
                                    dataSource={datasource.print}
                                    tooltipSettings={{
                                        visible: true,
                                        valuePath: 'population',
                                        format: 'State: ${name} <br> Population: ${population}'
                                    }}
                                    shapeSettings={{
                                        /*border: {
                                            width: 0.5,
                                            color: 'gray'
                                        },*/
                                        colorValuePath: 'population',
                                        colorMapping: [
                                            {
                                                from: 580000, to: 2800000, color: '#dae8f1', label: '<3M'
                                            },
                                            {
                                                from: 2800000, to: 5280000, color: '#b0cde1', label: '3-6M'
                                            },
                                            {
                                                from: 5280000, to: 8260000, color: '#90bad8', label: '6-9M'
                                            },
                                            {
                                                from: 8260000, to: 11660000, color: '#6ea7d2', label: '9-12M'
                                            },
                                            {
                                                from: 11660000, to: 19600000, color: '#4c96cb', label: '12-20M'
                                            },
                                            {
                                                from: 19600000, to: 26500000, color: '#3182bd', label: '20-25M'
                                            },
                                            {
                                                from: 26500000, to: 38400000, color: '#004374', label: '>25M'
                                            }
                                        ]
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                        {/* Source Link */}
                        <div style={{ float: 'right', marginright: '10px', marginBottom: '0px' }}>Source:
                <a href="https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population" target="_blank">en.wikipedia.org</a>
                        </div>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div id="btn-control" style={{ textAlign: 'center' }}>
                                            <ButtonComponent onClick={this.onClick.bind(this)} style={{width: '80px'}} iconCss='e-icons e-play-icon' cssClass='e-flat' isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>

                <div id="action-description">
                    <p>
                        This sample illustrates the print feature in Maps. By clicking the Print button, you can print the maps directly from the browser.
             </p>
                </div>
                <div id="description">
                    <p>
						In this example, you can see how to render and configure the print functionality. The rendered maps can
                        be printed directly from the browser by calling the <code>print</code> method when
                        <code>allowPrint</code> is set as true. Also this sample visualizes the State-wise US population
                        in the year 2010.
                        <br /> <br/>
                        <b>Injecting Module</b>
                        <br /> <br/>
                        Maps component features are segregated into individual feature-wise modules. To use a legend, inject
                        the Legend module using the <code> Legend </code> module into the <code>services</code>.To make use of the print support, we need to
                        inject the <code>Maps</code> module using the <code> Print </code> module into the <code>services</code>.
                </p>
                    <p>
                        More information on print can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/maps/print/#print">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
    };
    // custom code end
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.options.toString().indexOf('population') > -1) {
            args.cancel = true;
        }
    };
    public onClick(e: Event): void {
        this.mapInstance.print();
    }
}
