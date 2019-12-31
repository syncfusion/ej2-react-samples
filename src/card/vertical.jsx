import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './card.component.css';
// tslint:disable:max-line-length
// *  Sample for CSS Basic Layout Cards.
export class Vertical extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section card-control-section vertical_card_layout'>
                    <div className="e-card-resize-container">
                        <div className='row'>
                            <div className="row card-layout">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card" id="vertical_business">
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">Mayumi Ohno</div>
                                                <div className="e-card-sub-title">Marketing Representative</div>
                                            </div>
                                        </div>
                                        <div className="e-card-actions">
                                            <button className="e-card-btn">
                                                <div className="e-email e-card-btn-txt">mayum@mail.com</div>
                                            </button>
                                            <button className="e-card-btn">
                                                <div className="e-email e-card-btn-txt">011-232-221</div>
                                            </button>
                                            <button className="e-card-btn">
                                                <div className="e-email e-card-btn-txt">www.mayum.com</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card" id="vertical_business_profile">
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">John Doe</div>
                                                <div className="e-card-sub-title">Real Estate Agent</div>
                                            </div>
                                        </div>
                                        <div className="e-card-content e-card-left" style={{ textAlign: 'left' }}>
                                            <table>
                                                <tr>
                                                    <td>johndoe@mail.com</td>
                                                </tr>
                                                <tr>
                                                    <td>011-141-221</td>
                                                </tr>
                                                <tr>
                                                    <td>www.johndoe.com</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card profile" style={{ justifyContent: 'flex-start' }}>
                                        <div className="e-card-header">
                                            <div className="e-card-header-image e-card-corner"></div>
                                        </div>
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption center">
                                                <div className="e-card-header-title">Laura Callahan</div>
                                                <div className="e-card-sub-title">Sales Coordinator</div>
                                            </div>
                                        </div>
                                        <div className="e-card-separator"></div>
                                        <div className="e-card-content">
                                            Laura received a BA in psychology from the University of Washington. She has also completed a course in business French.
                            She reads and writes French.
                        </div>
                                        <div className="e-card-actions center">
                                            <button className="e-card-btn" title="E-mail">
                                                <span className="e-mail-icon cb-icons "></span>
                                            </button>
                                            <button className="e-card-btn" title="Google+">
                                                <span className="e-google-icon cb-icons "></span>
                                            </button>
                                            <button className="e-card-btn" title="Facebook">
                                                <span className="e-fb-icon cb-icons "></span>
                                            </button>
                                            <button className="e-card-btn" title="Tweets">
                                                <span className="e-tweet-icon cb-icons "></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates rendering of vertical layout <code>card</code> with business and profile card information.
                </p>
                </div>
                <div id="description">
                    <p>
                        The vertical card sample illustrate card contents in vertically aligned layout with header, content, and action buttons.
                    <p>More information about Card can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">
                                documentation</a> section.</p>
                    </p>
                </div>
            </div>);
    }
}
