import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';
import { TextBoxModel } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs as DropDownChangeArgs, DropDownListComponent, FieldSettingsModel, MultiSelectModel } from '@syncfusion/ej2-react-dropdowns';
import { ActionEventArgs, Inject, InPlaceEditorComponent, MultiSelect, RenderMode, Rte } from '@syncfusion/ej2-react-inplace-editor';
import { RichTextEditorModel } from '@syncfusion/ej2-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './editor.component.css';

// tslint:disable:max-line-length

export class UseCase extends SampleBase<{}, {}> {

    private inplaceEditorControlEle: HTMLDivElement;
    private inplaceEditorControlRef: React.Ref<HTMLDivElement>;
    constructor(props) {
        super(props);
        this.inplaceEditorControlEle = null;
        this.inplaceEditorControlRef = element => {
            this.inplaceEditorControlEle = element;
        };
    }

    private titleObj: InPlaceEditorComponent;
    private tagObj: InPlaceEditorComponent;
    private rteObj: InPlaceEditorComponent;
    private editorMode: DropDownListComponent
    private popupSettings: PopupSettingsModel = { model: { width: 300 } };

    private multiValue: string[] = ['TypeScript', 'JavaScript'];

    // define the array of string
    private multiData: string[] = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];

    private textValidationRules: { [name: string]: { [rule: string]: Object; }; } = { Title: { required: [true, 'Enter valid title'] } };

    private textModel: TextBoxModel = { placeholder: 'Enter your question title' };

    private rteValidationRules: { [name: string]: { [rule: string]: Object; }; } = { rte: { required: [true, 'Enter valid comments'] } };

    private rteModel: RichTextEditorModel = {
        toolbarSettings: {
            enableFloating: false,
            items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
        }
    };

    private selectValidationRules: { [name: string]: { [rule: string]: Object; }; } = { Tag: { required: [true, 'Enter valid tags'] } };

    private selectModel: MultiSelectModel = { dataSource: this.multiData, placeholder: 'Enter your tags', mode: 'Box', };

    // Mapping DropDownList dataSource property
    private editorData: { [key: string]: Object }[] = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'Popup', 'text': 'Popup' }
    ];

    // Mapping DropDownList fields property
    private dropDownFields: FieldSettingsModel = { text: 'text', value: 'value' };

    // Mapping DropDownList value property
    private dropDownVal: string = 'Inline';

    // Change event funtion for DropDownList component   
    public changeEditorMode(e: DropDownChangeArgs): void {
        let mode: string = this.editorMode.value as string;
        this.titleObj.mode = mode as RenderMode;
        this.tagObj.mode = mode as RenderMode;
        this.rteObj.mode = mode as RenderMode;
        this.titleObj.dataBind();
        this.tagObj.dataBind();
        this.rteObj.dataBind();
    }

    public selectionActionSuccess(e: ActionEventArgs): void {
        e.value = this.chipCreation(e.value.split(',') as string[]);
    }

    public create(): void {
        this.rteObj.popupSettings.model.width = this.inplaceEditorControlEle.offsetWidth;
        this.chipOnCreate();
    }

    public chipOnCreate(): void {
        this.tagObj.element.querySelector('.e-editable-value').innerHTML = this.chipCreation(this.tagObj.value as string[]);
    }

    public chipCreation(data: string[]): string {
        let value: string = '<div class="e-chip-list">';
        [].slice.call(data).forEach((val: string) => {
            value += '<div class="e-chip"> <span class="e-chip-text"> ' + val + '</span></div>';
        });
        value += '</div>';
        return value;
    }
    rendereComplete(): void {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', this.scrollRightPane);
        }
    }

    componentWillUnmount() {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', this.scrollRightPane);
        }
    }

    private scrollRightPane = () => {
        let mode: HTMLSelectElement = (document.getElementById('editorMode') as HTMLSelectElement);
        if (mode && mode.value === 'Inline') {
            return;
        }
        if (this.titleObj && this.titleObj.element.querySelectorAll('.e-editable-open')) {
            this.titleObj.enableEditMode = false;
        }
        if (this.tagObj && this.tagObj.element.querySelectorAll('.e-editable-open')) {
            this.tagObj.enableEditMode = false;
        }
        if (this.rteObj && this.rteObj.element.querySelectorAll('.e-editable-open')) {
            this.rteObj.enableEditMode = false;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section inplace-editor-control-section form-layout" ref={this.inplaceEditorControlRef} id='inplace-editor-control'>
                    <div className="content-wrapper" style={{ marginBottom: "25px" }}>
                        <div id="confirmation">
                            <div id="submitDialog"></div>
                            <form id="formId" className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-6 control-label" style={{ textAlign: "left", fontSize: "14px", fontWeight: 700 }}>
                                        Title</label>
                                    <InPlaceEditorComponent ref={(title) => { this.titleObj = title }} id='inplace_title_editor' data-underline='false' mode='Inline' emptyText='Enter your question title' name='Title' value='Succinctly E-Book about TypeScript' validationRules={this.textValidationRules} model={this.textModel} >
                                    </InPlaceEditorComponent>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-6 control-label" style={{ textAlign: "left", fontSize: "14px", fontWeight: 700 }}>
                                        Comments</label>
                                    <InPlaceEditorComponent ref={(rte) => { this.rteObj = rte }} id='inplace_comment_editor' data-underline='false' mode='Inline' type='RTE' editableOn='EditIconClick' submitOnEnter={false} value='The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use.' emptyText='Enter your comment' name='rte' validationRules={this.rteValidationRules} model={this.rteModel} popupSettings={this.popupSettings} >
                                        <Inject services={[Rte]} />
                                    </InPlaceEditorComponent>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-6 control-label" style={{ textAlign: "left", fontSize: "14px", fontWeight: 700 }}>
                                        Tags</label>
                                    <InPlaceEditorComponent ref={(tag) => { this.tagObj = tag }} id='inplace_tag_editor' data-underline='false' mode='Inline' type='MultiSelect' created={this.create.bind(this)} value={this.multiValue} emptyText='Enter your tags' name='Tag' actionSuccess={this.selectionActionSuccess.bind(this)} validationRules={this.selectValidationRules} model={this.selectModel} >
                                        <Inject services={[MultiSelect]} />
                                    </InPlaceEditorComponent>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="editorProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="property-panel-table">
                            <tbody>
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>
                                        <div>Mode</div>
                                    </td>
                                    <td>
                                        <div>
                                            {/* Render the DropDownList Component */}
                                            <DropDownListComponent ref={(drop) => { this.editorMode = drop }} id='editorMode' className='form-control' dataSource={this.editorData} fields={this.dropDownFields}
                                                value={this.dropDownVal} width={'90%'} change={this.changeEditorMode.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        The sample demonstrates In-place Editor component usage with a form element. Edit the values in place to update to the post.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the placing of following <code>In-place Editor</code> controls with the default form
                    </p>
                    <p>
                        <ul>
                            <li>
                                TextBox
                            </li>
                            <li>
                                RichTextEditor
                            </li>
                            <li>
                                MultiSelect
                            </li>
                        </ul>
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                            documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}