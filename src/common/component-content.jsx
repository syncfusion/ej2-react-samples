import * as React from 'react';
import { routes, category } from './all-routes';
import { Ajax, Browser, createElement, detach, select } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { Tooltip } from '@syncfusion/ej2-react-popups';
import { TabComponent } from '@syncfusion/ej2-react-navigations';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { viewMobilePropPane, selectedTheme, sampleOverlay, removeOverlay } from './index';
import * as samplesJSON from './all-routes';
import * as hljs from './lib/highlightjs';
let samLength;
// Regex for hidden code removal
let hash;
let catRegex = /(-| )/g;
let propRegex = /-3/;
let controlName;
let sampleName;
let sourceTabItems = [];
let categoryName;
let apiGrid;
let propBorder = createElement('div', { className: 'sb-property-border' });
export let sampleNameElement = select('#component-name>.sb-sample-text');
let rightPane = select('.sb-right-pane');
export let sourceTab;
export let sourceTab1;
export let srcTab;
let mobilePropPane = select('.sb-mobile-prop-pane');
let isMobile;
/**
 * Prevent Tab Swipe Function
 */
function preventTabSwipe(e) {
    if (e.isSwiped) {
        e.cancel = true;
    }
}
/**
 * Default Source Tab Selection
 */
export function selectDefaultTab() {
    if (sourceTab) {
        sourceTab.selectedItem = 0;
    }
    if (sourceTab1) {
        sourceTab1.selectedItem = 0;
    }
}
window.apiList = samplesJSON.apiList;
/**
 * Description Rendering
 */
