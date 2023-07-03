import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';


/**
 * File Manager folder upload sample
 */
const DirectoryUpload = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [isDirectoryUpload, setIsDirectoryUpload] = useState<boolean>(false);
    let fmObj = useRef<FileManagerComponent>(null);
    let hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    let items: ItemModel[] = [{ text: 'Folder' }, { text: 'Files' }];
    const onSuccess = (args) => {
        if (!document.getElementById("file_tb_upload").classList.contains("e-dropdown-btn")) {
            (document.getElementById('file_tb_upload') as HTMLElement).onclick = (e) => {
            e.stopPropagation();
            };
            let drpDownBtn: DropDownButton = new DropDownButton({
                items: items,
                select: (args) => {
                    if (args.item.text === "Folder") {
                      setIsDirectoryUpload(true);
                    } else {
                      setIsDirectoryUpload(false);
                    }
                    setTimeout( () => {
                        let uploadBtn: HTMLElement = document.querySelector('.e-file-select-wrap button');
                        uploadBtn.click();
                    }, 100);
                },
            },
            '#file_tb_upload'
            );
        }
    }
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="file" ref={fmObj} uploadSettings={{directoryUpload: isDirectoryUpload}} ajaxSettings = {{url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download'}} success={onSuccess.bind(this)}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the folder (directory) upload feature of FileManager component. Select 'Folder' from toolbar item to select and upload a folder.</p>
            </div>
            <div id="description">
                <p>
                    In this demo, a folder upload enabled by setting <code>directoryUpload</code> as true.
                    It allows to select or drop a folder to upload all its contents including hierarchy folders and files.
                </p>
                <p>
                    The folder (directory) upload is supported for the following file system providers,
                    <li> Physical provider</li> 
                    <li> NodeJS provider</li>
                    <li> Azure provider</li>
                    <li> Amazon S3 provider</li>
                </p>
                <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on.</p>
                <p>
                    <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                    <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                </p>
            </div>
        </div>
    );
}
export default DirectoryUpload;