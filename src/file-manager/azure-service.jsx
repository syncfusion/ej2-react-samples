import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';
/**
 * File Manager sample with azure service
 */
export class Azure extends SampleBase {
    constructor() {
        super(...arguments);
        this.hostUrl = "https://ej2-azure-aspcore-service.azurewebsites.net/";
    }
    render() {
        return (<div>
                <div className="control-section">
                    <FileManagerComponent id="azure-file" ajaxSettings={{
            url: this.hostUrl + 'api/AzureFileManager/AzureFileOperations',
            getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
            uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
            downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
        }}>
                    <Inject services={[NavigationPane, DetailsView, Toolbar]}/>
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the Azure blob storage with File Manager component. To run the service, create the Azure blob storage account and register the Azure storage details like <i><b>account name</b></i>, <i><b>password</b></i>, and <i><b>blob name</b></i> details within the <code>RegisterAzure</code> method.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                        It supports all the basic file operations such as create, rename, delete and so on.</p>

                    <p><b>Note: </b>File Manager’s upload functionality is restricted in online demo. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-azure-aspcore-file-provider">Azure Blob Provider</a> from the GitHub repository.</p>

                    <p><b>NuGet Package:</b> NuGet package of <a target="_blank" href="https://www.nuget.org/packages/Syncfusion.EJ2.FileManager.AzureFileProvider.AspNet.Core"><b>ASP.NET Core Azure file system provider</b></a> is now available on <a target="_blank" href="https://www.nuget.org/">nuget.org</a>.</p>

                </div>
            </div>);
    }
}
