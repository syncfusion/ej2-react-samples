/**
 * Sample for a multi-axis combination chart.
 */
import * as React from 'react';
import {
    AnnotationDirective,
    AnnotationsDirective,
    AreaSeries,
    ChartAnnotation,
    ChartComponent,
    Crosshair,
    DateTimeCategory,
    Highlight,
    ILoadedEventArgs,
    ILegendRenderEventArgs,
    Inject,
    Legend,
    LineSeries,
    SeriesCollectionDirective,
    SeriesDirective,
    SplineSeries,
    Tooltip
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export interface ClimateDataPoint {
    Month: Date;
    TemperatureAnomaly: number;
    AtmosphericCO2: number;
    SeaIceExtent: number;
}

export const climateData: ClimateDataPoint[] = [
    {
        Month: new Date(2025, 0, 1),
        TemperatureAnomaly: 1.75,
        AtmosphericCO2: 426.65,
        SeaIceExtent: 13.11
    },
    {
        Month: new Date(2025, 1, 1),
        TemperatureAnomaly: 1.59,
        AtmosphericCO2: 427.09,
        SeaIceExtent: 14.26
    },
    {
        Month: new Date(2025, 2, 1),
        TemperatureAnomaly: 1.60,
        AtmosphericCO2: 428.15,
        SeaIceExtent: 14.33
    },
    {
        Month: new Date(2025, 3, 1),
        TemperatureAnomaly: 1.51,
        AtmosphericCO2: 429.35,
        SeaIceExtent: 13.73
    },
    {
        Month: new Date(2025, 4, 1),
        TemperatureAnomaly: 1.40,
        AtmosphericCO2: 430.51,
        SeaIceExtent: 12.68
    },
    {
        Month: new Date(2025, 5, 1),
        TemperatureAnomaly: 1.42,
        AtmosphericCO2: 429.95,
        SeaIceExtent: 10.82
    },
    {
        Month: new Date(2025, 6, 1),
        TemperatureAnomaly: 1.37,
        AtmosphericCO2: 427.87,
        SeaIceExtent: 8.02
    },
    {
        Month: new Date(2025, 7, 1),
        TemperatureAnomaly: 1.39,
        AtmosphericCO2: 425.71,
        SeaIceExtent: 5.92
    },
    {
        Month: new Date(2025, 8, 1),
        TemperatureAnomaly: 1.44,
        AtmosphericCO2: 424.82,
        SeaIceExtent: 4.68
    },
    {
        Month: new Date(2025, 9, 1),
        TemperatureAnomaly: 1.48,
        AtmosphericCO2: 425.46,
        SeaIceExtent: 6.08
    },
    {
        Month: new Date(2025, 10, 1),
        TemperatureAnomaly: 1.53,
        AtmosphericCO2: 426.98,
        SeaIceExtent: 9.04
    },
    {
        Month: new Date(2025, 11, 1),
        TemperatureAnomaly: 1.55,
        AtmosphericCO2: 428.12,
        SeaIceExtent: 11.83
    }
];

export const primaryXAxis: Object = {
    valueType: 'DateTimeCategory',
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM',
    edgeLabelPlacement: 'Shift',
    plotOffsetLeft: 10,
    plotOffsetRight: 10,
    majorGridLines: {
        width: 0
    },
    minorGridLines: {
        width: 0
    },
    majorTickLines: {
        width: 0
    },
    lineStyle: {
        width: 0
    },
    labelStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        size: '12px'
    }
};

export const primaryYAxis: Object = {
    title: 'Temperature Anomaly (°C)',
    minimum: 1.2,
    maximum: 1.8,
    interval: 0.1,
    labelFormat: '{value}°C',
    edgeLabelPlacement: 'Shift',
    majorGridLines: {
        width: 1,
        dashArray: '3,4'
    },
    minorGridLines: {
        width: 0
    },
    majorTickLines: {
        width: 0
    },
    lineStyle: {
        width: 1.5,
        color: '#F97316'
    },
    labelStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        size: '12px',
        color: '#EA580C'
    },
    titleStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: '700',
        size: '13px',
        color: '#EA580C',
        textAlignment: 'Center'
    }
};

