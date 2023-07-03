import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import './default.css';

function Default() {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section msg-default-section">
                <div className="content-section">
                    <MessageComponent id="msg_default" content="Editing is restricted"></MessageComponent>
                    <MessageComponent id="msg_info" content="Please read the comments carefully" severity="Info"></MessageComponent>
                    <MessageComponent id="msg_success" content="Your message has been sent successfully" severity="Success"></MessageComponent>
                    <MessageComponent id="msg_warning" content="There was a problem with your network connection" severity="Warning"></MessageComponent>
                    <MessageComponent id="msg_error" content="A problem occurred while submitting your data" severity="Error"></MessageComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the React Message component with different severity types and predefined styles.</p>
            </div>
            <div id="description">
                <p>The Message component displays messages with different severity levels, set with icons and colors to denote the importance and context of the message to the end user.</p>
                <p>The available severity messages are <b>Normal</b>, <b>Success</b>, <b>Info</b>, <b>Warning</b> and <b>Error</b>.</p>
                <ul>
                    <li><b>Normal</b> - The message is displayed with an icon and color to denote it as a normal message.</li>
                    <li><b>Success</b> - The message is displayed with an icon and color to denote it as a success message.</li>
                    <li><b>Info</b> - The message is displayed with an icon and color to denote it as information.</li>
                    <li><b>Warning</b> - The message is displayed with an icon and color to denote it as a warning message.</li>
                    <li><b>Error</b> - The message is displayed with an icon and color to denote it as an error message.</li>
                </ul>
                <p>In this sample, messages are displayed with a distinct icon and a color based on the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#content"> content</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#severity">severity</a> properties.</p>
            </div>
        </div>
    );
};
export default Default;
