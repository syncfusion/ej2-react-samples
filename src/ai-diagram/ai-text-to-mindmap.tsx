import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    DiagramComponent, Inject, NodeModel, UndoRedo,
    IDragEnterEventArgs, GridlinesModel, Node,
} from '@syncfusion/ej2-react-diagrams';
import { ButtonComponent, FabComponent } from '@syncfusion/ej2-react-buttons';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { DataBinding, DiagramTools, HorizontalAlignment, IScrollChangeEventArgs, MarginModel, MindMap, PortVisibility, PrintAndExport, SelectorConstraints, Side, UserHandleModel, VerticalAlignment } from '@syncfusion/ej2-react-diagrams';
import { convertTextToMindMap } from './ai-mindmap';
import { data, menuItems, zoomMenuItems } from './datasource';
import { toolbarClick, menuClick, zoomChange, loadDiagram } from './utilitymethods';
import { getConnectorDefaults, getNodeDefaults, historyChange, onUserHandleMouseDown, selectionChange } from './events';
import { ItemDirective, ItemsDirective, MenuComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { InputEventArgs, TextBoxComponent, UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useEffect } from 'react';
import './smart-mindmap.css';

export let diagram: DiagramComponent;
export let toolbarObj: ToolbarComponent;
//creation of the Ports
export function getPort() {
    var port =
        [{
            id: 'leftPort', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'rightPort', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'topPort', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'bottomPort', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden,
            style: { fill: 'black' }
        }
        ];
    return port;
}
export interface MindMapData {
    id: string;
    parentId: string;
    Label: string;
    branch: string;
    fill: string;
    strokeColor: string;
    orientation: string;
    level: number;
}

function AiSmartMindMap() {
    let dialog: DialogComponent;
    let textBox: TextBoxComponent;
    let sendButton: ButtonComponent;
    let menu: MenuComponent;
    useEffect(() => {
        // Add keypress event listener to the document
        document.addEventListener('keypress', function (event) {
            if (textBox) {
                if (event.key === 'Enter' && document.activeElement === textBox.element) {
                    if (textBox.value) {
                        dialog.hide();
                        convertTextToMindMap(textBox.value, diagram);
                    }
                }
            }
        });
    }, []);

    //Sets the Node style for DragEnter element.
    function dragEnter(args: IDragEnterEventArgs): void {
        let obj: NodeModel = args.element as NodeModel;
        if (obj instanceof Node) {
            let oWidth: number = obj.width;
            let oHeight: number = obj.height;
            let ratio: number = 100 / obj.width;
            obj.width = 100;
            obj.height *= ratio;
            obj.offsetX += (obj.width - oWidth) / 2;
            obj.offsetY += (obj.height - oHeight) / 2;
            obj.style = { fill: '#357BD2', strokeColor: 'white' };
        }
    }
    let interval: number[] = [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ];
    let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };
    let items = new DataManager(data, new Query().take(7));
    let leftarrow = 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z';
    let rightarrow = 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z';
    let devareicon = 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
        '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
        '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z';
    let leftuserhandle = setUserHandle('leftHandle', leftarrow, 'Left', 0.5, { top: 10, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');
    let rightuserhandle = setUserHandle('rightHandle', rightarrow, 'Right', 0.5, { top: 10, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
    let devareuserhandle = setUserHandle('devare', devareicon, 'Top', 0.5, { top: 0, bottom: 0, left: 0, right: 0 }, 'Center', 'Center');
    let handle: UserHandleModel[] = [leftuserhandle, rightuserhandle, devareuserhandle];
    //set and creation of the Userhandle.
    function setUserHandle(name: string, pathData: string, side: Side, offset: number, margin: MarginModel, halignment: HorizontalAlignment, valignment: VerticalAlignment) {
        var userhandle: UserHandleModel = {
            name: name,
            pathData: pathData,
            backgroundColor: 'black',
            pathColor: 'white',
            side: side,
            offset: offset,
            margin: margin,
            horizontalAlignment: halignment,
            verticalAlignment: valignment,
        };
        return userhandle;
    }

    function onUploadSuccess(args: any) {
        let file = args.file;
        let rawFile = file.rawFile;
        let reader = new FileReader();
        reader.readAsText(rawFile);
        reader.onloadend = loadDiagram;
    }

    function onHideNodeClick() {
        var node1 = document.getElementById('shortcutDiv') as HTMLElement;
        node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
        (menu.items[3] as any).items[1].iconCss = node1.style.visibility === "hidden" ? '' : 'sf-icon-check-tick';
        diagram.dataBind();
    }
    function onTextBoxChange(args: InputEventArgs) {
        if (args.value !== '') {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }

    const dialogContent = () => {
        return (
            <>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Suggested Prompts</p>
                <ButtonComponent
                    id="btn1" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                    onClick={() => {
                        dialog.hide();
                        convertTextToMindMap("Mindmap for top tourist places in the world", diagram);
                    }}
                >Mindmap for top tourist places in the world</ButtonComponent>
                <ButtonComponent
                    id="btn2" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                    onClick={() => {
                        dialog.hide();
                        convertTextToMindMap("Mindmap for categories of topics in science", diagram);
                    }}
                >Mindmap for categories of topics in science</ButtonComponent>
                <ButtonComponent
                    id="btn3" style={{ flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }}
                    onClick={() => {
                        dialog.hide();
                        convertTextToMindMap("Mindmap for different components in syncfusion", diagram);
                    }}
                >Mindmap for different components in syncfusion</ButtonComponent>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <TextBoxComponent type="text" id="textBox" className="db-openai-textbox" style={{ flex: 1 }}
                        ref={textBoxObj => textBox = textBoxObj as TextBoxComponent}
                        placeholder='Please enter your prompt here...' width={450} input={onTextBoxChange}
                    />
                    <ButtonComponent id="db-send"
                        ref={sendButtonObj => sendButton = sendButtonObj as ButtonComponent}
                        onClick={() => {
                            if (textBox.value) {
                                dialog.hide();
                                convertTextToMindMap(textBox.value, diagram)
                            }
                        }}
                        iconCss='e-icons e-send' isPrimary={true} disabled={false}
                        style={{ marginLeft: '5px', height: '32px', width: '32px' }}></ButtonComponent>
                </div>
            </>
        );
    };

    return (
        <>
                <div className="main">
                    <div className="db-toolbar-editor">
                        <div id="aiMindMap" className="ai-menu-control">
                            <MenuComponent id="menu"
                                ref={menuObj => menu = menuObj as MenuComponent}
                                items={menuItems} select={menuClick}
                            ></MenuComponent >
                        </div>
                        <div className="db-toolbar-container">
                            <ToolbarComponent id="toolbarEditor"
                                ref={toolbar => toolbarObj = toolbar as ToolbarComponent}
                                clicked={function (args: any) { toolbarClick(args); }}
                                width='100%'
                                height={46}
                            >
                                <ItemsDirective>
                                    <ItemDirective prefixIcon='ai-sf-icon-undo' tooltipText='Undo' disabled={true} />
                                    <ItemDirective prefixIcon='ai-sf-icon-redo' tooltipText='Redo' disabled={true} />
                                    <ItemDirective prefixIcon='ai-sf-icon-pointer tb-icons' tooltipText='Select Tool' cssClass='tb-item-selected' />
                                    <ItemDirective prefixIcon='ai-sf-icon-pan tb-icons' tooltipText='Pan Tool' />
                                    <ItemDirective prefixIcon='ai-sf-icon-add-child' tooltipText='Add Child' disabled={true} />
                                    <ItemDirective prefixIcon='ai-sf-icon-add-sibling' tooltipText='Add Sibling' disabled={true} />
                                    <ItemDirective cssClass='tb-item-end tb-zoom-dropdown-btn' align='Right'
                                        template={() => <DropDownButtonComponent id="btnZoomIncrement"
                                                items={zoomMenuItems} content={Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %'} select={zoomChange}
                                            ></DropDownButtonComponent>
                                        }
                                    />
                                </ItemsDirective>
                            </ToolbarComponent>
                        </div>
                    </div>
                    <div className="diagram-upload-file">
                        <UploaderComponent
                            type="file"
                            id="fileupload"
                            name="UploadFiles"
                            asyncSettings={{
                                saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
                                removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
                            }}
                            success={onUploadSuccess}
                            showFileList={false}
                        />
                    </div>
                    <div id="shortcutDiv" style={{
                        width: '400px',
                        height: '480px',
                        padding: '10px',
                        backgroundColor: '#fff7b5',
                        border: '1px solid #fff7b5',
                        position: 'absolute',
                        margin: '27px',
                        fontSize: '14px',
                        visibility: 'hidden',
                        zIndex: 1000
                    }}>
                        <div id="closeIconDiv" style={{
                            float: 'right',
                            width: '16px',
                            height: '16px',
                            border: '1px solid #fff7b5'
                        }}
                            onClick={onHideNodeClick}
                        >
                            <span className="sf-icon-close" style={{ fontSize: '14px', cursor: 'pointer' }}></span>
                        </div>
                        <div><span className="db-html-font-medium">Quick shortcuts</span></div>
                        <div style={{ paddingTop: '10px' }}>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Tab : </span><span className="db-html-font-normal">Add a subtopic to the left</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Shift + Tab : </span><span className="db-html-font-normal">Add a subtopic to the right</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Enter : </span><span className="db-html-font-normal">Add a new sibling child</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Delete / Backspace : </span><span className="db-html-font-normal">Delete a topic</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Arrow(Up, Down, Left, Right) : </span><span className="db-html-font-normal">Navigate between topics</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">F2 : </span><span className="db-html-font-normal">Edit a topic</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Esc : </span><span className="db-html-font-normal">End text editing</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Ctrl + B : </span><span className="db-html-font-normal">To make text bold</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Ctrl + I : </span><span className="db-html-font-normal">To make text Italic </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Ctrl + U : </span><span className="db-html-font-normal">Underline the text</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Space : </span><span className="db-html-font-normal">Expand / Collapse the selected node</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">Ctrl + E :</span><span className="db-html-font-normal">Expand / Collapse the whole diagram</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">F8 : </span><span className="db-html-font-normal">To Fit the diagram into the viewport</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span className="db-html-font-medium">F1 : </span><span className="db-html-font-normal">Show/Hide shortcut Key</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px', border: '1px solid #b0b0b0' }}>
                        <DiagramComponent
                            ref={diagramObj => diagram = diagramObj as DiagramComponent}
                            id="diagram"
                            width="100%"
                            height="900px"
                            selectionChange={selectionChange}
                            historyChange={historyChange}
                            onUserHandleMouseDown={onUserHandleMouseDown}
                            tool={DiagramTools.Default}
                            snapSettings={{ horizontalGridlines: gridlines, verticalGridlines: gridlines }}
                            scrollSettings={{ scrollLimit: 'Infinity' }}
                            layout={{
                                type: 'MindMap',
                                horizontalSpacing: 80,
                                verticalSpacing: 50,
                                getBranch: function (node: Node) {
                                    if (node.addInfo) {
                                        var addInfo = node.addInfo;
                                        return (addInfo as any).orientation.toString();
                                    }
                                    return 'Left';
                                }
                            }}
                            selectedItems={{ constraints: SelectorConstraints.UserHandle, userHandles: handle }}
                            dataSourceSettings={{
                                id: 'id',
                                parentId: 'parentId',
                                dataSource: items,
                                root: String(1),
                            }}
                            rulerSettings={{ showRulers: true }}
                            scrollChange={function (args: IScrollChangeEventArgs) {
                                if (args.panState !== 'Start') {
                                    let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
                                    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %';
                                }
                            }}
                            getNodeDefaults={getNodeDefaults}
                            getConnectorDefaults={getConnectorDefaults}
                            dragEnter={dragEnter}
                        >
                            <Inject services={[UndoRedo, DataBinding, PrintAndExport, MindMap]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id='container'>
                    <DialogComponent
                        ref={dialogObj => dialog = dialogObj as DialogComponent}
                        id='dialog'
                        header='<span class="e-icons e-assistview-icon" style="color: black;width:20px; font-size: 16px;"></span> AI Assist'
                        showCloseIcon={true}
                        isModal={true}
                        content={dialogContent}
                        target={document.getElementById('control-section') as HTMLElement}
                        width='540px'
                        visible={false}
                        height='310px'
                    />
                </div>
                <FabComponent id="ai-assist"
                    isPrimary={true} content='AI Assist' iconCss='e-icons e-assistview-icon' target="#diagram"
                    onClick={() => dialog.show()}></FabComponent>
                {/* Loading indicator container */}
                <div id="loadingContainer" className="loading-container">
                    <div className="loading-indicator"></div>
                    <div className="loading-text">Generating Mindmap...</div>
                </div>
        </>
    )
}

export default AiSmartMindMap;