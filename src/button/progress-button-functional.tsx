import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ProgressButtonComponent, SpinSettingsModel, AnimationSettingsModel } from '@syncfusion/ej2-react-splitbuttons';
import { updateSampleSection } from '../common/sample-base';
import './progress-button.css';

const ProgressButton = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const spinRight: SpinSettingsModel = { position: 'Right' };
    const spinTop: SpinSettingsModel = { position: 'Top' };
    const spinBottom: SpinSettingsModel = { position: 'Bottom' };
    const spinCenter: SpinSettingsModel = { position: 'Center' };
    const zoomOut: AnimationSettingsModel = { effect: 'ZoomOut' };
    const slideLeft: AnimationSettingsModel = { effect: 'SlideLeft' };
    const slideRight: AnimationSettingsModel = { effect: 'SlideRight' };
    const zoomIn: AnimationSettingsModel = { effect: 'ZoomIn' };
    const duration: number = 4000;

    const [contractCssClass, setContractCssClass] = useState<string>("e-success e-small");
    const contractBegin = () => {
        setContractCssClass('e-success e-small e-round');
    }
    const contractEnd = () => {
        setContractCssClass('e-success e-small');
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='progress-button-section'>
                    <div id='progress-button-control'>
                        <div className='row'>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Spin Left" isPrimary></ProgressButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Spin Right" isPrimary spinSettings={spinRight}></ProgressButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Spin Top" isPrimary spinSettings={spinTop}></ProgressButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Spin Bottom" isPrimary spinSettings={spinBottom}></ProgressButtonComponent>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent id="roundbtn" spinSettings={spinCenter} animationSettings={zoomOut} cssClass="e-round e-small e-success"
                                        iconCss="e-btn-sb-icons e-progress-play-icon"></ProgressButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent id="contract" content="Contract" enableProgress cssClass={contractCssClass} begin={contractBegin}
                                        end={contractEnd}></ProgressButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Slide Left" enableProgress spinSettings={spinCenter} animationSettings={slideLeft}
                                        cssClass="e-flat e-success"></ProgressButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Slide Right" enableProgress spinSettings={spinCenter} animationSettings={slideRight}
                                        cssClass="e-outline e-success"></ProgressButtonComponent>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent id="zoomin" content="Zoom In" enableProgress spinSettings={spinCenter} animationSettings={zoomIn}
                                        cssClass="e-round-corner e-danger"></ProgressButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Zoom Out" enableProgress spinSettings={spinCenter} animationSettings={zoomOut}
                                        cssClass="e-small e-danger"></ProgressButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ProgressButtonComponent content="Download" enableProgress duration={duration} cssClass="e-hide-spinner e-progress-top"
                                        iconCss="e-btn-sb-icons e-download-icon"></ProgressButtonComponent>
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
        </div>
    )

}
export default ProgressButton;
