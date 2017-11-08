import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from './sample-base';


export class Popup extends SampleBase<{}, {}> {

  render () {
    return (
      <div className = 'control-pane'>
        <div className='control-section'>
          <div className= 'control toolbar-sample'  style = {{margin: '25px 0' }}>
          {/* Render the Toolbar Component with Popup mode */}
          <ToolbarComponent overflowMode = 'Popup'>
             <ItemsDirective>
                <ItemDirective prefixIcon = 'e-cut-icon tb-icons'  tooltipText = 'Cut' text = 'Cut' 
                showTextOn = 'Overflow' overflow ='Show' />
                <ItemDirective prefixIcon = 'e-copy-icon tb-icons'  tooltipText = 'Copy'  showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-paste-icon tb-icons'  tooltipText = 'Paste'  showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bold-icon tb-icons'  tooltipText = 'Bold' text = 'Bold'  showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-underline-icon tb-icons'  tooltipText = 'Underline' text = 'Underline' 
                showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-italic-icon tb-icons'  tooltipText = 'Italic' text = 'Italic'  showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bullets-icon tb-icons'  tooltipText = 'Bullets'  overflow ='Show' text = 'Bullets'/>
                <ItemDirective prefixIcon = 'e-numbering-icon tb-icons'  tooltipText = 'Numbering'  overflow ='Show' text = 'Numbering'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-undo-icon tb-icons'  tooltipText = 'Undo'  text = 'Undo'/>
                <ItemDirective prefixIcon = 'e-redo-icon tb-icons'  tooltipText = 'Redo'  text = 'Redo'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-alignleft-icon tb-icons'  tooltipText = 'Align_Left' text = 'Left'
                 showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-alignright-icon tb-icons'  tooltipText = 'Align_Right' text = 'Right'
                showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-aligncenter-icon tb-icons'  tooltipText = 'Align_Center' text = 'Center'
                showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-alignjustify-icon tb-icons'  tooltipText = 'Align_Justify' text = 'justify'
                showTextOn = 'Overflow' overflow ='Show'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-radar-icon tb-icons' text = 'Radar' tooltipText = 'Radar Chart' 
                showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-line-icon tb-icons' text = 'Line' tooltipText = 'Line Chart' showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-doughnut-icon tb-icons' text = 'Doughnut' tooltipText = 'Doughnut Chart' 
                showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-bubble-icon tb-icons' text = 'Bubble' tooltipText = 'Bubble Chart' showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-table-icon tb-icons' text = 'Table' tooltipText = 'Table Chart' showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-picture-icon tb-icons' text = 'Picture' tooltipText = 'Picture Chart' 
                showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-design-icon tb-icons' text = 'Design' tooltipText = 'Design Chart' showTextOn = 'Overflow'/>
             </ItemsDirective>
          </ToolbarComponent>
         </div>
        </div>

      </div>
    );
  }
}
ReactDOM.render(<Popup />, document.getElementById('sample'));