export const additionalAxes: Object[] = [
    {
        name: 'CO2Axis',
        title: 'Atmospheric CO₂ (ppm)',
        opposedPosition: true,
        minimum: 422,
        maximum: 432,
        interval: 2,
        labelFormat: '{value} ppm',
        edgeLabelPlacement: 'Shift',
        majorGridLines: {
            width: 0
        },
        minorGridLines: {
            width: 0
        },
        majorTickLines: {
            width: 0
        },
        lineStyle: {
            width: 1.5,
            color: '#2563EB'
        },
        labelStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '12px',
            color: '#2563EB'
        },
        titleStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '700',
            size: '13px',
            color: '#2563EB',
            textAlignment: 'Center'
        }
    },
    {
        name: 'SeaIceAxis',
        title: 'Arctic Sea Ice (million km²)',
        opposedPosition: true,
        minimum: 4,
        maximum: 16,
        interval: 2,
        labelFormat: '{value}M',
        edgeLabelPlacement: 'Shift',
        majorGridLines: {
            width: 0
        },
        minorGridLines: {
            width: 0
        },
        majorTickLines: {
            width: 0
        },
        lineStyle: {
            width: 1.5,
            color: '#059669'
        },
        labelStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '12px',
            color: '#059669'
        },
        titleStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '700',
            size: '13px',
            color: '#059669',
            textAlignment: 'Center'
        }
    }
];

