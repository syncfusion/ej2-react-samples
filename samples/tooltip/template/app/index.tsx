/**
 * Tooltip template sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-react-popups';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from './sample-base';


export class TemplateTooltip extends SampleBase<{}, {}> {
  private tooltipInstance: TooltipComponent;

  //Tooltip content customization.
  private onBeforeRender(args: TooltipEventArgs) {
    let data: any = [
      { title: 'Bold', name: 'Bold (Ctrl+B)', note: 'Makes your text bold.' },
      { title: 'Underline', name: 'Underline (Ctrl+U)', note: 'Underline your text.' },
      { title: 'Italic', name: 'Italic (Ctrl+I)', note: 'Italicize your text.' },
      {
        title: 'Cut', name: 'Cut (Ctrl+X)',
        note: 'Remove the selection and put it on the Clipboard so you can paste it somewhere else.'
      },
      {
        title: 'Copy', name: 'Copy (Ctrl+C)',
        note: 'Put a copy of a selection on the Clipboard so you can paste it somewhere else.'
      },
      { title: 'Paste', name: 'Paste (Ctrl+V)', note: 'Add content on the Clipboard to your document.' }
    ];
    for (let i: number = 0; i < data.length; i++) {
      if (data[i].title === args.target.getAttribute('title')) {
        this.tooltipInstance.content = '<h6>' + data[i].name + '</h6><p>' + data[i].note + '</p>';
      }
    }
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>

          {/* Tooltip element */}
          <TooltipComponent id="template-tootip" ref={t => this.tooltipInstance = t} target=".toolbar-container [title]" beforeRender={this.onBeforeRender.bind(this)} showTipPointer={false}
            offsetX={70} width={170}>
            <div className="toolbar-container">

              {/* Toolbar element */}
              <ToolbarComponent style={{ margin: '10px auto' }}>
                <ItemsDirective>
                  <ItemDirective prefixIcon='e-cut-icon tooltip-icons' tooltipText='Cut'></ItemDirective>
                  <ItemDirective prefixIcon='e-copy-icon tooltip-icons' tooltipText='Copy'></ItemDirective>
                  <ItemDirective prefixIcon='e-paste-icon tooltip-icons' tooltipText='Paste'></ItemDirective>
                  <ItemDirective type='Separator'></ItemDirective>
                  <ItemDirective prefixIcon='e-bold-icon tooltip-icons' tooltipText='Bold'></ItemDirective>
                  <ItemDirective prefixIcon='e-underline-icon tooltip-icons' tooltipText='Underline'></ItemDirective>
                  <ItemDirective prefixIcon='e-italic-icon tooltip-icons' tooltipText='Italic'></ItemDirective>
                </ItemsDirective>
              </ToolbarComponent>
            </div>
          </TooltipComponent>
        </div>


      </div>
    )
  }
}
ReactDOM.render(<TemplateTooltip />, document.getElementById('sample'));