import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';
import './splitter.component.css';

/**
 * Splitter Basic rendering
 */

const Basic = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // horizontal Splitter content
    const hPaneContent1 = () => {
        return (
            <div className="splitter-content">
                <div> Left pane
                    <div id='panetext'>size: 25%</div>
                    <div id='panetext'>min: 60px</div>
                </div>
            </div>
        );
    };

    const hPaneContent2 = () => {
        return (
            <div className="splitter-content">
                <span>Middle pane<div id='panetext'>size: 50%</div><div id='panetext'>min: 60px</div></span>
            </div>
        );
    };

    const hPaneContent3 = () => {
        return (
            <div className="splitter-content">
                <span>Right pane<div id='panetext'>size: 25%</div><div id='panetext'>min: 60px</div></span>
            </div>
        );
    };

    // vertical Splitter content.
    const vPaneContent1 = () => {
        return (
            <div className="splitter-content">
                <span>Top pane<div id='panetext'>size: 30%</div><div id='panetext'>min: 60px</div></span>
            </div>
        );
    };

    const vPaneContent2 = () => {
        return (
            <div className="splitter-content">
                <span>Middle pane<div id='panetext'>size: 40%</div><div id='panetext'>min: 60px</div></span>
            </div>
        );
    };

    const vPaneContent3 = () => {
        return (
            <div className="splitter-content">
                <span>Bottom pane<div id='panetext'>size: 30%</div><div id='panetext'>min: 60px</div></span>
            </div>
        );
    };

    return (
        <div id="defaultSplitter" className="control-section" >
            <div className="pane1">
                <div id="pane-heading">Horizontal Splitter</div>
                <SplitterComponent height="110px" width="100%" separatorSize={4}>
                    <PanesDirective>
                        <PaneDirective size="25%" min="60px" content = {hPaneContent1}/>
                        <PaneDirective size="50%" min="60px" content = {hPaneContent2}/>
                        <PaneDirective size="25%" min="60px" content = {hPaneContent3}/>
                    </PanesDirective>
                </SplitterComponent>
            </div>
            <div className="pane2">
                <div id="pane-heading">Vertical Splitter</div>
                <SplitterComponent height="240px" width="100%" orientation="Vertical" separatorSize={4}>
                    <PanesDirective>
                        <PaneDirective size="30%" min="60px" content={vPaneContent1} />
                        <PaneDirective size="40%" min="60px" content={vPaneContent2} />
                        <PaneDirective size="30%" min="60px" content={vPaneContent3} />
                    </PanesDirective>
                </SplitterComponent>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the default functionalities of the <code>Splitter</code> control. 
                    To resize panes and increase the dimension of a pane, drag a separator (divider) bar. 
                </p>
            </div>
            <div id="description">
                <p>
                    The split panes of the Splitter control can be oriented horizontally or vertically using the Orientation property.
                </p>
                <ul>
                    <li>Set orientation property to Horizontal to create horizontal splitter, which align panels left-to-right.</li>
                    <li>Set orientation property to Vertical to create vertical splitter, which align panels top-to-bottom.</li>
                </ul>
                <p>
                    The splitter allows resizing its panes when the drag separator (divider) bar is used to increase its dimension.
                </p>
            </div>
        </div>
    );
}
export default Basic;