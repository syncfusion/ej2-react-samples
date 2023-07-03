import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './button.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [play, setPlay] = useState<boolean>(true);
    //Toggle button click event handler
    const togglePlay = () => {
        setPlay((prevState) => !prevState)
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='button-section'>
                    <div id='button-control'>
                        <div className='row'>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-primary'>Primary</ButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent>Normal</ButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-outline' isPrimary>Outline</ButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-flat e-primary'>Flat</ButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-success'>Success</ButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-warning'>Warning</ButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-danger'>Danger</ButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-info'>Info</ButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-small e-round' iconCss='e-btn-sb-icons e-add-icon' isPrimary></ButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-flat e-primary' iconCss={play ? 'e-btn-sb-icons e-play-icon' : 'e-btn-sb-icons e-pause-icon'}
                                        onClick={togglePlay}>{play ? 'Play' : 'Pause'}</ButtonComponent>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-flat e-primary' iconCss='e-btn-sb-icons e-open-icon' iconPosition='Right'>Open</ButtonComponent>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                    <ButtonComponent cssClass='e-small'>Small</ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the Button with different types and predefined styles.</p>
            </div>
            <div id="description">
                <p>
                    Button is a graphical user interface element that triggers an event on click action. It contains the text, an image, or both.
                </p>
                <p>
                    In this sample, Play button is a toggle button and it can be enabled by using the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/button/#istoggle"><code>isToggle
                        </code></a> property. To change the text and icon you should handle click event.
                </p>
                <p>
                    More information about Button can be found in this <a target='_blank'
                        href='https://ej2.syncfusion.com/react/documentation/button/getting-started'>documentation section</a>.
                </p>
            </div>
        </div>
    )

}
export default Default;