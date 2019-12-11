/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, Inject, BulletTooltip } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class BulletChartCustomization extends SampleBase {
    constructor() {
        super(...arguments);
        this.bulletLoad = (args) => {
            let chart = document.getElementById('customization');
            chart.setAttribute('title', '');
            let selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
        };
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section col-md-8'>
                    <BulletChartComponent id='customization' ref={chart => this.bulletChartInstance = chart} width={'100%'} tooltip={{ enable: true }} animation={{ enable: false }} valueField='value' targetField='target' minimum={0} maximum={3} interval={0.5} title='Package Downloads' subtitle='in Thousands' load={this.bulletLoad.bind(this)} dataSource={[{ value: 1.7, target: 2.5 }]}>
                        <Inject services={[BulletTooltip]}/>
                        <BulletRangeCollectionDirective>
                            <BulletRangeDirective end={1.5} color='#599C20'></BulletRangeDirective>
                            <BulletRangeDirective end={2.5} color='#EFC820'></BulletRangeDirective>
                            <BulletRangeDirective end={3} color='#CA4218'></BulletRangeDirective>
                        </BulletRangeCollectionDirective>
                    </BulletChartComponent>
                </div>
                <div className='property-section col-md-4'>
                <div className="property-panel-header">Properties</div>
                    <table style={{ width: '100%' }}>                        
                        <tr style={{ height: '50px' }}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Start Color:</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <ColorPickerComponent id='start' mode='Palette' value='#599C20' change={(args) => {
            this.bulletChartInstance.ranges[0].color = args.currentValue.hex;
            this.bulletChartInstance.refresh();
        }}></ColorPickerComponent>
                            </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Middle Color:</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <ColorPickerComponent mode='Palette' id='middle' value='#EFC820' change={(args) => {
            this.bulletChartInstance.ranges[1].color = args.currentValue.hex;
            this.bulletChartInstance.refresh();
        }}></ColorPickerComponent>
                            </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>End Color:</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <ColorPickerComponent id='end' mode='Palette' value='#CA4218' change={(args) => {
            this.bulletChartInstance.ranges[2].color = args.currentValue.hex;
            this.bulletChartInstance.refresh();
        }}></ColorPickerComponent>
                            </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Use Range Color:</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <CheckBoxComponent id='rangeColor' checked={false} change={(args) => {
            this.bulletChartInstance.majorTickLines.useRangeColor = args.checked;
            this.bulletChartInstance.minorTickLines.useRangeColor = args.checked;
            this.bulletChartInstance.labelStyle.useRangeColor = args.checked;
            this.bulletChartInstance.refresh();
        }}></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Opposed Position</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <CheckBoxComponent id='opposedPosition' checked={false} change={(args) => {
            this.bulletChartInstance.opposedPosition = args.checked;
            this.bulletChartInstance.refresh();
        }}></CheckBoxComponent>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a bullet chart with with different customization in value, range fill, opposed position
                        changes.
    </p>
                </div>
                <div id="description">
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the
                        bullet chart.
    </p>
                </div>
            </div>);
    }
}
