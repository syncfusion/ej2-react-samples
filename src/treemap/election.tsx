/**
 * Legend sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
	TreeMapComponent, LegendMode, Inject, TreeMapLegend, TreeMapTooltip,
	ILoadedEventArgs, TreeMapTheme
} from '@syncfusion/ej2-react-treemap';
import { electionData } from './treemap-data/election-data';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Legend extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private legendElement: DropDownListComponent;

	private droplist: { [key: string]: Object }[] = [
		{ text: 'Default', value: 'Default' },
		{ text: 'Interactive', value: 'Interactive' },
	];

	private legendChange() {
		this.treemapInstance.legendSettings.mode = this.legendElement.value as LegendMode;
		this.treemapInstance.refresh();
	}

	public load(args: ILoadedEventArgs): void {
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)) as TreeMapTheme;
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
							dataSource={electionData}
							weightValuePath='Population'
							tooltipSettings={{			// To config tooltip for treemap
								visible: true,
								format: ' <b>${Winner}<b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %'
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
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Legend Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="legendmode" width="120px" index={0} change={this.legendChange.bind(this)} ref={d => this.legendElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
				</div>
				<div id="action-description">
					<p>
						This sample visualizes the 2016 U.S.A. presidential election results. The type of the legend can be changed by using the <code>Legend Type</code> in properties panel.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can see the type of legend available in TreeMap. Equal color mapping has been applied based on certain value in this example.
						<br /><br />
						Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices
					</p>
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						TreeMap component features are segregated into individual feature-wise modules. To use a legend, inject the  <code>Legend</code> module using the <code>TreeMap.Inject(TreeMapLegend)</code> method.
                    </p>
				</div>
			</div>
		)
	}
}