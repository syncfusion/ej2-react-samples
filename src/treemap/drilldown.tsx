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
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
    
import * as data from './treemap-data/drilldown-sample.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
	.drilldown-checkbox {
        padding-left: 0px !important;
    }
	.drilldownCheckbox {
        padding-left: 0px;
    }
    .e-view.fluent2-highcontrast #property .drilldownCheckbox {
        padding-left: 0px; margin-left: -8px;
    }
    .e-view.fluent2 #property .drilldown-checkbox, .e-view.fluent2-dark #property .drilldown-checkbox {
        padding-left: 0px; margin-left: -10px;
    }`;

export class Drilldown extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private prevTime: Date;
	private curTime: Date;
	private nameElement: TextBoxComponent;
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
		let value: string = this.nameElement.value;
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
	public load(args: ILoadedEventArgs): void {
		//custom code start
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = ((theme.charAt(0).toUpperCase() +
		theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as TreeMapTheme;
		// custom code end
	}
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
			<main><div className='control-pane'>
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
						dataSource={datasource.drilldown}
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
						<table role='none' id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                  <tbody>
                  <tr style={{ height: '50px' }}>
									<td>
										<div style={{ paddingLeft: '0px' }}>Drill Down View</div>
									</td>
									<td>
										<div className="drilldown-checkbox drilldownCheckbox" style={{ paddingTop: '0px' }}>
											<CheckBoxComponent id='drillView' checked={false} change={this.drillViewChange.bind(this)} ref={d => this.drillviewElement = d}/>
										</div>
									</td>									
								</tr>
								<tr style={{ height: '50px' }}>
								<td>
										<div style={{ paddingLeft: '0px' }}>Enable Bread Crumb</div>
									</td>
									<td>
										<div className="drilldown-checkbox drilldownCheckbox" style={{ paddingTop: '0px'}}>
										<CheckBoxComponent id='breadCrumb' checked={false} change={this.breadCrumbChange.bind(this)} ref={d => this.breadCrumbElement = d}/>
										</div>
									</td>
								</tr>
								<tr style={{ height: '50px' }}>
								<td>
										<div style={{ paddingLeft: '0px' }}>Bread Crumb Text</div>
									</td>
									<td>
										<div style={{ marginLeft: '0px'}} >
											<TextBoxComponent className="e-input" value=' - ' style={{ width: '100%' }} id="breadCrumbText" ref={d => this.nameElement = d} onChange={this.breadCrumbTextChange.bind(this)}></TextBoxComponent>
                    					</div>
									</td>
								</tr>	
								<tr style={{ height: '50px' }}>
								<td>
										<div style={{ paddingLeft: '0px' }}>Header Alignment</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="header" width="100%" index={0} dataSource={this.headerAlign} fields={{ text: 'text', value: 'value' }} change={this.headerChange.bind(this)} ref={d => this.headerElement = d}/>
										</div>
									</td>
								</tr>
								<tr style={{ height: '50px' }}>
								<td>
										<div style={{ paddingLeft: '0px' }}>Label Alignment</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="label" width="100%" index={0} dataSource={this.labelAlign} fields={{ text: 'text', value: 'value' }} change={this.labelChange.bind(this)} ref={d => this.labelElement = d}/>
										</div>
									</td>
								</tr>
								</tbody>
							</table>
						</PropertyPane>
					</div>
					</div>
				<div style={{ float: 'right', marginRight: '10px' }}>Source:
       <a href="https://en.wikipedia.org/wiki/List_of_continents_by_population" target="_blank">en.wikipedia.org</a>
				</div>
			</div>
				<section id="action-description" aria-label="Description of TreeMap sample">
					<p>
					This sample demonstrates drill-down with the continents at the top level followed by regions and countries. By clicking a continent, you can view all the countries available in that continent clearly. Customizations can be done in the treemap, by using the options in the properties panel
					</p>
				</section>
				<section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
					<p>
					In this example, you can see how to render a TreeMap with multiple items and drill it further. Change the drill down view and enable the breadcrumb using the options available in the properties panel.
					</p>
				<p>
        The tooltip is enabled in this example.
        To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices.
    		</p>
				</section>
			</main>
		)
	}
}