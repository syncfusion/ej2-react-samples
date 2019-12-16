import * as React from 'react';
import { ProgressButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { SampleBase } from '../common/sample-base';
import './progress-button.css';
export class ProgressButton extends SampleBase {
    constructor() {
        super(...arguments);
        this.spinRight = { position: 'Right' };
        this.spinTop = { position: 'Top' };
        this.spinBottom = { position: 'Bottom' };
        this.spinCenter = { position: 'Center' };
        this.zoomOut = { effect: 'ZoomOut' };
        this.slideLeft = { effect: 'SlideLeft' };
        this.slideRight = { effect: 'SlideRight' };
        this.zoomIn = { effect: 'ZoomIn' };
        this.duration = 4000;
    }
    contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }
    contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='progress-button-section'>
                        <div id='progress-button-control'>
                            <div className='row'>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Spin Left" isPrimary></ProgressButtonComponent>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Spin Right" isPrimary spinSettings={this.spinRight}></ProgressButtonComponent>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Spin Top" isPrimary spinSettings={this.spinTop}></ProgressButtonComponent>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Spin Bottom" isPrimary spinSettings={this.spinBottom}></ProgressButtonComponent>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent id="roundbtn" spinSettings={this.spinCenter} animationSettings={this.zoomOut} cssClass="e-round e-small e-success" iconCss="e-btn-sb-icons e-play-icon"></ProgressButtonComponent>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent id="contract" content="Contract" ref={(scope) => { this.contractBtn = scope; }} enableProgress cssClass="e-success e-small" begin={this.contractBegin.bind(this)} end={this.contractEnd.bind(this)}></ProgressButtonComponent>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Slide Left" enableProgress spinSettings={this.spinCenter} animationSettings={this.slideLeft} cssClass="e-flat e-success"></ProgressButtonComponent>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Slide Right" enableProgress spinSettings={this.spinCenter} animationSettings={this.slideRight} cssClass="e-outline e-success"></ProgressButtonComponent>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent id="zoomin" content="Zoom In" enableProgress spinSettings={this.spinCenter} animationSettings={this.zoomIn} cssClass="e-round-corner e-danger"></ProgressButtonComponent>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Zoom Out" enableProgress spinSettings={this.spinCenter} animationSettings={this.zoomOut} cssClass="e-small e-danger"></ProgressButtonComponent>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Download" enableProgress duration={this.duration} cssClass="e-hide-spinner e-progress-top" iconCss="e-btn-sb-icons e-download-icon"></ProgressButtonComponent>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                        <ProgressButtonComponent content="Disabled" disabled></ProgressButtonComponent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the default functionalities of a progress button. Clicking that button will display a spinner
                        and a progress indicator.</p>
                </div>
                <div id="description">
                    <p>
                        The progress button visualizes the progression of an operation to indicates the user that a process is happening in the background.
                        The progress can be shown with graphics accompanied by a textual representation.
                    </p>
                    <p>
                        In this sample, the progress button contains the content, spinner, progress indicator, and a list of related features that
                        can be achieved using
                    <code>
                            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/progress-button/#content">content,
                    </a>
                        </code>
                        <code>
                            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/progress-button/#cssclass">cssClass,
                    </a>
                        </code>and
                    <code>
                            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/progress-button/#enableprogress">enableProgress
                    </a>
                        </code>property.
                    </p>
                    <p>
                        More information about progress button can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/progress-button/getting-started">
                            documentation section</a>.
                    </p>
                </div>
            </div>);
    }
}