const SAMPLE_CSS: string = `
    .control-fluid {
        padding: 0 !important;
    }

    .climate-chart-container {
        width: 100%;
        box-sizing: border-box;
        padding: 18px 20px 8px;
        background: transparent;
        border: 1px solid #dce5ef;
        border-radius: 18px;
        box-shadow:
            0 1px 2px rgba(15, 23, 42, 0.03),
            0 10px 28px rgba(15, 23, 42, 0.06);
    }

    .climate-feature-list {
        margin: 12px 0;
        padding-left: 24px;
        list-style-type: disc;
    }

    .climate-feature-list li {
        display: list-item;
        margin-bottom: 6px;
    }

    .climate-insight {
        position: relative;
        width: 0;
        height: 0;
        pointer-events: none;
    }

    .climate-insight-marker {
        position: absolute;
        top: -7px;
        left: -7px;
        z-index: 3;
        width: 14px;
        height: 14px;
        box-sizing: border-box;
        border: 2px solid #fff;
        background: currentColor;
    }

    .climate-insight-marker-circle {
        border-radius: 50%;
    }

    .climate-insight-marker-diamond {
        transform: rotate(45deg);
    }

    .climate-insight-marker-rectangle {
        border-radius: 2px;
    }

    .climate-insight-leader {
        position: absolute;
        z-index: 2;
        background: currentColor;
        opacity: 0.55;
    }

    .climate-insight-pill {
        position: absolute;
        z-index: 2;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 32px;
        box-sizing: border-box;
        padding: 6px 12px 6px 8px;
        border: 1px solid #dbe4ee;
        border-radius: 8px;
        background: var(--sf-chart-bg, #fff);
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
        color: #334155;
        font-family: "Segoe UI", sans-serif;
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
        white-space: nowrap;
    }

    .climate-insight-anchor-down .climate-insight-pill {
        top: 34px;
        left: 0;
        transform: translate(-50%, 0);
    }

    .climate-insight-anchor-down .climate-insight-leader {
        top: 9px;
        left: 0;
        width: 1.5px;
        height: 23px;
        transform: translateX(-50%);
    }

    .climate-insight-anchor-up .climate-insight-pill {
        top: -34px;
        left: 0;
        transform: translate(-50%, -100%);
    }

    .climate-insight-anchor-up .climate-insight-leader {
        top: -32px;
        left: 0;
        width: 1.5px;
        height: 23px;
        transform: translateX(-50%);
    }

    .climate-insight-anchor-right .climate-insight-pill {
        top: 0;
        left: 34px;
        transform: translate(0, -50%);
    }

    .climate-insight-anchor-right .climate-insight-leader {
        top: 0;
        left: 9px;
        width: 23px;
        height: 1.5px;
        transform: translateY(-50%);
    }

    .climate-chart-rtl .climate-insight-anchor-right .climate-insight-pill {
        right: 34px;
        left: auto;
        transform: translate(0, -50%);
    }

    .climate-chart-rtl .climate-insight-anchor-right .climate-insight-leader {
        right: 9px;
        left: auto;
        width: 23px;
        height: 1.5px;
        transform: translateY(-50%);
    }

    .climate-insight-pin {
        width: 9px;
        height: 9px;
        flex: 0 0 9px;
    }

    .climate-insight-pin-circle {
        border-radius: 50%;
    }

    .climate-insight-pin-diamond {
        transform: rotate(45deg);
    }

    .climate-insight-pin-rectangle {
        border-radius: 1.5px;
    }

    .climate-insight-label {
        color: #334155;
        font-weight: 600;
    }

    .climate-insight-value {
        padding: 1px 6px;
        border-radius: 4px;
        background: rgba(15, 23, 42, 0.04);
        font-weight: 700;
    }

    .climate-insight-blue {
        color: #2563eb;
    }

    .climate-insight-blue .climate-insight-pin {
        background: #2563eb;
    }

    .climate-insight-blue .climate-insight-value {
        color: #1d4ed8;
        background: rgba(37, 99, 235, 0.1);
    }

    .climate-insight-green {
        color: #059669;
    }

    .climate-insight-green .climate-insight-pin {
        background: #059669;
    }

    .climate-insight-green .climate-insight-value {
        color: #047857;
        background: rgba(5, 150, 105, 0.1);
    }

    .climate-insight-orange {
        color: #ea580c;
    }

    .climate-insight-orange .climate-insight-pin {
        background: #ea580c;
    }

    .climate-insight-orange .climate-insight-value {
        color: #c2410c;
        background: rgba(234, 88, 12, 0.1);
    }

    @media only screen and (max-width: 640px) {
        .climate-chart-container {
            padding: 12px 8px 6px;
            border-radius: 12px;
        }

        .climate-insight-pill {
            min-height: 26px;
            gap: 5px;
            padding: 4px 8px 4px 6px;
            font-size: 10px;
            line-height: 12px;
        }

        .climate-insight-marker {
            top: -6px;
            left: -6px;
            width: 12px;
            height: 12px;
        }

        .climate-insight-pin {
            width: 7px;
            height: 7px;
            flex: 0 0 7px;
        }

        .climate-insight-anchor-down .climate-insight-pill {
            top: 30px;
        }

        .climate-insight-anchor-down .climate-insight-leader {
            top: 8px;
            height: 20px;
        }

        .climate-insight-anchor-up .climate-insight-pill {
            top: -30px;
        }

        .climate-insight-anchor-up .climate-insight-leader {
            top: -28px;
            height: 20px;
        }

        .climate-insight-anchor-right .climate-insight-pill {
            left: 30px;
        }

        .climate-insight-anchor-right .climate-insight-leader {
            left: 8px;
            width: 20px;
        }
        .climate-chart-rtl .climate-insight-anchor-right .climate-insight-pill {
            right: 30px;
            left: auto;
        }

        .climate-chart-rtl .climate-insight-anchor-right .climate-insight-leader {
            right: 8px;
            left: auto;
            width: 20px;
        }

        .climate-insight-value {
            display: none;
        }
    }
`;

