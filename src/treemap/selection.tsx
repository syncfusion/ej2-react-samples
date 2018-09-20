/**
 * Selection and Highlight sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import {
	TreeMapComponent, HighLightMode, SelectionMode, LevelsDirective, LevelDirective, Inject,
	TreeMapHighlight, TreeMapSelection, ILoadedEventArgs, TreeMapTheme
} from '@syncfusion/ej2-react-treemap';
import { importData } from './treemap-data/import';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Selection extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private highlightModeElement: DropDownListComponent;
	private selectionModeElement: DropDownListComponent;

	private droplist1: { [key: string]: Object }[] = [
		{ value: 'Item' },
		{ value: 'Child' },
		{ value: 'Parent' },
		{ value: 'All' },
	];
	private droplist2: { [key: string]: Object }[] = [
		{ value: 'Item' },
		{ value: 'Child' },
		{ value: 'Parent' },
		{ value: 'All' },
	];

	private highlightChange(args: ChangeEventArgs) {
		let value: boolean = args.checked;
		this.treemapInstance.highlightSettings.enable = value;
		this.treemapInstance.refresh();
	}

	private highlightModeChange() {
		this.treemapInstance.highlightSettings.mode = this.highlightModeElement.value as HighLightMode;
		this.treemapInstance.refresh();
	}

	private selectionchange(args: ChangeEventArgs) {
		let value: boolean = args.checked;
		this.treemapInstance.selectionSettings.enable = value;
		this.treemapInstance.refresh();
	}

	private selectionModeChange() {
		this.treemapInstance.selectionSettings.mode = this.selectionModeElement.value as SelectionMode;
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
							titleSettings={{				//To config title for treemap
								text: 'Import and Export details of US'
							}}
							selectionSettings={{			//To config the selection for treemap
								enable: true,
								fill: '#58a0d3',
								border: { width: 0.3, color: 'black' },
								opacity: '1'
							}}
							highlightSettings={{			//To config the highlight for treemap
								enable: true,
								fill: '#71b0dd',
								border: { width: 0.3, color: 'black' },
								opacity: '1'
							}}
							leafItemSettings={{				// To config leafitem customization for treemap
								labelPath: 'type',
								fill: '#8ebfe2',
								labelPosition: 'Center',
								gap: 10
							}}
							dataSource={importData}
							weightValuePath='sales'>
							<Inject services={[TreeMapHighlight, TreeMapSelection]} />
							<LevelsDirective>
								<LevelDirective groupPath='dataType' fill='#c5e2f7' headerStyle={{ size: '16px' }} headerAlignment='Center' groupGap={5} />
								<LevelDirective groupPath='product' fill='#a4d1f2' headerAlignment='Center' groupGap={2} />
							</LevelsDirective>
						</TreeMapComponent>
						<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href="https://www.indexmundi.com/united_states/imports_commodities.html" target="_blank">www.indexmundi.com</a>
						</div>
					</div>
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr style={{"height": "50px"}}>
									<td style={{"width": "60%"}}>
										<div><b>Highlight</b></div>
									</td>

								</tr>
								<tr >
									<td style={{"width": "60%"}}>
										<div> Enable</div>
									</td>
									<td style={{"width": "40%"}}>
										<div>
											<CheckBoxComponent id='highlightEnable' checked={true} change={this.highlightChange.bind(this)}> </CheckBoxComponent>
										</div>
									</td>
								</tr>
								<tr>
									<td style={{"width": "60%"}}>
										<div>Mode</div>
									</td>
									<td style={{"width": "40%"}}>
										<div>
											<DropDownListComponent id="highlightmode" width="100px" index={0} change={this.highlightModeChange.bind(this)} ref={d => this.highlightModeElement = d} dataSource={this.droplist1} fields={{ text: 'value', value: 'value' }} />
										</div>
									</td>
								</tr>
								<tr style={{"height": "50px"}}>
									<td style={{"width": "80%"}}>
										<div><b>Selection</b></div>
									</td>

								</tr>
								<tr >
									<td style={{"width": "60%"}}>
										<div>Enable</div>
									</td>
									<td style={{"width": "40%"}}>
										<div>
											<CheckBoxComponent id='SelectionEnable' checked={true} change={this.selectionchange.bind(this)}> </CheckBoxComponent>
										</div>
									</td>
								</tr>
								<tr>
									<td style={{"width": "60%"}}>
										<div>Mode</div>
									</td>
									<td style={{"width": "40%"}}>
										<div>
											<DropDownListComponent id="selectionmode" width="100px" index={0} change={this.selectionModeChange.bind(this)} ref={d => this.selectionModeElement = d} dataSource={this.droplist2} fields={{ text: 'value', value: 'value' }} />
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
				</div>
				<div id="action-description">
					<p>

						This sample depicts the details of goods imported by Japan. Selection and highlight options have been enabled in this sample.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can see the modes available for performing highlight and selection in TreeMap. It can be either enabled or disabled.
                    </p>
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						TreeMap component features are segregated into individual feature-wise modules. To use highlight and selection, inject the <code>Selection</code> module using the <code>TreeMap.Inject(TreeMapSelection)</code>inject the <code>Highlight</code> module using the <code>TreeMap.Inject(TreeMapHighlight)</code> method.
                    </p>
				</div>
			</div>
		)
	}
}