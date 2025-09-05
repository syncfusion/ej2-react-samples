/**
 * Sample for No Data Template
 */
import * as React from "react";
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries, ChartTheme, SplineSeries, Category, Tooltip, ILoadedEventArgs, Inject, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let data1: any[] = [
    { x: 'January', y: 19173 },
    { x: 'February', y: 17726 },
    { x: 'March', y: 19874 },
    { x: 'April', y: 19391 },
    { x: 'May', y: 20072 },
    { x: 'June', y: 19233 }
];
const SAMPLE_CSS = `
#noDataTemplateContainer {
    height: inherit;
    width: inherit;
}

.dark-bg {
    background-color: #000000;
    color: #ffffff;
}

.material3-dark .dark-bg, .fluent2-highcontrast .dark-bg {
    background-color: #1c1b1f;
}

.fluent2-dark .dark-bg {
    background-color: #1f1f1f;
}

.tailwind3-dark .dark-bg {
    background-color: #111827;
}

.bootstrap5_3-dark .dark-bg {
    background-color: #212529;
}

.light-bg {
    background-color: #fafafa;
    color: #000000;
}

.template-align img {
    max-width: 150px;
    /* Adjust size as needed */
    max-height: 150px;
    margin-top: 55px;
}

.load-data-btn {
    border-radius: 4px;
}

.template-align {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
}

.control-fluid {
    padding: 0px !important;
}

#syncfusionButtonContainer {
    margin-top: 5px;
}`;
const NoDataTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [hasData, setHasData] = useState(false);
    let chartInstance = useRef<ChartComponent>(null);
    const buttonContainerRef = useRef<HTMLDivElement>(null);

    const loadData = () => {
        if (chartInstance.current) {
            chartInstance.current.series[0].dataSource = data1;
            setHasData(true);
            
            const values = data1.map(d => d.y);
            const min = Math.min(...values);
            const max = Math.max(...values);
            const range = max - min;
            chartInstance.current.primaryYAxis.minimum = Math.floor(min - range * 0.1);
            chartInstance.current.primaryYAxis.maximum = Math.ceil(max + range * 0.1);
            chartInstance.current.primaryYAxis.interval = Math.ceil(range / 5);
            chartInstance.current.series[0].animation.enable = true;
            chartInstance.current.refresh();
        }
    };
    
    const noDataTemplate: string = `
        <div id="noDataTemplateContainer" class="light-bg">
            <div class="template-align">
                <img src="src/chart/images/no-data.png" alt="No Data"/>
            </div>
            <div class="template-align">
                <p style="font-size: 15px; margin: 10px 0 10px;"><strong>No data available to display.</strong></p>
            </div>
            <div class="template-align">
                <div id="syncfusionButtonContainer"></div>
            </div>
        </div>
    `;

    const load = (args: ILoadedEventArgs): void => {
            loadChartTheme(args);
        };

    const loaded = (args: ILoadedEventArgs): void => {
        let selectedTheme = loadChartTheme(args);
        const noDataDiv: Element = document.getElementById("noDataTemplateContainer");
        if (noDataDiv) {
            noDataDiv.className = selectedTheme.indexOf("Dark") > -1 || selectedTheme.indexOf("HighContrast") > -1 ? 'dark-bg' : 'light-bg';
        }
        if (!hasData) {
            const buttonContainer = document.getElementById("syncfusionButtonContainer");
            if (buttonContainer && !buttonContainer.hasChildNodes()) {
                // Create the button element using React.createElement
                const buttonElement = React.createElement(ButtonComponent, {
                    id: "loadDataButton",
                    content: "Load Data",
                    iconCss: "e-icons e-refresh",
                    cssClass: "load-data-btn e-outline",
                    isPrimary: false,
                    onClick: loadData
                });

                const root = createRoot(buttonContainer);
                root.render(buttonElement);
            }
        }
    };

    useEffect(() => {
        if (hasData) {
            const buttonContainer = document.getElementById("syncfusionButtonContainer");
            if (buttonContainer) {
                ReactDOM.unmountComponentAtNode(buttonContainer);
            }
        }
    }, [hasData]);

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <ChartComponent
                    id='charts'
                    ref={chartInstance}
                    primaryXAxis={{ valueType: 'Category', 
                        majorGridLines: {
                            width: 0
                        },
                        majorTickLines: {
                            width: 0
                        }, 
                    }}
                    chartArea={{border: {width: 0}}}
                    primaryYAxis={{
                        title: 'Production (in million pounds)',
                        titleStyle: {
                            fontWeight: '600'
                        },
                        majorTickLines: {
                            width: 0
                        },
                        lineStyle: {
                            width: 0
                        }
                    }} loaded={loaded} load={load.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}M</b>', header: 'Milk Production', }} noDataTemplate={noDataTemplate} title="Milk Production in US - 2025" subTitle="Source: nass.usda.gov" width='100%'>
                    <Inject services={[LineSeries, Category, Tooltip, SplineSeries, SplineAreaSeries]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={hasData ? data1 : []} xName='x' marker={{visible: true, width: 7, height: 7}} animation={{enable: true}} yName='y' type='Line' width={2} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates handling the empty data chart using no data template. This template is used to display a custom message or image when the data is not available in the chart.</p>
            </div>
            <div id="description">
                <p>
                    In this example, the <code>noDataTemplate</code> property is assigned with an HTML template that includes an image, a message indicating data unavailability, and a button to load new data into the chart. Once data is provided, a line chart is displayed.
                </p>
                <p>
                    <b>Tooltip</b> is enabled in the chart. To view a tooltip, hover over a data point or tap on it if you're using a touch-enabled device.
                </p>
            </div>
        </div >
    )
}
export default NoDataTemplate;