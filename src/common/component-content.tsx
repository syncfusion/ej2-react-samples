import * as React from 'react';
import { routes, category } from './all-routes';
import { Ajax, Browser, createElement, detach, select } from '@syncfusion/ej2-base';
import { Tab } from '@syncfusion/ej2-react-navigations'
import { Tooltip } from '@syncfusion/ej2-react-popups'
import { TabComponent } from '@syncfusion/ej2-react-navigations';
import { viewMobilePropPane, selectedTheme, sampleOverlay, switchText, removeOverlay } from './index';
import { MyWindow } from './leftpane';
import * as hljs from './lib/highlightjs';

declare let window: MyWindow;
let samLength: number;

let hash: string[];
let catRegex: RegExp = /(-| )/g;
let propRegex: RegExp = /-3/;
let controlName: string;
let sampleName: string;
let categoryName: string;
let propBorder: HTMLElement = createElement('div', { className: 'sb-property-border' });
export let sampleNameElement: Element = select('#component-name>.sb-sample-text');

export let sourceTab: Tab;

let mobilePropPane: Element = select('.sb-mobile-prop-pane');

let isMobile: boolean;
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
}

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

function renderSourceTabContent(): void {
    let path: string = hash.slice(2).join('/');
    let ajaxTsx: Ajax = new Ajax('src/' + path + '.tsx', 'GET', true);
    ajaxTsx.send().then((value: Object): void => {
        let tsxstring = value.toString();
        tsxstring = getStringWithOutDescription(tsxstring, /(\'|\")action-description/g);
        tsxstring = getStringWithOutDescription(tsxstring, /(\'|\")description/g);
        let content: string = tsxstring.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        select('#ts-src-tab').innerHTML = content;
        hljs.highlightBlock(select('#ts-src-tab'));
        select('.sb-ts-snippet-header').innerHTML = hash.slice(3) + '.tsx';
    });
    let plunk: Ajax = new Ajax('src/' + path + '-plnkr.json', 'GET', false);
    let p3: Promise<Ajax> = plunk.send();
    p3.then((result: Object) => {
        (select('#open-plnkr') as any).disabled = false;
        plunker(result as string);
    });
    let openNew: HTMLFormElement = (select('#openNew') as HTMLFormElement);
    if (openNew) {
        openNew.href = location.href.split('#')[0] + 'samples/' + path + '/index.html';
    }
}

function renderSampleHeader(): void {
    /**
     * Sammple Header Name
     */
    let controlElem: Element = select('[control-name="' + hash[2].toLowerCase() + '"]');
    controlName = controlElem ? controlElem.getAttribute('name') : toInitiaUpper(hash[2]);
    sampleNameElement.innerHTML = controlName;

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
}
function toInitiaUpper(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function plunker(results: string): void {
    let plnkr: { [key: string]: Object } = JSON.parse(results);
    let prevForm: Element = select('#plnkr-form');
    if (prevForm) {
        detach(prevForm);
    }
    let form: HTMLFormElement = createElement('form') as HTMLFormElement;
    form.setAttribute('action', 'http://plnkr.co/edit/?p=preview');
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'plnkr-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    let plunks: string[] = Object.keys(plnkr);
    for (let x: number = 0; x < plunks.length; x++) {
        let ip: HTMLElement = createElement('input');
        ip.setAttribute('type', 'hidden');
        ip.setAttribute('value', plnkr[plunks[x]] as string);
        ip.setAttribute('name', 'files[' + plunks[x] + ']');
        form.appendChild(ip);
    }
}

function onNextButtonClick(): void {
    selectDefaultTab();
    hash = location.hash.split('/');
    let currentIndex: number = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    let nextList: string = window.sampleOrder[currentIndex + 1];
    if (currentIndex !== -1) {
        sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + nextList;
    }
}
function onPrevButtonClick(): void {
    selectDefaultTab();
    hash = location.hash.split('/');
    let currentIndex: number = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    let prevList: string = window.sampleOrder[currentIndex - 1];
    if (currentIndex !== -1) {
        sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + prevList;
    }
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
    let copyElem: HTMLElement = select('#ts-src-tab') as HTMLElement;
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
    select('.sb-right-pane').scrollTop = 0;
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
    isMobile = window.matchMedia('(max-width:550px)').matches;;
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

export class Content extends React.Component<{}, {}>{

    public componentDidMount(): void {

        let hsplitter: string = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
        let openNewTemplate: string = '<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank">' +
            '<div class="sb-icons sb-icon-Popout"></div></a></div>';
        let sampleNavigation: string = '<div class="sb-custom-item sample-navigation"><button id="prev-sample" class="sb-navigation-prev">' +
            '<span class="sb-icons sb-icon-Previous"></span></button><button  id="next-sample" class="sb-navigation-next">' +
            '<span class="sb-icons sb-icon-Next"></span></button></div>';
        let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">EDIT IN PLUNKER</span>';
        let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter + '</div>' + sampleNavigation +
            '<div class="sb-icons sb-mobile-setting sb-hide"></div>';

        let tabContentToolbar: Element = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        if (switchText === 'mouse') {
            tabContentToolbar.classList.add('sb-mouse');
        }
        let ele: HTMLElement = createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
        document.getElementById('sb-source-tab').appendChild(ele);
        let copiedTooltip: Tooltip = new Tooltip(
            { content: 'Copied', position: 'bottom center', opensOn: 'click', closeDelay: 500 }, '.copy-tooltip');
        select('#sb-content-header').appendChild(tabContentToolbar);
        
        /**
         * plnkr trigger
         */
        select('#open-plnkr').addEventListener('click', () => {
            let plnkrForm: HTMLFormElement = select('#plnkr-form') as HTMLFormElement;
            if (plnkrForm) {
                plnkrForm.submit();
            }
        });
        select('.copycode').addEventListener('click', copyCode);
        
        /**
         * Property Panel Border
         */
        select('.sb-sample-content-area').firstChild.appendChild(propBorder);

        processDeviceDependables();
        
        onComponentLoad();

        select('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
        /**
         * Navigation Button Click events
         */
        select('#next-sample').addEventListener('click', onNextButtonClick);
        select('#mobile-next-sample').addEventListener('click', onNextButtonClick);
        select('#prev-sample').addEventListener('click', onPrevButtonClick);
        select('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);

        setNavButtonState();
        intialLoadScrollTop();
        removeOverlay();
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
            <TabComponent id='content-tab' className='sb-content-tab' selecting={preventTabSwipe} ref={t => sourceTab = t}>
                <div id="sb-content" className='sb-content-section'>
                    <div id='sb-content-header' className="e-header sb-content-tab-header">
                        <div>
                            <span className="sb-icons sb-icon-Demo"></span> DEMO </div>
                        <div>
                            <span className="sb-icons sb-icon-Code"></span> SOURCE </div>
                    </div>
                    <div className="e-content sb-sample-content-area">
                        <div>
                            <div className='sb-demo-section'>
                                <div className="control-fluid">
                                    <div id="container-fluid">
                                        <div id="control-content">{routes}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='sb-source-section'>
                                <TabComponent id='sb-source-tab' className="sb-source-code-section" headerPlacement="Bottom" selecting={preventTabSwipe}>
                                    <div id='sb-content-header' className="e-header sb-content-tab-header">
                                        <div>
                                            <span className="sb-ts-snippet-header"></span></div>
                                    </div>
                                    <div className="e-content sb-sample-content-area">
                                        <div>
                                            <div id="ts-src-tab" className="ts-source-content sb-src-code javascript"></div>
                                        </div>
                                    </div>
                                </TabComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </TabComponent>
        )
    }
}
