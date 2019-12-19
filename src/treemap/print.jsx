/**
 * Print and Export sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeMapComponent, Inject, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/product.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
	#btn-control {
        width: 100%;
		text-align: center;
		text-transform:none !important;
    }
	.e-play-icon::before {
        content: "\\e813";
    }`;
export class Print extends SampleBase {
    constructor() {
        super(...arguments);
        // Code for Property Panel
        this.droplist = [
            { text: 'JPEG', value: 'JPEG' },
            { text: 'PNG', value: 'PNG' },
            { text: 'SVG', value: 'SVG' },
            { text: 'PF', value: 'PDF' },
        ];
    }
    onClick2(e) {
        this.treemapInstance.print();
    }
    onClick1(e) {
        let fileName = document.getElementById('fileName').value;
        this.treemapInstance.export(this.mode.value, fileName);
    }
    render() {
        return (<div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<div className='col-md-9'>
						<TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m} titleSettings={{
            text: 'Top 10 best selling smartphone brands - 2017',
            textStyle: { size: '15px' }
        }} dataSource={datasource.product} layoutType='SliceAndDiceVertical' weightValuePath='Percentage' rangeColorValuePath='Percentage' tooltipSettings={{
            visible: true,
            format: '${Product} (+${Percentage}) %'
        }} leafItemSettings={{
            labelPath: 'Product',
            fill: '#6699cc',
            border: { color: 'black', width: 0.5 },
            labelPosition: 'Center',
            interSectAction: 'Hide',
            labelFormat: '${Product} (+${Percentage}) %',
            colorMapping: [
                {
                    from: 1.3,
                    to: 22,
                    color: '#FAB665',
                    minOpacity: 0.5,
                    maxOpacity: 1
                }
            ]
        }}>
							<Inject services={[TreeMapTooltip]}/>
						</TreeMapComponent>
						<div style={{ float: 'right', marginright: '10px' }}>Source:
       <a href=" http://zeenews.india.com/photos/business/worlds-10-best-selling-smartphone-brands-2033958/samsung-2033959" target="_blank">zeenews.india.com</a>
						</div>
					</div>
					
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
								<tr>
									<td>
										<div>Export Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="mode" width="90px" index={0} placeholder="JPEG" ref={d => this.mode = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>File Name</div>
									</td>
									<td>
										<div className="e-float-input" style={{ 'margin-top': '0px' }}>
											<input id="fileName" ref={d => this.nameElement = d} type="text" defaultValue="TreeMap"/>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div id="btn-control">
											<ButtonComponent onClick={this.onClick1.bind(this)} style={{ width: '80px' }} cssClass='e-info' isPrimary={true}>Export</ButtonComponent>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div id="btn-control">
											<ButtonComponent onClick={this.onClick2.bind(this)} style={{ width: '80px' }} cssClass='e-info' isPrimary={true}>Print</ButtonComponent>
										</div>
									</td>
								</tr>
							</table>
						</PropertyPane>
					</div>
				</div>
				<div id="action-description">
					<p>
						This sample depicts the top 10 best-selling smartphone brands. Print and export options have been enabled in this sample.
            </p>
				</div>
				<div id="description">
					<p>
						In this example, you can see how to export and print the rendered TreeMap. The TreeMap can be exported to JPEG, PNG, SVG, and PDF formats.
					</p>
				</div>
			</div>);
    }
}