const co2AnnotationTemplate = (): JSX.Element => (
    <div className="climate-insight climate-insight-blue climate-insight-anchor-down">
        <div className="climate-insight-marker climate-insight-marker-diamond" />
        <div className="climate-insight-leader" />
        <div className="climate-insight-pill">
            <span className="climate-insight-pin climate-insight-pin-diamond" />
            <span className="climate-insight-label">
                CO₂ seasonal peak
            </span>
            <span className="climate-insight-value">
                430.5 ppm
            </span>
        </div>
    </div>
);

const seaIceAnnotationTemplate = (): JSX.Element => (
    <div className="climate-insight climate-insight-green climate-insight-anchor-up">
        <div className="climate-insight-marker climate-insight-marker-rectangle" />
        <div className="climate-insight-leader" />
        <div className="climate-insight-pill">
            <span className="climate-insight-pin climate-insight-pin-rectangle" />
            <span className="climate-insight-label">
                Sea ice annual low
            </span>
            <span className="climate-insight-value">
                4.68 M km²
            </span>
        </div>
    </div>
);

const temperatureAnnotationTemplate = (): JSX.Element => (
    <div className="climate-insight climate-insight-orange climate-insight-anchor-right">
        <div className="climate-insight-marker climate-insight-marker-circle" />
        <div className="climate-insight-leader" />
        <div className="climate-insight-pill">
            <span className="climate-insight-pin climate-insight-pin-circle" />
            <span className="climate-insight-label">
                Hottest anomaly
            </span>
            <span className="climate-insight-value">
                +1.75°C
            </span>
        </div>
    </div>
);

/**
 * Multi-axis combination chart sample.
 */
