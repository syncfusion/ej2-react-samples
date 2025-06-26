/**
 * Sample for grouping in Pie chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Browser} from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationTooltip, IAccTextRenderEventArgs, AccumulationTheme, Inject, AccumulationDataLabel, IAccPointRenderEventArgs, IAccLoadedEventArgs, GroupModes } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { loadAccumulationChartTheme} from './theme-color';
export let data1: any[] = [
    { x: 'China', y: 40, text: 'China: 40' },
  { x: 'Japan', y: 20, text: Browser.isDevice ? 'Japan<br> 20' : 'Japan: 20' },
  { x: 'Australia', y: 18, text: Browser.isDevice ? 'Australia<br> 18' : 'Australia: 18' },
  { x: 'France', y: 16, text: 'France: 16' },
  { x: 'Netherlands', y: 15, text: 'Netherlands: 15' },
  { x: 'Great Britain', y: 14, text: 'Great Britain: 14' },
  { x: 'South Korea', y: 13, text: 'South Korea: 13' },
  { x: 'Germany', y: 12, text: Browser.isDevice ? 'Germany<br> 12' : 'Germany: 12' },
  { x: 'Italy', y: 12, text: Browser.isDevice ? 'Italy<br> 12' : 'Italy: 12' },
  { x: 'Canada', y: 9, text: Browser.isDevice ? 'CA: 9' : 'Canada: 9' },
  { x: 'Hungary', y: 6, text: Browser.isDevice ? 'HU: 6' : 'Hungary: 6' },
  { x: 'Spain', y: 5, text: 'Spain: 5' },
  { x: 'Kenya', y: 4, text: 'Kenya: 4' },
  { x: 'Brazil', y: 3, text: 'Brazil: 3' }
];

const Grouping = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [clubText, setClubText] = useState<string>('9');
    let pie = useRef<AccumulationChartComponent>(null);
    let slider = useRef<HTMLInputElement>(null);
    let dropElement = useRef<DropDownListComponent>(null);    
    let droplist: { [key: string]: Object }[] = [
        { value: 'Point' },
        { value: 'Value' }
    ];
    const change = (): void => {
        pie.current.series[0].groupMode = dropElement.current.value as GroupModes;
        let currentValue: number = dropElement.current.value === 'Point' ? 9 : 8;
        pie.current.series[0].groupTo = currentValue.toString();
        pie.current.series[0].animation.enable = false;
        setClubText(currentValue.toString());
        slider.current.value = currentValue.toString();
        pie.current.removeSvg();
        pie.current.refreshSeries();
        pie.current.refreshChart();
    };
    const onChartLoad = (args: IAccLoadedEventArgs): void => {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    const onClubValue = (e: Event): void => {
        let clubvalue: string = slider.current.value;
        pie.current.series[0].groupTo = clubvalue;
        pie.current.series[0].animation.enable = false;
        setClubText(clubvalue);
        pie.current.removeSvg();
        pie.current.refreshSeries();
        pie.current.refreshChart();
    };
    const load = (args: IAccLoadedEventArgs): void => {
        loadAccumulationChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-9'>
                    <AccumulationChartComponent id='pie-chart' ref={pie} title='Summer Olympic 2024 - Gold Medals' subTitle='Source: wikipedia.org' load={load.bind(this)} tooltip={{ enable: true, header: "", format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>", enableHighlight: true }} legendSettings={{ visible: false }} enableSmartLabels={true} loaded={onChartLoad.bind(this)} enableBorderOnMouseMove={false}>
                        <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='Summer Olympics' animation={{ enable: true }} explode={true} radius={Browser.isDevice ? '40%'  : '55%' } groupTo='9' groupMode='Point' startAngle={-20} endAngle={340} innerRadius='0%' borderRadius={3} border={{ width: 1, color: '#ffffff' }} dataLabel={{ visible: true, name: 'text', position: 'Outside', connectorStyle: { type: 'Curve', length: Browser.isDevice ? '10px' : '20px' }, font: { size: Browser.isDevice ? '8px' : '13px', fontWeight: '600' } }} />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '50%' }}>
                                    <div>Mode: </div>
                                </td>
                                <td style={{ padding: 10, width: '50%' }}>
                                    <DropDownListComponent width={120} id="modes" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Point" />
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="groupValue">Group To:
                                        <p id="clubtext" style={{ fontWeight: 'normal' }}>{clubText}</p>
                                    </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="range" name="clubvalue" onChange={onClubValue.bind(this)} ref={slider} defaultValue="9" min="0" max="27" id="clubvalue" style={{ marginLeft: '-5px' }} aria-labelledby="Slider"/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows the gold medal count scored by each country at the summer olympic 2024 games, along with the pie series grouping functionality.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to group points based on count and values. The slice can be grouped based on the number of points by specifying the <code>GroupMode</code> to Point. For example, if the <code>GroupTo</code> property is set to 10, the chart will display the first 10 points and the remaining entries from the collection will be grouped as a single point. The slice can also be grouped based on values by specifying the <code>GroupMode</code> to Value. For example, if the <code>GroupTo</code> is set to 10, the first 10 points with a lower value will be grouped together and shown as a single point while the others as a slice.
                </p>
                <p> A <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.</p>
                <p>
                    More information on the grouping in pie series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accumulation-chart/grouping" aria-label="Navigate to the documentation for Grouping in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Grouping;