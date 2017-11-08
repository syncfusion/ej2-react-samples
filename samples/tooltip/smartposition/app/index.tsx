/**
 * Tooltip smart position sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Draggable } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

const SAMPLE_CSS = `
#targetContainer {
    border: 1px solid #dddddd;
    margin: 15px;
    min-height: 350px;
}
#demoSmart {
    background-image: url('http://npmci.syncfusion.com/production/react/demos/src/tooltip/images/smartposition.png');
    background-size: 100px 100px;
    height: 100px;
    position: absolute;
    left: calc( 50% - 50px);
    top: calc( 50% - 50px);
    width: 100px;
}`;

export class DraggableTooltip extends SampleBase<{}, {}> {
    private tooltipInstance: TooltipComponent;

    //Set tooltip animation
    private tooltipAnimation: Object = {
        open: { effect: 'None' },
        close: { effect: 'None' }
    };
    public rendereComplete(): void {

        //Handle tooltip smart positioning.
        let ele: HTMLElement = document.getElementById('demoSmart');
        let drag: Draggable = new Draggable(ele, { //Initialize Draggable for tooltip element
            clone: false,
            dragArea: '#targetContainer',
            drag: (args: any) => {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    this.tooltipInstance.open(args.element);
                } else {
                    this.tooltipInstance.refresh(args.element);
                }
            },
            dragStart: (args: any) => {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    this.tooltipInstance.open(args.element);
                }
            },
            dragStop: (args: any) => {
                this.tooltipInstance.close();
            }
        });
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ position: 'relative' }}>

                    {/* Tooltip element */}
                    <TooltipComponent id='targetContainer' ref={t => this.tooltipInstance = t} content='Drag me anywhere, to start walking with me !!!' offsetX={-15} target='#demoSmart' animation={this.tooltipAnimation}>
                        <div id='demoSmart'></div>
                    </TooltipComponent>
                </div>


            </div>
        )
    }
}
ReactDOM.render(<DraggableTooltip />, document.getElementById('sample'));