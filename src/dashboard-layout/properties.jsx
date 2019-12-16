import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from '@syncfusion/ej2-react-layouts';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './properties.component.css';
export class Properties extends SampleBase {
    constructor() {
        super(...arguments);
        this.count = 5;
        this.cellSpacing = [5, 5];
    }
    onAdd() {
        this.count = this.count + 1;
        let proxy = this;
        let panel = [{
                'id': this.count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
                header: '<div>Panel ' + this.count.toString() + '</div>', content: '<div></div>'
            }];
        proxy.dashboardObj.addPanel(panel[0]);
    }
    remove() {
        if (this.dashboardObj.panels.length > 0) {
            for (let i = this.dashboardObj.panels.length - 1; i < this.dashboardObj.panels.length; i++) {
                this.dashboardObj.removePanel(this.dashboardObj.panels[this.dashboardObj.panels.length - 1 - i].id);
            }
        }
    }
    onCellChange(args) {
        this.dashboardObj.cellSpacing = [parseInt(args.value, 10), parseInt(args.value, 10)];
    }
    onChange(args) {
        let proxy = this;
        if (args.event.currentTarget.id === 'floating') {
            proxy.dashboardObj.allowFloating = args.checked;
        }
        if (args.event.currentTarget.id === 'resizing') {
            proxy.dashboardObj.allowResizing = args.checked;
        }
    }
    render() {
        return (<div>
                <div className="col-lg-8 control-section" id="control_dash">
                    <div className="content-wrapper" style={{ "max-width": "100%" }}>
                    <DashboardLayoutComponent created={this.onCreate.bind(this)} id="api_dashboard" columns={6} cellSpacing={this.cellSpacing} ref={(scope) => { this.dashboardObj = scope; }} allowResizing={true}>
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
                                    <NumericTextBoxComponent className="col-sm-4" type="text" placeholder={"Ex: 10"} value={10} min={1} max={20} floatLabelType="Never" id="cellSpacing" change={this.onCellChange.bind(this)}/>
                                </span>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label form-label">AllowFloating</label>
                                <span className="col-sm-8">
                                    <CheckBoxComponent className="col-sm-8" name="floating" id="floating" checked={true} change={this.onChange.bind(this)}/>
                                </span>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label form-label">AllowResizing</label>
                                <span className="col-sm-8">
                                    <CheckBoxComponent name="resizing" id="resizing" checked={true} change={this.onChange.bind(this)}/>
                                </span>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <ButtonComponent onClick={this.onAdd.bind(this)} cssClass="e-primary">Add Panel</ButtonComponent>
                                    <ButtonComponent onClick={this.remove.bind(this)} cssClass="e-danger" style={{ "margin-left": "3px" }}>Remove Panel</ButtonComponent>
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
            </div>);
    }
}
