import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class SmartImageEditor extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-image-editor/images/smart-imageeditor.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This demo highlights the advanced features of the Syncfusion React Image Editor, including:
                    </p>
                    <ul>
                        <li><strong>Magic Eraser:</strong> Users can easily remove unwanted elements from an image with precision,
                            seamlessly blending the background for a polished finish. It's ideal for effortlessly refining images by
                            erasing distractions.</li>
                        <li><strong>Background Changer:</strong> Users can easily replace or modify the background, offering the
                            flexibility to customize the scene while keeping the main subject intact. This feature enhances creativity
                            in image editing.</li>
                        <li><strong>Background Remover:</strong> Provides the ability to remove the background from an image, isolating
                            the main subject. It's perfect for creating transparent backgrounds or inserting the subject into a new
                            environment.</li>
                    </ul>
                    <p>These features make the Image Editor more intuitive and sophisticated, enhancing the overall image editing
                        experience.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <ul>
                        <li><strong>Magic Eraser:</strong> The Magic Eraser allows users to select and remove unwanted elements from an
                            image with high precision. Once an area is erased, the tool automatically blends the surrounding background
                            to create a smooth, natural look, making it ideal for cleaning up images and eliminating distractions.</li>
                        <li><strong>Background Changer:</strong> The Background Changer enables users to replace or modify the existing
                            background of an image. This feature allows for the customization of the scene while preserving the
                            integrity of the main subject, offering a creative way to alter the context or setting of an image.</li>
                        <li><strong>Background Remover:</strong> The Background Remover allows users to remove the background from an
                            image, effectively isolating the main subject. This feature is particularly useful for creating transparent
                            backgrounds or placing the subject onto a different backdrop, enhancing the versatility of the image.</li>
                    </ul>
                </div>
                <AIToast/>
            </div>
        )
    }
}