import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import './variants.css';

function Variants() {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section msg-variant-section">
                <div className="content-wrapper">
                    <div className="col-lg-4 col-md-6 content-section">
                        <h4>Filled</h4>
                        <MessageComponent id="msg_default_filled" variant="Filled">Editing is restricted</MessageComponent>
                        <MessageComponent id="msg_info_filled" severity="Info" variant="Filled">Please read the comments carefully</MessageComponent>
                        <MessageComponent id="msg_success_filled" severity="Success" variant="Filled">Your message has been sent successfully</MessageComponent>
                        <MessageComponent id="msg_warning_filled" severity="Warning" variant="Filled">There was a problem with your network connection</MessageComponent>
                        <MessageComponent id="msg_error_filled" severity="Error" variant="Filled">A problem has been occurred while submitting your data</MessageComponent>
                    </div>
                    <div className="col-lg-4 col-md-6 content-section">
                        <h4>Outlined</h4>
                        <MessageComponent id="msg_default_outlined" variant="Outlined">Editing is restricted</MessageComponent>
                        <MessageComponent id="msg_info_outlined" severity="Info" variant="Outlined">Please read the comments carefully</MessageComponent>
                        <MessageComponent id="msg_success_outlined" severity="Success" variant="Outlined">Your message has been sent successfully</MessageComponent>
                        <MessageComponent id="msg_warning_outlined" severity="Warning" variant="Outlined">There was a problem with your network connection</MessageComponent>
                        <MessageComponent id="msg_error_outlined" severity="Error" variant="Outlined">A problem has been occurred while submitting your data</MessageComponent>
                    </div>
                    <div className="col-lg-4 content-section">
                        <h4>Text</h4>
                        <MessageComponent id="msg_default">Editing is restricted</MessageComponent>
                        <MessageComponent id="msg_info" severity="Info">Please read the comments carefully</MessageComponent>
                        <MessageComponent id="msg_success" severity="Success">Your message has been sent successfully</MessageComponent>
                        <MessageComponent id="msg_warning" severity="Warning">There was a problem with your network connection</MessageComponent>
                        <MessageComponent id="msg_error" severity="Error">A problem has been occurred while submitting your data</MessageComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the predefined appearance variants for the React Message component.</p>
            </div>
            <div id="description">
                <p>The Message component can be displayed with predefined appearance variants. The available variants are <b>Text</b>, <b>Outlined</b> and <b>Filled</b>. The default variant type is <b>Text</b>.</p>
                <ul>
                    <li><b>Text</b> - The severity is differentiated using a text color and a light background color.</li>
                    <li><b>Outlined</b> - The severity is differentiated using a text color and a border without background.</li>
                    <li><b>Filled</b> - The severity is differentiated using a text color and a dark background color.</li>
                </ul>
                <p>In this sample, messages are displayed with different appearances based on the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#variant">variant</a> property.</p>
            </div>
        </div>
    );
};
export default Variants;
