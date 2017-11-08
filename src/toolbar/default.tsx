import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './toolbar.component.css'

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
        <div id="action-description">
        <p>
            This sample demonstrates the default functionalities of the <code>Toolbar</code>. Select any command or click the left/right navigation icon or touch swipe to see the hidden commands of the Toolbar
        </p>
    </div>
        <div id="description">
    <p>
        <strong>Toolbar</strong> is a graphical control on which commands / buttons will be displayed in horizontal order.
        By default scrolling display mode enabled when content exceeds the available viewing area.
    </p>
    <br/>
    <p>
        You can use left / right navigation icon or touch swipe to see the hidden commands of the toolbar.
    </p>
    <ul>
        <li>
            Initially toolbar rendered with the <code> left and right navigation</code> icon and you can see hidden commands by <code>moving in right or left</code>            direction.
        </li>
        <li>
            When you reach <code>right / left end of toolbar</code>, corresponding  navigation direction will be disabled.
        </li>
        <li>
            You can continuously scroll the toolbar content by holding on the navigation icon.
        </li>
        <li>
            In <code>devices</code> navigation icons are not available. you can touch swipe to see the hidden commands of the toolbar.
        </li>
    </ul>
        </div>

      </div>

    );
  }
}