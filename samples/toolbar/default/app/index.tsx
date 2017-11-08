import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {

  render () {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className= 'control toolbar-sample'  style = {{margin: '25px 0' }}>
          {/* Render the Toolbar Component */}
          <ToolbarComponent>
             <ItemsDirective>
                <ItemDirective prefixIcon = 'e-cut-icon tb-icons'  tooltipText = 'Cut'/>
                <ItemDirective prefixIcon = 'e-copy-icon tb-icons'  tooltipText = 'Copy'/>
                <ItemDirective prefixIcon = 'e-paste-icon tb-icons'  tooltipText = 'Paste'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bold-icon tb-icons'  tooltipText = 'Bold'/>
                <ItemDirective prefixIcon = 'e-underline-icon tb-icons'  tooltipText = 'Underline'/>
                <ItemDirective prefixIcon = 'e-italic-icon tb-icons'  tooltipText = 'Italic'/>
                <ItemDirective prefixIcon = 'e-color-icon tb-icons'  tooltipText = 'Color-Picker'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-alignleft-icon tb-icons'  tooltipText = 'Align_Left'/>
                <ItemDirective prefixIcon = 'e-alignright-icon tb-icons'  tooltipText = 'Align_Right'/>
                <ItemDirective prefixIcon = 'e-aligncenter-icon tb-icons'  tooltipText = 'Align_Center'/>
                <ItemDirective prefixIcon = 'e-alignjustify-icon tb-icons'  tooltipText = 'Align_Justify'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bullets-icon tb-icons'  tooltipText = 'Bullets'/>
                <ItemDirective prefixIcon = 'e-numbering-icon tb-icons'  tooltipText = 'Numbering'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bullets-icon tb-icons'  tooltipText = 'Bullets'/>
                <ItemDirective prefixIcon = 'e-numbering-icon tb-icons'  tooltipText = 'Numbering'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-ascending-icon tb-icons'  tooltipText = 'Sort A - Z'/>
                <ItemDirective prefixIcon = 'e-descending-icon tb-icons'  tooltipText = 'Sort Z - A'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-indent-icon tb-icons'  tooltipText = 'Text Indent'/>
                <ItemDirective prefixIcon = 'e-outdent-icon tb-icons'  tooltipText = 'Text Outdent'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-clear-icon tb-icons'  tooltipText = 'Clear'/>
                <ItemDirective prefixIcon = 'e-reload-icon tb-icons'  tooltipText = 'Reload'/>
                <ItemDirective prefixIcon = 'e-export-icon tb-icons'  tooltipText = 'Export'/>
             </ItemsDirective>
          </ToolbarComponent>
        </div></div>

      </div>

    );
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));