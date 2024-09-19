/**
 * Default sample for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, IBulletLoadedEventArgs, ChartTheme, BulletTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;

function BulletChartDefault() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        < div className='control-pane' >
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <BulletChartComponent id='Revenue'
                    style={{ textAlign: "center" }}
                    animation={{ enable: false }}
                    width={Browser.isDevice ? '100%' : '80%'}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={300}
                    interval={50}
                    title='Revenue'
                    titlePosition={Browser.isDevice ? 'Top' : 'Left'}
                    labelFormat='$ {value}K'
                    subtitle='U.S. $'
                    dataSource={[{ value: 270, target: 250 }]}
                    margin={{ left: (Browser.isDevice ? 10 : 60) }}
                    load={bulletLoad.bind(this)}>
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={150} ></BulletRangeDirective>
                        <BulletRangeDirective end={250} ></BulletRangeDirective>
                        <BulletRangeDirective end={300} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>

                <BulletChartComponent id='Profit'
                    style={{ textAlign: "center" }}
                    width={Browser.isDevice ? '100%' : '80%'}
                    animation={{ enable: false }}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={30}
                    interval={5}
                    labelFormat='{value}%'
                    title='Profit'
                    subtitle='%'
                    margin={{ left: Browser.isDevice ? 10 : 80 }}
                    titlePosition={Browser.isDevice ? 'Top' : 'Left'}
                    load={bulletLoad.bind(this)}
                    dataSource={[{ value: 23, target: 27 }]}
                >
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={20} ></BulletRangeDirective>
                        <BulletRangeDirective end={25} ></BulletRangeDirective>
                        <BulletRangeDirective end={30} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>

                <BulletChartComponent
                    id='Average'
                    style={{ textAlign: "center" }}
                    width={Browser.isDevice ? '100%' : '80%'}
                    animation={{ enable: false }}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={600}
                    interval={100}
                    title='Avg Order Size'
                    subtitle='U.S. $'
                    labelFormat='${value}'
                    margin={{ left: Browser.isDevice ? 10 : 22 }}
                    titlePosition={Browser.isDevice ? 'Top' : 'Left'}
                    load={bulletLoad.bind(this)}
                    dataSource={[{ value: 350, target: 550 }]}
                >
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={350} ></BulletRangeDirective>
                        <BulletRangeDirective end={500} ></BulletRangeDirective>
                        <BulletRangeDirective end={600} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>

                <BulletChartComponent
                    id='Customers'
                    style={{ textAlign: "center" }}
                    width={Browser.isDevice ? '100%' : '80%'}
                    animation={{ enable: false }}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={2500}
                    interval={500}
                    title='New Customers'
                    subtitle='Count'
                    margin={{ left: Browser.isDevice ? 10 : 19 }}
                    titlePosition={Browser.isDevice ? 'Top' : 'Left'}
                    load={bulletLoad.bind(this)}
                    dataSource={[{ value: 1600, target: 2100 }]}
                >
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={1700} ></BulletRangeDirective>
                        <BulletRangeDirective end={2000} ></BulletRangeDirective>
                        <BulletRangeDirective end={2500} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>

                <BulletChartComponent
                    id='Rating'
                    style={{ textAlign: "center" }}
                    width={Browser.isDevice ? '100%' : '80%'}
                    animation={{ enable: false }}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    minimum={0}
                    maximum={5}
                    interval={1}
                    title='Cust Satifaction'
                    subtitle='Top Rating of 5'
                    titlePosition={Browser.isDevice ? 'Top' : 'Left'}
                    load={bulletLoad.bind(this)}
                    margin={{ left: Browser.isDevice ? 10 : 18 }}
                    dataSource={[{ value: 4.9, target: 4 }]}
                >
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={3.7} ></BulletRangeDirective>
                        <BulletRangeDirective end={4.2} ></BulletRangeDirective>
                        <BulletRangeDirective end={5} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>
            </div>
            <div id='action-description'>
                <p>
                    This sample illustrates a default bullet chart to compare the feature (value) bar with comparative (target) bar. It includes variety of configurations to change the look and feel of the chart.
                </p>
            </div>
            <div id='description'>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
                </p>
            </div>
        </div >
    )
    function bulletLoad(args: IBulletLoadedEventArgs): void {
        let chartId: string[] = ['Revenue', 'Profit', 'Average', 'Customers', 'Rating'];
        for (let ids of chartId) {
            let chart: Element = document.getElementById(ids);
            chart.setAttribute('title', '');
        }

        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }
}
export default BulletChartDefault;