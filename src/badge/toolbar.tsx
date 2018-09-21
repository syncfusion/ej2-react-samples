import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import './toolbar.css';

export class Toolbar extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="sample_container badge-toolbar">
                        <ToolbarComponent id="toolbar">
                            <div>
                                <div className="header">Notification</div>
                                <div>
                                    <div className="badge-block">
                                        <div className="message icons"></div>
                                        {/* Notification Badge */}
                                        <span className="e-badge e-badge-primary e-badge-notification e-badge-overlap">35</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="badge-block">
                                        <div className="user-profile icons"></div>
                                        {/* Notification Badge */}
                                        <span className="e-badge e-badge-success e-badge-notification e-badge-overlap">28</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="badge-block">
                                        <div className="love icons"></div>
                                        {/* Notification Badge */}
                                        <span className="e-badge e-badge-info e-badge-notification e-badge-overlap">98</span>
                                    </div>
                                </div>
                            </div>
                        </ToolbarComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the integration of badges into toolbar component to display mails, requests, etc.</p>
                </div>

                <div id="description">
                    <p>The badge can be integrated into the toolbar to display the notifications of custom buttons to users. Here, SVG icons
                        use the target for badge elements to display notifications.
    </p>
                </div>
            </div>
        )
    }
}
