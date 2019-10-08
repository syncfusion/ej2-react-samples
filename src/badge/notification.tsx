import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './notification.css';

export class Notification extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section badge-samples'>
                    <div className="sample_container badge-notification">
                        <div className="layout">
                            <div className="margin">
                                {/* Notification Badge */}
                                <div className="margin fontSize">Notification</div>
                                <div className="badge-block">
                                    <div className="badge_whatsapp svg_icons"></div>
                                    {/* Warning Colored Notification Badge */}
                                    <span className="e-badge e-badge-warning e-badge-notification e-badge-overlap">99+</span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_twitter svg_icons"></div>
                                    {/* Primary Colored Notification Badge */}
                                    <span className="e-badge e-badge-primary e-badge-notification e-badge-overlap">7</span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_facebook svg_icons"></div>
                                    {/* Danger Colored Notification Badge */}
                                    <span className="e-badge e-badge-danger e-badge-notification e-badge-overlap">99+</span>
                                </div>


                                <div className="badge-block">
                                    <div className="badge_skype svg_icons"></div>
                                    {/* Secondary Colored Notification Badge */}
                                    <span className="e-badge e-badge-secondary e-badge-notification e-badge-overlap">18</span>
                                </div>

                                {/* Circle Badge */}
                                <div className="margin fontSize">Circle</div>
                                <div className="badge-block">
                                    <div className="badge_whatsapp svg_icons"></div>
                                    {/* Warning Colored Notification Badge */}
                                    <span className="e-badge e-badge-warning e-badge-notification e-badge-overlap e-badge-circle">19</span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_twitter svg_icons"></div>
                                    {/* Primary Colored Notification Badge */}
                                    <span className="e-badge e-badge-primary e-badge-notification e-badge-overlap e-badge-circle">27</span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_facebook svg_icons"></div>
                                    {/* Danger Colored Notification Badge */}
                                    <span className="e-badge e-badge-danger e-badge-notification e-badge-overlap e-badge-circle">3</span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_skype svg_icons"></div>
                                    {/* Secondary Colored Notification Badge */}
                                    <span className="e-badge e-badge-secondary e-badge-notification e-badge-overlap e-badge-circle">85</span>
                                </div>

                                {/* Dot Badge */}
                                <div className="margin fontSize">Dot</div>
                                <div className="badge-block">
                                    <div className="badge_contact svg_icons"></div>
                                    {/* Success Colored Bottom Dot Badge */}
                                    <span className="e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom"></span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_skype svg_icons"></div>
                                    {/* Info Colored Bottom Dot Badge */}
                                    <span className="e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom"></span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_facebook svg_icons"></div>
                                    {/* Info Colored Dot Badge */}
                                    <span className="e-badge e-badge-info e-badge-overlap e-badge-dot"></span>
                                </div>

                                <div className="badge-block">
                                    <div className="badge_pinterest svg_icons"></div>
                                    {/* Danger Colored Dot Badge */}
                                    <span className="e-badge e-badge-danger e-badge-overlap e-badge-dot"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the types of the notification badge. To apply the notification badge, add
        <code>.e-badge-notification</code> class or
        <code>.e-badge-dot</code> class to the dot badge along with
        <code>.e-badge</code> class.</p>
                </div>

                <div id="description">
                    <p>There are 3 types of notification badges and they are listed as follows. When using the notification badge, always apply
        <code>position: relative</code> to the container element.</p>
                    <ul>
                        <li>Default notification: The
            <code>.e-badge-notification</code> applies general notification badge.</li>
                        <li>Circle notification: The
            <code>.e-badge-circle</code> with .e-badge-notification applies the circle notification badge.</li>
                        <li>Dot notification: The
            <code>.e-badge-dot</code> applies the dot badge to the target element.</li>
                    </ul>
                    <p>The position can be changed to the bottom by adding the
        <code>.e-badge-bottom</code> class.</p>
                </div>
            </div>
        )
    }
}
