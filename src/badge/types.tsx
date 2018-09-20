import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './types.css';

export class Types extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section badge-types-section'>
                    <div className="sample_container badge-types">
                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <div className="badge-block-first">
                                        <button className="e-btn">Primary</button>
                                        {/* Primary Colored Notification Badge */}
                                        <span className="e-badge e-badge-primary e-badge-notification e-badge-overlap">10</span>
                                    </div>
                                </div>
                                <div className="e-card-content text">
                                    <div>
                                        <code>.e-badge-primary</code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn">Secondary
                                        {/* Secondary Colored Notification Badge */}
                                        <span className="e-badge e-badge-secondary e-badge-notification e-badge-overlap">20</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-secondary</code>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn">Success
                                        {/* Success Colored Notification Badge */}
                                        <span className="e-badge e-badge-success e-badge-notification e-badge-overlap">25</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-success</code>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn">Danger
                                        {/* Danger Colored Notification Badge */}
                                        <span className="e-badge e-badge-danger e-badge-notification e-badge-overlap">30</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-danger</code>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn">Warning
                                        {/* Warning Colored Notification Badge */}
                                        <span className="e-badge e-badge-warning e-badge-notification e-badge-overlap">40</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-warning</code>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn">Info
                                        {/* Info Colored Notification Badge */}
                                        <span className="e-badge e-badge-info e-badge-notification e-badge-overlap">45</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-info</code>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn e-info">Light
                                        {/* Light Colored Notification Badge */}
                                        <span className="e-badge e-badge-light e-badge-notification e-badge-overlap">50</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-light</code>
                                </div>
                            </div>
                        </div>

                        <div className="badge-block">
                            <div className="e-card e-badge-showcase">
                                <div className="e-card-content">
                                    <button className="e-btn e-info">Dark
                                        {/* Dark Colored Notification Badge */}
                                        <span className="e-badge e-badge-dark e-badge-notification e-badge-overlap">75</span>
                                    </button>
                                </div>
                                <div className="e-card-content text">
                                    <code>.e-badge-dark</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates 8-predefined badge colors for various scenarios which can be applied from the modifier class.</p>
                </div>

                <div id="description">
                    <p>The badge supports the following 8 different essential colors for various situations. All the classes should be added
                        with
        <code>.e-badge</code> class.
    </p>
                    <ul>
                        <li>Primary: The
            <code>.e-badge-primary</code> class applies the primary color.</li>
                        <li>Secondary: The
            <code>.e-badge-secondary</code> class applies the secondary color.</li>
                        <li>Success: The
            <code>.e-badge-success</code> class applies the success color.</li>
                        <li>Danger: The
            <code>.e-badge-danger</code> class applies the danger color.</li>
                        <li>Warning: The
            <code>.e-badge-warning</code> class applies the warning color.</li>
                        <li>Info: The
            <code>.e-badge-info</code> class applies the info color.</li>
                        <li>Light: The
            <code>.e-badge-light</code> class applies the light color.</li>
                        <li>Dark: The
            <code>.e-badge-dark</code> class applies the dark color.</li>
                    </ul>
                </div>
            </div>
        )
    }
}
