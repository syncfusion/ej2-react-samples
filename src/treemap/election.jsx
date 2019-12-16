/**
 * Legend sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeMapComponent, Inject, TreeMapLegend, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/election-data.json';
let datasource = data;
export class Legend extends SampleBase {
    constructor() {
        super(...arguments);
        // Code for Property Panel
        this.droplist = [
            { text: 'Default', value: 'Default' },
            { text: 'Interactive', value: 'Interactive' },
        ];
        this.positionList = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' },
            { text: 'Left', value: 'Left' },
            { text: 'Right', value: 'Right' },
            { text: 'Auto', value: 'Auto' }
        ];
    }
    legendChange() {
        this.treemapInstance.legendSettings.mode = this.legendElement.value;
        if (this.legendElement.value === 'Interactive') {
            if (this.treemapInstance.legendSettings.orientation === 'Horizontal' || this.treemapInstance.legendSettings.orientation === 'None') {
                this.treemapInstance.legendSettings.height = '10';
                this.treemapInstance.legendSettings.width = '';
            }
            else {
                this.treemapInstance.legendSettings.height = '70%';
                this.treemapInstance.legendSettings.width = '10';
            }
        }
        else {
            this.treemapInstance.legendSettings.height = '';
            this.treemapInstance.legendSettings.width = '';
        }
        this.treemapInstance.refresh();
    }
    legendPositionChange() {
        this.treemapInstance.legendSettings.position = this.legendPositionElement.value;
        if (this.legendPositionElement.value === 'Left' || this.legendPositionElement.value === 'Right') {
            this.treemapInstance.legendSettings.orientation = 'Vertical';
            if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                this.treemapInstance.legendSettings.height = '70%';
                this.treemapInstance.legendSettings.width = '10';
            }
            else {
                this.treemapInstance.legendSettings.height = '';
                this.treemapInstance.legendSettings.width = '';
            }
        }
        else if (this.legendPositionElement.value === 'Auto') {
            if (this.treemapInstance.availableSize.width > this.treemapInstance.availableSize.height) {
                this.treemapInstance.legendSettings.orientation = 'Vertical';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '70%';
                    this.treemapInstance.legendSettings.width = '10';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
            else {
                this.treemapInstance.legendSettings.orientation = 'Horizontal';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '10';
                    this.treemapInstance.legendSettings.width = '';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
        }
        else {
            this.treemapInstance.legendSettings.orientation = 'Horizontal';
            if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                this.treemapInstance.legendSettings.height = '10';
                this.treemapInstance.legendSettings.width = '';
            }
        }
        this.treemapInstance.refresh();
    }
    resize(args) {
        if (args.currentSize.width > args.currentSize.height && this.treemapInstance.legendSettings.position === 'Auto') {
            this.treemapInstance.legendSettings.orientation = 'Vertical';
            if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                this.treemapInstance.legendSettings.height = '70%';
                this.treemapInstance.legendSettings.width = '10';
            }
            else {
                this.treemapInstance.legendSettings.height = '';
                this.treemapInstance.legendSettings.width = '';
            }
        }
        else if (this.legendPositionElement.value === 'Auto') {
            if (this.treemapInstance.availableSize.width > this.treemapInstance.availableSize.height) {
                this.treemapInstance.legendSettings.orientation = 'Vertical';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '70%';
                    this.treemapInstance.legendSettings.width = '10';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
            else {
                this.treemapInstance.legendSettings.orientation = 'Horizontal';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '10';
                    this.treemapInstance.legendSettings.width = '';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
        }
    }
    render() {
        return (<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<div className='col-md-9'>
						<TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m} titleSettings={{
            text: 'US presidential election result - 2016',
            textStyle: { size: '15px' }
        }} dataSource={datasource.election} weightValuePath='Population' tooltipSettings={{
            visible: true,
            format: ' <b>${Winner}</b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %'
        }} legendSettings={{
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
            height: '10'
        }} format={"n"} useGroupingSeparator={true} rangeColorValuePath='WinPercentage' equalColorValuePath='Winner' leafItemSettings={{
            labelPath: 'State',
            fill: '#6699cc',
            border: { color: 'white', width: 0.5 },
            colorMapping: [
                {
                    value: 'Trump', color: '#D84444'
                },
                {
                    value: 'Clinton', color: '#316DB5'
                }
            ]
        }}>
							<Inject services={[TreeMapLegend, TreeMapTooltip]}/>
						</TreeMapComponent>
						<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href=" https://en.wikipedia.org/wiki/United_States_presidential_election,_2016" target="_blank">en.wikipedia.org</a>
						</div>
					</div>
					
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendmode" width="120px" index={0} change={this.legendChange.bind(this)} ref={d => this.legendElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Position</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendPosition" width="120px" index={0} change={this.legendPositionChange.bind(this)} ref={d => this.legendPositionElement = d} dataSource={this.positionList} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
				</div>
				<div id="action-description">
					<p>
					This sample visualizes the 2016 United States presidential election results. The type and position of the legends can be changed using the Type and Position options in the properties panel.
            		</p>
				</div>
				<div id="description">
					<p>
						In this example, you can see the type of legend available in TreeMap. The equal color mapping is applied based on certain value.
						<br /><br />
						The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
					</p>
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						The TreeMap component features are segregated into individual  modules by feature. To use a legend, inject the <code>Legend</code> module using the <code>TreeMap.Inject(TreeMapLegend)</code> method.
                    </p>
				</div>
			</div>);
    }
}
