import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { SplitterComponent } from '@syncfusion/ej2-react-layouts';
import './splitter.component.css';

/**
 * Splitter Basic rendering
 */

export class Basic extends SampleBase<{}, {}> {
    // horizontal panesettings
    private paneSettings: { [key: string]: Object }[] = [
        {
            size: '25%', min: '60px', content: `<div class="splitter-content">
            <div>Left pane<div id='panetext'>size: 25%</div><div id='panetext'>min: 60px</div>
            </div></div>` },
        {
            size: '50%', min: '60px', content: `<div class="splitter-content">
          <span>Middle pane<div id='panetext'>size: 50%</div><div id='panetext'>min: 60px</div></span>
          </div>` },
        {
            size: '25%', min: '60px', content: `<div class="splitter-content">
        <span>Right pane<div id='panetext'>size: 25%</div><div id='panetext'>min: 60px</div></span>
        </div>` }
    ];
    // vertical panesettings
    private verticalpaneSettings: { [key: string]: Object }[] = [
        { size: '30%', min: '60px', content: `<div class="splitter-content"><span>Top pane<div id='panetext'>size: 30%</div><div id='panetext'>min: 60px</div></span></div>` },
        { size: '40%', min: '60px', content: `<div class="splitter-content"><span>Middle pane<div id='panetext'>size: 40%</div><div id='panetext'>min: 60px</div></span></div>` },
        { size: '30%', min: '60px', content: `<div class="splitter-content"><span>Bottom pane<div id='panetext'>size: 30%</div><div id='panetext'>min: 60px</div></span></div>` }
    ];

    public render(): JSX.Element {
        return (
            <div id="defaultSplitter" className="control-section" >
                <div className="pane1">
                    <div id="pane-heading">Horizontal Splitter</div>
                    <SplitterComponent height="110px" width="100%" separatorSize={4} paneSettings={this.paneSettings}>
                    </SplitterComponent>
                </div>
                <div className="pane2">
                    <div id="pane-heading">Vertical Splitter</div>
                    <SplitterComponent height="240px" width="100%" orientation="Vertical" separatorSize={4} paneSettings={this.verticalpaneSettings}>
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
                        <ul>
                            <li>Set orientation property to Horizontal to create horizontal splitter, which align panels left-to-right.</li>
                            <li>Set orientation property to Vertical to create vertical splitter, which align panels top-to-bottom.</li>
                        </ul>
                        The splitter allows resizing its panes when the drag separator (divider) bar is used to increase its dimension.
                    </p>
                </div>
            </div>
        );
    }
}