import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, PieSeries, AccumulationTheme, IAccLoadedEventArgs, IAccTextRenderEventArgs, AccumulationLegend, ILoadedEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadAccumulationChartTheme } from './theme-color';
const SAMPLE_CSS = `
  .control-fluid {
    padding: 0px !important;
  }
  .donut-chart {
    align: center;
  }
`;


let updatedData = [
    { x: 'Apple', y: 7.8451 },
    { x: 'Google', y: 13.4167 },
    { x: 'Amazon', y: 6.9403 },
    { x: 'Microsoft', y: 20.7127 },
    { x: 'IBM', y: 76.2822 },
    { x: 'Oracle', y: 21.0090 },
    { x: 'Netflix', y: 16.8242 }
];
let updatedData2 = [
    { x: 'Apple', y: 10.9899 },
    { x: 'Google', y: 14.2521 },
    { x: 'Amazon', y: 9.8100 },
    { x: 'Microsoft', y: 20.4205 },
    { x: 'IBM', y: 100.6536 },
    { x: 'Oracle', y: 26.0708 },
    { x: 'Netflix', y: 27.4937 }
];
let updatedData3 = [
    { x: 'Apple', y: 17.4344 },
    { x: 'Google', y: 16.1018 },
    { x: 'Amazon', y: 10.9887 },
    { x: 'Microsoft', y: 24.0142 },
    { x: 'IBM', y: 117.6709 },
    { x: 'Oracle', y: 24.9828 },
    { x: 'Netflix', y: 11.8551 }
];
let updatedData4 = [
    { x: 'Apple', y: 14.5929 },
    { x: 'Google', y: 22.1492 },
    { x: 'Amazon', y: 14.8658 },
    { x: 'Microsoft', y: 26.9842 },
    { x: 'IBM', y: 118.2763 },
    { x: 'Oracle', y: 28.5474 },
    { x: 'Netflix', y: 35.2718 }
];
let updatedData5 = [
    { x: 'Apple', y: 20.4231 },
    { x: 'Google', y: 28.3890 },
    { x: 'Amazon', y: 16.5876 },
    { x: 'Microsoft', y: 36.2762 },
    { x: 'IBM', y: 113.4907 },
    { x: 'Oracle', y: 34.4296 },
    { x: 'Netflix', y: 57.4951 }
];
let updatedData6 = [
    { x: 'Apple', y: 27.0239 },
    { x: 'Google', y: 30.9638 },
    { x: 'Amazon', y: 23.8494 },
    { x: 'Microsoft', y: 40.9778 },
    { x: 'IBM', y: 99.4267 },
    { x: 'Oracle', y: 35.4508 },
    { x: 'Netflix', y: 91.8956 }
];
let updatedData7 = [
    { x: 'Apple', y: 24.0368 },
    { x: 'Google', y: 38.1172 },
    { x: 'Amazon', y: 34.8921 },
    { x: 'Microsoft', y: 49.8084 },
    { x: 'IBM', y: 100.0202 },
    { x: 'Oracle', y: 34.6261 },
    { x: 'Netflix', y: 102.0304 }
];
let updatedData8 = [
    { x: 'Apple', y: 35.2487 },
    { x: 'Google', y: 46.9350 },
    { x: 'Amazon', y: 48.2920 },
    { x: 'Microsoft', y: 66.5079 },
    { x: 'IBM', y: 108.4717 },
    { x: 'Oracle', y: 41.7164 },
    { x: 'Netflix', y: 165.3743 }
];
let updatedData9 = [
    { x: 'Apple', y: 44.9396 },
    { x: 'Google', y: 56.0381 },
    { x: 'Amazon', y: 81.8891 },
    { x: 'Microsoft', y: 95.1360 },
    { x: 'IBM', y: 103.0934 },
    { x: 'Oracle', y: 43.7122 },
    { x: 'Netflix', y: 319.2903 }
];
let updatedData10 = [
    { x: 'Apple', y: 50.2883 },
    { x: 'Google', y: 59.4929 },
    { x: 'Amazon', y: 89.2447 },
    { x: 'Microsoft', y: 124.6044 },
    { x: 'IBM', y: 103.0097 },
    { x: 'Oracle', y: 49.6689 },
    { x: 'Netflix', y: 328.8713 }
];

const UpdatePieDataSource = () => {
    const pieRef = useRef<AccumulationChartComponent>(null);
    let [intervalId, setIntervalId] = useState<any | null>(null);
    let [year, setYear] = useState(10);
    let [yearIndex, setYearIndex] = useState(2);

    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IAccLoadedEventArgs): void => {
        yearIndex = 2;
        year = 10;
        args.accumulation.centerLabel.text = "2010";
        loadAccumulationChartTheme(args);

        updateData(args);
    };
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let  chart:  Element  =  document.getElementById('donut-container');
        chart.setAttribute('title',  '');
    };

    const updateData = (args: IAccLoadedEventArgs): void => {
        updateClearInterval();
        intervalId = setInterval(function () {
            let container = document.getElementById('donut-container');
            if (container && container.id === args.chart.element.id) {
                let newData = (eval('updatedData' + yearIndex) || []).map(function (item: { x: string; y: number; }) {
                    return { x: item.x, y: item.y }
                        ;
                });
                year = year < 20 ? year + 1 : 10;
                args.accumulation.centerLabel.text = "20" + year;
                if (args.accumulation.series.length > 0) {
                    args.accumulation.series[0].setData(newData, 500);
                }
                yearIndex = yearIndex < 10 ? yearIndex + 1 : 2;

            }
            else {
                updateClearInterval();
            }
        }, 1500);
    };
    const updateClearInterval = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    };
    const textRender = (args: IAccTextRenderEventArgs): void => {
        args.text = Browser.isDevice ? String(args.point.x) : String(args.point.x + ": " + "$" + args.text);
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <AccumulationChartComponent
                    id='donut-container'
                    ref={pieRef}
                    title='Average Stock Market Prices of Leading Tech Giants'
                    style={{ textAlign: 'center' }}
                    titleStyle={{ size: '18px' }}
                    load={load.bind(this)}
                    loaded={onChartLoad.bind(this)}
                    textRender={textRender}
                    legendSettings={{ visible: false }}
                    centerLabel={{
                        text: '2010',
                        textStyle: {
                            fontWeight: '600',
                            size: Browser.isDevice ? '25px' : '40px'
                        }
                    }}
                    enableBorderOnMouseMove={false}
                    width={Browser.isDevice ? '100%' : '75%'}
                >
                    <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective
                            dataSource={updatedData}
                            xName='x'
                            yName='y'
                            radius='75%'
                            innerRadius='65%'
                            dataLabel={{ visible: true, position: 'Outside', font: { fontWeight: '600' }, connectorStyle: { type: 'Line', width: 2, length: '18' } }}
                        />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>

            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how the data source for the donut chart can dynamically update at regular intervals
                    over a span of years.
                </p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a donut chart that displays the average stock market
                    prices of leading tech giants, with each entry featuring the company name and corresponding stock price. The
                    donut chart updates dynamically using the
                    <code>setData</code> method to show the progression of stock prices from 2010 to 2020.
                </p>
                <p>
                    More information about the donut series can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/documentation/accumulation-chart/pie-dough-nut/#doughnut-chart"
                        aria-label="Navigate to the documentation for Doughnut Chart in TypeScript Accumulation Chart control">documentation
                        section</a>.
                </p>
            </div>
        </div>
    );
};

export default UpdatePieDataSource;
