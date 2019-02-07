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
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Drilldown extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	private prevTime: Date;
	private curTime: Date;

	public load(args: ILoadedEventArgs): void {
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)) as TreeMapTheme;
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
			<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<TreeMapComponent drillStart={this.drillStart.bind(this)} tooltipRendering={this.tooltipRendering.bind(this)} load={this.load.bind(this)} id='treemap-container'
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
							<LevelDirective groupPath='Region' showHeader={false} fill='#336699' border={{ color: 'black', width: 0.5 }} />
						</LevelsDirective>
					</TreeMapComponent>
				</div>
				<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href="https://en.wikipedia.org/wiki/List_of_continents_by_population" target="_blank">en.wikipedia.org</a>
				</div>
				<div id="action-description">
					<p>
						This sample demonstrates drill-down with the continents at the top level followed by regions and countries. By clicking a continent, you can view all the countries available in that continent clearly.
            </p>
				</div>
				<div id="description">
					<p>
						In this example you can see how to render a TreeMap with multiple items and drill it further. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
					</p>
				</div>
			</div>
		)
	}
}