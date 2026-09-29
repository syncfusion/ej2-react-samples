import * as React from 'react';
import './tab.css';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-react-navigations';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { updateSampleSection } from '../common/sample-base';

function Tab() {
    const rteRef = React.useRef<RichTextEditorUI | null>(null);

    React.useEffect(() => {
        updateSampleSection();
        return () => {
            if (rteRef.current) {
                rteRef.current.destroy();
                rteRef.current = null;
            }
        };
    }, []);
    const onTabCreated = (): void => {
        if (rteRef.current) {
            rteRef.current.destroy();
            rteRef.current = null;
        }
        rteRef.current = new RichTextEditorUI({ placeholder: 'Type something' });
        rteRef.current.appendTo('#rte-container');
    };
    const onTabSelecting = (): void => {
        setTimeout(() => {
            if (rteRef.current) {
                (rteRef.current as any).refresh?.();
            }
        }, 100);
    };

    return (
        <div className="tab-sample control-pane">
            <div className="control-section tab-control-section">
                <div className="sample-container">
                    <div id="tab-default">
                        <TabComponent
                            selectedItem={0}
                            created={onTabCreated as any}
                            selecting={onTabSelecting as any}
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
                    The Rich Text Editor UI is a WYSIWYG (&quot;what you
                    see is what you get&quot;) editor used to create and
                    edit content, and return valid HTML markup. In this
                    sample the editor is hosted inside a Tab control so
                    that related sections such as{' '}
                    <strong>Summary</strong>, <strong>Remedies</strong>,
                    and <strong>Notes</strong> can be edited
                    independently using context-appropriate initial
                    content and toolbar configuration.
                </p>
                <p>
                    The Tab control handles pane activation and ensures
                    each embedded Rich Text Editor UI is refreshed when
                    its corresponding tab becomes active.
                </p>
            </div>
        </div>
    );
}

export default Tab;
