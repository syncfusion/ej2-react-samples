/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, FeatureType, IBulletLoadedEventArgs, ChartTheme, BulletTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { SliderComponent, ColorPickerComponent, ColorPickerEventArgs, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { loadBulletChartTheme } from './theme-color';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function BulletChartBarCustomization() {
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
                <BulletChartComponent
                    id='bar-customization'
                    ref={chart => bulletChartInstance = chart}
                    width={'100%'}
                    animation={{ enable: false }}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={300}
                    interval={50}
                    title='New Customers'
                    titlePosition={Browser.isDevice ? 'Top' : 'Left'}
                    subtitle='in Thousands'
                    load={bulletLoad.bind(this)}
                    dataSource={[{ value: 270, target: 250 }]}>
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={150} ></BulletRangeDirective>
                        <BulletRangeDirective end={250} ></BulletRangeDirective>
                        <BulletRangeDirective end={300} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>
            </div>
            <div className='property-section col-md-4'>
                <div className="property-panel-header">Properties</div>
                <table>
                <tbody>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Actual Value:</div>
                        </td>
                        <td style={{ width: '50%' }}>
                            <SliderComponent id='actualValue'
                                min={0}
                                max={300}
                                value={270}
                                tooltip={{ isVisible: true }}
                                change={(args: SliderChangeEventArgs) => {
                                    bulletChartInstance.dataSource[0].value = args.value;
                                    bulletChartInstance.refresh();
                                }}></SliderComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Target Value:</div>
                        </td>
                        <td style={{ width: '50%' }}>
                            <SliderComponent
                                min={0}
                                max={300}
                                value={250}
                                tooltip={{ isVisible: true }}
                                change={(args: SliderChangeEventArgs) => {
                                    bulletChartInstance.dataSource[0].target = args.value
                                    bulletChartInstance.refresh();
                                }} id='targetValue'></SliderComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Feature Mode</div>
                        </td>
                        <td style={{ width: '50%' }}>
                            <DropDownListComponent
                                id='featureType'
                                value='Rect'
                                dataSource={['Rect', 'Dot']}
                                change={(args: ChangeEventArgs) => {
                                    bulletChartInstance.type = args.value as FeatureType;
                                    bulletChartInstance.refresh();
                                }}
                            ></DropDownListComponent>


                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Value Color:</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <ColorPickerComponent
                                value='#000000'
                                mode='Palette'
                                change={(args: ColorPickerEventArgs) => {
                                    bulletChartInstance.valueFill = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                }}></ColorPickerComponent>
                        </td>
                    </tr>
                    <tr style={{ height: '50px' }}>
                        <td style={{ width: '50%' }}>
                            <div className='prop-text'>Target Color:</div>
                        </td>
                        <td style={{ width: '50%', textAlign: 'center' }}>
                            <ColorPickerComponent
                                value='#000000'
                                mode='Palette'
                                change={(args: ColorPickerEventArgs) => {
                                    bulletChartInstance.targetColor = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                }}></ColorPickerComponent>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a customization of feature bar and comparative bar type, width and color in bullet chart.
                </p>
            </div>
            <div id="description">
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
                </p>
            </div>
        </ div>
    )

    function bulletLoad(args: IBulletLoadedEventArgs): void {
        loadBulletChartTheme(args);
    }
}
export default BulletChartBarCustomization;
