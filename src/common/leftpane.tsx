import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Animation, Browser, extend, select } from '@syncfusion/ej2-base';
import { ListViewComponent, ListView, SelectEventArgs } from '@syncfusion/ej2-react-lists';
import { TreeView, TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { samplesList } from './sample-list';
import { toggleLeftPane, isLeftPaneOpen, sampleOverlay, applySdkFilter } from './index';
import { selectDefaultTab, initialize, isFinalize } from './component-content';

let isMobile: boolean;
let isTablet: boolean;
let isPc: boolean;
let sampleOrder: string[] = [];
let controlSampleData: any = {};

export interface MyWindow extends Window {
    sampleOrder: string[];
    apiList : any;
}

declare let window: MyWindow;


function viewSwitch(from: HTMLElement, to: HTMLElement, reverse?: boolean): void {
    let anim: Animation = new Animation({ duration: 500, timingFunction: 'ease' });
    let controlSamples: HTMLElement = select('#controlSamples') as HTMLElement;
    controlSamples.classList.add('control-samples-animate');
    from.style.overflowY = 'hidden';
    to.style.overflowY = 'hidden';
    to.classList.remove('sb-hide');
    anim.animate(from, {
        name: reverse ? 'SlideRightOut' : 'SlideLeftOut', end: (): void => {
            controlSamples.classList.remove('control-samples-animate');
            from.style.overflowY = '';
            to.style.overflowY = '';
            from.classList.add('sb-hide');

        }
    });
    anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
}

export function showHideControlTree(): void {
    if (!isFinalize) return; 
    let controlTree: HTMLElement = select('#controlTree') as HTMLElement;
    let controlList: HTMLElement = select('#controlSamples') as HTMLElement;
    let reverse: boolean = controlTree.classList.contains('sb-hide');
    reverse ? viewSwitch(controlList, controlTree, reverse) : viewSwitch(controlTree, controlList, reverse);
}

function updateGroupItemAttributes(): void {
    const groupItems: NodeListOf<Element> = document.querySelectorAll('#controlList .e-list-group-item.e-level-1');
    groupItems.forEach((groupItem: Element) => {
        let sibling: Element = groupItem.nextElementSibling;
        while (sibling && !sibling.classList.contains('e-list-group-item')) {
            if (!groupItem.hasAttribute('group-name')) {
                const groupName: string = sibling.getAttribute('group-name');
                if (groupName) {
                    groupItem.setAttribute('group-name', groupName);
                }
            }
            sibling.removeAttribute('group-name');
            sibling = sibling.nextElementSibling;
        }
    });
}

export function setSelectList(): void {
    const listItems: any = document.querySelectorAll('#controlList .e-list-item.e-level-1');
    for (const listItem of listItems) {
        listItem.tabIndex = 0;
    }
    updateGroupItemAttributes();
    let hash: string[] = location.hash.split('/');
    let list: ListView = (select('#controlList') as any).ej2_instances[0];
    let controlName: string = hash[2];
    if (controlName && controlName.startsWith('ai-') && ['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].indexOf(controlName) === -1) {
        controlName = 'ai-grid';
    }
    let control: Element = select('[control-name="' + controlName + '"]') || select('[control-name="grid"]');
    if (control) {
        let data: any = list.dataSource;
        let samples: any = controlSampleData[control.getAttribute('control-name')];
        if (JSON.stringify(data) !== JSON.stringify(samples)) {
            list.dataSource = samples;
        }
        let selectSample: Element = select('[data-path="' + '/' + hash.slice(2).join('/') + '"]', select('#controlList'));
        if (selectSample) {
            if (!select('#controlTree').classList.contains('sb-hide')) {
                showHideControlTree();
            }
            list.selectItem(selectSample);
            selectSample.scrollIntoView({block:"nearest"});
        }
        let treeControl: TreeView = (select('#controlTree') as any).ej2_instances[0];
        treeControl.selectedNodes = [control.getAttribute('data-uid')];
    } else {
        if (select('#controlList').classList.contains('sb-hide')) {
            showHideControlTree();            
        }
        list.selectItem(select('[data-path="/grid/overview"]'));
    }
    // Re-apply any active SDK filter after list updates
    reapplyActiveSdkFilter();
}

/**
 * Re-applies the currently active SDK filter (if any) to the freshly rendered list/tree.
 */
function reapplyActiveSdkFilter(): void {
    const activeItem: Element | null = document.querySelector('#sdklist li.active');
    if (activeItem) {
        const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
        if (sdkKey !== 'all') {
            applySdkFilter(sdkKey);
        }
    }
}

export class LeftPane extends React.Component<{}, {}> {

    /**
     * Data Source for TreeView and ListView
     */
    public controlSampleData: any = {};
    public samplesTreeList: any = this.getTreeviewList(this.getDataSource());
    /**
     * TreeView Configuration
     */
    public treeFields: Object = { dataSource: this.samplesTreeList, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url', sortOrder: 'order' }
    /**
     * ListView Configuration
     */
    public fields: Object = { id: 'id', text: 'name', groupBy: 'order', htmlAttributes: 'data' };
    public nodeTemplate: string = '<div><span class="tree-text">${name}</span>' +
    '${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">Updated</span>' +
    '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">${type}</span>${/if}${/if}</div>';
    public groupTemlate: string = '${if(items[0]["category"])}<div class="e-text-content">' +
    '<span class="e-list-text">${items[0].category}</span></div>${/if}';
    public template: string = '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text">${name}' +
    '</span>${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type}">Updated</span>' +
    '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type}">${type}</span>${/if}${/if}' +
    '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>';
    /**
     * Listview Control
     */
    public listControl: ListViewComponent;
    /**
     * TreeView Control
     */
    public treeControl: TreeViewComponent;

    componentDidMount(): void {
        select('#sb-left-back').addEventListener('click', showHideControlTree);
    }

    public rendereComplete(): void {
    }

    public getDataSource(): { [key: string]: Object; }[] {
        if (Browser.isDevice) {
            let tempData: any = extend([], samplesList);
            let tempLists: any = [];
            for (let temp of tempData) {
                if(temp.hideOnDevice == true || temp.hideOnDevice === 'true')
                {
                    continue;
                }
                let data: DataManager = new DataManager(temp.samples);
                temp.samples = data.executeLocal(new Query().where('hideOnDevice', 'notEqual', true));
                tempLists = tempLists.concat(temp);
            }
            return tempLists;
        }
        return samplesList;
    }
    /**
     * TreeView Data Source Function
     */
    public getTreeviewList(list: any[]): { [key: string]: Object }[] {
        let id: number = 1;
        let pid: number;
        let tempList: any[] = [];
        let category: string = '';
        let categories: Object[] = [];
        let order: any = {};
        categories = DataUtil.distinct(list, 'category');
        for (let j: number = 0; j < categories.length; j++) {
            tempList = tempList.concat({ id: id, name: categories[j], order: j, hasChild: true, expanded: true });
            pid = id;
            for (let k: number = 0; k < list.length; k++) {
                if (list[k].category === categories[j]) {
                    id += 1;
                    tempList = tempList.concat(
                        {
                            id: id,
                            pid: pid,
                            name: list[k].name,
                            type: list[k].type,
                            url: {
                                'data-path': '/' + list[k].samples[0].path,
                                'control-name': list[k].path,
                                'name': list[k].name
                            }
                        });
                    this.controlSampleData[list[k].path] = this.getSamples(list[k].samples, list[k].path);
                    controlSampleData = this.controlSampleData;
                }
            }
        }
        window.sampleOrder = sampleOrder;
        return tempList;
    }
    /**
     * ListView Data Source Function
     */
    private getSamples(samples: any, groupPath?: string): any {
        let tempSamples: any = [];
        let groupName: string = '';
        let sampleNameAttr: string ='';
        let isAISample: boolean = !!groupPath && groupPath.startsWith('ai-') && ['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].indexOf(groupPath) === -1;
        for (let i: number = 0; i < samples.length; i++) {
            tempSamples[i] = samples[i];
            groupName = tempSamples[i].path.split('/')[0];
            sampleNameAttr = samples[i].name.toLowerCase().replace(/ /g, '-');
            tempSamples[i].data = { 'sample-name': samples[i].name, 'data-path': '/' + samples[i].path };
            if (isAISample) {
                tempSamples[i].data['group-name'] = groupName;
                tempSamples[i].data['ai-sample-name'] = sampleNameAttr;
            }
            tempSamples[i].id = i.toString();
            sampleOrder.push(samples[i].path);
        }
        return tempSamples;
    }

    public controlListRefresh(ele: Element): void {
        let samples: any = this.controlSampleData[ele.getAttribute('control-name')];
        if (samples) {
            let listView: any = (select('#controlList') as any).ej2_instances[0];
            listView.dataSource = samples;
            showHideControlTree();
            // Re-apply SDK filter on the newly loaded sample list
            setTimeout(() => reapplyActiveSdkFilter(), 50);
        }
    }

    private controlSelect(arg: any): void {
        selectDefaultTab();
        let path: string = (arg.node || arg.item).getAttribute('data-path');
        let curHashCollection: string = '/' + location.hash.split('/').slice(2).join('/');

        // When the 'AI-Powered Samples' (ai-grid) TREE NODE is clicked while an SDK filter
        // is active, redirect to the first sample of the SDK's ai- control instead of
        // the default ai-grid/assistive-grid path.
        // arg.node is set only for TreeView clicks; arg.item is set for ListView clicks.
        // We must NOT redirect on list item selections (e.g. triggered by next/prev navigation).
        if (arg.node && path && path.startsWith('/ai-grid/')) {
            const activeItem: Element | null = document.querySelector('#sdklist li.active');
            if (activeItem) {
                const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
                // Map SDK keys to the first sample path of their ai- control.
                // All these AI samples live inside the shared 'ai-grid' tree node.
                // The concat order in sample-list is:
                //   ai-grid → ai-diagram → ai-combo-box → ai-tree-grid → ai-querybuilder
                //   → ai-image-editor → ai-pivot-table → ai-kanban → ai-schedule → ai-maps → ai-gantt
                const aiSdkFirstSample: { [key: string]: string } = {
                    grid:     '/ai-grid/assistive-grid',
                    chart:    '/ai-maps/weather-prediction',
                    schedule: '/ai-schedule/smart-event-window',
                    gantt:    '/ai-gantt/task-prioritize',
                    diagram:  '/ai-diagram/text-to-flowchart',
                    ui:       '/ai-combo-box/semantic-searching',
                };
                if (aiSdkFirstSample[sdkKey]) {
                    path = aiSdkFirstSample[sdkKey];
                }
            }
        }

        if (path) {
            this.controlListRefresh(arg.node || arg.item);
            if (path !== curHashCollection) {
                isMobile = window.matchMedia('(max-width:550px)').matches;
                isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
                isPc = window.matchMedia('(min-width:850px)').matches;
                sampleOverlay();
                let theme: string = location.hash.split('/')[1] || 'material';
                if ((arg.node || arg.item) && ((isMobile && !select('#left-sidebar').classList.contains('sb-hide')) ||
                    ((isTablet || (Browser.isDevice && isPc)) && isLeftPaneOpen()))) {
                    toggleLeftPane();
                }
                setTimeout(() => {
                    location.hash = '#/' + theme + path;
                    initialize();
                 }, 600);
            }
        }
    }

    render() {
        return (
            <div className='sb-control-navigation'>
                <TreeViewComponent id='controlTree' cssClass="sb-hide" nodeClicked={this.controlSelect = this.controlSelect.bind(this)}
                    className='e-view'
                    fields={this.treeFields}
                    nodeTemplate={this.nodeTemplate}
                    ref={t => this.treeControl = t}
                />
                <div id="controlSamples" className="e-view">
                    <div id="sb-left-back" className="back">
                        <div className="sb-icons sb-icon-Back"></div>
                        <div className='control-name'>All Controls</div>
                    </div>
                    <ListViewComponent id='controlList' select={this.controlSelect}
                        actionComplete={setSelectList}
                        className='e-view sb-control-list-top'
                        fields={this.fields}
                        dataSource={this.controlSampleData[location.hash.split('/')[2]] || this.controlSampleData.grid}
                        groupTemplate={this.groupTemlate}
                        template={this.template}
                        ref={l => this.listControl = l}
                    />
                </div>
            </div>)
    }
}
