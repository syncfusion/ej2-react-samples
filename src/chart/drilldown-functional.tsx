/**
 * Sample for Drill down in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, indexFinder, Index, Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries, IAccLoadedEventArgs, IAccTextRenderEventArgs, IMouseEventArgs, AccumulationAnnotation, AccumulationTheme, AccumulationChart } from '@syncfusion/ej2-react-charts';
import { loadAccumulationChartTheme } from './theme-color';
const SAMPLE_CSS = `
    #category:hover {
        cursor: pointer;
    }`;
let isparent: boolean = true;
const Drilldown = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    type Visibility = 'visible' | 'hidden';
    const [titleContent, setTitleContent] = useState<string>('Automobile Sales by Region - 2023');
    const [textContent, setTextContent] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isEnableSmartLabels, setIsEnableSmartLables] = useState<boolean>(false);
    const [visibility, setVisibility] = useState<Visibility>('hidden');
    let data: Object[] = [
        { x: 'Asia-Pacific', y: 45 }, { x: 'Europe', y: 25 }, { x: 'North America', y: 20 }, {x: 'Latin America', y: 7},
        { x: 'Middle East & Africa', y: 3 }
    ];
    let AsiaPacific: Object = [
        { x: 'China', y: 66.7 }, { x: 'Japan', y: 17.8 }, { x: 'India', y: 11.1 }, { x: 'South Korea', y: 3.3 }, { x: 'Others', y: 1.1 }
    ];
    let Europe: Object = [
        { x: 'Germany', y: 32 }, { x: 'UK', y: 20 }, { x: 'France', y: 16 }, { x: 'Italy', y: 12 }, { x: 'Spain', y: 8 }, { x: 'Others', y: 12 }
    ];
    let NorthAmerica: Object = [
        { x: 'USA', y: 75 }, { x: 'Canada', y: 15 }, { x: 'Mexico', y: 10 }
    ];
    let LatinAmerica: Object = [
        { x: 'Brazil', y: 57.1 }, { x: 'Argentina', y: 21.4 }, { x: 'Chile', y: 14.3 }, { x: 'Others', y: 7.1 }
    ];
    let MiddleEastAfrica: Object = [
        { x: 'South Africa', y: 33.3 }, { x: 'Egypt', y: 26.7 }, { x: 'UAE', y: 23.3 }, { x: 'Others', y: 16.7 }
    ];
    let dataLabel: Object = {
        visible: true, position: 'Outside', enableRotation: false, connectorStyle: { type: 'Curve', length: Browser.isDevice ? '5%' : '10%' }, font: { fontWeight: '600', color: 'black', size: Browser.isDevice ? '6px' : '12px' }
    };
    let title: string = 'Automobile Sales by Region -2023';
    let pie = useRef<AccumulationChartComponent>(null);

    const onTextRender = (args: IAccTextRenderEventArgs): void => {
        args.text = args.point.x + ' ' + args.point.y + '%';
    }
    const onChartMouseClick = (args: IMouseEventArgs): void => {
        let index: Index = indexFinder(args.target);
        if (isparent && document.getElementById('pie-chart_Series_' + index.series + '_Point_' + index.point)) {
            isparent = false;
            switch (index.point) {
                case 0:
                    pie.current.series[0].dataSource = AsiaPacific;
                    setTitleContent('Automobile Sales in the Asia-Pacific region');
                    setTextContent('Asia-Pacific');
                    break;
                case 1:
                    pie.current.series[0].dataSource = Europe;
                    setTitleContent('Automobile Sales in the Europe region');
                    setTextContent('Europe');
                    break;
                case 2:
                    pie.current.series[0].dataSource = NorthAmerica;
                    setTitleContent('Automobile Sales in the North America region');
                    setTextContent('North America');
                    break;
                case 3:
                    pie.current.series[0].dataSource = LatinAmerica;
                    setTitleContent('Automobile Sales in the Latin America region');
                    setTextContent('Latin America');
                    break;
                case 4:
                    pie.current.series[0].dataSource = MiddleEastAfrica;
                    setTitleContent('Automobile Sales in the Middle East & Africa region');
                    setTextContent('Middle East & Africa');
                    break;
            }
            if (pie.current.theme.indexOf('HighContrast') > -1 || pie.current.theme.indexOf('Dark') > -1) {
                pie.current.annotations = [{
                    content: '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>', region: 'Series', x: '50%', y: '50%'
                }];
            }
            else {
                pie.current.annotations = [{
                    content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' + '<img src="./src/chart/images/back.png" id="imgback" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
                }];
            }
            pie.current.series[0].innerRadius = '40%';
            pie.current.series[0].radius = '80%';
            pie.current.series[0].explode = false;
            pie.current.series[0].animation.enable = false;
            pie.current.series[0].dataLabel.connectorStyle.length = Browser.isDevice ? '5%' : '10%';
            pie.current.series[0].dataLabel.position = Browser.isDevice ? 'Inside' : 'Outside';
            pie.current.series[0].dataLabel.enableRotation = Browser.isDevice ? true : false;
            pie.current.series[0].dataLabel.font.color = '';
            setIsVisible(false);
            pie.current.visibleSeries[0].explodeIndex = null;
            setIsEnableSmartLables(true);
            pie.current.refresh();
            setVisibility('visible');
        }
        if (args.target.indexOf('back') > -1) {
            hide(document.getElementById(args.target));
        }
    }
    const onClick = (e: MouseEvent): void => {
        hide(e.target as Element);
    }
    const hide = (target: Element): void => {
        pie.current.series[0].dataSource = data;
        pie.current.series[0].innerRadius = '0%';
        pie.current.series[0].radius = '70%';
        pie.current.series[0].animation.enable = false;
        isparent = true;
        pie.current.series[0].explode = false;
        pie.current.annotations = [];
        pie.current.annotationModule['annotations'] = [];
        pie.current.series[0].dataLabel = dataLabel;
        setTitleContent(title);
        setIsVisible(false);
        setIsEnableSmartLables(true);
        pie.current.refresh();
        (target as HTMLButtonElement).style.visibility = 'hidden';
        setVisibility('hidden');
    }
    const onChartLoad = (args: IAccLoadedEventArgs): void => {
        let chart: Element = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
    };
    const load = (args: IAccLoadedEventArgs): void => {
       let selectedTheme: string = loadAccumulationChartTheme(args);
        if (selectedTheme.indexOf('HighContrast') > -1 || selectedTheme.indexOf('Dark') > -1) {
            args.accumulation.series[0].dataLabel.font.color = "white";
            if (args.accumulation.annotations[0] && !isparent) {
                args.accumulation.annotations[0].content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>';
            }
        }
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div id="link">
                    <a id="category" onClick={onClick.bind(this)} style={{ visibility: visibility, display: 'inline-block' }}>Sales by Category</a>
                    <p style={{ visibility: visibility, display: 'inline-block' }} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                    <p id="text" style={{ visibility: visibility, display: 'inline-block' }}>{textContent}</p>
                </div>
                <AccumulationChartComponent id='pie-chart' subTitle='Source: wikipedia.org' ref={pie} title={titleContent} enableSmartLabels={isEnableSmartLabels} legendSettings={{ visible: isVisible }} enableBorderOnMouseMove={false} tooltip={{ enable: false, format: '${point.x} <br> ${point.y} %' }} chartMouseClick={onChartMouseClick.bind(this)} textRender={onTextRender.bind(this)} load={load.bind(this)} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries, AccumulationAnnotation]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data} xName='x' yName='y' name='Automobile Sales' dataLabel={dataLabel} radius='70%' startAngle={-30} endAngle={330} borderRadius={3} border={{color:'#ffffff', width: 1}} explode={false} />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates a drill down chart with a pie for automobiles sales by region. Selecting a category navigates to its sub-categories, where sales are further broken down by country.</p>
            </div>
            <div id="description">
                <p> 
                    In this example, you can see how to achieve the drilldown concept using a pie chart. Automobile sales are shown in different categories. By clicking each category, you can navigate to the next level, which shows the sales by categories made by each company. <code>Datalabels</code> are used in this sample to show information about the data points.
                </p>
                <p style={{ fontWeight: 500 }}><b>Injecting Module</b></p>
                <p>
                    Accumulation chart component features are segregated into individual feature-wise modules. To use datalabel, we need to inject DataLabel module <code>AccumulationDataLabel</code> into services
                </p>
                <p>
                    More information on the pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart" aria-label="Navigate to the documentation for Pie Chart in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Drilldown;