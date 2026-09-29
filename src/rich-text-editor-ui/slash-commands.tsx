import * as React from 'react';
import { RichTextEditorUIComponent, Inject, SlashCommand } from '@syncfusion/ej2-react-richtexteditor-ui';
import { SampleBase } from '../common/sample-base';

export class SlashCommandSample extends SampleBase<{},{}> {
    
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <RichTextEditorUIComponent
                        placeholder='Type "/" and choose format.'
                        slashCommandSettings={{
                            enable: true,
                            items: [
                                'Paragraph',
                                'Heading 1',
                                'Heading 2',
                                'Heading 3',
                                'Heading 4',
                                'NumberedList',
                                'BulletList',
                                'Blockquote',
                                'Table',
                                'Link',
                                'Image'
                            ]
                        }}
                    >
                        <Inject services={[SlashCommand]} />
                    </RichTextEditorUIComponent>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the Slash Command feature of the
                        Rich Text Editor UI component.
                    </p>
                </div>

                <div id="description">
                    <p>
                        Type <code>/</code> inside the editor to open the slash
                        command menu and quickly access formatting, content
                        insertion, and custom commands.
                    </p>
                </div>
            </div>
        );
    }
}