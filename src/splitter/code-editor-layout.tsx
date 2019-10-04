import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { SplitterComponent, PanesDirective, PaneDirective, Splitter } from '@syncfusion/ej2-react-layouts';
import './code-editor.component.css';

/**
 *  Sample for code editor layout
 */

const imgStyle = {
    width: "20%",
    margin: "0 auto"
}

const paneImg = {
    margin: "auto auto 5px"
}

const lastPaneStyle = {
    padding: "auto auto 20px"
}

export class CodeEditor extends SampleBase<{}, {}> {

    public splitterInstance: SplitterComponent;

    public innerSplitterInstance: SplitterComponent;

    private paneSize = "53%";

    private minimumSize = "30%";

    private bottomPaneContent(): JSX.Element {
        return(
            <div className="splitter-editor-content">
                <h3 className="h3">Preview of sample</h3>
                <div className="splitter-image">
                    <img className="img1" src="https://ej2.syncfusion.com/demos/src/listview/images/albert.png" style={imgStyle} />
                </div>
            </div>
        )
    };
    private firstPaneContent(): JSX.Element {
        return(
            <div className="splitter-editor-content">
                <h3 className="h3">HTML</h3>
                <div className="code-preview">
                    &lt;<span>!DOCTYPE html></span>
                    <div>&lt;<span>html></span></div>
                    <div>&lt;<span>body></span></div>
                    &lt;<span>div</span> id="custom-image">
        <div style={paneImg}>&lt;<span>img</span> src="src/albert.png"></div>
                    <div>&lt;<span>div</span>&gt;</div>
                    <div>&lt;<span>/body></span></div>
                    <div>&lt;<span>/html></span></div>
                </div>
            </div>
        );
    };

    private secondPaneContent(): JSX.Element {
        return(
            <div className="splitter-editor-content">
                <h3 className="h3">CSS</h3>
                <div className="code-preview">
                    <span>img &#123; </span>
                    <div id="code-text">margin:<span>0 auto;</span></div>
                    <div id="code-text">display:<span>flex;</span></div>
                    <div id="code-text">height:<span>70px;</span></div>
                    <span> &#125; </span>
                </div>
            </div>
        );
    };
    private thirdPaneContent(): JSX.Element {
        return(
            <div className="splitter-editor-content">
            <h3 className="h3">JavaScript</h3>
            <div className="code-preview">
                <span>var</span> image = document.getElementById("custom-image");
                <div>image.addEventListener("click", function() &#123; </div>
                    <div style={lastPaneStyle}>// Code block for click action</div>
                <span> &#125; </span>
            </div>
            </div>
        );
    };

    private innerSplitterElement(): JSX.Element {
        return(
            <SplitterComponent id="codeEditor" ref={(splitter) => { this.innerSplitterInstance = splitter }}>
            <PanesDirective>
                <PaneDirective size='29%' min='23%' content = {this.firstPaneContent} />
                <PaneDirective size='20%' min='15%' content = {this.secondPaneContent} />
                <PaneDirective size='35%' min='35%' content = {this.thirdPaneContent} />
            </PanesDirective>
            </SplitterComponent>
        );
    };

    public render(): JSX.Element {
        return (
            <div id="target" className="control-section code-editor" >
                <SplitterComponent id="splitter2" height="400px" orientation="Vertical" ref={(splitter) => { this.splitterInstance = splitter }} >
                    <PanesDirective>
                        <PaneDirective content={this.innerSplitterElement.bind(this)} >
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