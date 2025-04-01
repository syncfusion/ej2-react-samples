import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, DataLabel, Category, Legend, Tooltip, Highlight, ILoadedEventArgs, IPointRenderEventArgs, Series, ITooltipRenderEventArgs, IAxisLabelClickEventArgs } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { bubbleFabricColors, pointFabricColors, pointMaterialDarkColors, bubbleMaterialDarkColors, bubbleMaterialColors, pointMaterialColors, bubbleBootstrap5DarkColors, pointBootstrap5DarkColors, bubbleBootstrap5Colors, pointBootstrap5Colors, bubbleBootstrapColors, pointBootstrapColors, bubbleHighContrastColors, pointHighContrastColors, bubbleFluentDarkColors, pointFluentDarkColors, bubbleFluentColors, pointFluentColors, bubbleTailwindDarkColors, pointTailwindDarkColors, bubbleTailwindColors, pointTailwindColors, bubbleMaterial3Colors, pointMaterial3Colors, bubbleMaterial3DarkColors, pointMaterial3DarkColors, bubbleFluent2Colors, pointFluent2Colors, bubbleFluent2HighContrastColors, pointFluent2HighContrastColors, bubbleFluent2DarkColors, pointFluent2DarkColors, pointTailwind3Colors, pointTailwind3DarkColors, loadChartTheme, bubbleTailwind3DarkColors, bubbleTailwind3Colors } from './theme-color';

const SAMPLE_CSS = `
   #control-container {
        padding: 0px !important;
    }

    .no-underline {
      text-decoration: none !important;
      cursor: auto !important;

    }

    #drilldown0_AxisLabel_0,
    #drilldown0_AxisLabel_1,
    #drilldown0_AxisLabel_2,
    #drilldown0_AxisLabel_3,
    #drilldown0_AxisLabel_4,
    #drilldown_Series_0_Point_0,
    #drilldown_Series_0_Point_1,
    #drilldown_Series_0_Point_2,
    #drilldown_Series_0_Point_3,
    #drilldown_Series_0_Point_4,
    #drilldown0_AxisLabel_5 {
           text-decoration: underline;
           cursor: pointer;

    }

    #category:hover {
        cursor: pointer;
    }`
