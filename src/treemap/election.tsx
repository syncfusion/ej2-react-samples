/**
 * Legend sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
	TreeMapComponent, LegendMode, Inject, TreeMapLegend, TreeMapTooltip, LegendPosition,
	ILoadedEventArgs, TreeMapTheme
} from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/election-data.json';
import { IResizeEventArgs } from "@syncfusion/ej2-charts";
let datasource: any = data as any;
// custom code start
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
// custom code end
export class Legend extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private legendElement: DropDownListComponent;
	private legendPositionElement: DropDownListComponent;
	// Code for Property Panel
	private droplist: { [key: string]: Object }[] = [
		{ text: 'Default', value: 'Default' },
		{ text: 'Interactive', value: 'Interactive' },
	];

	private positionList: { [key: string]: Object }[] = [
		{ text: 'Top', value: 'Top' },
		{ text: 'Bottom', value: 'Bottom' },
		{ text: 'Left', value: 'Left' },
		{ text: 'Right', value: 'Right' },
		{ text: 'Auto', value: 'Auto'}
	];

	private legendChange() {
		this.treemapInstance.legendSettings.mode = this.legendElement.value as LegendMode;
		if (this.legendElement.value === 'Interactive') {
			if (this.treemapInstance.legendSettings.orientation === 'Horizontal' || this.treemapInstance.legendSettings.orientation === 'None') {
				this.treemapInstance.legendSettings.height = '10';
				this.treemapInstance.legendSettings.width = '';
			} else {
				this.treemapInstance.legendSettings.height = '70%';
				this.treemapInstance.legendSettings.width = '10';
			}
		} else {
			this.treemapInstance.legendSettings.height = '';
			this.treemapInstance.legendSettings.width = '';
		}
		this.treemapInstance.refresh();
	}

	private legendPositionChange() {
		this.treemapInstance.legendSettings.position = this.legendPositionElement.value as LegendPosition;
		if (this.legendPositionElement.value === 'Left' || this.legendPositionElement.value === 'Right') {
			this.treemapInstance.legendSettings.orientation = 'Vertical';
			if (this.treemapInstance.legendSettings.mode === 'Interactive') {
				this.treemapInstance.legendSettings.height = '70%';
				this.treemapInstance.legendSettings.width = '10';
			} else {
				this.treemapInstance.legendSettings.height = '';
				this.treemapInstance.legendSettings.width = '';
			}
		} else if (this.legendPositionElement.value === 'Auto') {
			if (this.treemapInstance.availableSize.width > this.treemapInstance.availableSize.height) {
				this.treemapInstance.legendSettings.orientation = 'Vertical';
				if (this.treemapInstance.legendSettings.mode === 'Interactive') {
					this.treemapInstance.legendSettings.height = '70%';
					this.treemapInstance.legendSettings.width = '10';
				} else {
					this.treemapInstance.legendSettings.height = '';
					this.treemapInstance.legendSettings.width = '';
				}
			} else {
				this.treemapInstance.legendSettings.orientation = 'Horizontal';
				if (this.treemapInstance.legendSettings.mode === 'Interactive') {
					this.treemapInstance.legendSettings.height = '10';
					this.treemapInstance.legendSettings.width = '';
				} else {
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
// custom code start
	public load(args: ILoadedEventArgs): void {
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = ((theme.charAt(0).toUpperCase() +
		theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as TreeMapTheme;
	}
	// custom code end
	public resize(args: IResizeEventArgs): void {
		if (args.currentSize.width > args.currentSize.height && this.treemapInstance.legendSettings.position === 'Auto') {
				this.treemapInstance.legendSettings.orientation = 'Vertical';
				if (this.treemapInstance.legendSettings.mode === 'Interactive') {
						this.treemapInstance.legendSettings.height = '70%';
						this.treemapInstance.legendSettings.width = '10';
				} else {
						this.treemapInstance.legendSettings.height = '';
						this.treemapInstance.legendSettings.width = '';
				}
		 } else if (this.legendPositionElement.value === 'Auto') {
			if (this.treemapInstance.availableSize.width > this.treemapInstance.availableSize.height) {
					this.treemapInstance.legendSettings.orientation = 'Vertical';
					if (this.treemapInstance.legendSettings.mode === 'Interactive') {
							this.treemapInstance.legendSettings.height = '70%';
							this.treemapInstance.legendSettings.width = '10';
					} else {
							this.treemapInstance.legendSettings.height = '';
							this.treemapInstance.legendSettings.width = '';
					}
			} else {
					this.treemapInstance.legendSettings.orientation = 'Horizontal';
					if (this.treemapInstance.legendSettings.mode === 'Interactive') {
							this.treemapInstance.legendSettings.height = '10';
							this.treemapInstance.legendSettings.width = '';
					} else {
							this.treemapInstance.legendSettings.height = '';
							this.treemapInstance.legendSettings.width = '';
					}
			} 
		}
	}


	render() {
		return (
			<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<div className='col-md-9'>
						<TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m}
							titleSettings={{			//To config title for treemap
								text: 'US presidential election result - 2016',
								textStyle: { size: '15px' }
							}}
							dataSource={datasource.election}
							weightValuePath='Population'
							tooltipSettings={{			// To config tooltip for treemap
								visible: true,
								format: ' <b>${Winner}</b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %'
							}}
							legendSettings={{			// To config legend for treemap
								visible: true,
								position: 'Top',
								shape: 'Rectangle',
								height: '10'
							}}
							format={"n"}
							useGroupingSeparator={true}
							rangeColorValuePath='WinPercentage'
							equalColorValuePath='Winner'
							leafItemSettings={{			// To config leafitem customization for treemap
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
							<Inject services={[TreeMapLegend, TreeMapTooltip]} />
						</TreeMapComponent>
						<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href=" https://en.wikipedia.org/wiki/United_States_presidential_election,_2016" target="_blank">en.wikipedia.org</a>
						</div>
					</div>
					{/* Property Panel */}
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendmode" width="120px" index={0} change={this.legendChange.bind(this)} ref={d => this.legendElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Position</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendPosition" width="120px" index={0} change={this.legendPositionChange.bind(this)} ref={d => this.legendPositionElement = d} dataSource={this.positionList} fields={{ text: 'text', value: 'value' }} />
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
			</div>
		)
	}
}