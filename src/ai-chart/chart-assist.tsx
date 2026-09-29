import * as React from 'react';
import { SampleBase, updateAISampleSection } from '../common/sample-base';
import { AIChartGeneration } from './chart-assist/frontend/ai-chart-generation';

/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class ChartGeneration extends SampleBase<{}, {}> {
    public componentDidMount(): void {
        updateAISampleSection();
    }

    public render(): JSX.Element {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <AIChartGeneration />
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Syncfusion <strong>React AI AssistView</strong> component as a
                        <strong> Chart Assist</strong> solution. Use natural-language prompts to create, visualize,
                        modify, export, and print charts. The assistant provides interactive chart previews, complete
                        React TypeScript samples, and modified standalone samples directly within the conversation.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <strong>Chart Assist</strong> experience uses the React AI AssistView component to interpret
                        natural-language prompts and return a structured <code>blocks</code> response. A registered
                        <code> chart-tool</code> receives the chart configuration and renders either a
                        <code> ChartComponent</code> for cartesian charts or an
                        <code> AccumulationChartComponent</code> for circular charts.
                    </p>
                    <ul>
                        <li>
                            The <code>promptSuggestions</code> property provides predefined prompts for trend,
                            comparison, and multi-series visualizations.
                        </li>
                        <li>
                            The <code>promptRequest</code> event sends user instructions to the AI service and processes
                            the returned text and chart-tool blocks.
                        </li>
                        <li>
                            The <code>registerToolUI()</code> method registers a response-specific React chart template,
                            allowing every generated or restored chart to retain its own configuration and chart instance.
                        </li>
                        <li>
                            Cartesian and circular charts use canonical <code>xvalue</code> and <code>yvalue</code> fields
                            to keep the data source and series mappings consistent.
                        </li>
                        <li>
                            Natural-language modifications can configure tooltips, legends, crosshairs, zooming,
                            selection, highlighting, data labels, annotations, strip lines, error bars, trendlines,
                            technical indicators, chart areas, palettes, and supported series types.
                        </li>
                        <li>
                            Annotation and tooltip template content is rendered directly through React JSX without an
                            external HTML template element or template ID.
                        </li>
                        <li>
                            Each chart preview provides controls to export the corresponding chart as PNG, JPEG, SVG, or
                            PDF and to print that specific chart.
                        </li>
                        <li>
                            Chat history stores independent response blocks and chart configurations so selecting a
                            history entry restores only the selected chart response.
                        </li>
                    </ul>
                    <p>
                        <strong>Injecting modules</strong>
                    </p>
                    <p>
                        React Chart features are enabled through the <code>Inject</code> directive. Cartesian charts
                        inject the required series, axis, legend, tooltip, export, zoom, crosshair, selection,
                        highlighting, annotation, strip-line, data-label, error-bar, trendline, and technical-indicator
                        services. Circular charts inject the required pie, funnel, pyramid, accumulation legend,
                        accumulation tooltip, and export services.
                    </p>
                    <p>
                        The chart preview automatically selects a light, dark, or high-contrast chart theme from the
                        current sample theme. Every chart response owns its chart instance, ensuring that export, print,
                        and history actions operate on the intended chart.
                    </p>
                    <p>
                        More information about the React AI AssistView component is available in the
                        <a
                            href="https://ej2.syncfusion.com/react/documentation/ai-assistview/getting-started/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Navigate to the React AI AssistView getting started documentation">
                            documentation section
                        </a>.
                    </p>
                </div>
                <AIToast />
            </div>
        );
    }
}
