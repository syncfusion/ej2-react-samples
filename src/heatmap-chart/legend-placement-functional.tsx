import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, ITooltipEventArgs, TitleModel, AxisModel, PaletteSettingsModel, CellSettingsModel, LegendSettingsModel, LegendPosition } from '@syncfusion/ej2-react-heatmap';
import * as data from './legend-sample-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ChangeArgs } from "@syncfusion/ej2-buttons";

// custom code start
const SAMPLE_CSS: any = `
    #control-container {
        padding: 0px !important;
    }`;
// custom code end
const LegendPlacement = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    const [position, setPosition] = useState<LegendPosition>('Bottom');
    let heatmap = useRef<HeatMapComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let droplist: { [key: string]: Object }[] = [
        { value: 'Left' },
        { value: 'Right' },
        { value: 'Top' },
        { value: 'Bottom' }
    ];
    let title: TitleModel = {
        text: 'Hourly Weather Forecast',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let xAxis: AxisModel = {
        labels: ['London', 'Berlin', 'Madrid', 'Paris', 'Rome', 'Lisbon', 'Dublin'],
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    let yAxis: AxisModel = {
        labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    let paletteSettings: PaletteSettingsModel = {
        palette: [
            { value: 0, color: '#6EB5D0' },
            { value: 10, color: '#7EDCA2' },
            { value: 19, color: '#DCD57E' },
            { value: 22, color: '#DCD57E' }
        ]
    }
    let cellSettings: CellSettingsModel = {
        showLabel: false,
        format: '{value} C'
    }
    let legendSettings: LegendSettingsModel = {
        position: position,
        labelFormat: '{value}\xB0 C',
        title: {
            text: "Celsius",
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        textStyle: {
            fontFamily: 'inherit'
        }
    }
    const change = (args: any): void => {
        setPosition(args.value);
        heatmap.current.refresh();
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
    };

    const legendTooltip = (args: ITooltipEventArgs): void => {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + '\xB0 C'];
    };

    return (
        <main><div>
            <div className='col-md-8 control-section'>
                {/* custom code start */}
                <style>{SAMPLE_CSS}</style>
                {/* custom code end */}
                <HeatMapComponent id='heatmap-container' ref={heatmap} titleSettings={title} tooltipSettings={{ textStyle:{fontFamily: 'inherit'} }} xAxis={xAxis} yAxis={yAxis} dataSource={(data as any).legentSampleData} cellSettings={cellSettings} tooltipRender={legendTooltip} paletteSettings={paletteSettings} load={load.bind(this)} legendSettings={legendSettings}>
                    <Inject services={[Legend, Tooltip]} />
                </HeatMapComponent>
            </div>
            <div className="col-md-4 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft:-10 }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Legend Position:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="LegendPosition" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} text={position} value={position} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div >
               <section id="action-description" aria-label="Description of HeatMap sample">
                    <p>
                        This sample visualizes the hourly weather forecast for some major European cities. The data label is disabled in
                        this sample, the tooltip displays the data point values.  In property panel, the options are available to change the
                        display position of the Heatmap legend axes by means of dropdown.
                    </p>
                </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to change the display position of the Heatmap legend. You can change the display position
                    of legend to left, right, bottom and top by using the
                    <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/legendSettingsModel/#position" target="_blank"> position</a> property in
                    <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/legendSettingsModel/" target="_blank"> legendSettings</a>.
                </p>
                <p>
                    The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                        Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                </p>
            </section>
        </main>
    );
}
export default LegendPlacement;
