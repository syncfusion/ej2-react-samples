import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ToolbarItemsDirective, ToolbarItemDirective } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sequential upload sample
 */
const SequentialUpload = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let fmObj = useRef<FileManagerComponent>(null);
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";

    return (
        <div>
            <div className="control-section">
                <FileManagerComponent id="file-sequential" ref={fmObj} ajaxSettings={{
                    url: hostUrl + "api/FileManager/FileOperations",
                    getImageUrl: hostUrl + "api/FileManager/GetImage",
                    uploadUrl: hostUrl + 'api/FileManager/Upload',
                    downloadUrl: hostUrl + 'api/FileManager/Download'
                }}
                    uploadSettings={{ sequentialUpload: true, directoryUpload: true }}>
                    <ToolbarItemsDirective>
                        <ToolbarItemDirective name='NewFolder' />
                        <ToolbarItemDirective name="Upload" />
                        <ToolbarItemDirective name="SortBy" />
                        <ToolbarItemDirective name="Refresh" />
                        <ToolbarItemDirective name="Cut" />
                        <ToolbarItemDirective name="Copy" />
                        <ToolbarItemDirective name="Paste" />
                        <ToolbarItemDirective name="Delete" />
                        <ToolbarItemDirective name="Download" />
                        <ToolbarItemDirective name="Rename" />
                        <ToolbarItemDirective name="Selection" />
                        <ToolbarItemDirective name="View" />
                        <ToolbarItemDirective name="Details" />
                    </ToolbarItemsDirective>
                    <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample showcases the File Manager's sequential upload feature. When enabled, files are uploaded one at a time in the order they were added, ensures sequencing and better control over network usage.</p>
            </div>

            <div id="description">
                <p>In this demo, a sequential upload is enabled by setting <a href="https://ej2.syncfusion.com/react/documentation/api/file-manager/uploadsettingsmodel/#sequentialUpload" target="_blank">sequentialUpload</a> to <code>true</code> in the File Manager's upload settings. When enabled, files are uploaded one after another in the order they were added, helping preserve the intended sequence and manage bandwidth more effectively.</p>
            </div>
        </div>
    );
}
export default SequentialUpload;