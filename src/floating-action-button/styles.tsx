import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FabComponent } from "@syncfusion/ej2-react-buttons";
import { SampleBase } from '../common/sample-base';
import './styles.css';

export class Styles extends SampleBase<{}, {}> {

    render() {
        return (<div className='control-pane'>
            <div className="control-section">
                <div className="fab-appearence-container">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id="target1" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Primary</label>
                            </div>
                            <div id="target2" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Secondary</label>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id="target3" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Outline</label>
                            </div>
                            <div id="target7" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Info</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id="target4" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Success</label>
                            </div>
                            <div id="target5" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Warning</label>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id="target6" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Danger</label>
                            </div>
                            <div id="target8" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                                <label className="fab-name">Label shows on hover</label>
                            </div>
                        </div>
                    </div>

                    {/* Primary */}
                    <FabComponent id="fab1" iconCss='fab-icons fab-icon-shopping'
                        position='BottomCenter' target='#target1' title="Primary"></FabComponent>

                    {/* Normal */}
                    <FabComponent id="fab2" iconCss='fab-icons fab-icon-shopping'
                        isPrimary={false} position='BottomCenter'
                        target='#target2' title="Secondary"></FabComponent>

                    {/* Outline */}
                    <FabComponent id="fab3" iconCss='fab-icons fab-icon-shopping'
                        cssClass='e-outline' position='BottomCenter'
                        target='#target3' title="Outline"></FabComponent>

                    {/* Success */}
                    <FabComponent id="fab4" iconCss='fab-icons fab-icon-shopping'
                        cssClass='e-success' position='BottomCenter'
                        target='#target4' title="Success"></FabComponent>

                    {/* Warning */}
                    <FabComponent id="fab5" iconCss='fab-icons fab-icon-shopping'
                        cssClass='e-warning' position='BottomCenter'
                        target='#target5' title="Warning"></FabComponent>

                    {/* Danger */}
                    <FabComponent id="fab6" iconCss='fab-icons fab-icon-shopping'
                        cssClass='e-danger' position='BottomCenter'
                        target='#target6' title="Danger"></FabComponent>

                    {/* Info */}
                    <FabComponent id="fab7" iconCss='fab-icons fab-icon-shopping'
                        cssClass='e-info' position='BottomCenter'
                        target='#target7' title="Info"></FabComponent>

                    {/* On hover */}
                    <FabComponent id="fab8" iconCss='fab-icons fab-icon-shopping'
                        position='BottomCenter' cssClass='fab-hover'
                        content='<span class="text-container"><span class="textEle">Shopping</span></span>'
                        target='#target8' title="Shopping"></FabComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the changes that can be made to the appearance of the Floating Action Button using predefined styles.</p>
            </div>
            <div id="description">
                <p>
                    The appearance of FAB can be customized using the <code>cssClass</code> and <code>isPrimary</code> properties. FAB provides predefined styles which can be set using the <code>cssClass</code> property.
                </p>
            </div>
        </div>
        );
    }
}
