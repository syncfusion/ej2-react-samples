/**
 * ListView Virtualization Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent, ListView, Inject, Virtualization } from '@syncfusion/ej2-react-lists';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { Browser } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './virtualization.css';

export class UiVirtualization extends SampleBase<{}, {}> {

    public listviewInstance: ListView;
    public commonData: { [key: string]: string | object }[] = [];
    public dataSource: { [key: string]: { [key: string]: string | object }[] } = {};
    public startTime: Date;
    public endTime: Date;
    public liElement: HTMLElement;

    constructor(props: any) {
        super(props);
        this.commonData = [
            { name: 'Nancy', icon: 'N', id: '0', altText: "" },
            { name: 'Andrew', icon: 'A', id: '1', altText: "" },
            { name: 'Janet', icon: 'J', id: '2', altText: "" },
            { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3', altText: "" },
            { name: 'Steven', icon: 'S', id: '4', altText: "" },
            { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5', altText: "" },
            { name: 'Robert', icon: 'R', id: '6', altText: "" },
            { name: 'Michael', icon: 'M', id: '7', altText: "" },
            { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8', altText: "" },
            { name: 'Nolan', icon: 'N', id: '9', altText: "" }
        ];

        this.dataSource = this.createDataSource();
    }
    // Set customized list template
    public template(data: any) {
        return (
            <div className="e-list-wrapper e-list-avatar">
                <span className={`e-avatar e-avatar-circle ${data.icon} ${data.imgUrl ? 'hideUI' : 'showUI'}`}>{data.icon}</span>
                <img className={`e-avatar e-avatar-circle ${data.imgUrl ? 'showUI' : 'hideUI'}`} src={data.imgUrl ? data.imgUrl : ' '} alt={data.altText} />
                <span className="e-list-content">{data.name}</span>
            </div>
        );
    }

    private createDataSource() {
        const source: { [key: string]: Array<{ [key: string]: string | object }> } = {};
        
        ([[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']] as [number, string][])
            .forEach(([count, key]) => {
                let data = [...this.commonData];
                let index: number;
                let spyIndex: number;
                
                for (let i = 10; i <= count; i++) {
                    while (index === spyIndex) {
                        index = Math.floor(Math.random() * 10);
                    }
                    data.push({ 
                        ...this.commonData[index], 
                        id: i.toString() 
                    });
                    spyIndex = index;
                }
                source[key] = data;
            });
        
        return source;
    }

    componentDidMount() {
        // Set element reference once when component mounts
        this.liElement = document.getElementById('ui-list');
        createSpinner({ target: this.liElement });
        if (Browser.isDevice) {
            this.liElement.classList.add('ui-mobile');
        }
    }

    // Set dropdown list data
    public ddlDatasource = [
        { value: '1', text: '1k' },
        { value: '5', text: '5k' },
        { value: '10', text: '10k' },
        { value: '25', text: '25k' }
    ];
    //Map the appropriate columns to DropDownList fields property
    public ddlFields: Object = { text: 'text', value: 'value' };
    //Map the appropriate columns to ListView fields property
    public fields: Object = { text: 'name' };

    public onActionComplete() {
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
    }

    public onActionBegin() {
        this.startTime = new Date();
    }

    public onChange(e: ChangeEventArgs) {
        showSpinner(this.liElement);
        const start = Date.now();
        this.listviewInstance.dataSource = this.dataSource[`data${e.value}`];
        this.listviewInstance.dataBind();
        document.getElementById('time').innerText = `${Date.now() - start} ms`;
        hideSpinner(this.liElement);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='ui-control-section control-section'>
                    <div className='col-lg-8'>
                        <div className="content-wrapper" >
                            {/* ListView element */}
                            <ListViewComponent id='ui-list' dataSource={this.dataSource.data1} enableVirtualization={true} headerTitle="Contacts" fields={this.fields} cssClass="e-list-template"
                                height={500} template={this.template} actionComplete={this.onActionComplete.bind(this)} ref={(listview) => { this.listviewInstance = listview }} actionBegin={this.onActionBegin.bind(this)} showHeader={true} >
                                <Inject services={[Virtualization]} />
                            </ListViewComponent>
                        </div>
                    </div>
                    <div id="#slider_event" className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id="Properties" title="Tooltip" className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Load data</div>
                                        </td>
                                        <td style={{ width: '50%', paddingRight: '10px' }} >
                                            <div>
                                                {/* DropDownList element */}
                                                <DropDownListComponent id='ddl' dataSource={this.ddlDatasource} fields={this.ddlFields} index={0} change={this.onChange.bind(this)} placeholder="Select a range"
                                                    popupHeight="200px" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div className="userselect">Time taken</div>
                                        </td>
                                        <td style={{ width: '50%', paddingRight: '10px' }}>
                                            <div style={{ paddingLeft: '10px' }}>
                                                <span id="time">0 ms</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the default functionalities of UI virtualization. Scroll list item to experience UI virtualization.
                    </p>
                </div>

                <div id="description">
                <p>
                    UI virtualization is an optimization technique to avoid unnecessarily constructing and rendering objects for list items by loading only visible list items in a view port. This helps improve ListView performance when loading a large number of items. The
                    list items are updated dynamically while users scroll the list. The virtualization can be enabled by using the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#enablevirtualization'>enableVirtualization</a></code> API in Listview.
                </p>
                </div>
            </div>
        )
    }
}