/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, Inject, BulletTooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { updateSampleSection } from '../common/sample-base';
import { ColorPickerComponent, ColorPickerEventArgs } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function BulletChartCustomization() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let bulletChartInstance: BulletChartComponent;

    return (
        < div className='control-pane' >
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section col-md-8'>
                <BulletChartComponent id='customization'
                    ref={chart => bulletChartInstance = chart}
                    width={'100%'}
                    tooltip={{ enable: true }}
                    animation={{ enable: false }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={3}
                    interval={0.5}
                    title='Package Downloads'
                    subtitle='in Thousands'
                    minorTickLines={{ width: 0}}
                    load={bulletLoad.bind(this)}
                    dataSource={[{ value: 1.7, target: 2.5 }]}>
                    <Inject services={[BulletTooltip]} />
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
                  <tbody>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Start Color:</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <ColorPickerComponent
                                id='start'
                                mode='Palette'
                                value='#599C20'
                                change={(args: ColorPickerEventArgs) => {
                                    bulletChartInstance.ranges[0].color = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                }}></ColorPickerComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Middle Color:</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <ColorPickerComponent
                                mode='Palette'
                                id='middle'
                                value='#EFC820'
                                change={(args: ColorPickerEventArgs) => {
                                    bulletChartInstance.ranges[1].color = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                }}></ColorPickerComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>End Color:</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <ColorPickerComponent
                                id='end'
                                mode='Palette'
                                value='#CA4218'
                                change={(args: ColorPickerEventArgs) => {
                                    bulletChartInstance.ranges[2].color = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                }}></ColorPickerComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Use Range Color:</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <CheckBoxComponent
                                id='rangeColor'
                                checked={false}
                                change={(args: ChangeEventArgs) => {
                                    bulletChartInstance.majorTickLines.useRangeColor = args.checked;
                                    bulletChartInstance.minorTickLines.useRangeColor = args.checked;
                                    bulletChartInstance.labelStyle.useRangeColor = args.checked;
                                    bulletChartInstance.refresh();
                                }}></CheckBoxComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Opposed Position</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <CheckBoxComponent
                                id='opposedPosition'
                                checked={false}
                                change={(args: ChangeEventArgs) => {
                                    bulletChartInstance.opposedPosition = args.checked;
                                    bulletChartInstance.refresh();
                                }}></CheckBoxComponent>
                        </td>
                    </tr>
                    </tbody>
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
        </ div>
    )
    function bulletLoad(args: IBulletLoadedEventArgs): void {
        let chart: Element = document.getElementById('customization');
        chart.setAttribute('title', '');
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast') as ChartTheme;
    }
}
export default BulletChartCustomization;