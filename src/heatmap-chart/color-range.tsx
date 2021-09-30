import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './color-range-sample-data.json';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { RadioButtonComponent, ChangeEventArgs, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}
#source{
    float: right; margin-right: 10p
}`;
// custom code end
/**
 * Heatmap Palette mode sample
 */
export class ColorRange extends SampleBase<{}, {}> {
    private heatmap: HeatMapComponent;
    private fixed(args: ChangeEventArgs): void {
        this.heatmap.paletteSettings.type = 'Fixed';
        this.heatmap.dataBind();
    }
    private gradient(args: ChangeEventArgs): void {
        this.heatmap.paletteSettings.type = 'Gradient';
        this.heatmap.dataBind();
    }
    render() {
        return (
            <div>
                <div className='col-md-9 control-section'>
                {/* custom code start */}
                    <style>
                        {SAMPLE_CSS}
                    </style>
                {/* custom code end */}    
                        <HeatMapComponent id='heatmap-container' ref={t => this.heatmap = t}
                            titleSettings={{
                                text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
                                textStyle: {
                                    fontWeight: '500',
                                    fontStyle: 'Normal',
                                    fontFamily: 'Segoe UI',
                                    size: '15px',
                                }
                            }}
                            xAxis={{
                                labels: ['2005', '2006', '2007', '2008', '2009', '2010',
                                    '2011', '2012', '2013', '2014', '2015'],
                                labelIntersectAction: 'None',
                                labelRotation: 45,
                            }}
                            yAxis={{
                                labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
                                    'Justice', 'NASA', 'Transportation']
                            }}
                            dataSource={(data as any).colorRangeSample}
                            paletteSettings={{
                                palette: [
                                    { startValue: 5, endValue: 15, minColor: '#FFFFDA', maxColor: '#EDF8B6' },
                                    { startValue: 15, endValue: 20, minColor: '#CAE8B4', maxColor: '#78D1BD' },
                                    { startValue: 20, endValue: 31.7, minColor: '#36BCC6', maxColor: '#208FC6' },
                                ],
                                type: 'Gradient'
                            }}
                            cellSettings={{
                                border: { width: 0 },
                                showLabel: false,
                            }}
                            load={this.load.bind(this)}>
                        	<Inject services={[Legend, Tooltip]} />
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
                                            <RadioButtonComponent id='fixed' label='Fixed' name='paletteType' value="Fixed"
                                                change={this.fixed.bind(this)}></RadioButtonComponent>
                                        </div>
                                        <div className='row'>
                                            <RadioButtonComponent id='gradient' checked={true} label='Gradient' name='paletteType' value="Gradient"
                                                change={this.gradient.bind(this)}></RadioButtonComponent>
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
                    This example explains how to provide a specific color for specific range in heatmap. 
                    The <code> startValue </code> and <code> endValue </code> properties are used to define the range start and end values. 
                    The <code> minColor </code> and <code> maxColor </code> properties represent the colors of given range.
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
            </div >
        );
    }

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
    };
}