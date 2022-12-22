import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import { Message, MessageComponent } from '@syncfusion/ej2-react-notifications';
import { getComponent } from '@syncfusion/ej2-base';
import './template.css';
import { Button, ButtonComponent } from '@syncfusion/ej2-react-buttons';

function Template() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let msgTemplate: MessageComponent;
    let showBtn: ButtonComponent;

    function showClick(): void {
        msgTemplate.visible = true;
        showBtn.element.classList.add('msg-hidden');
    }

    function dismissClick(): void {
        msgTemplate.visible = false;
    }

    function closed(): void {
        showBtn.element.classList.remove('msg-hidden');
    }

    function contentTemplate() {
        return (
            <div><h1>Merged pull request</h1>
                <p>Pull request #41 merged after a successful build</p>
                <ButtonComponent id='commitBtn' cssClass='e-link' content='View commit'></ButtonComponent>
                <ButtonComponent id='closeBtn' cssClass='e-link' content='Dismiss' onClick={dismissClick.bind(this)}></ButtonComponent>
            </div>
        )
    }
    return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section msg-template-section">
                <div className="content-section">
                    <ButtonComponent id='showBtn' ref={(scope) => { showBtn = scope; }} content='Show pull request' cssClass="e-outline e-primary e-success msg-hidden" onClick={showClick.bind(this)}></ButtonComponent>
                    <MessageComponent id="msg_template" ref={(scope) => { msgTemplate = scope; }} content={contentTemplate.bind(this)} severity="Success" closed={closed.bind(this)}></MessageComponent>
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
    )
}
export default Template;
