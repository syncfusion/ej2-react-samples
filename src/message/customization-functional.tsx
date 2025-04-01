import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import './customization.css';

function Customization() {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section msg-custom-section">
                <div className="content-section">
                    <h4>Content Alignment</h4>
                    <MessageComponent id="msg_content_left" content="Your license has been activated successfully" severity="Success"></MessageComponent>
                    <MessageComponent id="msg_content_center" content="The license will expire today" cssClass="e-content-center" severity="Warning"></MessageComponent>
                    <MessageComponent id="msg_content_right" content="The license key is invalid" cssClass="e-content-right" severity="Error"></MessageComponent>
                </div>
                <div className="content-section">
                    <h4>Custom Message with Icon</h4>
                    <MessageComponent id="msg_icon" cssClass="custom">Essential JS 2 is a modern JavaScript UI Controls library built from the ground up to be lightweight, responsive, modular, and touch friendly. It is written in the TypeScript and has no external dependencies. It also includes complete support for Angular, React, Vue, ASP.NET MVC, and ASP.NET Core frameworks.</MessageComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the customization of the icon, content alignment, and appearance in the React Message.</p>
            </div>
            <div id="description">
                <p>The Message component content can be aligned by adding predefined classes. By default, messages are aligned to the <b>left</b>. The other available alignments are <b>center</b> and <b>right</b>, achieved by adding, <b>e-content-center</b> and <b>e-content-right</b>.</p>
                <p>The icon and appearance can be customized at the application level by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#cssclass">cssClass</a> property.</p>
                <p>In this sample, the Message component predefined content is aligned based on the <code>cssClass</code> property. Also, this component is rendered with a custom severity icon and custom appearance.</p>
                <p>More information about Message customization can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/message/customization">documentation</a> section.</p>
            </div>
        </div>
    );
};
export default Customization;
