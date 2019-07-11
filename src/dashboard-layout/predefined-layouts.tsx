import * as ReactDOM from "react-dom";
import * as React from "react";
import { SampleBase } from "../common/sample-base";
import { DashboardLayoutComponent, PanelModel, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { panelData } from './panel-data';
import "./predefined-layouts.component.css";

export class PredefinedLayouts extends SampleBase<{}, {}> {
  private headerCount: number = 1;
  private panels: any = panelData;
  public dashboardObj: DashboardLayoutComponent;
  private cellSpacing: number[] = [5, 5];

  public reset(): void {
    var proxy = this;
    let selectedElement: any = document.getElementsByClassName('e-selected-style');
    this.dashboardObj.removeAll();
    this.initializeTemplate(selectedElement[0], proxy);
  }

  public initializeTemplate(element: any, proxy: any): void {
    let updatePanels: PanelModel[] = [];
    let index: number = parseInt(element.getAttribute('data-id'), 10) - 1;
    let panel: any = Object.keys(proxy.panels[index]).map((panelIndex: string) => {
      return proxy.panels[index][panelIndex];
    });
    for (let i: number = 0; i < panel.length; i++) {
      let panelModelValue: PanelModel = {
        id: i.toString(),
        row: panel[i].row,
        col: panel[i].col,
        sizeX: panel[i].sizeX,
        sizeY: panel[i].sizeY,
        header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
        content: '<div class="panel-content">Content Area</div>'
      };
      updatePanels.push(panelModelValue);
    }
    proxy.dashboardObj.panels = updatePanels;
  }

  rendereComplete() {
    var proxy = this;
    document.getElementById('templateContainer').onclick = (args: any) => {
      let target: any = args.target;
      let selectedElement: any = document.getElementsByClassName('e-selected-style');
      if (selectedElement.length) {
        selectedElement[0].classList.remove('e-selected-style');
      }
      if (target.className === 'image-pattern-style') {
        proxy.dashboardObj.removeAll();
        proxy.initializeTemplate(args.target, proxy);
      }
      target.classList.add('e-selected-style');
    };
  }

  // custom code start
  onCreate(): void {
    if (document.querySelector('.container-fluid.custom')) {
      document.querySelector('.container-fluid').classList.remove('custom')
    }
  }
  //custom code end

  public render(): JSX.Element {
    return (
      <div>
        <div className="col-lg-8 control-section" id="predefine_control">
          <div className="content-wrapper" style= {{"max-width": "100%"}}>
            <DashboardLayoutComponent created={ this.onCreate.bind(this) } columns={6} ref={(scope) => { this.dashboardObj = scope; }} id="predefine_dashboard" cellSpacing={this.cellSpacing} >
              <PanelsDirective>
                <PanelDirective row={0} col={0} sizeX={4} sizeY={3}
                  content="<div class='panel-content'>Content Area</div>"
                  header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>">
                </PanelDirective>
                <PanelDirective row={0} col={4} sizeX={2} sizeY={3}
                  content="<div class='panel-content'>Content Area</div>"
                  header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>">
                </PanelDirective>
                <PanelDirective row={3} col={0} sizeX={6} sizeY={3}
                  content="<div class='panel-content'>Content Area</div>"
                  header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>">
                </PanelDirective>
              </PanelsDirective>
            </DashboardLayoutComponent>
          </div>
        </div>
        <div className="col-lg-4 property-section dashboard" id="dash_property">
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content">
            <div className="row row-header">Choose dashboard layout</div>
            <div id="templateContainer">
              <div className="row" style= {{"padding-top": "3px"}}>
                <div className="image-pattern-style e-selected-style" id="template1" data-id="1" />
                <div className="image-pattern-style" id="template2" data-id="2" />
                <div className="image-pattern-style" id="template3" data-id="3" />
              </div>
              <div className="row" style= {{"padding-top": "3px"}}>
                <div className="image-pattern-style" id="template4" data-id="4" />
                <div className="image-pattern-style" id="template5" data-id="5" />
                <div className="image-pattern-style" id="template6" data-id="6" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-xs-12 col-lg-12 col-md-12 reset" style={{"padding":"10px"}}>
            <ButtonComponent id="reset" onClick={this.reset.bind(this)}>Reset</ButtonComponent>
          </div>
        </div >
        <div id="action-description">
          <p>This sample demonstrates, the functionality of dynamically updating the panels inside the DashboardLayout by selecting it from the pre-defined values in the properties panel. Go to the properties panel section and select any of the pre-defined layout,
        based on selection the panles are updated in the dashboard layout dynamically inside the DashboardLayout. Click the <code>reset</code> button to reset the panels settings of the layout.</p>
        </div>
        <div id="description">
        This sample demonstrates how to update the panels dynamically in the dashboard layout component.
        </div>
      </div>
    );
  }
}
