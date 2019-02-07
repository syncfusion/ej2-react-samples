/**
 * Layout sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
	TreeMapComponent, LayoutMode, Inject, TreeMapTooltip,
	ILoadedEventArgs, TreeMapTheme
} from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/economics.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Layout extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private layoutElement: DropDownListComponent;

	private droplist: { [key: string]: Object }[] = [
		{ text: 'Squarified', value: 'Squarified' },
		{ text: 'Horizontal', value: 'SliceAndDiceHorizontal' },
		{ text: 'Vertical', value: 'SliceAndDiceVertical' },
		{ text: 'Auto', value: 'SliceAndDiceAuto' },
	];

	private layoutChange(): void {
		this.treemapInstance.layoutType = this.layoutElement.value as LayoutMode;
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

							titleSettings={{            //To config title for treemap
								text: 'Top 10 countries by GDP Nominal - 2015',
								textStyle: { size: '15px' }
							}}
							dataSource={datasource.economics}
							weightValuePath='GDP'
							tooltipSettings={{          // To config tooltip for treemap 
								visible: true,
								format: '${State}<br>Rank : ${Rank}'
							}}    
							rangeColorValuePath='GDP'
							leafItemSettings={{         // To config leafitem customization for treemap
								labelPath: 'State',
								labelFormat: '${State}<br>$${GDP} Trillion<br>(${percentage} %)',
								labelStyle: {
									color: '#000000'
								},
								border: {
									color: '#000000',
									width: 0.5
								},
								colorMapping: [
									{
										from: 1550,
										to: 17946,
										color: '#9cbb59',
										minOpacity: 0.7,
										maxOpacity: 1,
									}
								]
							}}>
							<Inject services={[TreeMapTooltip]} />
						</TreeMapComponent>
						<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href="https://www.reinisfischer.com/top-10-largest-economies-world-gdp-nominal-2015" target="_blank">www.reinisfischer.com</a>
						</div>
					</div>
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Layout Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="layoutMode" width="120px" index={0} change={this.layoutChange.bind(this)} ref={d => this.layoutElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
				</div>
				<div id="action-description">
					<p>
						This sample illustrates the GDP nominal of top 10 countries in the year 2015. The layout of the TreeMap can be changed by using the <code>Layout Type</code> in properties panel.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can change the layout of the TreeMap as desaturation color mapping has been applied to denote the weightage of the items by varying the fill color. The labels text also have been formatted and placed in multiple lines.
						<br /><br />
						Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
					</p>
				</div>
			</div>
		)
	}
}