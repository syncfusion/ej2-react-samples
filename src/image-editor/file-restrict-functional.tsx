import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './file-restrict.css';

MultiSelectComponent.Inject(CheckBoxSelection);

const FileRestrict = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const imgObj = useRef<ImageEditorComponent>(null);

    // States for file restrictions
    const [minFileSize, setMinFileSize] = useState(1);
    const [maxFileSize, setMaxFileSize] = useState(100);
    const [allowedExtensions, setAllowedExtensions] = useState([".jpeg", ".jpg", ".png", ".svg", ".webp"]);
    const [fileSizeUnit, setFileSizeUnit] = useState('KB');
    const fileExtensionsList = [
        { Name: "JPEG", Value: ".jpeg" },
        { Name: "JPG", Value: ".jpg" },
        { Name: "PNG", Value: ".png" },
        { Name: "SVG", Value: ".svg" },
        { Name: "WebP", Value: ".webp" }
    ];

    const units = [
        { text: "MB" },
        { text: "KB" },
    ]

    const convertToBytes = (value: number) => {
        return value * (fileSizeUnit === "MB" ? 1024 * 1024 : 1024);
    };
    
    // Update Image Editor upload settings
    const updateUploadSettings = (): void => {
        if (imgObj.current) {
            imgObj.current.uploadSettings = {
                minFileSize: convertToBytes(minFileSize),
                maxFileSize: convertToBytes(maxFileSize),
                allowedExtensions: allowedExtensions.join(', '),
            };
            imgObj.current.dataBind();
        }
    };

    const onSelect = (e: any) => {
        setFileSizeUnit(e.item.text);
        updateUploadSettings();
    };
    
    const beforeItemRender = (args: any) => {
        if (args.item.text === fileSizeUnit) {
            args.element.classList.add('e-selected');
        }
    };
    
    const onCreated = () => {
        updateUploadSettings();
    };

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
                                    items={units}
                                    content={fileSizeUnit}
                                    select={onSelect}
                                    beforeItemRender={beforeItemRender}
                                />
                            </div>
                            <div className="e-img-editor-numeric-textbox-container">
                                <label>Minimum Size</label>
                                <br />
                                <NumericTextBoxComponent
                                    width="180px"
                                    value={minFileSize}
                                    min={minFileSize}
                                    change={(e) => {
                                        setMinFileSize(e.value as number);
                                        updateUploadSettings();
                                    }}
                                />
                            </div>
                            <div className="e-img-editor-numeric-textbox-container">
                                <label>Maximum Size</label>
                                <br />
                                <NumericTextBoxComponent
                                    width="180px"
                                    value={maxFileSize}
                                    min={minFileSize}
                                    change={(e) => {
                                        setMaxFileSize(e.value);
                                        updateUploadSettings();
                                    }}
                                />
                            </div>
                            <div className="e-img-editor-dropdown-container">
                                <label>Allowed Extensions</label><br />
                                <MultiSelectComponent
                                    dataSource={fileExtensionsList}
                                    fields={{ text: 'Name', value: 'Value' }}
                                    mode="CheckBox"
                                    showSelectAll
                                    value={allowedExtensions}
                                    width="210px"
                                    change={(e) => {
                                        if (e.value.length === 0) {
                                            setAllowedExtensions([".jpeg", ".jpg", ".png", ".svg", ".webp"]);
                                        } else {
                                            setAllowedExtensions(e.value);
                                        }
                                        updateUploadSettings();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="e-img-editor-sample">
                            <ImageEditorComponent
                                id="image-editor"
                                ref={imgObj}
                                uploadSettings={{
                                    minFileSize: convertToBytes(minFileSize),
                                    maxFileSize: convertToBytes(maxFileSize),
                                    allowedExtensions: allowedExtensions.join(', ')
                                }}
                                created={onCreated}
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
                    <li><b>File Extensions</b>: Use a multi-select dropdown with checkboxes to dynamically choose the allowed file extensions. Supported values include <code>jpeg</code>, <code>jpg</code>, <code>png</code>, <code>svg</code>, and <code>webp</code>.</li>
                    <li><b>File Size</b>: Numeric textboxes to set minimum and maximum file sizes dynamically.</li>
                    <li><b>Dynamic Updates</b>: Changes made to the numeric textboxes or the dropdown options immediately reflect in the component's <code>uploadSettings</code>.</li>
                    <li><b>Upload Settings</b>: Predefined settings include:
                        <ul>
                            <li><b>Allowed Extensions</b>: <code>.jpeg</code>, <code>.png</code>, <code>.svg</code>, <code>.webp</code></li>
                            <li><b>Minimum File Size</b>: 1 KB</li>
                            <li><b>Maximum File Size</b>: 100 KB</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FileRestrict;
