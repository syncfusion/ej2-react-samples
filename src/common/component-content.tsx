import * as React from 'react';
import { routes, category } from './all-routes';
import { Ajax, Browser, createElement, detach, select } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Toolbar, Page, Inject } from '@syncfusion/ej2-react-grids';
import { Tab } from '@syncfusion/ej2-react-navigations'
import { Tooltip } from '@syncfusion/ej2-react-popups'
import { ListView } from '@syncfusion/ej2-react-lists';
import { TabComponent } from '@syncfusion/ej2-react-navigations';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { samplesList } from './sample-list';
import { viewMobilePropPane, selectedTheme, sampleOverlay, removeOverlay } from './index';
import * as samplesJSON from './all-routes';
import { MyWindow } from './leftpane';
import { setSelectList } from './leftpane';

declare let CodeMirror: any;
declare let window: MyWindow;
let samLength: number;
// Regex for hidden code removal
let reg: RegExp = /.*custom code start([\S\s]*?)custom code end.*/g;
let hash: string[];
let catRegex: RegExp = /(-| )/g;
let propRegex: RegExp = /-3/;
let controlName: string;
let sampleName: string;
let sourceTabItems: object[] = [];
let fnSourceTabItems: object[] = [];
let categoryName: string;
let apiGrid: any;
let propBorder: HTMLElement = createElement('div', { className: 'sb-property-border' });
export let sampleNameElement: Element = select('#component-name>.sb-sample-text');

let rightPane: Element = select('.sb-right-pane');
export let sourceTab: Tab;
export let sourceTab1: Tab;
export let srcTab: Tab;

let mobilePropPane: Element = select('.sb-mobile-prop-pane');

let isMobile: boolean;
let isFunctional: boolean = false;
let hasFunctional: boolean = false;
let isHookCode: boolean = true;
export let isRendered: boolean = false;
export function initialize(): void {
    isRendered = false
}
/**
 * Prevent Tab Swipe Function
 */
function preventTabSwipe(e: any): void {
    if (e.isSwiped) {
        e.cancel = true;
    }
}

/**
 * Default Source Tab Selection
 */
export function selectDefaultTab(): void {
    if (sourceTab) {
        sourceTab.selectedItem = 0;
    }
    if(sourceTab1){
        sourceTab1.selectedItem = 0;
    }
}
window.apiList = (samplesJSON as any).apiList
/**
 * Description Rendering
 */
