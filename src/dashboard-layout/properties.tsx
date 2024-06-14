import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DashboardLayoutComponent, PanelModel, PanelsDirective, PanelDirective } from '@syncfusion/ej2-react-layouts';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import './properties.component.css';

export class Properties extends SampleBase<{}, {}> {

    private count: number = 5;

    public onAdd(): void {
        this.count = this.count + 1;
        let proxy: any = this;
        let panel: PanelModel[] = [{
            'id': this.count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
            header: '<div>Panel ' + this.count.toString() + '</div>', content: '<div></div>'
        }];
        proxy.dashboardObj.addPanel(panel[0]);
    }

    public remove(): void {
        if (this.dashboardObj.panels.length > 0) {
            for (let i: number = this.dashboardObj.panels.length - 1; i < this.dashboardObj.panels.length; i++) {
                this.dashboardObj.removePanel(this.dashboardObj.panels[this.dashboardObj.panels.length - 1 - i].id);
            }
        }
    }

    public onCellChange(args: ChangeEventArgs): void {
        this.dashboardObj.cellSpacing = [parseInt((args as any).value, 10), parseInt((args as any).value, 10)];
    }

    public onChange(args: any): void {
        let proxy: any = this;
        if (args.event.currentTarget.firstChild.childNodes[0].id === 'floating') {
            proxy.dashboardObj.allowFloating = args.checked;
        }
        if (args.event.currentTarget.firstChild.childNodes[0].id === 'resizing') {
            proxy.dashboardObj.allowResizing = args.checked;
        }
    }
    public dashboardObj: DashboardLayoutComponent;
    public txtObj: NumericTextBoxComponent;
    private cellSpacing: number[] = [5, 5];

    // custom code start
  onCreate(): void {
    if (document.querySelector('.container-fluid.custom')) {
      document.querySelector('.container-fluid').classList.remove('custom')
    }
  }
  // custom code end

    public render(): JSX.Element {
        return (
            <div>
                <div className="col-lg-8 control-section" id="control_dash">
                    <div className="content-wrapper" style ={{"maxWidth": "100%"}}>
                    <DashboardLayoutComponent created={ this.onCreate.bind(this) } id="api_dashboard" columns={6} cellSpacing={this.cellSpacing} ref={(scope) => { this.dashboardObj = scope; }} allowResizing={true}>
                        <PanelsDirective>
                            <PanelDirective header="<div>Panel 1</div>" content="<div></div>" sizeX={2} sizeY={2} row={0} col={0}></PanelDirective>
                            <PanelDirective header="<div>Panel 2</div>" content="<div></div>" sizeX={2} sizeY={2} row={0} col={2}></PanelDirective>
                            <PanelDirective header="<div>Panel 3</div>" content="<div></div>" sizeX={2} sizeY={2} row={0} col={4}></PanelDirective>
                            <PanelDirective header="<div>Panel 4</div>" content="<div></div>" sizeX={4} sizeY={2} row={2} col={0}></PanelDirective>
                            <PanelDirective header="<div>Panel 5</div>" content="<div></div>" sizeX={2} sizeY={2} row={2} col={4}></PanelDirective>
                        </PanelsDirective>
                    </DashboardLayoutComponent>
                    </div>
                </div>
                <div className="col-lg-4 property-section dashboard" id="api_property">
                    <div className="property-panel-header"> Properties </div>
                    <div className="row property-panel-content">
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label form-label">CellSpacing</label>
                                <span className="col-sm-8">
                                    <NumericTextBoxComponent className="col-sm-4" type="text" placeholder={"Ex: 10"} value={10} min={1} max={20} floatLabelType="Never" id="cellSpacing" change={this.onCellChange.bind(this)} />
                                </span>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label form-label">AllowFloating</label>
                                <span className="col-sm-8">
                                    <CheckBoxComponent className="col-sm-8" name="floating" id="floating" checked={true} change={this.onChange.bind(this)} />
                                </span>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label form-label">AllowResizing</label>
                                <span className="col-sm-8">
                                    <CheckBoxComponent name="resizing" id="resizing" checked={true} change={this.onChange.bind(this)} />
                                </span>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <ButtonComponent onClick={this.onAdd.bind(this)} cssClass="e-primary">Add Panel</ButtonComponent>
                                    <ButtonComponent onClick={this.remove.bind(this)} cssClass="e-danger" style={{"marginLeft":"3px"}}>Remove Panel</ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the properties of DashboardLayout component from the property pane. Select any combination of properties from the property pane to customize the DashboardLayout.</p>
                </div>
                <div id="description">
                This sample allows to configure the <code><a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#cellspacing" target="_blank">cellSpacing</a></code>, 
                <code><a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowfloating" target="_blank">allowFloating</a></code> and
                <code><a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing" target="_blank">allowResizing</a></code> properties of the dashboard layout component.
                </div>
            </div>
        );
    }
}
