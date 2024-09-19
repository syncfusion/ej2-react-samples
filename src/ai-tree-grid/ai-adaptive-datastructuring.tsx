import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, Edit } from '@syncfusion/ej2-react-treegrid';
import { projectData } from './datasource';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

function AdaptiveDataStructuring() {
    let treeGridInstance!: TreeGridComponent;

    const toolbarTemplate = () => {
        return <ButtonComponent id='smartdata' isPrimary={true} onClick={restructureData}>Smart Data Restructure</ButtonComponent>
    };
    const toolbarOptions = [
        { template: toolbarTemplate }
    ];

    function restructureData() {
        treeGridInstance.showSpinner();
        let input = `I want you to act as a TreeGrid Data Organizer.
                Your task is to organize a dataset based on a hierarchical structure using 'CategoryId' and 'ParentId'.
                Each item in the dataset has a 'CategoryName' representing categories, and some categories have a null 'ParentId', indicating they are top-level categories. 
                Your role will be to meticulously scan the entire dataset to identify related items based on their 'CategoryName' values and nest them under the appropriate top-level categories by updating their 'ParentId' to match the 'CategoryId' of the corresponding top-level category.
                For example, if a category like 'Furniture' exists, you should scan the dataset for items such as 'Chair' and 'Table' and update their 'ParentId' to the 'CategoryId' of 'Furniture'.
                The output should be the newly prepared TreeGridData with correctly assigned 'ParentId' values. Please ensure that all subcategories are correctly nested under their respective top-level categories .
                Return the newly prepared TreeGridData alone and don't share any other information with the response:` + JSON.stringify(treeGridInstance.dataSource);
        let aioutput: any = (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
        aioutput.then((result: any) => {
            let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
            treeGridInstance.dataSource = JSON.parse(cleanedJsonData);
            treeGridInstance.hideSpinner();
        });
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container'>
                    <TreeGridComponent
                        ref={treegrid => treeGridInstance = treegrid!}
                        dataSource={projectData}
                        idMapping='CategoryId'
                        parentIdMapping='ParentId'
                        treeColumnIndex={1}
                        toolbar={toolbarOptions}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field='CategoryId' headerText='Category Id' isPrimaryKey={true} textAlign='Right' width={60} />
                            <ColumnDirective field='CategoryName' headerText='Category Name' width={100} />
                            <ColumnDirective field='Status' headerText='Status' width={70} />
                            <ColumnDirective field='OrderDate' headerText='Last Order Date' format='yMd' width={90} />
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Edit]} />
                    </TreeGridComponent>
                </div>
            </div>
        </div>
    )
}

export default AdaptiveDataStructuring;