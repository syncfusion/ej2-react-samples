/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, FeatureType, IBulletLoadedEventArgs, ChartTheme, BulletTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { SliderComponent, ColorPickerComponent, ColorPickerEventArgs, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class BulletChartBarCustomization extends SampleBase<{}, {}> {
    bulletChartInstance: BulletChartComponent;
    public bulletLoad = (args: IBulletLoadedEventArgs) => {
        let  chart:  Element  =  document.getElementById('bar-customization');
        chart.setAttribute('title',  '');
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
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
                        id='bar-customization'
                        ref={chart => this.bulletChartInstance = chart}
                        width={'100%'}
                        animation={{enable: false }}
                        tooltip={{ enable: true }}
                        valueField='value'
                        targetField='target'
                        minimum={0}
                        maximum={300}
                        interval={50}
                        title='New Customers' 
                        titlePosition={ Browser.isDevice ? 'Top' : 'Left'}                   
                        subtitle='in Thousands'  
                        load={this.bulletLoad.bind(this)}                    
                        dataSource={[{ value: 270, target: 250 }]}>
                        <Inject services={[BulletTooltip]}/>
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
                    <tr style= {{ height: '50px'}}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Actual Value:</div>
                            </td>
                            <td style={{ width: '50%' }}>
                                <SliderComponent id='actualValue'
                                    min={0}
                                    max={300}
                                    value={270}
                                    tooltip={{isVisible: true}}
                                    change={(args: SliderChangeEventArgs)=>{
                                        this.bulletChartInstance.dataSource[0].value = args.value;
                                        this.bulletChartInstance.refresh();
                                    }}></SliderComponent>
                            </td>
                        </tr>
                        <tr style= {{ height: '50px'}}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Target Value:</div>
                            </td>
                            <td style={{ width: '50%' }}>
                                <SliderComponent 
                                    min={0}
                                    max={300}
                                    value={250}
                                    tooltip={{isVisible: true}}
                                    change={(args: SliderChangeEventArgs)=>{
                                        this.bulletChartInstance.dataSource[0].target = args.value
                                        this.bulletChartInstance.refresh();
                                    }}id='targetValue'></SliderComponent>
                            </td>
                        </tr>
                        <tr style= {{ height: '50px'}}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Feature Mode</div>
                            </td>
                            <td style={{ width: '50%' }}>
                                <DropDownListComponent
                                    id='featureType'
                                    value='Rect'
                                    dataSource={['Rect', 'Dot']}
                                    change={(args: ChangeEventArgs) => {
                                        this.bulletChartInstance.type = args.value as FeatureType;
                                        this.bulletChartInstance.refresh();
                                    }}
                                ></DropDownListComponent>


                            </td>
                        </tr>
                        <tr style= {{ height: '50px'}}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Value Color:</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <ColorPickerComponent
                                    value='#000000'
                                    mode='Palette'
                                    change={(args: ColorPickerEventArgs) => {
                                        this.bulletChartInstance.valueFill = args.currentValue.hex;
                                        this.bulletChartInstance.refresh();
                                    }}></ColorPickerComponent>
                            </td>
                        </tr>
                        <tr style= {{ height: '50px'}}>
                            <td style={{ width: '50%' }}>
                                <div className='prop-text'>Target Color:</div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <ColorPickerComponent
                                    value='#000000'
                                    mode='Palette'
                                    change={(args: ColorPickerEventArgs) => {
                                        this.bulletChartInstance.targetColor = args.currentValue.hex;
                                        this.bulletChartInstance.refresh();
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
    }
}