import * as React from 'react';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './methods.css';

function Methods() {
    const editorRef = React.useRef<RichTextEditorUIComponent>(null);
    const [output, setOutput] = React.useState<string>('');

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    const log = (value: unknown): void => {
        const text: string =
            value === undefined || value === null
                ? String(value)
                : typeof value === 'string'
                ? value
                : JSON.stringify(value, null, 2);

        setOutput(text);
    };

    const getHtml = (): void => {
        log(editorRef.current?.getHtml());
    };

    const getText = (): void => {
        log(editorRef.current?.getText());
    };

    const getDocument = (): void => {
        log(editorRef.current?.getDocument());
    };

    const focusEditor = (): void => {
        editorRef.current?.focusIn();
        log('Editor focused');
    };

    const blurEditor = (): void => {
        editorRef.current?.focusOut;
        log('Editor blurred');
    };

    return (
        <div>
            <div className="col-lg-8 control-section">
                <div className="control-wrapper">
                    <div className="sample-container">
                        <RichTextEditorUIComponent
                            ref={editorRef}
                            placeholder="Type or paste content here to try the API methods..."
                            toolbarSettings={{
                                items: [
                                    'Bold',
                                    'Italic',
                                    'Underline',
                                    '|',
                                    'FontColor',
                                    'BackgroundColor',
                                    '|',
                                    'Formats',
                                    '|',
                                    'NumberFormatList',
                                    'BulletFormatList',
                                    '|',
                                    'Undo',
                                    'Redo'
                                ]
                            }}
                        />
                    </div>
                </div>

                <div id="methods-output-panel" className="e-rte-api-methods">
                    <h4>Method Result</h4>
                    <pre id="methods-output" aria-live="polite">{output}</pre>
                </div>
            </div>

            <div className="col-lg-4 property-section">
                <PropertyPane title="API Methods">
                    <div className="property-content method-property-content">

                        <div className="method-item">
                            <span className="method-name">getHtml</span>
                            <button id="btn-getHtml" className="e-btn e-primary method-btn" onClick={getHtml}>
                                Invoke
                            </button>
                        </div>

                        <div className="method-item">
                            <span className="method-name">getText</span>
                            <button id="btn-getText" className="e-btn e-primary method-btn" onClick={getText}>
                                Invoke
                            </button>
                        </div>

                        <div className="method-item">
                            <span className="method-name">getDocument</span>
                            <button id="btn-getDocument" className="e-btn e-primary method-btn" onClick={getDocument}>
                                Invoke
                            </button>
                        </div>

                        <div className="method-item">
                            <span className="method-name">focus</span>
                            <button id="btn-focus" className="e-btn e-primary method-btn" onClick={focusEditor}>
                                Invoke
                            </button>
                        </div>

                        <div className="method-item">
                            <span className="method-name">blur</span>
                            <button id="btn-blur" className="e-btn e-primary method-btn" onClick={blurEditor}>
                                Invoke
                            </button>
                        </div>

                    </div>
                </PropertyPane>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates the public methods exposed by the Rich Text Editor UI component. Use the
                    property panel on the right to invoke each method and observe the resulting behavior.
                </p>
            </div>

            <div id="description">
                <p>
                    The Rich Text Editor UI exposes a rich set of public methods that allow you to programmatically interact
                    with the editor instance. The methods shown here are grouped into a single property panel for quick
                    access.
                </p>
                <ul>
                    <li><code>getHtml()</code> &mdash; returns the editor content as an HTML string.</li>
                    <li><code>getText()</code> &mdash; returns the editor content as plain text.</li>
                    <li><code>getDocument()</code> &mdash; returns the document markup of the editor content area as a string.</li>
                    <li><code>focusIn()</code> &mdash; focuses the editor.</li>
                    <li><code>focusOut()</code> &mdash; removes focus from the editor.</li>
                </ul>
                <p>
                    Type or paste some content into the editor, then click an <strong>Invoke</strong> button to see each
                    method in action. The result of the invoked method is displayed in the panel below the editor.
                </p>
            </div>
        </div>
    );
}

export default Methods;
