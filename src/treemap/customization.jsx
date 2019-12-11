/**
 * Customization sample for treemap
 */
import * as React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { TreeMapComponent, Inject, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/metal.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Customization extends SampleBase {
    // Custom code start
    load(args) {
        let theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    render() {
        return (<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<TreeMapComponent load={this.load.bind(this)} id='treemap-container' titleSettings={{
            text: 'US Gold medal categories in Summer Olympics - 2016',
            textStyle: { size: '15px' }
        }} dataSource={datasource.metal} weightValuePath='Gold' tooltipSettings={{
            visible: true,
            format: '${Sport} : ${Gold}'
        }} leafItemSettings={{
            showLabels: !Browser.isDevice,
            labelPath: 'Sport',
            fill: '#993399',
            templatePosition: 'Center',
            border: { color: 'black', width: 0.5 },
            labelFormat: ' ${Sport} - ${Gold}',
            labelTemplate: '<div style="pointer-events: none;"><img src="src/treemap/image/{{:GameImage}}" style="height:{{:ItemHeight}};width:{{:ItemWidth}};"></img></div>'
        }}>
						<Inject services={[TreeMapTooltip]}/>
					</TreeMapComponent>
				</div>
				
				<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href=" https://en.wikipedia.org/wiki/United_States_at_the_2016_Summer_Olympics" target="_blank"> en.wikipedia.org</a>
				</div>
				<div id="action-description">
					<p>
						This sample depicts the gold medal categories of the 2016 U.S. Summer Olympics. Each category is denoted with label template.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can see how to place custom HTML templates in the TreeMap items. The default text of the labels also have been formatted.
						<br /><br />
						Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
					</p>					
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						TreeMap component features are segregated into individual feature-wise modules. To use a tooltip, inject the <code>Tooltip</code> module using the <code>TreeMap.Inject(TreeMapTooltip)</code> method.
                    </p>
				</div>
			</div>);
    }
}
