/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, Inject, BulletTooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class BulletChartTooltip extends SampleBase<{}, {}> {

    public tooltipTemplate(props): any {      
        return (
            <div id="wrap">
            <table style={{width:'100%', backgroundColor: '#ffffff', borderSpacing: '0px', borderCollapse:'separate', border: '1px solid grey', borderRadius:'10px', paddingTop:'5px', paddingBottom:'5px'}}>
            <tbody>
                 <tr>
                    <td style={{fontWeight:'bold', color: 'black', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px'}}>Sales</td>
                  </tr>
                  <tr>
                    <td style={{paddingLeft: '5px', color:'black', paddingRight: '5px', paddingBottom: '2px'}}>Target   : ${props.target}K </td>
                   </tr>
                    <tr>
                        <td style={{paddingLeft: '5px', color:'black', paddingRight: '5px'}}>Current : {props.value} </td>
                    </tr>
                    </tbody>
            </table>
    </div>

        );
    }

    public ChartToolTemplate: any = this.tooltipTemplate;
    public bulletLoad = (args: IBulletLoadedEventArgs) => {
        let  chart:  Element  =  document.getElementById('Revenue');
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
                <div className='control-section'>
                    <BulletChartComponent id='Revenue'
                        style={{ textAlign: "center" }}
                        width={Browser.isDevice ? '100%' : '70%'}
                        tooltip={{ enable: true, template: this.ChartToolTemplate }}
                        animation={{enable: false }}
                        valueField='value'
                        targetField='target'
                        minimum={0}
                        maximum={100}
                        interval={10}
                        title='Revenue YTD'                      
                        subtitle='US $(in thousands)'                    
                        labelFormat='${value}K'
                        load={this.bulletLoad.bind(this)}      
                        dataSource={[{ value: 70, target: 50 }]}>
                        <Inject services={[BulletTooltip]}/>
                        <BulletRangeCollectionDirective>
                            <BulletRangeDirective end={30} color="#599C20"></BulletRangeDirective>
                            <BulletRangeDirective end={60} color="#EFC820"></BulletRangeDirective>
                            <BulletRangeDirective end={100} color="#CA4218"></BulletRangeDirective>
                        </BulletRangeCollectionDirective>
                    </BulletChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample illustrates bullet chart with tooltip customization such as template.
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