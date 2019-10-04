import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import { ToastComponent, ToastBeforeOpenArgs } from '@syncfusion/ej2-react-notifications';
import { Effect, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownListComponent, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './api.css';
import { PositionDataModel } from '@syncfusion/ej2-popups';

export class Api extends SampleBase<{}, {}> {

    private toastInputTitleEle: HTMLInputElement;
    private toastInputTitleRef: React.Ref<HTMLInputElement>;    
    private toastInputContentEle: HTMLTextAreaElement;
    private toastInputContentRef: React.Ref<HTMLTextAreaElement>;    
    private showDurationEle: HTMLInputElement;
    private showDurationRef: React.Ref<HTMLInputElement>;    
    private hideDurationEle: HTMLInputElement;
    private hideDurationRef: React.Ref<HTMLInputElement>;
    private timeOutEle: HTMLInputElement;
    private timeOutRef: React.Ref<HTMLInputElement>;

    constructor(props) {
        super(props);

        this.toastInputTitleRef = element => {
            this.toastInputTitleEle = element;
        };

        this.toastInputContentRef = element => {
            this.toastInputContentEle = element;
        };

        this.showDurationRef = element => {
            this.showDurationEle = element;
        };

        this.hideDurationRef = element => {
            this.hideDurationEle = element;
        };

        this.timeOutRef = element => {
            this.timeOutEle = element;
        };
    }

    private toastObj: ToastComponent;
    private dropDownListShowEase: DropDownListComponent;
    private dropDownListHideEase: DropDownListComponent;
    private dropDownListShow: DropDownListComponent;
    private dropDownListHide: DropDownListComponent;
    private toastBtnShow: ButtonComponent;
    private toastBtnHide: ButtonComponent;
    private position: PositionDataModel = { X: 'Right', Y: 'Bottom' };
    private prevDuplicates: boolean = false;
    private showData: { [key: string]: Object }[] = [
        { Id: 'ease', Text: 'Ease' },
        { Id: 'linear', Text: 'Linear' }
    ];
    private animationData: { [key: string]: Object }[] = [
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];
    private animationData1: { [key: string]: Object }[] = [
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];
    private showFields: FieldSettingsModel = { text: 'Text', value: 'Id' };
    private animationFields: FieldSettingsModel = { text: 'Effect', value: 'Id' };
    private easeValue: string = 'ease';
    private animationValue: string = 'SlideBottomIn';
    private animationHideValue: string = 'SlideBottomOut';
    public closeOnChange(e: ChangeEventArgs): void {
        e.checked ? this.toastObj.showCloseButton = true : this.toastObj.showCloseButton = false;
    }
    public OnProgressChange(e: ChangeEventArgs): void {
        e.checked ? this.toastObj.showProgressBar = true : this.toastObj.showProgressBar = false;
    }
    public closeNewestOnChange(e: ChangeEventArgs): void {
        e.checked ? this.toastObj.newestOnTop = true : this.toastObj.newestOnTop = false;
    }
    public OnPrevDubChange(e: ChangeEventArgs): void {
        this.prevDuplicates = e.checked;
    }
    public OnactionBtnChange(e: ChangeEventArgs): void {
        if (e.checked) {
            this.toastObj.buttons = [{ model: { content: '<div class="e-toast-btn"> Click Here </div>' }, click: this.onActionBtnClick }];
        } else { this.toastObj.buttons = []; }
    }
    public onActionBtnClick(e: Event): void {
        alert('Action button is clicked');
    }
    public showToast(): void {
        let title: string = this.toastInputTitleEle.value;
        let content: string = this.toastInputContentEle.value;
        if (title === '' && content === '') {
            content = 'You have created a Toast message';
        }
        let showDuration: number = parseInt(this.showDurationEle.value, 10);
        let hideDuration: number = parseInt(this.hideDurationEle.value, 10);
        let timeOut: number = parseInt(this.timeOutEle.value, 10);
        this.toastObj.show(
            {
                title: title, content: content, timeOut: timeOut,
                animation: {
                    show: { duration: showDuration },
                    hide: { duration: hideDuration }
                }
            });
    }
    public onShowEase(): void {
        this.toastObj.animation.show.easing = this.dropDownListShowEase.value.toString();
    }
    public showChange(): void {
        this.toastObj.animation.show.effect = this.dropDownListShow.value as Effect;
    }
    public hideChange(): void {
        this.toastObj.animation.hide.effect = this.dropDownListHide.value as Effect;
    }
    public onHideEase(): void {
        this.toastObj.animation.hide.easing = this.dropDownListHideEase.value.toString();
    }
    public showBtnClick(): void {
        this.showToast();
    }
    public hideBtnClick(): void {
        this.toastObj.hide('All');
    }
    public onbeforeOpen(e: ToastBeforeOpenArgs): void {
        this.toastBtnHide.element.style.display = 'inline-block';
        if (this.prevDuplicates) {
            e.cancel = this.preventDuplicate(e);
        }
    }
    public onclose(e): void {
        if (e.toastContainer.childElementCount === 0) {
            this.toastBtnHide.element.style.display = 'none';
        }

    }

    public preventDuplicate(e: ToastBeforeOpenArgs): boolean {
        let toastEle: HTMLElement = e.element;
        let toasts: HTMLCollection = e.toastObj.element.children;
        for (let i: number = 0; i < toasts.length; i++) {
            let toastTitle: HTMLElement = (toasts[i] as HTMLElement).querySelector('.e-toast-title');
            let toastMessage: HTMLElement = (toasts[i] as HTMLElement).querySelector('.e-toast-message');
            if (toastTitle && toastTitle.isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                return true;
            }
            if (!toastTitle && toastMessage && toastMessage.isEqualNode(toastEle.querySelector('.e-toast-message'))) {
                return true;
            }
        }
        return false;
    }

    rendereComplete(){
        document.addEventListener('click', function (e: Event): void {
            if (!isNullOrUndefined(this.toastObj) && e.target !== this.toastBtnShow.element) {
                this.toastObj.hide('All');
            }
        }.bind(this));
    }

    render() { 
        return (
            <div className='control-pane'>
                <div className="col-lg-12 control-section toast-api-section">
                    <div className="e-sample-resize-container">
                        <ToastComponent ref={(toast) => { this.toastObj = toast }} id='toastApi' position={this.position} close={this.onclose.bind(this)} beforeOpen={this.onbeforeOpen.bind(this)} newestOnTop={true}></ToastComponent>
                        <div className="row">
                            <div className="col-lg-6 padding">
                                <div className="input-form">
                                    <div className="e-float-input">
                                        <input id="toast_input_title" ref={this.toastInputTitleRef} className='e-input' required />
                                        <span className="e-float-line"></span>
                                        <label className="e-float-text">Enter the title</label>
                                    </div>
                                </div>
                                <div className="input-form">
                                    <div className="e-float-input">
                                        <textarea className='e-input' ref={this.toastInputContentRef} id='toast_input_content' rows={3} required></textarea>
                                        <label className="e-float-text">Enter the content</label>
                                    </div>
                                </div>
                                <div className="group-form e-group">
                                    <CheckBoxComponent id='closeButton' label='Show Close Button' change={this.closeOnChange.bind(this)}></CheckBoxComponent>
                                </div>
                                <div className="group-form e-group">
                                    <CheckBoxComponent id='progressBar' label='Show Progress Bar' change={this.OnProgressChange.bind(this)}></CheckBoxComponent>
                                </div>
                                <div className="group-form e-group">
                                    <CheckBoxComponent id='newestOnTop' checked={true} label='Newest On Top' change={this.closeNewestOnChange.bind(this)}></CheckBoxComponent>
                                </div>
                                <div className="group-form e-group">
                                    <CheckBoxComponent id='prevDuplicates' label='Prevent Duplicates' change={this.OnPrevDubChange.bind(this)}></CheckBoxComponent>
                                </div>
                                <div className="group-form e-group">
                                    <CheckBoxComponent id='actionButtons' label='Action Buttons' change={this.OnactionBtnChange.bind(this)}></CheckBoxComponent>
                                </div>
                                <div className="input-form">
                                    <div className="e-float-input e-input-group">
                                        <input className="e-input" id="timeOut" ref={this.timeOutRef} name="Digits" defaultValue="5000" required />
                                        <span className="e-float-line"></span>
                                        <label className="e-float-text">TimeOut</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 padding">
                                <div className="input-form">
                                    <h4> Show Animation</h4>
                                    <div className="e-float-input">
                                        <input className="e-input" id="showDuration" ref={this.showDurationRef} defaultValue="400" required />
                                        <span className="e-float-line"></span>
                                        <label className="e-float-text">Duration</label>
                                    </div>
                                </div>
                                <div className="input-form">
                                    <DropDownListComponent ref={(dropdownlist) => { this.dropDownListShowEase = dropdownlist }} id="ShowEasing" dataSource={this.showData} fields={this.showFields} placeholder="Select an Easing" change={this.onShowEase.bind(this)} value={this.easeValue} />
                                </div>
                                <div className="input-form">
                                    <DropDownListComponent ref={(dropdownlist) => { this.dropDownListShow = dropdownlist }} id="ShowAnimation" dataSource={this.animationData} fields={this.animationFields} placeholder="Select an Animation" change={this.showChange.bind(this)} value={this.animationValue} />
                                </div>
                                <div className="input-form e-group">
                                    <h4> Hide Animation</h4>
                                    <div className="e-float-input">
                                        <input className="e-input" id="hideDuration" ref={this.hideDurationRef} defaultValue="400" required />
                                        <span className="e-float-line"></span>
                                        <label className="e-float-text">Duration</label>
                                    </div>
                                </div>
                                <div className="input-form">
                                    <DropDownListComponent ref={(dropdownlist) => { this.dropDownListHideEase = dropdownlist }} id="HideEasing" dataSource={this.showData} fields={this.showFields} placeholder="Select an Easing" change={this.onHideEase.bind(this)} value={this.easeValue} />
                                </div>
                                <div className="input-form">
                                    <DropDownListComponent ref={(dropdownlist) => { this.dropDownListHide = dropdownlist }} id="HideAnimation" dataSource={this.animationData1} fields={this.animationFields} placeholder="Select an Animation" change={this.hideChange.bind(this)} value={this.animationHideValue} />
                                </div>
                            </div>
                        </div>
                        <div className="row center">
                            <ButtonComponent id='toastBtnShow' ref={(btn) => { this.toastBtnShow = btn }} className='e-btn e-primary' onClick={this.showBtnClick.bind(this)} style={{ marginRight: '15px' }}>Show Toasts</ButtonComponent>
                            <ButtonComponent id='toastBtnHide' ref={(btn) => { this.toastBtnHide = btn }} className='e-btn e-primary' onClick={this.hideBtnClick.bind(this)} style={{ display: 'none' }}> Hide All</ButtonComponent>
                        </div>
                    </div>
                </div>
                <br />
                <div id="action-description">
                    <p>This sample demonstrates all the API functionalities available in <code>Toast.</code></p>
                </div>
                <div id="description">
                    <p>In this sample, with help of text inputs toast header <code>title</code> and <code>content</code> text can be provided.</p>
                    <ul>
                        <li><code>Action Buttons</code> – Provide support to add a button inside toast to interact with it.</li>
                        <li><code>Prevent Duplicates</code> – Disable the user to create same toast message multiple times.</li>
                        <li><code>TimeOut</code> – Allows to set time in millisecond to close toast.</li>
                        <li><code>Progress Bar</code> – Visualizes the time out of toast as an indicator.</li>
                        <li><code>Animation</code> – Enables to define the toast show and hide animation.</li>
                        <li><code>Close button</code> – Show close button to hide toast irrespective of time out.</li>
                    </ul>
                    <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                        documentation section</a>.</p>
                </div>
            </div>
        )
    }
}