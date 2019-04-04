/**
 * Drilldown sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
	TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapTooltip, TreeMapAjax,
	ILoadedEventArgs, TreeMapTheme, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs, Alignment
} from '@syncfusion/ej2-react-treemap';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
// custom code start
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
		}`;
		// custom code end

export class RTL extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private prevTime: Date;
    private curTime: Date;
    // custom code start
    public load(args: ILoadedEventArgs): void {
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)) as TreeMapTheme;
    }
    // custom code end
	render() {
		return (
			<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
				  <TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m}
						palette={['#5B244D', '#6F3953', ' #87525A', '#A26F63', '#BA896B', '#D5A574', '#F1C37D']}
						titleSettings={{			//To config title for treemap
							text: 'List of countries by unemployment rate',
							textStyle: { size: '15px' }
						}}
						enableDrillDown={true}
						format={"n"}
						useGroupingSeparator={true}
						enableRtl={true}
						renderDirection = 'TopRightBottomLeft'
						dataSource={new TreeMapAjax('./src/treemap/treemap-data/rtl-data.json')}
						weightValuePath='Size'
						tooltipSettings={{			// To config tooltip for treemap
							visible: true,
							format: '${Size} : ${Name}'
						}}
						leafItemSettings={{         // To config leafitem customization for treemap
							labelPath: 'Name',
							showLabels: true							
						}}>
						<Inject services={[TreeMapTooltip]} />
						<LevelsDirective>
							<LevelDirective groupPath= 'Continent' border={{ color: 'black', width: 0.5 }} headerAlignment='Far'/>
							<LevelDirective groupPath='Country'  border={{ color: 'black', width: 0.5 }} headerAlignment='Center' />							
						</LevelsDirective>
					</TreeMapComponent>
				</div>
				<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href="https://www.indexmundi.com/facts/visualizations/treemap#SL.UEM.TOTL.ZS:SL.UEM.TOTL.ZS" target="_blank">www.indexmundi.com</a>
				</div>
				<div id="action-description">
					<p>
					This sample orders the countries based on the unemployment rate, by rendering the TreeMap
					in right to left (RTL) direction.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can see how to render a TreeMap from right to left direction.
        		The tooltip is enabled in this example. To see the tooltip in action,
        		hover the mouse over an item or tap an item in touch-enabled devices.
					</p>
				</div>
			</div>
		)
	}
}