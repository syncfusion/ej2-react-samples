import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
    ScheduleComponent,
    TimelineMonth,
    Resize,
    DragAndDrop,
    ResourcesDirective,
    ResourceDirective,
    Inject,
} from '@syncfusion/ej2-react-schedule';
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    ColumnSeries,
    Category,
    Legend,
    Tooltip,
    Highlight,
    IPointRenderEventArgs,
    ILoadedEventArgs
} from '@syncfusion/ej2-react-charts';

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import './integration-with-chart.css';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

const drivers = [
    { id: 1, driver: 'Ben Smith', color: '#ea7a57', truck: 'Volvo FH16', capacity: 325 },
    { id: 2, driver: 'Sarah Johnson', color: '#7fa900', truck: 'Scania R730', capacity: 310 },
    { id: 3, driver: 'Mike Chen', color: '#5978ee', truck: 'Mercedes Actros', capacity: 290 },
    { id: 4, driver: 'Emma Davis', color: '#fec200', truck: 'MAN TGX', capacity: 280 },
    { id: 5, driver: 'Carlos Rodriguez', color: '#df5286', truck: 'DAF XF', capacity: 300 },
    { id: 6, driver: 'Olivia Wilson', color: '#00bdae', truck: 'Kenworth T680', capacity: 315 },
    { id: 7, driver: 'James Taylor', color: '#865fcf', truck: 'Peterbilt 579', capacity: 305 },
    { id: 8, driver: 'Sophia Martinez', color: '#1aaa55', truck: 'Freightliner Cascadia', capacity: 295 },
    { id: 9, driver: 'Daniel Lee', color: '#df5286', truck: 'Mack Anthem', capacity: 285 },
    { id: 10, driver: 'Ava Thompson', color: '#710193', truck: 'International LT', capacity: 275 }
];

const events = [
    {
        Id: 1,
        Subject: 'Long haul trip',
        StartTime: new Date(2026, 0, 12, 10, 0),
        EndTime: new Date(2026, 0, 12, 18, 0),
        DriverID: 1
    },
    {
        Id: 2,
        Subject: 'Delivery to New York',
        StartTime: new Date(2026, 0, 13, 9, 0),
        EndTime: new Date(2026, 0, 13, 17, 0),
        DriverID: 2
    },
    {
        Id: 3,
        Subject: 'Cross-country route',
        StartTime: new Date(2026, 0, 13, 16, 0),
        EndTime: new Date(2026, 0, 14, 4, 0),
        DriverID: 3
    },
    {
        Id: 4,
        Subject: 'Refrigerated goods',
        StartTime: new Date(2026, 0, 14, 6, 0),
        EndTime: new Date(2026, 0, 14, 14, 0),
        DriverID: 4
    },
    {
        Id: 5,
        Subject: 'Container transport',
        StartTime: new Date(2026, 0, 15, 8, 0),
        EndTime: new Date(2026, 0, 15, 16, 0),
        DriverID: 5
    },
    {
        Id: 6,
        Subject: 'Steel materials',
        StartTime: new Date(2026, 0, 16, 7, 0),
        EndTime: new Date(2026, 0, 16, 13, 0),
        DriverID: 6
    },
    {
        Id: 7,
        Subject: 'Food products',
        StartTime: new Date(2026, 0, 16, 14, 0),
        EndTime: new Date(2026, 0, 16, 22, 0),
        DriverID: 7
    },
    {
        Id: 8,
        Subject: 'Construction materials',
        StartTime: new Date(2026, 0, 17, 6, 0),
        EndTime: new Date(2026, 0, 17, 15, 0),
        DriverID: 8
    },
    {
        Id: 9,
        Subject: 'Medical supplies',
        StartTime: new Date(2026, 0, 17, 16, 0),
        EndTime: new Date(2026, 0, 17, 23, 0),
        DriverID: 9
    },
    {
        Id: 18,
        Subject: 'Emergency equipment',
        StartTime: new Date(2026, 0, 20, 7, 0),
        EndTime: new Date(2026, 0, 20, 13, 0),
        DriverID: 9
    },
    {
        Id: 10,
        Subject: 'Retail distribution',
        StartTime: new Date(2026, 0, 18, 8, 0),
        EndTime: new Date(2026, 0, 18, 16, 0),
        DriverID: 10
    },
    {
        Id: 11,
        Subject: 'Warehouse pickup',
        StartTime: new Date(2026, 0, 15, 8, 0),
        EndTime: new Date(2026, 0, 15, 14, 0),
        DriverID: 2
    },
    {
        Id: 12,
        Subject: 'Express highway delivery',
        StartTime: new Date(2026, 0, 16, 6, 0),
        EndTime: new Date(2026, 0, 16, 12, 0),
        DriverID: 3
    },
    {
        Id: 13,
        Subject: 'Return cargo trip',
        StartTime: new Date(2026, 0, 18, 9, 0),
        EndTime: new Date(2026, 0, 18, 15, 0),
        DriverID: 3
    },
    {
        Id: 14,
        Subject: 'Frozen food transport',
        StartTime: new Date(2026, 0, 17, 7, 0),
        EndTime: new Date(2026, 0, 17, 13, 0),
        DriverID: 4
    },
    {
        Id: 15,
        Subject: 'Industrial machinery',
        StartTime: new Date(2026, 0, 18, 6, 0),
        EndTime: new Date(2026, 0, 18, 14, 0),
        DriverID: 6
    },
    {
        Id: 16,
        Subject: 'Cement delivery',
        StartTime: new Date(2026, 0, 19, 8, 0),
        EndTime: new Date(2026, 0, 19, 14, 0),
        DriverID: 8
    },
    {
        Id: 17,
        Subject: 'Equipment relocation',
        StartTime: new Date(2026, 0, 21, 9, 0),
        EndTime: new Date(2026, 0, 21, 17, 0),
        DriverID: 8
    }
];

