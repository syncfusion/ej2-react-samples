/**
 * Print sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Legend, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as data from './map-data/print-datasource.json';
let datasource = data;
const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
#btn-control {
    width: 100%;
    text-align: center;
    text-transform:none !important;
}
.e-play-icon::before {
    content: "\\e813";
}`;
export class PrintMaps extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <MapsComponent id="maps" tooltipRender={this.tooltipRender.bind(this)} loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} useGroupingSeparator={true} format={"n"} legendSettings={{
            visible: true,
            mode: 'Interactive',
            position: 'Bottom',
            height: '10',
            width: '350',
            labelDisplayMode: 'Trim',
            alignment: 'Center'
        }} titleSettings={{
            text: 'State-wise US population - 2010',
            textStyle: {
                size: '16px'
            }
        }}>
                            <Inject services={[Legend, MapsTooltip]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/usa.json')} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource.print} tooltipSettings={{
            visible: true,
            valuePath: 'population',
            format: 'State: ${name} <br> Population: ${population}'
        }} shapeSettings={{
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
        }}>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                        
                        <div style={{ float: 'right', marginright: '10px', marginBottom: '0px' }}>Source:
                <a href="https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population" target="_blank">en.wikipedia.org</a>
                        </div>
                    </div>
                    
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div id="btn-control">
                                            <ButtonComponent onClick={this.onClick.bind(this)} style={{ width: '80px' }} cssClass='e-info' isPrimary={true}>Print</ButtonComponent>
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
                        In this example, you can see how to render and configure the print. The rendered maps can be printed directly from the browser by calling the public method <code>print</code>. Also this sample visualizes the State-wise US population in the year 2010.
             </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                 </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a legend, inject the <code>Legend</code> module using the <code>Maps.Inject(Legend)</code> method.
                 </p>
                </div>
            </div>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    }
    ;
    tooltipRender(args) {
        if (args.options.toString().indexOf('population') > -1) {
            args.cancel = true;
        }
    }
    ;
    onClick(e) {
        this.mapInstance.print();
    }
}
