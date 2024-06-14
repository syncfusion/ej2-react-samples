/**
 * Customization sample for treemap
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Browser } from '@syncfusion/ej2-base';
import {
	TreeMapComponent, Inject, TreeMapTooltip, TreeMapTheme,
	ILoadedEventArgs
} from '@syncfusion/ej2-react-treemap';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/metal.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Customization extends SampleBase<{}, {}> {
	private treemapInstance: TreeMapComponent;
	public load(args: ILoadedEventArgs): void {
		// custom code start
		let theme: string = location.hash.split('/')[1];
		theme = theme ? theme : 'Material';
		args.treemap.theme = ((theme.charAt(0).toUpperCase() +
		theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as TreeMapTheme;
		// custom code end
	}
	
	render() {
		return (
			<main><div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<TreeMapComponent load={this.load.bind(this)} id='treemap-container'
						titleSettings={{			//To config title for treemap
							text: 'US Gold medal categories in Summer Olympics - 2016',
							textStyle: { size: '15px' }
						}}
						dataSource={datasource.metal}
						weightValuePath='Gold'
						tooltipSettings={{			// To config tooltip for treemap
							visible: true,
							format: '${Sport} : ${Gold}'
						}}
						leafItemSettings={{			// To config leafitem customization for treemap
							showLabels: !Browser.isDevice,
							labelPath: 'Sport',
							fill: '#993399',
							templatePosition: 'Center',
							border: { color: 'black', width: 0.5 },
							labelFormat: ' ${Sport} - ${Gold}',
							labelTemplate: '<div style="pointer-events: none;"><img alt="Custom label template for illustrations" src="src/treemap/image/{{:GameImage}}" style="height:{{:ItemHeight}};width:{{:ItemWidth}};"></img></div>'
						}}>
						<Inject services={[TreeMapTooltip]} />
					</TreeMapComponent>
				</div>
				{/* Source Link */}
				<div style={{ float: 'right', marginRight: '10px' }}>Source:
       <a href=" https://en.wikipedia.org/wiki/United_States_at_the_2016_Summer_Olympics" target="_blank"> en.wikipedia.org</a>
				</div>
			</div>
				<section id="action-description" aria-label="Description of TreeMap sample">
					<p>
						This sample depicts the gold medal categories of the 2016 U.S. Summer Olympics. Each category is denoted with label template.
            </p>
				</section>
				<section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
					<p>
						In this example, you can see how to place custom HTML templates in the TreeMap items. The default text of the labels also have been formatted.
						<br/><br/>
						Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
					</p>					
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						TreeMap component features are segregated into individual feature-wise modules. To use a tooltip, inject the <code>Tooltip</code> module using the <code>TreeMap.Inject(TreeMapTooltip)</code> method.
                    </p>
				</section>
			</main>
		)
	}
}