export class MultiAxisCombination extends SampleBase<{}, {}> {
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);

        const chartElement: HTMLElement =
            args.chart.element as HTMLElement;

        if (args.chart.enableRtl) {
            chartElement.classList.add('climate-chart-rtl');
        } else {
            chartElement.classList.remove('climate-chart-rtl');
        }
    }

    public onChartLoad(args: ILoadedEventArgs): void {
        const chart: HTMLElement | null =
            document.getElementById('charts');

        if (chart) {
            chart.setAttribute('title', '');
        }
    }

    public legendRender(args: ILegendRenderEventArgs): void {
        if (args.text === 'Temperature Anomaly (°C)') {
            args.shape = 'Circle';
            args.fill = '#F97316';
        } else if (args.text === 'Atmospheric CO₂ (ppm)') {
            args.shape = 'Diamond';
            args.fill = '#2563EB';
        } else if (
            args.text === 'Arctic Sea Ice (million km²)'
        ) {
            args.shape = 'Rectangle';
            args.fill = '#10B981';
        }
    }

    public render(): JSX.Element {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>

                <div className="control-section">
                    <div className="climate-chart-container">
                        <ChartComponent
                            id="charts"
                            style={{
                                display: 'block',
                                textAlign: 'center'
                            }}
                            title="Global Climate Pulse"
                            subTitle={
                                'Monthly global climate signals during 2025 • ' +
                                'Copernicus C3S • NOAA GML • NSIDC'
                            }
                            titleStyle={{
                                textAlignment: 'Near',
                                fontFamily: 'Segoe UI',
                                fontWeight: '700',
                                size: '24px',
                                textOverflow: 'Wrap'
                            }}
                            subTitleStyle={{
                                textAlignment: 'Near',
                                fontFamily: 'Segoe UI',
                                fontWeight: '500',
                                size: '13px',
                                textOverflow: 'Wrap'
                            }}
                            primaryXAxis={primaryXAxis}
                            primaryYAxis={primaryYAxis}
                            axes={additionalAxes}
                            tooltip={{
                                enable: true,
                                shared: true,
                                enableMarker: true,
                                opacity: 0.97,
                                header: '<b>${point.x}</b>',
                                format:
                                    '${series.name} : <b>${point.y}</b>'
                            }}
                            crosshair={{
                                enable: true,
                                lineType: 'Vertical',
                                dashArray: '4,4',
                                line: {
                                    width: 1
                                }
                            }}
                            legendSettings={{
                                visible: true,
                                position: 'Bottom',
                                alignment: 'Center',
                                shapeWidth: 10,
                                shapeHeight: 10,
                                shapePadding: 8,
                                padding: 24,
                                enableHighlight: true,
                                toggleVisibility: false,
                                textStyle: {
                                    fontFamily: 'Segoe UI',
                                    fontWeight: '600',
                                    size: '12px'
                                }
                            }}
                            chartArea={{
                                border: {
                                    width: 0
                                }
                            }}
                            width={
                                Browser.isDevice ? '100%' : '90%'
                            }
                            load={this.load.bind(this)}
                            loaded={this.onChartLoad.bind(this)}
                            legendRender={this.legendRender.bind(this)}
                        >
                            <Inject
                                services={[
                                    LineSeries,
                                    SplineSeries,
                                    AreaSeries,
                                    DateTimeCategory,
                                    Legend,
                                    Tooltip,
                                    Crosshair,
                                    ChartAnnotation,
                                    Highlight
                                ]}
                            />

                            <AnnotationsDirective>
                                <AnnotationDirective
                                    content={co2AnnotationTemplate}
                                    x={new Date(2025, 4, 1)}
                                    y={430.51}
                                    coordinateUnits="Point"
                                    region="Chart"
                                    yAxisName="CO2Axis"
                                />

                                <AnnotationDirective
                                    content={seaIceAnnotationTemplate}
                                    x={new Date(2025, 8, 1)}
                                    y={4.68}
                                    coordinateUnits="Point"
                                    region="Chart"
                                    yAxisName="SeaIceAxis"
                                />

                                <AnnotationDirective
                                    content={temperatureAnnotationTemplate}
                                    x={new Date(2025, 0, 1)}
                                    y={1.75}
                                    coordinateUnits="Point"
                                    region="Chart"
                                />
                            </AnnotationsDirective>

                            <SeriesCollectionDirective>
                                <SeriesDirective
                                    dataSource={climateData}
                                    type="Area"
                                    name="Arctic Sea Ice (million km²)"
                                    xName="Month"
                                    yName="SeaIceExtent"
                                    yAxisName="SeaIceAxis"
                                    fill="#10B981"
                                    opacity={1}
                                    width={2.5}
                                    border={{
                                        width: 2.5,
                                        color: '#059669'
                                    }}
                                    linearGradient={{
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1,
                                        gradientColorStop: [
                                            {
                                                offset: 0,
                                                color: '#10B981',
                                                opacity: 0.30
                                            },
                                            {
                                                offset: 45,
                                                color: '#34D399',
                                                opacity: 0.15
                                            },
                                            {
                                                offset: 100,
                                                color: '#ECFDF5',
                                                opacity: 0.02
                                            }
                                        ]
                                    }}
                                    marker={{
                                        visible: true,
                                        shape: 'Rectangle',
                                        width: 8,
                                        height: 8,
                                        isFilled: true,
                                        fill: '#10B981'
                                    }}
                                    animation={{
                                        enable: true,
                                        duration: 1200,
                                        delay: 0
                                    }}
                                />

                                <SeriesDirective
                                    dataSource={climateData}
                                    type="Line"
                                    name="Temperature Anomaly (°C)"
                                    xName="Month"
                                    yName="TemperatureAnomaly"
                                    fill="#F97316"
                                    width={4}
                                    linearGradient={{
                                        x1: 0,
                                        y1: 0,
                                        x2: 1,
                                        y2: 0,
                                        gradientColorStop: [
                                            {
                                                offset: 0,
                                                color: '#FB923C',
                                                opacity: 1
                                            },
                                            {
                                                offset: 55,
                                                color: '#F97316',
                                                opacity: 1
                                            },
                                            {
                                                offset: 100,
                                                color: '#C2410C',
                                                opacity: 1
                                            }
                                        ]
                                    }}
                                    marker={{
                                        visible: true,
                                        shape: 'Circle',
                                        width: 8,
                                        height: 8,
                                        isFilled: true,
                                        fill: '#F97316'
                                    }}
                                    animation={{
                                        enable: true,
                                        duration: 1400,
                                        delay: 450
                                    }}
                                />

                                <SeriesDirective
                                    dataSource={climateData}
                                    type="Spline"
                                    splineType="Natural"
                                    name="Atmospheric CO₂ (ppm)"
                                    xName="Month"
                                    yName="AtmosphericCO2"
                                    yAxisName="CO2Axis"
                                    fill="#2563EB"
                                    width={3.5}
                                    linearGradient={{
                                        x1: 0,
                                        y1: 0,
                                        x2: 1,
                                        y2: 0,
                                        gradientColorStop: [
                                            {
                                                offset: 0,
                                                color: '#60A5FA',
                                                opacity: 1
                                            },
                                            {
                                                offset: 50,
                                                color: '#2563EB',
                                                opacity: 1
                                            },
                                            {
                                                offset: 100,
                                                color: '#1E40AF',
                                                opacity: 1
                                            }
                                        ]
                                    }}
                                    marker={{
                                        visible: true,
                                        shape: 'Diamond',
                                        width: 8,
                                        height: 8,
                                        isFilled: true,
                                        fill: '#2563EB'
                                    }}
                                    animation={{
                                        enable: true,
                                        duration: 1400,
                                        delay: 950
                                    }}
                                />
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>

                <div id="action-description">
                    <p>
                        This example visualizes monthly global climate signals
                        during 2025 using temperature anomaly, atmospheric CO₂,
                        and Arctic sea ice extent data. Multiple axes are used
                        to compare measurements with different units and value
                        ranges in a single chart.
                    </p>
                </div>

                <div id="description">
                    <p>
                        The chart demonstrates how unrelated datasets with
                        very different value ranges can be plotted together
                        for a unified view of climate signals.
                    </p>

                    <p>
                        In this example, you can see how to render and
                        configure multiple axes in a single chart. The
                        combination chart includes the following features:
                    </p>

                    <ul className="climate-feature-list">
                        <li>
                            An area series for Arctic sea ice extent on the
                            outer-right Y axis.
                        </li>
                        <li>
                            A line series for temperature anomalies on the
                            primary Y axis.
                        </li>
                        <li>
                            A spline series for atmospheric CO₂ on the
                            inner-right Y axis.
                        </li>
                        <li>
                            Distinct color-coded axes, labels, and legends
                            for each measurement.
                        </li>
                        <li>
                            Annotations that highlight the temperature anomaly
                            peak, seasonal CO₂ peak, and annual sea ice
                            minimum.
                        </li>
                    </ul>

                    <p>
                        <code>Tooltip</code> and <code>Crosshair</code> are
                        enabled in this example. Hover over a point or tap on
                        one on touch-enabled devices to see the shared
                        tooltip, and move the cursor along the chart to track
                        values across the three axes.
                    </p>

                    <p>
                        <b>Injecting Module</b>
                    </p>

                    <p>
                        Chart component features are segregated into
                        individual feature-wise modules. To use line, spline,
                        area, annotation, tooltip, legend, crosshair,
                        highlight, and date-time category axis features,
                        inject the required modules into
                        <code>services</code>.
                    </p>

                    <p>
                        More information on multiple axes can be found in
                        this
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://ej2.syncfusion.com/react/documentation/chart/axis-customization#multiple-axis"
                            aria-label="Navigate to the documentation for multiple axes in React Chart component"
                        >
                            documentation section
                        </a>
                        .
                    </p>
                </div>
            </div>
        );
    }
}

export default MultiAxisCombination;