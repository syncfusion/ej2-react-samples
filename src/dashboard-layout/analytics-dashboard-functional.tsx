import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { DashboardLayoutComponent, PanelModel, PanelDirective, PanelsDirective } from '@syncfusion/ej2-react-layouts';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, LayersDirective, LayerDirective, MapsTheme, MarkersDirective, MarkerDirective, Marker, Legend as MapsLegend, MapsTooltip } from '@syncfusion/ej2-react-maps';
import './analytics.css';
import * as data from './default-datasource.json';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, Legend, PieSeries, ChartTheme, AccumulationTooltip,SeriesCollectionDirective, AccumulationTheme, AccumulationDataLabel, ChartComponent, ILoadedEventArgs,  IAccLoadedEventArgs, ColumnSeries,Category, SeriesDirective,Tooltip,DataLabel, DateTime, SplineAreaSeries, Inject } from '@syncfusion/ej2-react-charts';

export let expensedata: any[] = [
    {
        'UniqueId': 'T100003',
        'DateTime': new Date(1488359820000),
        'Category': 'Food',
        'PaymentMode': 'Cash',
        'TransactionType': 'Expense',
        'Description': 'Confederate cush',
        'Amount': '900',
        'MonthShort': 'Mar',
        'MonthFull': 'March, 2017',
        'FormattedDate': '03/01/2017 08:53 PM',
        'Device': 'Tablet'
    }, {
        'UniqueId': 'T100004',
        'DateTime': new Date(1491038220000),
        'Category': 'Transportation',
        'PaymentMode': 'Credit Card',
        'TransactionType': 'Expense',
        'Description': 'Public and other transportation',
        'Amount': '1200',
        'MonthShort': 'Apr',
        'MonthFull': 'April, 2017',
        'FormattedDate': '04/01/2017 10:44 AM',
        'Device': 'Desktop'
    }, {
        'UniqueId': 'T100005',
        'DateTime': new Date(1493630220000),
        'Category': 'Transportation',
        'PaymentMode': 'Cash',
        'TransactionType': 'Expense',
        'Description': 'Public and other transportation',
        'Amount': '600',
        'MonthShort': 'May',
        'MonthFull': 'May, 2017',
        'FormattedDate': '05/01/2017 03:25 PM',
        'Device': 'Mobile'
    },
  ];
export let data1: any[] = [
    { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
];
export let data2: any[] = [
    { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
];
let datasource: any = data as any;
let markers: object[] = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625  },
    { name: 'Australia', latitude: -25.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -55.54687499999999 }
];

