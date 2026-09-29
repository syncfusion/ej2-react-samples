import * as React from 'react';
import './tab.css';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-react-navigations';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { SampleBase } from '../common/sample-base';

export class Tab extends SampleBase<{}, {}> {
    private rteObj: RichTextEditorUI | null = null;
    private onTabCreated = (): void => {
        if (this.rteObj) {
            this.rteObj.destroy();
            this.rteObj = null;
        }
        this.rteObj = new RichTextEditorUI({ placeholder: 'Type something' });
        this.rteObj.appendTo('#rte-container');
    };
    private onTabSelecting = (): void => {
        setTimeout(() => {
            if (this.rteObj) {
                (this.rteObj as any).refresh?.();
            }
        }, 100);
    };

    public componentWillUnmount(): void {
        if (this.rteObj) {
            this.rteObj.destroy();
            this.rteObj = null;
        }
    }

    public render(): JSX.Element {
        return (
            <div className="tab-sample control-pane">
                <div className="control-section tab-control-section">
                    <div className="sample-container">
                        <div id="tab-default">
                            <TabComponent
                                selectedItem={0}
                                created={this.onTabCreated as any}
                                selecting={this.onTabSelecting as any}
                            >
                                <TabItemsDirective>
                                    <TabItemDirective
                                        header={{ text: 'Summary', iconCss: 'e-icons e-description' } as any}
                                        content={'<div id="rte-container"></div>' as any}
                                    />
                                    <TabItemDirective
                                        header={{ text: 'Remedies', iconCss: 'e-icons e-description' } as any}
                                        content={'<div style="padding:16px">Remedies Content</div>' as any}
                                    />
                                    <TabItemDirective
                                        header={{ text: 'Notes', iconCss: 'e-icons e-description' } as any}
                                        content={'<div style="padding:16px">Notes Content</div>' as any}
                                    />
                                </TabItemsDirective>
                            </TabComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the Rich Text Editor UI
                        component rendered within different Syncfusion Tab
                        items, where each tab is configured with a
                        purpose-specific editor.
                    </p>
                </div>

                <div id="description">
                    <p>
                        The Rich Text Editor UI is a WYSIWYG (&quot;what
                        you see is what you get&quot;) editor used to
                        create and edit content, and return valid HTML
                        markup. In this sample the editor is hosted
                        inside a Tab control so that related sections
                        such as <strong>Summary</strong>,{' '}
                        <strong>Remedies</strong>, and{' '}
                        <strong>Notes</strong> can be edited
                        independently using context-appropriate initial
                        content and toolbar configuration.
                    </p>
                    <p>
                        The Tab control handles pane activation and
                        ensures each embedded Rich Text Editor UI is
                        refreshed when its corresponding tab becomes
                        active.
                    </p>
                </div>
            </div>
        );
    }
}
