import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { rippleEffect } from '@syncfusion/ej2-base';
import './button-group.css';

export class ButtonGroup extends SampleBase<{}, {}> {
  public rendereComplete() {
    // To enable ripple in checkbox/radio type ButtonGroup.
    let buttons: NodeListOf<Element> = document.querySelectorAll('label.e-btn');
    let button: HTMLElement;
    for (let i: number = 0; i < buttons.length; i++) {
        button = buttons.item(i) as HTMLElement;
        rippleEffect(button, { selector: '.e-btn' });
    }
  }

  render() {
    return (
<div className='control-pane'>
<div className="control-section button-group-container">
    <div className="button-group-section">
        <div id="button-group-control">
            <div className="row">
                <p className="h5">Default</p>
                <div id="bgicon" className="e-btn-group">
                    <ButtonComponent iconCss='bg-icons e-btngrp-watch'></ButtonComponent>
                    <ButtonComponent iconCss='bg-icons e-btngrp-star'></ButtonComponent>
                    <ButtonComponent iconCss='bg-icons e-btngrp-download'></ButtonComponent>
                </div>
            </div>
            <div className="row">
                <p className="h5">Single selection</p>
                <div id="text" className="e-btn-group">
                    <input type="radio" id="left" name="align" value="left" />
                    <label className="e-btn" htmlFor="left">Left</label>
                    <input type="radio" id="center" name="align" value="center" disabled />
                    <label className="e-btn" htmlFor="center">Center</label>
                    <input type="radio" id="right" name="align" value="right" />
                    <label className="e-btn" htmlFor="right">Right</label>
                </div>
            </div>
            <div className="row">
                <p className="h5">Multiple selection</p>
                <div id="iconandtext" className="e-btn-group">
                    <input type="checkbox" id="bold" name="fontstyle" value="bold" checked />
                    <label className="e-btn" htmlFor="bold">
                        <span className="e-btn-icon bg-icons e-btngrp-bold e-icon-left"></span>Bold
                    </label>
                    <input type="checkbox" id="italic" name="fontstyle" value="italic" />
                    <label className="e-btn" htmlFor="italic">
                        <span className="e-btn-icon bg-icons e-btngrp-italic e-icon-left"></span>Italic
                    </label>
                    <input type="checkbox" id="underline" name="fontstyle" value="underline" />
                    <label className="e-btn" htmlFor="underline">
                        <span className="e-btn-icon bg-icons e-btngrp-underline e-icon-left"></span>Underline
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="action-description">
    <p>The following sample demonstrates the default functionalities of normal, radio, and checkbox button groups.</p>
</div>
<div id="description">
    <p>
        ButtonGroup is a graphical user interface that groups series of buttons horizontally or vertically. This supports radio and checkbox type behaviors.
    </p>
    <p>
        The above sample demonstrates the behaviors of button groups with icon only, text only, and text with icon combinations.
    </p>
    <ul>
        <li><b>Default:</b> Triggers action on button click.</li>
        <li><b>Single selection:</b> Radio type behavior selects a single button and submits its value to the server on form submission.This is showcased with the second button disabled, by default</li>
        <li><b>Multiple selection:</b> Checkbox type behavior selects multiple buttons and submits its selected values to the server on form submission. This is showcased with the first button selected, by default.</li>        
    </ul>
    <p>
        More information on ButtonGroup can be found in this 
        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/button-group/getting-started">
            documentation section</a>.
    </p>
</div>
</div>
    );
  }
}