const SEODashboard = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IAccLoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast').replace(/-dark/i, "Dark")  as AccumulationTheme;
    }
    const Chartload = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast').replace(/-dark/i, "Dark")  as ChartTheme;
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.fill = '#000000';
            args.chart.series[1].marker.dataLabel.fill = '#000000';
        }
    };
    const Mapload = (args: any): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/contrast/i, 'Contrast').replace(/-dark/i, "Dark")  as MapsTheme;
    };
    
    const cellSpacing: number [] = [5,5];

    const card1 = () => {
        return(
            <div className="card">
                <span className="e-icons session"></span>
                <div className="card-content text">Session</div>
                <div className="card-content number">124,444</div>
            </div>
        );
    }

    const card2 = () => {
        return(
            <div className="card">
                <span className="e-icons profile"></span>
                <div className="card-content text">Users</div>
                <div className="card-content number">64,496</div>
            </div>
        );
    }

    const card3 = () => {
        return(
            <div className="card">
                <span className="e-icons views"></span>
                <div className="card-content text">Views</div>
                <div className="card-content number">442,278</div>
            </div>
        );
    }

    const map = () => {
        const mapData: any[]= [
            { latitude: 37.6276571, longitude: -122.4276688, name: 'San Bruno'},
            { latitude: 33.5302186, longitude: -117.7418381, name: 'Laguna Niguel'},
            { latitude: 40.7424509, longitude: -74.0081468, name: 'New York'},
            { latitude: -23.5268201, longitude: -46.6489927, name: 'Bom Retiro'},
            { latitude: 43.6533855, longitude: -79.3729994, name: 'Toronto'},
            { latitude: 48.8773406, longitude: 2.3299627, name: 'Paris'},
            { latitude: 52.4643089, longitude: 13.4107368, name: 'Berlin'},
            { latitude: 19.1555762, longitude: 72.8849595, name: 'Mumbai'},
            { latitude: 35.6628744, longitude: 139.7345469, name: 'Minato'},
            { latitude: 51.5326602, longitude: -0.1262422, name: 'London'}
        ];
        return(
            <div style={{height:"100%", width:"100%"}}>
                <MapsComponent id="maps" load={Mapload.bind(this)} zoomSettings={{ enable: false }} legendSettings={{ visible: false }}>
                        <Inject services={[Marker, MapsLegend, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/dashboard-layout/world-map.json')} shapePropertyPath='continent' shapeDataPath='continent' dataSource={datasource.default} shapeSettings={{ colorValuePath: 'color' }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} template='<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>' animationDuration={0} dataSource={markers}></MarkerDirective>
                                    <MarkerDirective visible={true} shape ='Image' imageUrl= './src/dashboard-layout/ballon.png' height={ 20} width= {20} offset={{ y: -10, x: 0 }} animationDuration={0} tooltipSettings={{ visible: true, valuePath: 'name' }} dataSource={mapData}></MarkerDirective>
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
        );
    }

    const pie = () => {
        return(
            <div style={{height:"100%", width:"100%"}}>
                <AccumulationChartComponent  id='pie' legendSettings={{ visible: false }} enableSmartLabels={true} height="100%" width="100%" enableAnimation={false} selectionMode ={"Point"} center={{x: '50%', y: '50%'}} tooltip={{ enable: false, header:"<b>${point.x}</b>" ,format: 'Composition : <b>${point.y}%</b>' }} load={load.bind(this)}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={expensedata} name='Revenue' xName='Device' yName='Amount' explode={false} dataLabel={{ visible: true, position: 'Inside', name: 'text', font: { fontWeight: '600' } }} radius='100%' innerRadius='35%' palettes={['#357cd2', '#00bdae', '#e36593']}></AccumulationSeriesDirective>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
        );
    }

    const visitorsChart = () => {
        return(
            <div style={{height:"100%", width:"100%"}}>
                <ChartComponent id='visitorsChart' style={{ textAlign: "center" }} load={Chartload.bind(this)} legendSettings={{visible: false}} primaryXAxis={{ valueType: 'DateTime', labelFormat: 'y', majorGridLines: { width: 0 }, intervalType: 'Years', edgeLabelPlacement: 'Shift' }} primaryYAxis={{ labelFormat: '{value}%', lineStyle: { width: 0 }, maximum: 4, interval: 1, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }}>
                    <Inject services={[SplineAreaSeries, DateTime, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' name='Jan' opacity={0.5} type='SplineArea' width={2} fill="rgb(239, 183, 202)"></SeriesDirective>
                        <SeriesDirective dataSource={data2} xName='x' yName='y' name='Feb' opacity={0.5} type='SplineArea' width={2} fill="rgb(14, 64, 152, .6)"></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        );
    }

    const pieChart = () => {
        const pieChartData: any[] = [
          { x: "Desktop", y: 37, text: "60%" },
          { x: "Mobile", y: 17, text: "10%" },
          { x: "Tablet", y: 19, text: "20%" },
        ];
        return(
            <div style={{height:"100%", width:"100%"}}>
                <AccumulationChartComponent id='pieChart' legendSettings={{ visible: false }} enableSmartLabels={true} height="100%" width="100%" enableAnimation={false} selectionMode ={"Point"} center={{x: '50%', y: '50%'}} tooltip={{ enable: false, header:"<b>${point.x}</b>" ,format: 'Composition : <b>${point.y}%</b>' }} load={load.bind(this)}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={pieChartData} xName='x' yName='y' explode={true} explodeIndex={2} explodeOffset={"10%"} dataLabel={{ visible: true, position: 'Inside', name: 'text', font: { fontWeight: '600' } }} radius='100%'></AccumulationSeriesDirective>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
        );
    }

    const colChart = () => {
        return(
            <div style={{height:"100%", width:"100%"}}>
                <ChartComponent id='colChart' style={{ textAlign: "center" }} load={Chartload.bind(this)} legendSettings={{ visible: false }} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }} primaryYAxis={{ majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }}>
                    <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={ [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }] } xName='x' yName='y' name='Desktop' type='Column' marker={{ dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                        <SeriesDirective dataSource={ [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }] } xName='x' yName='y' name='Mobile' type='Column' marker={{ dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}  fill='#e56691'></SeriesDirective>
                        <SeriesDirective dataSource={ [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }] } xName='x' yName='y' name='Tablet' type='Column' marker={{ dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        );
    }

    return (
        <div>
            <div className="control-section" id="target_dash">
                <div className="col-lg-12 col-sm-12 col-md-12" id="dashboard_sidebar_section">
                    <div id="analytic_head">
                        <div className="header">
                            <div className="menu">
                                <span className="e-icons expand"></span>
                            </div>
                            <div className="searchContent">
                                <div className="analysis">SEO Analysis Dashboard</div>
                            </div>
                            <div className="right-content">
                                <div className="information">
                                    <span className="e-avatar e-avatar-medium e-avatar-circle image"></span>
                                    <div className="text-content">John</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SidebarComponent id="dockSideDash" type={"Over"} dockSize="60px" enableDock={true} closeOnDocumentClick={true} target="#analytic_target">
                        <div className="content-area">
                            <div className="dock">
                                <ul>
                                    <li className="sidebar-item">
                                        <span className="e-icons home"></span>
                                    </li>
                                    <li className="sidebar-item filterHover">
                                        <span className="e-icons filter"></span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons analyticsChart"></span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons settings"></span>
                                    </li>
                                    <li className="sidebar-item">
                                        <span className="e-icons analytics"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </SidebarComponent>
                    <div id="analytic_target">
                        <div className="sidebar-content">
                            <div className="dashboardParent">
                                <DashboardLayoutComponent id="analytic_dashboard" cellAspectRatio={100/85} cellSpacing={cellSpacing} columns={6}>
                                    <PanelsDirective>
                                        <PanelDirective sizeX={2} sizeY={1} row={0} col={0} content={card1 as any} ></PanelDirective>
                                        <PanelDirective sizeX={2} sizeY={1} row={0} col={2} content={card2 as any}></PanelDirective>
                                        <PanelDirective sizeX={2} sizeY={1} row={0} col={4} content={card3 as any}></PanelDirective>
                                        <PanelDirective sizeX={2} sizeY={2} row={1} col={0} content={pie.bind(this) as any} header="<div>Active Visitors</div>"></PanelDirective>
                                        <PanelDirective sizeX={2} sizeY={2} row={1} col={2} content={map.bind(this) as any} header="<div>Regional Map</div>"></PanelDirective>
                                        <PanelDirective sizeX={2} sizeY={2} row={1} col={4} content={colChart.bind(this) as any} header="<div>Visitors by Type</div>"></PanelDirective>
                                        <PanelDirective sizeX={2} sizeY={2} row={3} col={0} content={pieChart.bind(this) as any} header="<div>Usage Statistics</div>"></PanelDirective>
                                        <PanelDirective sizeX={4} sizeY={2} row={3} col={2} content={visitorsChart.bind(this) as any} header="<div>Traffic History</div>"></PanelDirective>
                                    </PanelsDirective>
                                </DashboardLayoutComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>The following sample demonstrates the usecase of DashboardLayout component in realtime SEO data analysis.</p>
            </div>
            <div id="description">
                The sample demonstrates the realtime SEO data analytics dashboard layout.
            </div>
        </div>
    );
}
export default SEODashboard;
            
