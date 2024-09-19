/**
 * Tooltip smart position sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Draggable } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
#targetContainer {
    border: 1px solid #dddddd;
    min-height: 350px;
    position: relative;
    overflow: hidden;
}
#demoSmart {
    background-image: url('./src/tooltip/images/smartposition.png');
    background-size: 100px 100px;
    height: 100px;
    position: absolute;
    left: calc( 50% - 50px);
    top: calc( 50% - 50px);
    width: 100px;
}`;

const DraggableTooltip = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let tooltipInstance = React.useRef<TooltipComponent>(null);
        //Set tooltip animation
    let tooltipAnimation: Object = {
        open: { effect: 'None' },
        close: { effect: 'None' }
    };
    const rendereComplete = (): void => {
        //Handle tooltip smart positioning.
        const ele: HTMLElement = document.getElementById('demoSmart');
        let drag: Draggable = new Draggable(ele, { //Initialize Draggable for tooltip element
            clone: false,
            dragArea: '#targetContainer',
            drag: (args: any) => {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    tooltipInstance.current.open(args.element);
                } else {
                    tooltipInstance.current.refresh(args.element);
                }
            },
            dragStart: (args: any) => {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    tooltipInstance.current.open(args.element);
                }
            },
            dragStop: () => {
                tooltipInstance.current.close();
            }
        });
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                {/* Tooltip element */}
                <TooltipComponent id='targetContainer' ref={tooltipInstance} content='Drag me anywhere, to start walking with me !!!' offsetX={-15} target='#demoSmart' animation={tooltipAnimation}>
                    <div id='demoSmart'></div>
                </TooltipComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the <b>smart positioning</b> functionalities of the Tooltip which will open by dragging the picture.</p>
            </div>
            <div id="description">
                <p>
                    This sample shows the dynamic adjustment of the tooltip position within the specified Viewport. Start dragging the ant
                    image, so that the tooltip opens up immediately and keeps moving along with the target image. When the image reaches
                    the corners of the sample container on dragging, the tooltip and its arrow position will be auto adjusted
                    to make it look fit within the sample container area.
                </p>
                <p>
                    In this sample, the tooltip is opened manually by using its < a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#open">open</a> method on drag start of the target image.
                    On further dragging, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#refresh">refresh</a> method of the tooltip needs to be called to reposition it
                    continuously and on drag stop, the tooltip will be hidden by using it’s <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#close">close</a> method.
                </p>
                <p>
                    More information on dynamic positioning of the tooltip can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/tooltip/position/#dynamic-positioning" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default DraggableTooltip;