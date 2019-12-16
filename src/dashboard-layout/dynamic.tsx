import * as ReactDOM from "react-dom";
import * as React from "react";
import { SampleBase } from "../common/sample-base";
import { DashboardLayoutComponent, PanelModel, PanelsDirective, PanelDirective, ResizeArgs } from "@syncfusion/ej2-react-layouts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, AccumulationLegend, PieSeries, AccumulationTooltip,ColumnSeries, SeriesCollectionDirective, SeriesDirective,
    AccumulationDataLabel, ChartComponent, Legend, Category, Tooltip,  DataLabel, SplineAreaSeries, DateTime,
  } from "@syncfusion/ej2-react-charts";
import "./dynamic.css";


export class DynamicWidget extends SampleBase<{}, {hideDialog: boolean;}> {

    public btnobj: ButtonComponent;
    public dashboardObj: DashboardLayoutComponent;
    public dialogObj: DialogComponent;
    constructor(props: {}) {
        super(props);
        this.state = {
            hideDialog : false
        };
    }
    btnClick(): void {
        if (this.btnobj.element.classList.contains('e-active')) {
            this.dashboardObj.allowDragging = true;
            this.dashboardObj.allowResizing = true;
            this.btnobj.content = "Save";
            this.btnobj.iconCss = 'save';
            document.getElementById('dialogBtn').style.display = 'block';
        }else {
            this.dashboardObj.allowDragging = false;
            this.dashboardObj.allowResizing = false;
            this.btnobj.content = "Edit";
            this.btnobj.iconCss = 'edit';
            document.getElementById('dialogBtn').style.display = 'none';
        }
    }
    onPanelResize(args: ResizeArgs): void {
        if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
            let chartObj: any = ((args.element.querySelector('.e-panel-container .e-panel-content div div')) as any).ej2_instances[0];
            chartObj.height = '95%';
            chartObj.width = '100%';
            chartObj.refresh();
        }
    }
    public content(data: any): JSX.Element {
        return (
            <div id="dialogcontent">
                <div>
                    <div id="linetemplate" >
                        <p className="dialog-text">Linechart (1x1) </p>
                    </div>
                    <div id="pietemplate" >
                        <p className="dialog-text">Piechart (1x1) </p>
                    </div>
                    <div id="splinetemplate" >
                        <p className="dialog-text">Splinechart (2x1) </p>
                    </div>
                </div>
            </div>
        );
    }
    private count: number = 4;
    public onAdd(): void {
        let proxy: any = this;
        let panel: PanelModel[] = [{
            "id": this.count.toString() + "_layout", "sizeX": 2, "sizeY": 2, "row": 0, "col": 0,
            header: "<div>Panel" + this.count.toString() + "</div>", content: "<div></div>"
        }];
        this.count = this.count + 1;
        proxy.dashboardObj.addPanel(panel[0]);
    }

    public splineTemplate(): JSX.Element{
        let splineData1: object[] = [
            { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
            { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
            { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
            { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
        ];

        let splineData2: object[] = [
            { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
            { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
            { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
            { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
        ];
        return(
        <div className="template" >
            <ChartComponent style={{ "height":"100%", "width":"100%", textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            labelFormat: 'MMM',
                            majorGridLines: { width: 0 },
                            intervalType: 'Months',
                            edgeLabelPlacement: 'Shift'
                        }}
                        primaryYAxis={{
                            labelFormat: '{value}%',
                            lineStyle: { width: 0 },
                            maximum: 4, interval: 1,
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}>
                        <Inject services={[SplineAreaSeries, DateTime, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={splineData1} xName='x' yName='y' name='Jan'
                                opacity={0.5} type='SplineArea' width={2} fill='rgb(239, 183, 202)'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={splineData2} xName='x' yName='y' name='Feb'
                                opacity={0.5} type='SplineArea' width={2}  fill='rgb(0, 189, 174)'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
            </div>
        );
    }

    public lineTemplate(): JSX.Element{
        let data1: any[] = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
        let data2: any[] = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
        let data3: any[] = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];
        return(
        <div className="template" >
             <ChartComponent style={{"height":"100%", "width":"100%"}}
                        primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }}
                        primaryYAxis={{
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }}>
                        <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Jan' type='Column'
                                marker={{ dataLabel: { visible: false }}} fill = '#00bdae'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Feb' type='Column'
                                marker={{ dataLabel: { visible: false }}} fill = '#e56691'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Mar' type='Column'
                                marker={{ dataLabel: { visible: false }}} fill = '#357cd2'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
            </div>
        );
    }

    public pieTemplate(): JSX.Element{
        let pieData: object[] = [
            { "x": "Jan", y: 12.5, text: "January" },
            { "x": "Feb", y: 25, text: "February" },
            { "x": "Mar", y: 50, text: "March" },
        ];
        let piePalette: string[] = ["#00bdaed1", "#357cd2bf", "#e56691e8"];
        return(
        <div className="template" >
            <AccumulationChartComponent style={{"height":"100%", "width":"100%"}}
              legendSettings={{ visible: false }}
              enableSmartLabels={true}
              enableAnimation={true}
              center={{x: '50%', y: '50%'}}
              
              tooltip={{enable: true, header: '<b>${point.x}</b>', format: 'Composition : <b>${point.y}%</b>' }}>
              <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={pieData} name='Earnings' xName='x' yName='y'
                  dataLabel={{ visible: true, position: 'Inside', name: 'value', font: { fontWeight: '600' }}}
                  radius='100%' innerRadius="40%" palettes ={ ['#00bdae', '#357cd2', '#e56691']}>
                </AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
        </div>
        );
    }


    private cellSpacing: number [] = [10, 10];

    public render(): JSX.Element {
        return (
            <div>
                <div id='edit_target' className="control-section">
                <div>
                    <div style={{"width":"100%" , "height": "30px"}}>
                        <ButtonComponent  cssClass='e-outline e-flat e-primary' ref={(scope) => { this.btnobj = scope; }} iconCss='edit' 
                            isToggle={true} onClick={ this.btnClick.bind(this) } style={{"float":"right", "width": "75px"}}>
                            Edit
                        </ButtonComponent>
                    </div>
                    <div style={{"padding":"5px", "text-align": "end"}}>
                        <div id="dialogBtn" className="add-widget-button e-control e-btn e-lib" onClick={ this.dlgClick.bind(this) }>
                            Add New Widget
                        </div>
                    </div>
                </div>
                <DashboardLayoutComponent id="edit_dashboard" columns={2} cellSpacing={this.cellSpacing} ref={(scope) => { this.dashboardObj = scope; }} 
                 resizeStop={ this.onPanelResize.bind(this) } allowResizing={false} allowDragging={false}>
                <PanelsDirective>
                    <PanelDirective sizeX={1} sizeY={1} row={0} col={0} content={this.lineTemplate as any} header="<div>Line Chart</div>"></PanelDirective>
                    <PanelDirective sizeX={1} sizeY={1} row={0} col={1} content={this.pieTemplate as any} header="<div>Pie Chart</div>"></PanelDirective>
                    <PanelDirective sizeX={2} sizeY={1} row={1} col={0} content={this.splineTemplate as any} header="<div>Spline Chart</div>"></PanelDirective>
                </PanelsDirective>
                </DashboardLayoutComponent>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates a editable dashboard layout. Initially the DashboardLayout component
                        doesn't allow to <a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowdragging" target="_blank">drag</a>, 
                        <a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing" target="_blank">resize</a> or reorder the panels. 
                        After clicking the edit button, the layout becomes 
                         editable which allows to drag and reorder the panels as per the requirement and also you can
                        add new panels to the layout with predefined templates by clicking the add new button and reorder them
                        by dragging and placing in the required position. Drag and resizing of the panles are not applicable 
                        in mobile resolution.
                    </p>
                </div>
                <div id="description">
                The following sample demonstrates about using the dashboard layout as an editable layout.
                </div>
                <DialogComponent id="listdialog" width="500px" height="260px" visible={this.state.hideDialog} header={"Add a widget"} showCloseIcon={true}
                animationSettings={{effect:'Zoom'}} isModal={true} target='#edit_target' ref={(scope) => { this.dialogObj = scope; }} content= {this.content as any}>
                </DialogComponent>
            </div>
);
    }
    dlgClick(): void {
        this.setState({ hideDialog: true });
        document.getElementById('linetemplate').onclick = () => {
            let countValue: string = this.count.toString();
            let panel: PanelModel[] = [{
                'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                header: '<div>Line Chart</div>', content: this.lineTemplate as any
            }];
            this.count = this.count + 1;
            this.dashboardObj.addPanel(panel[0]);
            this.setState({ hideDialog:false });
        };
        document.getElementById('pietemplate').onclick = () => {
            let countValue: string = this.count.toString();
            let panel: PanelModel[] = [{
                'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                header: '<div>Pie Chart</div>', content: this.pieTemplate as any
            }];
            this.count = this.count + 1;
            this.dashboardObj.addPanel(panel[0]);
            this.setState({ hideDialog:false });
        };
        document.getElementById('splinetemplate').onclick = () => {
            let countValue: string = this.count.toString();
            let panel: PanelModel[] = [{
                'id': '_layout' + countValue, 'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
                header: '<div>Spline Chart</div>', content: this.splineTemplate as any
            }];
            this.count = this.count + 1;
            this.dashboardObj.addPanel(panel[0]);
            this.setState({ hideDialog: false });
        };
    }

    
}