/**
 * Datalabel sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeMapComponent, Inject, TreeMapLegend, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/country-population.json';
let datasource = data;
export class Datalabel extends SampleBase {
    constructor() {
        super(...arguments);
        // Code for Property Panel
        this.droplist = [
            { text: 'Trim', value: 'Trim' },
            { text: 'Hide', value: 'Hide' },
            { text: 'Wrap', value: 'Wrap' },
            { text: 'WrapByWord', value: 'WrapByWord' },
        ];
    }
    labelChange() {
        this.treemapInstance.leafItemSettings.interSectAction = this.labelElement.value;
        this.treemapInstance.refresh();
    }
    render() {
        return (<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<div className='col-md-9'>
						<TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m} titleSettings={{
            text: 'Countries ordered based on Population - 2017',
            textStyle: { size: '15px' }
        }} dataSource={datasource.population} tooltipSettings={{
            visible: true,
            format: '${Country} : ${Population}'
        }} legendSettings={{
            visible: true,
            mode: 'Interactive',
            width: '300px',
            height: '10',
            position: 'Top'
        }} format={"n"} useGroupingSeparator={true} rangeColorValuePath='Population' weightValuePath='Population' leafItemSettings={{
            showLabels: true,
            labelPath: 'Country',
            fill: 'red',
            colorMapping: [
                { to: 10000000000, from: 100000000, label: '200M - 1.3M', color: '#4B134F' },
                { to: 100000000, from: 20000000, label: '20M - 200M', color: '#8C304D' },
                { to: 20000000, from: 100000, label: '0.1M - 20M', color: '#C84B4B' }
            ]
        }}>
							<Inject services={[TreeMapLegend, TreeMapTooltip]}/>
						</TreeMapComponent>
						
						<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href="https://www.populationpyramid.net/population-size-per-country/2017" target="_blank">www.populationpyramid.net</a>
						</div>
					</div>
					
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Label Intersect Action</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="labels" width="120px" index={0} change={this.labelChange.bind(this)} ref={d => this.labelElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
				</div>
				<div id="action-description">
					<p>
						This sample illustrates the population level of various countries in 2017. The leaf items’ labels intersect action can be changed by using the <code>Label Intersect Action</code> in properties panel.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can see the various label intersect actions available in TreeMap. Range color mapping has been specified, and the default legend has been enabled in this example.
						<br /><br />
						Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices
                    </p>
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						TreeMap component features are segregated into individual feature-wise modules. To use a tooltip, inject the <code>Tooltip</code> module using the <code>TreeMap.Inject(TreeMapTooltip)</code> method, and use a legend by injecting the <code>Legend</code> module using the <code>TreeMap.Inject(TreeMapLegend)</code> method.
                    </p>
				</div>
			</div>);
    }
}
