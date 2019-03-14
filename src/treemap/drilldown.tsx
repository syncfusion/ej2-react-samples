/**
 * Drilldown sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
	TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapTooltip, TreeMapAjax,
	ILoadedEventArgs, TreeMapTheme, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs
} from '@syncfusion/ej2-react-treemap';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { Alignment } from "@syncfusion/ej2-charts";
// custom code start
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
		}`;
		// custom code end

export class Drilldown extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private prevTime: Date;
	private curTime: Date;
	private nameElement: HTMLInputElement;
	private headerElement: DropDownListComponent;
	private labelElement: DropDownListComponent;
	private breadCrumbElement: CheckBoxComponent;
	private drillviewElement: CheckBoxComponent;
	private drillViewChange(args: ChangeEventArgs) {
		let value: boolean = args.checked;
		this.treemapInstance.drillDownView = value;
		this.treemapInstance.refresh();
	}
	private breadCrumbChange(args: ChangeEventArgs) {
		let value: boolean = args.checked;
		this.treemapInstance.enableBreadcrumb = value;
		this.treemapInstance.refresh();
	}
	private breadCrumbTextChange(args: ChangeEventArgs) {
		let value: string = (document.getElementById('breadCrumbText') as HTMLInputElement).value;
		this.treemapInstance.breadcrumbConnector = value;
		this.treemapInstance.refresh();
	}
	private headerChange() {		
		for(let i=0;i<this.treemapInstance.levels.length-1;i++){
			this.treemapInstance.levels[i].headerAlignment = this.headerElement.value as Alignment;		
		}		
		this.treemapInstance.refresh();
	}
	private labelChange() {
		this.treemapInstance.levels[2].headerAlignment = this.labelElement.value as Alignment;
		this.treemapInstance.refresh();
	}
	private headerAlign: { [key: string]: Object }[] = [
		{ text: 'Near', value: 'Near' },
		{ text: 'Far', value: 'Far' },
		{ text: 'Center', value: 'Center' }		
	];
	private labelAlign: { [key: string]: Object }[] = [
		{ text: 'Near', value: 'Near' },
		{ text: 'Far', value: 'Far' },
		{ text: 'Center', value: 'Center' }		
	];
	//custom code start
	public load(args: ILoadedEventArgs): void {
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)) as TreeMapTheme;
	}
	// custom code end
	/* tslint:disable:no-string-literal */
	public drillStart(args: IDrillStartEventArgs): void {
		if (args.item[Object.keys(args.item)[0]].length === 1) {
			args.treemap.levels[2].showHeader = true;
		} else {
			args.treemap.levels[2].showHeader = false;
		}
	}

	public tooltipRendering(args: ITreeMapTooltipRenderEventArgs): void {
		if (args.item['groupIndex'] !== 2) {
			args.cancel = true;
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
					<TreeMapComponent drillStart={this.drillStart.bind(this)} tooltipRendering={this.tooltipRendering.bind(this)} load={this.load.bind(this)} id='treemap-container'
				ref={m => this.treemapInstance = m}
						palette={['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66']}
						titleSettings={{			//To config title for treemap
							text: 'List of countries by population',
							textStyle: { size: '15px' }
						}}
						enableDrillDown={true}
						format={"n"}
						useGroupingSeparator={true}
						dataSource={new TreeMapAjax('./src/treemap/treemap-data/drilldown-sample.json')}
						weightValuePath='Population'
						tooltipSettings={{			// To config tooltip for treemap
							visible: true,
							format: '${Name} : ${Population}'
						}}
						leafItemSettings={{         // To config leafitem customization for treemap
							labelPath: 'Name',
							showLabels: false,
							labelStyle: { size: '0px' },
							border: { color: 'black', width: 0.5 }
						}}>
						<Inject services={[TreeMapTooltip]} />
						<LevelsDirective>
							<LevelDirective groupPath= 'Continent' fill= '#336699' border={{ color: 'black', width: 0.5 }} />
							<LevelDirective groupPath='States' fill='#336699' border={{ color: 'black', width: 0.5 }} />
							<LevelDirective groupPath='Region' showHeader={true} fill='#336699' border={{ color: 'black', width: 0.5 }} />
						</LevelsDirective>
					</TreeMapComponent>
				</div>
				 {/* Property Panel */}
				 <div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
						<table id='property' title='Properties' className='property-panel-table' style={{ width: '110%', marginBottom: '20px' }}>
                  <tr>
									<td>
										<div>Drill Down View</div>
									</td>
									<td>
										<div>
											<CheckBoxComponent id='drillView' checked={false} change={this.drillViewChange.bind(this)} ref={d => this.drillviewElement = d}/>
										</div>
									</td>									
								</tr>
								<tr>
								<td>
										<div>Enable Bread Crumb</div>
									</td>
									<td>
										<div>
										<CheckBoxComponent id='breadCrumb' checked={false} change={this.breadCrumbChange.bind(this)} ref={d => this.breadCrumbElement = d}/>
										</div>
									</td>
								</tr>
								<tr>
								<td>
										<div>Bread Crumb Text</div>
									</td>
									<td>
										<div style={{ marginleft: '10px'}} >
                    <input id="breadCrumbText" ref={d => this.nameElement = d} type='text' defaultValue=' - ' style={{ width: '100px'}} onChange={this.breadCrumbTextChange.bind(this)}/>
                    </div>
									</td>
								</tr>	
								<tr>
								<td>
										<div>Header Alignment</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="header" width="120px" index={0} dataSource={this.headerAlign} fields={{ text: 'text', value: 'value' }} change={this.headerChange.bind(this)} ref={d => this.headerElement = d}/>
										</div>
									</td>
								</tr>
								<tr>
								<td>
										<div>Label Alignment</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="label" width="120px" index={0} dataSource={this.labelAlign} fields={{ text: 'text', value: 'value' }} change={this.labelChange.bind(this)} ref={d => this.labelElement = d}/>
										</div>
									</td>
								</tr>							
							</table>
						</PropertyPane>
					</div>
					</div>
				<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href="https://en.wikipedia.org/wiki/List_of_continents_by_population" target="_blank">en.wikipedia.org</a>
				</div>
				<div id="action-description">
					<p>
					This sample demonstrates drill-down with the continents at the top level followed by regions and countries. By clicking a continent, you can view all the countries available in that continent clearly. Customizations can be done in the treemap, by using the options in the properties panel
					</p>
				</div>
				<div id="description">
					<p>
					In this example, you can see how to render a TreeMap with multiple items and drill it further. Change the drill down view and enable the breadcrumb using the options available in the properties panel.
					</p>
				<p>
        The tooltip is enabled in this example.
        To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices.
    		</p>
				</div>
				</div>
		)
	}
}