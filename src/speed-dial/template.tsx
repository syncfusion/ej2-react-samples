import * as React from 'react';
import { ButtonComponent, SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './template.css';

export class Template extends SampleBase<{}, {}> {

    public textareaObj: any;

    public speeddialObj: SpeedDialComponent;

    public items: SpeedDialItemModel[] = [
        {
            text: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            text: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            text: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            text: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            text: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ];

    public closeClick():void {
        this.speeddialObj.hide();
    }

    public submitClick():void {
        this.speeddialObj.hide();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="speed-dial-wrapper">
                        <div className="speeddial-template-target  custom-index" id="speeddialtarget">
                            <SpeedDialComponent target="#speeddialtarget" cssClass="popupSpeedDial" popupTemplate={this.popupTemplate.bind(this)} content="Feedback" position="BottomLeft" openIconCss="speeddial-icons speeddial-icon-feedback" ref={scope => { this.speeddialObj = scope }}></SpeedDialComponent>
                            <SpeedDialComponent target="#speeddialtarget" itemTemplate={this.itemTemplate} position="BottomRight" content="Edit" openIconCss="speeddial-icons speeddial-icon-edit" items={this.items}></SpeedDialComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the customization of action items and Speed Dial popup using template. Click the Speed Dial button to open action items.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In the above example action items customized using <code>itemTemplate</code> and in another Speed Dial, popup is customized to load custom UI using <code>popupTemplate</code>.
                    </p>
                </div>
            </div>
        )
    }

    private itemTemplate(props: any): JSX.Element {
        let classname: string = "icon " + props.properties.iconCss;
        return (
            <div className="itemlist">
                <span className={classname}></span>
                <span className="text">{props.properties.text}</span>
            </div>
        );
    }

    private popupTemplate(): JSX.Element {
        return (
            <div className="popuptempContent">
                <div className="speeddial-form">
                    <div className="head" >
                        <div className="textEle">Feedback & Question</div>
                        <div className="iconEle"><span className="speeddial-icons speeddial-icon-close closeicon" onClick={this.closeClick.bind(this)}></span></div>
                    </div>
                    <div className="form_content">
                        <TextBoxComponent id="name" floatLabelType="Always" showClearButton={true} placeholder="Enter your name" style={{ width: '100%' }}></TextBoxComponent>
                        <br />
                        <TextBoxComponent id="email" floatLabelType="Always" showClearButton={true} placeholder="Enter your e-mail" style={{ width: '100%' }}></TextBoxComponent>
                        <br />
                        <TextBoxComponent multiline={true} name="comment" floatLabelType="Always" showClearButton={true} placeholder="Share your comments" style={{ width: '100%' }}></TextBoxComponent>
                        <br />
                    </div>
                    <div className="footer">
                        <ButtonComponent id="primarybtn" cssClass="e-success" onClick={this.submitClick.bind(this)}> Submit </ButtonComponent>
                    </div>
                </div>
            </div>
        );
    }
}