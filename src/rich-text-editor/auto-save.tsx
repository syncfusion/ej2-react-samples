/**
 * Rich Text Editor Auto Save sample
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Link, QuickToolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import './auto-save.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import {isNullOrUndefined } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
export class AutoSave extends SampleBase<{}, {}> {
    private rteObj: RichTextEditorComponent;
    private switchObj: SwitchComponent;
    // Rich Text Editor items list
    private items: string[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
        'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'];
    //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };
    private savingEle: HTMLDivElement;
    private savingRef: React.Ref<HTMLDivElement>;
    private savedEle: HTMLDivElement;
    private savedRef: React.Ref<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.savingRef = element => {
            this.savingEle = element;
        };
        this.savedRef = element => {
            this.savedEle = element;
        };
    }

    public updateStatus() {
        this.savingEle.style.display = 'block';
        this.savedEle.style.display = 'none';
        setTimeout(() => {
            if (!isNullOrUndefined(this.savingEle) && !isNullOrUndefined(this.savedEle)) {
                this.savingEle.style.display = 'none';
                this.savedEle.style.display = 'block';
            }
        }, 500);
    }

    public onChange(e) {
        if (e.checked) {
            this.rteObj.saveInterval = 5000;
        } else {
            this.rteObj.saveInterval = 0;
            setTimeout(() => {
                this.savingEle.style.display = 'none';
                this.savedEle.style.display = 'none';
            }, 500);

        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8'>
                    <div className='control-section' id="rteAPI">
                        <div className='rte-control-section'>
                            <RichTextEditorComponent id="autoSaveRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                                enablePersistence={true} placeholder={'Start to type a content to save'} saveInterval={5000} toolbarSettings={this.toolbarSettings} change={this.updateStatus.bind(this)} >
                                <div>
                                    <p>Type or edit the content to be saved automatically in the editor</p>
                                </div>
                                <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                            </RichTextEditorComponent>
                            <div id='statusEle' className='current-status'>
                                <div id='saving' ref={this.savingRef} style={{ display: 'none' }}>
                                    <div className="e-icons e-icon-refresh"> </div>
                                    <p className='status-text'> Saving changes</p>
                                </div>
                                <div id='saved' ref={this.savedRef} style={{ display: 'none' }}>
                                    <span className="e-icons e-icon-tick"> </span>
                                    <p className='status-text'>Changes saved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="rteAPIProperty">
                    <PropertyPane title='Properties'>
                        <label htmlFor="checked" style={{ padding: "10px 72px 10px 0" }}> Auto Save </label>
                        <SwitchComponent id="checked" ref={(scope) => { this.switchObj = scope }} change={this.onChange.bind(this)} checked={true}></SwitchComponent>
                    </PropertyPane>

                </div>
                <div id="action-description">
                    <p>Demonstrates how to save the Rich Text Editor’s content automatically with periodic interval. When you type or
        edit the content, it will be saved automatically by every 5 seconds. </p>
                </div>

                <div id="description">
                    <p>The Rich Text Editor provides options to save its content automatically using the ‘saveInterval’ property. By
                  default, the save interval time has 10 seconds from built-in support, but it can be customizable as per the
                  application needs. The interval is calculated based on editing the content and does not considered on idle
        state.</p>
                    <p>We have configured save interval as 5 seconds in this example. You can save the content in server also using this
        ‘auto save’ option.</p>
                    <p>When you disable this 'Auto Save' option in a sample, the value will be saved on focus-out from the editor.</p>
                    <p>Rich Text Editor content will be automatically saved when you focus out the editor.</p>
                </div>
            </div>

        );
    }
}