function renderDescription() {
    let header;
    let description = select('#description', select('#control-content'));
    let descElement = select('.description-section');
    let iDescription = select('#description', descElement);
    if (iDescription) {
        detach(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}
function changeTab(args) {
    if (args.selectedIndex === 1) {
        srcTab.selectedItem = 0;
        srcTab.items = sourceTabItems;
        srcTab.refresh();
        rendercopycode();
        dynamicTabCreation(srcTab);
    }
}
function rendercopycode() {
    let ele = createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    let copiedTooltip = new Tooltip({ content: 'Copied to clipboard', position: 'BottomCenter', opensOn: 'Click', closeDelay: 500 }, '.copy-tooltip');
    copiedTooltip.appendTo(ele);
    select('.copycode').addEventListener('click', copyCode);
}
function dynamicTab(e) {
    let blockEle = select('#sb-source-tab > .e-content > #e-content' + this.tabId + '_' + e.selectedIndex);
    let codeEle = blockEle.children[0];
    codeEle.innerHTML = srcTab.items[e.selectedIndex].data;
    codeEle.innerHTML = codeEle.innerHTML.replace(reg, '');
    highlightCode(codeEle);
}
function dynamicTabCreation(obj) {
    let blockEle = obj.element.querySelector('#e-content' + obj.tabId + '_' + obj.selectedItem).children[0];
    blockEle.innerHTML = obj.items[obj.selectedItem].data;
    blockEle.innerHTML = blockEle.innerHTML.replace(reg, '');
    highlightCode(blockEle);
}
function highlightCode(codeEle) {
    codeEle.classList.add("sb-src-code");
    hljs.highlightBlock(codeEle);
}
function renderActionDescription() {
    let aDescription = select('#action-description', select('#control-content'));
    let aDescElem = select('.sb-action-description');
    if (aDescription) {
        aDescElem.innerHTML = '';
        aDescElem.appendChild(aDescription);
        aDescElem.style.display = '';
    }
    else if (aDescElem) {
        aDescElem.style.display = 'none';
    }
}
function getStringWithOutDescription(code, descRegex) {
    var lines = code.split('\n');
    var desStartLine = null;
    var desEndLine = null;
    var desInsideDivCnt = 0;
    for (var i = 0; i < lines.length; i++) {
        var curLine = lines[i];
        if (desStartLine) {
            if (/<div/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt + 1;
            }
            if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt - 1;
            }
            else if (!desEndLine && /<\/div>/g.test(curLine)) {
                desEndLine = i + 1;
            }
        }
        if (descRegex.test(curLine)) {
            desStartLine = i;
        }
    }
    if (desEndLine && desStartLine) {
        lines.splice(desStartLine, desEndLine - desStartLine);
    }
    return lines.join('\n');
}
function sourceFileList(node) {
    for (let samples of node.curViewDS) {
        if (samples.path == location.hash.split('/').slice(2).join('/')) {
            return samples.sourceFiles;
        }
    }
}
function generatepath(path) {
    let splitPath = path.split('/')[1];
    let tsx = [{ path: `src/${path}.tsx`, displayName: `${splitPath}.tsx` }, { path: `src/${path}.jsx`, displayName: `${splitPath}.jsx` }];
    return tsx;
}
function renderSourceTabContent() {
    let path = hash.slice(2).join('/');
    let sourcePromise = [];
    let sObj = [];
    let sampleListFile = select('#controlList').ej2_instances[0];
    let sourceFiles = sourceFileList(sampleListFile) || generatepath(path);
    for (let sourceFile of sourceFiles) {
        sourcePromise.push((new Ajax(sourceFile.path, 'GET', false)).send());
        sObj.push({
            header: { text: sourceFile.displayName },
            data: '',
            content: sourceFile.displayName
        });
    }
    Promise.all(sourcePromise).then((results) => {
        results.forEach((value, index) => {
            let sampleContent = value.toString();
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")action-description/g);
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")description/g);
            sampleContent = sampleContent.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            sObj[index].data = sampleContent;
        });
        sourceTabItems = sObj;
    });
    let plunk = new Ajax('src/' + path + '-stack.json', 'GET', false);
    let p3 = plunk.send();
    p3.then((result) => {
        if (select('#open-plnkr')) {
            select('#open-plnkr').disabled = false;
        }
        plunker(result);
    });
    let openNew = select('#openNew');
    if (openNew) {
        openNew.href = location.href.split('#')[0] + path + '/';
    }
    if (Browser.isDevice) {
        if (window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/')) == -1) {
            let toastObj = new ToastComponent({
                position: {
                    X: 'Right'
                }
            });
            let hideLocation = location.hash.split('/')[2];
            toastObj.appendTo('#sb-home');
            setTimeout(() => {
                toastObj.show({
                    content: `${hideLocation} component not supported in mobile device`
                });
            }, 200);
            location.hash = "#/material/grid/overview";
        }
    }
}
function renderSampleHeader() {
    /**
     * Sammple Header Name
     */
    let controlElem = select('[control-name="' + hash[2].toLowerCase() + '"]');
    controlName = controlElem ? controlElem.getAttribute('name') : toInitiaUpper(hash[2]);
    sampleNameElement.innerHTML = controlName;
    /**
     * Bread Crumb
     */
    let curObj = category[hash[2]][hash[3]];
    categoryName = toInitiaUpper(curObj.category);
    sampleName = curObj.name;
    let categoryFlag = new RegExp(categoryName.replace(catRegex, ''), 'i').test(controlName.replace(catRegex, ''));
    let breadCrumbComponent = document.querySelector('.sb-bread-crumb-text>.category-text');
    let breadCrumSeperator = select('.category-seperator');
    let breadCrumbSubCategory = select('.sb-bread-crumb-text>.component');
    let breadCrumbSample = select('.sb-bread-crumb-text>.crumb-sample');
    breadCrumbComponent.innerHTML = controlName;
    if (!categoryFlag) {
        breadCrumbSubCategory.innerHTML = categoryName;
        breadCrumbSubCategory.style.display = '';
        breadCrumSeperator.style.display = '';
    }
    else {
        breadCrumbSubCategory.style.display = 'none';
        breadCrumSeperator.style.display = 'none';
    }
    breadCrumbSample.innerHTML = sampleName;
    let title = document.querySelector('title');
    title.innerHTML = controlName + ' · ' + sampleName + ' · Syncfusion React UI Components';
}
function toInitiaUpper(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
function plunker(results) {
    let plnkr = JSON.parse(results);
    let prevForm = select('#stack-form');
    if (prevForm) {
        detach(prevForm);
    }
    let form = createElement('form');
    let res = (location.href.indexOf('ej2.syncfusion.com') !== -1 ? 'https:' : 'http:') + '//stackblitz.com/run';
    form.setAttribute('action', res);
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'stack-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    let plunks = Object.keys(plnkr);
    for (let x = 0; x < plunks.length; x++) {
        createStackInput((plunks[x] === 'dependencies' ? 'project[dependencies]' : 'project[files][' + plunks[x] + ']'), plnkr[plunks[x]], form);
    }
    createStackInput('project[template]', 'create-react-app', form);
    createStackInput('project[description]', 'Essential JS 2 Sample', form);
    createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
}
function createStackInput(name, value, form) {
    let input = createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value.replace(/{{theme}}/g, selectedTheme).replace(/{{ripple}}/, (selectedTheme === 'material') ? 'import { enableRipple } from \'@syncfusion/ej2-base\';\nenableRipple(true);\n' : ''));
    input.setAttribute('name', name);
    form.appendChild(input);
}
function onNextButtonClick() {
    selectDefaultTab();
    hash = location.hash.split('/');
    let currentIndex = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    let nextList = window.sampleOrder[currentIndex + 1];
    if (currentIndex !== -1) {
        sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + nextList;
    }
}
function onPrevButtonClick() {
    selectDefaultTab();
    hash = location.hash.split('/');
    let currentIndex = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    let prevList = window.sampleOrder[currentIndex - 1];
    if (currentIndex !== -1) {
        sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + prevList;
    }
}
/**
 * Sample Navigation
 */
function toggleButtonState(id, state) {
    let ele = document.getElementById(id);
    if (ele) {
        let mobileEle = document.getElementById('mobile-' + id);
        ele.disabled = state;
        mobileEle.disabled = state;
        if (state) {
            mobileEle.classList.add('e-disabled');
            ele.classList.add('e-disabled');
        }
        else {
            mobileEle.classList.remove('e-disabled');
            ele.classList.remove('e-disabled');
        }
    }
}
export function setNavButtonState() {
    let curIndex = window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/'));
    samLength = window.sampleOrder.length - 1;
    if (curIndex === samLength) {
        toggleButtonState('next-sample', true);
    }
    else {
        toggleButtonState('next-sample', false);
    }
    if (curIndex === 0) {
        toggleButtonState('prev-sample', true);
    }
    else {
        toggleButtonState('prev-sample', false);
    }
}
/**
 * copy clipboard function
 */
function copyCode() {
    let copyElem = select('#sb-source-tab .e-item.e-active');
    let textArea = createElement('textArea');
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    detach(textArea);
    select('.copy-tooltip').ej2_instances[0].close();
}
function processDeviceDependables() {
    if (Browser.isDevice) {
        select('.sb-desktop-setting').classList.add('sb-hide');
    }
    else {
        select('.sb-desktop-setting').classList.remove('sb-hide');
    }
}
export function intialLoadScrollTop() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    isMobile ? rightPane.scrollTop = 74 : rightPane.scrollTop = 0;
}
export function renderDescriptions() {
    renderDescription();
    renderActionDescription();
}
export function onComponentLoad() {
    hash = location.hash.split('/');
    renderSourceTabContent();
    renderSampleHeader();
    selectDefaultTab();
    let propPanel = select('#control-content .property-section');
    if (propPanel) {
        if (propRegex.test(propPanel.className)) {
            propBorder.classList.add('sb-prop-md-3');
            propBorder.classList.remove('sb-prop-md-4');
        }
        else {
            propBorder.classList.add('sb-prop-md-4');
            propBorder.classList.remove('sb-prop-md-3');
        }
        propBorder.classList.remove('sb-hide');
    }
    else {
        propBorder.classList.add('sb-hide');
    }
    let mobileSetting = select('.sb-mobile-setting');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile && mobileSetting) {
        if (propPanel) {
            mobileSetting.classList.remove('sb-hide');
            if (mobilePropPane.firstChild) {
                detach(mobilePropPane.firstChild);
            }
            mobilePropPane.appendChild(propPanel);
        }
        else {
            select('.sb-mobile-setting').classList.add('sb-hide');
        }
    }
}
export function checkApiTableDataSource() {
    if (!select('#content-tab').ej2_instances) {
        return;
    }
    let hash = location.hash.split('/');
    let data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length) {
        select('#content-tab').ej2_instances[0].hideTab(2);
        apiGrid.dataSource = [];
    }
    else {
        select('#content-tab').ej2_instances[0].hideTab(2, false);
        apiGrid.dataSource = data;
    }
}
export class Content extends React.Component {
    componentDidMount() {
        /**
         * Default Sample Redirection
         */
        let sampleOrder = window.sampleOrder;
        let hash = location.hash.split('/').slice(1);
        if (sampleOrder.indexOf(hash.slice(1).join('/')) === -1) {
            let path;
            for (let sample of sampleOrder) {
                if (sample.indexOf(hash[1] + '/') !== -1) {
                    path = hash[0] + '/' + sample;
                    break;
                }
            }
            location.hash = path ? path : '#/material/grid/overview';
        }
        select('#mobile-next-sample').addEventListener('click', onNextButtonClick);
        select('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
        /**
         * Property Panel Border
         */
        select('.sb-sample-content-area').firstChild.appendChild(propBorder);
        /**
         * Navigation Button Click events
         */
    }
    tabRendered() {
        let hsplitter = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
        let openNewTemplate = '<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank">' +
            '<div class="sb-icons sb-icon-Popout"></div></a></div>';
        let sampleNavigation = '<div class="sb-custom-item sample-navigation"><button id="prev-sample" class="sb-navigation-prev">' +
            '<span class="sb-icons sb-icon-Previous"></span></button><button  id="next-sample" class="sb-navigation-next">' +
            '<span class="sb-icons sb-icon-Next"></span></button></div>';
        let plnrTemplate = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
        let contentToolbarTemplate = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter + '</div>' + sampleNavigation +
            '<div class="sb-icons sb-mobile-setting sb-hide"></div>';
        this.tabContentToolbar = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        select('#sb-content-header').appendChild(this.tabContentToolbar);
        /**
         * code for copyToolTip
         */
        let openNew = new Tooltip({
            content: 'Open in New Window'
        });
        openNew.appendTo('.sb-open-new-wrapper');
        let previous = new Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');
        let next = new Tooltip({
            content: 'Next Sample'
        });
        select('#right-pane').addEventListener('scroll', function (event) {
            next.close();
            openNew.close();
            previous.close();
        });
        next.appendTo('#next-sample');
        /**
      * plnkr trigger
      */
        select('#open-plnkr').addEventListener('click', () => {
            let plnkrForm = select('#stack-form');
            if (plnkrForm) {
                plnkrForm.submit();
            }
        });
        select('#next-sample').addEventListener('click', onNextButtonClick);
        select('#prev-sample').addEventListener('click', onPrevButtonClick);
        select('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
        processDeviceDependables();
        setNavButtonState();
        onComponentLoad();
        intialLoadScrollTop();
        removeOverlay();
        checkApiTableDataSource();
    }
    componentWillReceiveProps() {
        /**
         * Sample Control Name change
         */
        sampleNameElement.innerHTML = select('[control-name="' + location.hash.split('/')[2].toLowerCase() + '"]').getAttribute('name');
        renderDescription();
        renderActionDescription();
    }
    render() {
        return (<TabComponent id='content-tab' className='sb-content-tab' selecting={preventTabSwipe} selected={changeTab} ref={t => sourceTab = t} created={this.tabRendered}>
                <div id="sb-content" className='sb-content-section'>
                    <div id='sb-content-header' className="e-tab-header sb-content-tab-header">
                        <div>
                            <span className="sb-icons sb-icon-Demo"></span> <span className="sb-tab-title"> DEMO </span></div>
                        <div>
                            <span className="sb-icons sb-icon-Code"></span><span className="sb-tab-title"> SOURCE </span></div>
                        <div>
                            <span className="sb-icons sb-icon-API"></span><span className="sb-tab-title"> API </span></div>
                    </div>
                    <div className="e-content sb-sample-content-area">
                        <div>
                            <div className='sb-demo-section'>
                                <div className="control-fluid">
                                    <div className="container-fluid">
                                        <div id="control-content">{routes}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='sb-source-section'>
                                <TabComponent id='sb-source-tab' className="sb-source-code-section" selected={dynamicTab} ref={t => srcTab = t} headerPlacement="Bottom" selecting={preventTabSwipe}>
                                </TabComponent>
                            </div>
                        </div>
                        <div>
                            <GridComponent id='api-grid' dataSource={[]} ref={l => apiGrid = l}>
                                <ColumnsDirective>
                                    <ColumnDirective field='name' headerText='name' template='#template' width='180' textAlign='Center'></ColumnDirective>
                                    <ColumnDirective field='type' headerText='Type' width='180'></ColumnDirective>
                                    <ColumnDirective field='description' headerText='Description' template='#template-description' width='200'/>
                                </ColumnsDirective>
                            </GridComponent>
                        </div>

                    </div>
                </div>
            </TabComponent>);
    }
}
