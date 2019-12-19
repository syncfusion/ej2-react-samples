import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './card.component.css';
// tslint:disable:max-line-length
// *  Sample for CSS Basic Layout Cards.
export class Basic extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section card-control-section basic_card_layout'>
                    <div className="e-card-resize-container">
                        <div className='row'>
                            <div className="row card-layout">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card" id="basic_card">
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-title">Debunking Five Data Science Myths</div>
                                                <div className="e-card-sub-title">By John Doe | Jan 20, 2018 </div>
                                            </div>
                                        </div>
                                        <div className="e-card-content">
                                            Tech evangelists are currently pounding their pulpits about all things AI, machine learning, analytics—anything that sounds
                                        like the future and probably involves lots of numbers. Many of these topics can be grouped under
                                        the intimidating term data science.
                                        </div>
                                        <div className="e-card-actions">
                                            <button className="e-btn e-outline e-primary">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card" id="weather_card">
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">Today</div>
                                                <div className="e-card-sub-title">New York - Scattered Showers.</div>
                                            </div>
                                        </div>
                                        <div className="e-card-header weather_report">
                                            <div className="e-card-header-image"></div>
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">1&#186; / -4&#186;</div>
                                                <div className="e-card-sub-title">Chance for snow: 100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                <p>
                    This sample demonstrates
                    <code>card</code> rendering with the following basic weather layout.
                </p>
            </div>
            <div id="description">
                <p>
                    The card is a small content display area in which specific structure of the content can be shown. This sample demonstrates
                    the defined structure and predefined classes for adding basic cards with header, and content elements.
                    <p>More information about Card can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">
                            documentation</a> section.</p>
                    </p>
            </div>
            </div>);
    }
}
