import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import { ButtonComponent, CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './icons.css';
import { PropertyPane } from '../common/property-pane';

function Icons() {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [defaultVisible, setDefaultVisible] = useState<boolean>(true);
    const [defaultCssClass, setDefaultCssClass] = useState<string>('e-outline e-primary msg-hidden');
    const [infoVisible, setInfoVisible] = useState<boolean>(true);
    const [infoCssClass, setinfoCssClass] = useState<string>('e-outline e-primary e-info msg-hidden');
    const [successVisible, setSuccessVisible] = useState<boolean>(true);
    const [successCssClass, setSuccessCssClass] = useState<string>('e-outline e-primary e-success msg-hidden');
    const [warningVisible, setWarningVisible] = useState<boolean>(true);
    const [warningCssClass, setWarningCssClass] = useState<string>('e-outline e-primary e-warning msg-hidden');
    const [errorVisible, setErrorVisible] = useState<boolean>(true);
    const [errorCssClass, setErrorCssClass] = useState<string>('e-outline e-primary e-error msg-hidden');
    const [showIcon, setShowIcon] = useState<boolean>(true);
    const [showCloseIcon, setShowCloseIcon] = useState<boolean>(true);
    const defaultClick = () => {
        setDefaultVisible(true);
        setDefaultCssClass('e-outline e-primary msg-hidden');
    };
    const defaultClosed = () => {
        setDefaultVisible(false);
        setDefaultCssClass('e-outline e-primary');
    };
    const infoClick = () => {
        setInfoVisible(true);
        setinfoCssClass('e-outline e-primary e-info msg-hidden');
    };
    const infoClosed = () => {
        setInfoVisible(false);
        setinfoCssClass('e-outline e-primary e-info');
    };
    const successClick = () => {
        setSuccessVisible(true);
        setSuccessCssClass('e-outline e-primary e-success msg-hidden');
    };
    const successClosed = () => {
        setSuccessVisible(false);
        setSuccessCssClass('e-outline e-primary e-success');
    };
    const warningClick = () => {
        setWarningVisible(true);
        setWarningCssClass('e-outline e-primary e-warning msg-hidden');
    };
    const warningClosed = () => {
        setWarningVisible(false);
        setWarningCssClass('e-outline e-primary e-warning');
    };
    const errorClick = () => {
        setErrorVisible(true);
        setErrorCssClass('e-outline e-primary e-error msg-hidden');
    };
    const errorClosed = () => {
        setErrorVisible(false);
        setErrorCssClass('e-outline e-primary e-warning');
    };
    const severityIconChange = (args: ChangeEventArgs) => {
        setShowIcon(args.checked ? true : false);
    };
    const closeIconChange = (args: ChangeEventArgs) => {
        setShowCloseIcon(args.checked ? true : false)
    };

    return (
        <div className="control-pane">
            <div className="col-lg-8 control-section msg-icon-section">
                <div className="content-section">
                    <ButtonComponent id="btn1" content="Show Default Message" cssClass={defaultCssClass}
                        onClick={defaultClick.bind(this)} />
                    <MessageComponent id="msg_default_icon" visible={defaultVisible} showCloseIcon={showCloseIcon}
                        closed={defaultClosed.bind(this)} showIcon={showIcon}>
                        Editing is restricted
                    </MessageComponent>
                    <ButtonComponent id="btn2" content="Show Info Message" cssClass={infoCssClass} onClick={infoClick.bind(this)} />
                    <MessageComponent id="msg_info_icon" severity="Info" showCloseIcon={showCloseIcon}
                        visible={infoVisible} closed={infoClosed.bind(this)} showIcon={showIcon}>
                        Please read the comments carefully
                    </MessageComponent>
                    <ButtonComponent id="btn3" content="Show Success Message" cssClass={successCssClass} onClick={successClick.bind(this)} />
                    <MessageComponent id="msg_success_icon" severity="Success" showCloseIcon={showCloseIcon}
                        closed={successClosed.bind(this)} visible={successVisible} showIcon={showIcon}>
                        {' '} Your message has been sent successfully
                    </MessageComponent>
                    <ButtonComponent id="btn4" content="Show Warning Message" cssClass={warningCssClass} onClick={warningClick.bind(this)} />
                    <MessageComponent id="msg_warning_icon" severity="Warning" showCloseIcon={showCloseIcon}
                        closed={warningClosed.bind(this)} visible={warningVisible} showIcon={showIcon}>
                        There was a problem with your network connection
                    </MessageComponent>
                    <ButtonComponent id="btn5" content="Show Error Message" cssClass={errorCssClass} onClick={errorClick.bind(this)} />
                    <MessageComponent id="msg_error_icon" severity="Error" showCloseIcon={showCloseIcon}
                        closed={errorClosed.bind(this)} visible={errorVisible} showIcon={showIcon}>
                        A problem occurred while submitting your data
                    </MessageComponent>
                </div>
            </div>

            <div className="col-lg-4 property-section">
                <PropertyPane title="Properties">
                    <table id="property" title="Properties">
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px' }}>
                                    <CheckBoxComponent label="Severity Icon" checked={true} change={severityIconChange} />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px' }}>
                                    <CheckBoxComponent label="Close Icon" checked={true} change={closeIconChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the visibility customization of severity and close icons of the React Message component. Click the close icon to hide the message. Click the button to restore the hidden message. Check or uncheck the check box to show or hide the visibility of the severity icon. Check or uncheck the check box to show or hide the visibility of the close icon.</p>
            </div>
            <div id="description">
                <p>The Message component can be rendered with and without the severity and close icons. The close icon is used to hide the message.</p>
                <p>In this sample, the Message component is rendered with a severity icon and a close icon. The visibility of the severity icon is handled by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#showicon">showIcon</a> property. The visibility of the close icon is handled by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#showcloseicon">showCloseIcon</a> property.</p>
                <p>More information about Message icons can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/message/icons">documentation</a> section.</p>
            </div>
        </div>
    );
};
export default Icons;
