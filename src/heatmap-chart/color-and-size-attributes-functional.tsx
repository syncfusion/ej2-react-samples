import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { HeatMapComponent, Legend, Adaptor, Tooltip, BubbleTooltipData, ILoadedEventArgs, HeatMapTheme, Inject, ITooltipEventArgs, TitleModel, DataModel, CellSettingsModel, PaletteSettingsModel } from '@syncfusion/ej2-react-heatmap';
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

const ColorAndSizeAttributes = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    let jsonCellBubbleData: Object = [
        { Year: '2017', Months: 'Jan-Feb', Accidents: 4, Fatalities: 39 },
        { Year: '2017', Months: 'Mar-Apr', Accidents: 3, Fatalities: 8 },
        { Year: '2017', Months: 'May-Jun', Accidents: 1, Fatalities: 3 },
        { Year: '2017', Months: 'Jul-Aug', Accidents: 1, Fatalities: 0 },
        { Year: '2017', Months: 'Sep-Oct', Accidents: 4, Fatalities: 4 },
        { Year: '2017', Months: 'Nov-Dec', Accidents: 2, Fatalities: 15 },
        { Year: '2016', Months: 'Jan-Feb', Accidents: 4, Fatalities: 28 },
        { Year: '2016', Months: 'Mar-Apr', Accidents: 5, Fatalities: 92 },
        { Year: '2016', Months: 'May-Jun', Accidents: 5, Fatalities: 73 },
        { Year: '2016', Months: 'Jul-Aug', Accidents: 3, Fatalities: 1 },
        { Year: '2016', Months: 'Sep-Oct', Accidents: 3, Fatalities: 4 },
        { Year: '2016', Months: 'Nov-Dec', Accidents: 4, Fatalities: 126 },
        { Year: '2015', Months: 'Jan-Feb', Accidents: 1, Fatalities: 45 },
        { Year: '2015', Months: 'Mar-Apr', Accidents: 5, Fatalities: 152 },
        { Year: '2015', Months: 'May-Jun', Accidents: 0, Fatalities: 0 },
        { Year: '2015', Months: 'Jul-Aug', Accidents: 4, Fatalities: 54 },
        { Year: '2015', Months: 'Sep-Oct', Accidents: 5, Fatalities: 243 },
        { Year: '2015', Months: 'Nov-Dec', Accidents: 2, Fatalities: 45 },
        { Year: '2014', Months: 'Jan-Feb', Accidents: 2, Fatalities: 18 },
        { Year: '2014', Months: 'Mar-Apr', Accidents: 3, Fatalities: 239 },
        { Year: '2014', Months: 'May-Jun', Accidents: 0, Fatalities: 0 },
        { Year: '2014', Months: 'Jul-Aug', Accidents: 4, Fatalities: 501 },
        { Year: '2014', Months: 'Sep-Oct', Accidents: 1, Fatalities: 2 },
        { Year: '2014', Months: 'Nov-Dec', Accidents: 4, Fatalities: 162 },
        { Year: '2013', Months: 'Jan-Feb', Accidents: 2, Fatalities: 68 },
        { Year: '2013', Months: 'Mar-Apr', Accidents: 3, Fatalities: 7 },
        { Year: '2013', Months: 'May-Jun', Accidents: 2, Fatalities: 12 },
        { Year: '2013', Months: 'Jul-Aug', Accidents: 4, Fatalities: 15 },
        { Year: '2013', Months: 'Sep-Oct', Accidents: 2, Fatalities: 64 },
        { Year: '2013', Months: 'Nov-Dec', Accidents: 3, Fatalities: 83 },
        { Year: '2012', Months: 'Jan-Feb', Accidents: 0, Fatalities: 0 },
        { Year: '2012', Months: 'Mar-Apr', Accidents: 2, Fatalities: 158 },
        { Year: '2012', Months: 'May-Jun', Accidents: 5, Fatalities: 90 },
        { Year: '2012', Months: 'Jul-Aug', Accidents: 0, Fatalities: 0 },
        { Year: '2012', Months: 'Sep-Oct', Accidents: 3, Fatalities: 33 },
        { Year: '2012', Months: 'Nov-Dec', Accidents: 4, Fatalities: 42 }
    ];
    let title: TitleModel = {
        text: 'Commercial Aviation Accidents and Fatalities by year 2012 - 2017',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let dataSourceSettings: DataModel = {
        isJsonData: true,
        adaptorType: 'Cell',
        xDataMapping: 'Year',
        yDataMapping: 'Months',
        bubbleDataMapping: { size: 'Accidents', color: 'Fatalities' }
    }
    let cellSettings: CellSettingsModel = {
        border: {
            width: 0
        },
        showLabel: false,
        tileType: 'Bubble',
        bubbleType: 'SizeAndColor'
    }
    let paletteSettings: PaletteSettingsModel = {
        palette: [{ color: '#C06C84' },
        { color: '#355C7D' }
        ],
        type: 'Gradient'
    }
    
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
    };

    const legendTooltip = (args: ITooltipEventArgs): void => {
        args.content = ['Year ' + ' : ' + args.xLabel + '<br/>' + 'Months ' + ' : ' + args.yLabel + '<br/>'
            + 'Accidents ' + ' : ' + (args.value as BubbleTooltipData[])[0].bubbleData + '<br/>' + 'Fatalities ' + ' : '
            + (args.value as BubbleTooltipData[])[1].bubbleData];
    };

    return (
        <div className='control-pane'>
            {/* custom code start */}
            <style>{SAMPLE_CSS}</style>
            {/* custom code end */}
            <div className='control-section'>
                <HeatMapComponent id='heatmap-container' titleSettings={title} xAxis={{ labels: ['2017', '2016', '2015', '2014', '2013', '2012'], textStyle: { fontFamily: 'inherit' } }} yAxis={{ labels: ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sep-Oct', 'Nov-Dec'], textStyle: { fontFamily: 'inherit' } }} dataSource={jsonCellBubbleData} dataSourceSettings={dataSourceSettings} cellSettings={cellSettings} tooltipRender={legendTooltip} paletteSettings={paletteSettings} load={load.bind(this)} tooltipSettings={{ textStyle: { fontFamily: 'inherit' } }} legendSettings={{ visible: true, textStyle: { fontFamily: 'inherit' } }}>
                    <Inject services={[Adaptor, Tooltip, Legend]} />
                </HeatMapComponent>
                <div id="source">Source:
                    <a href="https://en.wikipedia.org" target='_blank'>https://en.wikipedia.org/</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates the number of commercial air craft accidents and the fatalities across the world between 2012 and 2017. Each data point interprets the accident count and the fatality associated with the accident, the size of the bubble depicts the accident count and the shade of the bubble depicts the fatality count.</p>
            </div>
            <div id="description">
            <p>
                    In this example, you can see how to map more than one data for each data point or cell of the bubble heatmap. The <code>size</code> and <code>shade</code> parameters of the bubble is used to depict the data source values. The legend will be displayed only for the shade parameter of the bubble. For JSON data, you can specify which data source value should be mapped to either size or shade of the bubble parameters using the <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#bubbledatamapping">bubbleDataMapping</a> property. The data source field should be mapped to the <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/bubbleDataModel/#size">size</a> and <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/bubbleDataModel/#color">color</a> properties of the <code>bubbleDataMapping</code> property.
            </p>
            <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
            <br></br>
            <p><b>Injecting Module</b></p>
            <p>
                Heatmap component features are separated into discrete feature-based modules. To use a tooltip, adaptor and the legend, inject the <a target="_blank"
                href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a>, <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/adaptorType/" target='_blank'>Adaptor </a> and <a target="_blank"
                href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Adaptor, Legend]} />'}</code> method.
            </p>
            </div>
        </div >
    );
}
export default ColorAndSizeAttributes;
