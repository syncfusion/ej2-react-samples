"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var all_routes_1 = require("./all-routes");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var index_1 = require("./index");
var samplesJSON = require("./all-routes");
var hljs = require("./lib/highlightjs");
var samLength;
// Regex for hidden code removal
var reg = /.*custom code start([\S\s]*?)custom code end.*/g;
var hash;
var catRegex = /(-| )/g;
var propRegex = /-3/;
var controlName;
var sampleName;
var sourceTabItems = [];
var categoryName;
var apiGrid;
var propBorder = ej2_base_1.createElement('div', { className: 'sb-property-border' });
exports.sampleNameElement = ej2_base_1.select('#component-name>.sb-sample-text');
var rightPane = ej2_base_1.select('.sb-right-pane');
var mobilePropPane = ej2_base_1.select('.sb-mobile-prop-pane');
var isMobile;
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
function selectDefaultTab() {
    if (exports.sourceTab) {
        exports.sourceTab.selectedItem = 0;
    }
    if (exports.sourceTab1) {
        exports.sourceTab1.selectedItem = 0;
    }
}
exports.selectDefaultTab = selectDefaultTab;
window.apiList = samplesJSON.apiList;
/**
 * Description Rendering
 */
function renderDescription() {
    var header;
    var description = ej2_base_1.select('#description', ej2_base_1.select('#control-content'));
    var descElement = ej2_base_1.select('.description-section');
    var iDescription = ej2_base_1.select('#description', descElement);
    if (iDescription) {
        ej2_base_1.detach(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}
function changeTab(args) {
    if (args.selectedIndex === 1) {
        exports.srcTab.selectedItem = 0;
        exports.srcTab.items = sourceTabItems;
        exports.srcTab.refresh();
        rendercopycode();
        dynamicTabCreation(exports.srcTab);
    }
}
function rendercopycode() {
    var ele = ej2_base_1.createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    var copiedTooltip = new ej2_react_popups_1.Tooltip({ content: 'Copied to clipboard', position: 'BottomCenter', opensOn: 'Click', closeDelay: 500 }, '.copy-tooltip');
    copiedTooltip.appendTo(ele);
    ej2_base_1.select('.copycode').addEventListener('click', copyCode);
}
function dynamicTab(e) {
    var blockEle = ej2_base_1.select('#sb-source-tab > .e-content > #e-content' + this.tabId + '_' + e.selectedIndex);
    var codeEle = blockEle.children[0];
    codeEle.innerHTML = exports.srcTab.items[e.selectedIndex].data;
    codeEle.innerHTML = codeEle.innerHTML.replace(reg, '');
    highlightCode(codeEle);
}
function dynamicTabCreation(obj) {
    var blockEle = obj.element.querySelector('#e-content' + obj.tabId + '_' + obj.selectedItem).children[0];
    blockEle.innerHTML = obj.items[obj.selectedItem].data;
    blockEle.innerHTML = blockEle.innerHTML.replace(reg, '');
    highlightCode(blockEle);
}
function highlightCode(codeEle) {
    codeEle.classList.add("sb-src-code");
    hljs.highlightBlock(codeEle);
}
function renderActionDescription() {
    var aDescription = ej2_base_1.select('#action-description', ej2_base_1.select('#control-content'));
    var aDescElem = ej2_base_1.select('.sb-action-description');
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
    for (var _i = 0, _a = node.curViewDS; _i < _a.length; _i++) {
        var samples = _a[_i];
        if (samples.path == location.hash.split('/').slice(2).join('/')) {
            return samples.sourceFiles;
        }
    }
}
function generatepath(path) {
    var splitPath = path.split('/')[1];
    var tsx = [{ path: "src/" + path + ".tsx", displayName: splitPath + ".tsx" }, { path: "src/" + path + ".jsx", displayName: splitPath + ".jsx" }];
    return tsx;
}
function renderSourceTabContent() {
    var path = hash.slice(2).join('/');
    var sourcePromise = [];
    var sObj = [];
    var sampleListFile = ej2_base_1.select('#controlList').ej2_instances[0];
    var sourceFiles = sourceFileList(sampleListFile) || generatepath(path);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var sourceFile = sourceFiles_1[_i];
        sourcePromise.push((new ej2_base_1.Ajax(sourceFile.path, 'GET', false)).send());
        sObj.push({
            header: { text: sourceFile.displayName },
            data: '',
            content: sourceFile.displayName
        });
    }
    Promise.all(sourcePromise).then(function (results) {
        results.forEach(function (value, index) {
            var sampleContent = value.toString();
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")action-description/g);
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")description/g);
            sampleContent = sampleContent.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            sObj[index].data = sampleContent;
        });
        sourceTabItems = sObj;
    });
    var plunk = new ej2_base_1.Ajax('src/' + path + '-stack.json', 'GET', false);
    var p3 = plunk.send();
    p3.then(function (result) {
        if (ej2_base_1.select('#open-plnkr')) {
            ej2_base_1.select('#open-plnkr').disabled = false;
        }
        plunker(result);
    });
    var openNew = ej2_base_1.select('#openNew');
    if (openNew) {
        openNew.href = location.href.split('#')[0] + path + '/';
    }
    if (ej2_base_1.Browser.isDevice) {
        if (window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/')) == -1) {
            var toastObj_1 = new ej2_react_notifications_1.ToastComponent({
                position: {
                    X: 'Right'
                }
            });
            var hideLocation_1 = location.hash.split('/')[2];
            toastObj_1.appendTo('#sb-home');
            setTimeout(function () {
                toastObj_1.show({
                    content: hideLocation_1 + " component not supported in mobile device"
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
    var controlElem = ej2_base_1.select('[control-name="' + hash[2].toLowerCase() + '"]');
    controlName = controlElem ? controlElem.getAttribute('name') : toInitiaUpper(hash[2]);
    exports.sampleNameElement.innerHTML = controlName;
    /**
     * Bread Crumb
     */
    var curObj = all_routes_1.category[hash[2]][hash[3]];
    categoryName = toInitiaUpper(curObj.category);
    sampleName = curObj.name;
    var categoryFlag = new RegExp(categoryName.replace(catRegex, ''), 'i').test(controlName.replace(catRegex, ''));
    var breadCrumbComponent = document.querySelector('.sb-bread-crumb-text>.category-text');
    var breadCrumSeperator = ej2_base_1.select('.category-seperator');
    var breadCrumbSubCategory = ej2_base_1.select('.sb-bread-crumb-text>.component');
    var breadCrumbSample = ej2_base_1.select('.sb-bread-crumb-text>.crumb-sample');
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
    var title = document.querySelector('title');
    title.innerHTML = controlName + ' · ' + sampleName + ' · Syncfusion React UI Components';
}
function toInitiaUpper(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
function plunker(results) {
    var plnkr = JSON.parse(results);
    var prevForm = ej2_base_1.select('#stack-form');
    if (prevForm) {
        ej2_base_1.detach(prevForm);
    }
    var form = ej2_base_1.createElement('form');
    var res = (location.href.indexOf('ej2.syncfusion.com') !== -1 ? 'https:' : 'http:') + '//stackblitz.com/run';
    form.setAttribute('action', res);
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'stack-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    var plunks = Object.keys(plnkr);
    for (var x = 0; x < plunks.length; x++) {
        createStackInput((plunks[x] === 'dependencies' ? 'project[dependencies]' : 'project[files][' + plunks[x] + ']'), plnkr[plunks[x]], form);
    }
    createStackInput('project[template]', 'create-react-app', form);
    createStackInput('project[description]', 'Essential JS 2 Sample', form);
    createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
}
function createStackInput(name, value, form) {
    var input = ej2_base_1.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value.replace(/{{theme}}/g, index_1.selectedTheme).replace(/{{ripple}}/, (index_1.selectedTheme === 'material') ? 'import { enableRipple } from \'@syncfusion/ej2-base\';\nenableRipple(true);\n' : ''));
    input.setAttribute('name', name);
    form.appendChild(input);
}
function onNextButtonClick() {
    selectDefaultTab();
    hash = location.hash.split('/');
    var currentIndex = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    var nextList = window.sampleOrder[currentIndex + 1];
    if (currentIndex !== -1) {
        index_1.sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + nextList;
    }
}
function onPrevButtonClick() {
    selectDefaultTab();
    hash = location.hash.split('/');
    var currentIndex = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    var prevList = window.sampleOrder[currentIndex - 1];
    if (currentIndex !== -1) {
        index_1.sampleOverlay();
        location.hash = '#/' + hash[1] + '/' + prevList;
    }
}
/**
 * Sample Navigation
 */
function toggleButtonState(id, state) {
    var ele = document.getElementById(id);
    if (ele) {
        var mobileEle = document.getElementById('mobile-' + id);
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
function setNavButtonState() {
    var curIndex = window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/'));
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
exports.setNavButtonState = setNavButtonState;
/**
 * copy clipboard function
 */
function copyCode() {
    var copyElem = ej2_base_1.select('#sb-source-tab .e-item.e-active');
    var textArea = ej2_base_1.createElement('textArea');
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    ej2_base_1.detach(textArea);
    ej2_base_1.select('.copy-tooltip').ej2_instances[0].close();
}
function processDeviceDependables() {
    if (ej2_base_1.Browser.isDevice) {
        ej2_base_1.select('.sb-desktop-setting').classList.add('sb-hide');
    }
    else {
        ej2_base_1.select('.sb-desktop-setting').classList.remove('sb-hide');
    }
}
function intialLoadScrollTop() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    isMobile ? rightPane.scrollTop = 74 : rightPane.scrollTop = 0;
}
exports.intialLoadScrollTop = intialLoadScrollTop;
function renderDescriptions() {
    renderDescription();
    renderActionDescription();
}
exports.renderDescriptions = renderDescriptions;
function onComponentLoad() {
    hash = location.hash.split('/');
    renderSourceTabContent();
    renderSampleHeader();
    selectDefaultTab();
    var propPanel = ej2_base_1.select('#control-content .property-section');
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
    var mobileSetting = ej2_base_1.select('.sb-mobile-setting');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile && mobileSetting) {
        if (propPanel) {
            mobileSetting.classList.remove('sb-hide');
            if (mobilePropPane.firstChild) {
                ej2_base_1.detach(mobilePropPane.firstChild);
            }
            mobilePropPane.appendChild(propPanel);
        }
        else {
            ej2_base_1.select('.sb-mobile-setting').classList.add('sb-hide');
        }
    }
}
exports.onComponentLoad = onComponentLoad;
function checkApiTableDataSource() {
    if (!ej2_base_1.select('#content-tab').ej2_instances) {
        return;
    }
    var hash = location.hash.split('/');
    var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length) {
        ej2_base_1.select('#content-tab').ej2_instances[0].hideTab(2);
        apiGrid.dataSource = [];
    }
    else {
        ej2_base_1.select('#content-tab').ej2_instances[0].hideTab(2, false);
        apiGrid.dataSource = data;
    }
}
exports.checkApiTableDataSource = checkApiTableDataSource;
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.componentDidMount = function () {
        /**
         * Default Sample Redirection
         */
        var sampleOrder = window.sampleOrder;
        var hash = location.hash.split('/').slice(1);
        if (sampleOrder.indexOf(hash.slice(1).join('/')) === -1) {
            var path = void 0;
            for (var _i = 0, sampleOrder_1 = sampleOrder; _i < sampleOrder_1.length; _i++) {
                var sample = sampleOrder_1[_i];
                if (sample.indexOf(hash[1] + '/') !== -1) {
                    path = hash[0] + '/' + sample;
                    break;
                }
            }
            location.hash = path ? path : '#/material/grid/overview';
        }
        ej2_base_1.select('#mobile-next-sample').addEventListener('click', onNextButtonClick);
        ej2_base_1.select('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
        /**
         * Property Panel Border
         */
        ej2_base_1.select('.sb-sample-content-area').firstChild.appendChild(propBorder);
        /**
         * Navigation Button Click events
         */
    };
    Content.prototype.tabRendered = function () {
        var hsplitter = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
        var openNewTemplate = '<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank">' +
            '<div class="sb-icons sb-icon-Popout"></div></a></div>';
        var sampleNavigation = '<div class="sb-custom-item sample-navigation"><button id="prev-sample" class="sb-navigation-prev">' +
            '<span class="sb-icons sb-icon-Previous"></span></button><button  id="next-sample" class="sb-navigation-next">' +
            '<span class="sb-icons sb-icon-Next"></span></button></div>';
        var plnrTemplate = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
        var contentToolbarTemplate = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter + '</div>' + sampleNavigation +
            '<div class="sb-icons sb-mobile-setting sb-hide"></div>';
        this.tabContentToolbar = ej2_base_1.createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        ej2_base_1.select('#sb-content-header').appendChild(this.tabContentToolbar);
        /**
         * code for copyToolTip
         */
        var openNew = new ej2_react_popups_1.Tooltip({
            content: 'Open in New Window'
        });
        openNew.appendTo('.sb-open-new-wrapper');
        var previous = new ej2_react_popups_1.Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');
        var next = new ej2_react_popups_1.Tooltip({
            content: 'Next Sample'
        });
        ej2_base_1.select('#right-pane').addEventListener('scroll', function (event) {
            next.close();
            openNew.close();
            previous.close();
        });
        next.appendTo('#next-sample');
        /**
      * plnkr trigger
      */
        ej2_base_1.select('#open-plnkr').addEventListener('click', function () {
            var plnkrForm = ej2_base_1.select('#stack-form');
            if (plnkrForm) {
                plnkrForm.submit();
            }
        });
        ej2_base_1.select('#next-sample').addEventListener('click', onNextButtonClick);
        ej2_base_1.select('#prev-sample').addEventListener('click', onPrevButtonClick);
        ej2_base_1.select('.sb-mobile-setting').addEventListener('click', index_1.viewMobilePropPane);
        processDeviceDependables();
        setNavButtonState();
        onComponentLoad();
        intialLoadScrollTop();
        index_1.removeOverlay();
        checkApiTableDataSource();
    };
    Content.prototype.componentWillReceiveProps = function () {
        /**
         * Sample Control Name change
         */
        exports.sampleNameElement.innerHTML = ej2_base_1.select('[control-name="' + location.hash.split('/')[2].toLowerCase() + '"]').getAttribute('name');
        renderDescription();
        renderActionDescription();
    };
    Content.prototype.render = function () {
        return (React.createElement(ej2_react_navigations_1.TabComponent, { id: 'content-tab', className: 'sb-content-tab', selecting: preventTabSwipe, selected: changeTab, ref: function (t) { return exports.sourceTab = t; }, created: this.tabRendered },
            React.createElement("div", { id: "sb-content", className: 'sb-content-section' },
                React.createElement("div", { id: 'sb-content-header', className: "e-tab-header sb-content-tab-header" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "sb-icons sb-icon-Demo" }),
                        " ",
                        React.createElement("span", { className: "sb-tab-title" }, " DEMO ")),
                    React.createElement("div", null,
                        React.createElement("span", { className: "sb-icons sb-icon-Code" }),
                        React.createElement("span", { className: "sb-tab-title" }, " SOURCE ")),
                    React.createElement("div", null,
                        React.createElement("span", { className: "sb-icons sb-icon-API" }),
                        React.createElement("span", { className: "sb-tab-title" }, " API "))),
                React.createElement("div", { className: "e-content sb-sample-content-area" },
                    React.createElement("div", null,
                        React.createElement("div", { className: 'sb-demo-section' },
                            React.createElement("div", { className: "control-fluid" },
                                React.createElement("div", { className: "container-fluid" },
                                    React.createElement("div", { id: "control-content" }, all_routes_1.routes))))),
                    React.createElement("div", null,
                        React.createElement("div", { className: 'sb-source-section' },
                            React.createElement(ej2_react_navigations_1.TabComponent, { id: 'sb-source-tab', className: "sb-source-code-section", selected: dynamicTab, ref: function (t) { return exports.srcTab = t; }, headerPlacement: "Bottom", selecting: preventTabSwipe }))),
                    React.createElement("div", null,
                        React.createElement(ej2_react_grids_1.GridComponent, { id: 'api-grid', dataSource: [], ref: function (l) { return apiGrid = l; } },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', headerText: 'name', template: '#template', width: '180', textAlign: 'Center' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'type', headerText: 'Type', width: '180' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'description', headerText: 'Description', template: '#template-description', width: '200' }))))))));
    };
    return Content;
}(React.Component));
exports.Content = Content;
