import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, Adaptor, Legend } from '@syncfusion/ej2-react-heatmap';
import { SampleBase } from '../common/sample-base';

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}
#source{
    float: right; margin-right: 10p
}`;
// custom code end
export class Label extends SampleBase<{}, {}> {
    private jsonCellData: Object = [
        { 'rowId': 'Improbable', 'columnId': 'Negligible', 'value': '2', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Low', 'value': '4', 'image' : 'src/heatmap-chart/images/green-cross.png'},
        { 'rowId': 'Improbable', 'columnId': 'Moderate', 'value': '6', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Significant', 'value':'8', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Catastrophic', 'value': '10', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Negligible', 'value': '4', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Low', 'value': '16', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Moderate', 'value': '24', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Remote', 'columnId': 'Significant', 'value': '32', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Remote', 'columnId': 'Catastrophic', 'value': '40', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Negligible', 'value': '6', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Occasional', 'columnId': 'Low', 'value': '24', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Moderate', 'value': '36', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Significant', 'value': '48', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Catastrophic', 'value': '60', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Negligible', 'value': '8', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Probable', 'columnId': 'Low', 'value': '32', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Moderate', 'value': '48', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Significant', 'value': '64', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Catastrophic', 'value': '80', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Negligible', 'value': '10', 'image' : 'src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Frequent', 'columnId': 'Low', 'value': '40', 'image' : 'src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Moderate', 'value': '60', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Significant', 'value': '80', 'image' : 'src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Catastrophic', 'value': '100', 'image' : 'src/heatmap-chart/images/red-tick.png' }];
    render() {
        return (
            <main><div className='control-pane'>
                {/* custom code start */}
                <style>
                    {SAMPLE_CSS}
                </style>
                {/* custom code end */}
                <div className='control-section'>
                    <HeatMapComponent id='heatmap-container'
                        xAxis={{
                            title: {
                                text: 'LIKELIHOOD',
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            },
                            labels: ["Improbable", "Remote", "Occasional", "Probable", "Frequent"],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        yAxis={{
                            title: {
                                text: 'IMPACT',
                                textStyle: {
                                    fontFamily: 'inherit'
                                }
                            },
                            labels: ["Negligible", "Low", "Moderate", "Significant", "Catastrophic"],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        legendSettings = {{
                            visible:false
                        }}
                        dataSourceSettings={{
                            isJsonData: true,
                            adaptorType: 'Cell',
                            xDataMapping: 'rowId',
                            yDataMapping: 'columnId',
                            valueMapping: 'value'
                        }}
                        dataSource={this.jsonCellData}
                        cellSettings={{
                            labelTemplate:'<div><img alt="Description of the label template" src="${image}" style="width: 35px; height: 35px;"/></div>',
                            border: {                           
                                color: 'white'
                            },
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        tooltipSettings={{
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }}
                        load={this.load.bind(this)}
                        paletteSettings={{
                            type: 'Fixed',
                            palette: [{ value:2, color:"#61c961" },
                            { value:24, color:"#fcc81c" },
                            { value:48, color:"#ff6354" }
                            ],
                        }}>
                        <Inject services={[Tooltip, Adaptor, Legend]} />
                    </HeatMapComponent>
                 </div>
            </div >
                <section id="action-description" aria-label="Description of HeatMap sample">
                <p>
                    This sample illustrates a comprehensive view of the likelihood and impact of an organization’s risks. Risks that fall into the HeatMap's green zones require no action. Action is required in the yellow areas. Risks that fall into the red zone require immediate action.
                </p>
             </section>
             <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>In this example, you can see how to use the <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#labeltemplate">labelTemplate</a> to display images in the HeatMap cells. The <code>labelTemplate</code> can be used to add any HTML elements into the HeatMap cells, such as images, text, and so on.</p>
                <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Heatmap component features are separated into discrete feature-based modules. To use a tooltip and adaptor, inject the <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/adaptorType/" target='_blank'>Adaptor </a> module using the <code>{'<Inject services={[Tooltip, Adaptor]} />'}</code> method.
                </p>
                <p>More information about label template can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/appearance#template">documentation section</a>.</p>
            </section>
        </main>
        );
    }

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
        // custom code end
    };
}
