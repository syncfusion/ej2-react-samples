/**
 * ListView CallHistory Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TabComponent, SelectEventArgs, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { callHistoryData } from './listData';
import './call-history.css';

export class CallHistory extends SampleBase<{}, {}> {

    //Map the appropriate columns to fields property
    public fields: Object = { text: 'text', groupBy: 'category' };

    public styleNone = { display: "none" };

    public listTemplate(data: any): JSX.Element {
        return (

            <div className="e-list-wrapper e-list-avatar e-list-multi-line">
                <span className="e-avatar e-icon"></span>
                <span className="e-list-item-header">{data.text}</span> <span className={`${data.type} e-list-content`}>{data.group}, {data.time}</span>
            </div>
        );
    }

    public allInstance: ListViewComponent;
    public receivedInstance: ListViewComponent;
    public missedInstance: ListViewComponent;
    public tab: TabComponent;
    public listObjects: any = [];
    public headerText: any = [
        { "text": "All" },
        { "text": "Received" },
        { "text": "Missed" }];
    public type: string[] = ['', 'received', 'missed'];

    filterData(dataSource: any, value: any): any {
        let newData: any = [];
        dataSource.filter((data: any) => {
            if ((data.id).indexOf(value) !== -1) {
                newData.push(data);
            }
        });
        return newData;
    }

    onCreated() {
        if (!Browser.isDevice) {
            document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
        } else {
            document.getElementsByClassName('tabContainer')[0].classList.add('e-visbile-layer');
        }
    }

    setlectedHanlder(args: SelectEventArgs) {
        let element01: any = document.getElementById('all');
        let element02: any = document.getElementById('received');
        let element03: any = document.getElementById('missed');
        if (element01.ej2_instances !== undefined) {
            this.listObjects = [element01.ej2_instances[0], element02.ej2_instances[0], element03.ej2_instances[0]];
            let newData: any;
            newData = this.filterData(callHistoryData, this.type[args.selectedIndex]);
            this.listObjects[args.selectedIndex].dataSource = newData;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='slider-call-history col-lg-12 control-section'>
                    <div className="layoutWrapper">
                        <div className="speaker">
                            <div className="camera"></div>
                        </div>
                        <div className="layout">
                            <div id="list-container">
                                <div className="tabContainer">
                                    <TabComponent id="tab" ref={tab => this.tab = tab} selected={this.setlectedHanlder.bind(this)} created={this.onCreated}>
                                        <TabItemsDirective>
                                            <TabItemDirective header={this.headerText[0]} content={"#all"} />
                                            <TabItemDirective header={this.headerText[1]} content={"#received"} />
                                            <TabItemDirective header={this.headerText[2]} content={"#missed"} />
                                        </TabItemsDirective>
                                    </TabComponent>
                                </div>
                                <ListViewComponent id="all" dataSource={callHistoryData} fields={this.fields} style={this.styleNone} cssClass='e-list-template'
                                    template={this.listTemplate as any} ref={(listview) => { this.allInstance = listview }} ></ListViewComponent>
                                <ListViewComponent id="received" dataSource={callHistoryData} fields={this.fields} style={this.styleNone} cssClass='e-list-template'
                                    template={this.listTemplate as any} ref={(listview) => { this.receivedInstance = listview }}></ListViewComponent>
                                <ListViewComponent id="missed" dataSource={callHistoryData} fields={this.fields} style={this.styleNone} cssClass='e-list-template'
                                    template={this.listTemplate as any} ref={(listview) => { this.missedInstance = listview }}></ListViewComponent>
                            </div>
                        </div>
                        <div className="outerButton"> </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the call history application using listview. Click on the checklist to filter the data in contacts
        list.</p>
                </div>

                <div id="description" className="descriptionLayout">
                    <p>This sample filters out the data from listview based on the data selected from the checklist. Here, listview utilizes the
            <code>template</code>
                        <code>showIcon</code> properties to repesent the call history application. The Tab component is used in this sample for navigation purposes.
        </p>
                </div>
            </div>
        )
    }
}