function renderDescription(): void {
    let header: HTMLElement;
    let description: HTMLElement = select('#description', select('#control-content')) as HTMLElement;
    let descElement: HTMLElement = select('.description-section') as HTMLElement;
    let iDescription: Element = select('#description', descElement);
    if (iDescription) {
        detach(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}

function changeTab(args: any): void {
    if (args.selectedIndex === 1) {
        srcTab.selectedItem = 0;
        srcTab.items = isFunctional ? fnSourceTabItems : sourceTabItems;
        renderHooks('.sb-source-section', true);
        srcTab.refresh();
        renderHooks('#sb-source-tab > .e-tab-header');
        rendercopycode()
        dynamicTabCreation(srcTab);
    }
    if (args.selectedItem && args.selectedItem.innerText === 'DEMO') {
        let demoSection = document.getElementsByClassName('sb-demo-section')[0];
        if (demoSection) {
            let elementList = demoSection.getElementsByClassName('e-control e-lib');
            for (let i = 0; i < elementList.length; i++) {
                let instance = (elementList[i] as any).ej2_instances;
                if (instance && instance[0] && typeof instance[0].refresh === 'function') {
                    instance[0].refresh();
                }
                if (instance && instance[0] && instance[0].getModuleName() !== 'DashboardLayout')
                    break;
            }
        }
    }
}

export function showHooks(val: boolean): void {
    hasFunctional = val;
    isFunctional = val ? isHookCode : false;
    isRendered = true;
    (document.querySelector(isHookCode ? '#hook' : '#class') as HTMLInputElement).checked = true;
    select('#fn-btn').style.display = val ? "" : "none";
}

function renderHooks(selector: string, insert?: boolean): void {
    let target: HTMLElement = select(selector) as HTMLElement;
    let ele: HTMLElement = select('#fn-btn') as HTMLElement;
    if (insert) {
        target.insertBefore(ele, target.children[0]);
    } else {
        if (!isMobile) {
            target.appendChild(ele);
            ele.classList.remove("sb-mobile");
        } else {            
            ele.classList.add("sb-mobile");
        }
    }
}

function onHooksChange(): void {
    let val: string = (document.querySelector('input[name="hooks"]:checked') as HTMLInputElement).value;
    isFunctional = val == "hooks" ? true : false;
    isHookCode = isFunctional;
    let sbTabOverlay: any = select('.sb-tab-overlay');
    sbTabOverlay.classList.remove('sb-hide');
    srcTab.items = isFunctional ? fnSourceTabItems : sourceTabItems;
    renderHooks('.sb-source-section', true);
    srcTab.dataBind()
    renderHooks('#sb-source-tab > .e-tab-header');
    updatePlunker();
}

function rendercopycode(): void {
    let ele: HTMLElement = createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    let copiedTooltip: Tooltip = new Tooltip(
        { content: 'Copied to clipboard', position: 'BottomCenter', opensOn: 'Click', closeDelay: 500 }, '.copy-tooltip');
    copiedTooltip.appendTo(ele);
    select('.copycode').addEventListener('click', copyCode);
}

function dynamicTab(e: any): void {
    let blockEle: HTMLElement = select('#sb-source-tab > .e-content > #e-content'+this.tabId+'_' + e.selectedIndex) as HTMLElement;
    let codeEle: any = blockEle.children[0];
    let sourceFile: any = srcTab.items[e.selectedIndex];
    codeEle.innerHTML = sourceFile.data;
    codeEle.innerHTML = codeEle.innerHTML.replace(reg,'');
    highlightCode(codeEle, sourceFile.properties.content.split('.')[1]);
    setTimeout(() => {
        let sbTabOverlay: any = select('.sb-tab-overlay');
        sbTabOverlay.classList.add('sb-hide');
    }, 300);
}

function dynamicTabCreation(obj: any): void {
    let blockEle: Element = obj.element.querySelector('#e-content'+obj.tabId+'_' + obj.selectedItem).children[0];
    let sourceFile: any = obj.items[obj.selectedItem];
    blockEle.innerHTML = sourceFile.data;
    blockEle.innerHTML = blockEle.innerHTML.replace(reg,'');
    highlightCode(blockEle, sourceFile.properties.content.split('.')[1]);
}

function highlightCode(codeEle: Element, fileType: string): void {
    const types: Object = {
        'tsx': 'text/typescript-jsx',
        'jsx': 'text/jsx',
        'css': 'text/css',
        'js': 'javascript',
        'json': 'application/json'
    }
    const parentEle: ParentNode = codeEle.parentNode;
    if (!parentEle.querySelector('.sb-src-code')) {
        const textELe: HTMLTextAreaElement = document.createElement('textarea');
        textELe.classList.add("sb-src-code");
        textELe.innerHTML = codeEle.innerHTML;
        parentEle.replaceChild(textELe, codeEle);
        CodeMirror.fromTextArea(document.querySelector(`#${(parentEle as HTMLElement).id} .sb-src-code`), {
            mode: `${types[fileType]}`,
            readOnly: 'nocursor',
            theme: `${selectedTheme.includes('-dark') || selectedTheme === 'highcontrast' ? 'mbo' : 'default'}`
        });
    }
  }

function renderActionDescription(): void {
    let aDescription: HTMLElement = select('#action-description', select('#control-content')) as HTMLElement;
    let aDescElem: HTMLElement = select('.sb-action-description') as HTMLElement;
    if (aDescription) {
        aDescElem.innerHTML = '';
        aDescElem.appendChild(aDescription);
        aDescElem.style.display = '';
    } else if (aDescElem) {
        aDescElem.style.display = 'none';
    }
}

function getStringWithOutDescription(code: string, descRegex: RegExp) {
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
            } else if (!desEndLine && /<\/div>/g.test(curLine)) {
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
function trimUseEffect(code: string, regEx: RegExp) {
    let lines = code.split('\n');
    let startLine = null;
    let endLine = null;
    for (var i = 0; i < lines.length; i++) {
        var curLine = lines[i];
        if (regEx.test(curLine)) {
            startLine = i;
        }
        if (startLine) {
            if (!endLine && /}, \[/g.test(curLine)) {
                endLine = i + 1;
                break;
            }
        }
    }
    if (endLine && startLine) {
        lines.splice(startLine, endLine - startLine);
    }
    return lines.join('\n');
}
/**
 * It trims the imported modules from the user view but they are remains on the source.
 * @param source - Specifies the source code that need to be trimmed.
 * @param curModules - Specifies the module name to be remove.
 * @returns - The remaining line after triming the module.
 */
function trimImportModules(source: string, curModule: string): string {
    let allLines = source.split('\n');
    let reqLine = null;
    for (let i = 0; i < allLines.length; i++) {
        let line = allLines[i];
        if (line.includes(curModule)) {
            reqLine = i;
            break;
        }
    }
    if (reqLine) {
        allLines.splice(reqLine, 1);
    }
    return allLines.join('\n');
}
function sourceFileList(node: any): void {
    for (let samples of node.curViewDS) {
        if (samples.path == location.hash.split('/').slice(2).join('/')) {
            return samples.sourceFiles;
        }
    }
}

function generatepath(path:any): void{
    let splitPath: string = path.split('/')[1];
    let tsx:any = [{path:`src/${path}.tsx`,displayName:`${splitPath}.tsx`},{path:`src/${path}.jsx`,displayName:`${splitPath}.jsx`}]
    return tsx;
}

function updatePlunker(): void {
    let path: string = hash.slice(2).join('/');
    let fileName: string = isFunctional ? 'src/' + path + '-functional-stack.json' : 'src/' + path + '-stack.json';
    let plunk: Ajax = new Ajax(fileName, 'GET', false);
    let promise: Promise<Ajax> = plunk.send();
    promise.then((result: Object) => {
        if (select('#open-plnkr') as any) {
            (select('#open-plnkr') as any).disabled = false;
        }
        plunker(result as string);
    });
}

function renderSourceTabContent(): void {
    let path: string = hash.slice(2).join('/');
    let fnSourcePromise: Array<Promise<Ajax>> = [];
    let sourcePromise: Array<Promise<Ajax>> = [];
    let fnObj: any = [];
    let sObj: any = [];
    let sampleListFile: ListView = (select('#controlList') as any).ej2_instances[0];
    let sourceFiles: any = sourceFileList(sampleListFile) as any || generatepath(path);
    for (let sourceFile of sourceFiles) {
        sourcePromise.push((new Ajax(sourceFile.path, 'GET', false)).send());
        sObj.push({
            header: { text: sourceFile.displayName },
            data: '',
            content: sourceFile.displayName
        });
    }

    Promise.all(sourcePromise).then((results: Object[]): void => {
        results.forEach((value, index) => {
            let sampleContent: any = value.toString();
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")action-description/g)
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")description/g);
            sampleContent = sampleContent.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            sObj[index].data = sampleContent;
        })
        sourceTabItems = sObj;
    })
    if (hasFunctional) {
        for (let sourceFile of sourceFiles) {
            var sPath = sourceFile.path;
            let pathName = sPath.replace(".tsx", "-functional.tsx").replace(".jsx", "-functional.jsx");
            fnSourcePromise.push((new Ajax(pathName, 'GET', false)).send());
            fnObj.push({
                header: { text: sourceFile.displayName },
                data: '',
                content: sourceFile.displayName
            });
        }
        Promise.all(fnSourcePromise).then((results: Object[]): void => {
            results.forEach((value, index) => {
                let sampleContent: any = value.toString();
                sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")action-description/g)
                sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")description/g);
                sampleContent = trimUseEffect(sampleContent, /React.useEffect/g);
                sampleContent = trimUseEffect(sampleContent, /useEffect/g);
                sampleContent = trimImportModules(sampleContent, 'updateSampleSection');
                sampleContent = sampleContent.replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    fnObj[index].data = sampleContent;
            })
            fnSourceTabItems = fnObj;
        })
    }
    updatePlunker();
    
    let openNew: HTMLFormElement = (select('#openNew') as HTMLFormElement);
    if (openNew) {
        openNew.href = location.href.split('#')[0]  + path + '/';
    }
    if (Browser.isDevice) {
        if (window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/')) == -1) {
            let toastObj: ToastComponent = new ToastComponent({
                position: {
                    X: 'Right'
                }
            });
            let hideLocation: string = location.hash.split('/')[2];
            toastObj.appendTo('#sb-home');
            setTimeout(
                () => {
                    toastObj.show({
                        content: `${hideLocation} component not supported in mobile device`
                    });
                }, 200);
            location.hash = "#/material/grid/overview"
        }
    }
}

function renderSampleHeader(): void {
    /**
     * Sammple Header Name
     */
    let controlElem: Element = select('[control-name="' + hash[2].toLowerCase() + '"]');
    controlName = controlElem ? controlElem.getAttribute('name') : toInitiaUpper(hash[2]);
    sampleNameElement.innerHTML = controlName;
    if (controlName === 'PDF Viewer') {
        (document.querySelector('.sb-desktop-setting') as any).style.display = 'none';
    } else {
        (document.querySelector('.sb-desktop-setting') as any).style.display = '';
    }

    /**
     * Bread Crumb
     */

    let curObj: any = category[hash[2]][hash[3]];
    categoryName = toInitiaUpper(curObj.category);
    sampleName = curObj.name;
    let categoryFlag: boolean = new RegExp(categoryName.replace(catRegex, ''), 'i').test(controlName.replace(catRegex, ''));

    let breadCrumbComponent: Element = document.querySelector('.sb-bread-crumb-text>.category-text');
    let breadCrumSeperator: HTMLElement = select('.category-seperator') as HTMLElement;
    let breadCrumbSubCategory: HTMLElement = select('.sb-bread-crumb-text>.component') as HTMLElement;
    let breadCrumbSample: Element = select('.sb-bread-crumb-text>.crumb-sample');
    breadCrumbComponent.innerHTML = controlName;
    if (!categoryFlag) {
        breadCrumbSubCategory.innerHTML = categoryName;
        breadCrumbSubCategory.style.display = '';
        breadCrumSeperator.style.display = '';
    } else {
        breadCrumbSubCategory.style.display = 'none';
        breadCrumSeperator.style.display = 'none';
    }
    breadCrumbSample.innerHTML = sampleName;

    let title: HTMLElement = document.querySelector('title');
    title.innerHTML = controlName + ' · ' + sampleName + ' · Syncfusion React UI Components';


}
function toInitiaUpper(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function plunker(results: string): void {
    let plnkr: { [key: string]: Object } = JSON.parse(results);
    let prevForm: Element = select('#stack-form');
    if (prevForm) {
        detach(prevForm);
    }
    let form: HTMLFormElement = createElement('form') as HTMLFormElement;
    let res: string = ((location.href as any).indexOf('ej2.syncfusion.com') !== -1 ? 'https:' : 'http:') + '//stackblitz.com/run';
    form.setAttribute('action', res);
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'stack-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    let plunks: string[] = Object.keys(plnkr);
    for (let x: number = 0; x < plunks.length; x++) {
        createStackInput((plunks[x] === 'dependencies' ? 'project[dependencies]' : 'project[files][' + plunks[x] + ']'),
            plnkr[plunks[x]] as string, form);
    }
    createStackInput('project[template]', 'create-react-app', form);
    createStackInput('project[description]', 'Essential JS 2 Sample', form);
    createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
}

function createStackInput(name: string, value: string, form: HTMLFormElement): void {
    let input: HTMLElement = createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value.replace(/{{theme}}/g, selectedTheme).replace(/{{ripple}}/,
        (selectedTheme === 'material') ? 'import { enableRipple } from \'@syncfusion/ej2-base\';\nenableRipple(true);\n' : ''));
    input.setAttribute('name', name);
    form.appendChild(input);
}

function onNextButtonClick(): void {
    selectDefaultTab();
    hash = location.hash.split('/');
    let currentIndex: number = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    let nextList: string = window.sampleOrder[currentIndex + 1];
    if (currentIndex !== -1) {
        sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + nextList;
        isRendered = false;
    }
    setSelectList();
}
function onPrevButtonClick(): void {
    selectDefaultTab();
    hash = location.hash.split('/');
    let currentIndex: number = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    let prevList: string = window.sampleOrder[currentIndex - 1];
    if (currentIndex !== -1) {
        sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + prevList;
        isRendered = false;
    }
    setSelectList();
}
/**
 * Sample Navigation
 */
function toggleButtonState(id: string, state: boolean): void {
    let ele: HTMLButtonElement = document.getElementById(id) as HTMLButtonElement;
    if (ele) {
        let mobileEle: HTMLButtonElement = document.getElementById('mobile-' + id) as HTMLButtonElement;
        ele.disabled = state;
        mobileEle.disabled = state;
        if (state) {
            mobileEle.classList.add('e-disabled');
            ele.classList.add('e-disabled');
        } else {
            mobileEle.classList.remove('e-disabled');
            ele.classList.remove('e-disabled');
        }
    }
}

export function setNavButtonState(): void {
    let curIndex: number = window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/'));
    samLength = window.sampleOrder.length - 1;
    if (curIndex === samLength) {
        toggleButtonState('next-sample', true);
    } else {
        toggleButtonState('next-sample', false);
    }
    if (curIndex === 0) {
        toggleButtonState('prev-sample', true);
    } else {
        toggleButtonState('prev-sample', false);
    }
}

/**
 * copy clipboard function
 */
function copyCode(): void {
    let copyElem: HTMLElement = select('#sb-source-tab .e-item.e-active .sb-src-code') as HTMLElement;
    let textArea: HTMLTextAreaElement = createElement('textArea') as HTMLTextAreaElement;
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    detach(textArea);
    (select('.copy-tooltip') as any).ej2_instances[0].close();
}

function processDeviceDependables(): void {
    if (Browser.isDevice) {
        select('.sb-desktop-setting').classList.add('sb-hide');
    } else {
        select('.sb-desktop-setting').classList.remove('sb-hide');
    }
}

export function intialLoadScrollTop(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    isMobile ? rightPane.scrollTop = 74 : rightPane.scrollTop = 0;
}

export function renderDescriptions(): void {
    renderDescription();
    renderActionDescription();
}
export function onComponentLoad(): void {
    hash = location.hash.split('/');
    renderSourceTabContent();
    renderSampleHeader();
    selectDefaultTab();
    let propPanel: Element = select('#control-content .property-section');
    if (propPanel) {
        if (propRegex.test(propPanel.className)) {
            propBorder.classList.add('sb-prop-md-3');
            propBorder.classList.remove('sb-prop-md-4');
        } else {
            propBorder.classList.add('sb-prop-md-4');
            propBorder.classList.remove('sb-prop-md-3');
        }
        propBorder.classList.remove('sb-hide');
    } else {
        propBorder.classList.add('sb-hide');
    }
    let mobileSetting: Element = select('.sb-mobile-setting');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile && mobileSetting) {
        if (propPanel) {
            mobileSetting.classList.remove('sb-hide');
            if (mobilePropPane.firstChild) {
                detach(mobilePropPane.firstChild);
            }
            mobilePropPane.appendChild(propPanel);
        } else {
            select('.sb-mobile-setting').classList.add('sb-hide');
        }
    }
}
export function checkApiTableDataSource(): void {
    if (!(select('#content-tab') as any).ej2_instances) {
        return;
    }
    let hash: string[] = location.hash.split('/');
    let data: Object[] = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length) {
        (select('#content-tab') as any).ej2_instances[0].hideTab(2);
        apiGrid.dataSource = [];

    } else {
        (select('#content-tab') as any).ej2_instances[0].hideTab(2, false);
        apiGrid.dataSource = data;

    }
}

export class Content extends React.Component<{}, {}>{

    public tabContentToolbar: Element;
    public componentDidMount(): void {

        /**
         * Default Sample Redirection
         */
        let sampleOrder: string[] = window.sampleOrder;
        let hash: string[] = location.hash.split('/').slice(1);
        if (sampleOrder.indexOf(hash.slice(1).join('/')) === -1) {
            let path: string;
            for (let sample of sampleOrder) {
                if (sample.indexOf(hash[1] + '/') !== -1) {
                    path = hash[0] + '/' + sample;
                    break;
                }
            }
            location.hash = path ? path : '#/material/grid/overview';
        }
        let radios: NodeListOf<Element> = document.querySelectorAll('input[name="hooks"]');
        radios.forEach(radio => radio.addEventListener('change', onHooksChange));
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
    public tabRendered(): void {
        let hsplitter: string = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
        let openNewTemplate: string = '<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank" aria-label="Open new window">' +
            '<div class="sb-icons sb-icon-Popout"></div></a></div>';
        let sampleNavigation: string = '<div class="sb-custom-item sample-navigation"><button id="prev-sample" class="sb-navigation-prev">' +
            '<span class="sb-icons sb-icon-Previous"></span></button><button  id="next-sample" class="sb-navigation-next">' +
            '<span class="sb-icons sb-icon-Next"></span></button></div>';
        let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
        let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter + '</div>' + sampleNavigation +
            '<div class="sb-icons sb-mobile-setting sb-hide"></div>';

        this.tabContentToolbar = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        select('#sb-content-header').appendChild(this.tabContentToolbar);

        /**
         * code for copyToolTip
         */


        let openNew: Tooltip = new Tooltip({
            content: 'Open in New Window'
        });

        openNew.appendTo('.sb-open-new-wrapper');

        let previous: Tooltip = new Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');

        let next: Tooltip = new Tooltip({
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
            let plnkrForm: HTMLFormElement = select('#stack-form') as HTMLFormElement;
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
    public componentWillReceiveProps(): void {
        /**
         * Sample Control Name change
         */
        sampleNameElement.innerHTML = select('[control-name="' + location.hash.split('/')[2].toLowerCase() + '"]').getAttribute('name');
        renderDescription();
        renderActionDescription();
    }

    render(): any {
        return (
            <TabComponent id='content-tab' className='sb-content-tab' selecting={preventTabSwipe} selected={changeTab} ref={t => sourceTab = t} created={this.tabRendered}>
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
                                <div className="sb-tab-overlay sb-hide">
                                    <div className="sb-loading">
                                        <svg className="circular" height="40" width="40">
                                            <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10" />
                                        </svg>
                                    </div>
                                </div>
                                <div id="fn-btn" className="e-btn-group">
                                    <input type="radio" id="hook" name="hooks" value="hooks" />
                                    <label className="e-btn e-outline e-primary" htmlFor="hook">Hooks</label>
                                    <input type="radio" id="class" name="hooks" value="classes" />
                                    <label className="e-btn e-outline e-primary" htmlFor="class">Classes</label>
                                </div>
                                <TabComponent id='sb-source-tab' className="sb-source-code-section" selected={dynamicTab} ref={t => srcTab = t} selecting={preventTabSwipe}>
                                </TabComponent>
                            </div>
                        </div>
                        <div>
                            <GridComponent id='api-grid' dataSource={[]} ref={l => apiGrid = l}>
                                <ColumnsDirective>
                                    <ColumnDirective field='name' headerText='name'  template='#template' width='180' textAlign='Center'></ColumnDirective>
                                    <ColumnDirective field='type' headerText='Type' width='180' ></ColumnDirective>
                                    <ColumnDirective field='description' headerText='Description' template='#template-description'  width='200'/>
                                </ColumnsDirective>
                            </GridComponent>
                        </div>

                    </div>
                </div>
            </TabComponent>
        )
    }
}
