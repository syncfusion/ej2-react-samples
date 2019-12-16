/**
 * Drilldown sample for treemap
 */
import * as React from "react";
import { TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapTooltip, TreeMapAjax } from '@syncfusion/ej2-react-treemap';
import { SampleBase } from '../common/sample-base';
export class RTL extends SampleBase {
    render() {
        return (<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
				  <TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m} palette={['#5B244D', '#6F3953', ' #87525A', '#A26F63', '#BA896B', '#D5A574', '#F1C37D']} titleSettings={{
            text: 'List of countries by unemployment rate',
            textStyle: { size: '15px' }
        }} enableDrillDown={true} format={"n"} useGroupingSeparator={true} enableRtl={true} renderDirection='TopRightBottomLeft' dataSource={new TreeMapAjax('./src/treemap/treemap-data/rtl-data.json')} weightValuePath='Size' tooltipSettings={{
            visible: true,
            format: '${Size} : ${Name}'
        }} leafItemSettings={{
            labelPath: 'Name',
            showLabels: true
        }}>
						<Inject services={[TreeMapTooltip]}/>
						<LevelsDirective>
							<LevelDirective groupPath='Continent' border={{ color: 'black', width: 0.5 }} headerAlignment='Far'/>
							<LevelDirective groupPath='Country' border={{ color: 'black', width: 0.5 }} headerAlignment='Center'/>							
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
			</div>);
    }
}
