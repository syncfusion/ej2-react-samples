/**
  * Default sample for smith chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    SmithchartComponent, SmithchartSeriesCollectionDirective, SmithchartSeriesDirective, SmithchartTheme,
    ISmithchartLoadedEventArgs, SmithchartLegend, TooltipRender, Inject, TitleModel, RenderType
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
//custom code start
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
// custom code end

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // Code for Property Panel
    let smithchartInstance: SmithchartComponent;
    let dropElement: DropDownListComponent;

    let droplist: { [key: string]: Object }[] = [
        { text: 'Impedance', value: 'Impedance' },
        { text: 'Admittance', value: 'Admittance' },
    ];

    function typeChange() {
        let element: RenderType = dropElement.value as RenderType;
        smithchartInstance.renderType = element;
        smithchartInstance.refresh();
    }

    function load(args: ISmithchartLoadedEventArgs): void {
        args.smithchart.title.text = 'Transmission details';
        args.smithchart.title.visible = true;
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as SmithchartTheme;
    }


    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='col-md-9 control-section'>
                <SmithchartComponent load={load.bind(this)} id='container' ref={gauge => smithchartInstance = gauge}
                    legendSettings={{ visible: true, shape: 'Circle' }}>
                    <Inject services={[SmithchartLegend, TooltipRender]} />
                    <SmithchartSeriesCollectionDirective>
                        <SmithchartSeriesDirective
                            points={[
                                { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                                { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
                                { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
                                { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
                                { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
                                { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 },
                            ]} name='Transmission1' enableAnimation={true} tooltip={{ visible: true }}
                            marker={{ shape: 'Circle', visible: true, border: { width: 2 } }}>
                        </SmithchartSeriesDirective>
                        <SmithchartSeriesDirective
                            points={[
                                { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                                { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                                { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                                { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.5 },
                                { resistance: 3.5, reactance: 0 }, { resistance: 2.5, reactance: 0.4 },
                                { resistance: 2, reactance: 0.5 }, { resistance: 1.5, reactance: 0.5 },
                                { resistance: 1, reactance: 0.4 }, { resistance: 0.5, reactance: 0.2 },
                                { resistance: 0.3, reactance: 0.1 }, { resistance: 0, reactance: 0.05 },
                            ]} name='Transmission2' enableAnimation={true} tooltip={{ visible: true }}
                            marker={{ shape: 'Circle', visible: true, border: { width: 2 } }}>
                        </SmithchartSeriesDirective>
                    </SmithchartSeriesCollectionDirective>
                </SmithchartComponent>
            </div>
            {/* Property Panel */}
            <div className='col-md-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                    <tbody>
                        <tr style={{ height: '50px' }}>
                            <td style={{ width: '60%' }}>
                                <div>Render Type</div>
                            </td>
                            <td style={{ width: '40%' }}>
                                <div>
                                    <DropDownListComponent width="120px" index={0} ref={d => dropElement = d} change={typeChange.bind(this)} dataSource={droplist} fields={{ text: 'text', value: 'value' }} />
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes two transmissions in Smith chart. Rendering Smith chart can be changed by using the <code>Render Type</code> in properties panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a Smith chart with multiple series. Legend has been enabled to denote the series in Smith chart.</p>
                <p>
                    Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a data point or tap a data point in touch enabled devices
                </p><br />
                <b>Injecting Module</b><br /><br />
                <p>
                    Smith chart component features are segregated into individual feature-wise modules. To use a tooltip, inject the  <code>Tooltip</code> module using the <code>SmithChart.Inject(TooltipRender)</code> method, and use a legend by injecting the <code>Legend</code> module using the <code>SmithChart.Inject(Legend)</code> method.
                </p>
            </div>
        </div>
    )

}
export default Default;