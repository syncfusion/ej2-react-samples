/**
 * Liveupdate sample for sparkline
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    SparklineComponent, SparklineTheme,
    ISparklineLoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     .spark {
         float: left;
         width: 95%;
         margin-left: 3%;
     }
     .index {
         z-index: 1000;
     }`;


function LiveUpdate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let sparkInstance: SparklineComponent;
    let sparkInstance1: SparklineComponent;
    let sparkInstance2: SparklineComponent;
    let sparkInstance3: SparklineComponent;
    let temp1: number;
    let temp3: number;
    let temp2: number;
    let temp4: number;
    let timer1: any;
    let timer2: any;
    let timer3: any;
    let timer4: any;


    function load(args: ISparklineLoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as SparklineTheme;
    }

    function updateSparkline1(args: ISparklineLoadedEventArgs): void {
        setTimeout(() => {
            if (sparkInstance == null)
                sparkInstance = args.sparkline as SparklineComponent;
            if (temp1 == null)
                temp1 = (sparkInstance.dataSource as Object[]).length - 1;
            if (timer1 != null)
                clearInterval(timer1)
            timer1 = setInterval(() => update(), 500);
        }, 500);
    }

    function updateSparkline2(args: ISparklineLoadedEventArgs): void {
        setTimeout(() => {
            if (sparkInstance1 == null)
                sparkInstance1 = args.sparkline as SparklineComponent;
            if (temp3 == null)
                temp3 = (sparkInstance1.dataSource as Object[]).length - 1;
            if (timer2 != null)
                clearInterval(timer2)
            timer2 = setInterval(() => update2(), 500);
        }, 500);
    }

    function updateSparkline3(args: ISparklineLoadedEventArgs): void {
        setTimeout(() => {
            if (sparkInstance2 == null)
                sparkInstance2 = args.sparkline as SparklineComponent;
            if (temp2 == null)
                temp2 = (sparkInstance2.dataSource as Object[]).length - 1;
            if (timer3 != null)
                clearInterval(timer3)
            timer3 = setInterval(() => update1(), 500);
        }, 500);
    }

    function updateSparkline4(args: ISparklineLoadedEventArgs): void {
        setTimeout(() => {
            if (sparkInstance3 == null)
                sparkInstance3 = args.sparkline as SparklineComponent;
            if (temp4 == null)
                temp4 = (sparkInstance3.dataSource as Object[]).length - 1;
            if (timer4 != null)
                clearInterval(timer4)
            timer4 = setInterval(() => update4(), 500);
        }, 500);
    }

    function update(): void {
        if (sparkInstance && sparkInstance.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 50;
            (sparkInstance.dataSource as Object[]).push({ x: ++temp1, yval: value });
            (sparkInstance.dataSource as Object[]).shift();
            sparkInstance.refresh();
            let cpu: Element = document.getElementById('cpu');
            cpu.innerHTML = ((value / 150) * 100).toFixed(0) + '% ' + ((value * 3) / 100).toFixed(2) + 'GHz';
        }
    }

    function update2(): void {
        if (sparkInstance1 && sparkInstance1.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 80;
            (sparkInstance1.dataSource as Object[]).push({ x: ++temp3, yval: value });
            (sparkInstance1.dataSource as Object[]).shift();
            sparkInstance1.refresh();
            let disk: Element = document.getElementById('disk');
            disk.innerHTML = value.toFixed(0) + '%';
        }
    }

    function update1(): void {
        if (sparkInstance2 && sparkInstance2.element.className.indexOf('e-sparkline') > -1) {
            let value: number = Math.random();
            if (value > 0.6) {
                value = 6 + (value / 10);
            } else {
                value = 6 - (value / 10);
            }
            (sparkInstance2.dataSource as Object[]).push({ x: ++temp2, yval: value });
            (sparkInstance2.dataSource as Object[]).shift();
            sparkInstance2.refresh();
            let memory: Element = document.getElementById('memory');
            let gb: string = parseFloat(value.toString().replace('0', '')).toFixed(1);
            memory.innerHTML = gb + '/15.8 GB (' + ((value / 15.8) * 100).toFixed(0) + '%)';
        }
    }

    function update4(): void {
        if (sparkInstance3 && sparkInstance3.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 80;
            (sparkInstance3.dataSource as Object[]).push({ x: ++temp3, yval: value });
            (sparkInstance3.dataSource as Object[]).shift();
            sparkInstance3.refresh();
            let net: Element = document.getElementById('net');
            net.innerHTML = 'R: ' + value.toFixed(0) + 'Kbps';
        }
    }


    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div id='spark-container' className="row">
                    <div className="cols-sample-area" style={{ "marginTop": "8%" }}>
                        <div className="col-lg-3 col-m-3 col-sm-6">
                            <div className="spark" id="spark-container1">
                                <div className="index" style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                    <b>CPU</b>
                                </div>
                                <div id="cpu" className="index" style={{ "color": "#0877d6", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>26% 1.2GHz</div>
                                <SparklineComponent loaded={updateSparkline1.bind(this)} load={load.bind(this)} ref={m => sparkInstance = m} id='spark1-container'
                                    height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric'
                                    fill='#e8f2fc'
                                    axisSettings={{
                                        minY: 0,
                                        maxY: 150
                                    }}
                                    containerArea={{
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }}
                                    border={{
                                        color: '#0358a0',
                                        width: 1
                                    }}
                                    dataSource={[
                                        { x: 0, yval: 50 },
                                        { x: 1, yval: 30 },
                                        { x: 2, yval: 20 },
                                        { x: 3, yval: 30 },
                                        { x: 4, yval: 50 },
                                        { x: 5, yval: 40 },
                                        { x: 6, yval: 20 },
                                        { x: 7, yval: 10 },
                                        { x: 8, yval: 30 },
                                        { x: 9, yval: 10 },
                                        { x: 10, yval: 40 },
                                        { x: 11, yval: 50 },
                                        { x: 12, yval: 10 },
                                        { x: 13, yval: 30 },
                                        { x: 14, yval: 50 },
                                        { x: 15, yval: 20 },
                                        { x: 16, yval: 10 },
                                        { x: 17, yval: 40 },
                                        { x: 18, yval: 30 },
                                        { x: 19, yval: 40 }
                                    ]}
                                    xName='x' yName='yval'>
                                </SparklineComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-m-3 col-sm-6">
                            <div className="spark" id="spark-container2">
                                <div className='index' style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                    <b>Disk</b>
                                </div>
                                <div id="disk" className="index" style={{ "color": "#b247c6", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>50%</div>
                                <SparklineComponent loaded={updateSparkline2.bind(this)} load={load.bind(this)} ref={m => sparkInstance2 = m} id='spark2-container'
                                    height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric'
                                    fill='#f5e8fc'
                                    axisSettings={{
                                        minY: 4,
                                        maxY: 8
                                    }}
                                    containerArea={{
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }}
                                    border={{
                                        color: '#b247c6',
                                        width: 1
                                    }}
                                    dataSource={[
                                        { x: 0, yval: 6.05 },
                                        { x: 1, yval: 6.03 },
                                        { x: 2, yval: 6.02 },
                                        { x: 3, yval: 6.07 },
                                        { x: 4, yval: 6.05 },
                                        { x: 5, yval: 6.09 },
                                        { x: 6, yval: 6.08 },
                                        { x: 7, yval: 6.01 },
                                        { x: 8, yval: 6.03 },
                                        { x: 9, yval: 6.01 },
                                        { x: 10, yval: 6.07 },
                                        { x: 11, yval: 6.05 },
                                        { x: 12, yval: 6.01 },
                                        { x: 13, yval: 6.06 },
                                        { x: 14, yval: 6.05 },
                                        { x: 15, yval: 6.03 },
                                        { x: 16, yval: 6.01 },
                                        { x: 17, yval: 6.09 },
                                        { x: 18, yval: 6.06 },
                                        { x: 19, yval: 6.05 }
                                    ]}
                                    xName='x' yName='yval'>
                                </SparklineComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-m-3 col-sm-6">
                            <div className="spark" id="spark-container3">
                                <div className="index" style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                    <b>Memory</b>
                                </div>
                                <div id="memory" className="index" style={{ "color": "#5bcc8f", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>6.5/15.8 GB (41%)</div>
                                <SparklineComponent loaded={updateSparkline3.bind(this)} load={load.bind(this)} ref={m => sparkInstance1 = m} id='spark3-container'
                                    height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric'
                                    fill='#e0f9d1'
                                    axisSettings={{
                                        minY: 0,
                                        maxY: 130
                                    }}
                                    containerArea={{
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }}
                                    border={{
                                        color: '#27ad66',
                                        width: 1
                                    }}
                                    dataSource={[
                                        { x: 0, yval: 50 },
                                        { x: 1, yval: 30 },
                                        { x: 2, yval: 20 },
                                        { x: 3, yval: 70 },
                                        { x: 4, yval: 50 },
                                        { x: 5, yval: 20 },
                                        { x: 6, yval: 80 },
                                        { x: 7, yval: 10 },
                                        { x: 8, yval: 30 },
                                        { x: 9, yval: 10 },
                                        { x: 10, yval: 70 },
                                        { x: 11, yval: 50 },
                                        { x: 12, yval: 10 },
                                        { x: 13, yval: 60 },
                                        { x: 14, yval: 50 },
                                        { x: 15, yval: 30 },
                                        { x: 16, yval: 10 },
                                        { x: 17, yval: 20 },
                                        { x: 18, yval: 60 },
                                        { x: 19, yval: 50 }
                                    ]}
                                    xName='x' yName='yval'>
                                </SparklineComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-m-3 col-sm-6">
                            <div className="spark" id="spark-container4">
                                <div className="index" style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                    <b>Ethernet</b>
                                </div>
                                <div id="net" className="index" style={{ "color": "#d1a990", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>6.5/15.8 GB (41%)</div>
                                <SparklineComponent loaded={updateSparkline4.bind(this)} load={load.bind(this)} ref={m => sparkInstance3 = m} id='spark4-container'
                                    height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric'
                                    fill='#F2D8C7'
                                    axisSettings={{
                                        minY: 0,
                                        maxY: 120
                                    }}
                                    containerArea={{
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }}
                                    border={{
                                        color: '#AA907A',
                                        width: 1
                                    }}
                                    dataSource={[
                                        { x: 0, yval: 50 },
                                        { x: 1, yval: 30 },
                                        { x: 2, yval: 20 },
                                        { x: 3, yval: 70 },
                                        { x: 4, yval: 50 },
                                        { x: 5, yval: 20 },
                                        { x: 6, yval: 80 },
                                        { x: 7, yval: 10 },
                                        { x: 8, yval: 30 },
                                        { x: 9, yval: 10 },
                                        { x: 10, yval: 70 },
                                        { x: 11, yval: 50 },
                                        { x: 12, yval: 10 },
                                        { x: 13, yval: 60 },
                                        { x: 14, yval: 50 },
                                        { x: 15, yval: 30 },
                                        { x: 16, yval: 10 },
                                        { x: 17, yval: 20 },
                                        { x: 18, yval: 60 },
                                        { x: 19, yval: 50 }
                                    ]}
                                    xName='x' yName='yval'>
                                </SparklineComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample depicts the various customization options available in sparklines.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices.
                </p>
            </div>
        </div>
    )

}
export default LiveUpdate;