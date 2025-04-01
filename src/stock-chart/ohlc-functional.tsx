/**
 * Sample for Stock Chart with Hilo open close
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { googl } from './stock-data';
import { updateSampleSection } from '../common/sample-base';
import { EmitType } from '@syncfusion/ej2-base';
import { loadStockChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;

const OHLC = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IStockChartEventArgs): void => {
        loadStockChartTheme(args);
    };
    const tooltipRender: EmitType<ITooltipRenderEventArgs> = (args: ITooltipRenderEventArgs) => {
        if (args.text.split('<br/>')[4]) {
            let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
            let value: string = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <StockChartComponent id='stockchartohlc' primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} primaryYAxis={{ labelFormat: 'n0', lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: { height: 0 } }} load={load.bind(this)} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true, position:'Nearest' }} tooltipRender={tooltipRender} crosshair={{ enable: true }} title='AAPL Stock Price'>
                    <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={googl} xName='x' high='high' low='low' open='open' close='close' type='HiloOpenClose' bearFillColor={'#2ecd71'} bullFillColor={'#e74c3d'} animation={{ enable: true }} />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>This <a target="_blank" href="https://www.syncfusion.com/react-components/react-stock-chart" aria-label="React Stock Chart in OHLC">React Stock Chart</a> example visualizes the AAPL stock price with OHLC chart. Tooltip and crosshair show the information about the data and period.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the stock chart with <code>HILO Open Close</code> type series. The horizontal lines on the left and the right are used to show the open and close values of the stock, and the vertical line represents both high and low values.
                </p>
                <p>
                    <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    The stock chart component features are segregated into individual feature-wise modules. To use date-time axis,
                    inject the <code>DateTime</code> module into <code>services</code>. To use the OHLC, inject the <code>HiloOpenCloseSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for React Stock Chart series types">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default OHLC;
