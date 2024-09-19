import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with azure service
 */
export class Azure extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-azure-aspcore-service.azurewebsites.net/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="azure-file" ajaxSettings = {{
                        url: this.hostUrl + 'api/AzureFileManager/AzureFileOperations',
                        getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
                        uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
                        downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
                    }}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                    contextMenuSettings={{
                        file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how to use the <a target="_blank" href="https://github.com/SyncfusionExamples/azure-aspcore-file-provider">Azure file system provider</a> with the File Manager component to perform file operations. This supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the Azure file system provider that allows users to access and manage the blobs from the <code>Azure blob storage</code>. To start the service, create an <a target="_blank" href="https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal">Azure blob storage account</a>. Refer to this <a target="_blank" href="https://learn.microsoft.com/en-IN/azure/storage/blobs/storage-quickstart-blobs-dotnet?culture=en-in&country=in&tabs=visual-studio%2Cmanaged-identity%2Croles-azure-portal%2Csign-in-azure-cli%2Cidentity-visual-studio">link</a> for more details.
                    </p>
                    <p>Checkout this <a target="_blank" href="https://github.com/SyncfusionExamples/azure-aspcore-file-provider">Azure file system provider</a> from the GitHub repository to connect with azure blob storage.</p>
                    <p>Provide the details such as the <code>account name</code>, <code>password</code>, and <code>blob name</code> in the <code>RegisterAzure</code> method.</p>
                    <p>Access the blob storage account using <code>BlobContainerClient</code> class and <code>BlobServiceClient</code> method of Azure. Read the storage files using the <code>GetFilesAsync</code> method to perform file operations in the File Manager component.</p>
                    
                    <p><b>Note: </b>File Manager’s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-azure-aspcore-file-provider">Azure Blob Provider</a> from the GitHub repository.</p>
                    <p><b>NuGet Package:</b> NuGet package of <a target="_blank" href="https://www.nuget.org/packages/Syncfusion.EJ2.FileManager.AzureFileProvider.AspNet.Core"><b>ASP.NET Core Azure file system provider</b></a> is now available on <a target="_blank" href="https://www.nuget.org/">nuget.org</a>.</p>

                </div>
            </div>
        );
    }
}
