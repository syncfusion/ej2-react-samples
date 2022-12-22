import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DashboardLayoutComponent, PanelModel } from '@syncfusion/ej2-react-layouts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './default.component.css';


function Default() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    
    let dashboardObj: DashboardLayoutComponent;
    const cellSpacing: number[] = [5, 5];
    let count: number = 8;

    function onCloseIconHandler(event: any): void {
        let panel: any = event.target;
        if (panel.offsetParent) {
            dashboardObj.removePanel(panel.offsetParent.id);
        }
    }
    
    function btnClick(): void {
        let panel: PanelModel[] = [{
            'id': count.toString() + '_layout', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
            content: '<span id="close" class="e-close-icon e-clear-icon"></span><div class="text-align">' + count.toString() + '</div>'
        }];
        (dashboardObj as any).addPanel(panel[0]);
        let closeIcon : any = document.getElementById(count.toString() + '_layout').querySelector('.e-clear-icon');
        closeIcon.addEventListener('click', onCloseIconHandler.bind(this));
        count = count + 1;
    }

    function rendereComplete() {
        let closeElement: any = document.querySelectorAll('.e-clear-icon');
        for (let i: number = 0; i < closeElement.length; i++) {
            closeElement[i].addEventListener('click', onCloseIconHandler.bind(this));
        }
    }

    return (
        <div>
            <div id="default_target" className="control-section">
                <div className="addContainer">
                    <ButtonComponent id="add" cssClass="e-info" onClick={ btnClick.bind(this) }>Add Panel</ButtonComponent>
                </div>
                <DashboardLayoutComponent id="default_dashboard" columns={5} ref={(scope) => { (dashboardObj as any) = scope; }}
                    cellSpacing={cellSpacing} allowResizing={true}>
                    <div id="one" className="e-panel" data-row="0" data-col="0" data-sizeX="1" data-sizeY="1">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">0</div>
                        </div>
                    </div>
                    <div id="two" className="e-panel" data-row="1" data-col="0" data-sizeX="1" data-sizeY="2">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">1</div>
                        </div>
                    </div>
                    <div id="three" className="e-panel" data-row="0" data-col="1" data-sizeX="2" data-sizeY="2">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">2</div>
                        </div>
                    </div>
                    <div id="four" className="e-panel" data-row="2" data-col="1" data-sizeX="1" data-sizeY="1">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">3</div>
                        </div>
                    </div>
                    <div id="five" className="e-panel" data-row="2" data-col="2" data-sizeX="2" data-sizeY="1">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">4</div>
                        </div>
                    </div>
                    <div id="six" className="e-panel" data-row="0" data-col="3" data-sizeX="1" data-sizeY="1">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">5</div>
                        </div>
                    </div>
                    <div id="seven" className="e-panel" data-row="1" data-col="3" data-sizeX="1" data-sizeY="1">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">6</div>
                        </div>
                    </div>
                    <div id="eight" className="e-panel" data-row="0" data-col="4" data-sizeX="1" data-sizeY="3">
                        <span id="close" className="e-close-icon e-clear-icon" />
                        <div className="e-panel-container">
                            <div className="text-align">7</div>
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </div>
            <div id="action-description">
                <p>
                This <a href="https://www.syncfusion.com/react-ui-components/react-dashboard-layout">React Dashboard Layout</a> example demonstrates the default functionalities of the DashboardLayout component. Click the Add Panel button to add panels dynamically to the dashboard layout.
                </p>
            </div>
            <div id="description">
                <p>
                The DashboardLayout component provides the capability to arrange, <a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing" target="_blank">resize</a> and 
                    reorder the panels within the dashboard layout.
                </p>
            </div>
        </div>
    );
}
export default Default;