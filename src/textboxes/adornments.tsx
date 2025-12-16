import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';

export class Adornments extends SampleBase<{}, {}> {
    public appendTextboxObj: TextBoxComponent;
    public iconTextboxObj: TextBoxComponent;
    private handleClick(e: any): void {
        let textIcon: HTMLElement = e.target as HTMLElement;
        if (textIcon) {
            if (this.appendTextboxObj.type === 'text') {
                this.appendTextboxObj.type = 'Password';
                textIcon.className = 'e-icons e-eye-slash';
            } else {
                this.appendTextboxObj.type = 'text';
                textIcon.className = 'e-icons e-eye';
            }
        }
    }
    private handleDeleteClick(): void {
        this.iconTextboxObj.value = '';
    }
    render(): JSX.Element {
        return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section adornment-textbox'>
                <div className="content-wrapper sample-icon">
                    <div className="row">
                        <TextBoxComponent placeholder="Enter your Name" cssClass="e-prepend-textbox" floatLabelType="Auto" prependTemplate= {this.prependTemplate} />
                    </div>
                    <div className="row">
                        <TextBoxComponent ref={(scope) => {this.appendTextboxObj = scope}} placeholder="Password" floatLabelType="Auto" cssClass="e-eye-icon" appendTemplate={this.appendTemplate} />
                    </div>
                    <div className="row custom-margin-row">
                        <TextBoxComponent ref={(scope) => {this.iconTextboxObj = scope}} placeholder="Enter the Mail Address" cssClass="e-icon-textbox" floatLabelType="Auto" prependTemplate={this.prependIconTemplate} appendTemplate={this.appendIconTemplate} />
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p> This example demonstrates the adornment capabilities of the Syncfusion TextBox component. Adornments are custom elements that can be added by using the <code>prependTemplate</code> and <code>appendTemplate</code> properties of the textbox to provide additional functionality or visual cues. This feature allows for enhanced user interaction, such as a dropdown for prefixes or clickable icons to toggle password visibility or clear input.</p>
            </div>
            <div id="description">
                <p>This sample demonstrates the adornment feature of the Syncfusion React TextBox, showcasing how to integrate custom elements or icons at both the beginning and end of the input field</p>
                <ul>
                    <li>The first textbox displays a prepended user icon representing the username.</li>
                    <li>The second textbox features an appended eye icon, allowing users to toggle password visibility.</li>
                    <li>The third textbox combines a prepended people icon with an appended ".com" text and a trash icon that clears the input when clicked.</li>
                </ul>
                <p>These examples highlight the flexibility and enhanced user experience provided by TextBox adornments.</p>
            </div>
        </div>
        );
    }
    private prependTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-icons e-user"></span><span className="e-input-separator"></span>
            </div>
        );
    }
    private appendTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-input-separator"></span><span id="text-icon" className="e-icons e-eye" onClick={this.handleClick}></span>
            </div>
        );
    }
    private prependIconTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-icons e-people"></span><span className="e-input-separator"></span>
            </div>
        );
    }
    private appendIconTemplate(): JSX.Element {
        return (
            <div>
                <span>.com</span><span className="e-input-separator"></span><span className="e-icons e-trash" onClick={this.handleDeleteClick}></span>
            </div>
        );
    }
}
