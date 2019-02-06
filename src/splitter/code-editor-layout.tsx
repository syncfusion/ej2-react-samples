import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { SplitterComponent, PanesDirective, PaneDirective, Splitter } from '@syncfusion/ej2-react-layouts';
import './code-editor.component.css';

/**
 *  Sample for code editor layout
 */

export class CodeEditor extends SampleBase<{}, {}> {

    public splitterInstance: SplitterComponent;

    public innerSplitterInstance: SplitterComponent;

    private paneSize = "53%";

    private minimumSize = "30%";

    private onCreate(e: any): void {
        //Initialize Splitter component
       let cont: HTMLElement = this.splitterInstance.element.querySelector(".e-pane");
        cont.appendChild(this.innerSplitterInstance.element);
    }

    private bottomPaneContent = `<div class="splitter-content">
    <h3 class="h3">Preview of sample</h3>
    <div class="splitter-image">
        <img class="img1" src="https://ej2.syncfusion.com/demos/src/listview/images/albert.png" style="width: 20%;margin: 0 auto;">
    </div>
    </div>`;
    private firstPaneContent = `<div class="splitter-content">
    <h3 class="h3">HTML</h3>
    <div class="code-preview">                        
        &lt;<span>!DOCTYPE html></span>
        <div>&lt;<span>html></span></div>
        <div>&lt;<span>body></span></div>
        &lt;<span>div</span> id="custom-image">
        <div style="margin-left: 5px">&lt;<span>img</span> src="src/albert.png"></div>
        <div>&lt;<span>div</span>&gt;</div>
        <div>&lt;<span>/body></span></div>
        <div>&lt;<span>/html></span></div>
    </div>
    </div>`;

    private secondPaneContent = `<div class="splitter-content">
    <h3 class="h3">CSS</h3>
    <div class="code-preview">
        <span>img {</span>
            <div id="code-text">margin:<span>0 auto;</span></div>
            <div id="code-text">display:<span>flex;</span></div> 
            <div id="code-text">height:<span>70px;</span></div>
        <span>   }</span>
    </div>
    </div>`;
    private thirdPaneContent = `<div class="splitter-content">
    <h3 class="h3">JavaScript</h3>
    <div class="code-preview">
        <span>var</span> image = document.getElementById("custom-image");
        <div>image.addEventListener("click", function() {</div>
            <div style="padding-left: 20px;">// Code block for click action</div>
        <span> }</span>
    </div>
    </div>`;

    public render(): JSX.Element {
        return (
            <div id="target" className="control-section code-editor" >
            <SplitterComponent id="splitter1" ref={(splitter) => { this.innerSplitterInstance = splitter }}>
            <PanesDirective>
                <PaneDirective size='29%' min='23%' content = {this.firstPaneContent} />
                <PaneDirective size='20%' min='15%' content = {this.secondPaneContent} />
                <PaneDirective size='35%' min='35%' content = {this.thirdPaneContent} />
            </PanesDirective>
            </SplitterComponent>
            <SplitterComponent id="splitter2" height="400px" orientation="Vertical" ref={(splitter) => { this.splitterInstance = splitter }} created={this.onCreate.bind(this)}>
                <PanesDirective>
                    <PaneDirective>
                    </PaneDirective>
                    <PaneDirective size={this.paneSize} min={this.minimumSize} content={this.bottomPaneContent}>
                    </PaneDirective>
                </PanesDirective>
            </SplitterComponent>
                <div id="action-description">
                    <p>
                        This example demonstrates the splitter control that is used to design code editor-like application using multiple panes.
                        You can resize its panes vertically as well as horizontally.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Splitter is used to design code editor-like application using multiple panes.
                        In this code editor layout, display HTML, CSS, and JavaScript (JS) code as horizontal panes at the top and output of 
                        sample at the bottom pane.
                    </p>
                </div>
            </div>
        );
    }
}