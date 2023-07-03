import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './template.css';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

function Template() {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [visible, setVisible] = useState<boolean>(true);
    const [cssClass, setCssClass] = useState<string>(
        'e-outline e-primary e-success msg-hidden'
    );
    const showClick = () => {
        setVisible(true);
        setCssClass('e-outline e-primary e-success msg-hidden');
    };
    const dismissClick = () => {
        setVisible(false);
    };
    const closed = () => {
        setCssClass('e-outline e-primary e-success');
    };
    const contentTemplate = () => {
        return (
            <div>
                <h1>Merged pull request</h1>
                <p>Pull request #41 merged after a successful build</p>
                <ButtonComponent id="commitBtn" cssClass="e-link" content="View commit" />
                <ButtonComponent id="closeBtn" cssClass="e-link" content="Dismiss" onClick={dismissClick.bind(this)} />
            </div>
        );
    };
    return (
        <div className="control-pane">
            <div className="col-lg-12 control-section msg-template-section">
                <div className="content-section">
                <ButtonComponent id="showBtn" content="Show pull request" cssClass={cssClass} onClick={showClick.bind(this)} />
                <MessageComponent id="msg_template" visible={visible} content={contentTemplate.bind(this)} severity="Success" closed={closed.bind(this)} />
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the template functionality of the React Message component. Click the <b>dismiss</b> button to hide the message. Click the <b>Show pull request</b> button to restore the hidden message.</p>
            </div>
            <div id="description">
                <p>The Message component has an option to customize the content with a custom structure. The content can be a string, paragraph, or any other HTML element.</p>
                <p>In this sample, the Message component content is customized with HTML elements and React Button components.</p>
            </div>
        </div>
    );
};
export default Template;
