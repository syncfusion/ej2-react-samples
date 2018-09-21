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

    constructor() {
        super();
        this.commonData = [
            { name: 'Nancy', icon: 'N', id: '0', },
            { name: 'Andrew', icon: 'A', id: '1' },
            { name: 'Janet', icon: 'J', id: '2' },
            { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3' },
            { name: 'Steven', icon: 'S', id: '4' },
            { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5' },
            { name: 'Robert', icon: 'R', id: '6' },
            { name: 'Michael', icon: 'M', id: '7' },
            { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8' },
            { name: 'Nolan', icon: 'N', id: '9' }
        ];

        [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']].forEach((ds: string[] | number[]) => {
            let data: { [key: string]: string | object }[] = this.commonData.slice();
            let index: number;
            let spyIndex: number;
            for (let i: number = 10; i <= ds[0]; i++) {
                while (index === spyIndex) {
                    index = parseInt((Math.random() * 10).toString(), 10);
                }
                data.push({ name: data[index].name, icon: data[index].icon, imgUrl: data[index].imgUrl, id: i.toString() });
                spyIndex = index;
            }
            this.dataSource[ds[1]] = data;
        });
    }

    public template: string = '<div class="e-list-wrapper e-list-avatar">' +
    '<span class="e-avatar e-avatar-circle ${icon} ${$imgUrl ? \'hideUI\' : \'showUI\' }">' +
    '${icon}</span> <img class="e-avatar e-avatar-circle ${$imgUrl ? \'showUI\' : \'hideUI\' }" ' +
    'src="${$imgUrl ?  $imgUrl : \' \' }" />' +
    '<span class="e-list-content">${name}</span></div>';

    public ddlDatasource = [
        { value: '1', text: '1k' },
        { value: '5', text: '5k' },
        { value: '10', text: '10k' },
        { value: '25', text: '25k' }
    ];
    public ddlFields: Object = { text: 'text', value: 'value' };

    public fields: Object = { text: 'name' };

    public onActionComplete() {
        this.liElement = document.getElementById('ui-list');
        if (Browser.isDevice) {
            this.liElement.classList.add('ui-mobile');
        }
        createSpinner({
            target: this.liElement
        });
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
    }

    public onActionBegin() {
        this.startTime = new Date();
    }

    public onChange(e: ChangeEventArgs) {
        showSpinner(this.liElement);
        this.startTime = new Date();
        this.listviewInstance.dataSource = this.dataSource['data' + e.value];
        this.listviewInstance.dataBind();
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
        hideSpinner(this.liElement);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='ui-control-section control-section'>
                    <div className='col-lg-8'>
                        <div className="content-wrapper" >
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
                                            <div style={{ paddingLeft: '10px', paddingTop: '0px' }}>
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
                <p>This sample demonstrates the <code>ListView</code> component with the virtual scrolling feature. Scroll the list content to experience the list items dynamic rendering and load more data into listview using dropdownlist.</p>
                </div>

                <div id="description">
                <p>UI virtualization is an optimization technique to avoid unnecessarily constructing and rendering objects for list items by loading only visible list items in a view port. This helps improve list view performance when loading a large number of items. The list items are updated dynamically while users scroll the list. The virtualization can be enabled by using <a href="https://ej2.syncfusion.com/react/documentation/list-view/api-listViewComponent.html#enablevirtualization">enablevirtualization</a> API in Listview.</p>
                </div>
            </div>
        )
    }
}
