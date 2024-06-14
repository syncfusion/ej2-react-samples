/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, OrientationType, IBulletLoadedEventArgs, ChartTheme, BulletTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class BulletChartOrientation extends SampleBase<{}, {}> {
    bulletChartInstance: BulletChartComponent;
    public bulletLoad = (args: IBulletLoadedEventArgs) => {
        let chart: Element = document.getElementById('bar-Orientation');
        chart.setAttribute('title', '');
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }
    render() {
        return (
            < div className='control-pane' >
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section col-md-8'>
                    <BulletChartComponent
                        id='bar-Orientation'
                        ref={chart => this.bulletChartInstance = chart}
                        width={'19%'}
                        height={'400'}
                        animation={{ enable: false }}
                        tooltip={{ enable: true }}
                        valueField='value'
                        targetField='target'
                        categoryField='name'
                        minimum={0}
                        maximum={30}
                        interval={5}
                        labelFormat='{value}%'
                        title='Profit in Percent'
                        margin={{ left: 10 }}
                        titlePosition={'Top'}
                        orientation='Vertical'
                        load={this.bulletLoad.bind(this)}
                        dataSource={[{ value: 23, target: 27, name: 'Product A' }]}>
                        <Inject services={[BulletTooltip]} />
                        <BulletRangeCollectionDirective>
                            <BulletRangeDirective end={20} ></BulletRangeDirective>
                            <BulletRangeDirective end={25} ></BulletRangeDirective>
                            <BulletRangeDirective end={30} ></BulletRangeDirective>
                        </BulletRangeCollectionDirective>
                    </BulletChartComponent>
                </div>
                <div className='property-section col-md-4'>
                    <div className="property-panel-header">Properties</div>
                    <table>
                    <tbody>
                        <tr>
                            <td style={{ width: '60%' }}>
                                <div className='prop-text'>Feature Mode</div>
                            </td>
                            <td style={{ width: '40%' }}>
                                <DropDownListComponent
                                    id='featureType'
                                    value='Vertical'
                                    dataSource={['Vertical', 'Horizontal']}
                                    change={(args: ChangeEventArgs) => {
                                        if (args.value === 'Horizontal') {
                                            this.bulletChartInstance.width = '80%';
                                            this.bulletChartInstance.height = '100px';
                                        } else {
                                            this.bulletChartInstance.width = '19%';
                                            this.bulletChartInstance.height = '400px';
                                        }
                                        this.bulletChartInstance.orientation = args.value as OrientationType;
                                        this.bulletChartInstance.refresh();
                                    }}
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a bullet chart with vertical orientation to compare different values.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
                    </p>
                </div>
            </ div>
        )
    }
}