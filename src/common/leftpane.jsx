import * as React from 'react';
import { Animation, Browser, extend, select } from '@syncfusion/ej2-base';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { samplesList } from './sample-list';
import { toggleLeftPane, isLeftPaneOpen, sampleOverlay } from './index';
import { selectDefaultTab } from './component-content';
let isMobile;
let isTablet;
let isPc;
let sampleOrder = [];
let controlSampleData = {};
function viewSwitch(from, to, reverse) {
    let anim = new Animation({ duration: 500, timingFunction: 'ease' });
    let controlSamples = select('#controlSamples');
    controlSamples.classList.add('control-samples-animate');
    from.style.overflowY = 'hidden';
    to.style.overflowY = 'hidden';
    to.classList.remove('sb-hide');
    anim.animate(from, {
        name: reverse ? 'SlideRightOut' : 'SlideLeftOut', end: () => {
            controlSamples.classList.remove('control-samples-animate');
            from.style.overflowY = '';
            to.style.overflowY = '';
            from.classList.add('sb-hide');
        }
    });
    anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
}
function showHideControlTree() {
    let controlTree = select('#controlTree');
    let controlList = select('#controlSamples');
    let reverse = controlTree.classList.contains('sb-hide');
    reverse ? viewSwitch(controlList, controlTree, reverse) : viewSwitch(controlTree, controlList, reverse);
}
export function setSelectList() {
    let hash = location.hash.split('/');
    let list = select('#controlList').ej2_instances[0];
    let control = select('[control-name="' + hash[2] + '"]') || select('[control-name="grid"]');
    if (control) {
        let data = list.dataSource;
        let samples = controlSampleData[control.getAttribute('control-name')];
        if (JSON.stringify(data) !== JSON.stringify(samples)) {
            list.dataSource = samples;
        }
        let selectSample = select('[data-path="' + '/' + hash.slice(2).join('/') + '"]', select('#controlList'));
        if (selectSample) {
            if (!select('#controlTree').classList.contains('sb-hide')) {
                showHideControlTree();
            }
            list.selectItem(selectSample);
        }
    }
    else {
        if (select('#controlList').classList.contains('sb-hide')) {
            showHideControlTree();
        }
        list.selectItem(select('[data-path="/grid/overview"]'));
    }
}
export class LeftPane extends React.Component {
    constructor() {
        super(...arguments);
        /**
         * Data Source for TreeView and ListView
         */
        this.controlSampleData = {};
        this.samplesTreeList = this.getTreeviewList(this.getDataSource());
        /**
         * TreeView Configuration
         */
        this.treeFields = { dataSource: this.samplesTreeList, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url', sortOrder: 'order' };
        /**
         * ListView Configuration
         */
        this.fields = { id: 'id', text: 'name', groupBy: 'order', htmlAttributes: 'data' };
        this.nodeTemplate = '<div><span class="tree-text">${name}</span>' +
            '${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">Updated</span>' +
            '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">${type}</span>${/if}${/if}</div>';
        this.groupTemlate = '${if(items[0]["category"])}<div class="e-text-content">' +
            '<span class="e-list-text">${items[0].category}</span></div>${/if}';
        this.template = '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text" role="listitem">${name}' +
            '</span>${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type}">Updated</span>' +
            '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type}">${type}</span>${/if}${/if}' +
            '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>';
    }
    componentWillMount() { }
    componentDidMount() {
        select('#sb-left-back').addEventListener('click', showHideControlTree);
    }
    rendereComplete() {
    }
    getDataSource() {
        if (Browser.isDevice) {
            let tempData = extend([], samplesList);
            let tempLists = [];
            for (let temp of tempData) {
                if (temp.hideOnDevice == true) {
                    continue;
                }
                let data = new DataManager(temp.samples);
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
    getTreeviewList(list) {
        let id = 1;
        let pid;
        let tempList = [];
        let category = '';
        let categories = [];
        let order = {};
        categories = DataUtil.distinct(list, 'category');
        for (let j = 0; j < categories.length; j++) {
            tempList = tempList.concat({ id: id, name: categories[j], order: j, hasChild: true, expanded: true });
            pid = id;
            for (let k = 0; k < list.length; k++) {
                if (list[k].category === categories[j]) {
                    id += 1;
                    tempList = tempList.concat({
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
                    this.controlSampleData[list[k].path] = this.getSamples(list[k].samples);
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
    getSamples(samples) {
        let tempSamples = [];
        for (let i = 0; i < samples.length; i++) {
            tempSamples[i] = samples[i];
            tempSamples[i].data = { 'sample-name': samples[i].name, 'data-path': '/' + samples[i].path };
            tempSamples[i].id = i.toString();
            sampleOrder.push(samples[i].path);
        }
        return tempSamples;
    }
    controlListRefresh(ele) {
        let samples = this.controlSampleData[ele.getAttribute('control-name')];
        if (samples) {
            let listView = select('#controlList').ej2_instances[0];
            listView.dataSource = samples;
            showHideControlTree();
        }
    }
    controlSelect(arg) {
        selectDefaultTab();
        let path = (arg.node || arg.item).getAttribute('data-path');
        let curHashCollection = '/' + location.hash.split('/').slice(2).join('/');
        if (path) {
            this.controlListRefresh(arg.node || arg.item);
            if (path !== curHashCollection) {
                isMobile = window.matchMedia('(max-width:550px)').matches;
                isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
                isPc = window.matchMedia('(min-width:850px)').matches;
                sampleOverlay();
                let theme = location.hash.split('/')[1] || 'material';
                if (arg.item && ((isMobile && !select('#left-sidebar').classList.contains('sb-hide')) ||
                    ((isTablet || (Browser.isDevice && isPc)) && isLeftPaneOpen()))) {
                    toggleLeftPane();
                }
                setTimeout(() => { location.hash = '#/' + theme + path; }, 600);
            }
        }
    }
    render() {
        return (<div className='sb-control-navigation'>
                <TreeViewComponent id='controlTree' cssClass="sb-hide" nodeClicked={this.controlSelect = this.controlSelect.bind(this)} className='e-view' fields={this.treeFields} nodeTemplate={this.nodeTemplate} ref={t => this.treeControl = t}/>
                <div id="controlSamples" className="e-view">
                    <div id="sb-left-back" className="back">
                        <div className="sb-icons sb-icon-Back"></div>
                        <div className='control-name'>All Controls</div>
                    </div>
                    <ListViewComponent id='controlList' select={this.controlSelect} actionComplete={setSelectList} className='e-view sb-control-list-top' fields={this.fields} dataSource={this.controlSampleData[location.hash.split('/')[2]] || this.controlSampleData.grid} groupTemplate={this.groupTemlate} template={this.template} ref={l => this.listControl = l}/>
                </div>
            </div>);
    }
}
