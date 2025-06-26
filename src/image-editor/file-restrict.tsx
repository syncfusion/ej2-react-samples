import * as React from 'react';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './file-restrict.css';

MultiSelectComponent.Inject(CheckBoxSelection);

export class FileRestrict extends SampleBase<{}, {}> {
    private imgObj: ImageEditorComponent;
    private minFileSize: number = 1;
    private maxFileSize: number = 100;
    private allowedExtensions: string = ".jpeg, .jpg, .png, .svg, .webp, .bmp";
    private fileSizeUnit: string = 'MB';
    private fileExtensionsList = [
        { Name: "JPEG", Value: ".jpeg" },
        { Name: "JPG", Value: ".jpg" },
        { Name: "PNG", Value: ".png" },
        { Name: "SVG", Value: ".svg" },
        { Name: "WebP", Value: ".webp" },
        { Name: "BMP", Value: ".bmp" }
    ];
    private units = [
        { text: "MB" },
        { text: "KB" },
    ];

    private convertToBytes(value: number): number {
        return value * (this.fileSizeUnit === "MB" ? 1024 * 1024 : 1024);
    }

    private updateUploadSettings = () => {
        if (this.imgObj) {
            this.imgObj.uploadSettings = {
                minFileSize: this.convertToBytes(this.minFileSize),
                maxFileSize: this.convertToBytes(this.maxFileSize),
                allowedExtensions: this.allowedExtensions
            };
            this.imgObj.dataBind();
        }
    };

    private onSelect = (e: any) => {
        this.fileSizeUnit = e.item.text;
        this.updateUploadSettings();
    };
    
    private beforeItemRender = (e: any) => {
        if (e.itemData.text === this.fileSizeUnit) {
            e.element.classList.add('e-selected');
        }
    };

    private onCreated = () => {
        this.updateUploadSettings();
    };

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div className="row">
                        <div className="col-lg-12 control-section">
                            <div style={{ textAlign: 'center' }}>
                                <div className="e-img-editor-dropdown-container">
                                <label>Size As</label><br />
                                    <DropDownButtonComponent
                                        id="dropdownbtn"
                                        items={this.units}
                                        content={this.fileSizeUnit}
                                        select={this.onSelect}
                                        beforeItemRender={this.beforeItemRender}
                                    />
                                </div>
                                <div className="e-img-editor-numeric-textbox-container">
                                    <label>Minimum Size</label>
                                    <br />
                                    <NumericTextBoxComponent
                                        value={this.minFileSize}
                                        min={this.minFileSize}
                                        width="180px"
                                        change={(e) => {
                                            this.minFileSize = e.value as number;
                                            this.updateUploadSettings();
                                        }}
                                    />
                                </div>
                                <div className="e-img-editor-numeric-textbox-container">
                                    <label>Maximum Size</label>
                                    <span> (in Bytes)</span>
                                    <br />
                                    <NumericTextBoxComponent
                                        value={this.maxFileSize}
                                        min={this.minFileSize}
                                        width="180px"
                                        change={(e) => {
                                            this.maxFileSize = e.value as number;
                                            this.updateUploadSettings();
                                        }}
                                    />
                                </div>
                                <div className="e-img-editor-dropdown-container">
                                    <label>Allowed File Extensions</label>
                                    <br />
                                    <MultiSelectComponent
                                        dataSource={this.fileExtensionsList}
                                        fields={{ text: 'Name', value: 'Value' }}
                                        mode="CheckBox"
                                        showSelectAll={true}
                                        value={this.allowedExtensions.split(', ')}
                                        change={(e) => {
                                            if (e.value.length === 0) {
                                                this.allowedExtensions = ".jpeg, .jpg, .png, .svg, .webp, .bmp";
                                            } else {
                                                this.allowedExtensions = (e.value as string[]).join(', ');
                                            }
                                            this.updateUploadSettings();
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="e-img-editor-sample">
                                <ImageEditorComponent
                                    id="image-editor"
                                    ref={(img) => { this.imgObj = img }}
                                    uploadSettings={{
                                        minFileSize: this.convertToBytes(this.minFileSize),
                                        maxFileSize: this.convertToBytes(this.maxFileSize),
                                        allowedExtensions: this.allowedExtensions
                                    }}
                                    created={this.onCreated}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the file restriction feature in the Image Editor component, allowing customization of file extensions, minimum and maximum file sizes, and drag-and-drop functionality.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample highlights the enhanced configuration capabilities of the Image Editor component through the <b>uploadSettings</b> property. The following features are included:
                    </p>
                    <ul>
                        <li><b>File Extensions</b>: Use a multi-select dropdown with checkboxes to dynamically choose the allowed file extensions. Supported values include <code>jpeg</code>, <code>jpg</code>, <code>png</code>, <code>svg</code>, <code>webp</code>, and <code>bmp</code>.</li>
                        <li><b>File Size</b>: Numeric textboxes to set minimum and maximum file sizes dynamically.</li>
                        <li><b>Dynamic Updates</b>: Changes made to the numeric textboxes or the dropdown options immediately reflect in the component's <code>uploadSettings</code>.</li>
                        <li><b>Upload Settings</b>: Predefined settings include:
                            <ul>
                                <li><b>Allowed Extensions</b>: <code>.jpeg</code>, <code>.png</code>, <code>.svg</code>, <code>.webp</code>, <code>.bmp</code></li>
                                <li><b>Minimum File Size</b>: 1 KB</li>
                                <li><b>Maximum File Size</b>: 100 KB</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
