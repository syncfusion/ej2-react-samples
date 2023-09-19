import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './toolbar.component.css'

export class KeyboardInteraction extends SampleBase<{}, {}> {
    private toolbarObj: ToolbarComponent;
    public componentDidMount(): void {
      document.body.addEventListener("keydown", (e: KeyboardEvent) => {
        let toolbarElement: HTMLElement = document.querySelector('.e-toolbar-items .e-toolbar-item .e-tbar-btn') as HTMLElement;
            if (e.altKey && e.keyCode === 74 && toolbarElement) {
                toolbarElement.focus();
        }
      });
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section tbar-control-section'>
                    <div className='control toolbar-sample tbar-sample' style={{ margin: '25px 0' }}>
                        {/* Render the Toolbar Component with Popup mode */}
                        <ToolbarComponent overflowMode='Popup' ref={(t) => (this.toolbarObj = t)}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon='e-cut-icon tb-icons' tooltipText='Cut' text='Cut'
                                    showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-copy-icon tb-icons' tooltipText='Copy' showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-paste-icon tb-icons' tooltipText='Paste' showTextOn='Overflow' overflow='Show' />
                                <ItemDirective type='Separator' />
                                <ItemDirective prefixIcon='e-bold-icon tb-icons' tooltipText='Bold' text='Bold' showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-underline-icon tb-icons' tooltipText='Underline' text='Underline'
                                    showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-italic-icon tb-icons' tooltipText='Italic' text='Italic' showTextOn='Overflow' overflow='Show' />
                                <ItemDirective type='Separator' />
                                <ItemDirective prefixIcon='e-bullets-icon tb-icons' tooltipText='Bullets' overflow='Show' text='Bullets' />
                                <ItemDirective prefixIcon='e-numbering-icon tb-icons' tooltipText='Numbering' overflow='Show' text='Numbering' />
                                <ItemDirective type='Separator' />
                                <ItemDirective prefixIcon='e-tbar-undo-icon tb-icons' tooltipText='Undo' text='Undo' />
                                <ItemDirective prefixIcon='e-tbar-redo-icon tb-icons' tooltipText='Redo' text='Redo' />
                                <ItemDirective type='Separator' />
                                <ItemDirective prefixIcon='e-alignleft-icon tb-icons' tooltipText='Align_Left' text='Left'
                                    showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-alignright-icon tb-icons' tooltipText='Align_Right' text='Right'
                                    showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-aligncenter-icon tb-icons' tooltipText='Align_Center' text='Center'
                                    showTextOn='Overflow' overflow='Show' />
                                <ItemDirective prefixIcon='e-alignjustify-icon tb-icons' tooltipText='Align_Justify' text='justify'
                                    showTextOn='Overflow' overflow='Show' />
                                <ItemDirective type='Separator' />
                                <ItemDirective prefixIcon='e-radar-icon tb-icons' text='Radar' tooltipText='Radar Chart'
                                    showTextOn='Overflow' />
                                <ItemDirective prefixIcon='e-line-icon tb-icons' text='Line' tooltipText='Line Chart' showTextOn='Overflow' />
                                <ItemDirective prefixIcon='e-doughnut-icon tb-icons' text='Doughnut' tooltipText='Doughnut Chart'
                                    showTextOn='Overflow' />
                                <ItemDirective prefixIcon='e-bubble-icon tb-icons' text='Bubble' tooltipText='Bubble Chart' showTextOn='Overflow' />
                                <ItemDirective prefixIcon='e-table-icon tb-icons' text='Table' tooltipText='Table Chart' showTextOn='Overflow' />
                                <ItemDirective prefixIcon='e-picture-icon tb-icons' text='Picture' tooltipText='Picture Chart'
                                    showTextOn='Overflow' />
                                <ItemDirective prefixIcon='e-design-icon tb-icons' text='Design' tooltipText='Design Chart' showTextOn='Overflow' />
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This demo showcases the keyboard shortcuts applicable on <code>Toolbar</code>.
                    </p>
                </div>
                <div id="description">
                    <i>Below key combinations can be used in Toolbar to initiate various actions.</i>
                    <ul>
                        <li>
                            <b>FOCUS</b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Alt</kbd> + <kbd>J</kbd></span>
                                    <span> - Focuses on the first component of the sample.</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>TOOLBAR ITEMS</b>
                            <ul>
                                <li>
                                    <span className="key-class"><kbd>Home</kbd></span>
                                    <span> - Moves the focus to the first item of the Toolbar.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>End</kbd></span>
                                    <span> - Moves the focus to the last item of the Toolbar.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Down arrow</kbd></span>
                                    <span> - Focuses the next popup element.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Up arrow</kbd></span>
                                    <span> - Focuses the previous popup element.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Left arrow</kbd></span>
                                    <span> - Focuses the previous element.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Right arrow</kbd></span>
                                    <span> - Focuses the next element.</span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Enter</kbd></span>
                                    <span>
                                        - When focused on a ToolBar command, clicking the key triggers the click of Toolbar
                                        element. When popup drop-down icon is focused, the popup opens.
                                    </span>
                                </li>
                                <li>
                                    <span className="key-class"><kbd>Esc</kbd></span>
                                    <span> - Closes popup.</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}