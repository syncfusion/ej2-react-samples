import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
import { AIStockForecasting } from './stock-forecasting/frontend/ai-stock-forecasting';

/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
export class StockForecasting extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AIStockForecasting />
                </div>
                <div id="action-description">
                    <p>
                    This sample demonstrates AI-powered stock price forecasting for a
                    configurable symbol (MSFT, GOOG, AMZN, or TSLA) and time range
                    (3 / 6 / 9 / 12 months). Pick a symbol and series type, then click <strong>AI Forecast</strong> to ask the AI service to project the
                    next 35 trading days of OHLC data.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The chart visualises daily OHLC (open / high / low / close) data
                        fetched from the Syncfusion CDN. The <strong>AI Forecast</strong> action sends the most recent 10 trading days to the AI service,
                        which returns a delta payload describing the projected candlesticks
                        and the strip line that separates observed data from the forecast.
                    </p>
                    <p>
                        The series can be toggled between <strong>Candle</strong>, <strong>Line</strong>, and <strong>HiloOpenClose</strong> rendering, and the chart re-renders
                        in place without losing its scroll / zoom state.
                    </p>
                    <p>
                        <strong>Injecting Module</strong>
                    </p>
                        <p>
                        To render OHLC / candlestick series, inject
                        <code>CandleSeries</code> and <code>HiloOpenCloseSeries</code>
                        alongside <code>LineSeries</code>, <code>DateTime</code>,
                        <code>Legend</code>, <code>Tooltip</code>, and
                        <code>StripLine</code> into <code>services</code>.
                        </p>
                </div>
                <AIToast/> 
            </div>
        )
    }
}