const SchedulerWithChart = () => {
    useEffect(() => {
        updateSampleSection();
      }, [])
    const scheduleRef = useRef<ScheduleComponent>(null);
    const chartRef = useRef<ChartComponent>(null);
    const [currentMode, setCurrentMode] = useState<'tripcount' | 'capacity' | 'longest'>('tripcount');

    const generateChartData = useCallback((mode: 'tripcount' | 'capacity' | 'longest') => {
        if (mode === 'capacity') {
            return drivers.map(d => ({
                Driver: d.truck,
                OriginalDriver: d.driver,
                Value: d.capacity
            }));
        }

        const map: Record<string, number> = {};

        events.forEach(e => {
            const driver = drivers.find(d => d.id === e.DriverID);
            if (!driver || !e.StartTime || !e.EndTime) return;

            if (mode === 'tripcount') {
                map[driver.driver] = (map[driver.driver] || 0) + 1;
            }

            if (mode === 'longest') {
                const duration =
                    (new Date(e.EndTime).getTime() -
                        new Date(e.StartTime).getTime()) / (1000 * 60 * 60);

                if (!map[driver.driver] || duration > map[driver.driver]) {
                    map[driver.driver] = duration;
                }
            }
        });

        return drivers
            .map(d => ({
                Driver: d.driver,
                Value: map[d.driver] || 0
            }))
            .filter(x => x.Value > 0);
    }, []);

    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };

    const updateChart = useCallback((mode: 'tripcount' | 'capacity' | 'longest') => {
        if (!chartRef.current || chartRef.current.isDestroyed) return;

        if (!chartRef.current.series || !chartRef.current.series.length) return;

        setTimeout(() => {
            if (!chartRef.current || chartRef.current.isDestroyed) return;

            chartRef.current.series[0].dataSource = generateChartData(mode);

            chartRef.current.primaryYAxis!.title =
                mode === 'capacity'
                    ? 'Capacity (t)'
                    : mode === 'longest'
                        ? 'Duration (hours)'
                        : 'Count';

            chartRef.current.primaryYAxis!.interval =
                mode === 'tripcount' ? 2 : undefined;

            chartRef.current.title =
                mode === 'capacity'
                    ? 'Truck Capacity'
                    : mode === 'longest'
                        ? 'Longest Trips'
                        : 'Trip Count';

            chartRef.current.refresh();
        }, 0);
    }, [generateChartData]);

    useEffect(() => {
        updateChart(currentMode);
    }, [currentMode, updateChart]);

    useEffect(() => {
        // Initialize chart data on first load
        if (chartRef.current && chartRef.current.series?.length) {
            updateChart(currentMode);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (scheduleRef.current) {
                scheduleRef.current.destroy();
            }

            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    const resourceTemplate = useCallback((props: any): JSX.Element => {
        const d = props.resourceData;

        return (
            <div className="template-wrap">
                <div className="room-name">{d.driver}</div>
                <div className="truck-type">{d.truck}</div>
                <div className="capacity">{d.capacity}</div>
            </div>
        );
    }, []);

    const resourceTooltipTemplate = useCallback((props: any): JSX.Element => {
        const d = props.resourceData;

        return (
            <div className="template-wrap">
                <div>Name : {d.driver}</div>
                <div>Truck : {d.truck}</div>
                <div>Capacity : {d.capacity}</div>
            </div>
        );
    }, []);

    const headerIndentTemplate = useCallback((): JSX.Element => (
        <div className="template-wrap header-indent">
            <div className="name">Driver</div>
            <div className="type">Truck</div>
            <div className="capac">Capacity</div>
        </div>
    ), []);


    return (
            <div className='schedule-control-section'>
                <div className="col-lg-12 schedule-with-chart control-section">
                    <div className="schedule-content-wrapper">
                        <div
                            className="modern-layout"
                            style={{ display: 'flex', gap: '10px' }}
                        >
                            {/* Scheduler */}
                            <div id="scheduler" className="scheduler-wrapper">
                                <ScheduleComponent
                                    ref={scheduleRef}
                                    height="650px"
                                    width="100%"
                                    selectedDate={new Date(2026, 0, 12)}
                                    views={['TimelineMonth']}
                                    allowOverlap={false}
                                    resourceHeaderTemplate={resourceTemplate}
                                    headerIndentTemplate={headerIndentTemplate}
                                    group={{ resources: ['TruckDetails'], headerTooltipTemplate: resourceTooltipTemplate }}
                                    eventSettings={{ dataSource: events }}
                                    actionComplete={(args: any) => {
                                        if (
                                            args.requestType === 'eventCreated' ||
                                            args.requestType === 'eventChanged' ||
                                            args.requestType === 'eventRemoved'
                                        ) {
                                            updateChart(currentMode);
                                        }
                                    }}
                                >
                                    <ResourcesDirective>
                                        <ResourceDirective
                                            name="TruckDetails"
                                            field="DriverID"
                                            dataSource={drivers}
                                            textField="driver"
                                            idField="id"
                                            colorField="color"
                                        />
                                    </ResourcesDirective>
                                    <Inject services={[TimelineMonth, Resize, DragAndDrop]} />
                                </ScheduleComponent>
                            </div>

                            {/* Chart Section */}
                            <div id="chart-container" className="chart-section">
                                <div className="chart-header">
                                    <h4 className="chart-title">Analytics</h4>

                                    <div id="chart-ddl" className="dropdown-wrapper">
                                        <DropDownListComponent
                                            width="100%"
                                            value={currentMode}
                                            placeholder="Select Metric"
                                            fields={{ text: 'text', value: 'value' }}
                                            dataSource={[
                                                { text: 'Trip Count', value: 'tripcount' },
                                                { text: 'Truck Capacity', value: 'capacity' },
                                                { text: 'Longest Trips', value: 'longest' }
                                            ]}
                                            change={(e) => {
                                                setCurrentMode(e.value as any);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div id="chart" className="chart-area">
                                    <ChartComponent
                                        ref={chartRef}
                                        primaryXAxis={{
                                            valueType: 'Category',
                                            labelRotation: Browser.isDevice ? -45 : 315
                                        }}
                                        legendSettings={{ visible: false }}
                                        load={load.bind(this)}
                                        tooltip={{ enable: true, enableHighlight: true }}
                                        pointRender={(args: IPointRenderEventArgs) => {
                                            let driver;

                                            if (currentMode === 'capacity') {
                                                driver = drivers.find(
                                                    (d) => d.truck === args.point?.x
                                                );
                                            } else {
                                                driver = drivers.find(
                                                    (d) => d.driver === args.point?.x
                                                );
                                            }

                                            if (driver) {
                                                args.fill = driver.color;
                                            }
                                        }}
                                    >
                                        <Inject
                                            services={[
                                                ColumnSeries,
                                                Category,
                                                Legend,
                                                Tooltip,
                                                Highlight
                                            ]}
                                        />
                                        <SeriesCollectionDirective>
                                            <SeriesDirective
                                                type="Column"
                                                xName="Driver"
                                                yName="Value"
                                            />
                                        </SeriesCollectionDirective>
                                    </ChartComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        <strong>Fleet Management Dashboard:</strong> A modern timeline scheduler with real-time analytics visualization.
                        Manage driver schedules and monitor fleet metrics through an integrated analytics dashboard.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates a fleet-management solution that pairs a <strong>Timeline Month Scheduler</strong>
                        with a real-time <strong>Analytics Chart</strong>. The left panel shows driver routes grouped by resource; the
                        right panel delivers analytics for quick insights and decision-making.
                    </p>

                    <p><strong>Key components</strong></p>
                        <ul>
                            <li><strong>Timeline Scheduler:</strong> Monthly timeline with resource grouping for drivers and routes.</li>
                            <li><strong>Analytics Dashboard:</strong> Three switchable views — <em>Trip Count</em>, <em>Truck Capacity</em>, and <em>Longest Trips</em>.</li>
                            <li><strong>Real-time sync:</strong> Charts update immediately on event create/edit/delete.</li>
                            <li><strong>Visual consistency:</strong> Chart bars inherit scheduler resource colors.</li>
                        </ul>
                    <p>
                        Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our <a target="_blank" href="https://www.syncfusion.com/scheduler-sdk/react-scheduler">React Scheduler</a> component page.
                    </p>
                </div>
            </div>
    );
};


export default SchedulerWithChart;
export { SchedulerWithChart };