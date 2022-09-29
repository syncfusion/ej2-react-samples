import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FabComponent } from "@syncfusion/ej2-react-buttons";
import { SampleBase } from '../common/sample-base';
import './position.css';


export class Position extends SampleBase<{}, {}> {


    render() {
        return (<div className='control-pane'>
            <div className="control-section">
                <div id="fabtarget" className="fab-position-container custom-index">
                    <FabComponent id="fab1" iconCss='fab-icons fab-icon-people'
                        title='Top Left' position='TopLeft' cssClass="e-success"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab2" iconCss='fab-icons fab-icon-people'
                        title='Top Center' position='TopCenter' cssClass="e-warning"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab3" iconCss='fab-icons fab-icon-people'
                        title='Top Right' position='TopRight' cssClass="e-success"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab4" iconCss='fab-icons fab-icon-people'
                        title='Middle Left' position='MiddleLeft' cssClass="e-warning"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab5" iconCss='fab-icons fab-icon-people'
                        title='Middle Center' position='MiddleCenter'
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab6" iconCss='fab-icons fab-icon-people'
                        title='Middle Right' position='MiddleRight' cssClass="e-warning"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab7" iconCss='fab-icons fab-icon-people'
                        title='Bottom Left' position='BottomLeft' cssClass="e-success"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab8" iconCss='fab-icons fab-icon-people'
                        title='Bottom Center' position='BottomCenter' cssClass="e-warning"
                        target='#fabtarget'></FabComponent>
                    <FabComponent id="fab9" iconCss='fab-icons fab-icon-people'
                        title='Bottom Right' position='BottomRight' cssClass="e-success"
                        target='#fabtarget'></FabComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the different positions of the Floating Action Button in the target container.</p>
            </div>
            <div id="description">
                <p>
                    Use the <code>position</code> property to change the position of the FAB in the target element.
                </p>
            </div>
        </div>
        );
    }
}