/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, BulletTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class BulletChartRightToLeft extends SampleBase {
    constructor() {
        super(...arguments);
        this.bulletLoad = (args) => {
            let chart = document.getElementById('RTL');
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
                <div className='control-section'>
                    <BulletChartComponent id='RTL' style={{ textAlign: "center" }} width={Browser.isDevice ? '100%' : '80%'} tooltip={{ enable: true }} animation={{ enable: false }} valueField='value' targetField='target' minimum={0} maximum={300} interval={50} title='Revenue YTD' enableRtl={true} labelFormat='${value}K' load={this.bulletLoad.bind(this)} dataSource={[{ value: 270, target: 250 }]}>
                        <Inject services={[BulletTooltip]}/>
                        <BulletRangeCollectionDirective>
                            <BulletRangeDirective end={150}></BulletRangeDirective>
                            <BulletRangeDirective end={250}></BulletRangeDirective>
                            <BulletRangeDirective end={300}></BulletRangeDirective>
                        </BulletRangeCollectionDirective>
                    </BulletChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates bullet chart with diferent mode and orientation such as like right to left or left to right.
</p>
                </div>
                <div id="description">
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
</p>
                </div>
            </div>);
    }
}