const ColumnDrilldown = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const chartRef = useRef(null);
    let clicked = false;
    let data = ([
        { y: 4778, drilldown: 'Asia' },
        { y: 1481, drilldown: 'Africa' },
        { y: 746, drilldown: 'Europe' },
        { y: 379, drilldown: 'North America' },
        { y: 46, drilldown: 'Oceania' }
    ]);
    let title: string = 'Top Populated Continents of 2023';
    let subTitle: string = 'A Look at Population Rankings and Trends in 2023';
    let categoryText = '';
  
    const loaded: (args: ILoadedEventArgs) => void = (args) => {
        let chart: Element = document.getElementById('drilldown');
        chart.setAttribute('title', '');
        if (clicked) {
            for (let i = 0; i <= 6; i++) {
                const axisLabel = document.getElementById(`drilldown0_AxisLabel_${i}`);
                if (axisLabel) {
                    axisLabel.classList.add('no-underline');
                }
                const seriesElement = document.getElementById(`drilldown_Series_0_Point_${i}`);
                if (seriesElement) {
                    seriesElement.classList.add('no-underline');
                }
            }
        }
    };
    const onLoad = (args) => {
        loadChartTheme(args);
    };

    const onPointRender = (args) => {
        if (!clicked) {
            let selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'material';

            const colorSet = {
                'fabric': [bubbleFabricColors, pointFabricColors],
                'material-dark': [bubbleMaterialDarkColors, pointMaterialDarkColors],
                'material': [bubbleMaterialColors, pointMaterialColors],
                'bootstrap5-dark': [bubbleBootstrap5DarkColors, pointBootstrap5DarkColors],
                'bootstrap5': [bubbleBootstrap5Colors, pointBootstrap5Colors],
                'bootstrap': [bubbleBootstrapColors, pointBootstrapColors],
                'highcontrast': [bubbleHighContrastColors, pointHighContrastColors],
                'fluent-dark': [bubbleFluentDarkColors, pointFluentDarkColors],
                'fluent': [bubbleFluentColors, pointFluentColors],
                'tailwind-dark': [bubbleTailwindDarkColors, pointTailwindDarkColors],
                'tailwind': [bubbleTailwindColors, pointTailwindColors],
                'material3': [bubbleMaterial3Colors, pointMaterial3Colors],
                'material3-dark': [bubbleMaterial3DarkColors, pointMaterial3DarkColors],
                'fluent2': [bubbleFluent2Colors, pointFluent2Colors],
                'fluent2-highcontrast': [bubbleFluent2HighContrastColors, pointFluent2HighContrastColors],
                'fluent2-dark': [bubbleFluent2DarkColors, pointFluent2DarkColors],
                'tailwind3-dark': [bubbleTailwind3DarkColors, pointTailwind3DarkColors],
                'tailwind3': [bubbleTailwind3Colors, pointTailwind3Colors]
            };

            const themeColors = colorSet[selectedTheme] || [bubbleMaterialColors, pointMaterialColors];
            args.fill = themeColors[1][args.point.index % 10];
            args.border.color = themeColors[1][args.point.index % 10];
        }
    };
    const pointClick = (args: IPointRenderEventArgs) => {
        args.series.fill = args.point.color;
        if (args.point.index !== 6) {
            args.series.yAxis.interval = null;
            if (!args.series.chart.theme.includes('Dark') && args.series.chart.theme !== 'HighContrast' && args.series.chart.theme !== 'Fluent2HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "black";
            }
            else if (args.series.chart.theme === 'Material3Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
            }
            else if (args.series.chart.theme === 'FluentDark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
            }
            else if (args.series.chart.theme === 'Fluent2Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#ADADAD";
            }
            else if (args.series.chart.theme === 'Bootstrap5Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
            }
            else if (args.series.chart.theme === 'TailwindDark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
            }
            else if (args.series.chart.theme === 'Tailwind3Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
            }
            else if (args.series.chart.theme === 'HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "#969696";
            }
            else if (args.series.chart.theme === 'Fluent2HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
            }
            if (!clicked) {
                document.getElementById("text")!.innerHTML = String(args.point.x);
                document.getElementById("category")!.style.visibility = "visible";
                document.getElementById("symbol")!.style.visibility = "visible";
                document.getElementById("text")!.style.visibility = "visible";
                if (args.point.index === 0) {
                    args.series.chart.title = "Top Populated Countries of Asia - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 1422,
                            drilldown: 'China'
                        },
                        {
                            y: 1438,
                            drilldown: 'India'
                        },
                        {
                            y: 278,
                            drilldown: 'Indonesia'
                        },
                        {
                            y: 240,
                            drilldown: 'Pakistan'
                        },
                        {
                            y: 173,
                            drilldown: 'Bangladesh'
                        },
                        {
                            y: 125,
                            drilldown: 'Japan'
                        },
                        {
                            y: 117,
                            drilldown: 'Philippines'
                        },
                        {
                            y: 99,
                            drilldown: 'Vietnam'
                        }
                    ];
                }
                if (args.point.index === 1) {
                    args.series.chart.title = "Top Populated Countries of Africa - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 223,
                            drilldown: 'Nigeria'
                        },
                        {
                            y: 126,
                            drilldown: 'Ethiopia'
                        },
                        {
                            y: 113,
                            drilldown: 'Egypt'
                        },
                        {
                            y: 68,
                            drilldown: 'Tanzania'
                        },
                        {
                            y: 60,
                            drilldown: 'South Africa'
                        },
                        {
                            y: 55,
                            drilldown: 'Kenya'
                        },
                        {
                            y: 48,
                            drilldown: 'Uganda'
                        }
                    ];
                }
                if (args.point.index === 2) {
                    args.series.chart.title = "Top Populated Countries of Europe - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 143,
                            drilldown: 'Russia'
                        },
                        {
                            y: 84,
                            drilldown: 'Germany'
                        },
                        {
                            y: 67,
                            drilldown: 'United Kingdom'
                        },
                        {
                            y: 65,
                            drilldown: 'France'
                        },
                        {
                            y: 59,
                            drilldown: 'Italy'
                        },
                        {
                            y: 47,
                            drilldown: 'Spain'
                        }
                    ];
                }
                if (args.point.index === 3) {
                    args.series.chart.title = "Top Populated Countries of North America - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 339,
                            drilldown: 'United States'
                        },
                        {
                            y: 127,
                            drilldown: 'Mexico'
                        },
                        {
                            y: 39,
                            drilldown: 'Canada'
                        },
                        {
                            y: 19,
                            drilldown: 'Guatemala'
                        },
                        {
                            y: 10,
                            drilldown: 'Honduras'
                        },
                        {
                            y: 6,
                            drilldown: 'El Salvador'
                        },
                        {
                            y: 6,
                            drilldown: 'Nicaragua'
                        },
                        {
                            y: 5,
                            drilldown: 'Costa Rica'
                        }
                    ];
                }
                if (args.point.index === 4) {
                    args.series.chart.title = "Top Populated Countries of Oceania - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 26,
                            drilldown: 'Australia'
                        },
                        {
                            y: 9,
                            drilldown: 'Papua New Guinea'
                        },
                        {
                            y: 5,
                            drilldown: 'New Zealand'
                        }
                    ];
                }
            }
        }
    }
    
    const onAxisLabelClick = (args: IAxisLabelClickEventArgs) => {
        if (args.axis.name === "primaryXAxis") {
            args.chart.series[0].fill = (args.chart.series[0] as Series).points[args.index].color;
            if (args.index !== 6) {
                args.chart.primaryYAxis.interval = null;
                if (!args.chart.theme.includes('Dark') && args.chart.theme !== 'HighContrast' && args.chart.theme !== 'Fluent2HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "black";
                }
                else if (args.chart.theme === 'Material3Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
                }
                else if (args.chart.theme === 'FluentDark') {
                    args.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
                }
                else if (args.chart.theme === 'Fluent2Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#ADADAD";
                }
                else if (args.chart.theme === 'Bootstrap5Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
                }
                else if (args.chart.theme === 'TailwindDark') {
                    args.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
                }
                else if (args.chart.theme === 'Tailwind3Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
                }
                else if (args.chart.theme === 'HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "#969696";
                }
                else if (args.chart.theme === 'Fluent2HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
                }
                if (!clicked) {
                    document.getElementById("text").innerHTML = args.text;
                    document.getElementById("category").style.visibility = "visible";
                    document.getElementById("symbol").style.visibility = "visible";
                    document.getElementById("text").style.visibility = "visible";
                    if (args.index === 0) {
                        args.chart.title = "Top Populated Countries of Asia - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 1422,
                            drilldown: 'China'
                        },
                        {
                            y: 1438,
                            drilldown: 'India'
                        },
                        {
                            y: 278,
                            drilldown: 'Indonesia'
                        },
                        {
                            y: 240,
                            drilldown: 'Pakistan'
                        },
                        {
                            y: 173,
                            drilldown: 'Bangladesh'
                        },
                        {
                            y: 125,
                            drilldown: 'Japan'
                        },
                        {
                            y: 117,
                            drilldown: 'Philippines'
                        },
                        {
                            y: 99,
                            drilldown: 'Vietnam'
                        }
                        ]
                    }
                    if (args.index === 1) {
                        args.chart.title = "Top Populated Countries of Africa - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 223,
                            drilldown: 'Nigeria'
                        },
                        {
                            y: 126,
                            drilldown: 'Ethiopia'
                        },
                        {
                            y: 113,
                            drilldown: 'Egypt'
                        },
                        {
                            y: 68,
                            drilldown: 'Tanzania'
                        },
                        {
                            y: 60,
                            drilldown: 'South Africa'
                        },
                        {
                            y: 55,
                            drilldown: 'Kenya'
                        },
                        {
                            y: 48,
                            drilldown: 'Uganda'
                        }
                        ]
                    }
                    if (args.index === 2) {
                        args.chart.title = "Top Populated Countries of Europe - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 143,
                            drilldown: 'Russia'
                        },
                        {
                            y: 84,
                            drilldown: 'Germany'
                        },
                        {
                            y: 67,
                            drilldown: 'United Kingdom'
                        },
                        {
                            y: 65,
                            drilldown: 'France'
                        },
                        {
                            y: 59,
                            drilldown: 'Italy'
                        },
                        {
                            y: 47,
                            drilldown: 'Spain'
                        }
                        ]
                    }
                    if (args.index === 3) {
                        args.chart.title = "Top Populated Countries of North America - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 339,
                            drilldown: 'United States'
                        },
                        {
                            y: 127,
                            drilldown: 'Mexico'
                        },
                        {
                            y: 39,
                            drilldown: 'Canada'
                        },
                        {
                            y: 19,
                            drilldown: 'Guatemala'
                        },
                        {
                            y: 10,
                            drilldown: 'Honduras'
                        },
                        {
                            y: 6,
                            drilldown: 'El Salvador'
                        },
                        {
                            y: 6,
                            drilldown: 'Nicaragua'
                        },
                        {
                            y: 5,
                            drilldown: 'Costa Rica'
                        }
                        ]
                    }
                    if (args.index === 4) {
                        args.chart.title = "Top Populated Countries of Oceania - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 26,
                            drilldown: 'Australia'
                        },
                        {
                            y: 9,
                            drilldown: 'Papua New Guinea'
                        },
                        {
                            y: 5,
                            drilldown: 'New Zealand'
                        }
                        ]
                    }
                }
            }
        }
    
    };

    const goBack = (e) => {
        const chart = chartRef.current;
        chart.title = "Top Populated Continents of 2023";
        chart.subTitle = "A Look at Population Rankings and Trends in 2023";
        chart.primaryXAxis.labelStyle.color = "blue";
        chart.primaryYAxis.interval = 1000;
        chart.series[0].dataSource = data;
        clicked = false;
        (e.target as HTMLButtonElement).style.visibility = 'hidden';
        document.getElementById(('symbol')).style.visibility = 'hidden';
        document.getElementById(('text')).style.visibility = 'hidden';
    };
    const tooltipRender = (args: ITooltipRenderEventArgs) => {
        args.text = args.text.replace(/\d+/g, (num: string) =>
            Number(num).toLocaleString('en-US')
        );
    };

    return (
        <div className='control-pane'>
             <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div id="link">
                    <a id="category" style={{ visibility: clicked ? 'visible' : 'hidden', display: 'inline-block', cursor: 'pointer' }} onClick={goBack}>Population</a>
                    <p style={{ visibility: clicked ? 'visible' : 'hidden', display: 'inline-block' }} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                    <p id="text" style={{ visibility: clicked ? 'visible' : 'hidden', display: 'inline-block' }}>{categoryText}</p>
                </div>

                <ChartComponent
                    id="drilldown"
                    style={{ textAlign: "center" }}
                    ref={chartRef}
                    primaryXAxis={{
                        valueType: 'Category',
                        labelStyle: { color: 'blue' },
                        interval: 1,
                        majorGridLines: { width: 0 },
                        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate90',
                        labelRotation: Browser.isDevice ? -45 : 0,
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }}
                    primaryYAxis={{
                        interval: 1000,
                        title: 'Population (in Millions)',
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 }
                    }}
                    width={Browser.isDevice ? '100%' : '75%'}
                    title={title}
                    subTitle={subTitle}
                    tooltip={{ enable: true, header: "<b>Population - 2023</b>", format: '${point.x}: <b>${point.y}M</b>' }}
                    legendSettings={{ visible: false }}
                    chartArea={{ border: { width: 0 } }}
                    load={onLoad.bind(this)}
                    loaded={loaded.bind(this)}
                    pointRender={onPointRender}
                    pointClick={pointClick}
                    axisLabelClick={onAxisLabelClick}
                    tooltipRender={tooltipRender.bind(this)}
                >
                    <Inject services={[ColumnSeries, DataLabel, Category, Legend, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={data}
                            xName='drilldown'
                            yName='y'
                            name='Population'
                            type='Column'
                            cornerRadius={{ topLeft: 5, topRight: 5 }}
                            marker = {{
                                dataLabel: {
                                   visible: true,
                                   position: 'Outer',
                               }
                           }}
                            width={2}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This drilldown column chart example visualizes the population distribution across different continents. Users
                    can click on the columns to explore further details, allowing for an interactive analysis of population
                    statistics by country within each continent.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a drilldown column chart. Each column represents a
                    continent, and users can drill down to view detailed population statistics by country upon selection. This
                    functionality enhances data exploration and provides a clearer understanding of demographic distributions.
                </p>
                <p>
                    Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in
                    touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                    <code>ColumnSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the column series can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/Chart-types/column"
                        aria-label="Navigate to the documentation for Column Chart in TypeScript Chart control"> documentation
                        section</a>.
                </p>
            </div>
        </div>
    );
};

export default ColumnDrilldown;
