import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, TitleModel, AxisModel, PaletteSettingsModel, CellSettingsModel, DataModel } from '@syncfusion/ej2-react-heatmap';
import { Adaptor, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
import { updateSampleSection } from '../common/sample-base';

// custom code start
const SAMPLE_CSS: any = `
    #control-container {
        padding: 0px !important;
    }
    #source{
        float: right; margin-right: 10p
    }`;
// custom code end
const JsonRow = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    let jsonTableData: Object = [
        { 'Region': 'USA', '2000': 93, '2004': 101, '2008': 112, '2012': 103, '2016': 121 },
        { 'Region': 'GBR', '2000': 28, '2004': 30, '2008': 49, '2012': 65, '2016': 67 },
        { 'Region': 'China', '2000': 58, '2004': 63, '2008': 100, '2012': 91, '2016': 70 },
        { 'Region': 'Russia', '2000': 89, '2004': 90, '2008': 60, '2012': 69, '2016': 55 },
        { 'Region': 'Germany', '2000': 56, '2004': 49, '2008': 41, '2012': 44, '2016': 42 },
        { 'Region': 'Japan', '2000': 18, '2004': 37, '2008': 25, '2012': 38, '2016': 41 },
        { 'Region': 'France', '2000': 38, '2004': 33, '2008': 43, '2012': 35, '2016': 42 },
        { 'Region': 'KOR', '2000': 28, '2004': 30, '2008': 32, '2012': 30, '2016': 21 },
        { 'Region': 'Italy', '2000': 34, '2004': 32, '2008': 27, '2012': 28, '2016': 28 }
    ];
    let title: TitleModel = {
        text: 'Olympic Medal Achievements of most Successful Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let xAxis: AxisModel = {
        labels: ['China', 'France', 'GBR', 'Germany', 'Italy', 'Japan', 'KOR', 'Russia', 'USA'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle:{
            fontFamily: 'inherit'
        }
    }
    let yAxis: AxisModel = {
        title: { text: 'Olympic Year',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        labels: ['2000', '2004', '2008', '2012', '2016'],
        textStyle:{
            fontFamily: 'inherit'
        }
    }
    let paletteSettings: PaletteSettingsModel = {
        palette: [
            { color: '#F0C27B' },
            { color: '#4B1248' }
        ]
    }
    let cellSettings: CellSettingsModel = {
        border: {
            width: 1,
            radius: 4,
            color: 'white'
        },
        textStyle:{
            fontFamily: 'inherit'
        }
    }
    let dataSourceSettings: DataModel = {
        isJsonData: true,
        adaptorType: 'Table',
        xDataMapping: 'Region'
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as HeatMapTheme;
        // custom code end
    };

    const tooltipTemplate = (args: ITooltipEventArgs): void => {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' Medals'];
    };

    return (
        <main><div className='control-pane'>
            {/* custom code start */}
            <style>{SAMPLE_CSS}</style>
            {/* custom code end */}
            <div className='control-section'>
                <HeatMapComponent id='heatmap-container' titleSettings={title} xAxis={xAxis} yAxis={yAxis} dataSource={jsonTableData} dataSourceSettings={dataSourceSettings} paletteSettings={paletteSettings} cellSettings={cellSettings} tooltipSettings={{ textStyle: {fontFamily: 'inherit'}}} legendSettings={{ textStyle: { fontFamily: 'inherit' }}} load={load.bind(this)} tooltipRender={tooltipTemplate}>
                    <Inject services={[Legend, Tooltip, Adaptor]} />
                </HeatMapComponent>
            </div>
            <div id="source">Source:
                <a href="https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table" target="_blank">https://en.wikipedia.org/</a>
            </div>
        </div >
            <section id="action-description" aria-label="Description of HeatMap sample">
                <p>This sample visualizes the overall Olympic medals won by the countries in all the summer Olympic events from the year 2000 to 2016.</p>
            </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to bind JSON data and configure the Heatmap using the data adaptor support. You can bind
                the JSON data with information for each row to the Heatmap using
                <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#isjsondata" target="_blank"> isJsonData</a> and by defining the
                <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#adaptortype" target="_blank"> adaptorType</a> properties. In row JSON data, the row header is mapped using the
                <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#xdatamapping" target="_blank"> xDataMapping</a>.
                </p>
                <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Heatmap component features are separated into discrete feature-based modules. To use a tooltip, adaptor and the legend, inject the <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a>, <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/adaptorType/" target='_blank'>Adaptor </a> and <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Adaptor, Legend]} />'}</code> method.
                </p>
            </section>
        </main>
    );
}
export default JsonRow;
