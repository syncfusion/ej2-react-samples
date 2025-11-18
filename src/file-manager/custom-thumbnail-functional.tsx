import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, Toolbar, DetailsView } from '@syncfusion/ej2-react-filemanager';
import './custom-thumbnail.css';

/**
 * File Manager custom thumbnail sample
 */
const CustomThumbnail = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="Thumbnail_filemanager" ajaxSettings = {{url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download'}} toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}} contextMenuSettings={{file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }} view={"LargeIcons"} showThumbnail = {false}>
                    <Inject services={[ NavigationPane, Toolbar, DetailsView]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>
                    In this sample of the File Manager component, the custom thumbnail feature is showcased, allowing users to view personalized thumbnails for both folders and file types using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/file-manager/#showthumbnail"> showThumbnail </a> property.
                </p>
            </div>
            <div id="description">
                <p>In this demo, custom thumbnail styles (<code>background-image</code> for the following classes within the <code>.e-filemanager .e-large-icons</code> class) were applied to folder and file types using corresponding class names, resulting in a visually distinctive representation of the thumbnails according to their specific needs.</p>
                <ul>
                    <li><code>.e-fe-image</code></li>
                    <li><code>.e-fe-music</code></li>
                    <li><code>.e-fe-xlsx</code></li>
                    <li><code>.e-fe-video</code></li>
                    <li><code>.e-fe-pptx</code></li>
                    <li><code>.e-fe-rar</code></li>
                    <li><code>.e-fe-zip</code></li>
                    <li><code>.e-fe-txt</code></li>
                    <li><code>.e-fe-js</code></li>
                    <li><code>.e-fe-css</code></li>
                    <li><code>.e-fe-html</code></li>
                    <li><code>.e-fe-unknown</code></li>
                    <li><code>.e-fe-exe</code></li>
                    <li><code>.e-fe-msi</code></li>
                    <li><code>.e-fe-php</code></li>
                    <li><code>.e-fe-doc</code></li>
                    <li><code>.e-fe-docx</code></li>
                    <li><code>.e-fe-xml</code></li>
                    <li><code>.e-fe-folder</code></li>
                </ul>
                <p>
                    <b>Note: </b>File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                </p>
            </div>
        </div>
    );
}
export default CustomThumbnail;