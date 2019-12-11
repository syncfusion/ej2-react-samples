import * as React from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './data.json';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { RadioButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
/**
 * Heatmap Palette mode sample
 */
export class Palette extends SampleBase {
    fixed(args) {
        this.checkboxObj.disabled = false;
        this.heatmap.paletteSettings.type = 'Fixed';
        this.heatmap.dataBind();
    }
    gradient(args) {
        this.checkboxObj.disabled = true;
        this.heatmap.paletteSettings.type = 'Gradient';
        this.heatmap.dataBind();
    }
    valueChange(args) {
        this.heatmap.legendSettings.enableSmartLegend = this.checkboxObj.checked;
        this.heatmap.dataBind();
    }
    render() {
        return (<div>
                <div className='col-md-9 control-section'>

                        <HeatMapComponent id='heatmap-container' ref={t => this.heatmap = t} titleSettings={{
            text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        }} xAxis={{
            labels: ['2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015'],
            labelRotation: 45,
            labelIntersectAction: 'None',
        }} yAxis={{
            labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
                'Justice', 'NASA', 'Transportation']
        }} dataSource={data.palatteSampleData} paletteSettings={{
            palette: [{ value: 4.3, color: '#FFFFDA' },
                { value: 7, color: '#EDF8B6' },
                { value: 9, color: '#CAE8B4' },
                { value: 15, color: '#78D1BD' },
                { value: 18, color: '#36BCC6' },
                { value: 25, color: '#208FC6' },
                { value: 30, color: '#253494' },
                { value: 32, color: '#081D58' }
            ],
            type: 'Fixed'
        }} cellSettings={{
            border: { width: 0 },
            showLabel: false,
        }} load={this.load.bind(this)} legendSettings={{
            position: 'Bottom',
            width: '400px',
            enableSmartLegend: true
        }}>
                        	<Inject services={[Legend, Tooltip]}/>
                    	</HeatMapComponent>
                </div>
                <div className="col-md-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Palette Type:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>

                                        <div className='row'>
                                            <RadioButtonComponent id='fixed' checked={true} label='Fixed' name='paletteType' value="Fixed" change={this.fixed.bind(this)}></RadioButtonComponent>
                                        </div>
                                        <div className='row'>
                                            <RadioButtonComponent id='gradient' label='Gradient' name='paletteType' value="Gradient" change={this.gradient.bind(this)}></RadioButtonComponent>
                                        </div>

                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Enable Smart Legend:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div className='row'>
                                            <CheckBoxComponent id='smartLegend' checked={true} disabled={false} name='enableSmartLegend' ref={(scope) => { this.checkboxObj = scope; }} change={this.valueChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the energy consumption in trillion British thermal units (btu) by
                        the various public sectors in US government over the years. The data label is disabled in this sample,
                        the tooltip displays the data point values.  In property panel, the options are available to change
                        palette type in Heatmap by means of radio button.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to change the palette type between <code>Fixed </code> and <code>Gradient
                        </code> types in Heatmap. The palette type can be defined using the <code>type </code> property in <code>
                        paletteSettings </code>. Legend is enabled in this example, changing the palette mode the legend type will be
                        automatically switched between gradient legend and list type legend.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point
                        in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the
                        <code>Tooltip </code> module using the <code>Heatmap.Inject(Tooltip) </code> method, and use a legend by injecting
                        the <code>Legend </code> module using the <code>Heatmap.Inject(Legend) </code> method.
                    </p>
                </div>
            </div>);
    }
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    ;
}
