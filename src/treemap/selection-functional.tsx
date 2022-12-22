/**
 * Selection and Highlight sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import {
	TreeMapComponent, HighLightMode, SelectionMode, LevelsDirective, LevelDirective, Inject,
	TreeMapHighlight, TreeMapSelection, ILoadedEventArgs, TreeMapTheme
} from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import * as data from './treemap-data/import.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

function Selection() {
	React.useEffect(() => {
		updateSampleSection();
	}, [])
	let treemapInstance: TreeMapComponent;
	let highlightModeElement: DropDownListComponent;
	let selectionModeElement: DropDownListComponent;
	// Code for Property Panel
	let droplist1: { [key: string]: Object }[] = [
		{ value: 'Item' },
		{ value: 'Child' },
		{ value: 'Parent' },
		{ value: 'All' },
	];
	let droplist2: { [key: string]: Object }[] = [
		{ value: 'Item' },
		{ value: 'Child' },
		{ value: 'Parent' },
		{ value: 'All' },
	];

	function highlightChange(args: ChangeEventArgs) {
		let value: boolean = args.checked;
		treemapInstance.highlightSettings.enable = value;
		treemapInstance.refresh();
	}

	function highlightModeChange() {
		treemapInstance.highlightSettings.mode = highlightModeElement.value as HighLightMode;
		treemapInstance.refresh();
	}

	function selectionchange(args: ChangeEventArgs) {
		let value: boolean = args.checked;
		treemapInstance.selectionSettings.enable = value;
		treemapInstance.refresh();
	}

	function selectionModeChange() {
		treemapInstance.selectionSettings.mode = selectionModeElement.value as SelectionMode;
		treemapInstance.refresh();
	}

	function load(args: ILoadedEventArgs): void {
		// custom code start
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = ((theme.charAt(0).toUpperCase() +
			theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as TreeMapTheme;
		// custom code end
	}

	return (
		<div className='control-pane'>
			<style>
				{SAMPLE_CSS}
			</style>
			<div className='control-section'>
				<div className='col-md-9'>
					<TreeMapComponent load={load.bind(this)} id='treemap-container' ref={m => treemapInstance = m}
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
						dataSource={datasource.import}
						weightValuePath='sales'>
						<Inject services={[TreeMapHighlight, TreeMapSelection]} />
						<LevelsDirective>
							<LevelDirective groupPath='dataType' fill='#c5e2f7' headerStyle={{ size: '16px' }} headerAlignment='Center' groupGap={5} />
							<LevelDirective groupPath='product' fill='#a4d1f2' headerAlignment='Center' groupGap={2} />
						</LevelsDirective>
					</TreeMapComponent>
					{/* Source Link */}
					<div style={{ float: 'right', marginRight: '10px' }}>Source:
						<a href="https://www.indexmundi.com/united_states/imports_commodities.html" target="_blank">www.indexmundi.com</a>
					</div>
				</div>
				{/* Property Panel */}
				<div className='col-md-3 property-section'>
					<PropertyPane title='Properties'>
						<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
							<tr style={{ "height": "50px" }}>
								<td>
									<div style={{ paddingLeft: '0px' }}><b>Highlight</b></div>
								</td>

							</tr>
							<tr >
								<td>
									<div style={{ paddingLeft: '0px' }}> Enable</div>
								</td>
								<td>
									<div style={{ paddingTop: "0px", paddingLeft: '0px' }}>
										<CheckBoxComponent id='highlightEnable' checked={true} change={highlightChange.bind(this)}> </CheckBoxComponent>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div style={{ paddingLeft: '0px' }}>Mode</div>
								</td>
								<td>
									<div>
										<DropDownListComponent id="highlightmode" width="100%" index={0} change={highlightModeChange.bind(this)} ref={d => highlightModeElement = d} dataSource={droplist1} fields={{ text: 'value', value: 'value' }} />
									</div>
								</td>
							</tr>
							<tr style={{ "height": "50px" }}>
								<td>
									<div style={{ paddingLeft: '0px' }}><b>Selection</b></div>
								</td>

							</tr>
							<tr >
								<td>
									<div style={{ paddingLeft: '0px' }}>Enable</div>
								</td>
								<td>
									<div style={{ paddingTop: "0px", paddingLeft: '0px' }}>
										<CheckBoxComponent id='SelectionEnable' checked={true} change={selectionchange.bind(this)}> </CheckBoxComponent>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div style={{ paddingLeft: '0px' }}>Mode</div>
								</td>
								<td>
									<div>
										<DropDownListComponent id="selectionmode" width="100%" index={0} change={selectionModeChange.bind(this)} ref={d => selectionModeElement = d} dataSource={droplist2} fields={{ text: 'value', value: 'value' }} />
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
export default Selection;